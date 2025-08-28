import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/Card';
import { useToast } from '@/hooks/use-toast';
import { LogIn, ArrowLeft, Mail, Lock, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegistering) {
      // Registration logic
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "Passwords do not match. Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Simulate email verification
      if (!formData.email.includes('@vho.org')) {
        toast({
          title: "Invalid Email",
          description: "Registration requires a valid VHO organization email address.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Registration Successful!",
        description: "Your account has been created. Please log in with your credentials.",
      });
      setIsRegistering(false);
    } else {
      // Login logic
      if (formData.email && formData.password) {
        localStorage.setItem('activ-user-authenticated', 'true');
        localStorage.setItem('activ-user-email', formData.email);
        
        toast({
          title: "Login Successful!",
          description: "Please select your role to continue.",
        });
        
        navigate('/role-selection');
      } else {
        toast({
          title: "Error",
          description: "Please enter valid credentials",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary via-primary-light to-secondary">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Button 
            variant="hero" 
            className="mb-6"
            onClick={() => navigate('/language-selection')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Language Selection
          </Button>
          
          <div className="text-white mb-4">
            <h1 className="text-3xl font-bold mb-2 drop-shadow-lg">
              {isRegistering ? 'Create Account' : 'Sign In'}
            </h1>
            <p className="text-white/80 drop-shadow">
              ACTIV System Access
            </p>
          </div>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegistering && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Organization Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@vho.org"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {isRegistering && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full">
              {isRegistering ? (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Account
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-sm"
              >
                {isRegistering 
                  ? 'Already have an account? Sign in' 
                  : 'Need an account? Register here'
                }
              </Button>
            </div>
          </form>
        </Card>

        <div className="mt-6 text-center text-white/70 text-sm">
          {isRegistering && (
            <p>
              Registration requires a valid VHO organization email address (@vho.org)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;