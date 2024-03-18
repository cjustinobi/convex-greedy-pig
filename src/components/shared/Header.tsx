import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import Logo from '@/assets/img/logo.png'
import Socials from '@/components/ui/Socials'
import Button from './Button'

const Header = () => {

  const dispatch = useDispatch()

  const modalHandler = () => {
    dispatch({ type: 'modal/toggleGameModal' })
  }

  return (
    <div className="mx-auto max-w-screen-2xl">
      <header className="flex items-center justify-between py-4 md:py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl"
          aria-label="logo"
        >
          <Image
            className=""
            data-aos="zoom-in"
            src={Logo}
            alt="greedy image"
            width={70}
            height={50}
            loading="lazy"
          />
          GreedyPig
        </Link>
        <nav className="hidden gap-12 lg:flex">
          <Link
            href="/games"
            className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
          >
            Games
          </Link>
          <Link
            href="#"
            className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
          >
            My Games
          </Link>
          <Link
            onClick={modalHandler}
            href="#"
            className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
          >
            Create Game
          </Link>
        </nav>
        <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
          <div className="flex items-center gap-8">
            <Socials />
            <Button onClick={modalHandler} className="w-[200px]">
              Create Game
            </Button>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          Menu
        </button>
      </header>
    </div>
  )
}

export default Header
