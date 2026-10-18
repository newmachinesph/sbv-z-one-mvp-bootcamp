import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Check Admin first
        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });

        if (admin) {
          const valid = await compare(credentials.password, admin.password);
          if (!valid) return null;
          return {
            id: admin.id,
            email: admin.email,
            name: "Admin",
            role: "admin" as const,
          };
        }

        // Check TeamMember
        const member = await prisma.teamMember.findUnique({
          where: { email: credentials.email },
        });

        if (member && member.password) {
          const valid = await compare(credentials.password, member.password);
          if (!valid) return null;
          return {
            id: member.id,
            email: member.email,
            name: member.name,
            role: "member" as const,
            teamId: member.teamId,
          };
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  pages: { signIn: "/admin" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.teamId = user.teamId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.teamId = token.teamId;
      return session;
    },
  },
};
