import { createOpenAI } from "@ai-sdk/openai";

// Optional: Neon AI Gateway, used when AI_PROVIDER=neon. Models from many
// providers behind one Neon credential. NEON_AI_GATEWAY_BASE_URL is the
// branch's bare gateway host; the OpenAI Responses API lives under /openai/v1.
export const neon = createOpenAI({
  baseURL: `${process.env.NEON_AI_GATEWAY_BASE_URL}/openai/v1`,
  apiKey: process.env.NEON_AI_GATEWAY_TOKEN,
  fetch: async (input, init) => {
    if (typeof init?.body === "string") {
      init = { ...init, body: JSON.stringify(compatible(JSON.parse(init.body))) };
    }
    return fetch(input, init);
  },
});

// AI SDK v4 sends two things the gateway's GPT-5 models reject: a default
// `temperature` (reasoning models take none), and the `web_search_preview`
// tool, which the gateway accepts as `web_search`.
function compatible(body: Record<string, unknown>) {
  delete body.temperature;
  if (Array.isArray(body.tools)) {
    body.tools = body.tools.map((tool: { type?: string }) =>
      tool.type === "web_search_preview" ? { ...tool, type: "web_search" } : tool,
    );
  }
  return body;
}
