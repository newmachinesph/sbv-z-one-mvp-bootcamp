import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";

export async function getSession() {
  return getServerSession(authOptions);
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) redirect("/admin");
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (session.user.role !== "admin") redirect("/");
  return session;
}

export async function requireMember() {
  const session = await requireAuth();
  if (session.user.role !== "member") redirect("/");
  return session;
}
