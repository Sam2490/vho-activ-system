import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  UserCheck, 
  Shield, 
  Crown,
  ChevronRight
} from 'lucide-react';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const roles = [
    {
      id: 'volunteer',
      title: 'Volunteer',
      description: 'Join activities, participate in meetings, and contribute to the organization',
      icon: Users,
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      iconColor: 'text-blue-600',
      permissions: ['View committees', 'Join meetings', 'Complete tasks', 'View reports']
    },
    {
      id: 'committee-header',
      title: 'Committee Header',
      description: 'Lead committees, schedule meetings, and manage volunteers',
      icon: UserCheck,
      color: 'bg-green-50 hover:bg-green-100 border-green-200',
      iconColor: 'text-green-600',
      permissions: ['Manage committee', 'Schedule meetings', 'Assign tasks', 'Generate reports']
    },
    {
      id: 'hr',
      title: 'HR Personnel',
      description: 'Manage volunteers, approve hours, and handle administrative tasks',
      icon: Shield,
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
      iconColor: 'text-purple-600',
      permissions: ['User management', 'Approve hours', 'Generate reports', 'System settings']
    },
    {
      id: 'supervisor',
      title: 'Supervisor',
      description: 'View organization-wide attendance summaries and reports',
      icon: Shield,
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
      iconColor: 'text-orange-600',
      permissions: ['View attendance summaries', 'Download reports', 'Monitor activities', 'Read-only access']
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Full system access with all management capabilities',
      icon: Crown,
      color: 'bg-amber-50 hover:bg-amber-100 border-amber-200',
      iconColor: 'text-amber-600',
      permissions: ['Full system access', 'All permissions', 'System configuration', 'Analytics']
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (!selectedRole) {
      toast({
        title: "Please select a role",
        description: "You must choose a role to continue.",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('activ-selected-role', selectedRole);
    
    const roleTitle = roles.find(role => role.id === selectedRole)?.title || selectedRole;
    
    toast({
      title: "Role Selected Successfully!",
      description: `Welcome as ${roleTitle} to Volunteer Hub Organization!`,
    });

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Select Your Role
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your role in the Volunteer Hub Organization to get started with the appropriate permissions and features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all duration-200 ${role.color} ${
                  isSelected 
                    ? 'ring-2 ring-primary shadow-lg scale-105' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-white/80 ${role.iconColor}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{role.title}</CardTitle>
                        {isSelected && (
                          <Badge variant="default" className="mt-1">
                            Selected
                          </Badge>
                        )}
                      </div>
                    </div>
                    <ChevronRight className={`h-5 w-5 transition-transform ${
                      isSelected ? 'rotate-90 text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <CardDescription className="text-sm mt-2">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-foreground/80">Key Permissions:</h4>
                    <ul className="space-y-1">
                      {role.permissions.map((permission, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-1.5 h-1.5 bg-current rounded-full mr-2" />
                          {permission}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="min-w-32"
          >
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="min-w-32"
          >
            Continue
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;