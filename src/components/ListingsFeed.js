'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function ListingsFeed() {
  const [listings, setListings] = useState([])

  useEffect(() => {
    const fetchListings = async () => {
      const q = query(collection(db, 'listings'), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setListings(data)
    }

    fetchListings()
  }, [])

  if (listings.length === 0) return <p className="text-center text-gray-400">No listings yet.</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {listings.map(listing => (
        <div key={listing.id} className="bg-white rounded-lg shadow p-4 border">
          <img src={listing.imageUrl} alt={listing.title} className="w-full h-48 object-cover rounded" />
          <h2 className="text-xl font-semibold mt-2">{listing.title}</h2>
          <p className="text-sm text-gray-600">{listing.description}</p>
          <p className="text-red-600 font-bold mt-2">₦{listing.price?.toLocaleString()}</p>
          <p className="text-xs text-gray-500">{listing.location}</p>
        </div>
      ))}
    </div>
  )
}
