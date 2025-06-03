"use client";

import type React from "react";

import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoStepProps {
  userData: {
    name: string;
    email: string;
    preferences: string[];
  };
  updateUserData: (
    data: Partial<{ name: string; email: string; preferences: string[] }>,
  ) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PersonalInfoStep({
  userData,
  updateUserData,
  onNext,
  onBack,
}: PersonalInfoStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-medium mb-2">Tell us about yourself</h2>
        <p className="text-gray-500 text-sm mb-6">
          We&apos;ll personalize your experience based on your information.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <Input
              id="name"
              value={userData.name}
              onChange={(e) => updateUserData({ name: e.target.value })}
              className="rounded-lg border-border focus:ring-2 focus:ring-primary/50 focus:border-primary h-10 text-sm"
              placeholder="Your name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={userData.email}
              onChange={(e) => updateUserData({ email: e.target.value })}
              className="rounded-lg border-border focus:ring-2 focus:ring-primary/50 focus:border-primary h-10 text-sm"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              onClick={onBack}
              variant="ghost"
              className="rounded-full px-4 py-2 text-sm"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <Button
              type="submit"
              className="rounded-full px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
            >
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
