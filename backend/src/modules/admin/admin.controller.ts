import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AdminController {
  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const [userCount, groupCount, sessionCount, materialCount] = await Promise.all([
        prisma.user.count(),
        prisma.studyGroup.count(),
        prisma.session.count(),
        prisma.material.count(),
      ]);
      
      res.status(200).json({
        success: true,
        data: {
          users: userCount,
          groups: groupCount,
          sessions: sessionCount,
          materials: materialCount,
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          fullName: true,
          semester: true,
          role: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' }
      });
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
      }
      
      if (user.role === 'ADMIN') {
        res.status(403).json({ success: false, message: 'Cannot delete an admin user' });
        return;
      }

      await prisma.user.delete({ where: { id } });
      res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  async getGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const groups = await prisma.studyGroup.findMany({
        include: {
          subject: true,
          creator: { select: { username: true, fullName: true } },
          _count: { select: { members: true, sessions: true } }
        },
        orderBy: { createdAt: 'desc' }
      });
      res.status(200).json({ success: true, data: groups });
    } catch (error) {
      next(error);
    }
  }

  async deleteGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      await prisma.studyGroup.delete({ where: { id } });
      res.status(200).json({ success: true, message: 'Group deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
