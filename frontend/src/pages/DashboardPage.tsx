import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, TrendingUp } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useGroups } from '../hooks/useGroups';
import { useProgress } from '../hooks/useProgress';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { GroupCard } from '../components/features/groups/GroupCard';
import { SummaryStats } from '../components/features/progress/SummaryStats';

export function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { groups, loading: groupsLoading } = useGroups();
  const { summary, loading: progressLoading, fetchSummary } = useProgress();

  useEffect(() => {
    fetchSummary();
  }, []);

  const isLoading = groupsLoading || progressLoading;

  if (isLoading) {
    return <LoadingSpinner size="lg" className="min-h-[60vh]" />;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl border border-indigo-500/20 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Welcome back, {user?.fullName ?? 'Student'}! 👋
        </h1>
        <p className="text-gray-300 mt-2 text-sm md:text-base">
          Here's an overview of your study activity.
        </p>
      </div>

      {/* Summary Stats */}
      {summary && (
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">Your Progress</h2>
          <SummaryStats summary={summary} />
        </section>
      )}

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => navigate('/groups')}>
          <BookOpen className="w-4 h-4" />
          Browse Groups
        </Button>
        <Button variant="secondary" onClick={() => navigate('/progress')}>
          <TrendingUp className="w-4 h-4" />
          View Progress
        </Button>
      </div>

      {/* My Groups */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4">My Groups</h2>
        {groups.length === 0 ? (
          <EmptyState
            title="No groups yet"
            description="Join a study group to start collaborating with your peers."
            action={
              <Button onClick={() => navigate('/groups')}>
                Browse Groups
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                isMember
                onJoin={() => {}}
                onClick={() => navigate(`/groups/${group.id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
