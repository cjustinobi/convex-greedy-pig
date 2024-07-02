import { FC, FormEvent, useEffect, useState } from 'react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { useConvexAuth } from 'convex/react'
import { useUser } from '@clerk/clerk-react'
import Button from '../shared/Button'

interface JoinGameModalProps {
  closeJoinModal: () => void
}

const JoinGameModal: FC<JoinGameModalProps> = ({ closeJoinModal }) => {

  const { slug } = useParams<{ slug: Id<'games'> }>()
  const { isAuthenticated } = useConvexAuth()
  const { user } = useUser()
  const addUsername = useMutation(api.games.addParticipant)

  const [loading, setLoading] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    setLoading(true)
    try {
      setLoading(true)
      await addUsername({
        data: {
          id: slug,
          playerAddress: username,
        },
      })
      localStorage.setItem('username', username)
       reset()
      toast.success('Joined!')
    } catch (error) {
      console.log('send game error: ', error)
      setLoading(false)
    }
  }

  const reset = () => {
    setUsername('')
    setLoading(false)
    closeJoinModal()
  }

   useEffect(() => {
     if (isAuthenticated && user?.username) {
       setUsername(user.username);
     }
   }, [isAuthenticated, user]);

  return (
    <div
      className={`fixed ${
        true ? '' : 'hidden'
      } inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal`}
    >
      <form
        className="mx-auto mt-10 w-[38rem] p-5 bg-gray-700 rounded-lg relative"
        onSubmit={submitHandler}
      >
        <button
          onClick={() => closeJoinModal()}
          type="button"
          className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="popup-modal"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="relative mb-3 mt-10" data-twe-input-wrapper-init>
          <input
            onChange={(e) => setUsername(e.target.value)}
            disabled={isAuthenticated}
            value={username}
            className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlInput1"
            placeholder="Enter Username"
          />
          <label
            htmlFor="exampleFormControlInput1"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
          >
            Username
          </label>
        </div>
        <div className="flex items-center justify-between my-5">
          <Button className="w-[200px]" type="submit">
            {loading ? 'joining ...' : 'Join Game'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default JoinGameModal
