"use client"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Lumia AI?",
    answer:
      "Lumia AI is an advanced artificial intelligence platform designed to help users with various tasks including content creation, data analysis, and automated workflows.",
  },
  {
    question: "How do I get started with Lumia AI?",
    answer:
      "To get started with Lumia AI, simply create an account on our website, choose a subscription plan that fits your needs, and follow our interactive onboarding guide.",
  },
  {
    question: "What subscription plans are available?",
    answer:
      "Lumia AI offers several subscription tiers including Free, Basic, Professional, and Enterprise. Each plan offers different features and usage limits to accommodate various needs.",
  },
  {
    question: "Can I use Lumia AI for commercial purposes?",
    answer:
      "Yes, Lumia AI can be used for commercial purposes. Our Professional and Enterprise plans are specifically designed for business and commercial use cases.",
  },
  {
    question: "How secure is my data with Lumia AI?",
    answer:
      "Lumia AI takes data security very seriously. We employ industry-standard encryption, regular security audits, and strict access controls to ensure your data remains protected.",
  },
]

export default function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <AccordionItem value={`item-${index}`} className="border-b border-gray-200 py-2">
            <AccordionTrigger className="text-left font-medium text-lg hover:text-blue-600 transition-colors">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  )
}
