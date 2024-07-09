import { useState } from 'react'
import axios from 'axios'
import { INITIAL_ACTIVE_REQUESTS, TOTAL_REQUESTS } from '@/app/constants'
import { getRandomDelay } from '@/app/helpers/get-random-delay'

const useConcurrency = () => {
  const [concurrency, setConcurrency] = useState<number>(10)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [results, setResults] = useState<number[]>([])

  const handleStart = async () => {
    setIsRunning(true)
    setResults([])

    let activeRequests = INITIAL_ACTIVE_REQUESTS
    const queue: Promise<void>[] = []
    const requestsPerSecond = Math.max(1, concurrency)
    let startTime = Date.now()

    const sendRequest = async (index: number) => {
      const currentTime = Date.now()

      if (currentTime - startTime > 1000) {
        startTime = currentTime
      }

      const delay = getRandomDelay()

      await new Promise((resolve) => setTimeout(resolve, delay))

      await axios.get(`/api?index=${index}`)
      setResults((prev) => [...prev, index])

      activeRequests--
    }

    const executeRequests = async () => {
      for (let i = 1; i <= TOTAL_REQUESTS; i++) {
        while (activeRequests >= concurrency) {
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
        activeRequests++
        queue.push(sendRequest(i))

        if (i % requestsPerSecond === 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }
      }

      await Promise.all(queue)
      setIsRunning(false)
    }

    executeRequests()
  }

  return {
    concurrency,
    setConcurrency,
    isRunning,
    results,
    handleStart,
  }
}

export default useConcurrency
