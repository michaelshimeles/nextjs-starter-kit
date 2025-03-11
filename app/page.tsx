import { AccordionComponent } from "@/components/homepage/accordion-component";
import HeroSection from "@/components/homepage/hero-section";
import MarketingCards from "@/components/homepage/marketing-cards";
import Pricing from "@/components/homepage/pricing";
import SideBySide from "@/components/homepage/side-by-side";
import PageWrapper from "@/components/wrapper/page-wrapper";
import { polar } from "@/lib/polar";

export default async function Home() {

  const data = await polar.products.list({
    organizationId: process.env.POLAR_ORGANIZATION_ID,
  });


  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center w-full mt-[1rem] p-3">
        <HeroSection />
      </div>
      <SideBySide />
      <MarketingCards />
      <Pricing result={data?.result as any} />
      <AccordionComponent />
    </PageWrapper>
  );
}
