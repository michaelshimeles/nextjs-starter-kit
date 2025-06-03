import { Button } from "@/components/ui/button";
import { activeSubscription } from "@/lib/helper/active-subscription";
import { Crown } from "lucide-react";
import Link from "next/link";

interface SubscriptionGateProps {
  children: React.ReactNode;
  feature?: string;
}

export async function SubscriptionGate({
  children,
  feature = "this feature",
}: SubscriptionGateProps) {
  const subscriptionResult = await activeSubscription();

  if (subscriptionResult.hasActiveSubscription) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border rounded-lg bg-muted/30 h-[80vh] w-full">
      <h3 className="text-lg font-semibold mb-2">Premium Feature Required</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Upgrade to unlock {feature} and all premium features
      </p>
      <Link href="/pricing">
        <Button>
          <Crown className="h-4 w-4 mr-2" />
          Upgrade Now
        </Button>
      </Link>
    </div>
  );
}
