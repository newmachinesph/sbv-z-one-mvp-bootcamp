import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { ApplicationsContent } from "./applications-content";

export default async function ApplicationsPage() {
  await requireAdmin();

  const applicants = await prisma.applicant.findMany({
    orderBy: { appliedAt: "desc" },
  });

  return (
    <ApplicationsContent
      applicants={applicants.map((a) => ({
        id: a.id,
        name: a.name,
        email: a.email,
        location: a.location,
        preferredRole: a.preferredRole.toLowerCase(),
        skills: a.skills,
        experience: a.experience,
        motivation: a.motivation,
        linkedinUrl: a.linkedinUrl,
        resumeUrl: a.resumeUrl,
        portfolioUrl: a.portfolioUrl,
        status: a.status.toLowerCase(),
        appliedAt: a.appliedAt.toISOString(),
      }))}
    />
  );
}
