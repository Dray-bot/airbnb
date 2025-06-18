'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Typewriter from 'typewriter-effect'
import { Heart, Sun, Mountain, Flame, Crown, Home, Globe } from 'lucide-react'
import Footer from '@/components/Footer'

const categories = [
  { label: 'Beach', icon: Sun },
  { label: 'Cabin', icon: Mountain },
  { label: 'Trending', icon: Flame },
  { label: 'Luxury', icon: Crown },
  { label: 'City', icon: Globe },
  { label: 'Countryside', icon: Home },
]

const categorizedListings = {
  Beach: [
    { id: '4', title: 'Beach Bungalow in Bali', price: 220, location: 'Bali, Indonesia', imageUrl: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1223856460299527030/original/b30128cd-018f-4661-b019-e79a72b044d9.jpeg?im_w=960' },
    { id: '6', title: 'Sunny Beach House in Malibu', price: 400, location: 'Malibu, USA', imageUrl: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMwMDEwNzUwODEwOTkwNzg0Mg%3D%3D/original/aef56d35-6028-4918-80db-0fc984d62fe7.jpeg?im_w=720' },
    { id: '26', title: 'Beachfront Bungalow in Phuket', price: 280, location: 'Phuket, Thailand', imageUrl: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1402962438064423837/original/b8064c69-f1ee-4102-908f-067fdf8625ef.jpeg?im_w=960' },
  ],
  Cabin: [
    { id: '5', title: 'Luxury Cabin in Banff', price: 350, location: 'Banff, Canada', imageUrl: 'https://a0.muscache.com/im/pictures/miso/Hosting-960215481414017985/original/743b7ab9-6282-4156-93c7-7081ca7c166f.png?im_w=960' },
    { id: '7', title: 'Rustic Cabin in Aspen', price: 320, location: 'Aspen, USA', imageUrl: 'https://a0.muscache.com/im/pictures/miso/Hosting-1118862860084119854/original/8cd7e749-0932-4c02-8d78-59db2b9ae4ee.jpeg?im_w=960' },
  ],
  Trending: [
    { id: '1', title: 'Cozy Loft in NYC', price: 250, location: 'New York, USA', imageUrl: 'https://photos.zillowstatic.com/fp/1e2d23822afb7c98bed46d0d1b885548-cc_ft_768.webp' },
    { id: '2', title: 'Chic Studio in Paris', price: 300, location: 'Paris, France', imageUrl: 'https://photos.zillowstatic.com/fp/5d07c8bc22522ac354eee3a73e9d7e41-cc_ft_768.webp' },
    { id: '3', title: 'Modern Flat in Tokyo', price: 180, location: 'Tokyo, Japan', imageUrl: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQyNTI0NDA0NTY3OTU2NzYxOA==/original/3f1fd9fe-5c72-4e5e-9905-3dfd8c6159f0.jpeg?im_w=1200' },
  ],
  Luxury: [
    { id: '8', title: 'Penthouse in Dubai', price: 600, location: 'Dubai, UAE', imageUrl: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM3OTE1MDc2NTIyNDIyODUwOA==/original/eee1c7c4-e4a7-4365-8a17-7a08a600090c.jpeg?im_w=960' },
    { id: '12', title: 'Luxury Villa in Santorini', price: 500, location: 'Santorini, Greece', imageUrl: 'https://a0.muscache.com/im/pictures/miso/Hosting-806515407044357129/original/7ffa1bc8-e417-4fc3-b165-fa5d01b4b1a6.jpeg?im_w=960' },
    { id: '23', title: 'Luxury Suite in Singapore', price: 370, location: 'Singapore', imageUrl: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1140248733948808770/original/f1474f74-3630-4f31-95b0-34975bf981ea.jpeg?im_w=960' },
    { id: '29', title: 'Luxury Apartment in Vienna', price: 320, location: 'Vienna, Austria', imageUrl: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM3ODc3MzYzMTM0MzA4ODcwNw==/original/323aa693-be08-46cb-b69a-1ae6a8e07509.jpeg?im_w=720' },
  ],
  City: [
    { id: '10', title: 'Historic Flat in Rome', price: 210, location: 'Rome, Italy', imageUrl: 'https://a0.muscache.com/im/pictures/miso/Hosting-1302938931678306093/original/8c15175b-cd78-4047-8ccd-99424f5631f3.jpeg?im_w=960' },
    { id: '11', title: 'Modern Condo in Sydney', price: 260, location: 'Sydney, Australia', imageUrl: 'https://a0.muscache.com/im/pictures/miso/Hosting-1218536233999787315/original/c16bf591-e661-4d68-81f3-eb59130ff649.jpeg?im_w=960' },
    { id: '14', title: 'Trendy Loft in Berlin', price: 190, location: 'Berlin, Germany', imageUrl: 'https://a0.muscache.com/im/pictures/505c314b-ab99-404a-82e1-73ce590ea291.jpg?im_w=960' },
    { id: '15', title: 'Seaside Apartment in Barcelona', price: 270, location: 'Barcelona, Spain', imageUrl: 'https://a0.muscache.com/im/pictures/60623353/cb303249_original.jpg?im_w=960' },
    { id: '17', title: 'Urban Studio in Seoul', price: 180, location: 'Seoul, South Korea', imageUrl: 'https://a0.muscache.com/im/pictures/miso/Hosting-929189659699996410/original/18dba4b1-17f1-4e3c-9ac5-88af9c0f6868.jpeg?im_w=960' },
    { id: '20', title: 'City Apartment in London', price: 310, location: 'London, UK', imageUrl: 'https://a0.muscache.com/im/pictures/44366f9b-2d73-49c6-933f-af734d311259.jpg?im_w=960' },
    { id: '25', title: 'Modern Flat in Amsterdam', price: 240, location: 'Amsterdam, Netherlands', imageUrl: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1336353466633867528/original/29058290-c7ac-4a55-8c25-58d1c47aaf09.jpeg?im_w=960' },
  ],
  Countryside: [
    { id: '13', title: 'Lake House in Zurich', price: 280, location: 'Zurich, Switzerland', imageUrl: 'https://a0.muscache.com/im/pictures/miso/Hosting-855149712546022346/original/39ff10d4-d724-49f0-8a92-b4e2e66511fd.jpeg?im_w=960' },
    { id: '16', title: 'Countryside Home in Tuscany', price: 230, location: 'Tuscany, Italy', imageUrl: 'https://a0.muscache.com/im/pictures/miso/Hosting-1150511525657613147/original/8caea461-1458-4e9d-839b-2c3e76120ec1.jpeg?im_w=960' },
    { id: '27', title: 'Mountain Retreat in Colorado', price: 340, location: 'Colorado, USA', imageUrl: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTk0MTk2Mjk3MjU3NDE0ODY3/original/7a1d9eb1-7c88-4ab0-a4d4-aa61995bbc33.jpeg?im_w=960' },
    { id: '18', title: 'Chalet in Swiss Alps', price: 420, location: 'Swiss Alps, Switzerland', imageUrl: 'https://a0.muscache.com/im/pictures/miso/Hosting-47020156/original/5614d840-8b35-4c9f-b129-f57d88c64a7e.jpeg?im_w=960' },
    { id: '9', title: 'Tree house in Costa Rica', price: 210, location: 'Costa Rica', imageUrl: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1398068809092346504/original/25d6aad5-0ef3-41ad-a4cf-bdcc8ca8392b.jpeg?im_w=960' },
    { id: '21', title: 'Desert Villa in Marrakech', price: 260, location: 'Marrakech, Morocco', imageUrl: 'https://a0.muscache.com/im/pictures/miso/Hosting-47574172/original/43478aaa-1a2f-4621-88a0-85344ad5aa43.jpeg?im_w=960' },
    { id: '22', title: 'Treehouse in Oregon', price: 200, location: 'Oregon, USA', imageUrl: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1120382677606591308/original/b2ef6653-57de-408a-9621-e8b5145d84d9.jpeg?im_w=960' },
    { id: '24', title: 'Cottage in the Cotswolds', price: 220, location: 'Cotswolds, UK', imageUrl: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Njc4Mjg5MjQwNjU3MzAzMDc0/original/37e6370d-7290-41b0-a568-d930af60ced0.jpeg?im_w=960' },
    { id: '19', title: 'Ski Chalet in Whistler', price: 390, location: 'Whistler, Canada', imageUrl: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAwOTk5OTI3Mjg2NDY3NzA4MQ%3D%3D/original/c1e912b9-0f95-4f7f-8745-c88a94ab68ce.jpeg?im_w=960' },
    { id: '28', title: 'Historic Home in Charleston', price: 210, location: 'Charleston, USA', imageUrl: 'https://a0.muscache.com/im/pictures/a6872d1c-a51b-42ef-916e-ae3e8d6523ed.jpg?im_w=960' },
    { id: '30', title: 'Countryside Villa in Provence', price: 350, location: 'Provence, France', imageUrl: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5NzU0NTU1ODA2ODIwMDgyNQ%3D%3D/original/78d62dd2-357d-49d2-8b2f-533fcc3f8ff8.jpeg?im_w=720' },
  ],
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-12 py-10 font-sans">
      {/* Hero */}
      <motion.section
        className="text-center mb-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-gray-900">Find your perfect stay</h1>
        <div className="text-lg sm:text-xl text-gray-600 h-[40px]">
          <Typewriter
            options={{
              strings: ['Book unique homes', 'Stay like a local', 'Explore the world'],
              autoStart: true,
              loop: true,
              delay: 60,
              deleteSpeed: 30,
            }}
          />
        </div>
      </motion.section>

      {/* Category sections */}
      {categories.map(({ label, icon: Icon }) => {
        const items = categorizedListings[label]
        if (!items?.length) return null

        return (
          <section key={label} className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Icon size={20} className="text-[#FF385C]" />
              <h2 className="text-xl font-semibold text-gray-900">{label}</h2>
            </div>

            <div className="overflow-x-auto scrollbar-hide -mx-1 px-1 flex gap-4">
              {items.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/listing/${listing.id}`}
                  className="min-w-[260px] max-w-[260px] flex-shrink-0"
                >
                  <motion.div
                    className="group relative cursor-pointer rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative pb-[66.66%]">
                      <img
                        src={listing.imageUrl}
                        alt={listing.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition">
                        <Heart size={20} className="text-gray-600 hover:text-[#FF385C]" />
                      </button>
                    </div>
                    <div className="mt-2 px-3 pb-3">
                      <h3 className="font-semibold text-gray-900 truncate">{listing.title}</h3>
                      <p className="text-sm text-gray-600">{listing.location}</p>
                      <p className="mt-1 text-sm font-semibold text-[#FF385C]">
                        ${listing.price} <span className="font-normal text-gray-600">/ night</span>
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
      <Footer />
    </main>
  )
}
