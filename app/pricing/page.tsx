import { getSubscriptionDetails } from "@/lib/helper/subscription-details";
import PricingTable from "./_component/pricing-table";

export default async function PricingPage() {
  const subscriptionDetails = await getSubscriptionDetails();

  return <PricingTable subscriptionDetails={subscriptionDetails} />;
}
