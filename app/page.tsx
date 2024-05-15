import PageWrapper from "@/components/Container/PageWrapper";
import { AccordionComponent } from "@/components/LandingPage/AccordionComponent";
import BlogSample from "@/components/LandingPage/BlogSamples";
import Footer from "@/components/LandingPage/Footer";
import HeroSection from "@/components/LandingPage/HeroSection";
import MarketingCards from "@/components/LandingPage/MarketingCards";
import PricingPage from "@/components/LandingPage/Pricing";

export default function Home() {
  return (
    <PageWrapper>

      <div className="mt-[1rem] p-3">
        <HeroSection />
      </div>
      <div className="flex flex-col my-[8rem] p-2 w-full justify-center items-center">
        <MarketingCards />
      </div>
      <div className="max-w-[1200px] p-8">
        <BlogSample />
      </div>
      <div className="my-[8rem]">
        <PricingPage />
      </div>
      <div className="flex justify-center items-center w-full mt-[5rem] mb-[9rem]">
        <AccordionComponent />
      </div>
      {/* <div className="w-full">
        <Footer />
      </div> */}
    </PageWrapper>
  );
}
