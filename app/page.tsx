import HeroSection from "@/components/homepage/hero-section";
import Integrations from "@/components/homepage/integrations";
import PricingTable from "./pricing/_component/pricing-table";
import { getSubscriptionDetails } from "@/lib/subscription";
import FooterSection from "@/components/homepage/footer";

export default async function Home() {
  const subscriptionDetails = await getSubscriptionDetails();

  return (
    <>
      <HeroSection />
      <Integrations />
      <PricingTable subscriptionDetails={subscriptionDetails} />
      <FooterSection />
    </>
  );
}
