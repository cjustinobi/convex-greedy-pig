'use client'

import Header from "@/components/shared/Header"
import GamesList from "@/components/ui/Games"

const Games = () => {

  return (
    <div className="md:px-custom p-custom-sm text-gray-500">
      <Header />
      <GamesList />
    </div>
  )

}

export default Games