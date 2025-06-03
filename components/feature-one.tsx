"use client"

import { motion } from "framer-motion"
import { ChevronRight, ChevronLeft, Layers, Plus, Folder, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FeatureOneProps {
  onNext: () => void
  onBack: () => void
}

export default function FeatureOne({ onNext, onBack }: FeatureOneProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4 w-fit"
        >
          <Layers className="h-3.5 w-3.5" />
          <span>Workspaces</span>
        </motion.div>

        <motion.h2 variants={item} className="text-2xl font-medium mb-3">
          Organize with Workspaces
        </motion.h2>

        <motion.p variants={item} className="text-muted-foreground text-sm mb-6">
          Workspaces help you organize your projects and keep everything in one place. Create multiple workspaces for
          different aspects of your work.
        </motion.p>

        <motion.div variants={item} className="space-y-4 mb-6 bg-muted/50 rounded-lg p-4 border border-border">
          <h3 className="text-sm font-medium mb-2">Key Features:</h3>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex items-start gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Plus className="h-3 w-3 text-primary" />
            </div>
            <div>
              <p className="text-sm">Create unlimited workspaces for different projects</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex items-start gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Folder className="h-3 w-3 text-primary" />
            </div>
            <div>
              <p className="text-sm">Organize content with folders and subfolders</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="flex items-start gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Settings className="h-3 w-3 text-primary" />
            </div>
            <div>
              <p className="text-sm">Customize workspace settings to match your workflow</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={item} className="flex justify-between pt-4">
          <Button type="button" onClick={onBack} variant="ghost" className="rounded-full px-4 py-2 text-sm">
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
          {/* Workspace UI Preview */}
          <div className="absolute inset-4 rounded-lg bg-background border border-border shadow-md overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="h-8 bg-secondary flex items-center px-3"
            >
              <div className="text-xs font-medium">Workspaces</div>
            </motion.div>

            <div className="p-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="flex items-center justify-between mb-4"
              >
                <div className="h-4 w-24 bg-muted rounded"></div>
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plus className="h-3 w-3 text-primary" />
                </div>
              </motion.div>

              {/* Workspace Items */}
              <div className="space-y-3">
                <motion.div
                  className="p-2 rounded-md bg-primary/5 border border-primary/20 flex items-center gap-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                >
                  <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                    <Layers className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="h-3 w-20 bg-foreground/70 rounded"></div>
                    <div className="h-2 w-16 bg-muted-foreground/50 rounded mt-1"></div>
                  </div>
                </motion.div>

                <motion.div
                  className="p-2 rounded-md bg-muted/50 border border-border flex items-center gap-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                >
                  <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                    <Folder className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="h-3 w-20 bg-muted rounded"></div>
                    <div className="h-2 w-16 bg-muted/70 rounded mt-1"></div>
                  </div>
                </motion.div>

                <motion.div
                  className="p-2 rounded-md bg-muted/50 border border-border flex items-center gap-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.4 }}
                >
                  <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                    <Folder className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="h-3 w-20 bg-muted rounded"></div>
                    <div className="h-2 w-16 bg-muted/70 rounded mt-1"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
