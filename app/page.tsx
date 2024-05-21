import PageWrapper from "@/components/Container/PageWrapper";
import { AccordionComponent } from "@/components/LandingPage/AccordionComponent";
import AnimatedLogoCloud from "@/components/LandingPage/AnimatedLogoCloud";
import BlogSample from "@/components/LandingPage/BlogSamples";
import HeroSection from "@/components/LandingPage/HeroSection";
import MarketingCards from "@/components/LandingPage/MarketingCards";
import PricingPage from "@/components/LandingPage/Pricing";
import SideBySide from "@/components/LandingPage/SideBySide";

export default function Home() {
  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center w-full mt-[1rem] p-3">
        <HeroSection />
        <div className="w-[80%] py-[4rem] dark:hidden">
          <AnimatedLogoCloud />
        </div>
        {/* <StaticLogoCloud /> */}
      </div>
      <div className="flex mt-[2rem] lg:mt-[3rem] w-full justify-center items-center">
        <SideBySide />
      </div>
      <div className="flex flex-col p-2 w-full mt-[6rem] lg:mt-[10rem] justify-center items-center">
        <MarketingCards />
      </div>
      <div className="max-w-[1200px] p-8 mt-[2rem] lg:mt-[6rem] lg:mb-[5rem]">
        <BlogSample />
      </div>
      <div className="mt-[3rem] lg:mt-[6rem] lg:mb-[7rem]">
        <PricingPage />
      </div>
      <div className="flex justify-center items-center w-full mt-[5rem] mb-[9rem]">
        <AccordionComponent />
      </div>
    </PageWrapper>
  );
}
