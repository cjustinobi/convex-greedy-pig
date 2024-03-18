'use client'
import { FC, useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import Button from '@/components/shared/Button'

import { Wallet } from 'cartesi-wallet'
import {
  selectParticipantAddresses,
  selectSelectedGame,
} from '@/features/games/gamesSlice'
import Dice from '@/components/ui/Dice'
import useAudio from '@/hooks/useAudio'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import JoinGameModal from './JoinGameModal'
import { selectJoinModal } from '@/features/modal/modalSlice'


interface RouletteProps {
  // notices: any
}

const Apparatus: FC<RouletteProps> = () => {

  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const loseSound = useAudio('/sounds/loseSound.mp3')
  const { slug } = useParams<{ slug: Id<'games'> }>()
  const game = useQuery(api.games.getGameById, { id: slug })

  const [players, setPlayers] = useState()
  const [isRolling, setIsRolling] = useState<boolean>(false)
  const [joinGameForm, setJoinGameForm] = useState<boolean>(false)
  const [value, setValue] = useState(0)
  const [playerAddress, setPlayerAddress] = useState<string>('')

  const handleResponse = (response: string) => {
    
  }


  const closeJoinModal = () => {

    setJoinGameForm(false)
  }

  useEffect(() => {
    if (searchParams) {
      const action = searchParams.get('action')
      if (action === 'join') {
        setJoinGameForm(true)
      }
    }
  }, [searchParams])

  // useEffect(() => {
  //   rollups?.inputContract.on(
  //     'InputAdded',
  //     (dappAddress, inboxInputIndex, sender, input) => {
  //       if (
  //         parseInputEvent(input).method === 'playGame' &&
  //         game.rollOutcome !== 1
  //       ) {
  //         dispatch({ type: 'leaderboard/freezLeaderboard', payload: false })

  //         setTimeout(() => {
  //           setValue(game.rollOutcome)
  //           setIsRolling(true)
  //         }, 5000)
  //       } else {
  //         dispatch({ type: 'leaderboard/freezLeaderboard', payload: false })
  //         loseSound?.play()
  //         setValue(game.rollOutcome)
  //       }
  //     }
  //   )
  // }, [game, rollups, loseSound, dispatch])

  return (<div>
    {game ? <div className="w-[300px]">
      <div className="flex justify-center mb-[60px]">
        <Dice />
      </div>

      <div className="flex justify-center">
        {!searchParams.get('action') && (
          <div>
            <Button
              onClick={() => dispatch({ type: 'modal/toggleJoinModal' })}
              className="mb-10"
              type="button"
            >
              Join Game
            </Button>
          </div>
        )}

        {game && game.status === 'In Progress' && (
          <div className="flex justify-between">
            <Button
              className="pass-btn"
              style={{ background: '' }}
              onClick={() => handleResponse('no')}
            >
              Pass
            </Button>
          </div>
        )}
      </div>
      {joinGameForm && <JoinGameModal closeJoinModal={closeJoinModal} />}
    </div> : <div>No Game found</div>}
    </div>
  )
}

export default Apparatus
