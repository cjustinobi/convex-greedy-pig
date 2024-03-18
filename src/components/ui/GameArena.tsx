'use client'

import Apparatus from '@/components/ui/Apparatus'
import LeaderBoard from './Leaderboard'

const GameArena = () => {
  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8">
        <div className="flex flex-col items-center gap-4  px-8 py-6 md:gap-6">
          <Apparatus />
        </div>

        <div className="flex flex-col items-center gap-4 md:gap-6">
          <LeaderBoard />
        </div>
      </div>

      <div className="group fixed bottom-10 right-10 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-danger-600 uppercase leading-normal text-white">
        <a
          href="#"
          data-te-ripple-init
          data-te-ripple-color="light"
          className="cursor-pointer rounded-full p-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </a>
        <ul className="absolute z-0 flex translate-y-full flex-col items-center justify-center opacity-0 transition-all duration-500 ease-in-out group-hover:-translate-y-[60%] group-hover:opacity-100">
          <li>
            <a
              href="#"
              data-te-ripple-init
              data-te-ripple-color="light"
              data-te-ripple-centered="true"
              className="mx-5 mb-3 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-info-600 shadow-md hover:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="#"
              data-te-ripple-init
              data-te-ripple-color="light"
              data-te-ripple-centered="true"
              className="mx-5 mb-3 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-warning-600 shadow-md hover:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="#"
              data-te-ripple-init
              data-te-ripple-color="light"
              data-te-ripple-centered="true"
              className="mx-5 mb-3 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-success-600 shadow-md hover:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </a>
          </li>
          <li>
            <div
              data-te-ripple-init
              data-te-ripple-color="light"
              data-te-ripple-centered="true"
              className="mx-5 mb-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary-600 shadow-md hover:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default GameArena
