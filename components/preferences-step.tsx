"use client";

import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PreferencesStepProps {
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

export default function PreferencesStep({
  userData,
  updateUserData,
  onNext,
  onBack,
}: PreferencesStepProps) {
  const preferences = [
    "Design",
    "Development",
    "Marketing",
    "Analytics",
    "Productivity",
    "Communication",
  ];

  const togglePreference = (preference: string) => {
    const newPreferences = userData.preferences.includes(preference)
      ? userData.preferences.filter((p) => p !== preference)
      : [...userData.preferences, preference];

    updateUserData({ preferences: newPreferences });
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-medium mb-2">Select your interests</h2>
        <p className="text-gray-500 text-sm mb-6">
          We&apos;ll customize your experience based on your preferences.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {preferences.map((preference) => (
            <motion.button
              key={preference}
              type="button"
              onClick={() => togglePreference(preference)}
              className={`
                flex items-center justify-between px-3 py-2 rounded-xl border-2 text-left text-sm
                ${
                  userData.preferences.includes(preference)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/30"
                }
              `}
              whileTap={{ scale: 0.98 }}
            >
              <span>{preference}</span>
              {userData.preferences.includes(preference) && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </motion.button>
          ))}
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
            onClick={onNext}
            className="rounded-full px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
          >
            Continue
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
