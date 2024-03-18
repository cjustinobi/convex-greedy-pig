// 'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useMutation } from 'convex/react'
import { getSocket } from '@/lib/socket'
import {
  InputFunction,
  RollFunction,
  OutputFunction,
  playGame,
} from '@/lib/utils'
import { Roulette, useRoulette } from 'react-hook-roulette'
import {
  selectParticipants,
  UpdatePlayerInfoPayload,
} from '@/features/leaderboard/leaderboardSlice'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/store'
import { dappAddress } from '@/lib/utils'
import ConfirmModal from './ConfirmModal'
import toast from 'react-hot-toast'
import { selectParticipantAddresses } from '@/features/games/gamesSlice'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import Button from '../shared/Button'


export default function AppRoullete() {

  const addParticipant = useMutation(api.games.addParticipant)
  // const updateParticipant = useMutation(api.games.updateParticipants)
  const searchParams = useSearchParams()

  // const players = useSelector((state: any) =>
  //   selectParticipantAddresses(state.games)
  // )
  // const dispatch = useDispatch()

  const [gameInProgress, setGameInProgress] = useState<boolean>(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalQuestion, setModalQuestion] = useState('')
  const [handleUserInput, setHandleUserInput] = useState<
    (answer: string) => void
  >(() => () => {})
  const [rollResult, setRollResult] = useState<number | null>(null)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const stopButtonRef = useRef<HTMLButtonElement | null>(null)
  const { roulette, onStart, onStop } = useRoulette({
    items: [
      { name: '1', bg: '#b26527', color: '#ffffff' },
      { name: '2', bg: '#ce9729', color: '#ffffff' },
      { name: '3', bg: '#e7c02b', color: '#ffffff' },
      { name: '4' },
      { name: '5' },
      { name: '6' },
    ],
    onSpinEnd: (res) => {
      setRollResult(Number(res))
    },
    options: {
      maxSpeed: 20,
      acceleration: 8,
      determineAngle: 90,
      style: {
        canvas: {
          bg: 'transparent',
        },
        arrow: {
          bg: '#000',
          size: 26,
        },
        label: {
          font: '28px Arial',
          align: 'right',
          baseline: 'middle',
          offset: 0.65,
          defaultColor: '#000',
        },
      },
    },
  })

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  const handleStopGame = () => {
    setIsGameStarted(false)
    onStop()
  }

  const getOutput: OutputFunction = (user: string, message: string) => {
    return new Promise(async (resolve) => {
      toast.success(`${user} ${message}`, {
        duration: 6000,
      })
      dispatch({ type: 'leaderboard/updateActivePlayer', payload: user })
   
      const socket = getSocket()
      if (socket) {
        socket.emit('activePlayer', user)
      }
      resolve(message)
    })
  }

  const getInput: InputFunction = async (question: string) => {
    return new Promise((resolve) => {
      setModalQuestion(question)
      openModal()

      const handleUserInput = (answer: string) => {
        closeModal()
        resolve(answer)
      }

      setHandleUserInput(() => handleUserInput)
    })
  }

  const startRouletteSpin = async () => {
    setIsGameStarted(true)
    onStart() // Start the roulette spinning
  }

  const getRoll: RollFunction = async () => {
    return new Promise((resolve) => {
      startRouletteSpin()

      setTimeout(() => {
        if (stopButtonRef.current) {
          stopButtonRef.current.click()

          setTimeout(() => {
            const rollResultElement = document.getElementById('roll-result')
            if (rollResultElement) {
              const rollResultValue = rollResultElement.innerText
              return resolve(Number(rollResultValue))
            }
          }, 500)
        }
      }, 2000)
    })
  }

  const startGame = async () => {
    setGameInProgress(true)
    try {
      debugger
      const result = await playGame(
        [],// players,
        getInput,
        getRoll,
        2,
        getOutput,
        {
          updatePlayerInfo: (action: UpdatePlayerInfoPayload) => {
            // updateParticipant({data: {id: action.id, playerAddress: action.playerAddress, score: action.score}})
            // dispatch({ type: 'leaderboard/updatePlayerInfo', payload: action })
          },
        }
      )

      const updatedParticipants = selectParticipants(
        store.getState().leaderboard
      ) 

      const jsonPayload = JSON.stringify({
        method: 'saveLeaderboard',
        data: {
          leaderboard: updatedParticipants,
        },
      })


      setGameInProgress(false)
      toast.success(`Game finished!. ${result}`, {
        duration: 6000,
      })
      dispatch({ type: 'leaderboard/resetLeaderboard' })
    } catch (error) {
      console.error('Error during game:', error)
    }
  }


  // const test = async () => { 
  
  //       await updateParticipant({data: {id: 'kjk', playerAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', key: 'turn', value: 22}})
  //     }

  const addParticipantsHandler = async (id: any) => {

  }

  useEffect(() => {

    if (searchParams) {
      const action = searchParams.get('action')
      if (action === 'join') {
        const id = window.location.pathname.split('/').pop()

        addParticipantsHandler(id)
       
      }
    }
  }, [searchParams])

  return (


    <div>
  

      <ConfirmModal onSubmit={handleUserInput} showModal={modalIsOpen} />

      {/* <Button className="mb-10" onClick={test} type="button"> */}
      <Button onClick={startGame} className="mb-10" type="button">
        Start Game
      </Button>

      <Roulette roulette={roulette} />
      {/* <RouletteWrapper onStart={onStart} onStop={onStop} /> */}

      <div className="hidden" id="roll-result">
        {rollResult}
      </div>
      <button
        className="hidden"
        ref={stopButtonRef}
        type="button"
        onClick={handleStopGame}
        disabled={!isGameStarted}
      />
    </div>
  )
}
