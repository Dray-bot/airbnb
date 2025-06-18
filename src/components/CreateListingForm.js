'use client'

import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useUser } from '@clerk/nextjs'
import { db } from '@/lib/firebase'
import { uploadImage } from '@/lib/uploadImage'
import { useSnackbar } from 'notistack'
import { motion } from 'framer-motion'

export default function CreateListingForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState(null)

  const { user } = useUser()
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let imageUrl = ''
      if (image) {
        imageUrl = await uploadImage(image, user.id)
        console.log('✅ Image URL:', imageUrl)
      }

      await addDoc(collection(db, 'listings'), {
        title,
        description,
        price: parseFloat(price),
        location,
        imageUrl,
        userId: user.id,
        createdAt: serverTimestamp(),
      })

      enqueueSnackbar('Listing created successfully!', { variant: 'success' })

      setTitle('')
      setDescription('')
      setPrice('')
      setLocation('')
      setImage(null)
    } catch (err) {
      console.error('❌ Upload failed:', err)
      enqueueSnackbar('Error creating listing.', { variant: 'error' })
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-md border border-gray-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <input
        type="text"
        placeholder="Property Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <input
        type="number"
        placeholder="Price (₦)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full"
        required
      />
      <button
        type="submit"
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
      >
        Create Listing
      </button>
    </motion.form>
  )
}
