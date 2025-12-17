import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  User, 
  LogOut,
  Building2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const adminLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/employees', icon: Users, label: 'Employees' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/profile', icon: User, label: 'Profile' },
];

const employeeLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/tasks', icon: CheckSquare, label: 'My Tasks' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const links = user?.role === 'admin' ? adminLinks : employeeLinks;

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <Building2 className="h-8 w-8 text-primary" />
          <span className="text-lg font-semibold text-sidebar-foreground">TeamManager</span>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'sidebar-link',
                  isActive && 'sidebar-link-active'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
        
        {/* User section */}
        <div className="border-t border-sidebar-border p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-foreground">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                {user?.name}
              </p>
              <p className="truncate text-xs text-sidebar-foreground/60">
                {user?.role === 'admin' ? 'Administrator' : 'Employee'}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="sidebar-link w-full text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
