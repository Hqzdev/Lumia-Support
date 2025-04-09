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

export type ConversationRole = "user" | "assistant" | "system"

export interface ConversationMessage {
  role: ConversationRole
  content: string
}
