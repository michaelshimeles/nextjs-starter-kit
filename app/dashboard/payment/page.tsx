import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSubscriptionDetails } from "@/lib/subscription";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function PaymentPage({}) {
  const result = await auth.api.getSession({
    headers: await headers(),
  });

  if (!result?.session?.userId) {
    redirect("/sign-in");
  }

  const subscriptionDetails = await getSubscriptionDetails();

  return (
    <div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start justify-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">Payment</h1>
            <p className="text-muted-foreground">
              Manage your payment methods.
            </p>
          </div>
        </div>

        {!subscriptionDetails.hasSubscription ||
        subscriptionDetails.subscription?.status !== "active" ? (
          <Card>
            <CardHeader>
              <CardTitle>No Active Subscription</CardTitle>
              <CardDescription>
                You don't have an active subscription. Subscribe to unlock all
                features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/pricing">
                <Button>Subscribe Now</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
              <CardDescription>
                Your current subscription information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <p className="text-lg capitalize">
                    {subscriptionDetails.subscription.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Amount
                  </p>
                  <p className="text-lg">
                    {subscriptionDetails.subscription.currency.toUpperCase()}{" "}
                    {subscriptionDetails.subscription.amount / 100}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Billing Interval
                  </p>
                  <p className="text-lg capitalize">
                    {subscriptionDetails.subscription.recurringInterval}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Current Period End
                  </p>
                  <p className="text-lg">
                    {new Date(
                      subscriptionDetails.subscription.currentPeriodEnd,
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {subscriptionDetails.subscription.cancelAtPeriodEnd && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Your subscription will cancel at the end of the current
                    billing period.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
