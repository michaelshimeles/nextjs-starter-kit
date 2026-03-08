import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createRouteHandler } from "@/lib/routeHandler";
import { NextResponse } from "next/server";

// IF this is public you might want to add a rate limiter! However I have added authentication checks.
export const POST = createRouteHandler(
  { isAuthenticated: true },
  async (req) => {
    const { messages } = await req.json();

    const result = streamText({
      model: openai.responses("gpt-4o"),
      messages,
      tools: {
        web_search_preview: openai.tools.webSearchPreview(),
      },
    });

    return result.toDataStreamResponse() as unknown as NextResponse;
  },
);
