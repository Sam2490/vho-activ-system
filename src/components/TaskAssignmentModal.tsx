import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { UserPlus, Clock, AlertCircle } from 'lucide-react';

interface TaskAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const TaskAssignmentModal: React.FC<TaskAssignmentModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [taskData, setTaskData] = useState({
    taskName: '',
    assignedTo: [] as string[],
    committee: '',
    description: '',
    requirements: '',
    dueDate: '',
    estimatedHours: '',
    priority: '',
    needsHRApproval: false
  });

  const mockVolunteers = [
    { id: 1, name: 'Ahmed Hassan', committee: '01Developers Club' },
    { id: 2, name: 'Fatima Al-Zahra', committee: 'English Club' },
    { id: 3, name: 'Omar Ibrahim', committee: 'Book Caffeine Club' },
    { id: 4, name: 'Aisha Mohamed', committee: 'Legal Affairs Committee' }
  ];

  const mockCommittees = ['Human Resources Committee', '01Developers Club', 'English Club', 'Book Caffeine Club', 'Legal Affairs Committee'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskData.taskName || taskData.assignedTo.length === 0 || !taskData.committee || !taskData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate API call
    const successMessage = taskData.needsHRApproval 
      ? 'Task assigned successfully! Pending HR approval for hours.'
      : 'Task assigned successfully!';
    
    toast.success(successMessage);
    onSuccess();
    onClose();
    setTaskData({
      taskName: '',
      assignedTo: [],
      committee: '',
      description: '',
      requirements: '',
      dueDate: '',
      estimatedHours: '',
      priority: '',
      needsHRApproval: false
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setTaskData(prev => ({ ...prev, [field]: value }));
  };

  const handleVolunteerToggle = (volunteerName: string) => {
    setTaskData(prev => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(volunteerName)
        ? prev.assignedTo.filter(name => name !== volunteerName)
        : [...prev.assignedTo, volunteerName]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Assign Task to Volunteer
          </DialogTitle>
          <DialogDescription>
            Create and assign a new task to a volunteer member.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Task Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taskName">Task Name *</Label>
              <Input
                id="taskName"
                value={taskData.taskName}
                onChange={(e) => handleInputChange('taskName', e.target.value)}
                placeholder="Enter task name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="committee">Committee *</Label>
              <Select value={taskData.committee} onValueChange={(value) => handleInputChange('committee', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select committee" />
                </SelectTrigger>
                <SelectContent>
                  {mockCommittees.map((committee) => (
                    <SelectItem key={committee} value={committee}>
                      {committee}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Assign To * ({taskData.assignedTo.length} selected)</Label>
              <div className="border rounded-md p-3 max-h-40 overflow-y-auto space-y-2">
                {mockVolunteers.map((volunteer) => (
                  <div key={volunteer.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`volunteer-${volunteer.id}`}
                      checked={taskData.assignedTo.includes(volunteer.name)}
                      onCheckedChange={() => handleVolunteerToggle(volunteer.name)}
                    />
                    <Label htmlFor={`volunteer-${volunteer.id}`} className="text-sm flex-1 cursor-pointer">
                      {volunteer.name} ({volunteer.committee})
                    </Label>
                  </div>
                ))}
              </div>
              {taskData.assignedTo.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Selected: {taskData.assignedTo.join(', ')}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={taskData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Task Details */}
          <div className="space-y-2">
            <Label htmlFor="description">Task Description *</Label>
            <Textarea
              id="description"
              value={taskData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the task in detail"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements & Skills Needed</Label>
            <Textarea
              id="requirements"
              value={taskData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
              placeholder="List any specific requirements or skills needed"
              rows={2}
            />
          </div>

          {/* Time & Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={taskData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedHours" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Estimated Hours
              </Label>
              <Input
                id="estimatedHours"
                type="number"
                value={taskData.estimatedHours}
                onChange={(e) => handleInputChange('estimatedHours', e.target.value)}
                placeholder="Enter estimated hours"
                min="0"
                step="0.5"
              />
            </div>
          </div>

          {/* HR Approval for Hours */}
          <div className="border rounded-lg p-4 bg-muted/20">
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox
                id="needsHRApproval"
                checked={taskData.needsHRApproval}
                onCheckedChange={(checked) => handleInputChange('needsHRApproval', checked as boolean)}
              />
              <Label htmlFor="needsHRApproval" className="text-sm font-medium">
                Hours require HR approval
              </Label>
            </div>
            {taskData.needsHRApproval && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <AlertCircle className="w-4 h-4 mt-0.5 text-warning" />
                <div>
                  <p>This task's hours will be added to the volunteer's total only after HR approval.</p>
                  <p>HR will be notified to review and approve the hours upon task completion.</p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Assign Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskAssignmentModal;