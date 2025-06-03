"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompletionStepProps {
  userData: {
    name: string;
    email: string;
    preferences: string[];
  };
}

export default function CompletionStep({ userData }: CompletionStepProps) {
  return (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-8">
          <CheckCircle className="h-10 w-10 text-primary-foreground" />
        </div>

        <h2 className="text-2xl font-medium mb-3">
          You&apos;re all set, {userData.name}!
        </h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-4">
          Your account has been created and your preferences have been saved.
        </p>

        <div className="bg-gray-50 rounded-xl p-6 max-w-sm mx-auto mt-6 text-left">
          <h3 className="font-medium mb-3">Your preferences</h3>
          <div className="flex flex-wrap gap-2">
            {userData.preferences.map((preference) => (
              <span
                key={preference}
                className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full"
              >
                {preference}
              </span>
            ))}
            {userData.preferences.length === 0 && (
              <span className="text-gray-500 text-sm">
                No preferences selected
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="pt-8"
      >
        <Button className="rounded-full px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
          Get Started with Product
        </Button>
      </motion.div>
    </div>
  );
}
