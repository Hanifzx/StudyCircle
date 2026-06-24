/**
 * Konfigurasi dan layanan klien Socket.IO untuk komunikasi real-time.
 */
import { io, Socket } from 'socket.io-client';

// Remove /api/v1 suffix if present for the Socket.IO server URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || API_URL.replace(/\/api\/v1\/?$/, '') || 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        withCredentials: true,
      });

      this.socket.on('connect', () => {
        console.log('Connected to WebSocket server');
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket() {
    return this.socket;
  }

  joinGroup(groupId: string) {
    this.socket?.emit('join_group', groupId);
  }

  leaveGroup(groupId: string) {
    this.socket?.emit('leave_group', groupId);
  }

  joinUser(userId: string) {
    this.socket?.emit('join_user', userId);
  }

  sendMessage(studyGroupId: string, userId: string, content: string) {
    this.socket?.emit('send_message', { studyGroupId, userId, content });
  }

  onNewMessage(callback: (message: any) => void) {
    this.socket?.on('new_message', callback);
  }

  offNewMessage() {
    this.socket?.off('new_message');
  }

  onNotification(callback: (notification: any) => void) {
    this.socket?.on('notification', callback);
  }

  offNotification() {
    this.socket?.off('notification');
  }

  onNewMessageNotification(callback: (data: any) => void) {
    this.socket?.on('new_message_notification', callback);
  }

  offNewMessageNotification() {
    this.socket?.off('new_message_notification');
  }
}

export const socketService = new SocketService();
