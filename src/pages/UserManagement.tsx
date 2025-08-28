import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import SuccessModal from '@/components/SuccessModal';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Plus,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const UserManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; user?: any }>({ isOpen: false });
  const [successModal, setSuccessModal] = useState({ isOpen: false });

  const users = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      email: 'ahmed@vho.org',
      role: 'Volunteer',
      committee: 'Human Resources Committee',
      status: 'active',
      joinDate: '2024-01-15',
      lastSeen: '2 hours ago'
    },
    {
      id: 2,
      name: 'Sarah Mohamed',
      email: 'sarah@vho.org',
      role: 'Committee Header',
      committee: 'Legal Affairs Committee',
      status: 'active',
      joinDate: '2023-08-20',
      lastSeen: '1 day ago'
    },
    {
      id: 3,
      name: 'Omar Ali',
      email: 'omar@vho.org',
      role: 'Committee Header',
      committee: 'Events Committee',
      status: 'active',
      joinDate: '2023-06-10',
      lastSeen: '3 hours ago'
    },
    {
      id: 4,
      name: 'Fatima Ahmed',
      email: 'fatima@vho.org',
      role: 'HR',
      committee: 'Finance Committee',
      status: 'inactive',
      joinDate: '2023-12-01',
      lastSeen: '1 week ago'
    },
    {
      id: 5,
      name: 'Mahmoud Khaled',
      email: 'mahmoud@vho.org',
      role: 'Volunteer',
      committee: 'Events Committee',
      status: 'pending',
      joinDate: '2024-02-28',
      lastSeen: 'Never'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'active':
        return `${baseClasses} bg-success-light text-success`;
      case 'inactive':
        return `${baseClasses} bg-destructive-light text-destructive`;
      case 'pending':
        return `${baseClasses} bg-warning-light text-warning`;
      default:
        return baseClasses;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = () => {
    toast({
      title: "User Deleted",
      description: `${deleteModal.user?.name} has been removed from the system.`,
      variant: "destructive"
    });
    setDeleteModal({ isOpen: false });
    setSuccessModal({ isOpen: true });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
          User Management
        </h1>
        <p className="text-white/80 drop-shadow">
          Manage volunteers, committee headers, and administrators
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-1 items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All Roles</option>
              <option>Volunteer</option>
              <option>Committee Header</option>
              <option>HR</option>
              <option>Admin</option>
            </select>
          </div>
          <Button 
            className="flex items-center space-x-2"
            onClick={() => navigate('/add-user')}
          >
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </Button>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">User</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Role & Committee</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Seen</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <h3 className="font-medium text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{user.role}</p>
                      <p className="text-sm text-gray-600">{user.committee}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(user.status)}
                      <span className={getStatusBadge(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">{user.lastSeen}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/edit-user/${user.id}`)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => setDeleteModal({ isOpen: true, user })}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
          <h3 className="text-2xl font-bold text-gray-900">{users.length}</h3>
          <p className="text-gray-600 text-sm">Total Users</p>
        </Card>
        <Card className="text-center">
          <CheckCircle className="w-8 h-8 mx-auto mb-2 text-success" />
          <h3 className="text-2xl font-bold text-gray-900">
            {users.filter(u => u.status === 'active').length}
          </h3>
          <p className="text-gray-600 text-sm">Active Users</p>
        </Card>
        <Card className="text-center">
          <Clock className="w-8 h-8 mx-auto mb-2 text-warning" />
          <h3 className="text-2xl font-bold text-gray-900">
            {users.filter(u => u.status === 'pending').length}
          </h3>
          <p className="text-gray-600 text-sm">Pending</p>
        </Card>
        <Card className="text-center">
          <XCircle className="w-8 h-8 mx-auto mb-2 text-destructive" />
          <h3 className="text-2xl font-bold text-gray-900">
            {users.filter(u => u.status === 'inactive').length}
          </h3>
          <p className="text-gray-600 text-sm">Inactive</p>
        </Card>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false })}
        onConfirm={handleDeleteUser}
        title="Confirm Deletion"
        description={`Are you sure you want to delete user ${deleteModal.user?.name}? This will also delete all attendance records for this user.`}
        itemName={deleteModal.user?.name}
      />

      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal({ isOpen: false })}
        title="User Deleted Successfully"
        description="The user and all associated data have been removed from the system."
        primaryAction={{
          label: "Close",
          onClick: () => setSuccessModal({ isOpen: false })
        }}
      />
    </div>
  );
};

export default UserManagement;