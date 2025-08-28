import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Clock, User, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface Task {
  id: number;
  name: string;
  description: string;
  requirements: string;
  assignedTo: string;
  committee: string;
  assignedBy: string;
  estimatedHours: number;
  actualHours: number;
  status: 'pending-approval' | 'approved' | 'rejected';
  deadline: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  submittedDate: string;
}

const HRTaskApproval: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [approvalHours, setApprovalHours] = useState<{[key: number]: number}>({});

  // Mock tasks pending HR approval
  const tasksForApproval: Task[] = [
    {
      id: 1,
      name: 'Social Media Campaign Design',
      description: 'Created engaging social media posts for the upcoming community event',
      requirements: 'Experience with Canva or Adobe Creative Suite, Understanding of social media best practices',
      assignedTo: 'Ahmed Hassan',
      committee: '01Developers Club',
      assignedBy: 'Omar Ali',
      estimatedHours: 8,
      actualHours: 7,
      status: 'pending-approval',
      deadline: '2024-12-30',
      priority: 'high',
      submittedDate: '2024-12-20'
    },
    {
      id: 2,
      name: 'Legal Document Review',
      description: 'Reviewed and provided feedback on volunteer agreement updates',
      requirements: 'Legal background or experience, Attention to detail',
      assignedTo: 'Fatima Al-Zahra',
      committee: 'Legal Affairs Committee',
      assignedBy: 'Mahmoud Khaled',
      estimatedHours: 6,
      actualHours: 8,
      status: 'pending-approval',
      deadline: '2024-12-25',
      priority: 'high',
      submittedDate: '2024-12-22'
    },
    {
      id: 3,
      name: 'English Workshop Preparation',
      description: 'Prepared materials and activities for English conversation workshop',
      requirements: 'Fluent in English, Teaching or facilitation experience',
      assignedTo: 'Aisha Mohamed',
      committee: 'English Club',
      assignedBy: 'Fatima Ahmed',
      estimatedHours: 5,
      actualHours: 5,
      status: 'pending-approval',
      deadline: '2024-12-28',
      priority: 'medium',
      submittedDate: '2024-12-21'
    }
  ];

  const handleApproveHours = (taskId: number, approvedHours: number) => {
    if (approvedHours <= 0) {
      toast({
        title: t('error'),
        description: 'Please enter valid hours to approve',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: t('success'),
      description: `${t('hoursApproved')}: ${approvedHours} hours approved for task`,
    });

    // Reset the input
    setApprovalHours(prev => ({ ...prev, [taskId]: 0 }));
  };

  const handleInputChange = (taskId: number, value: string) => {
    const hours = parseInt(value) || 0;
    setApprovalHours(prev => ({ ...prev, [taskId]: hours }));
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
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('hrTaskApproval')}</h2>
      <p className="text-gray-600 text-sm mb-6">{t('approveTaskHours')}</p>
      
      <div className="space-y-6">
        {tasksForApproval.length > 0 ? (
          tasksForApproval.map((task) => (
            <div key={task.id} className="border border-gray-200 rounded-lg p-6 hover:border-primary/20 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{task.name}</h3>
                    {getPriorityBadge(task.priority)}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                </div>
                <div className="ml-4">
                  <Badge className="bg-yellow-100 text-yellow-800">
                    {t('pendingApproval')}
                  </Badge>
                </div>
              </div>

              <div className="bg-gray-50 rounded-md p-4 mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">{t('taskRequirements')}:</h4>
                <p className="text-sm text-gray-700">{task.requirements}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span><strong>{t('assignedTo')}:</strong> {task.assignedTo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span><strong>{t('committee')}:</strong> {task.committee}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span><strong>{t('assignedBy')}:</strong> {task.assignedBy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span><strong>{t('deadline')}:</strong> {new Date(task.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span><strong>Submitted:</strong> {new Date(task.submittedDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{task.estimatedHours}</div>
                    <div className="text-xs text-gray-600">{t('estimatedHours')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{task.actualHours}</div>
                    <div className="text-xs text-gray-600">{t('actualHours')}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Label htmlFor={`hours-${task.id}`} className="text-xs text-gray-600">
                        Approve Hours:
                      </Label>
                      <Input
                        id={`hours-${task.id}`}
                        type="number"
                        min="0"
                        max={task.actualHours}
                        value={approvalHours[task.id] || ''}
                        onChange={(e) => handleInputChange(task.id, e.target.value)}
                        placeholder={`Max: ${task.actualHours}`}
                        className="mt-1"
                      />
                    </div>
                    <Button
                      onClick={() => handleApproveHours(task.id, approvalHours[task.id] || 0)}
                      className="mt-5"
                      size="sm"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {t('approve')}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-warning">
                  <AlertCircle className="w-4 h-4" />
                  <span>Requires HR approval for volunteer hours credit</span>
                </div>
                {task.actualHours > task.estimatedHours && (
                  <div className="text-xs text-orange-600">
                    ⚠️ Actual hours exceed estimate by {task.actualHours - task.estimatedHours} hours
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No tasks pending approval at this time.</p>
          </div>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-yellow-600">{tasksForApproval.length}</div>
            <div className="text-xs text-gray-600">Tasks Pending Approval</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {tasksForApproval.reduce((sum, task) => sum + task.estimatedHours, 0)}
            </div>
            <div className="text-xs text-gray-600">Total Estimated Hours</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {tasksForApproval.reduce((sum, task) => sum + task.actualHours, 0)}
            </div>
            <div className="text-xs text-gray-600">Total Actual Hours</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HRTaskApproval;