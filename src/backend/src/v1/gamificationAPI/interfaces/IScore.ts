export interface IScore {
  id: string
  points: number
  userId: string
  roundId: string
}

export interface IScoreService {
  addScore(userId: string, points: number, roundId: string): Promise<IScore>
  getUserScores(userId: string): Promise<IScore[]>
  getRoundScores(roundId: string): Promise<IScore[]>
}
