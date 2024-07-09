import React from 'react'

interface InputProps {
  concurrency: number
  setConcurrency: (value: number) => void
}

const Input: React.FC<InputProps> = ({ concurrency, setConcurrency }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value >= 1 && value <= 100) {
      setConcurrency(value)
    }
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        Concurrency Limit (1-100):
        <input
          type="number"
          value={concurrency}
          onChange={handleInputChange}
          min="1"
          max="100"
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </label>
    </div>
  )
}

export default Input
