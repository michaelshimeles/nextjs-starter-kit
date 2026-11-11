import { neon } from "@/lib/ai";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// OpenAI by default; Neon AI Gateway when AI_PROVIDER=neon.
const useNeon = process.env.AI_PROVIDER === "neon";
const provider = useNeon ? neon : openai;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: provider.responses(useNeon ? "gpt-5-mini" : "gpt-4o"),
    messages,
    tools: {
      web_search_preview: provider.tools.webSearchPreview(),
    },
  });

  return result.toDataStreamResponse();
}
