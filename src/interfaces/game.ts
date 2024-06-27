import { Id } from "@/convex/_generated/dataModel"
import { GameStatus } from "./convex"

export interface IGame {
  _id: Id<'games'>
  gameName: string
  status: GameStatus
  participants: any
  gameSettings: {
    bet: boolean
    // betAmount: number
    apparatus: string
  }
}
