import { AccordionComponent } from "@/components/landing-page/AccordionComponent";
import AnimatedLogoCloud from "@/components/landing-page/AnimatedLogoCloud";
import BlogSample from "@/components/landing-page/BlogSamples";
import HeroSection from "@/components/landing-page/HeroSection";
import MarketingCards from "@/components/landing-page/MarketingCards";
import PricingPage from "@/components/landing-page/Pricing";
import SideBySide from "@/components/landing-page/SideBySide";
import PageWrapper from "@/components/wrapper/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center w-full mt-[1rem] p-3">
        <HeroSection />
      </div>
      <div className="flex my-[8rem] w-full justify-center items-center">
        <SideBySide />
      </div>
      <div className="flex flex-col p-2 w-full justify-center items-center">
        <MarketingCards />
      </div>
      <div className="max-w-[1200px] p-8 mt-[2rem] lg:mt-[6rem] lg:mb-[5rem]">
        <BlogSample />
      </div>
      <div>
        <PricingPage />
      </div>
      <div className="flex justify-center items-center w-full my-[8rem]">
        <AccordionComponent />
      </div>
    </PageWrapper>
  );
}
