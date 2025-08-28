import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import TaskAssignmentModal from '@/components/TaskAssignmentModal';
import { Search, Plus, Clock, User, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const TaskManagement = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAssignTaskModalOpen, setIsAssignTaskModalOpen] = useState(false);

  // Mock tasks data
  const tasks = [
    {
      id: 1,
      name: 'Social Media Campaign',
      assignedTo: 'Ahmed Hassan',
      committee: '01Developers Club',
      description: 'Create and execute social media campaign for upcoming event',
      estimatedHours: 8,
      approvedHours: 0,
      status: 'in-progress',
      priority: 'high',
      dueDate: '2024-12-30',
      needsHRApproval: true,
      assignedBy: 'Fatima Al-Zahra'
    },
    {
      id: 2,
      name: 'Event Planning Meeting',
      assignedTo: 'Omar Ibrahim',
      committee: 'English Club',
      description: 'Organize monthly event planning meeting',
      estimatedHours: 4,
      approvedHours: 4,
      status: 'completed',
      priority: 'medium',
      dueDate: '2024-12-15',
      needsHRApproval: false,
      assignedBy: 'Aisha Mohamed'
    },
    {
      id: 3,
      name: 'Training Material Review',
      assignedTo: 'Fatima Al-Zahra',
      committee: 'Book Caffeine Club',
      description: 'Review and update training materials for new volunteers',
      estimatedHours: 6,
      approvedHours: 0,
      status: 'pending-approval',
      priority: 'medium',
      dueDate: '2024-12-28',
      needsHRApproval: true,
      assignedBy: 'Ahmed Hassan'
    }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      'in-progress': { variant: 'default' as const, text: t('inProgress'), className: 'bg-blue-100 text-blue-800' },
      'completed': { variant: 'default' as const, text: t('completed'), className: 'bg-green-100 text-green-800' },
      'pending-approval': { variant: 'default' as const, text: t('pendingApproval'), className: 'bg-yellow-100 text-yellow-800' },
      'overdue': { variant: 'destructive' as const, text: t('overdue'), className: 'bg-red-100 text-red-800' }
    };
    
    const config = variants[status as keyof typeof variants] || variants['in-progress'];
    return <Badge variant={config.variant} className={config.className}>{config.text}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      'low': { className: 'bg-gray-100 text-gray-800' },
      'medium': { className: 'bg-blue-100 text-blue-800' },
      'high': { className: 'bg-orange-100 text-orange-800' },
      'urgent': { className: 'bg-red-100 text-red-800' }
    };
    
    const config = variants[priority as keyof typeof variants] || variants['medium'];
    return <Badge variant="outline" className={config.className}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</Badge>;
  };

  const handleSuccess = () => {
    // Refresh tasks data
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('taskManagement')}</h1>
        <p className="text-gray-600 mt-2">{t('assignAndTrackTasks')}</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search tasks or volunteers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending-approval">Pending Approval</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setIsAssignTaskModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          {t('assignTask')}
        </Button>
      </div>

      {/* Tasks List */}
      <div className="grid gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Card key={task.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{task.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {getStatusBadge(task.status)}
                      {getPriorityBadge(task.priority)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span><strong>Assigned to:</strong> {task.assignedTo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span><strong>Hours:</strong> {task.approvedHours}/{task.estimatedHours}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-600">
                      <span><strong>Committee:</strong> {task.committee}</span>
                      <span className="ml-4"><strong>Assigned by:</strong> {task.assignedBy}</span>
                    </div>
                    
                    {task.needsHRApproval && task.status === 'pending-approval' && (
                      <div className="flex items-center gap-1 text-sm text-warning">
                        <AlertCircle className="w-4 h-4" />
                        <span>Awaiting HR approval</span>
                      </div>
                    )}
                    
                    {task.status === 'completed' && (
                      <div className="flex items-center gap-1 text-sm text-success">
                        <CheckCircle className="w-4 h-4" />
                        <span>Task completed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center">
            <p className="text-gray-600">No tasks found matching your search criteria.</p>
          </Card>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
            <div className="text-sm text-gray-600">{t('totalTasks')}</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {tasks.filter(t => t.status === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-600">{t('inProgress')}</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {tasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">{t('completed')}</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {tasks.filter(t => t.needsHRApproval && t.status === 'pending-approval').length}
            </div>
            <div className="text-sm text-gray-600">{t('pendingHRApproval')}</div>
          </div>
        </Card>
      </div>

      {/* Task Assignment Modal */}
      <TaskAssignmentModal
        isOpen={isAssignTaskModalOpen}
        onClose={() => setIsAssignTaskModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default TaskManagement;