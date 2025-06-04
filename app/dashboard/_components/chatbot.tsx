"use client";
import { Input } from "@/components/ui/input";
import { Bot, X } from "lucide-react";
import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  return (
    <div className="absolute bottom-4 right-4 z-[99]">
      <div
        className="rounded-full bg-black/10 cursor-pointer border p-3"
        onClick={() => setOpen(!open)}
      >
        <Bot className="w-4 h-4 transition-transform hover:scale-125 hover:rotate-12 duration-300 ease-in-out" />
      </div>
      {open && (
        <div className="absolute bottom-12 right-4 w-80 z-[99] dark:bg-black bg-white">
          <div className="flex flex-col items-start justify-between gap-3 rounded-lg border h-96 shadow-lg p-4">
            <div className="w-full">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Nextjs Starter Kit</h3>
                <X
                  className="w-4 h-4 hover:cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Ask me anything about Nextjs Starter Kit
              </p>
            </div>
            <div className="flex  items-end justify-center gap-2 w-full">
              <Input className="w-full" placeholder="Ask me anything" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
