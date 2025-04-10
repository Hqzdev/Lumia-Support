import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import type { LogEvent } from '@/lib/types'

const prisma = new PrismaClient()

// POST /api/logs - Create a new log entry
export async function POST(request: Request) {
  try {
    const log: LogEvent = await request.json()
    
    const savedLog = await prisma.log.create({
      data: {
        type: log.type,
        data: log.data,
        sessionId: log.sessionId,
        timestamp: log.timestamp,
      },
    })

    return NextResponse.json(savedLog)
  } catch (error) {
    console.error('Error saving log:', error)
    return NextResponse.json(
      { error: 'Failed to save log' },
      { status: 500 }
    )
  }
}

// GET /api/logs - Retrieve logs with optional filtering
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    const type = searchParams.get('type')
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where = {
      ...(sessionId && { sessionId }),
      ...(type && { type }),
    }

    const logs = await prisma.log.findMany({
      where,
      orderBy: {
        timestamp: 'desc',
      },
      take: limit,
      skip: offset,
    })

    return NextResponse.json(logs)
  } catch (error) {
    console.error('Error retrieving logs:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve logs' },
      { status: 500 }
    )
  }
} 