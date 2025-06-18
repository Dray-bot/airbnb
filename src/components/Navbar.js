'use client'

import Link from 'next/link'
import { useUser, UserButton } from '@clerk/nextjs'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Globe, Search, Plus, Minus } from 'lucide-react'
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

export default function Navbar() {
  const { isSignedIn } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const [location, setLocation] = useState('')
  const [guestCount, setGuestCount] = useState(1)
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: 'selection',
    },
  ])

  const handleSearch = () => {
    console.log({
      location,
      guests: guestCount,
      startDate: dateRange[0].startDate,
      endDate: dateRange[0].endDate,
    })
    setSearchOpen(false)
  }

  return (
    <header className="w-full sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-[#FF385C] text-2xl font-bold tracking-tight">
          Airbnb
        </Link>

        {/* Desktop Search Bar */}
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center justify-between border rounded-full shadow-sm px-4 py-2 w-full max-w-md hover:shadow-md transition cursor-pointer"
          aria-label="Open search modal"
        >
          <span className="text-sm font-semibold text-gray-800 px-2">Anywhere</span>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-semibold text-gray-800 px-2">Any week</span>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500 px-2">Add guests</span>
          <span className="bg-[#FF385C] text-white p-1 rounded-full ml-2">
            <Search size={14} />
          </span>
        </button>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/host" className="text-sm font-medium text-gray-700 hover:text-[#FF385C] transition px-3 py-2 rounded-full">
            Airbnb your home
          </Link>
          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition">
            <Globe size={18} />
          </button>
          <div className="border rounded-full px-2 py-1 flex items-center gap-2 hover:shadow-md transition">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <Link href="/sign-in" className="text-sm text-gray-600 font-medium px-2 hover:text-[#FF385C] transition">
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-[#FF385C] text-white px-3 py-1 rounded-md text-sm hover:bg-[#e03351] transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle mobile menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="md:hidden bg-white px-6 pb-4 pt-2 flex flex-col gap-4 border-t"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <Link href="/host" className="text-gray-800 font-medium hover:text-[#FF385C] transition">
              Airbnb your home
            </Link>
            <button className="flex items-center gap-2 text-gray-800 hover:text-[#FF385C] transition">
              <Globe size={18} /> Language
            </button>

            {isSignedIn ? (
              <>
                <Link href="/dashboard" className="text-gray-800 font-medium hover:text-[#FF385C] transition">
                  Dashboard
                </Link>
                <div className="w-fit">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="text-gray-800 font-medium hover:text-[#FF385C] transition">
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-[#FF385C] text-white px-4 py-2 rounded-md hover:bg-[#e03351] transition w-fit"
                >
                  Sign Up
                </Link>
              </>
            )}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-[90%] max-w-2xl shadow-xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Search your stay</h2>
                <button onClick={() => setSearchOpen(false)} className="text-gray-500 hover:text-gray-800">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Location Input */}
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  placeholder="Where to?"
                  className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF385C] text-gray-800"
                />

                {/* Date Picker */}
                <DateRange
                  editableDateInputs
                  onChange={(item) => setDateRange([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  rangeColors={['#FF385C']}
                />

                {/* Guest Counter */}
                <div className="flex items-center border rounded-md px-4 py-2 w-fit gap-4">
                  <button
                    onClick={() => setGuestCount((prev) => Math.max(1, prev - 1))}
                    className="text-gray-600 hover:text-black"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-sm text-gray-800">
                    {guestCount} guest{guestCount > 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={() => setGuestCount((prev) => prev + 1)}
                    className="text-gray-600 hover:text-black"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleSearch}
                  className="w-full bg-[#FF385C] text-white py-2 rounded-md hover:bg-[#e03351] transition"
                >
                  Search
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
