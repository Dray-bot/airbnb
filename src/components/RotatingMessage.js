'use client'

import { useEffect, useState } from 'react'

const messages = [
  'Book unique stays 🌍',
  'Feel at home anywhere 🛋️',
  'Your journey starts here ✈️',
  'Discover new experiences 🧳',
]

export default function RotatingMessage() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className="transition-opacity duration-700 ease-in-out">
      {messages[index]}
    </span>
  )
}
