"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth/auth-client";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
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

export default function PricingTable({ subscriptionDetails }: PricingTableProps) {
  const router = useRouter();
  const handleCheckout = async (productId: string, slug: string) => {
    try {
      const orgResponse = await authClient.organization.list();
      const organizationId = orgResponse?.data?.[0]?.id;

      if (!organizationId) {
        router.push("/onboarding");
        return; // Critical: prevent checkout from proceeding
      }

      await authClient.checkout({
        products: [productId],
        slug: slug,
        referenceId: organizationId,
      });
    } catch (error) {
      console.error("Checkout failed:", error);
      // TODO: Add user-facing error notification
      toast.error("Oops, something went wrong");
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
    throw new Error(
      "Missing required environment variables for Professional tier",
    );
  }

  const isCurrentPlan = (tierProductId: string) => {
    return subscriptionDetails.hasSubscription && 
           subscriptionDetails.subscription?.productId === tierProductId &&
           subscriptionDetails.subscription?.status === "active";
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-muted-foreground">
          Choose the plan that fits your needs
        </p>
      </div>

      {/* Current Subscription Summary */}
      {subscriptionDetails.hasSubscription && subscriptionDetails.subscription && (
        <div className="mb-8 w-full max-w-2xl">
          <Card className="border-2 border-green-200 bg-green-50">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Current Subscription
                </Badge>
              </div>
              <CardTitle className="text-xl">
                {subscriptionDetails.subscription.productId === PROFESSIONAL_TIER 
                  ? "Professional Plan" 
                  : subscriptionDetails.subscription.productId === STARTER_TIER 
                  ? "Starter Plan" 
                  : "Active Plan"}
              </CardTitle>
              <CardDescription>
                ${subscriptionDetails.subscription.amount / 100} {subscriptionDetails.subscription.currency.toUpperCase()} / {subscriptionDetails.subscription.recurringInterval}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              {subscriptionDetails.error ? (
                <div className="space-y-2">
                  <p className="text-sm text-orange-600 font-medium">
                    {subscriptionDetails.error}
                  </p>
                  {subscriptionDetails.subscription.cancelAtPeriodEnd && (
                    <p className="text-sm text-muted-foreground">
                      Access continues until {formatDate(subscriptionDetails.subscription.currentPeriodEnd)}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {subscriptionDetails.subscription.cancelAtPeriodEnd 
                    ? `Expires on ${formatDate(subscriptionDetails.subscription.currentPeriodEnd)}`
                    : `Next billing date: ${formatDate(subscriptionDetails.subscription.currentPeriodEnd)}`
                  }
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Starter Tier */}
        <Card className="relative h-fit">
          {isCurrentPlan(STARTER_TIER) && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
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
              <span>1 Pass</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span>15k push notifications per month</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span>1 seat per workspace</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span>Email support</span>
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
                      : `Renews ${formatDate(subscriptionDetails.subscription.currentPeriodEnd)}`
                    }
                  </p>
                )}
              </div>
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
              <Badge variant="secondary" className="bg-green-100 text-green-800">
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
              <span>5 Passes</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span>150K push notifications per month</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span>3 seats per organization</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span>Priority support</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span className="font-medium">No branding watermark</span>
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
                      : `Renews ${formatDate(subscriptionDetails.subscription.currentPeriodEnd)}`
                    }
                  </p>
                )}
              </div>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleCheckout(PROFESSIONAL_TIER, PROFESSIONAL_SLUG)
                }
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
