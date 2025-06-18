'use client'

import { db } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import CreateListingForm from '@/components/CreateListingForm'


export default function DashboardPage() {
  const { user } = useUser()
  const [listings, setListings] = useState([])

  useEffect(() => {
    const fetchListings = async () => {
      if (!user) return
      const q = query(collection(db, 'listings'), where('userId', '==', user.id))
      const querySnapshot = await getDocs(q)
      const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setListings(items)
    }

    fetchListings()
  }, [user])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.firstName} 👋</h1>

      <CreateListingForm />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Your Listings</h2>
        {listings.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          <ul className="space-y-2">
            {listings.map((listing) => (
              <li key={listing.id} className="border rounded p-4">
                <h3 className="font-bold">{listing.title}</h3>
                <p>{listing.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
