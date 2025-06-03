"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Users,
  MessageSquare,
  Share2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeatureTwoProps {
  onNext: () => void;
  onBack: () => void;
}

export default function FeatureTwo({ onNext, onBack }: FeatureTwoProps) {
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
          <Users className="h-3.5 w-3.5" />
          <span>Collaboration</span>
        </motion.div>

        <motion.h2 variants={item} className="text-2xl font-medium mb-3">
          Seamless Collaboration
        </motion.h2>

        <motion.p
          variants={item}
          className="text-muted-foreground text-sm mb-6"
        >
          Work together with your team in real-time. Share projects, leave
          comments, and track changes all in one place.
        </motion.p>

        <motion.div
          variants={item}
          className="space-y-4 mb-6 bg-muted/50 rounded-lg p-4 border border-border"
        >
          <h3 className="text-sm font-medium mb-2">Key Features:</h3>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex items-start gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Users className="h-3 w-3 text-primary" />
            </div>
            <div>
              <p className="text-sm">
                Invite team members to collaborate on projects
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
              <MessageSquare className="h-3 w-3 text-primary" />
            </div>
            <div>
              <p className="text-sm">
                Comment directly on content for contextual feedback
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
              <Clock className="h-3 w-3 text-primary" />
            </div>
            <div>
              <p className="text-sm">
                Track version history and changes over time
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={item} className="flex justify-between pt-4">
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
            Next Feature
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-muted rounded-xl p-6 aspect-square max-w-sm mx-auto flex items-center justify-center border border-border"
      >
        <div className="relative w-full h-full">
          {/* Collaboration UI Preview */}
          <div className="absolute inset-4 rounded-lg bg-background border border-border shadow-md overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="h-8 bg-secondary flex items-center px-3"
            >
              <div className="text-xs font-medium">Project Collaboration</div>
            </motion.div>

            <div className="p-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="flex items-center justify-between mb-4"
              >
                <div className="h-4 w-32 bg-foreground/80 rounded"></div>
                <div className="flex -space-x-2">
                  <motion.div
                    className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground ring-2 ring-background"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                  >
                    A
                  </motion.div>
                  <motion.div
                    className="w-6 h-6 rounded-full bg-chart-2 flex items-center justify-center text-xs text-primary-foreground ring-2 ring-background"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                  >
                    B
                  </motion.div>
                  <motion.div
                    className="w-6 h-6 rounded-full bg-chart-3 flex items-center justify-center text-xs text-primary-foreground ring-2 ring-background"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.3 }}
                  >
                    C
                  </motion.div>
                </div>
              </motion.div>

              {/* Document with Comments */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                className="space-y-2 mb-3"
              >
                <div className="h-2 bg-muted rounded w-full"></div>
                <div className="h-2 bg-muted rounded w-5/6"></div>
                <div className="h-2 bg-muted rounded w-full"></div>
              </motion.div>

              <motion.div
                className="ml-4 border-l-2 border-primary pl-2 py-1 my-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground">
                    A
                  </div>
                  <div className="text-xs font-medium">User A</div>
                  <div className="text-[10px] text-muted-foreground">
                    Just now
                  </div>
                </div>
                <div className="text-xs bg-primary/5 p-1.5 rounded border border-primary/10">
                  Let&apos;s revise this section to be more clear.
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.4 }}
                className="space-y-2"
              >
                <div className="h-2 bg-muted rounded w-4/6"></div>
                <div className="h-2 bg-muted rounded w-full"></div>
                <div className="h-2 bg-muted rounded w-5/6"></div>
              </motion.div>

              {/* Share Button */}
              <motion.div
                className="absolute bottom-3 right-3 bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.4 }}
              >
                <Share2 className="h-3 w-3" />
                <span>Share</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
