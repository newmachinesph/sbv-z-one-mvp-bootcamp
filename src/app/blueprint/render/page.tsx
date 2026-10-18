import { CoverPage } from "@/components/blueprint/sections/cover-page";
import { ExecutiveSummary } from "@/components/blueprint/sections/executive-summary";
import { AboutSbv } from "@/components/blueprint/sections/about-sbv";
import { WhyForge } from "@/components/blueprint/sections/why-forge";
import { VisionMission } from "@/components/blueprint/sections/vision-mission";
import { FrameworkSection } from "@/components/blueprint/sections/framework-section";
import { ProgramOverview } from "@/components/blueprint/sections/program-overview";
import { EcosystemSection } from "@/components/blueprint/sections/ecosystem-section";
import { AIIntegration } from "@/components/blueprint/sections/ai-integration";
import { InSpaceSection } from "@/components/blueprint/sections/inspace-section";
import { OutcomesSection } from "@/components/blueprint/sections/outcomes-section";
import { PartnershipSection } from "@/components/blueprint/sections/partnership-section";
import { BackCover } from "@/components/blueprint/sections/back-cover";

/**
 * Hidden render route used by the PDF generation script.
 * Renders all blueprint sections in order so Puppeteer can screenshot them.
 */
export default function BlueprintRenderPage() {
  return (
    <div id="blueprint-root" className="space-y-0 bg-white">
      <CoverPage />
      <ExecutiveSummary />
      <AboutSbv />
      <WhyForge />
      <VisionMission />
      <FrameworkSection />
      <ProgramOverview />
      <EcosystemSection />
      <AIIntegration />
      <InSpaceSection />
      <OutcomesSection />
      <PartnershipSection />
      <BackCover />
    </div>
  );
}
