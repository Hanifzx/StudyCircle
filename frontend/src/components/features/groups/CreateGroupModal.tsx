import { useState } from 'react';
import { Modal } from '../../common/Modal';
import { FormInput } from '../../common/FormInput';
import { Button } from '../../common/Button';
import { groupsApi } from '../../../api/groups.api';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export function CreateGroupModal({ isOpen, onClose, onCreated }: CreateGroupModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [maxMembers, setMaxMembers] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !subjectId.trim()) return;

    try {
      setLoading(true);
      setError(null);
      await groupsApi.createGroup({
        name: name.trim(),
        description: description.trim() || undefined,
        subjectId: subjectId.trim(),
        maxMembers: maxMembers ? parseInt(maxMembers, 10) : undefined,
      });
      // Reset form
      setName('');
      setDescription('');
      setSubjectId('');
      setMaxMembers('');
      onCreated();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create group');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Study Group">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <p className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <FormInput
          label="Group Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter group name"
          required
        />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className="text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter group description (optional)"
            rows={3}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#1a2035] text-white placeholder-gray-500 border border-gray-700/50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-200 text-sm resize-none"
          />
        </div>

        <FormInput
          label="Subject ID"
          name="subjectId"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          placeholder="Enter subject ID"
          required
        />

        <FormInput
          label="Max Members"
          name="maxMembers"
          type="number"
          value={maxMembers}
          onChange={(e) => setMaxMembers(e.target.value)}
          placeholder="e.g. 10 (optional)"
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" loading={loading} disabled={!name.trim() || !subjectId.trim()}>
            Create Group
          </Button>
        </div>
      </form>
    </Modal>
  );
}
