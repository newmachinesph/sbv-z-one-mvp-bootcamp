-- CreateTable
CREATE TABLE "TeamApplication" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "status" "ApplicantStatus" NOT NULL DEFAULT 'PENDING',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamApplicationMember" (
    "id" TEXT NOT NULL,
    "teamApplicationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "preferredRole" "MemberRole" NOT NULL,
    "skills" TEXT[],
    "experience" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "linkedinUrl" TEXT NOT NULL DEFAULT '',
    "resumeUrl" TEXT,
    "portfolioUrl" TEXT,
    "location" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "TeamApplicationMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TeamApplicationMember_teamApplicationId_idx" ON "TeamApplicationMember"("teamApplicationId");

-- AddForeignKey
ALTER TABLE "TeamApplicationMember" ADD CONSTRAINT "TeamApplicationMember_teamApplicationId_fkey" FOREIGN KEY ("teamApplicationId") REFERENCES "TeamApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
