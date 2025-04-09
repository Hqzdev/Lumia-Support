"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface SupportCardProps {
  icon: ReactNode
  title: string
  description: string
  link: string
}

export default function SupportCard({ icon, title, description, link }: SupportCardProps) {
  return (
    <motion.div
      className="rounded-2xl border-2 border-gray-200 bg-white p-6 hover:shadow-lg transition-all"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        href={link}
        className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
      >
        Learn more <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </motion.div>
  )
}
