"use client"

import { motion } from "framer-motion"
import { Avatar } from "@/components/ui/avatar"
import { User, Bot } from "lucide-react"
import type { Message } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

interface ChatMessageProps {
  message: Message
  index: number
}

export default function ChatMessage({ message, index }: ChatMessageProps) {
  const isUser = message.sender === "user"

  // Function to format message content with markdown-like syntax
  const formatContent = (content: string) => {
    // Handle bold text (between ** **)
    let formattedContent = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

    // Handle line breaks
    formattedContent = formattedContent.replace(/\n/g, "<br />")

    return formattedContent
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`flex gap-3 mb-4 ${isUser ? "justify-end" : ""}`}
    >
      {!isUser && (
        <div className="flex-shrink-0">
          <Avatar className="h-8 w-8 bg-blue-100 border-2 border-blue-200">
            <Bot className="h-4 w-4 text-blue-600" />
          </Avatar>
        </div>
      )}
      <div className={`max-w-[80%] ${isUser ? "order-1" : "order-2"}`}>
        <div className={`rounded-2xl border-2 border-gray-200 p-3 ${isUser ? "bg-blue-600 text-white" : "bg-white"}`}>
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: formatContent(message.content) }} />
        </div>
        <div className={`text-xs text-gray-500 mt-1 ${isUser ? "text-right" : "text-left"}`}>
          {formatDistanceToNow(message.timestamp, { addSuffix: true })}
        </div>
      </div>
      {isUser && (
        <div className="flex-shrink-0">
          <Avatar className="h-8 w-8 bg-gray-100 border-2 border-gray-200">
            <User className="h-4 w-4 text-gray-600" />
          </Avatar>
        </div>
      )}
    </motion.div>
  )
}
