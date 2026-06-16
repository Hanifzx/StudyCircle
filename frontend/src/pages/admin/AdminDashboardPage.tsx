import { useEffect, useState } from 'react';
import { adminApi } from '../../api/admin.api';
import { Users, FolderKanban, Calendar, FileText } from 'lucide-react';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminApi.getStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const displayStats = stats || (loading ? {
    users: 120,
    groups: 15,
    sessions: 45,
    materials: 80
  } : null);

  const statCards = [
    { label: 'Total Users', value: displayStats?.users || 0, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Study Groups', value: displayStats?.groups || 0, icon: FolderKanban, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Total Sessions', value: displayStats?.sessions || 0, icon: Calendar, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Materials', value: displayStats?.materials || 0, icon: FileText, color: 'text-orange-400', bg: 'bg-orange-500/10' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400 mt-1">Platform statistics and metrics at a glance.</p>
      </div>

      <phantom-ui fallback-radius="16" loading={loading}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-6" aria-label={stat.label}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium text-gray-400 leading-none">{stat.label}</p>
                <h3 className="text-3xl font-bold text-white leading-none">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg}`} data-shimmer-ignore>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
        </div>
      </phantom-ui>
    </div>
  );
}
