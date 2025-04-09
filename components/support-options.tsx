"use client"

import { motion } from "framer-motion"
import type { SupportTopic } from "@/lib/types"

interface SupportOptionsProps {
  topics: SupportTopic[]
  onSelectTopic: (topic: SupportTopic) => void
}

export default function SupportOptions({ topics, onSelectTopic }: SupportOptionsProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-3">Choose an AI support topic:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {topics.map((topic, index) => (
          <motion.button
            key={topic.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="rounded-2xl border-2 border-gray-200 p-4 text-left hover:border-blue-500 hover:bg-blue-50 transition-all"
            onClick={() => onSelectTopic(topic)}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{topic.icon}</div>
              <div>
                <h4 className="font-medium">{topic.title}</h4>
                <p className="text-sm text-gray-600">{topic.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
