import { FC, useEffect, useState } from "react";
import Die1 from "@/assets/img/dice_1.png";
import Die2 from "@/assets/img/dice_2.png";
import Die3 from "@/assets/img/dice_3.png";
import Die4 from "@/assets/img/dice_4.png";
import Die5 from "@/assets/img/dice_5.png";
import Die6 from "@/assets/img/dice_6.png";
import Image from "next/image";
import useAudio from "@/hooks/useAudio";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { GameStatus } from "@/interfaces";

const die = [Die1, Die2, Die3, Die4, Die5, Die6];

interface ApparatusProps {
  // setIsRolling: (value: boolean) => void
  // isRolling: boolean
  // value: number
}

const Dice: FC<ApparatusProps> = () => {
  
  const { slug } = useParams<{ slug: Id<"games"> }>();
  const game = useQuery(api.games.getGameById, { id: slug });
  const updateGameStatus = useMutation(api.games.updateGameStatus);
  const updateParticipant = useMutation(api.games.updateParticipant);

  const [currentDice, setCurrentDice] = useState(0);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const diceRollSound = useAudio("/sounds/diceRoll.mp3");

  const saveGameOutcome = async () => {
    if (game?.status === "Ended") {
      return toast.error("Game has ended");
    }

    const username = localStorage.getItem("username");
    if (game?.activePlayer !== username) {
      return toast.error("Not your turn");
    }

       if (game?.status !== "In Progress") {
         try {
           await updateGameStatus({
             data: {
               id: slug,
               status: GameStatus.InProgress
             }
           })
         } catch (error) {
           console.error("Error updating game status:", error);
           return toast.error("Failed to update game status");
         }
       }

    const rollOutcome = Math.floor(Math.random() * 6) + 1;

    await updateParticipant({
      data: {
        id: game?._id,
        playerAddress: username,
        key: "turn",
        value: rollOutcome,
        response: true,
      },
    });

    // setValue(result);
    // if (players.length >= 2) {

    // } else {
    //   toast.error('Not enough players to play')
    // }
  };


  useEffect(() => {
    if (game?.rollOutcome) {
      let endRoll = 0;
      let interval: any;
      let diceValue: number;
      interval = setInterval(() => {
        if (endRoll < 30) {
          diceRollSound?.play();
          diceValue = Math.floor(Math.random() * 6);
          setCurrentDice(diceValue);
          endRoll++;
        } else {
          setCurrentDice(game?.rollOutcome - 1);
          clearInterval(interval);
          // saveGameOutcome(diceValue + 1)
          setIsRolling(false);
          //  setChangeBackground(false)
        }
      }, 100);
    }
  }, [game?.rollOutcome, isRolling])

  return (
    <>
      <button
        className={`hover:scale-105 active:scale-100 duration-300 md:w-auto w-[200px]`}
        onClick={saveGameOutcome}
        disabled={isRolling}
      >
        {die.map((dice, index) => (
          <Image
            key={index}
            src={dice}
            alt="Dice"
            className={`${currentDice === index ? "" : "hidden"}`}
          />
        ))}
      </button>
    </>
  );
};

export default Dice;
