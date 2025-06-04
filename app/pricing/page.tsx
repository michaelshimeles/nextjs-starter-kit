import { getSubscriptionDetails } from "@/lib/subscription";
import PricingTable from "./_component/pricing-table";

export const dynamic = 'force-dynamic';

export default async function PricingPage() {
  const subscriptionDetails = await getSubscriptionDetails();

  return <PricingTable subscriptionDetails={subscriptionDetails} />;
}
