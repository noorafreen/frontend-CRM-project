import { TaskStatus } from '@/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: TaskStatus;
}

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'status-badge status-pending' },
  in_progress: { label: 'In Progress', className: 'status-badge status-in-progress' },
  completed: { label: 'Completed', className: 'status-badge status-completed' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={cn(config.className)}>
      {config.label}
    </span>
  );
}
