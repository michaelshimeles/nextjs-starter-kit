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
import { useUser } from "@clerk/nextjs";
import { useAction } from "convex/react";
import { CheckCircle2, DollarSign } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Price {
  id: string;
  priceAmount: number;
  priceCurrency: string;
  recurringInterval: 'month' | 'year';
  productId?: string;
}

interface Benefit {
  description: string;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  prices: Price[];
  benefits: Benefit[];
  isRecurring?: boolean;
  isArchived?: boolean;
  organizationId?: string;
  createdAt?: Date;
  modifiedAt?: Date | null;
  metadata?: Record<string, any>;
  medias?: any[];
  attachedCustomFields?: any[];
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
  user: ReturnType<typeof useUser>['user'];
  isYearly?: boolean;
  name: string;
  prices: Price[];
  description: string;
  benefits: Benefit[];
};

type PricingHeaderProps = {
  title: string;
  subtitle: string;
};

const PricingHeader = ({ title, subtitle }: PricingHeaderProps) => (
  <div className="text-center mb-10">
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
  name,
  prices,
  description,
  benefits,
}: PricingCardProps) => {
  const router = useRouter();
  const getProCheckoutUrl = useAction(api.subscriptions.getProOnboardingCheckoutUrl);

  const currentPrice = prices.find(price =>
    isYearly
      ? price.recurringInterval === 'year'
      : price.recurringInterval === 'month'
  ) || prices[0];

  const priceAmount = currentPrice ? (currentPrice.priceAmount / 100).toFixed(2) : '0';
  const currency = currentPrice?.priceCurrency?.toUpperCase() || 'USD';
  const interval = isYearly ? 'year' : 'month';

  const handleCheckout = async () => {
    if (!currentPrice) return;

    try {
      const checkout = await getProCheckoutUrl({
        priceId: currentPrice.id,
      });
      window.location.href = checkout;
    } catch (error) {
      console.error("Failed to get checkout URL:", error);
    }
  };

  const handleButtonClick = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    handleCheckout();
  };

  const buttonText = !user
    ? "Sign in to continue"
    : !currentPrice
      ? "No price available"
      : "Get Started";

  return (
    <Card className="relative w-full max-w-sm mx-4 transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold tracking-tight">
            {currency === 'USD' ? '$' : currency} {priceAmount}
          </span>
          <span className="text-lg text-muted-foreground">/{interval}</span>
        </div>

        <div className="space-y-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Button
          onClick={handleButtonClick}
          className="w-full text-base font-semibold bg-blue-500 hover:bg-blue-600 text-white"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function Pricing({ result }: PricingProps) {
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const [hasYearlyPlans, setHasYearlyPlans] = useState(false);
  const { user } = useUser();

  const togglePricingPeriod = (value: string) => setIsYearly(parseInt(value) === 1);

  useEffect(() => {
    // Check if any products have yearly pricing
    const hasYearly = result.items.some(product =>
      product.prices.some(price => price.recurringInterval === 'year')
    );
    setHasYearlyPlans(hasYearly);

    // If we're on yearly view but no yearly plans exist, switch to monthly
    if (isYearly && !hasYearly) {
      setIsYearly(false);
    }
  }, [result.items, isYearly]);

  // Filter products based on current interval selection
  const filteredProducts = result.items.filter(item =>
    item.prices?.some(price =>
      isYearly
        ? price.recurringInterval === 'year'
        : price.recurringInterval === 'month'
    )
  );

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
          {filteredProducts.map((item) => (
            <PricingCard
              key={item.id}
              user={user}
              name={item.name}
              description={item.description || ''}
              prices={item.prices}
              benefits={item.benefits}
              isYearly={isYearly}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
