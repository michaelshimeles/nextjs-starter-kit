"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TutorialIntroProps {
  onNext: () => void
}

export default function TutorialIntro({ onNext }: TutorialIntroProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col">
        <motion.h1 variants={item} className="text-3xl font-medium tracking-tight mb-3">
          Welcome to the Product Tour
        </motion.h1>

        <motion.p variants={item} className="text-muted-foreground text-sm mb-4">
          This tutorial will guide you through the key features of our platform and help you get started quickly.
        </motion.p>

        <motion.div variants={item} className="space-y-4 mb-6 border border-border rounded-lg p-4 bg-muted/30">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex items-start gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary text-xs">1</span>
            </div>
            <div>
              <h3 className="text-sm font-medium">Powerful Workspaces</h3>
              <p className="text-xs text-muted-foreground">Organize your projects with customizable workspaces</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex items-start gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary text-xs">2</span>
            </div>
            <div>
              <h3 className="text-sm font-medium">Seamless Collaboration</h3>
              <p className="text-xs text-muted-foreground">Work together with your team in real-time</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="flex items-start gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary text-xs">3</span>
            </div>
            <div>
              <h3 className="text-sm font-medium">Personalized Experience</h3>
              <p className="text-xs text-muted-foreground">Customize the platform to match your workflow</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={item}>
          <Button
            onClick={onNext}
            className="rounded-full px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm w-fit"
          >
            Start Tutorial
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
          {/* App UI Preview */}
          <div className="absolute inset-4 rounded-lg bg-background border border-border shadow-md overflow-hidden">
            <div className="h-6 bg-secondary flex items-center px-2 gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/70"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-chart-3/70"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-chart-2/70"></div>
            </div>
            <div className="p-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="h-4 w-24 bg-muted rounded mb-3"
              ></motion.div>

              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  className="h-3 bg-muted rounded w-full"
                ></motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.4 }}
                  className="h-3 bg-muted rounded w-5/6"
                ></motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.4 }}
                  className="h-3 bg-muted rounded w-4/6"
                ></motion.div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                  className="h-12 bg-primary/10 rounded border border-primary/20"
                ></motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.4 }}
                  className="h-12 bg-primary/10 rounded border border-primary/20"
                ></motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.4 }}
                  className="h-12 bg-primary/10 rounded border border-primary/20"
                ></motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.4 }}
                  className="h-12 bg-primary/10 rounded border border-primary/20"
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
