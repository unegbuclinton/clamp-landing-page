import { v4 as uuidv4 } from 'uuid'
import {
  ILeaderboard,
  ILeaderboardService,
  ILeaderboardEntry,
  LbStatKey,
} from '../interfaces/ILeaderboard'
import { Leaderboard } from '../models/Leaderboard'
import { Round } from '../models/Round'
import { ScoreService } from './score'
import { IGame } from '../interfaces/IGame'

export class LeaderboardService implements ILeaderboardService {
  private scoreService: ScoreService
  constructor() {
    this.scoreService = new ScoreService()
  }

  async getTopParticipants(topN: number, roundId: string): Promise<ILeaderboardEntry[]> {
    const leaderboard = await this.getLeaderboard(roundId)
    if (!leaderboard) return []
    return leaderboard.entries.slice(0, topN)
  }

  async updateRankings(game: IGame, statKey: string): Promise<boolean> {
    const { currentRoundId } = game
    const currentRound = await Round.findOne({ id: currentRoundId }).exec()
    if (!currentRound || !currentRound.index) return false
    const roundScores = await this.scoreService.getRoundScores(currentRoundId)
    const playerScores: Record<string, number> = {}
    for (const score of roundScores) {
      if (!playerScores[score.userId]) {
        playerScores[score.userId] = 0
      }
      playerScores[score.userId] += score.points
    }
    const prevLbByUserId: Record<string, ILeaderboardEntry> = {}
    if (currentRound.index > 0) {
      const prevRound = await Round.findOne({ gameId: game.id, index: currentRound.index - 1 }).exec()
      if (!prevRound) return false
      const prevRoundLeaderboard = await this.getLeaderboard(prevRound.id)
      for (const entry of prevRoundLeaderboard?.entries || []) {
        prevLbByUserId[entry.userId] = entry
      }
    }
    const lbEntries = Object.entries(playerScores).map(([userId, score], index) => {
      const prevRoundEntry = prevLbByUserId[userId]
      const prevRoundScore = prevRoundEntry ? prevRoundEntry.score : 0
      const absoluteChange = score - prevRoundScore
      const percentChange = (absoluteChange / prevRoundScore) * 100

      const entry: ILeaderboardEntry = {
        userId,
        rank: index + 1,
        score,
        prevRoundScore,
        isWinning: index < game.numOfWinners,
        stats: { percentChange, absoluteChange },
      }
      return entry
    })
    const sortedLbEntries = lbEntries
      .sort((a, b) => {
        if (statKey) return b.stats[statKey as LbStatKey] - a.stats[statKey as LbStatKey]
        return b.score - a.score
      })
      .map((entry, index) => {
        entry.rank = index + 1
        entry.isWinning = index < game.numOfWinners
        return entry
      })
    const leaderboardDraft: Partial<ILeaderboard> = {
      roundId: currentRound.id,
      entries: sortedLbEntries,
    }
    const existingLeaderboard = await this.getLeaderboard(currentRound.id)
    if (existingLeaderboard) {
      await Leaderboard.updateOne({ roundId: currentRound.id }, leaderboardDraft)
    } else {
      await Leaderboard.create({ id: uuidv4(), ...leaderboardDraft })
    }
    return true
  }

  async getLeaderboard(roundId: string): Promise<ILeaderboard | null> {
    const leaderboard = await Leaderboard.findOne({ roundId })
    if (!leaderboard) return null
    return leaderboard
  }
}
