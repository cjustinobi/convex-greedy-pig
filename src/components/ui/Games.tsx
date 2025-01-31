import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { GameStatus } from '@/interfaces'
import { capitalize } from '@/lib/utils'
import GameCard from './GameCard'

const Games = () => {

  const [status, setStatus] = useState<GameStatus>(GameStatus.New);
  const games = useQuery(api.games.getGamesByStatus, { gameStatus: status })
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as GameStatus);
  };

  return (
    <div>
      <h1 className="mt-4 mb-0 text-gray-500 text-center text-2xl font-bold cursor-pointer">
        {status} Games
      </h1>

      <div className="bg-gradient-to-r from-black-500 to-brown-800 via-[#333]">
        <div className="md:w-[300px] md:px-10">
        <select 
          value={status}
          onChange={handleStatusChange} 
          id="small" 
          className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value={GameStatus.New}>New</option>
          <option value={GameStatus.InProgress}>In Progress</option>
          <option value={GameStatus.Cancelled}>Cancelled</option>
          <option value={GameStatus.Ended}>Ended</option>
        </select>
      </div>
        <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
          {games?.length === 0 ? (
            <div className="text-gray-500 text-center">No games available.</div>
          ) : (
          games?.map((game, i) =>  <GameCard key={i} game={game} action={game.status === 'Ended' ? 'view' : 'join'} />)
          )}
        
        </div>
      </div>
    </div>
  )
}

export default Games
