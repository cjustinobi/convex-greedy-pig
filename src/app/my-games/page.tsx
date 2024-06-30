'use client'

import Button from "@/components/shared/Button";
import Header from "@/components/shared/Header";
import GameCard from "@/components/ui/GameCard";
import { api } from "@/convex/_generated/api";
import { IGame } from "@/interfaces";
import { useQuery } from "convex/react";

const MyGames = () => {

  const games = useQuery(api.users.createdGames)

    if (!games?.length) {
      return (
        <div className="md:px-custom p-custom-sm text-gray-500">
          <Header />
          <h1 className="divider">Created Games</h1>
          <div className="text-center py-10">
            <p className="mb-6">No games created yet.</p>
            <div className="flex justify-center">
              <Button className="btn w-[180px]">Create game</Button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="md:px-custom p-custom-sm text-gray-500">
        <Header />
        <h1 className="divider">Created Games</h1>
        {games?.length && games.map((game) => <GameCard game={game} />)}
      </div>
    );
}

export default MyGames