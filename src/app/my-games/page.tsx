'use client'

import Header from "@/components/shared/Header";
import GameCard from "@/components/ui/GameCard";
import { api } from "@/convex/_generated/api";
import { IGame } from "@/interfaces";
import { useQuery } from "convex/react";

const MyGames = () => {

  const games = useQuery(api.users.createdGames);
    return (
      <div className="md:px-custom p-custom-sm text-gray-500">
        <Header />
        
        {games?.length && games.map((game) => <GameCard game={game} />)}
      </div>
    );
}

export default MyGames