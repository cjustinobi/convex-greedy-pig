import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import Logo from '@/assets/img/logo.png'
import Socials from '@/components/ui/Socials'
import Button from './Button'
import { navLinks } from "@/lib/utils";
import Drawer from '@/components/ui/Drawer'
import { SignedIn, SignedOut, SignInButton, useAuth, UserButton, useSignIn } from '@clerk/nextjs'
import { useStoreUser } from '@/hooks/useStoreUser'
import { useState } from 'react'

interface SetActiveParams {
  mode: 'modal' | string // Assuming other modes could exist
}

const Header = () => {

  const { signIn, setActive, isLoaded } = useSignIn()
  // const { signIn, setActive } = useSignIn();
  const { userId } = useAuth();
  const dispatch = useDispatch()
  const { isAuthenticated } = useStoreUser()
  const [notAuthenticated, setNotAuthenticated] = useState<boolean | undefined>(undefined)

  const modalHandler = async () => {
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
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
            >
              {link.text}
            </Link>
          ))}
        </nav>
        <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
          <div className="flex items-center gap-8">
            {/* <Socials /> */}
           
            {isAuthenticated ? (
              <Button onClick={modalHandler} className="w-[200px]">
                Create Game
              </Button>
            ) : (
              <SignedOut>
                <SignInButton forceRedirectUrl={'/games'} mode="modal">
                  <Button className="w-[200px]">Create Game</Button>
                </SignInButton>
              </SignedOut>
            )}
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button>Sign In</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>

        <Drawer />
      </header>
    </div>
  )
}

export default Header
