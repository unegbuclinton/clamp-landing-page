import { IDraftGame, IGame } from '@/backend/src/v1/gamificationAPI/interfaces/IGame'
import { API_URL } from './config'


export const initNewGame = async (config: IDraftGame): Promise<IGame> => {
  const res = await fetch(`${API_URL}/gamification/games`, {
    method: 'POST',
    body: JSON.stringify(config),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await res.json()
}
