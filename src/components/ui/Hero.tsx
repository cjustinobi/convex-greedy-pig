import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import GreedyHero from '@/assets/img/greedypig-hero.png'
import Button from '../shared/Button'

const Hero = () => {
  
  const dispatch = useDispatch()
  
  const modalHandler = () => {
    dispatch({ type: 'modal/toggleGameModal' })
  }

  return (
    <section className="flex flex-col justify-between align-middle gap-6 sm:gap-10 md:gap-16 lg:flex-row">
      <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-8/12 xl:py-24">
        <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl">
          Very proud to introduce
        </p>

        <h1 className="mb-8 text-4xl font-bold text-gray-500 sm:text-5xl md:mb-12 md:text-6xl">
          Experience the <br />{' '}
          <span className="text-gradient bg-gradient-to-r from-purple-600 via-peach-600 to-orange-500">
            Heart Pounding
          </span>{' '}
          Action of Greedy Pig
        </h1>

        <p className="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">
          Prepare for a thrilling ride with Greedy Pig. Feel the tension rise
          with every dice roll as players balance risks and rewards.
        </p>

        <div className="flex gap-2.5">
          <Link
            href="/games"
            className="flex items-center flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button className="md:w-[200px] w-[130px] font-bold">
              Play Now
            </Button>
          </Link>

          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 rounded-2xl">
              <div className="md:w-[200px] w-[130px] bg-black rounded-2xl">
                <h1
                  onClick={modalHandler}
                  className="cursor-pointer text-center font-bold p-2"
                >
                  Create Game
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg lg:h-auto xl:w-6/12 lg:mt-16">
        <Image
          className=""
          data-aos="zoom-in"
          src={GreedyHero}
          alt="greedy image"
          width={500}
          height={500}
        />
      </div>
    </section>
  )
}

export default Hero
