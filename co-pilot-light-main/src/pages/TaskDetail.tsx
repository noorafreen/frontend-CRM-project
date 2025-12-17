import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Edit, Trash2 } from 'lucide-react';
import { mockTasks, mockEmployees } from '@/data/mockData';
import { Task, TaskStatus, TaskPriority } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { StatusBadge } from '@/components/StatusBadge';
import { PriorityBadge } from '@/components/PriorityBadge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === 'admin';
  
  const [task, setTask] = useState<Task | undefined>(
    mockTasks.find((t) => t.id === id)
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [editForm, setEditForm] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium',
    assignedTo: task?.assignedTo || '',
    dueDate: task?.dueDate || '',
  });

  if (!task) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Task not found</p>
        <Link to="/tasks" className="text-primary hover:underline mt-2 inline-block">
          Back to Tasks
        </Link>
      </div>
    );
  }

  const handleStatusChange = (newStatus: TaskStatus) => {
    setTask({ ...task, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] });
    toast({ title: 'Task status updated' });
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignedEmployee = mockEmployees.find((e) => e.id === editForm.assignedTo);
    setTask({
      ...task,
      title: editForm.title,
      description: editForm.description,
      priority: editForm.priority as TaskPriority,
      assignedTo: editForm.assignedTo,
      assignedToName: assignedEmployee?.name || task.assignedToName,
      dueDate: editForm.dueDate,
      updatedAt: new Date().toISOString().split('T')[0],
    });
    setIsEditDialogOpen(false);
    toast({ title: 'Task updated successfully' });
  };

  const handleDelete = () => {
    toast({ title: 'Task deleted successfully' });
    navigate('/tasks');
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/tasks"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tasks
        </Link>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{task.title}</h1>
            <div className="flex items-center gap-3">
              <PriorityBadge priority={task.priority} />
              <StatusBadge status={task.status} />
            </div>
          </div>
          
          {isAdmin && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Description</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {task.description || 'No description provided.'}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Update Status */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-sm font-medium text-foreground mb-3">Update Status</h3>
            <Select value={task.status} onValueChange={(v: TaskStatus) => handleStatusChange(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Details */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-sm font-medium text-foreground mb-4">Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Assigned to</p>
                  <p className="font-medium text-foreground">{task.assignedToName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Due Date</p>
                  <p className="font-medium text-foreground">{task.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Last Updated</p>
                  <p className="font-medium text-foreground">{task.updatedAt}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Task Title</Label>
              <Input
                id="edit-title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={editForm.priority}
                  onValueChange={(value) => setEditForm({ ...editForm, priority: value as TaskPriority })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-dueDate">Due Date</Label>
                <Input
                  id="edit-dueDate"
                  type="date"
                  value={editForm.dueDate}
                  onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Assign To</Label>
              <Select
                value={editForm.assignedTo}
                onValueChange={(value) => setEditForm({ ...editForm, assignedTo: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockEmployees
                    .filter((e) => e.status === 'active')
                    .map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Are you sure you want to delete this task? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
