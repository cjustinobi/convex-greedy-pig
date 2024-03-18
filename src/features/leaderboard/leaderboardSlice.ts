import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PlayerInfo {
  turn: number
  turnScore: number
  totalScore: number
}

export interface Participant {
  username: string
  playerInfo: PlayerInfo
}

interface State {
  participants: Participant[]
  activePlayer: string | null
}

export interface UpdatePlayerInfoPayload {
  username: string
  property: keyof PlayerInfo
  value: any
}

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    participants: [],
    activePlayer: '',
  } as State,
  reducers: {
    initLeaderboard: (state, action: PayloadAction<string>) => {
      state.participants.push({
        username: action.payload,
        playerInfo: {
          turn: 0,
          turnScore: 0,
          totalScore: 0,
        },
      })
    },

    updatePlayerInfo: (
      state,
      action: PayloadAction<UpdatePlayerInfoPayload>
    ) => {
      const { username, property, value } = action.payload
      const participant = state.participants.find(
        (p) => p.username === username
      )
      if (participant) {
        if (property === 'turn') {
          participant.playerInfo = {
            ...participant.playerInfo,
            [property]: participant.playerInfo[property] + value, // Increment the turn by the value
          }
        } else {
          participant.playerInfo = {
            ...participant.playerInfo,
            [property]: value,
          }
        }
      }
    },
    updateActivePlayer: (state, action: PayloadAction<string>) => {
      state.activePlayer = action.payload // Update the activePlayer state with the new value
    },
    resetLeaderboard: (state) => {
      state.participants = []
    },
  },
})

export const selectUsernames = createSelector(
  (state: State) => state.participants,
  (participants: Participant[] | undefined) => {
    if (!participants) return [] // Return an empty array if participants is undefined
    return participants.map((participant) => participant.username)
  }
)

export const selectActivePlayer = createSelector(
  (state: State) => state.activePlayer,
  (activePlayer: string | null) => activePlayer
)

export const selectParticipants = (state: State) => state.participants

export const { initLeaderboard, updatePlayerInfo, resetLeaderboard } =
  leaderboardSlice.actions

export default leaderboardSlice.reducer

export type LeaderboardState = ReturnType<typeof leaderboardSlice.reducer>
