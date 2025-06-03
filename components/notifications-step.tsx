"use client";

import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Bell, Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface NotificationsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function NotificationsStep({
  onNext,
  onBack,
}: NotificationsStepProps) {
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
    <div className="grid md:grid-cols-2 gap-8 items-center">
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
          <Bell className="h-3.5 w-3.5" />
          <span>Notifications</span>
        </motion.div>

        <motion.h2 variants={item} className="text-2xl font-medium mb-3">
          Sending Notifications
        </motion.h2>

        <motion.p
          variants={item}
          className="text-muted-foreground text-sm mb-6"
        >
          Sending notifications with Lockscreen AI is seamless and instant.
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
              <Bell className="h-3 w-3 text-primary" />
            </div>
            <div>
              <p className="text-sm">
                Go to the Notifications section, select your pass, and enter
                your message.
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
              <Send className="h-3 w-3 text-primary" />
            </div>
            <div>
              <p className="text-sm">
                Once reviewed, press Send. Notifications are delivered
                immediately to all pass holders.
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
              <Users className="h-3 w-3 text-primary" />
            </div>
            <div>
              <p className="text-sm">
                Your message will be delivered to all users who have installed
                your pass on their device.
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
            Next Step
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center justify-center"
      >
        {/* Notification Icon with Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-8"
        >
          <div className="shadow-xl rounded-2xl">
            <Image
              src="/images/apple-pass-notification.png"
              alt="Apple Pass Notification"
              width={300}
              height={150}
              className="w-auto h-auto"
              priority
            />
          </div>
        </motion.div>

        {/* Notification Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="bg-background border border-border rounded-xl p-4 shadow-lg max-w-xs w-full"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-sm"
          >
            Special offer: 20% off your next purchase! Tap to redeem this
            exclusive deal.
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
