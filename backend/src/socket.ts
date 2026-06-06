import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import { logger } from './utils/logger';
import { prisma } from './config/database';
import { verifyToken } from './config/jwt';

class SocketService {
  private io: SocketIOServer | null = null;

  initialize(httpServer: HttpServer) {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: 'http://localhost:5173',
        credentials: true,
      },
    });

    // Authentication Middleware for Socket.IO Handshake
    this.io.use((socket, next) => {
      let token = socket.handshake.auth?.token || socket.handshake.query?.token;
      
      if (!token && socket.handshake.headers.cookie) {
        const cookies = socket.handshake.headers.cookie.split(';').reduce((res: Record<string, string>, c) => {
          const [key, val] = c.split('=').map(val => val.trim());
          if (key && val) res[key] = val;
          return res;
        }, {});
        token = cookies['token'];
      }

      if (!token && socket.handshake.headers.authorization?.startsWith('Bearer ')) {
        token = socket.handshake.headers.authorization.split(' ')[1];
      }

      if (!token) {
        return next(new Error('Authentication error: No token provided'));
      }

      try {
        const payload = verifyToken(token);
        socket.data.user = payload;
        next();
      } catch (err) {
        return next(new Error('Authentication error: Invalid or expired token'));
      }
    });

    this.io.on('connection', (socket) => {
      logger.info(`Socket connected: ${socket.id} (User: ${socket.data.user?.userId})`);

      socket.on('join_group', async (groupId: string) => {
        const userId = socket.data.user?.userId;
        if (!userId) return;

        try {
          const member = await prisma.member.findUnique({
            where: {
              studyGroupId_userId: {
                studyGroupId: groupId,
                userId: userId,
              },
            },
          });

          if (!member) {
            logger.warn(`Unauthorized join_group: User ${userId} tried to join group_${groupId}`);
            return;
          }

          socket.join(`group_${groupId}`);
          logger.info(`Socket ${socket.id} joined group_${groupId}`);
        } catch (error) {
          logger.error(`Error in join_group socket event: ${error}`);
        }
      });

      socket.on('leave_group', (groupId: string) => {
        socket.leave(`group_${groupId}`);
        logger.info(`Socket ${socket.id} left group_${groupId}`);
      });

      socket.on('join_user', (userId: string) => {
        const authenticatedUserId = socket.data.user?.userId;
        if (authenticatedUserId !== userId) {
          logger.warn(`Unauthorized join_user: Socket ${socket.id} (User ${authenticatedUserId}) tried to join user_${userId}`);
          return;
        }

        socket.join(`user_${userId}`);
        logger.info(`Socket ${socket.id} joined user_${userId}`);
      });

      socket.on('send_message', async (data: { studyGroupId: string; content: string }) => {
        try {
          const userId = socket.data.user?.userId;
          if (!userId) {
            socket.emit('error', 'Unauthorized: Please authenticate');
            return;
          }

          const member = await prisma.member.findUnique({
            where: {
              studyGroupId_userId: {
                studyGroupId: data.studyGroupId,
                userId: userId,
              },
            },
          });

          if (!member) {
            socket.emit('error', 'Forbidden: You are not a member of this group');
            return;
          }

          const message = await prisma.chatMessage.create({
            data: {
              studyGroupId: data.studyGroupId,
              userId: userId,
              content: data.content,
            },
            include: {
              user: {
                select: { id: true, fullName: true, role: true, level: true },
              },
            },
          });

          this.io?.to(`group_${data.studyGroupId}`).emit('new_message', message);
        } catch (error) {
          logger.error(`Socket message error: ${error}`);
        }
      });

      socket.on('disconnect', () => {
        logger.info(`Socket disconnected: ${socket.id}`);
      });
    });

    return this.io;
  }

  getIO() {
    if (!this.io) {
      throw new Error('Socket.io is not initialized');
    }
    return this.io;
  }

  notifyGroup(groupId: string, event: string, data: any) {
    if (this.io) {
      this.io.to(`group_${groupId}`).emit(event, data);
    }
  }

  sendToUser(userId: string, event: string, data: any) {
    if (this.io) {
      this.io.to(`user_${userId}`).emit(event, data);
    }
  }
}

export const socketService = new SocketService();
