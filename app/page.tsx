'use client'
import useConcurrency from '@/app/hooks/useConcurrency'

import List from '@/app/components/list'
import Input from '@/app/components/input'
import ButtonStart from '@/app/components/button.start'
import React from 'react'

const Home: React.FC = () => {
  const { concurrency, setConcurrency, isRunning, results, handleStart } =
    useConcurrency()

  return (
    <div className="p-4">
      <Input concurrency={concurrency} setConcurrency={setConcurrency} />
      <ButtonStart isRunning={isRunning} handleStart={handleStart} />
      <List requestIndexes={results} />
    </div>
  )
}

export default Home
