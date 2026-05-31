import { useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { EmptyState } from '../components/common/EmptyState';
import { SummaryStats } from '../components/features/progress/SummaryStats';
import { ProgressCard } from '../components/features/progress/ProgressCard';

export function ProgressPage() {
  const { progress, summary, loading, error, fetchProgress, fetchSummary } = useProgress();

  useEffect(() => {
    fetchProgress();
    fetchSummary();
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" className="min-h-[60vh]" />;
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">Learning Progress</h1>

      {/* Summary */}
      {summary && <SummaryStats summary={summary} />}

      {/* Progress Cards */}
      {progress.length === 0 ? (
        <EmptyState
          icon={<TrendingUp className="w-12 h-12" />}
          title="No progress yet"
          description="Join a group and attend sessions to start tracking your learning progress."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {progress.map((p) => (
            <ProgressCard key={p.id} progress={p} />
          ))}
        </div>
      )}
    </div>
  );
}
