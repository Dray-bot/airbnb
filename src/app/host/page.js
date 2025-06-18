// app/host/page.js
'use client'

import React from 'react'
import { Plus, Home, Calendar, Settings } from 'lucide-react'

export default function HostPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Host Dashboard</h1>
          <p className="text-sm text-gray-500">Manage your listings and bookings</p>
        </div>

        {/* Grid Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create Listing */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 text-emerald-700 rounded-full">
                <Plus />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Create New Listing</h2>
                <p className="text-sm text-gray-500">Post a new property for rent or sale</p>
              </div>
            </div>
          </div>

          {/* View Listings */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 text-yellow-700 rounded-full">
                <Home />
              </div>
              <div>
                <h2 className="text-lg font-semibold">My Listings</h2>
                <p className="text-sm text-gray-500">View and manage your properties</p>
              </div>
            </div>
          </div>

          {/* Bookings */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-700 rounded-full">
                <Calendar />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Bookings</h2>
                <p className="text-sm text-gray-500">Track current reservations</p>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-200 text-gray-700 rounded-full">
                <Settings />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Settings</h2>
                <p className="text-sm text-gray-500">Manage account and preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
