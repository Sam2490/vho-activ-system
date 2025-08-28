import React from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface Task {
  id: number;
  name: string;
  description: string;
  requirements: string;
  deadline: string;
  estimatedHours: number;
  approvedHours: number;
  status: 'in-progress' | 'completed' | 'pending-approval' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  committee: string;
  assignedBy: string;
}

interface VolunteerTasksSectionProps {
  volunteerName?: string;
}

const VolunteerTasksSection: React.FC<VolunteerTasksSectionProps> = ({ 
  volunteerName = 'Current User' 
}) => {
  const { t } = useTranslation();

  // Mock tasks assigned to the volunteer
  const assignedTasks: Task[] = [
    {
      id: 1,
      name: 'Social Media Campaign Design',
      description: 'Create engaging social media posts for the upcoming community event',
      requirements: 'Experience with Canva or Adobe Creative Suite, Understanding of social media best practices',
      deadline: '2024-12-30',
      estimatedHours: 8,
      approvedHours: 0,
      status: 'in-progress',
      priority: 'high',
      committee: '01Developers Club',
      assignedBy: 'Omar Ali'
    },
    {
      id: 2,
      name: 'Book Club Session Preparation',
      description: 'Prepare discussion questions and materials for next book club meeting',
      requirements: 'Read assigned book chapters, Prepare 10-15 discussion questions',
      deadline: '2024-12-28',
      estimatedHours: 4,
      approvedHours: 4,
      status: 'completed',
      priority: 'medium',
      committee: 'Book Caffeine Club',
      assignedBy: 'Ahmed Hassan'
    },
    {
      id: 3,
      name: 'Legal Document Review',
      description: 'Review and provide feedback on volunteer agreement updates',
      requirements: 'Legal background or experience, Attention to detail',
      deadline: '2024-12-25',
      estimatedHours: 6,
      approvedHours: 0,
      status: 'pending-approval',
      priority: 'high',
      committee: 'Legal Affairs Committee',
      assignedBy: 'Mahmoud Khaled'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'in-progress': { text: t('inProgress'), className: 'bg-blue-100 text-blue-800' },
      'completed': { text: t('completed'), className: 'bg-green-100 text-green-800' },
      'pending-approval': { text: t('pendingApproval'), className: 'bg-yellow-100 text-yellow-800' },
      'overdue': { text: t('overdue'), className: 'bg-red-100 text-red-800' }
    };
    
    const config = variants[status as keyof typeof variants] || variants['in-progress'];
    return <Badge className={config.className}>{config.text}</Badge>;
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

  return (
    <Card>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('myTasks')}</h2>
      <p className="text-gray-600 text-sm mb-6">{t('assignedTasks')}</p>
      
      <div className="space-y-4">
        {assignedTasks.length > 0 ? (
          assignedTasks.map((task) => (
            <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary/20 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{task.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  {getStatusBadge(task.status)}
                  {getPriorityBadge(task.priority)}
                </div>
              </div>

              <div className="bg-gray-50 rounded-md p-3 mb-3">
                <h4 className="text-sm font-medium text-gray-900 mb-2">{t('taskRequirements')}:</h4>
                <p className="text-sm text-gray-700">{task.requirements}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span><strong>{t('taskDeadline')}:</strong> {new Date(task.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span><strong>{t('taskHours')}:</strong> {task.approvedHours}/{task.estimatedHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span><strong>{t('committee')}:</strong> {task.committee}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span><strong>{t('assignedBy')}:</strong> {task.assignedBy}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  {task.status === 'pending-approval' && task.approvedHours === 0 && (
                    <div className="flex items-center gap-1 text-warning">
                      <AlertCircle className="w-4 h-4" />
                      <span>{t('awaitingHRApproval')}</span>
                    </div>
                  )}
                  
                  {task.status === 'completed' && (
                    <div className="flex items-center gap-1 text-success">
                      <CheckCircle className="w-4 h-4" />
                      <span>{t('taskCompleted')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">{t('loading')}</p>
          </div>
        )}
      </div>

      {/* Task Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">{assignedTasks.length}</div>
            <div className="text-xs text-gray-600">{t('totalTasks')}</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-600">
              {assignedTasks.filter(t => t.status === 'in-progress').length}
            </div>
            <div className="text-xs text-gray-600">{t('inProgress')}</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {assignedTasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-xs text-gray-600">{t('completed')}</div>
          </div>
          <div>
            <div className="text-lg font-bold text-orange-600">
              {assignedTasks.filter(t => t.status === 'pending-approval').length}
            </div>
            <div className="text-xs text-gray-600">{t('pendingHRApproval')}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VolunteerTasksSection;