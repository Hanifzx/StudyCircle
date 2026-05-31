import { useState, useEffect } from 'react';
import { groupsApi } from '../api/groups.api';
import type { Group, CreateGroupPayload } from '../types';

export function useGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const res = await groupsApi.getAllGroups();
      setGroups(res.data || []);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch groups');
    } finally {
      setLoading(false);
    }
  };

  const joinGroup = async (groupId: string) => {
    await groupsApi.joinGroup(groupId);
    await fetchGroups();
  };

  const createGroup = async (data: CreateGroupPayload) => {
    await groupsApi.createGroup(data);
    await fetchGroups();
  };

  useEffect(() => { fetchGroups(); }, []);

  return { groups, loading, error, joinGroup, createGroup, refetch: fetchGroups };
}
