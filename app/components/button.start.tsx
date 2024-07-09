import React from 'react'

interface ButtonProps {
  isRunning: boolean
  handleStart: () => void
}

const ButtonStart: React.FC<ButtonProps> = ({ isRunning, handleStart }) => {
  return (
    <button
      onClick={handleStart}
      disabled={isRunning}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
    >
      {isRunning ? 'Sending...' : 'Start'}
    </button>
  )
}

export default ButtonStart
