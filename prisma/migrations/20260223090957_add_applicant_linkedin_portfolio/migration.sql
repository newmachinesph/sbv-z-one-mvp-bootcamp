-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "linkedinUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "portfolioUrl" TEXT;

-- CreateIndex
CREATE INDEX "TeamMember_teamId_idx" ON "TeamMember"("teamId");
