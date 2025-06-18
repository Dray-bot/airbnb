'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MapPin, Star, Users2, X } from 'lucide-react'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

// Dummy Listings
const dummyListings = [
  {
    id: '1',
    title: 'Cozy Loft in New York City',
    description:
      'Experience the charm of Manhattan in this cozy loft located near Central Park. Perfect for couples and solo travelers. Includes high-speed WiFi, a modern kitchen, and smart TV.',
    price: 250,
    location: 'New York, USA',
    guests: 2,
    host: 'Samantha',
    rating: 4.8,
    reviews: 128,
    reviewMessages: [
      { name: 'John', message: 'Amazing stay, loved the view!', rating: 5 },
      { name: 'Alice', message: 'Clean, cozy, perfect location.', rating: 4.5 },
    ],
    images: [
      'https://photos.zillowstatic.com/fp/1e2d23822afb7c98bed46d0d1b885548-cc_ft_768.webp',
      'https://photos.zillowstatic.com/fp/fb3bd9fb2b466fa9a45594ddd708d372-cc_ft_384.webp',
      'https://photos.zillowstatic.com/fp/e46e6987e2b4c1b37d2a61121eb55a6c-uncropped_scaled_within_1536_1152.webp',
      'https://photos.zillowstatic.com/fp/37a808c35ded6f3e4931e02715d8d35b-cc_ft_384.webp',
      'https://photos.zillowstatic.com/fp/461eb1817594bed71c2dc7974b61e72c-cc_ft_384.webp',
    ],
  },
    {
    id: '2',
    title: 'Chic Studio in Paris',
    description: 'Enjoy a stylish experience in the heart of Paris. Perfect for travelers seeking comfort and charm.',
    price: 300,
    location: 'Paris, France',
    guests: 4,
    host: 'Emma',
    rating: 4.9,
    reviews: 181,
    reviewMessages: [
      { name: 'Emily', message: 'Loved everything about the stay!', rating: 5 },
      { name: 'Liam', message: 'Felt like home, would stay again.', rating: 4.8 },
    ],
    images: [
      'https://photos.zillowstatic.com/fp/5d07c8bc22522ac354eee3a73e9d7e41-cc_ft_768.webp',
      'https://photos.zillowstatic.com/fp/c9db78b3879af978666f8887ffdfe586-cc_ft_384.webp',
      'https://photos.zillowstatic.com/fp/66ce148594be653118a8a8ceb5d2fbec-uncropped_scaled_within_1536_1152.webp',
      'https://photos.zillowstatic.com/fp/437c33c07d094612f245cf8c2303ae2d-cc_ft_384.webp',
      'https://photos.zillowstatic.com/fp/163729105e4ebf7f1f085e81affd2ac5-cc_ft_384.webp',
    ],
  },
  {
    id: '3',
    title: 'Modern Flat in Tokyo',
    description: 'Enjoy a stylish experience in the heart of Tokyo. Perfect for travelers seeking comfort and charm.',
    price: 180,
    location: 'Tokyo, Japan',
    guests: 5,
    host: 'Sophie',
    rating: 4.6,
    reviews: 110,
    reviewMessages: [
      { name: 'James', message: 'Great location and cozy vibes.', rating: 4.7 },
      { name: 'Emily', message: 'Loved everything about the stay!', rating: 5 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQyNTI0NDA0NTY3OTU2NzYxOA==/original/3f1fd9fe-5c72-4e5e-9905-3dfd8c6159f0.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQyNTI0NDA0NTY3OTU2NzYxOA==/original/0a993e0a-cb25-4905-8d90-f72b3d7ce29e.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQyNTI0NDA0NTY3OTU2NzYxOA==/original/ad15e969-8f8b-44a8-97e7-e266714eb18d.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQyNTI0NDA0NTY3OTU2NzYxOA==/original/3618caf6-ef66-4cb7-9fa7-03f04be1aa63.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQyNTI0NDA0NTY3OTU2NzYxOA==/original/15d4049c-0366-4d04-af0c-ec975758032c.jpeg?im_w=720',
    ],
  },
  {
    id: '4',
    title: 'Beach Bungalow in Bali',
    description: 'Enjoy a stylish experience in the heart of Bali. Perfect for travelers seeking comfort and charm.',
    price: 220,
    location: 'Bali, Indonesia',
    guests: 2,
    host: 'Lucas',
    rating: 4.7,
    reviews: 72,
    reviewMessages: [
      { name: 'Liam', message: 'Felt like home, would stay again.', rating: 4.8 },
      { name: 'James', message: 'Great location and cozy vibes.', rating: 4.7 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1223856460299527030/original/b30128cd-018f-4661-b019-e79a72b044d9.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1223856460299527030/original/b6e23deb-2873-4044-8a7d-992cf113250f.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1223856460299527030/original/05b828fb-ee4d-4018-b2c2-ba5f3a1a20f8.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1223856460299527030/original/c7d85099-3715-42d2-856a-7adfdd1770b7.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1223856460299527030/original/3d180618-e427-45b7-ad96-dfe564ec1ada.jpeg?im_w=720',
    ],
  },
   {
    id: '5',
    title: 'Cozy Cabin in Canada',
    description: 'Relax in this cozy cabin surrounded by nature. A perfect retreat for a weekend getaway.',
    price: 350,
    location: 'Banff, Canada',
    guests: 3,
    host: 'Ava',
    rating: 4.5,
    reviews: 89,
    reviewMessages: [
      { name: 'Sophia', message: 'Magical in the snow!', rating: 4.9 },
      { name: 'Noah', message: 'Peaceful and serene.', rating: 4.6 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-960215481414017985/original/743b7ab9-6282-4156-93c7-7081ca7c166f.png?im_w=960',
      'https://a0.muscache.com/im/pictures/miso/Hosting-960215481414017985/original/f1ec9b2c-4f49-45e4-a66d-1838e544787e.png?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-960215481414017985/original/a01a2233-0158-4222-b046-5fae7299d132.png?im_w=1200',
      'https://a0.muscache.com/im/pictures/miso/Hosting-960215481414017985/original/2e23efc6-0096-46e6-864c-803791c117fa.png?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-960215481414017985/original/faf10d7b-79f0-414a-9c96-5c03ecdeebf3.png?im_w=720'
    ],
  },
  {
    id: '6',
    title: 'Sunny Beach House in Malibu',
    description: 'Experience the ultimate beach getaway in this stunning Malibu home with ocean views.',
    price: 400,
    location: 'Malibu, USA',
    guests: 4,
    host: 'Ethan',
    rating: 5.0,
    reviews: 210,
    reviewMessages: [
      { name: 'Ava', message: 'Incredible views and vibes.', rating: 5 },
      { name: 'Jacob', message: 'NYC at its best.', rating: 5 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMwMDEwNzUwODEwOTkwNzg0Mg%3D%3D/original/aef56d35-6028-4918-80db-0fc984d62fe7.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1300107508109907842/original/c18d79f0-30c2-4d8b-a025-3050fb52c5e7.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1300107508109907842/original/e95af434-2b50-4cbf-813c-ba2f53de9cec.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1300107508109907842/original/0931919c-0bb4-491e-b4b3-4086ac6efb19.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1300107508109907842/original/8c4c9aa7-7bb1-41ed-9f13-e4ac10684e28.jpeg?im_w=720',
    ],
  },
  {
    id: '7',
    title: 'Rusty Cabin in Aspen',
    description: 'Sleep under the stars in this unique desert dome with panoramic views of the canyon.',
    price: 320,
    location: 'Aspen, USA',
    guests: 2,
    host: 'Luna',
    rating: 4.3,
    reviews: 58,
    reviewMessages: [
      { name: 'Oliver', message: 'Very unique and cozy.', rating: 4.5 },
      { name: 'Zoe', message: 'The stars at night were stunning.', rating: 4.2 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-1118862860084119854/original/8cd7e749-0932-4c02-8d78-59db2b9ae4ee.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/miso/Hosting-1118862860084119854/original/bcd49951-747a-443e-acbc-3519e5b9fa82.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-1118862860084119854/original/2366f8eb-5dd5-435f-ba92-35c8a003e8eb.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-1118862860084119854/original/9cd01034-165b-4da2-b070-e6b6a3ec73c5.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTExODg2Mjg2MDA4NDExOTg1NA%3D%3D/original/fe8d8955-87ba-400c-9ef8-28b42f82852f.jpeg?im_w=720',
    ],
  },
  {
    id: '8',
    title: 'Penthouse in Dubai',
    description: 'From your apartment, enjoy breathtaking Clear views of the iconic Burj Khalifa and the world-famous Dubai Fountain. The expansive infinity pool invites you to relax and take in the spectacular skyline, while the modern interiors ensure a truly comfortable stay.',
    price: 600,
    location: 'Dubai, UAE',
    guests: 3,
    host: 'Gianna',
    rating: 4.6,
    reviews: 102,
    reviewMessages: [
      { name: 'Mason', message: 'So close to everything!', rating: 4.7 },
      { name: 'Ella', message: 'Loved the ancient vibe.', rating: 4.5 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM3OTE1MDc2NTIyNDIyODUwOA==/original/eee1c7c4-e4a7-4365-8a17-7a08a600090c.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM3OTE1MDc2NTIyNDIyODUwOA==/original/5540c888-9d79-4e25-91b3-05822367fe0c.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM3OTE1MDc2NTIyNDIyODUwOA==/original/022a97e2-2b4c-4517-900f-7698978b6a79.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM3OTE1MDc2NTIyNDIyODUwOA==/original/5fcaaddb-1b33-4817-8d4c-36700b6a85fe.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM3OTE1MDc2NTIyNDIyODUwOA==/original/47a84ba1-92d9-4592-a7ce-6362b2738548.jpeg?im_w=720',
    ],
  },
  {
    id: '9',
    title: 'Treehouse in Costa Rica',
    description: 'Reconnect with nature in this handcrafted treehouse nestled in the rainforest.',
    price: 210,
    location: 'Monteverde, Costa Rica',
    guests: 2,
    host: 'Diego',
    rating: 4.8,
    reviews: 76,
    reviewMessages: [
      { name: 'Chloe', message: 'Felt like Tarzan lol!', rating: 4.9 },
      { name: 'Leo', message: 'Peaceful jungle stay.', rating: 4.7 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1398068809092346504/original/25d6aad5-0ef3-41ad-a4cf-bdcc8ca8392b.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1398068809092346504/original/7fdb8dbd-cdad-4a19-8b6a-e0fa66f7f075.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1398068809092346504/original/e87c0835-66f6-47f9-b093-4f4385252d06.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1398068809092346504/original/35cc968a-203a-42e5-8461-a6eb9180d6aa.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1398068809092346504/original/a8507442-e33c-4cdd-850f-256534cabe8e.jpeg?im_w=1200',
    ],
  },
  {
    id: '10',
    title: 'Historic flat in Rome',
    description: 'Elegant apartment 200 meters from the Colosseum, ideal for 6 guests. Featuring 2 modern bathrooms, a luxurious Jacuzzi, a private balcony and a large open-plan kitchen. Each room has air conditioning and a flat-screen TV. Designer furnishings offer comfort and style, with high-quality finishes. Located on the second floor of a building with an elevator, it is perfect for an exclusive stay in the heart of Rome.',
    price: 210,
    location: 'Rome, Italy',
    guests: 2,
    host: 'Minji',
    rating: 4.4,
    reviews: 95,
    reviewMessages: [
      { name: 'Daniel', message: 'Super clean and well located.', rating: 4.5 },
      { name: 'Grace', message: 'Perfect for K-Drama fans 😆', rating: 4.3 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-1302938931678306093/original/8c15175b-cd78-4047-8ccd-99424f5631f3.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/miso/Hosting-1302938931678306093/original/55ae1d91-83cd-47f6-9049-501bd59ef9ae.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-1302938931678306093/original/e3feebeb-b0e5-4420-a1bf-3f7b8a1dc1f8.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-1302938931678306093/original/734600be-ba92-4c85-b81d-4d4ca627ef57.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-1302938931678306093/original/7e5a0afc-8c4e-4d9a-b1f9-f9a7a2f7b76e.jpeg?im_w=720',
    ],
  },
  {
    id: '11',
    title: 'Modern condo in Sydney',
    description: 'Discover the perfect blend of comfort and convenience in this stylish studio located in the vibrant heart of St Leonards. Surrounded by numerous cafes and restaurants, short walk to St Leonards Station and minutes from Coles supermarket. A mere 10-minute stroll to RNS Hospital. 5-minute walk from the newly built Crows Nest metro station, and it takes abt 18 minutes to reach Central directly by metro. This contemporary space offers everything you need for a memorable stay.',
    price: 260,
    location: 'Sydney, Australia',
    guests: 4,
    host: 'Elsa',
    rating: 4.9,
    reviews: 88,
    reviewMessages: [
      { name: 'Jack', message: 'Perfect snowy getaway.', rating: 5 },
      { name: 'Mia', message: 'A real winter wonderland.', rating: 4.8 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-1218536233999787315/original/c16bf591-e661-4d68-81f3-eb59130ff649.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/miso/Hosting-1218536233999787315/original/d47666bd-34a4-4ed6-a659-98b782e9d900.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/miso/Hosting-1218536233999787315/original/95e6a451-6551-4e03-b33e-80c5bfa3fed2.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/miso/Hosting-1218536233999787315/original/19793138-2ed4-4694-9ff1-5c150236150e.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1218536233999787315/original/9fcdaaeb-6d51-4dd5-8a18-07df035ae2d4.jpeg?im_w=720',
    ],
  },
  {
    id: '12',
    title: 'Luxury Villa in Santorini',
    description: 'Calm and tranquility have a brand new home in Santorini. Enjoy sensational views through the terraced valley overlooking the Aegean Sea from this spectacular private suite. Combined living room bedroom, luxury bathroom with Sky Shower, and private heated pool.',
    price: 500,
    location: 'Santorini, Greece',
    guests: 5,
    host: 'Hazel',
    rating: 4.6,
    reviews: 65,
    reviewMessages: [
      { name: 'Henry', message: 'Chill and beautiful.', rating: 4.7 },
      { name: 'Ruby', message: 'Loved the animals around!', rating: 4.5 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-806515407044357129/original/7ffa1bc8-e417-4fc3-b165-fa5d01b4b1a6.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/miso/Hosting-806515407044357129/original/d7882cd7-adc3-4040-86da-f6f834eac77b.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/miso/Hosting-806515407044357129/original/50c0fc4b-a19a-4af2-950d-99768e1429b0.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-806515407044357129/original/32aca44c-3580-4bc3-8d49-c12da583b5b0.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-806515407044357129/original/2293157b-71c9-4bec-b481-dba94e9ffcbd.jpeg?im_w=720',
    ],
  },
  {
    id: '13',
    title: 'Lakehouse in Switzerland',
    description: 'Wake up to a stunning lake view surrounded by snow-capped mountains.',
    price: 280,
    location: 'Zurich, Switzerland',
    guests: 4,
    host: 'Leo',
    rating: 4.8,
    reviews: 122,
    reviewMessages: [
      { name: 'Sienna', message: 'The lake was everything.', rating: 5 },
      { name: 'Luke', message: 'Quiet and peaceful.', rating: 4.7 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-855149712546022346/original/39ff10d4-d724-49f0-8a92-b4e2e66511fd.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/miso/Hosting-855149712546022346/original/d003309c-dd34-45f4-8eac-11b2a9af39f0.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-855149712546022346/original/ae90c774-7ad5-4f61-92aa-ccdde1e431c2.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/miso/Hosting-855149712546022346/original/04274f1c-98cc-40f5-a3c8-3e772c0709dd.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-855149712546022346/original/cc697ec7-0ce1-400e-abea-b23617aeec7b.jpeg?im_w=720',
    ],
  },
  {
    id: '14',
    title: 'Trendy loft in Berlin',
    description: 'The rented room (13 m²) with workstation + private bathroom is not shared. The kitchen, living room and balcony are shared. A quiet workplace with a height-adjustable desk and high-quality screen (laptop connection: mini-USB) is available in the bedroom. ',
    price: 190,
    location: 'Berlin',
    guests: 2,
    host: 'Aria',
    rating: 5.0,
    reviews: 300,
    reviewMessages: [
      { name: 'Noah', message: 'Most romantic trip ever.', rating: 5 },
      { name: 'Isla', message: 'Straight out of a dream.', rating: 5 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/505c314b-ab99-404a-82e1-73ce590ea291.jpg?im_w=960',
      'https://a0.muscache.com/im/pictures/a55c772e-68f9-4d0d-b13a-4e6ed0122a27.jpg?im_w=1200',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MzE3MTE1MTQ%3D/original/624eb6e9-2556-4245-bd88-a31053d60bbf.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/d85ca0cb-94ec-424d-9da0-f65a2b8e8029.jpg?im_w=720',
      'https://a0.muscache.com/im/pictures/6df6ed02-f69d-4cd4-9eda-a66609befca7.jpg?im_w=720',
    ],
  },
  {
    id: '15',
    title: 'Seaside Apartment in Barcelona',
    description: 'The apartment has 3 bedrooms and 2 bathrooms. Enjoy an unforgettable holiday in this new apartment with 3 bedrooms and 2 bathrooms, located in the heart of Barcelona. You will have at your disposal two large double rooms and a third single room. The apartment features everything needed to make your stay in the city exactly as imagined',
    price: 270,
    location: 'Barcelona, Spain',
    guests: 2,
    host: 'Max',
    rating: 4.5,
    reviews: 70,
    reviewMessages: [
      { name: 'Zara', message: 'Modern and artsy!', rating: 4.6 },
      { name: 'Eli', message: 'Loved the vibe.', rating: 4.5 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/60623353/cb303249_original.jpg?im_w=960',
      'https://a0.muscache.com/im/pictures/60623461/4a863b33_original.jpg?im_w=720',
      'https://a0.muscache.com/im/pictures/60623573/ce5801b4_original.jpg?im_w=720',
      'https://a0.muscache.com/im/pictures/60623639/f1f40b15_original.jpg?im_w=720',
      'https://a0.muscache.com/im/pictures/60623399/30556990_original.jpg?im_w=720',
    ],
  },
  {
    id: '16',
    title: 'Countryside Home in Tuscany',
    description: 'Spend your days in an elegant vacation home in the Monti district, one of Rome historic neighborhoods. The apartment is a few meters from the Colosseum and offers a high quality accommodation in an ancient building of the 600s.The location is ideal , just steps from Termini Station, the Colosseum and the Imperial Forums. It is also close to the Cavour Stop of the Metro line B.',
    price: 230,
    location: 'Tuscany, Italy',
    guests: 2,
    host: 'Farid',
    rating: 4.9,
    reviews: 40,
    reviewMessages: [
      { name: 'Aaliyah', message: 'Bucket list ✅', rating: 5 },
      { name: 'Khalid', message: 'Unreal luxury.', rating: 4.8 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-1150511525657613147/original/8caea461-1458-4e9d-839b-2c3e76120ec1.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/miso/Hosting-1150511525657613147/original/4316e13c-b7fb-4655-908d-2cadb069578d.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/miso/Hosting-1150511525657613147/original/f62e475a-5144-43f3-81c6-4b77cccdae2c.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE1MDUxMTUyNTY1NzYxMzE0Nw%3D%3D/original/c3d2d917-fe47-4da2-8429-230a7c659c40.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-1150511525657613147/original/5782d8ac-9a75-457a-87eb-8f489b305e03.jpeg?im_w=720',
    ],
  },
  {
    id: '17',
    title: 'Urban studio in Seoul',
    description: 'Feel the resort vibe in the city center while looking at the unobstructed view of the skyscrapers. You can travel by road from Jamsil Station and Mongchontoseong Station. Lotte World Mall, Songridan-gil, and Bangi-dong food alley are nearby. Seokchon Lake and Olympic Park are nearby, so you can enjoy a walk.',
    price: 180,
    location: 'Seoul, South Korea',
    guests: 2,
    host: 'June',
    rating: 4.4,
    reviews: 55,
    reviewMessages: [
      { name: 'Miles', message: 'So retro, so fun.', rating: 4.5 },
      { name: 'Paige', message: 'Glamping goals.', rating: 4.3 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-929189659699996410/original/18dba4b1-17f1-4e3c-9ac5-88af9c0f6868.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/7d211a64-8f07-4962-a7a6-65e03acae420.jpg?im_w=1200',
      'https://a0.muscache.com/im/pictures/b313e40e-0c39-4d1b-8f88-304aa286236c.jpg?im_w=720',
      'https://a0.muscache.com/im/pictures/04225a85-02b5-47e3-9515-d84403fa57e9.jpg?im_w=720',
      'https://a0.muscache.com/im/pictures/646bd32a-2117-4997-9917-1dc0bcab58b4.jpg?im_w=1200',
    ],
  },
  {
    id: '18',
    title: 'Chalet in Swiss Alps',
    description: 'Our accommodation is 5 minutes from shops and in a very quiet area. You will have stunning mountain views from the balcony. Our accommodation is located on the 6th and top floor and has an elevator thats 132 cm deep and a doorway thats at least 81 cm wide.  From there we get magnificent views of the valley and mountains',  
    price: 420,
    location: 'Swiss Alps, Switzerland',
    guests: 4,
    host: 'Athena',
    rating: 4.9,
    reviews: 145,
    reviewMessages: [
      { name: 'Theo', message: 'Postcard perfect.', rating: 5 },
      { name: 'Nina', message: 'Views for days!', rating: 4.8 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-47020156/original/5614d840-8b35-4c9f-b129-f57d88c64a7e.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/miso/Hosting-47020156/original/f0670cff-9c3b-42fd-8849-cc93c7569e43.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-47020156/original/81a6c5f2-f05c-461e-9227-f78b8df424c1.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-47020156/original/b24c9f3c-6da9-459b-aa24-9dfd91a8318f.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-47020156/original/7932ad4d-eb2f-4408-9b35-48d103af511e.jpeg?im_w=1200',
    ],
  },
  {
    id: '19',
    title: 'Ski Chalet in Whistler',
    description: 'Renovated residence with mountain reviews! Living room with fireplace and hardwood flooring, kitchen with Viking and Thermador appliances , plus a dining table for six. Two guest suites, each with a king size bed, fireplace, flatscreen TV, attached bathrooms, washer/dryer. Sleeper sofa also available. Additional amenities include private hot tub,  outdoor pool, fitness center, fire pits, valet, and shuttle service to ski / airport are also available.',
    price: 390,
    location: 'Whistler, Canada',
    guests: 2,
    host: 'Kai',
    rating: 4.3,
    reviews: 61,
    reviewMessages: [
      { name: 'Ivy', message: 'Cute and quiet.', rating: 4.4 },
      { name: 'Cole', message: 'Everything you need in a small space.', rating: 4.2 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAwOTk5OTI3Mjg2NDY3NzA4MQ%3D%3D/original/c1e912b9-0f95-4f7f-8745-c88a94ab68ce.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAwOTk5OTI3Mjg2NDY3NzA4MQ%3D%3D/original/10c161fe-7a53-43e5-a8a4-6a86d81991bc.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAwOTk5OTI3Mjg2NDY3NzA4MQ%3D%3D/original/30a18f46-d9c8-44a5-a2b8-f0a2f672f482.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAwOTk5OTI3Mjg2NDY3NzA4MQ%3D%3D/original/c39e29cb-a212-4481-a762-38085a361252.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAwOTk5OTI3Mjg2NDY3NzA4MQ%3D%3D/original/c46c69c0-9420-40a7-84d5-1ec5cd2c8355.jpeg?im_w=720',
    ],
  },
  {
    id: '20',
    title: 'City apartment in London',
    description: 'Private spacious bedroom with en suite bathroom situated in a residential block 7 mins walk from London Bridge train/tube station. It has its own bathroom. Tower Bridge ( the most famous bridge in London) is inly 5min walking. Bermondsey Street is only 3 mins walk where you will find various restaurants , bars , coffee shops, pubs and little individual delis. Tower of London, The Shard, Borough Market, More London - all within a 10 mins walking distance. Very New stylish home.',
    price: 310,
    location: 'London, UK',
    guests: 3,
    host: 'Yasmin',
    rating: 4.7,
    reviews: 88,
    reviewMessages: [
      { name: 'Omar', message: 'Authentic and peaceful.', rating: 4.7 },
      { name: 'Leila', message: 'The rooftop is a vibe.', rating: 4.6 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/44366f9b-2d73-49c6-933f-af734d311259.jpg?im_w=960',
      'https://a0.muscache.com/im/pictures/miso/Hosting-676529311606508868/original/13ab183e-c0d4-4774-9e88-432f482e4af8.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-676529311606508868/original/e6ce9100-c057-4944-90e5-00804f70821b.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/914cbcdb-1688-4933-85ba-6670c2dd096a.jpg?im_w=720',
      'https://a0.muscache.com/im/pictures/bdd4e8d5-0876-463b-b916-a6f255724e00.jpg?im_w=720',
    ],
  },
  {
    id: '21',
    title: 'Desert Villa in Marrakech',
    description: 'Halfway between the beauty and frenzy of the center of Marrakech and the tranquility of a Moroccan hamlet on the road to Fez after the Palmeraie. Our traditional villa, the "Villa Bel Vie", completely renovated recently and having retained its Riad spirit: is only 35 minutes from the medina, on the road to the palm grove, Fez, the Atlas.',
    price: 260,
    location: 'Marrakech, Morocco',
    guests: 2,
    host: 'Niko',
    rating: 4.8,
    reviews: 49,
    reviewMessages: [
      { name: 'Ella', message: 'Literally cool.', rating: 5 },
      { name: 'Arvid', message: 'Unique and wild.', rating: 4.6 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-47574172/original/43478aaa-1a2f-4621-88a0-85344ad5aa43.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/miso/Hosting-47574172/original/5b85cac6-0aa5-4d84-a1ac-ca866c337aa5.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/miso/Hosting-47574172/original/40dde8ad-1447-4576-b4bf-280e1246df04.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/miso/Hosting-47574172/original/ac0a1196-f4ff-4bee-a515-5150dbb1e2ac.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDc1NzQxNzI=/original/fd37dd0e-ed1e-457a-9a28-513c1504e2ed.jpeg?im_w=1200',
    ],
  },
  {
    id: '22',
    title: 'Tree House in Oregon',
    description: 'The cabin boasts a 2-story great room with an oversized sliding glass wall that opens to the deck.  Downstairs is a riverside bedroom, full modern kitchen, and a full bath with a large custom walkin shower. Upstairs has a large bedroom, desk nook, and a half-bath.',
    price: 200,
    location: 'Oregon, USA',
    guests: 2,
    host: 'Tara',
    rating: 4.6,
    reviews: 92,
    reviewMessages: [
      { name: 'Beau', message: 'So relaxing.', rating: 4.8 },
      { name: 'Naomi', message: 'Felt like a movie.', rating: 4.6 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1120382677606591308/original/b2ef6653-57de-408a-9621-e8b5145d84d9.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/miso/Hosting-1120382677606591308/original/810d1d87-ddf7-44ed-99fe-899690c44bd1.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/miso/Hosting-1120382677606591308/original/41313a45-82c7-4dff-8ffa-eb926397a228.png?im_w=1200',
      'https://a0.muscache.com/im/pictures/miso/Hosting-1120382677606591308/original/1b443505-96a3-4993-b6ed-4021595575f3.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-1120382677606591308/original/d7f653c0-b777-4198-ab28-f643aa3edbc9.jpeg?im_w=720',
    ],
  },
  {
    id: '23',
    title: 'Luxury suite in Singapore',
    description: 'Enjoy a stylish experience at this centrally-located place in Uppal ( East Hyderabad) which you can truly call home away from home in this luxurious Airconditioned unit. This WFH friendly property is Equipped with high speed Wifi and TV with free access to NETFLIX on us!. Featuring essential appliances, fully stocked with all the basic amenities making it perfect for extended vacation stay!!. You are located just a few minutes away from shopping and also within close vicinity to the restaurants',
    price: 370,
    location: 'Singapore',
    guests: 2,
    host: 'Ingrid',
    rating: 4.9,
    reviews: 77,
    reviewMessages: [
      { name: 'Victor', message: 'Views out of this world.', rating: 5 },
      { name: 'Sara', message: 'Unreal experience.', rating: 4.9 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1140248733948808770/original/f1474f74-3630-4f31-95b0-34975bf981ea.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1140248733948808770/original/edd7404c-4eac-4b4a-a80e-e2ffbcd296b5.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1140248733948808770/original/578f3faf-e53c-4ef7-aa04-aaa8a6071b1e.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE0MDI0ODczMzk0ODgwODc3MA%3D%3D/original/53c5dd95-f681-4fae-87c0-7731c88eb854.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1140248733948808770/original/17280041-f588-4890-afd2-6a19bb8df4e8.jpeg?im_w=720',
    ],
  },
  {
    id: '24',
    title: 'Cottage in the Cotswolds',
    description: 'Badgers Bothy is set within a woodland glade in the grounds of the 16th century Amberley Farmhouse and provides the most unique and charming country escape. Our idyllic cottage is set on the edge of Minchinhampton Common (located in an AONB) and with miles of footpaths which are perfect for those wishing to explore the Cotswolds. This beautiful cottage exudes an aura of peace and tranquillity and a haven for those wishing to escape the hustle and bustle of a busy life.',
    price: 220,
    location: 'Cotswolds, UK',
    guests: 2,
    host: 'Beatriz',
    rating: 4.6,
    reviews: 67,
    reviewMessages: [
      { name: 'Elio', message: 'Very aesthetic.', rating: 4.6 },
      { name: 'Nina', message: 'Felt like my Pinterest board.', rating: 4.7 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Njc4Mjg5MjQwNjU3MzAzMDc0/original/37e6370d-7290-41b0-a568-d930af60ced0.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/miso/Hosting-678289240657303074/original/1daeca04-8fbe-4a4b-9dcd-be17463fa00a.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-678289240657303074/original/f3eee66f-af77-4de3-85ee-08b82fbe7767.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-678289240657303074/original/445f0e95-e05d-4860-bfc7-f24cf96b0bf8.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/miso/Hosting-678289240657303074/original/172ce664-3889-4ad6-9fd0-5bf73c32d74a.jpeg?im_w=720',
    ],
  },
  {
    id: '25',
    title: 'Modern flat in Amsterdam',
    description: 'This centrally located accommodation is tastefully and modernly furnished and equipped with every comfort.',
    price: 240,
    location: 'Amsterdam, Netherland',
    guests: 6,
    host: 'Brady',
    rating: 4.7,
    reviews: 84,
    reviewMessages: [
      { name: 'Lily', message: 'Felt like a movie set.', rating: 4.8 },
      { name: 'David', message: 'Awesome for snowboarding trips.', rating: 4.6 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1336353466633867528/original/29058290-c7ac-4a55-8c25-58d1c47aaf09.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1336353466633867528/original/c69a9d6a-4b39-465c-9210-f29d810d981f.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1336353466633867528/original/edbf96d0-e8d2-4f32-9373-18556715dac9.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1336353466633867528/original/3b64f6a0-2fe1-4283-9b47-1d692fa9662f.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1336353466633867528/original/d4cf4f5a-b764-4366-a8e4-f53c03415724.jpeg?im_w=720',
    ],
  },
  {
    id: '26',
    title: 'Beach Front Bungalow in Phucket, Thailand',
    description: 'Charming bungalow by the river with firewood, whisky, and views.',
    price: 280,
    location: 'Phucket, Thailand',
    guests: 3,
    host: 'Angus',
    rating: 4.8,
    reviews: 73,
    reviewMessages: [
      { name: 'Maggie', message: 'Straight out of a fairytale.', rating: 5 },
      { name: 'Ewan', message: 'Whisky and fireplace bliss.', rating: 4.7 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1402962438064423837/original/b8064c69-f1ee-4102-908f-067fdf8625ef.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1402962438064423837/original/38e2651c-587c-4cd3-a16c-640128d77f25.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1402962438064423837/original/59585742-eb92-4be3-85c9-77da705ec5a1.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1402962438064423837/original/ea99d088-f248-4180-b648-262b65ba92bf.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1402962438064423837/original/5ca7c203-4b87-4032-8f2f-c1f5ac7fd523.jpeg?im_w=720',
    ],
  },
  {
    id: '27',
    title: 'Mountain Retreat in Colorado',
    description: 'Located in Downtown Fort Collins this modern townhouse is ideal for groups of up to 6. The perfect location for anyone traveling to Fort Collins and wanting to enjoy the restaurants and bars of old town, the local breweries or simply enjoy mountain views from the roof top patio. Only a 5 minute walk to the local breweries and a half of a block to the new and popular Poudre River Walk!',
    price: 340,
    location: 'Colorado, USA',
    guests: 2,
    host: 'Nia',
    rating: 4.9,
    reviews: 61,
    reviewMessages: [
      { name: 'Joel', message: 'Lions at sunrise... wow.', rating: 5 },
      { name: 'Imani', message: 'The best glamping trip ever.', rating: 4.9 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTk0MTk2Mjk3MjU3NDE0ODY3/original/7a1d9eb1-7c88-4ab0-a4d4-aa61995bbc33.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTk0MTk2Mjk3MjU3NDE0ODY3/original/e809ef12-6452-474b-b98e-4ce3b3e5ef41.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTk0MTk2Mjk3MjU3NDE0ODY3/original/5de3c618-0561-4cb8-85ab-4966d4e124fb.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/miso/Hosting-994196297257414867/original/57cdabe7-cb98-4161-af8d-4c4048987a25.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTk0MTk2Mjk3MjU3NDE0ODY3/original/25f5193d-8dfb-4c12-af0c-465f442ac056.jpeg?im_w=1200',
    ],
  },
  {
    id: '28',
    title: 'Historic Home in Charleston',
    description: 'Secluded Lakeside Location: Our A-frame cabin sits nestled among trees, right at the waters edge, offering unobstructed lake views, beautiful sunsets, and a private escape from the hustle and bustle of everyday life',
    price: 210,
    location: 'Charleston, USA',
    guests: 1,
    host: 'Tomo',
    rating: 4.6,
    reviews: 53,
    reviewMessages: [
      { name: 'Willow', message: 'So peaceful and healing.', rating: 4.8 },
      { name: 'Ravi', message: 'Best solo trip ever.', rating: 4.5 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/a6872d1c-a51b-42ef-916e-ae3e8d6523ed.jpg?im_w=960',
      'https://a0.muscache.com/im/pictures/miso/Hosting-921192209857660297/original/40f3c7f0-8646-46ad-98a5-8961f9752fc0.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-921192209857660297/original/fd50c927-e40d-41e7-bd0b-947aafc874b3.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-921192209857660297/original/a17ce35c-93b8-497b-b8ae-336e1ec95fbb.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-921192209857660297/original/a9898c75-c207-44d1-aeb1-22ed5abfdeef.jpeg?im_w=1200',
    ],
  },
  {
    id: '29',
    title: 'Luxury Apartment in Vienna',
    description: 'The Apartment is in a house with an elevator. The apartment has about 60 m², suitable for 2-3 guests. You will be close to everything. You find many shops, pharmacies, restaurants and coffee shops, ATMs. Public transport and a supermarket are within 100 meters. The apartment house is about a 15-minute pleasant walk to the Opera House.',
    price: 320,
    location: 'Vienna, Austria',
    guests: 6,
    host: 'Fiona',
    rating: 4.8,
    reviews: 89,
    reviewMessages: [
      { name: 'Declan', message: 'So grand and magical.', rating: 5 },
      { name: 'Maeve', message: 'Felt like a princess.', rating: 4.7 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM3ODc3MzYzMTM0MzA4ODcwNw==/original/32412a45-03e0-4de5-8a27-b11df52ae707.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM3ODc3MzYzMTM0MzA4ODcwNw==/original/323aa693-be08-46cb-b69a-1ae6a8e07509.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM3ODc3MzYzMTM0MzA4ODcwNw==/original/0191bb0e-26d9-404e-bab0-5dcdeb4a5f90.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/miso/Hosting-1378773631343088707/original/78cd6fd9-69de-4428-9e08-e96c08159aea.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/miso/Hosting-1378773631343088707/original/76e185ed-536f-4bbf-bc42-a589e2963579.jpeg?im_w=720',
    ],
  },
  {
    id: '30',
    title: 'Countryside Villa in Provence',
    description: 'Welcome to our fully renovated and specially designed accommodation for your moments of rest and vacation, in the heart of Provence. Come and discover the unique setting in France of the magnificent Verdon Gorge Park and the superb Lake Sainte Croix. The beautiful landscapes of Provence under the Mediterranean sun are yours to enjoy.',
    price: 350,
    location: 'Provence, France',
    guests: 2,
    host: 'Freya',
    rating: 5.0,
    reviews: 115,
    reviewMessages: [
      { name: 'Axel', message: 'Best sky I’ve ever seen.', rating: 5 },
      { name: 'Luna', message: 'Hot tub under the lights? Unreal.', rating: 5 },
    ],
    images: [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5NzU0NTU1ODA2ODIwMDgyNQ%3D%3D/original/e47cfa00-a8be-4cb6-bf20-87e54a083020.jpeg?im_w=960',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5NzU0NTU1ODA2ODIwMDgyNQ%3D%3D/original/b65f50fe-9ae9-4d45-96ae-a9d324802d82.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5NzU0NTU1ODA2ODIwMDgyNQ%3D%3D/original/05f3d2a0-5f28-4356-b13b-6aa1f77517b3.jpeg?im_w=720',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5NzU0NTU1ODA2ODIwMDgyNQ%3D%3D/original/185a584a-1978-4f9a-b23f-a0ad0bb0a4fc.jpeg?im_w=1200',
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5NzU0NTU1ODA2ODIwMDgyNQ%3D%3D/original/78d62dd2-357d-49d2-8b2f-533fcc3f8ff8.jpeg?im_w=720',
    ],
  },
]

export default function ListingDetailsPage() {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])

  useEffect(() => {
    const found = dummyListings.find((item) => item.id === id)
    setListing(found)
  }, [id])

  if (!listing) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500">
        Listing not found.
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Image Grid */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 sm:grid-rows-2 gap-2 overflow-hidden rounded-2xl h-[60vh]">
          <img
            onClick={() => setShowModal(true)}
            src={listing.images[0]}
            alt={listing.title}
            className="sm:col-span-2 sm:row-span-2 w-full h-full object-cover cursor-pointer hover:brightness-90 transition"
          />
          {listing.images.slice(1, 5).map((img, i) => (
            <img
              key={i}
              onClick={() => setShowModal(true)}
              src={img}
              alt={`Image ${i + 1}`}
              className="w-full h-full object-cover cursor-pointer hover:brightness-90 transition"
            />
          ))}
        </div>

        {/* Modal for full image gallery */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-white z-50"
                >
                  <X size={28} />
                </button>
                {listing.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Gallery ${i}`}
                    className="rounded-lg w-full h-[200px] object-cover"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Details & Booking */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Listing Info */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{listing.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <Star size={16} className="text-yellow-500" />
              {listing.rating} · {listing.reviews} reviews
              <MapPin size={16} className="ml-4" />
              {listing.location}
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed text-[15px]">
            {listing.description}
          </p>

          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold">Hosted by {listing.host}</h2>
            <div className="flex items-center text-gray-600 mt-1 gap-2 text-sm">
              <Users2 size={16} /> Up to {listing.guests} guests
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Reviews</h3>
            <div className="space-y-4">
              {listing.reviewMessages.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm border"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{review.name}</p>
                    <div className="flex items-center text-yellow-500 text-sm">
                      <Star size={14} className="mr-1" /> {review.rating}
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2 text-sm">{review.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="sticky top-24 h-fit">
          <motion.div
            className="border border-gray-200 rounded-xl shadow-xl p-6 space-y-6 bg-white"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-end">
              <div className="text-2xl font-semibold">
                ${listing.price}
                <span className="text-sm font-normal text-gray-600">
                  {' '}
                  / night
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500 gap-1">
                <Star size={14} className="text-yellow-500" /> {listing.rating}
              </div>
            </div>

            <div className="relative">
              <div
                onClick={() => setShowCalendar(!showCalendar)}
                className="cursor-pointer border p-3 rounded-md text-sm text-gray-700 bg-gray-50"
              >
                {format(dateRange[0].startDate, 'MMM d, yyyy')} →{' '}
                {format(dateRange[0].endDate, 'MMM d, yyyy')}
              </div>

              {showCalendar && (
                <div className="absolute z-20 mt-2">
                  <DateRange
                    ranges={dateRange}
                    onChange={(item) => setDateRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    rangeColors={['#DC2626']}
                  />
                </div>
              )}
            </div>

            <input
              type="number"
              placeholder="Number of guests"
              min={1}
              max={listing.guests}
              className="border p-3 rounded-md w-full text-sm"
            />

            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-semibold transition">
              Book Now
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
