import { FormEvent, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { initLeaderboard } from '@/features/leaderboard/leaderboardSlice'

const UsernamesForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (event) {
        const usernameInput = event.currentTarget?.elements.namedItem(
          'username'
        ) as HTMLInputElement
        if (usernameInput) {
          const username = usernameInput.value.trim()

          if (username) {
            dispatch(initLeaderboard(username))
            // Clear the input field
            usernameInput.value = ''
          }
        }
      }
    },
    [dispatch]
  )

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          className="p-2 border border-gray-300 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Username
        </button>
      </form>
    </div>
  )
}

export default UsernamesForm
