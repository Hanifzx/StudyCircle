import { prisma } from '../../config/database';
import { logger } from '../../utils/logger';

export class GamificationService {
  /**
   * Award points to a user and handle level ups
   * @param userId User ID
   * @param points Points to add
   */
  async awardPoints(userId: string, points: number) {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) return null;

      const newPoints = user.points + points;
      // Simple formula: Level = floor(points / 50) + 1
      const newLevel = Math.floor(newPoints / 50) + 1;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          points: newPoints,
          level: newLevel > user.level ? newLevel : user.level,
        },
      });

      if (newLevel > user.level) {
        logger.info(`User ${userId} leveled up to ${newLevel}!`);
        // We could emit a socket event here if we pass io, or just return the flag
      }

      return updatedUser;
    } catch (error) {
      logger.error(`Error awarding points to ${userId}: ${error}`);
      return null;
    }
  }
}
