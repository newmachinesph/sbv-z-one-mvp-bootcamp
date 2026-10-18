import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

const f = createUploadthing();

async function authMiddleware() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
  return { userId: session.user.id };
}

async function saveFile({ file }: { file: { key: string; name: string; ufsUrl: string; size: number; type: string } }) {
  await prisma.uploadedFile.create({
    data: {
      key: file.key,
      name: file.name,
      url: file.ufsUrl,
      size: file.size,
      type: file.type,
    },
  });
  return { url: file.ufsUrl };
}

export const ourFileRouter = {
  teamAvatar: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(authMiddleware)
    .onUploadComplete(async ({ file }) => saveFile({ file })),

  pitchDeck: f({ pdf: { maxFileSize: "16MB", maxFileCount: 1 } })
    .middleware(authMiddleware)
    .onUploadComplete(async ({ file }) => saveFile({ file })),

  document: f({
    image: { maxFileSize: "8MB", maxFileCount: 4 },
    pdf: { maxFileSize: "16MB", maxFileCount: 4 },
  })
    .middleware(authMiddleware)
    .onUploadComplete(async ({ file }) => saveFile({ file })),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
