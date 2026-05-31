import { useState } from 'react';
import { sessionsApi } from '../api/sessions.api';
import type { Session, CreateSessionPayload } from '../types';

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroupSessions = async (groupId: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await sessionsApi.getGroupSessions(groupId);
      setSessions(res.data || []);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch sessions');
    } finally {
      setLoading(false);
    }
  };

  const getSessionDetails = async (sessionId: string) => {
    const res = await sessionsApi.getSessionDetails(sessionId);
    return res.data;
  };

  const joinSession = async (sessionId: string) => {
    await sessionsApi.joinSession(sessionId);
  };

  const leaveSession = async (sessionId: string) => {
    await sessionsApi.leaveSession(sessionId);
  };

  const createSession = async (groupId: string, data: CreateSessionPayload) => {
    await sessionsApi.createSession(groupId, data);
  };

  return { sessions, loading, error, fetchGroupSessions, getSessionDetails, joinSession, leaveSession, createSession };
}
