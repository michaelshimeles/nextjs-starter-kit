"use client"

import { cn } from "@/lib/utils"
import { format } from "date-fns"

type PlaygroundMessageProps = {
  message: {
    role: "user" | "assistant"
    content: string
    timestamp: Date
  }
}

export function PlaygroundMessage({ message }: PlaygroundMessageProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%]",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        <div className="flex flex-col">
          <div className="text-sm break-words">{message.content}</div>
          <div className="text-xs mt-1 opacity-70">
            {format(new Date(message.timestamp), "HH:mm")}
          </div>
        </div>
      </div>
    </div>
  )
}
