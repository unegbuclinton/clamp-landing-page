import { IDraftGame, IGame } from '@/backend/src/v1/gamificationAPI/interfaces/IGame'
export const initNewGame = async (config: IDraftGame): Promise<IGame> => {
  const res = await fetch('/api/game', {
    method: 'POST',
    body: JSON.stringify(config),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await res.json()
}
