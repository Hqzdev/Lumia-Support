import type { LogEvent, LogEventType } from "./types"

class Logger {
  private sessionId: string

  constructor() {
    this.sessionId = this.generateSessionId()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  }

  private async saveLog(event: LogEvent) {
    try {
      // Отправляем лог на сервер
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      })

      if (!response.ok) {
        throw new Error('Failed to save log')
      }

      // Отправляем событие для консоли логов в браузере
      const customEvent = new CustomEvent('newLog', { detail: event })
      window.dispatchEvent(customEvent)
    } catch (error) {
      console.error('Error saving log:', error)
    }
  }

  public async log(type: LogEventType, data: LogEvent["data"]) {
    const event: LogEvent = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date(),
      type,
      sessionId: this.sessionId,
      data,
    }

    await this.saveLog(event)
  }

  // Вспомогательные методы для разных типов логов
  public async logPageView(path: string) {
    await this.log("PAGE_VIEW", { path })
  }

  public async logChatMessage(message: string) {
    await this.log("CHAT_MESSAGE", { message })
  }

  public async logAIResponse(response: string) {
    await this.log("AI_RESPONSE", { response })
  }

  public async logTopicSelect(topic: string) {
    await this.log("TOPIC_SELECT", { topic })
  }

  public async logNavigation(target: string) {
    await this.log("NAVIGATION", { target })
  }

  public async logError(error: string) {
    await this.log("ERROR", { error })
  }

  public async logButtonClick(target: string, action: string) {
    await this.log("BUTTON_CLICK", { target, action })
  }

  // Метод для получения всех логов
  public async getLogs(): Promise<LogEvent[]> {
    try {
      const response = await fetch('/api/logs')
      if (!response.ok) {
        throw new Error('Failed to fetch logs')
      }
      return await response.json()
    } catch (error) {
      console.error('Error reading logs:', error)
      return []
    }
  }
}

export const logger = new Logger() 