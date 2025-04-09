export interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export interface SupportTopic {
  id: string
  title: string
  description: string
  icon: string
}

export interface ConversationMessage {
  role: "user" | "assistant" | "system"
  content: string
}
