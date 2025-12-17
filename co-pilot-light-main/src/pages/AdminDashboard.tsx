import { Users, CheckSquare, Clock, CheckCircle } from 'lucide-react';
import { mockEmployees, mockTasks } from '@/data/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { PriorityBadge } from '@/components/PriorityBadge';

export default function AdminDashboard() {
  const totalEmployees = mockEmployees.length;
  const activeEmployees = mockEmployees.filter(e => e.status === 'active').length;
  const pendingTasks = mockTasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = mockTasks.filter(t => t.status === 'in_progress').length;
  const completedTasks = mockTasks.filter(t => t.status === 'completed').length;
  
  const recentTasks = mockTasks.slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your team and tasks</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Employees</p>
              <p className="text-2xl font-bold text-foreground">{totalEmployees}</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {activeEmployees} active
          </p>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <Clock className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Tasks</p>
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

      {/* Recent Tasks */}
      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Tasks</h2>
        </div>
        <div className="divide-y divide-border">
          {recentTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between px-6 py-4">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground truncate">{task.title}</p>
                <p className="text-sm text-muted-foreground">
                  Assigned to {task.assignedToName} • Due {task.dueDate}
                </p>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <PriorityBadge priority={task.priority} />
                <StatusBadge status={task.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
