import { getSubscriptionDetails } from "@/lib/subscription";
import PricingTable from "./_component/pricing-table";

export default async function PricingPage() {
  const subscriptionDetails = await getSubscriptionDetails();

  return <PricingTable subscriptionDetails={subscriptionDetails} />;
}
