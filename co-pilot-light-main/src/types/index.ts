export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo: string;
  assignedToName: string;
  createdAt: string;
  dueDate: string;
  updatedAt: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'active' | 'inactive';
  joinedAt: string;
  tasksCount: number;
}
