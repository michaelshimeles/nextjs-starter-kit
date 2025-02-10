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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useAction } from "convex/react";
import { CheckCircle2, DollarSign } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Price {
  priceAmount: number;
  recurringInterval: 'month' | 'year';
}

interface Product {
  createdAt: Date;
  modifiedAt: Date | null;
  id: string;
  name: string;
  description: string | null;
  isRecurring: boolean;
  isArchived: boolean;
  organizationId: string;
  metadata: Record<string, any>;
  prices: Price[];
  benefits: Array<{ description: string }>;
  medias: any[];
  attachedCustomFields: any[];
}

interface PricingProps {
  result: {
    items: Product[];
    pagination: {
      totalCount: number;
      maxPage: number;
    };
  };
}

type PricingSwitchProps = {
  onSwitch: (value: string) => void;
};

type PricingCardProps = {
  user: any; // We keep this as any since it comes from Clerk
  isYearly?: boolean;
  title: string;
  prices: Price[];
  description: string;
  features: string[];
  actionLabel: string;
  popular?: boolean;
  exclusive?: boolean;
};

const PricingHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div className="text-center mb-10">
    {/* Pill badge */}
    <div className="mx-auto w-fit rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30 px-4 py-1 mb-6">
      <div className="flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-200">
        <DollarSign className="h-4 w-4" />
        <span>Pricing</span>
      </div>
    </div>

    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white pb-2">
      {title}
    </h2>
    <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
      {subtitle}
    </p>
  </div>
);

const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => (
  <div className="flex justify-center items-center gap-3">
    <Tabs defaultValue="0" className="w-[400px]" onValueChange={onSwitch}>
      <TabsList className="w-full">
        <TabsTrigger value="0" className="w-full">
          Monthly
        </TabsTrigger>
        <TabsTrigger value="1" className="w-full">
          Yearly
        </TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
);

const PricingCard = ({
  user,
  isYearly,
  title,
  prices,
  description,
  features,
  actionLabel,
  popular,
  exclusive,
}: PricingCardProps) => {
  const router = useRouter();

  const currentPrice: any = prices.find(price =>
    isYearly
      ? price.recurringInterval === 'year'
      : price.recurringInterval === 'month'
  );
  const getProCheckoutUrl = useAction(api.subscriptions.getProOnboardingCheckoutUrl);


  const priceAmount = currentPrice ? (currentPrice.priceAmount / 100).toFixed(2) : 0;

  const handleCheckout = async (priceId: string) => {

    try {
      const checkoutProUrl = await getProCheckoutUrl({
        priceId
      });

      if (checkoutProUrl) {
        window.location.href = checkoutProUrl;
      }
    } catch (error) {
      console.error("Failed to get checkout URL:", error);
    }
  };

  return (
    <Card
      className={cn(
        "relative w-full max-w-sm mx-4 transition-all duration-300 hover:scale-105",
        {
          "border-2 border-blue-500 dark:border-blue-400 shadow-lg": popular,
          "bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl": exclusive,
          "hover:shadow-lg": !exclusive,
        }
      )}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-fit rounded-full bg-blue-500 dark:bg-blue-400 px-4 py-1">
          <p className="text-sm font-medium text-white">Most Popular</p>
        </div>
      )}

      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription
          className={cn("text-base", {
            "text-gray-300": exclusive,
          })}
        >
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-baseline gap-2">
          <span className={cn("text-5xl font-bold tracking-tight", {
            "text-white": exclusive,
          })}>
            ${priceAmount}
          </span>
          <span
            className={cn("text-lg text-muted-foreground", {
              "text-gray-300": exclusive,
            })}
          >
            /{isYearly ? 'year' : 'month'}
          </span>
        </div>

        <div className="space-y-3">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <CheckCircle2
                className={cn("h-5 w-5 flex-shrink-0 text-blue-500", {
                  "text-blue-400": exclusive,
                })}
              />
              <p
                className={cn("text-sm text-muted-foreground", {
                  "text-gray-300": exclusive,
                })}
              >
                {feature}
              </p>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Button
          onClick={() => {
            if (!user) {
              router.push("/sign-in");
              return;
            }
            handleCheckout(currentPrice?.id);
          }}
          className={cn("w-full text-base font-semibold", {
            "bg-blue-500 hover:bg-blue-600 text-white": popular,
            "bg-white text-gray-900 hover:bg-gray-100": exclusive,
          })}
        >
          {actionLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function Pricing({ result }: PricingProps) {
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const [plans, setPlans] = useState<Omit<PricingCardProps, 'user' | 'isYearly'>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasYearlyPlans, setHasYearlyPlans] = useState(false);

  const togglePricingPeriod = (value: string) =>
    setIsYearly(parseInt(value) === 1);
  const { user } = useUser();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // Check if any products have yearly pricing
        const hasYearly = result.items.some(product =>
          product.prices.some(price => price.recurringInterval === 'year')
        );
        setHasYearlyPlans(hasYearly);

        // If we're on yearly view but no yearly plans exist, switch to monthly
        if (isYearly && !hasYearly) {
          setIsYearly(false);
        }

        const formattedPlans = result.items.map(product => ({
          title: product.name,
          prices: product.prices,
          description: product.description || "No description available",
          features: product.benefits.map(benefit => benefit.description) || [
            "All Basic features",
            "Up to 20 team members",
            "50GB storage",
            "Priority support",
            "Advanced analytics",
          ],
          actionLabel: "Get Started",
          popular: true,
        }));

        setPlans(formattedPlans);
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, [isYearly]);

  if (isLoading) {
    return (
      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          <PricingHeader
            title="Choose Your Plan"
            subtitle="Select the perfect plan for your needs. All plans include a 14-day free trial."
          />
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (plans.length === 0) {
    return (
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <PricingHeader
            title="No Plans Available"
            subtitle="Please set up your products in the Polar dashboard to display pricing plans."
          />
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => window.open('https://polar.sh/dashboard', '_blank')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Setup Products in Polar
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <PricingHeader
          title="Choose Your Plan"
          subtitle="Select the perfect plan for your needs. All plans include a 14-day free trial."
        />
        {hasYearlyPlans && (
          <div className="mt-8 mb-12">
            <PricingSwitch onSwitch={togglePricingPeriod} />
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-center items-center gap-8 mt-8"
        >
          {plans
            .filter(plan => {
              // Only show plans that have prices for the current interval
              return plan.prices.some(price =>
                isYearly
                  ? price.recurringInterval === 'year'
                  : price.recurringInterval === 'month'
              );
            })
            .map((plan) => (
              <PricingCard
                key={plan.title}
                user={user}
                {...plan}
                isYearly={isYearly}
              />
            ))}
        </motion.div>
      </div>
    </section>
  );
}
