import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import { logger } from './utils/logger';
import { prisma } from './config/database';
import { env } from './config/env';

// Kelas utama untuk mengelola komunikasi Socket.io secara terpusat
class SocketService {
  private io: SocketIOServer | null = null;

  initialize(httpServer: HttpServer) {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: env.FRONTEND_URL, // Mengizinkan request dari frontend
        credentials: true, // Mengizinkan pengiriman cookie
      },
    });

    // Middleware Autentikasi Socket
    this.io.use((socket, next) => {
      try {
        const cookieHeader = socket.handshake.headers.cookie;
        let token = cookieHeader?.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        
        // Fallback untuk auth token
        if (!token && socket.handshake.auth?.token) {
          token = socket.handshake.auth.token;
        }

        if (!token) {
          return next(new Error('Authentication error: No token provided'));
        }

        const payload = require('./config/jwt').verifyToken(token);
        socket.data.userId = payload.userId;
        next();
      } catch (err) {
        next(new Error('Authentication error: Invalid token'));
      }
    });

    // Event listener ketika klien (socket) baru terhubung
    this.io.on('connection', (socket) => {
      logger.info(`Socket connected: ${socket.id} for user ${socket.data.userId}`);

      // Mendaftarkan klien ke ruang (room) kelompok spesifik
      socket.on('join_group', (groupId: string) => {
        // Todo: idealnya cek apakah user benar-benar member grup ini
        socket.join(`group_${groupId}`);
        logger.info(`Socket ${socket.id} joined group_${groupId}`);
      });

      // Mengeluarkan klien dari ruang (room) kelompok spesifik
      socket.on('leave_group', (groupId: string) => {
        socket.leave(`group_${groupId}`);
        logger.info(`Socket ${socket.id} left group_${groupId}`);
      });

      // Mendaftarkan klien ke ruang notifikasi khusus untuk satu pengguna
      // Menggunakan socket.data.userId demi keamanan agar user tak bisa mendengarkan notif user lain
      socket.on('join_user', () => {
        const userId = socket.data.userId;
        socket.join(`user_${userId}`);
        logger.info(`Socket ${socket.id} joined user_${userId}`);
      });

      // Mendengarkan pesan masuk baru di dalam grup belajar
      socket.on('send_message', async (data: { studyGroupId: string; content: string }) => {
        try {
          // Menggunakan ID pengguna dari token (mencegah impersonasi)
          const userId = socket.data.userId;

          // Simpan pesan teks secara asinkronus ke database
          const message = await prisma.chatMessage.create({
            data: {
              studyGroupId: data.studyGroupId,
              userId: userId,
              content: data.content,
            },
            include: {
              // Menyertakan data user agar frontend bisa menampilkan pengirim
              user: {
                select: { id: true, fullName: true, role: true, level: true },
              },
            },
          });

          // Memancarkan pesan yang sudah tersimpan kepada semua orang yang berada di grup tersebut
          this.io?.to(`group_${data.studyGroupId}`).emit('new_message', message);
        } catch (error) {
          logger.error(`Socket message error: ${error}`);
        }
      });

      // Event ketika klien memutus koneksi
      socket.on('disconnect', () => {
        logger.info(`Socket disconnected: ${socket.id}`);
      });
    });

    return this.io;
  }

  // Mendapatkan instance object io
  getIO() {
    if (!this.io) {
      throw new Error('Socket.io is not initialized');
    }
    return this.io;
  }

  // Helper function untuk mengirim notifikasi broadcast ke dalam satu grup khusus
  notifyGroup(groupId: string, event: string, data: any) {
    if (this.io) {
      this.io.to(`group_${groupId}`).emit(event, data);
    }
  }

  // Helper function untuk mengirim notifikasi push/realtime ke satu individu pengguna secara spesifik
  sendToUser(userId: string, event: string, data: any) {
    if (this.io) {
      this.io.to(`user_${userId}`).emit(event, data);
    }
  }
}

// Mengekspor sebagai Singleton sehingga instance ini bisa dipakai di banyak file
export const socketService = new SocketService();
