'use client'
import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import Navbar from '../components/Navbar'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
