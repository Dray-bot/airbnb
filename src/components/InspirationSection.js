'use client'

import { motion } from 'framer-motion'

const inspirations = [
  {
    title: 'Mountain Retreats',
    description: 'Escape to peaceful cabins in the mountains.',
  },
  {
    title: 'City Getaways',
    description: 'Explore vibrant cities and unique stays.',
  },
  {
    title: 'Beachfront Villas',
    description: 'Stay in stunning villas with ocean views.',
  },
]

export default function InspirationSection() {
  return (
    <section className="py-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-6"
      >
        Inspiration for your next trip ✨
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {inspirations.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
