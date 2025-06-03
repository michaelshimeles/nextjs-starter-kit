"use client";

import { motion } from "framer-motion";

interface TutorialNavProps {
  currentStep: number;
  steps: string[];
  goToStep: (step: number) => void;
}

export default function TutorialNav({
  currentStep,
  steps,
  goToStep,
}: TutorialNavProps) {
  return (
    <div className="w-full flex flex-col items-center mt-4">
      {/* Top mini stepper (dots) */}
      <div className="flex items-center gap-2">
        {steps.map((stepName, index) => (
          <motion.button
            key={`dot-${index}`}
            onClick={() => goToStep(index)}
            className={`
      rounded-full transition-all duration-300 outline-none focus:ring-2 focus:ring-primary/50
      ${index === currentStep ? "w-12 h-3 bg-primary" : "w-3 h-3 bg-primary/70 hover:bg-primary"}
      cursor-pointer
    `}
            initial={false}
            animate={{
              width: index === currentStep ? 48 : 12,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            aria-label={`Go to step ${index + 1}: ${stepName}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>
    </div>
  );
}
