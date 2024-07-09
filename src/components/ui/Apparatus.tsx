"use client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Button from "@/components/shared/Button";
import Dice from "@/components/ui/Dice";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import JoinGameModal from "./JoinGameModal";
import useAudio from "@/hooks/useAudio";

const Apparatus = () => {
  const updateParticipant = useMutation(api.games.updateParticipant);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { slug } = useParams<{ slug: Id<"games"> }>();
  const game = useQuery(api.games.getGameById, { id: slug });
  const passSound = useAudio("/sounds/passSound.mp3");

  const [joinGameForm, setJoinGameForm] = useState<boolean>(false)

  const handleResponse = async () => {
    passSound?.play();
    const username = localStorage.getItem("username");
    if (game?.activePlayer !== username) {
      return toast.error("Not your turn");
    }
    await updateParticipant({
      data: {
        id: game?._id,
        playerAddress: username,
        key: "turn",
        value: 0,
        response: false,
      },
    });
  };

  const closeJoinModal = () => {
    setJoinGameForm(false)
  };

  useEffect(() => {
    if (searchParams) {
      const action = searchParams.get('action')
      if (action === 'join') {
        setJoinGameForm(true)
      }
    }
  }, [searchParams])

  return (
    <div>
      {game ? (
        <div className="w-[300px]">
          <p className="text-center mb-5 font-bold text-lg">
            Active Player: {game.activePlayer}
          </p>
          <div className="flex justify-center mb-[60px]">
            <Dice />
          </div>

          <div className="flex justify-center">
            {!searchParams.get('action') && (
              <div>
                <Button
                  onClick={() => dispatch({ type: 'modal/toggleJoinModal' })}
                  className="mb-10"
                  type="button"
                >
                  Join Game
                </Button>
              </div>
            )}

            {game &&
              game.status === 'In Progress' &&
              game.activePlayer ===
                localStorage.getItem('username') && (
                  <div className="flex justify-between">
                    <Button
                      className="pass-btn"
                      style={{ background: '' }}
                      onClick={handleResponse}
                    >
                      Pass
                    </Button>
                  </div>
                )}
          </div>
          {joinGameForm && <JoinGameModal closeJoinModal={closeJoinModal} />}
        </div>
      ) : (
        <div>No Game found</div>
      )}
    </div>
  )
};

export default Apparatus;
