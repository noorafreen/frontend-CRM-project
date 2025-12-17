import { TaskPriority } from '@/types';
import { cn } from '@/lib/utils';

interface PriorityBadgeProps {
  priority: TaskPriority;
}

const priorityConfig: Record<TaskPriority, { label: string; className: string }> = {
  low: { label: 'Low', className: 'bg-muted text-muted-foreground' },
  medium: { label: 'Medium', className: 'bg-primary/20 text-primary' },
  high: { label: 'High', className: 'bg-destructive/20 text-destructive' },
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  
  return (
    <span className={cn('status-badge', config.className)}>
      {config.label}
    </span>
  );
}
