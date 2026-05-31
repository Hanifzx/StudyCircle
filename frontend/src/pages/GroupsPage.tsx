import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Users } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useGroups } from '../hooks/useGroups';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { GroupCard } from '../components/features/groups/GroupCard';
import { CreateGroupModal } from '../components/features/groups/CreateGroupModal';

export function GroupsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { groups, loading, joinGroup, refetch } = useGroups();

  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [_joiningId, setJoiningId] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);

  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleJoin = async (groupId: string) => {
    try {
      setJoiningId(groupId);
      setJoinError(null);
      await joinGroup(groupId);
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 409) {
        setJoinError('You are already a member of this group.');
      } else {
        setJoinError(err.response?.data?.error || 'Failed to join group');
      }
    } finally {
      setJoiningId(null);
    }
  };

  const isMember = (group: typeof groups[0]) => {
    if (!user) return false;
    return (
      group.members?.some((m) => m.userId === user.id) ||
      group.createdBy === user.id
    );
  };

  if (loading) {
    return <LoadingSpinner size="lg" className="min-h-[60vh]" />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Study Groups</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4" />
          Create Group
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search groups..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#1a2035] text-white placeholder-gray-500 border border-gray-700/50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-200 text-sm"
        />
      </div>

      {/* Join Error Toast */}
      {joinError && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg flex items-center justify-between">
          <span>{joinError}</span>
          <button
            onClick={() => setJoinError(null)}
            className="text-red-400 hover:text-red-300 ml-3"
          >
            ✕
          </button>
        </div>
      )}

      {/* Groups Grid */}
      {filteredGroups.length === 0 ? (
        <EmptyState
          icon={<Users className="w-12 h-12" />}
          title={search ? 'No groups found' : 'No study groups yet'}
          description={
            search
              ? 'Try adjusting your search terms.'
              : 'Create the first study group to get started!'
          }
          action={
            !search ? (
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus className="w-4 h-4" />
                Create Group
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              isMember={isMember(group)}
              onJoin={() => handleJoin(group.id)}
              onClick={() => navigate(`/groups/${group.id}`)}
            />
          ))}
        </div>
      )}

      {/* Create Group Modal */}
      <CreateGroupModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={refetch}
      />
    </div>
  );
}
