'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="min-h-[90vh] flex items-center bg-white px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Find Your Dream Home <br />
          with <span className="text-red-600">Homy</span>
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Discover, connect, and close deals easily. Verified agents. Real listings.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/listings">
            <motion.button
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
            >
              Explore Listings
            </motion.button>
          </Link>
          <Link href="/dashboard">
            <motion.button
              className="bg-gray-100 text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
            >
              Create a Listing
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
