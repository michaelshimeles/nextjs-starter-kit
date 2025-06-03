"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  CreditCard,
  Upload,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PassCreationStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PassCreationStep({
  onNext,
  onBack,
}: PassCreationStepProps) {
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
          <CreditCard className="h-3.5 w-3.5" />
          <span>Pass Creation</span>
        </motion.div>

        <motion.h2 variants={item} className="text-2xl font-medium mb-3">
          Create Your Pass
        </motion.h2>

        <motion.p
          variants={item}
          className="text-muted-foreground text-sm mb-6"
        >
          Lockscreen AI generates a unique pass that customers can add to their
          mobile device. Our simple two-step builder makes it easy.
        </motion.p>

        <motion.div
          variants={item}
          className="space-y-4 mb-6 bg-muted/50 rounded-lg p-4 border border-border"
        >
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertCircle className="h-3 w-3 text-primary" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <p className="text-sm">
                All fields in the pass builder are customer-facing. Customers
                will see the pass name, description, and other fields from the
                pass builder—make sure your content is customer ready.
              </p>
            </motion.div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertCircle className="h-3 w-3 text-primary" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <p className="text-sm">
                Each input field has a character limit. Content exceeding that
                limit won&apos;t appear on the pass.
              </p>
            </motion.div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Upload className="h-3 w-3 text-primary" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <p className="text-sm">
                Images must be in PNG format. Logos should be sized 160x160, and
                thumbnails 375x144. Any other formats or aspect ratios will be
                rejected.
              </p>
            </motion.div>
          </div>
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
        className="flex justify-center items-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            rotate: { duration: 0.7, ease: "easeOut" },
          }}
          className="relative"
          whileHover={{
            scale: 1.05,
            rotate: 2,
            transition: { duration: 0.3 },
          }}
        >
          <div className="shadow-2xl rounded-3xl">
            <Image
              src="/images/apple-wallet-card.png"
              alt="Apple Wallet Pass"
              width={300}
              height={400}
              className="w-auto h-auto max-w-[280px]"
              priority
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-2 px-4 rounded-full whitespace-nowrap"
          >
            Your branded pass
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
