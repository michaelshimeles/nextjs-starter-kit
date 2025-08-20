import { getSubscriptionDetails } from "@/lib/subscription";
import PricingTable from "./_component/pricing-table";

export default async function PricingPage() {
  const subscriptionDetails = await getSubscriptionDetails();

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <PricingTable subscriptionDetails={subscriptionDetails} />;
    </div>
  );
}
