import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Building2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = await login(email, password);
    
    if (success) {
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password. Try the demo credentials below.',
        variant: 'destructive',
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Login form */}
      <div className="flex flex-1 flex-col justify-center px-8 py-12 lg:px-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="h-10 w-10 text-primary" />
              <span className="text-2xl font-bold text-foreground">TeamManager</span>
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Welcome back</h1>
            <p className="mt-2 text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-8 rounded-lg border border-border bg-muted/50 p-4">
            <p className="mb-3 text-sm font-medium text-foreground">Demo Credentials</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Admin:</p>
                <p>admin@company.com / admin123</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Employee:</p>
                <p>employee@company.com / employee123</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:flex lg:flex-1 bg-sidebar items-center justify-center p-12">
        <div className="text-center">
          <Building2 className="mx-auto h-24 w-24 text-primary mb-6" />
          <h2 className="text-3xl font-bold text-sidebar-foreground mb-4">
            Team Management System
          </h2>
          <p className="text-sidebar-foreground/70 max-w-md">
            Manage your team efficiently. Track tasks, monitor progress, and keep everyone aligned.
          </p>
        </div>
      </div>
    </div>
  );
}
