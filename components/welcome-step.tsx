"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bell, ChevronRight, QrCode, Smartphone } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <div className="flex flex-col gap-8 justify-center items-center max-w-[500px]">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col"
      >
        <motion.h1
          variants={item}
          className="text-3xl font-medium tracking-tight mb-3"
        >
          Welcome to the Lockscreen AI
        </motion.h1>

        <motion.p
          variants={item}
          className="text-muted-foreground text-sm mb-6"
        >
          Lockscreen AI is the most powerful way to reach your
          customers—unlimited marketing impressions at a fraction of the cost.
        </motion.p>

        <motion.div
          variants={item}
          className="space-y-4 mb-6 border border-border rounded-lg p-4 bg-muted/30"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Smartphone className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium">
                Delivered on the Lock Screen
              </h3>
              <p className="text-xs text-muted-foreground">
                With our unique product, you can deliver your message on the
                most important screen: the lock screen.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Instant, Direct Marketing</h3>
              <p className="text-xs text-muted-foreground">
                Reach your audience without middlemen or platform delays. Your
                message is delivered instantly—no more waiting hours, days, or
                weeks.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <QrCode className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium">
                Personalized Branded Cards
              </h3>
              <p className="text-xs text-muted-foreground">
                Create personalized branded cards with your logo, URLs, and QR
                codes. Deliver unique messages at scale, effortlessly.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={item} className="flex justify-end">
          <Button
            onClick={onNext}
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm w-fit"
          >
            Start Onboarding
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-center items-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-64 h-auto"
        >
          <Image
            src="/images/iphone-wallet.png"
            alt="iPhone with Apple Wallet pass"
            width={500}
            height={700}
            className="w-full h-auto"
            priority
          />
        </motion.div>
      </motion.div> */}
    </div>
  );
}
