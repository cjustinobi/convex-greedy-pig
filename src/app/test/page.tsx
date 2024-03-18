'use client'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useState } from 'react'

export default function Home() {
  // const tasks = useQuery(api.tasks.get);
  const sendTask = useMutation(api.games.create)

  const [task, setTask] = useState('')

  const send = async () => {
    try {
      // await sendTask({
      //   creator: 'task',
      //   gameName: 'first game',
      //   activePlayer: '',
      //   participants: [],
      //   gameSettings: {
      //     turnTimeLimit: 0,
      //     winningScore: 0,
      //     mode: 'turn',
      //     apparatus: 'roulette',
      //     bet: false,
      //     maxPlayer: 10,
      //     limitNumberOfPlayer: false,
      //   },
      // })
      setTask('')
    } catch (error) {
      console.log('send game error: ', error)
    }
  }

  return (
    <div>
      {/* <main className="flex flex-col items-center justify-between p-24">
        {tasks?.map(({ _id, text }) => (
          <div key={_id}>{text}</div>
        ))}
      </main> */}

      <input
        onChange={(e) => setTask(e.target.value)}
        type="text"
        placeholder="enter task"
      />
      <button onClick={send} type="button">
        Send
      </button>
    </div>
  )
}
