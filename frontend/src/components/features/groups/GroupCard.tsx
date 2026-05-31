import { Users, BookOpen } from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import type { Group } from '../../../types';

interface GroupCardProps {
  group: Group;
  isMember: boolean;
  onJoin: () => void;
  onClick: () => void;
}

export function GroupCard({ group, isMember, onJoin, onClick }: GroupCardProps) {
  return (
    <Card hoverable onClick={onClick} className="p-5">
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-white truncate">
            {group.name}
          </h3>
          {isMember ? (
            <Badge variant="success">Member</Badge>
          ) : (
            <Button
              size="sm"
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                onJoin();
              }}
            >
              Join
            </Button>
          )}
        </div>

        {/* Description */}
        {group.description && (
          <p className="text-sm text-gray-400 line-clamp-2">
            {group.description}
          </p>
        )}

        {/* Footer info */}
        <div className="flex items-center gap-4 pt-1 text-xs text-gray-500">
          {group.subject && (
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              {group.subject.name}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {group._count?.members ?? 0} / {group.maxMembers}
          </span>
        </div>
      </div>
    </Card>
  );
}
