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

export type LogEventType = 
  | "PAGE_VIEW"
  | "CHAT_MESSAGE"
  | "AI_RESPONSE"
  | "TOPIC_SELECT"
  | "NAVIGATION"
  | "ERROR"
  | "BUTTON_CLICK"

export interface LogEvent {
  id: string
  timestamp: Date
  type: LogEventType
  userId?: string
  sessionId: string
  data: {
    path?: string
    message?: string
    response?: string
    topic?: string
    error?: string
    target?: string
    action?: string
  }
}
