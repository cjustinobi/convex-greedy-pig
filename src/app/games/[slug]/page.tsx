
'use client'

import GameSettings from '@/components/ui/GameSettings'
import GameArena from '@/components/ui/GameArena'
import GameHeader from '@/components/shared/GameHeader'


export default function GamePage({ params }: { params: { slug: string } }) {

  return (
    <div>
      <GameHeader />
      <GameSettings />
      <GameArena />
    </div>
  )}