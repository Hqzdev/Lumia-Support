"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
  onClose: () => void
}

export default function EmojiPicker({ onEmojiSelect, onClose }: EmojiPickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null)

  // Common emoji categories
  const emojis = {
    smileys: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘"],
    gestures: ["👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "👇", "☝️", "👋", "🤚", "🖐️", "✋"],
    people: ["👨", "👩", "👧", "👦", "👶", "👵", "👴", "👲", "👳‍♀️", "👳‍♂️", "🧕", "👮‍♀️", "👮‍♂️", "👷‍♀️", "👷‍♂️"],
    animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧"],
    food: ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🥑"],
    activities: ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🎱", "🏓", "🏸", "🥅", "🏒", "🏑", "🥍", "🏏", "⛳"],
    travel: ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🚚", "🚛", "🚜", "🛴", "🚲", "🛵", "🏍️"],
    objects: ["⌚", "📱", "💻", "⌨️", "🖥️", "🖨️", "🖱️", "🖲️", "🕹️", "🗜️", "💽", "💾", "💿", "📀", "📼", "📷", "📸"],
    symbols: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟"],
    ai: ["🧠", "🤖", "💡", "⚙️", "🔮", "📊", "📈", "🔍", "💬", "🔄", "📝", "🎯", "🧩", "🔌", "💾", "🖥️", "📱"],
  }

  // Handle click outside to close the picker
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const categories = [
    { name: "Smileys", emojis: emojis.smileys },
    { name: "Gestures", emojis: emojis.gestures },
    { name: "People", emojis: emojis.people },
    { name: "Animals", emojis: emojis.animals },
    { name: "Food", emojis: emojis.food },
    { name: "Activities", emojis: emojis.activities },
    { name: "Travel", emojis: emojis.travel },
    { name: "Objects", emojis: emojis.objects },
    { name: "Symbols", emojis: emojis.symbols },
    { name: "AI & Tech", emojis: emojis.ai },
  ]

  return (
    <motion.div
      ref={pickerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg w-72 max-h-80 overflow-hidden"
    >
      <div className="flex items-center justify-between p-2 border-b border-gray-200">
        <h3 className="text-sm font-medium">Emoji</h3>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-2 overflow-y-auto max-h-72">
        {categories.map((category) => (
          <div key={category.name} className="mb-4">
            <h4 className="text-xs text-gray-500 mb-1">{category.name}</h4>
            <div className="grid grid-cols-7 gap-1">
              {category.emojis.map((emoji, index) => (
                <button
                  key={index}
                  className="h-8 w-8 flex items-center justify-center text-lg hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => onEmojiSelect(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
