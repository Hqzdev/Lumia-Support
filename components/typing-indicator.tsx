"use client"

import { motion } from "framer-motion"
import { Avatar } from "@/components/ui/avatar"
import { Bot } from "lucide-react"

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex gap-3 mb-4"
    >
      <div className="max-w-[80%]">
        <div className="rounded-2xl border-2 border-gray-200 p-3 bg-white">
          <div className="flex space-x-1 items-center h-5">
            <motion.div
              className="w-2 h-2 rounded-full bg-blue-600"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0 }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-blue-600"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.2 }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-blue-600"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.4 }}
            />
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1">Lumia AI is typing...</div>
      </div>
    </motion.div>
  )
}
