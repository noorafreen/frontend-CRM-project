import { CheckSquare, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockTasks } from '@/data/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { PriorityBadge } from '@/components/PriorityBadge';
import { Link } from 'react-router-dom';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  
  // Filter tasks for current employee
  const myTasks = mockTasks.filter(t => t.assignedTo === user?.id);
  const pendingTasks = myTasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = myTasks.filter(t => t.status === 'in_progress').length;
  const completedTasks = myTasks.filter(t => t.status === 'completed').length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">Here's your task overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <Clock className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-foreground">{pendingTasks}</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
              <CheckSquare className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold text-foreground">{inProgressTasks}</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-foreground">{completedTasks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* My Tasks */}
      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">My Tasks</h2>
        </div>
        {myTasks.length === 0 ? (
          <div className="px-6 py-12 text-center text-muted-foreground">
            No tasks assigned to you yet.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {myTasks.map((task) => (
              <Link
                key={task.id}
                to={`/tasks/${task.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground truncate">{task.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Due {task.dueDate}
                  </p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <PriorityBadge priority={task.priority} />
                  <StatusBadge status={task.status} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
