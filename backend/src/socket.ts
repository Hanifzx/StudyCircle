import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import { logger } from './utils/logger';
import { prisma } from './config/database';

class SocketService {
  private io: SocketIOServer | null = null;

  initialize(httpServer: HttpServer) {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: 'http://localhost:5173',
        credentials: true,
      },
    });

    this.io.on('connection', (socket) => {
      logger.info(`Socket connected: ${socket.id}`);

      socket.on('join_group', (groupId: string) => {
        socket.join(`group_${groupId}`);
        logger.info(`Socket ${socket.id} joined group_${groupId}`);
      });

      socket.on('leave_group', (groupId: string) => {
        socket.leave(`group_${groupId}`);
        logger.info(`Socket ${socket.id} left group_${groupId}`);
      });

      socket.on('send_message', async (data: { studyGroupId: string; userId: string; content: string }) => {
        try {
          const message = await prisma.chatMessage.create({
            data: {
              studyGroupId: data.studyGroupId,
              userId: data.userId,
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

  // Helper for notifications
  notifyGroup(groupId: string, event: string, data: any) {
    if (this.io) {
      this.io.to(`group_${groupId}`).emit(event, data);
    }
  }
}

export const socketService = new SocketService();
