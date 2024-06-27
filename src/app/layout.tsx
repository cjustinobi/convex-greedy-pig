'use client'

import { Provider } from 'react-redux'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import ConvexClientProvider from '@/components/providers/ConvexClientProvider'
import CreateGameModal from '@/components/ui/CreateGameModal'
import store from '@/store'

import './globals.css'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Provider store={store}>
          <ConvexClientProvider>
            {children}
            <CreateGameModal />
          </ConvexClientProvider>
          <Toaster />
        </Provider>
      </body>
    </html>
  )
}
