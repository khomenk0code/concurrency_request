import React from 'react'

interface ListProps {
  requestIndexes: string[] | number[]
  isErrorList?: boolean
}

const List: React.FC<ListProps> = ({ requestIndexes }) => {
  return (
    <ul className={`mt-4 list-disc list-inside`}>
      {requestIndexes.map((requestIndex, index) => (
        <li key={index} className="py-1">
          {`Request index: ${requestIndex}`}
        </li>
      ))}
    </ul>
  )
}

export default List
