'use client'

import Hero from '@/components/ui/Hero'
import Header from '@/components/shared/Header'
import Features from '@/components/ui/Features'
import Stats from '@/components/ui/Stats'
import Games from '@/components/ui/Games'
import { useStoreUser } from '@/hooks/useStoreUser'

export default function Home() {
  const { isLoading, isAuthenticated } = useStoreUser()
  return (
    <div className="md:px-custom p-custom-sm text-gray-500">
      <Header />
      <Hero />
      <Stats />
      <Games />
      <Features />
    </div>
  )
}
