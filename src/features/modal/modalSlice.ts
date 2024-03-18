import { createSlice } from '@reduxjs/toolkit'

interface State {
  gameModal: boolean
  joinModal: boolean
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    gameModal: false,
    joinModal: false
  } as State,
  reducers: {
    toggleGameModal: (state) => {
      state.gameModal = !state.gameModal
    },
    toggleJoinModal: (state) => {
      state.joinModal = !state.joinModal
    }
  },
})

export const selectGameModal = (state: State) => state.gameModal
export const selectJoinModal = (state: State) => state.joinModal

export const { toggleGameModal, toggleJoinModal } = modalSlice.actions

export default modalSlice.reducer
