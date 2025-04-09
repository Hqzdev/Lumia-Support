import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lumia AI • Support',
  description: 'Support for Lumia AI',

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
