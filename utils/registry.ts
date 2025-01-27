import { createAnthropic } from "@ai-sdk/anthropic";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { createGroq } from '@ai-sdk/groq';
import { createOpenAI } from "@ai-sdk/openai";
import { experimental_createProviderRegistry as createProviderRegistry } from "ai";

// create provider registry
export const registry = createProviderRegistry({
  // register provider with prefix and default setup:
  anthropic: createAnthropic({
    // custom settings
    apiKey: process.env.ANTHROPIC_API_KEY,
  }),
  // register provider with prefix and custom setup:
  openai: createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  }),
  deepseek: createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY,
  }),
  groq: createGroq({
    // custom settings
    apiKey: process.env.GROQ_API_KEY,
  }),
});
