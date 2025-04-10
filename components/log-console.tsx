"use client"

import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { RefreshCw, Download, Minimize2, Maximize2 } from 'lucide-react'
import { logger } from '@/lib/logger'
import type { LogEvent } from '@/lib/types'

export function LogConsole() {
  const [logs, setLogs] = useState<LogEvent[]>([])
  const [isMinimized, setIsMinimized] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadLogs = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const newLogs = await logger.getLogs()
      setLogs(newLogs)
    } catch (err) {
      setError('Failed to load logs')
      console.error('Error loading logs:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadLogs()

    // Подписываемся на новые логи
    const handleNewLog = (event: CustomEvent<LogEvent>) => {
      setLogs(prevLogs => [...prevLogs, event.detail])
    }

    window.addEventListener('newLog', handleNewLog as EventListener)
    return () => {
      window.removeEventListener('newLog', handleNewLog as EventListener)
    }
  }, [])

  const downloadLogs = () => {
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `logs_${new Date().toISOString()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatLogMessage = (log: LogEvent) => {
    const timestamp = new Date(log.timestamp).toLocaleTimeString()
    let emoji = '📝'
    let message = ''

    switch (log.type) {
      case 'CHAT_MESSAGE':
        emoji = '💬'
        message = `User: ${log.data.message}`
        break
      case 'AI_RESPONSE':
        emoji = '🤖'
        message = `AI: ${log.data.response}`
        break
      case 'PAGE_VIEW':
        emoji = '👀'
        message = `Viewed page: ${log.data.path}`
        break
      case 'NAVIGATION':
        emoji = '🔄'
        message = `Navigated to: ${log.data.target}`
        break
      case 'TOPIC_SELECT':
        emoji = '📌'
        message = `Selected topic: ${log.data.topic}`
        break
      case 'ERROR':
        emoji = '❌'
        message = `Error: ${log.data.error}`
        break
      case 'BUTTON_CLICK':
        emoji = '🖱️'
        message = `Clicked ${log.data.target}: ${log.data.action}`
        break
      default:
        message = JSON.stringify(log.data)
    }

    return `${emoji} [${timestamp}] ${message}`
  }

  if (isMinimized) {
    return (
      <Button
        className="fixed bottom-4 right-4 p-2"
        variant="outline"
        onClick={() => setIsMinimized(false)}
      >
        <Maximize2 className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 max-h-[600px] overflow-hidden flex flex-col bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold">Log Console</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={loadLogs}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={downloadLogs}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(true)}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {error && (
          <div className="text-red-500 mb-2">
            {error}
          </div>
        )}
        {logs.length === 0 ? (
          <div className="text-muted-foreground text-center py-4">
            {isLoading ? 'Loading logs...' : 'No logs yet'}
          </div>
        ) : (
          <div className="space-y-1 font-mono text-sm">
            {logs.map(log => (
              <div key={log.id} className="whitespace-pre-wrap break-all">
                {formatLogMessage(log)}
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
} 