"use client";

import ModeToggle from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "ai/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Bot, Download, Share, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function PlaygroundPage() {
  const [model, setModel] = useState("deepseek:deepseek-reasoner");
  const [systemPrompt, setSystemPrompt] = useState("");

  // Model parameters
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [topP, setTopP] = useState(0.9);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0.0);
  const [presencePenalty, setPresencePenalty] = useState(0.0);

  const { messages, isLoading, input, handleInputChange, handleSubmit } =
    useChat({
      body: {
        model,
        temperature,
        maxTokens,
        topP,
        frequencyPenalty,
        presencePenalty,
        systemPrompt,
      },
    });

  console.log("messages", messages);

  return (
    <div className="flex h-screen dark:bg-black bg-white dark:text-white text-black">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between py-3 px-4 border-b dark:border-zinc-800 border-zinc-200">
          <div className="flex items-center gap-3">
            <Link prefetch={true} href="/">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <h1 className="text-sm font-medium">AI Playground</h1>
              </div>
            </Link>
            <Badge
              variant="outline"
              className="text-xs dark:border-zinc-800 border-zinc-200"
            >
              {model?.split(":")[1]}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs dark:border-zinc-800 border-zinc-200 dark:hover:bg-zinc-900 hover:bg-zinc-100"
            >
              <Share className="w-3.5 h-3.5 mr-1.5" />
              Share
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs dark:border-zinc-800 border-zinc-200 dark:hover:bg-zinc-900 hover:bg-zinc-100"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Export
            </Button>
          </div>
        </header>

        <ScrollArea className="flex-1 p-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-3 ${
                    message.role === "assistant"
                      ? "flex-row"
                      : "flex-row-reverse"
                  }`}
                >
                  {message.content && (
                    <div
                      className={`${
                        message.role === "user"
                          ? "bg-[#007AFF] text-white rounded-[20px] rounded-br-[8px]"
                          : "bg-[#E9E9EB] dark:bg-[#1C1C1E] text-black dark:text-white rounded-[20px] rounded-bl-[8px]"
                      } flex flex-col px-[12px] py-[8px] max-w-[280px] w-fit leading-[1.35]`}
                    >
                      <div className="text-[14px] py-1">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    </div>
                  )}{" "}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Only show loading when isLoading is true AND there's no message being streamed */}
            {isLoading &&
              messages[messages.length - 1]?.role !== "assistant" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 dark:bg-zinc-900/50 bg-white rounded-lg p-4"
                >
                  <div className="w-6 h-6 rounded-full border dark:border-zinc-800 border-zinc-200 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-1 mt-[0.5rem]">
                      <span
                        className="w-2 h-2 rounded-full dark:bg-zinc-700 bg-zinc-200 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full dark:bg-zinc-700 bg-zinc-200 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full dark:bg-zinc-700 bg-zinc-200 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t dark:border-zinc-800 border-zinc-200">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Textarea
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Send a message..."
                className="min-h-[100px] bg-transparent dark:bg-zinc-900/50 bg-white border dark:border-zinc-800 border-zinc-200 focus:border-zinc-400 dark:focus:border-zinc-600"
              />
              <div className="absolute bottom-3 right-3">
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  disabled={isLoading || !input.trim()}
                  className="h-8 bg-white hover:bg-zinc-200 text-black"
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sidebar */}
      <div className="w-80 border-l dark:border-zinc-800 border-zinc-200 dark:bg-black/50 bg-white backdrop-blur-sm">
        <div className="p-4">
          <Tabs defaultValue="model">
            <TabsList className="w-full dark:bg-zinc-900/50 bg-zinc-100 border dark:border-zinc-800 border-zinc-200">
              <TabsTrigger value="model" className="flex-1">
                Model
              </TabsTrigger>
              <TabsTrigger value="parameters" className="flex-1">
                Parameters
              </TabsTrigger>
              <TabsTrigger value="system" className="flex-1">
                System
              </TabsTrigger>
            </TabsList>

            <TabsContent value="model" className="mt-4 space-y-4">
              <div>
                <label className="text-xs dark:text-zinc-400 text-zinc-600 mb-2 block">
                  Model
                </label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger className="dark:bg-zinc-900/50 bg-white border dark:border-zinc-800 border-zinc-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai:gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="openai:gpt-4">GPT-4</SelectItem>
                    <SelectItem value="openai:gpt-3.5-turbo">
                      GPT-3.5 Turbo
                    </SelectItem>
                    <SelectItem value="openai:gpt-4-turbo">
                      GPT-4 Turbo
                    </SelectItem>
                    {/* <SelectItem value="claude-3-haiku-20240307">Claude 3 Haiku</SelectItem>
                    <SelectItem value="claude-3-sonnet-20240307">Claude 3 Sonnet</SelectItem>
                    <SelectItem value="claude-3-opus-20240307">Claude 3 Opus</SelectItem> */}
                    <SelectItem value="deepseek:deepseek-chat">
                      Deepseek Chat
                    </SelectItem>
                    <SelectItem value="deepseek:deepseek-coder">
                      Deepseek Coder
                    </SelectItem>
                    <SelectItem value="deepseek:deepseek-reasoner">
                      Deepseek Reasoner
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="parameters" className="mt-4 space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-xs dark:text-zinc-400 text-zinc-600 mb-2 block">
                    Temperature ({temperature})
                  </label>
                  <Slider
                    value={[temperature]}
                    onValueChange={([value]) => setTemperature(value)}
                    max={2}
                    step={0.1}
                  />
                </div>

                <div>
                  <label className="text-xs dark:text-zinc-400 text-zinc-600 mb-2 block">
                    Max Tokens ({maxTokens})
                  </label>
                  <Slider
                    value={[maxTokens]}
                    onValueChange={([value]) => setMaxTokens(value)}
                    max={4000}
                    step={100}
                  />
                </div>

                <div>
                  <label className="text-xs dark:text-zinc-400 text-zinc-600 mb-2 block">
                    Top P ({topP})
                  </label>
                  <Slider
                    value={[topP]}
                    onValueChange={([value]) => setTopP(value)}
                    max={1}
                    step={0.1}
                  />
                </div>

                <div>
                  <label className="text-xs dark:text-zinc-400 text-zinc-600 mb-2 block">
                    Frequency Penalty ({frequencyPenalty})
                  </label>
                  <Slider
                    value={[frequencyPenalty]}
                    onValueChange={([value]) => setFrequencyPenalty(value)}
                    max={2}
                    step={0.1}
                  />
                </div>

                <div>
                  <label className="text-xs dark:text-zinc-400 text-zinc-600 mb-2 block">
                    Presence Penalty ({presencePenalty})
                  </label>
                  <Slider
                    value={[presencePenalty]}
                    onValueChange={([value]) => setPresencePenalty(value)}
                    max={2}
                    step={0.1}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="system" className="mt-4 space-y-4">
              <div>
                <label className="text-xs dark:text-zinc-400 text-zinc-600 mb-2 block">
                  System Prompt
                </label>
                <Textarea
                  placeholder="Enter a custom system prompt (leave empty to use default)"
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="h-[200px] dark:bg-zinc-900/50 bg-white border dark:border-zinc-800 border-zinc-200"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
