'use client'

import Button from "@/components/shared/Button";
import Header from "@/components/shared/Header";
import GameCard from "@/components/ui/GameCard";
import { api } from "@/convex/_generated/api";
import { IGame } from "@/interfaces";
import { useQuery } from "convex/react";

const MyGames = () => {

  const createdGames = useQuery(api.users.createdGames)
  const joinedGames = useQuery(api.users.joinedGames)

  return (
    <div className="md:px-custom p-custom-sm text-gray-500">
      <Header />
      <h1 className="divider">Created Games</h1>
      {createdGames?.length ? (
        createdGames.map((game, i) => <GameCard key={i} game={game} action="view" />)
      ) : (
        <div className="md:px-custom p-custom-sm text-gray-500">
          <div className="text-center py-10">
            <p className="mb-6">No game created yet.</p>
            <div className="flex justify-center">
              <Button className="btn w-[180px]">Create Game</Button>
            </div>
          </div>
        </div>
      )}
      <h1 className="divider">Joined Games</h1>
      {joinedGames?.length ? (
        joinedGames.map((game, i) => <GameCard key={i} game={game} action="view" />)
      ) : (
        <div className="md:px-custom p-custom-sm text-gray-500">
          <div className="text-center py-10">
            <p className="mb-6">No game joined yet.</p>
            <div className="flex justify-center">
              <Button className="btn w-[180px]">Join Game</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyGames