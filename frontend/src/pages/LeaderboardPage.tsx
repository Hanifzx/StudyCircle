import { Trophy, Medal, Star } from 'lucide-react';
import { useLeaderboardQuery } from '../hooks/useProfileQuery';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export function LeaderboardPage() {
  const { data: leaderboard, isLoading } = useLeaderboardQuery(20);

  if (isLoading) {
    return <LoadingSpinner size="lg" className="min-h-[60vh]" />;
  }

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (index === 1) return <Medal className="w-6 h-6 text-gray-400" />;
    if (index === 2) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="text-gray-500 dark:text-gray-400 font-bold w-6 text-center">{index + 1}</span>;
  };

  const getBadgeName = (level: number) => {
    if (level < 5) return 'Pemula';
    if (level < 10) return 'Pelajar Aktif';
    if (level < 20) return 'Sarjana';
    return 'Master';
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-500" />
          Papan Peringkat
        </h1>
        <p className="text-gray-400">Peringkat 20 Teratas Anggota StudyCircle</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm max-w-4xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <th className="py-4 px-6 font-semibold text-gray-500 dark:text-gray-400">Peringkat</th>
                <th className="py-4 px-6 font-semibold text-gray-500 dark:text-gray-400">Pengguna</th>
                <th className="py-4 px-6 font-semibold text-gray-500 dark:text-gray-400">Level & Badge</th>
                <th className="py-4 px-6 font-semibold text-gray-500 dark:text-gray-400 text-right">Total Poin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {leaderboard?.map((user: any, index: number) => (
                <tr 
                  key={user.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-4 px-6 flex items-center justify-center w-16">
                    {getRankIcon(index)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 dark:text-white">{user.fullName}</span>
                      <span className="text-xs text-gray-500">@{user.username}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-bold whitespace-nowrap">
                        Lv. {user.level}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {getBadgeName(user.level)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1 font-bold text-gray-900 dark:text-white">
                      {user.points.toLocaleString()}
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    </div>
                  </td>
                </tr>
              ))}
              
              {(!leaderboard || leaderboard.length === 0) && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">
                    Belum ada data peringkat.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
