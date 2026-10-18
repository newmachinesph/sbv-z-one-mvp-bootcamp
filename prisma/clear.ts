import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("clear.ts cannot be run in production. Set NODE_ENV to development.");
  }

  await prisma.weekProgress.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.uploadedFile.deleteMany();
  await prisma.team.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.applicant.deleteMany();
  await prisma.admin.deleteMany();
  console.log("All tables cleared — database is empty.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
