"use client"

import { motion } from "framer-motion"
import { ChevronRight, ChevronLeft, Sliders, Check, Palette, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FeatureThreeProps {
  preferences: string[]
  updatePreferences: (preferences: string[]) => void
  onNext: () => void
  onBack: () => void
}

export default function FeatureThree({ preferences, updatePreferences, onNext, onBack }: FeatureThreeProps) {
  const preferenceOptions = [
    { id: "darkMode", label: "Dark Mode", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "autoSave", label: "Auto-Save", icon: Sliders },
    { id: "keyboard", label: "Keyboard Shortcuts", icon: Sliders },
  ]

  const togglePreference = (preference: string) => {
    const newPreferences = preferences.includes(preference)
      ? preferences.filter((p) => p !== preference)
      : [...preferences, preference]

    updatePreferences(newPreferences)
  }

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
          <Sliders className="h-3.5 w-3.5" />
          <span>Personalization</span>
        </motion.div>

        <motion.h2 variants={item} className="text-2xl font-medium mb-3">
          Make It Your Own
        </motion.h2>

        <motion.p variants={item} className="text-muted-foreground text-sm mb-6">
          Customize the platform to match your workflow and preferences. Choose the features that matter most to you.
        </motion.p>

        <motion.div variants={item} className="space-y-3 mb-6">
          <h3 className="text-sm font-medium mb-2">Select your preferences:</h3>

          <div className="grid grid-cols-2 gap-3">
            {preferenceOptions.map((option, index) => (
              <motion.button
                key={option.id}
                type="button"
                onClick={() => togglePreference(option.id)}
                className={`
                  flex items-center justify-between px-3 py-2.5 rounded-xl border-2 text-left text-sm
                  ${
                    preferences.includes(option.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/30"
                  }
                `}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2">
                  <option.icon className="h-4 w-4 text-primary" />
                  <span>{option.label}</span>
                </div>
                {preferences.includes(option.id) && <Check className="h-4 w-4 text-primary" />}
              </motion.button>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="text-xs text-muted-foreground mt-2"
          >
            You can always change these settings later in your account preferences.
          </motion.p>
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
            Complete Tutorial
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
          {/* Settings UI Preview */}
          <div className="absolute inset-4 rounded-lg bg-background border border-border shadow-md overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="h-8 bg-secondary flex items-center px-3"
            >
              <div className="text-xs font-medium">Preferences</div>
            </motion.div>

            <div className="p-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="h-4 w-24 bg-foreground/80 rounded mb-4"
              ></motion.div>

              {/* Settings Items */}
              <div className="space-y-3">
                <motion.div
                  className={`p-2 rounded-md border flex items-center justify-between ${
                    preferences.includes("darkMode") ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-border"
                  }`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                >
                  <div className="flex items-center gap-2">
                    <Palette
                      className={`h-4 w-4 ${preferences.includes("darkMode") ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <div className="text-xs">Dark Mode</div>
                  </div>
                  <div
                    className={`w-8 h-4 rounded-full flex items-center ${
                      preferences.includes("darkMode") ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <motion.div
                      className="w-3 h-3 rounded-full bg-background shadow-sm"
                      animate={{
                        x: preferences.includes("darkMode") ? 5 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className={`p-2 rounded-md border flex items-center justify-between ${
                    preferences.includes("notifications")
                      ? "bg-primary/5 border-primary/20"
                      : "bg-muted/30 border-border"
                  }`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                >
                  <div className="flex items-center gap-2">
                    <Bell
                      className={`h-4 w-4 ${preferences.includes("notifications") ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <div className="text-xs">Notifications</div>
                  </div>
                  <div
                    className={`w-8 h-4 rounded-full flex items-center ${
                      preferences.includes("notifications") ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <motion.div
                      className="w-3 h-3 rounded-full bg-background shadow-sm"
                      animate={{
                        x: preferences.includes("notifications") ? 5 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className={`p-2 rounded-md border flex items-center justify-between ${
                    preferences.includes("autoSave") ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-border"
                  }`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.4 }}
                >
                  <div className="flex items-center gap-2">
                    <Sliders
                      className={`h-4 w-4 ${preferences.includes("autoSave") ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <div className="text-xs">Auto-Save</div>
                  </div>
                  <div
                    className={`w-8 h-4 rounded-full flex items-center ${
                      preferences.includes("autoSave") ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <motion.div
                      className="w-3 h-3 rounded-full bg-background shadow-sm"
                      animate={{
                        x: preferences.includes("autoSave") ? 5 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
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
