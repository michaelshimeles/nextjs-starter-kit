import { registry } from "@/utils/registry";
import { groq } from "@ai-sdk/groq";
import {
  extractReasoningMiddleware,
  streamText,
  experimental_wrapLanguageModel as wrapLanguageModel,
} from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    model,
    temperature,
    maxTokens,
    topP,
    frequencyPenalty,
    presencePenalty,
    systemPrompt,
  } = await req.json();

  const defaultSystemPrompt = `
    You are an advanced AI assistant in an interactive playground environment. Your primary goals are:
    1. Knowledge & Assistance: Share knowledge and provide assistance across a wide range of topics
    2. Code & Technical Help: Offer coding help, debug issues, and explain technical concepts
    3. Clear Communication: Communicate clearly and effectively, using appropriate technical depth
    4. Safety & Ethics: Maintain safety and ethical behavior, avoiding harmful or malicious content

    Guidelines:
    - Be direct and concise in responses
    - Show code examples when relevant
    - Explain complex topics in digestible parts
    - Maintain a helpful and professional tone
    - Acknowledge limitations and uncertainties
    - Prioritize user safety and ethical considerations
  `;

  const role =
    messages?.[messages?.length - 1].role === "user" ? "user" : "assistant";

  const enhancedModel = wrapLanguageModel({
    model: groq("deepseek-r1-distill-llama-70b"),
    middleware: extractReasoningMiddleware({ tagName: "think" }),
  });

  const result = streamText({
    model:
      model === "deepseek:deepseek-reasoner"
        ? enhancedModel
        : registry.languageModel(model),
    messages,
    temperature: temperature || 0.7,
    maxTokens: maxTokens || 1000,
    topP: topP || 0.9,
    frequencyPenalty: frequencyPenalty || 0.0,
    presencePenalty: presencePenalty || 0.0,
    system: systemPrompt || defaultSystemPrompt,
    // tools,
    maxSteps: 5,
    onStepFinish({
      text,
      toolCalls,
      toolResults,
      finishReason,
      usage,
      stepType,
    }) {
      // your own logic, e.g. for saving the chat history or recording usage
      console.log("stepType", stepType);
      console.log("text", text);
      console.log("finishReason", finishReason);
      console.log("usage", usage);

      if (finishReason === "tool-calls") {
        const toolInvocations = toolResults?.[0];
        // saveToolResult(userId!, toolInvocations);
        console.log("toolInvocations", toolInvocations);
      }
    },
    onFinish: ({ text, toolResults, toolCalls, finishReason }) => {
      console.log("text", text);
      console.log("finishReason", finishReason);
      // insertMessage(userId!, "assistant", text);
    },
  });

  return result.toDataStreamResponse({
    sendReasoning: true,
  });
}
