import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const logFilePath = path.join(process.cwd(), 'logs', 'chat.log')

// Инициализация файла логов
async function initLogFile() {
  try {
    await fs.mkdir(path.join(process.cwd(), 'logs'), { recursive: true })
    try {
      await fs.access(logFilePath)
    } catch {
      await fs.writeFile(logFilePath, '[]')
    }
  } catch (error) {
    console.error('Error initializing log file:', error)
  }
}

// Убедимся, что файл существует
initLogFile()

export async function GET() {
  try {
    const logsContent = await fs.readFile(logFilePath, 'utf-8')
    return NextResponse.json(JSON.parse(logsContent))
  } catch (error) {
    console.error('Error reading logs:', error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const event = await request.json()
    
    // Читаем существующие логи
    const logsContent = await fs.readFile(logFilePath, 'utf-8')
    const logs = JSON.parse(logsContent)

    // Добавляем новый лог
    logs.push(event)

    // Сохраняем обновленные логи
    await fs.writeFile(logFilePath, JSON.stringify(logs, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving log:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
} 