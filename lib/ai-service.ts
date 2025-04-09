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
            content: "You are Lumia AI Support Assistant. Provide helpful, accurate, and concise responses. Use markdown formatting for better readability. Do not repeat yourself or the same phrases multiple times.",
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