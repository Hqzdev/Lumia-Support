import type { LogEvent, LogEventType } from "./types"
import { PrismaClient } from '@prisma/client'

interface DatabaseLog {
  id: string
  type: string
  data: any
  timestamp: Date
  sessionId: string
}

const prisma = new PrismaClient()

class Logger {
  private sessionId: string

  constructor() {
    this.sessionId = this.generateSessionId()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  }

  private async log(type: LogEventType, data: any) {
    const logEvent: LogEvent = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      type,
      data,
      timestamp: new Date(),
      sessionId: this.sessionId
    }

    try {
      // Сохраняем в базу данных
      await prisma.log.create({
        data: {
          type: logEvent.type,
          data: logEvent.data,
          timestamp: logEvent.timestamp,
          sessionId: logEvent.sessionId
        }
      })

      // Отправляем событие для обновления UI
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('newLog', { detail: logEvent }))
      }
    } catch (error) {
      console.error('Error saving log:', error)
    }
  }

  public async getLogs(): Promise<LogEvent[]> {
    try {
      const logs = await prisma.log.findMany({
        orderBy: {
          timestamp: 'desc'
        }
      })

      return logs.map((log: DatabaseLog) => ({
        id: log.id,
        type: log.type as LogEventType,
        data: log.data,
        timestamp: log.timestamp,
        sessionId: log.sessionId
      }))
    } catch (error) {
      console.error('Error retrieving logs:', error)
      return []
    }
  }

  public async logPageView(path: string) {
    await this.log("PAGE_VIEW", { path })
  }

  public async logChatMessage(message: string) {
    await this.log("CHAT_MESSAGE", { message })
  }

  public async logAIResponse(response: string) {
    await this.log("AI_RESPONSE", { response })
  }

  public async logError(error: string) {
    await this.log("ERROR", { error })
  }

  public async logNavigation(target: string) {
    await this.log("NAVIGATION", { target })
  }

  public async logTopicSelect(topic: string) {
    await this.log("TOPIC_SELECT", { topic })
  }

  public async logButtonClick(target: string, action: string) {
    await this.log("BUTTON_CLICK", { target, action })
  }
}

// Создаем единственный экземпляр логгера
export const logger = new Logger() 