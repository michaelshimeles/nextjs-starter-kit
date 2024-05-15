import PageWrapper from "@/components/Container/PageWrapper";
import { AccordionComponent } from "@/components/LandingPage/AccordionComponent";
import BlogSample from "@/components/LandingPage/BlogSamples";
import Footer from "@/components/LandingPage/Footer";
import HeroSection from "@/components/LandingPage/HeroSection";
import MarketingCards from "@/components/LandingPage/MarketingCards";

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
      <div className="flex flex-col mb-[3rem] mt-[4rem] p-2 w-full justify-center items-center">
        <MarketingCards />
      </div>
      <BlogSample />
      <div className="flex justify-center items-center w-full">
        <AccordionComponent />
      </div>
      <div className=" w-full">
        <Footer />
      </div>
    </PageWrapper>
  );
}
