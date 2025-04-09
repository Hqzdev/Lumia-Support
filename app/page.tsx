"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Paperclip, Smile, ChevronDown, X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import ChatMessage from "@/components/chat-message"
import SupportOptions from "@/components/support-options"
import EmojiPicker from "@/components/emoji-picker"
import TypingIndicator from "@/components/typing-indicator"
import { generateAIResponse } from "@/lib/ai-service"
import type { Message, SupportTopic, ConversationMessage } from "@/lib/types"
import Link from "next/link"
import FloatingElements from "@/components/floating-elements"
import AnimatedGradient from "@/components/animated-gradient"

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm the Lumia AI Support Assistant. How can I help you today? 👋",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isOptionsOpen, setIsOptionsOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const [isAITyping, setIsAITyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const supportTopics: SupportTopic[] = [
    {
      id: "getting-started",
      title: "Getting Started with Lumia AI",
      description: "Learn the basics and setup your account",
      icon: "🚀",
    },
    {
      id: "ai-features",
      title: "AI Features & Capabilities",
      description: "Discover Lumia's AI-powered tools",
      icon: "🧠",
    },
    {
      id: "models",
      title: "AI Models & Training",
      description: "Learn about our AI models and customization",
      icon: "⚙️",
    },
    {
      id: "troubleshooting",
      title: "AI Troubleshooting",
      description: "Solve issues with AI-generated content",
      icon: "🔧",
    },
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages, isAITyping])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Show typing indicator
    setIsAITyping(true)

    try {
      // Get conversation history for context
      const conversationHistory: ConversationMessage[] = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content,
      }))

      // Add the new user message
      conversationHistory.push({
        role: "user",
        content: input,
      })

      // Generate response using OpenRouter
      const aiResponse = await generateAIResponse(input, conversationHistory)

      // Add AI response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      // Handle error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error processing your request. Please try again later. 🙁",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsAITyping(false)
    }
  }

  const handleTopicSelect = async (topic: SupportTopic) => {
    // Add user message showing the selected topic
    const userMessage: Message = {
      id: Date.now().toString(),
      content: `I need help with ${topic.title} ${topic.icon}`,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Show typing indicator
    setIsAITyping(true)

    try {
      // Get conversation history for context
      const conversationHistory: ConversationMessage[] = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content,
      }))

      // Add the new user message
      conversationHistory.push({
        role: "user",
        content: `I need help with ${topic.title}`,
      })

      // Generate response using OpenRouter
      const aiResponse = await generateAIResponse(`I need help with ${topic.title}`, conversationHistory)

      // Add AI response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      // Handle error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error processing your request. Please try again later. 🙁",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsAITyping(false)
    }

    setIsOptionsOpen(false)
  }

  const handleEmojiSelect = (emoji: string) => {
    setInput((prev) => prev + emoji)
    setIsEmojiPickerOpen(false)
    inputRef.current?.focus()
  }

  const toggleEmojiPicker = () => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen)
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <FloatingElements />
      <AnimatedGradient />
      {/* Header */}
      <header className="border-2 bg-muted w-full max-w-[600px] mx-auto rounded-2xl items-center border-gray-200 bg-white mt-3">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <div>
              <span className="font-bold text-lg">Lumia AI Support</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-green-600">AI-Powered</span>
                <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Button className="bg-white text-black hover:bg-gray-100" size="sm" asChild>
              <Link href="https://luren-documentation.vercel.app">
                Documentation
              </Link>
            </Button>
            <Button className="bg-white text-black hover:bg-gray-100" size="sm" asChild>
              <Link href="https://luren.vercel.app/faq">
                FAQ
              </Link>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" size="sm" asChild>
              <Link href="https://luren-documentation.vercel.app/pricing">
                Pricing
              </Link>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-200 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col gap-2">
                <Button className="bg-white text-black hover:bg-gray-100" size="sm" asChild>
                  <Link href="https://luren-documentation.vercel.app">
                    Documentation
                  </Link>
                </Button>
                <Button className="bg-white text-black hover:bg-gray-100" size="sm" asChild>
              <Link href="https://luren.vercel.app/faq">
                FAQ
              </Link>
            </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" size="sm" asChild>
                  <Link href="https://luren-documentation.vercel.app/pricing">
                    Pricing
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <ChatMessage key={message.id} message={message} index={index} />
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            <AnimatePresence>{isAITyping && <TypingIndicator />}</AnimatePresence>

            {/* Support Options */}
            <AnimatePresence>
              {isOptionsOpen && messages.length === 1 && !isAITyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <SupportOptions topics={supportTopics} onSelectTopic={handleTopicSelect} />
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600">
                <Paperclip className="h-5 w-5" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Lumia AI a question..."
                  className="pr-10 rounded-xl border-2 border-gray-200 focus:border-blue-500"
                  disabled={isAITyping}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={`absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 ${
                    isEmojiPickerOpen ? "text-blue-600" : ""
                  }`}
                  onClick={toggleEmojiPicker}
                  disabled={isAITyping}
                >
                  <Smile className="h-5 w-5" />
                </Button>

                {/* Emoji Picker */}
                <AnimatePresence>
                  {isEmojiPickerOpen && (
                    <div className="absolute right-0 bottom-12 z-10">
                      <EmojiPicker onEmojiSelect={handleEmojiSelect} onClose={() => setIsEmojiPickerOpen(false)} />
                    </div>
                  )}
                </AnimatePresence>
              </div>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 rounded-full"
                size="icon"
                disabled={!input.trim() || isAITyping}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>

            {/* Support topics toggle */}
            <div className="mt-2 flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1"
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                disabled={isAITyping}
              >
                {isOptionsOpen ? (
                  <>
                    <X className="h-3 w-3" /> Hide support topics
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3" /> Show support topics
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
