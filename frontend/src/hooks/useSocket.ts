/**
 * Hook kustom untuk mengatur koneksi WebSocket dengan menggunakan Socket.IO.
 */
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

export const useSocket = (groupId?: string) => {
  const { user } = useAuth();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Only connect if user is authenticated
    if (!user) return;

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
    // Remove /api/v1 for socket.io connection
    const socketUrl = apiUrl.replace('/api/v1', '');

    const socket = io(socketUrl, {
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket connected');
      // Join personal room for personal notifications
      socket.emit('join_user', user.id);
      
      // Join group room if provided
      if (groupId) {
        socket.emit('join_group', groupId);
      }
    });

    return () => {
      if (groupId) {
        socket.emit('leave_group', groupId);
      }
      socket.disconnect();
    };
  }, [groupId, user]);

  return socketRef.current;
};
