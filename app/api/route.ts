import { NextRequest, NextResponse } from 'next/server'
import { REQUEST_LIMIT, TIME_WINDOW } from '@/app/constants'
import { getRandomDelay } from '@/app/helpers/get-random-delay'

const requestsPerWindow = new Map<number, number>()

export async function GET(req: NextRequest) {
  const start = Date.now()
  const currentWindow = Math.floor(start / TIME_WINDOW)

  for (const window of Array.from(requestsPerWindow.keys())) {
    if (window < currentWindow) {
      requestsPerWindow.delete(window)
    }
  }

  if (!requestsPerWindow.has(currentWindow)) {
    requestsPerWindow.set(currentWindow, 0)
  }

  if (requestsPerWindow.get(currentWindow)! >= REQUEST_LIMIT) {
    return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 })
  }

  requestsPerWindow.set(
    currentWindow,
    requestsPerWindow.get(currentWindow)! + 1
  )

  const delay = getRandomDelay()
  await new Promise((resolve) => setTimeout(resolve, delay))

  const index = parseInt(req.nextUrl.searchParams.get('index') || '0', 10)

  return NextResponse.json(index)
}
