import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, RotateCcw, UserX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EditUser: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: 'Ahmed Hassan',
    email: 'ahmed@vho.org',
    phone: '+20123456789',
    status: 'active',
    role: 'volunteer',
    committee: 'Human Resources'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    toast({
      title: "Changes Saved",
      description: "User profile has been updated successfully.",
    });
  };

  const handleResetPassword = () => {
    toast({
      title: "Password Reset",
      description: "Password reset email has been sent to the user.",
    });
  };

  const handleDeactivateUser = () => {
    toast({
      title: "User Deactivated",
      description: "User account has been deactivated.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-primary p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/user-management')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <nav className="text-white/70 text-sm mb-1">
              Admin &gt; Users &gt; Edit User
            </nav>
            <h1 className="text-2xl font-bold text-white">Edit User: {formData.fullName}</h1>
          </div>
        </div>

        <Card>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="activity">Activity Log</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-6">
                <Button onClick={handleSaveChanges} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
                <Button variant="secondary" onClick={handleResetPassword} className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Reset Password
                </Button>
                <Button variant="destructive" onClick={handleDeactivateUser} className="flex items-center gap-2">
                  <UserX className="h-4 w-4" />
                  Deactivate User
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="permissions">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="volunteer">Volunteer</SelectItem>
                      <SelectItem value="committee-header">Committee Header</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="committee">Committee</Label>
                  <Select value={formData.committee} onValueChange={(value) => handleInputChange('committee', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="01Developers Club">01Developers Club</SelectItem>
                      <SelectItem value="Human Resources Committee">Human Resources Committee</SelectItem>
                      <SelectItem value="Legal Affairs Committee">Legal Affairs Committee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm font-medium">Login Activity</div>
                    <div className="text-xs text-muted-foreground">Last login: July 23, 2025 at 9:30 AM</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm font-medium">Meeting Attendance</div>
                    <div className="text-xs text-muted-foreground">Last attendance: July 22, 2025 - Strategy Meeting</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default EditUser;