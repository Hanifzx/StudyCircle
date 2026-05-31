import { useState } from 'react';
import { progressApi } from '../api/progress.api';
import type { Progress, ProgressSummary } from '../types';

export function useProgress() {
  const [progress, setProgress] = useState<Progress[]>([]);
  const [summary, setSummary] = useState<ProgressSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await progressApi.getUserProgress();
      setProgress(res.data || []);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch progress');
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await progressApi.getProgressSummary();
      setSummary(res.data || null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch summary');
    } finally {
      setLoading(false);
    }
  };

  return { progress, summary, loading, error, fetchProgress, fetchSummary };
}
