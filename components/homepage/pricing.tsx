"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

type PricingSwitchProps = {
  onSwitch: (value: string) => void;
};

type PricingCardProps = {
  user: any;
  handleCheckout: any;
  priceIdMonthly: any;
  priceIdYearly: any;
  isYearly?: boolean;
  title: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
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
  <div className="text-center mb-16">
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
        <TabsTrigger value="0" className="w-full">Monthly</TabsTrigger>
        <TabsTrigger value="1" className="w-full">Yearly</TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
);

const PricingCard = ({
  user,
  handleCheckout,
  isYearly,
  title,
  priceIdMonthly,
  priceIdYearly,
  monthlyPrice,
  yearlyPrice,
  description,
  features,
  actionLabel,
  popular,
  exclusive,
}: PricingCardProps) => {
  const router = useRouter();
  return (
    <Card
      className={cn("w-full max-w-sm flex flex-col justify-between py-6 px-8", {
        "relative border-2 border-blue-500 dark:border-blue-400": popular,
        "shadow-2xl bg-gradient-to-b from-gray-900 to-gray-800 text-white":
          exclusive,
      })}
    >
      {popular && (
        <div className="absolute top-0 right-6 transform -translate-y-1/2">
          <div className="bg-blue-500 text-white text-sm font-medium px-4 py-1 rounded-full shadow-lg">
            Most Popular
          </div>
        </div>
      )}
      <div>
        <CardHeader className="pb-8 pt-4 space-y-1">
          <CardTitle
            className={cn("text-xl font-bold", {
              "text-white": exclusive,
              "text-gray-900 dark:text-white": !exclusive,
            })}
          >
            {title}
          </CardTitle>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold">
              {yearlyPrice && isYearly
                ? "$" + yearlyPrice
                : monthlyPrice
                ? "$" + monthlyPrice
                : "Custom"}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {yearlyPrice && isYearly
                ? "/year"
                : monthlyPrice
                ? "/month"
                : null}
            </span>
          </div>
          {isYearly && yearlyPrice && monthlyPrice && (
            <div className="text-sm text-blue-500 dark:text-blue-400 font-medium">
              Save ${monthlyPrice * 12 - yearlyPrice} yearly
            </div>
          )}
          <CardDescription
            className={cn("pt-1.5", {
              "text-gray-300": exclusive,
              "text-gray-600 dark:text-gray-300": !exclusive,
            })}
          >
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {features.map((feature: string, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <CheckCircle2
                className={cn("h-5 w-5", {
                  "text-blue-400": exclusive,
                  "text-green-500 dark:text-green-400": !exclusive,
                })}
              />
              <span
                className={cn("text-sm", {
                  "text-gray-300": exclusive,
                  "text-gray-600 dark:text-gray-300": !exclusive,
                })}
              >
                {feature}
              </span>
            </motion.div>
          ))}
        </CardContent>
      </div>
      <CardFooter className="pt-8">
        <Button
          onClick={() => {
            if (user?.id) {
              handleCheckout(isYearly ? priceIdYearly : priceIdMonthly, true);
            } else {
              toast("Please login or sign up to purchase", {
                description: "You must be logged in to make a purchase",
                action: {
                  label: "Sign Up",
                  onClick: () => router.push("/sign-up"),
                },
              });
            }
          }}
          className={cn(
            "w-full py-6 text-sm font-medium transition-all duration-200",
            {
              "bg-white text-gray-900 hover:bg-gray-100": exclusive,
              "bg-blue-500 text-white hover:bg-blue-600": popular && !exclusive,
              "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100":
                !popular && !exclusive,
            }
          )}
        >
          {actionLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function Pricing() {
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const togglePricingPeriod = (value: string) =>
    setIsYearly(parseInt(value) === 1);
  const { user } = useUser();
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);

  useEffect(() => {
    setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!));
  }, []);

  const handleCheckout = async (priceId: string, subscription: boolean) => {
    try {
      const { data } = await axios.post(
        `/api/payments/create-checkout-session`,
        {
          userId: user?.id,
          email: user?.emailAddresses?.[0]?.emailAddress,
          priceId,
          subscription,
        }
      );

      if (data.sessionId) {
        const stripe = await stripePromise;
        const response = await stripe?.redirectToCheckout({
          sessionId: data.sessionId,
        });
        return response;
      } else {
        console.error("Failed to create checkout session");
        toast("Failed to create checkout session");
        return;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast("Error during checkout");
      return;
    }
  };

  const plans = [
    {
      title: "Basic",
      monthlyPrice: 10,
      yearlyPrice: 100,
      description:
        "Perfect for individuals and small teams just getting started.",
      features: [
        "All essential features",
        "Up to 5 team members",
        "20GB storage",
        "Basic support",
      ],
      priceIdMonthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
      priceIdYearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
      actionLabel: "Get Started",
    },
    {
      title: "Pro",
      monthlyPrice: 25,
      yearlyPrice: 250,
      description: "Advanced features for growing teams and businesses.",
      features: [
        "All Basic features",
        "Up to 20 team members",
        "50GB storage",
        "Priority support",
        "Advanced analytics",
      ],
      priceIdMonthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
      priceIdYearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
      actionLabel: "Get Pro",
      popular: true,
    },
    {
      title: "Enterprise",
      description: "Custom solutions for large organizations.",
      features: [
        "All Pro features",
        "Unlimited team members",
        "Unlimited storage",
        "24/7 dedicated support",
        "Custom integrations",
        "SLA guarantees",
      ],
      actionLabel: "Contact Sales",
      priceIdMonthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
      priceIdYearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
      exclusive: true,
    },
  ];

  return (
    <section className="px-4">
      <div className="max-w-7xl mx-auto">
        <PricingHeader
          title="Choose Your Plan"
          subtitle="Select the perfect plan for your needs. All plans include a 14-day free trial."
        />
        <PricingSwitch onSwitch={togglePricingPeriod} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-10"
        >
          {plans.map((plan) => (
            <PricingCard
              key={plan.title}
              user={user}
              handleCheckout={handleCheckout}
              {...plan}
              isYearly={isYearly}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
