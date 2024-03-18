import { GameStatus } from '../interfaces';
import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { 
  vAddParticipant, 
  vCreateGame, 
  vUpdateParticipant, 
  vGameId,
  vUpdateGameStatus
} from './validators';
import { findGame } from './utils'

export const getGameById = query({
  args: { id: vGameId },
    handler: async ({ db }, { id } ) => {
      return await db
      .query("games")
      .filter(q => q.eq(q.field('_id'), id))
      .first()
  }
})

export const getGamesByStatus = query({
  args: { gameStatus: v.union(
    v.literal(GameStatus.InProgress), 
    v.literal(GameStatus.Ended), 
    v.literal(GameStatus.Cancelled), 
    v.literal(GameStatus.New)
    ) },
  handler: async ({ db }, { gameStatus }) => {
return await db
    .query('games')
    .withIndex('by_status', (q) => q.eq('status', gameStatus))
    .order('desc')
    .collect()
 
  }
  
})

export const create = mutation({
  args: {game: vCreateGame},
  handler: async ({ db }, { game }) => {
    return await db.insert('games', game)
  }, 
})

export const updateGameStatus = mutation({
  args: {data: vUpdateGameStatus},
  handler: async ({ db }, { data }) => {
    return await db.patch(data.id, { status: data.status})
  }, 
})

export const addParticipant = mutation({
  args: {data: vAddParticipant},
  handler: async ({ db }, { data }) => {

    const foundGame = await findGame(db, data.id)
    console.log('foundGame ', foundGame)
    if (!foundGame) {
      throw new Error('Game does not exists')
    }

    const { participants } = foundGame;
    const playerJoined = foundGame.participants.find(p => p.address === data.playerAddress)

    if (playerJoined) {
      throw new Error('Player already joined')
    }

    const addedParticipants = [...participants, { 
      address: data.playerAddress,
      playerInfo: {
        turn: 0,
        turnScore: 0,
        totalScore: 0
      }
    }]

    const updatedActivePlayer = addedParticipants[0].address;

    return await db.patch(data.id, { participants: addedParticipants, activePlayer: updatedActivePlayer })
    // return await db.patch(data.id, { participants: addedParticipants })
  }
})

export const updateParticipant = mutation({
  args: {data: vUpdateParticipant},
  handler: async ({db}, { data }) => {
    const foundGame = await findGame(db, data.id)
 
  
    if (!foundGame) {
      throw new Error('Game not found');
    }

    const { participants } = foundGame;
    const currentPlayerIndex = participants.findIndex(p => p.address === data.playerAddress);

    if (currentPlayerIndex === -1) {
      throw new Error('Player not found');
    }

    const diceRollOutcome = Math.floor(Math.random() * 6) + 1

    if (data.response) {


      if (diceRollOutcome === 1) {
        // Set rolloutcome to 0
        await db.patch(data.id, { rollOutcome: 0 });

        // Update the totalScore of the player and make the next player the active player after 3 seconds
        // setTimeout(async () => {
        const currentPlayer = participants[currentPlayerIndex];

        const updatedTotalScore = currentPlayer.playerInfo?.totalScore ?? 0;

        const updatedParticipants = [...participants];


        if (currentPlayer.playerInfo) {
          updatedParticipants[currentPlayerIndex] = {
            ...currentPlayer,
            playerInfo: {
              ...currentPlayer.playerInfo,
              totalScore: updatedTotalScore,
              turnScore: 0
            },
          };
  
            // Make the next player the active player
            
            // if (currentPlayerIndex && updatedParticipants) {
              const nextPlayerIndex = (currentPlayerIndex + 1) % updatedParticipants.length;
              const nextPlayerAddress = updatedParticipants[nextPlayerIndex].address;
              await db.patch(data.id, { participants: updatedParticipants, activePlayer: nextPlayerAddress });
            // }
        }

        // }, 3000);
      } else {
        // Set rolloutcome to diceRollOutcome
        await db.patch(data.id, { rollOutcome: diceRollOutcome });

        // setTimeout(async () => {
          const updatedParticipants = foundGame?.participants.map((p) => {
            if (p.address === data.playerAddress && p.playerInfo) {
              // Add the rolloutcome to the turnScore of the current player
              p.playerInfo.turnScore += diceRollOutcome;
            }
            return p;
          });

          // check if the player has reached the winning score
          const winningScore = foundGame.gameSettings.winningScore;

          const currentPlayer = participants[currentPlayerIndex];

          const currentPlayerTurnScore = currentPlayer.playerInfo?.turnScore ?? 0;

          const updatedTotalScore = (currentPlayer.playerInfo?.totalScore ?? 0) + currentPlayerTurnScore;


          if (updatedTotalScore >= winningScore) {
            await db.patch(data.id, {
              status: GameStatus.Ended,
              winner: currentPlayer.address,
              participants: updatedParticipants.map((p) => ({
                ...p,
                playerInfo: {
                  ...p.playerInfo,
                  turn: p.playerInfo?.turn ?? 0, // Ensure turn is defined
                  turnScore: 0,
                  totalScore: p.address === currentPlayer.address ? updatedTotalScore : p.playerInfo?.totalScore ?? 0
                }
              }))
            });
          } else {
            await db.patch(data.id, { participants: updatedParticipants });
          }

        // }, 3000);
      }
    } else {
      // If data response is false
      const currentPlayer = participants[currentPlayerIndex];
      if (currentPlayer && currentPlayer.playerInfo) {
        // const currentPlayer = participants[currentPlayerIndex];
        const currentPlayerTurnScore = currentPlayer.playerInfo?.turnScore ?? 0;
        const updatedTotalScore = currentPlayer.playerInfo?.totalScore + currentPlayerTurnScore;

              const updatedParticipants = [...participants];
        updatedParticipants[currentPlayerIndex] = {
          ...currentPlayer,
          playerInfo: {
            ...currentPlayer.playerInfo,
            totalScore: updatedTotalScore,
            turnScore: 0
          },
        };
  
        // Determine the index of the next player
        const nextPlayerIndex = (currentPlayerIndex + 1) % participants.length;
  
        // Update the active player
        const nextPlayerAddress = participants[nextPlayerIndex].address;
        await db.patch(data.id, { participants: updatedParticipants, activePlayer: nextPlayerAddress });
      }
    }
    return diceRollOutcome
  },
})