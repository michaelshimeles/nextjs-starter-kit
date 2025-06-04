"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth/auth-client";
import { Check } from "lucide-react";
import { toast } from "sonner";

type SubscriptionDetails = {
  id: string;
  productId: string;
  status: string;
  amount: number;
  currency: string;
  recurringInterval: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  canceledAt: Date | null;
  organizationId: string | null;
};

type SubscriptionDetailsResult = {
  hasSubscription: boolean;
  subscription?: SubscriptionDetails;
  error?: string;
  errorType?: "CANCELED" | "EXPIRED" | "GENERAL";
};

interface PricingTableProps {
  subscriptionDetails: SubscriptionDetailsResult;
}

export default function PricingTable({
  subscriptionDetails,
}: PricingTableProps) {
  const handleCheckout = async (productId: string, slug: string) => {
    try {
      await authClient.checkout({
        products: [productId],
        slug: slug,
      });
    } catch (error) {
      console.error("Checkout failed:", error);
      // TODO: Add user-facing error notification
      toast.error("Oops, something went wrong");
    }
  };

  const handleManageSubscription = async () => {
    try {
      await authClient.customer.portal();
    } catch (error) {
      console.error("Failed to open customer portal:", error);
      toast.error("Failed to open subscription management");
    }
  };

  const STARTER_TIER = process.env.NEXT_PUBLIC_STARTER_TIER;
  const STARTER_SLUG = process.env.NEXT_PUBLIC_STARTER_SLUG;

  if (!STARTER_TIER || !STARTER_SLUG) {
    throw new Error("Missing required environment variables for Starter tier");
  }

  const PROFESSIONAL_TIER = process.env.NEXT_PUBLIC_PROFESSIONAL_TIER;
  const PROFESSIONAL_SLUG = process.env.NEXT_PUBLIC_PROFESSIONAL_SLUG;

  if (!PROFESSIONAL_TIER || !PROFESSIONAL_SLUG) {
    throw new Error("Missing required environment variables for Professional tier");
  }

  const isCurrentPlan = (tierProductId: string) => {
    return (
      subscriptionDetails.hasSubscription &&
      subscriptionDetails.subscription?.productId === tierProductId &&
      subscriptionDetails.subscription?.status === "active"
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="flex flex-col items-center justify-center px-4 mb-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-muted-foreground">
          Choose the plan that fits your needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Starter Tier */}
        <Card className="relative h-fit">
          {isCurrentPlan(STARTER_TIER) && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Current Plan
              </Badge>
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-2xl">Starter</CardTitle>
            <CardDescription>Perfect for getting started</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span>5 Projects</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span>10GB Storage</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span>1 Team Member</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span>Email Support</span>
            </div>
          </CardContent>
          <CardFooter>
            {isCurrentPlan(STARTER_TIER) ? (
              <div className="w-full space-y-2">
                <Button className="w-full" variant="outline" disabled>
                  Current Plan
                </Button>
                {subscriptionDetails.subscription && (
                  <p className="text-sm text-muted-foreground text-center">
                    {subscriptionDetails.subscription.cancelAtPeriodEnd
                      ? `Expires ${formatDate(subscriptionDetails.subscription.currentPeriodEnd)}`
                      : `Renews ${formatDate(subscriptionDetails.subscription.currentPeriodEnd)}`}
                  </p>
                )}
              </div>
            ) : subscriptionDetails.hasSubscription ? (
              <Button
                className="w-full"
                onClick={handleManageSubscription}
              >
                {subscriptionDetails.subscription?.productId === PROFESSIONAL_TIER ? "Downgrade" : "Change Plan"}
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() => handleCheckout(STARTER_TIER, STARTER_SLUG)}
              >
                Get Started
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Professional Tier */}
        <Card className="relative border-primary">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            {isCurrentPlan(PROFESSIONAL_TIER) ? (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Current Plan
              </Badge>
            ) : (
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            )}
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">Professional</CardTitle>
            <CardDescription>For growing businesses</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$499</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span>Unlimited Projects</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span>100GB Storage</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span>10 Team Members</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span>Priority Support</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span className="font-medium">Advanced Analytics</span>
            </div>
          </CardContent>
          <CardFooter>
            {isCurrentPlan(PROFESSIONAL_TIER) ? (
              <div className="w-full space-y-2">
                <Button className="w-full" variant="outline" disabled>
                  Current Plan
                </Button>
                {subscriptionDetails.subscription && (
                  <p className="text-sm text-muted-foreground text-center">
                    {subscriptionDetails.subscription.cancelAtPeriodEnd
                      ? `Expires ${formatDate(subscriptionDetails.subscription.currentPeriodEnd)}`
                      : `Renews ${formatDate(subscriptionDetails.subscription.currentPeriodEnd)}`}
                  </p>
                )}
              </div>
            ) : subscriptionDetails.hasSubscription ? (
              <Button
                className="w-full"
                onClick={handleManageSubscription}
              >
                {subscriptionDetails.subscription?.productId === STARTER_TIER ? "Upgrade" : "Change Plan"}
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() => handleCheckout(PROFESSIONAL_TIER, PROFESSIONAL_SLUG)}
              >
                Get Started
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Need a custom plan?{" "}
          <span className="text-primary cursor-pointer hover:underline">
            Contact us
          </span>
        </p>
      </div>
    </section>
  );
}
