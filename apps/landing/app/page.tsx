import { Masthead } from "@/app/components/masthead";
import { HeroDossier } from "@/app/components/hero-dossier";
import { CoverageStrip } from "@/app/components/coverage-strip";
import { InsideAnIssue } from "@/app/components/inside-an-issue";
import { ResellerMockup } from "@/app/components/reseller-mockup";
import { Pricing } from "@/app/components/pricing";
import { Methodology } from "@/app/components/methodology";
import { Faq } from "@/app/components/faq";
import { Footer } from "@/app/components/footer";

export default function Page() {
  return (
    <>
      <Masthead />
      <main id="main" className="bg-paper text-ink">
        <HeroDossier />
        <CoverageStrip />
        <InsideAnIssue />
        <ResellerMockup />
        <Pricing />
        <Methodology />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
