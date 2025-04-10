import { 
  OPENROUTER_API_KEY, 
  OPENROUTER_API_URL, 
  DEFAULT_MODEL, 
  DEFAULT_TEMPERATURE, 
  DEFAULT_MAX_TOKENS,
  DEFAULT_FREQUENCY_PENALTY,
  DEFAULT_PRESENCE_PENALTY
} from "./config"
import type { ConversationMessage } from "./types"

interface OpenRouterResponse {
  choices: {
    message: {
      content: string
    }
  }[]
}

export async function generateAIResponse(
  userInput: string,
  conversationHistory: ConversationMessage[]
): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OpenRouter API key is not configured")
  }

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://luren.vercel.app",
        "X-Title": "Lumia AI Support",
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: [
          {
            role: "system",
            content: `You are Lumia AI Support Assistant, an expert in artificial intelligence and technical troubleshooting.

Key Guidelines:
• Provide verified, up-to-date information
• Use clear, concise language without repetition
• Format responses with Markdown for readability
• Break down complex answers into logical sections
• Stay professional but approachable
• Define technical terms for beginners

Response Structure:
1. Use bullet points and numbered lists
2. Include code blocks when needed
3. Highlight key terms in bold/italic
4. Organize by sections (e.g., Cause → Solution → Prevention)

Example Queries:
• "CUDA out of memory" → Explain causes + step-by-step fixes
• "Model comparison" → Compare features, use cases, limitations
• "Prompt optimization" → Provide actionable examples

For errors: Prioritize quick solutions, then explain prevention.
For beginners: Define terms and provide learning resources.`
          },
          ...conversationHistory,
        ],
        temperature: DEFAULT_TEMPERATURE,
        max_tokens: DEFAULT_MAX_TOKENS,
        frequency_penalty: DEFAULT_FREQUENCY_PENALTY,
        presence_penalty: DEFAULT_PRESENCE_PENALTY,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`)
    }

    const data: OpenRouterResponse = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("Error generating AI response:", error)
    throw error
  }
} 