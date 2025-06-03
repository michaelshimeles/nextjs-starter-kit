"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  BarChart3,
  LineChart,
  PieChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalyticsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function AnalyticsStep({ onNext, onBack }: AnalyticsStepProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 max-w-[500px]">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col"
      >
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4 w-fit"
        >
          <BarChart3 className="h-3.5 w-3.5" />
          <span>Analytics</span>
        </motion.div>

        <motion.h2 variants={item} className="text-2xl font-medium mb-3">
          Track Performance with Analytics
        </motion.h2>

        <motion.p
          variants={item}
          className="text-muted-foreground text-sm mb-6"
        >
          Access detailed analytics on message delivery and pass installations.
        </motion.p>

        <motion.div
          variants={item}
          className="space-y-4 mb-6 bg-muted/50 rounded-lg p-4 border border-border"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex items-start gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <BarChart3 className="h-3 w-3 text-primary" />
            </div>
            <div>
              <p className="text-sm">
                Navigate to the Analytics tab and select the pass from the
                dropdown in the top right corner.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex items-start gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <LineChart className="h-3 w-3 text-primary" />
            </div>
            <div>
              <p className="text-sm">
                You&apos;ll see how many passes have been installed, how many
                are still active, and how many messages have been sent.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="flex items-start gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <PieChart className="h-3 w-3 text-primary" />
            </div>
            <div>
              <p className="text-sm">
                Use these insights to optimize your messaging strategy and
                improve engagement with your audience.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={item} className="flex justify-between pt-4">
          <Button
            type="button"
            onClick={onBack}
            variant="ghost"
            className="rounded-full text-sm"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          <Button
            onClick={onNext}
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
          >
            Complete Tutorial
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
