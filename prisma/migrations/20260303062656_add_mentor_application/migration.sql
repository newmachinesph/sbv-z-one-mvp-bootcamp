-- CreateEnum
CREATE TYPE "MentorStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "MentorApplication" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "linkedinUrl" TEXT NOT NULL,
    "resumeUrl" TEXT NOT NULL,
    "portfolioUrl" TEXT,
    "whatBuilt" TEXT NOT NULL,
    "whatFailed" TEXT NOT NULL,
    "whatShipped" TEXT NOT NULL,
    "whyMentor" TEXT NOT NULL,
    "weeklyAvailability" TEXT NOT NULL,
    "contactSlot1" TEXT NOT NULL,
    "contactSlot2" TEXT NOT NULL,
    "contactSlot3" TEXT NOT NULL,
    "status" "MentorStatus" NOT NULL DEFAULT 'PENDING',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MentorApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MentorApplication_email_key" ON "MentorApplication"("email");
