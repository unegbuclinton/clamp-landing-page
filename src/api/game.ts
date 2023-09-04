import { IGame } from '@/backend/src/v1/gamificationAPI/interfaces/IGame'
const createNewGame = async (game: IGame) => {
  const response = await fetch('/api/game', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  })
  return await response.json()
}
