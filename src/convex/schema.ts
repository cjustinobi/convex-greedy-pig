import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'
import { GameStatus } from '../interfaces'

export default defineSchema({
  games: defineTable({
    activePlayer: v.string(),
    creator: v.optional(v.string()),
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
        })
        ),
      })
    ),
    status: v.union(
      v.literal(GameStatus.New),
      v.literal(GameStatus.InProgress),
      v.literal(GameStatus.Ended),
      v.literal(GameStatus.Cancelled)
    ),
    // startTime: v.string(),
    rollOutcome: v.number(),
    winner: v.string()
  })
  .index('by_status', ['status']),

  users: defineTable({
    name: v.string(),
    email: v.string(),
    username: v.string(),
    tokenIdentifier: v.string()
  }).index('by_token', ['tokenIdentifier'])
})
