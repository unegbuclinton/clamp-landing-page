import { Request, Response } from 'express';
import { ScoreService } from '../services/score';

const scoreService = new ScoreService();

export const addScore = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, points, roundId } = req.body;
    const score = await scoreService.addScore(userId, points, roundId);
    res.json(score);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export const getUserScores = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const scores = await scoreService.getUserScores(userId);
    res.json(scores);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export const getRoundScores = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roundId } = req.params;
    const scores = await scoreService.getRoundScores(roundId);
    res.json(scores);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
