import { useState } from 'react';
import { User, Mail, Building2, Briefcase } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile
    setIsEditing(false);
    toast({ title: 'Profile updated successfully' });
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      <div className="rounded-lg border border-border bg-card">
        {/* Avatar Section */}
        <div className="border-b border-border p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-semibold text-primary-foreground">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{user?.name}</h2>
              <p className="text-muted-foreground">
                {user?.role === 'admin' ? 'Administrator' : 'Employee'}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Full Name
              </Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              ) : (
                <p className="py-2 text-foreground">{user?.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email Address
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              ) : (
                <p className="py-2 text-foreground">{user?.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                Role
              </Label>
              <p className="py-2 text-foreground capitalize">{user?.role}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                Department
              </Label>
              {isEditing ? (
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              ) : (
                <p className="py-2 text-foreground">{user?.department || 'Not specified'}</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            {isEditing ? (
              <>
                <Button type="submit">Save Changes</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user?.name || '',
                      email: user?.email || '',
                      department: user?.department || '',
                    });
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button type="button" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
