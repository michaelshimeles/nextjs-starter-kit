import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai.responses("gpt-4o"),
    messages,
    tools: {
      web_search_preview: openai.tools.webSearchPreview(),
    },
  });

  return result.toDataStreamResponse();
}
