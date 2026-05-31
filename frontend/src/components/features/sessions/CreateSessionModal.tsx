import { useState } from 'react';
import { Modal } from '../../common/Modal';
import { FormInput } from '../../common/FormInput';
import { Button } from '../../common/Button';
import { sessionsApi } from '../../../api/sessions.api';

interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  onCreated: () => void;
}

export function CreateSessionModal({ isOpen, onClose, groupId, onCreated }: CreateSessionModalProps) {
  const [title, setTitle] = useState('');
  const [scheduledStartTime, setScheduledStartTime] = useState('');
  const [scheduledEndTime, setScheduledEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !scheduledStartTime || !scheduledEndTime) return;

    try {
      setLoading(true);
      setError(null);
      await sessionsApi.createSession(groupId, {
        title: title.trim(),
        scheduledStartTime: new Date(scheduledStartTime).toISOString(),
        scheduledEndTime: new Date(scheduledEndTime).toISOString(),
      });
      // Reset form
      setTitle('');
      setScheduledStartTime('');
      setScheduledEndTime('');
      onCreated();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Study Session">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <p className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <FormInput
          label="Session Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter session title"
          required
        />

        <FormInput
          label="Start Time"
          name="scheduledStartTime"
          type="datetime-local"
          value={scheduledStartTime}
          onChange={(e) => setScheduledStartTime(e.target.value)}
          required
        />

        <FormInput
          label="End Time"
          name="scheduledEndTime"
          type="datetime-local"
          value={scheduledEndTime}
          onChange={(e) => setScheduledEndTime(e.target.value)}
          required
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            disabled={!title.trim() || !scheduledStartTime || !scheduledEndTime}
          >
            Create Session
          </Button>
        </div>
      </form>
    </Modal>
  );
}
