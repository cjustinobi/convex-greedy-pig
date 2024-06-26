import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import Logo from '@/assets/img/logo.png'
import Socials from '@/components/ui/Socials'
import Button from './Button'
import { navLinks } from "@/lib/utils";
import Drawer from '@/components/ui/Drawer'

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
            <Socials />
            <Button onClick={modalHandler} className="w-[200px]">
              Create Game
            </Button>
          </div>
        </div>

        <Drawer />
      </header>
    </div>
  );
}

export default Header
