import { v } from 'convex/values'
import { GameStatus } from '../interfaces'

export const vGameId = v.id('games')

export const vCreateGame = v.object({
    activePlayer: v.string(),
    creator: v.optional(v.id('users')),
    gameName: v.string(),
    gameSettings: v.object({
      apparatus: v.string(),
      bet: v.boolean(),
      limitNumberOfPlayer: v.boolean(),
      maxPlayer: v.float64(),
      mode: v.string(),
      turnTimeLimit: v.float64(),
      winningScore: v.float64(),
    }),
    participants: v.array(
      v.object({
        address: v.optional(v.string()),
        playerInfo: v.optional(v.object({
          totalScore: v.float64(),
          turn: v.float64(),
          turnScore: v.float64(),
        })),
    })
    ),
    status: v.union(v.literal(GameStatus.New), v.literal(GameStatus.Cancelled), v.literal(GameStatus.Ended), v.literal(GameStatus.InProgress)),
    // startTime: v.string(),
    rollOutcome: v.number(),
    winner: v.string()
  })

  export const vUpdateGameStatus = v.object({
    id: v.id('games'),
    status: v.union(v.literal(GameStatus.New), v.literal(GameStatus.Cancelled), v.literal(GameStatus.Ended), v.literal(GameStatus.InProgress))
  })

export const vAddParticipant = v.object({
  id: v.id('games'),
  playerAddress: v.string()
})

export const vUpdateParticipant = v.object({
  id: v.any(),
  playerAddress: v.string(),
  key: v.string(),
  value: v.float64(),
  response: v.boolean()
})
