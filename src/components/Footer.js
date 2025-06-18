'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t mt-10 text-sm text-gray-600 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
          <Link href="#" className="hover:underline">
            &copy; {new Date().getFullYear()} Airbnb Clone
          </Link>
          <Link href="#" className="hover:underline">
            Privacy
          </Link>
          <Link href="#" className="hover:underline">
            Terms
          </Link>
          <Link href="#" className="hover:underline">
            Sitemap
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-500">Made by</span>
          <Link href="https://github.com/yourgithub" target="_blank" className="font-medium text-gray-800 hover:underline">
            Dray
          </Link>
        </div>
      </div>
    </footer>
  )
}
