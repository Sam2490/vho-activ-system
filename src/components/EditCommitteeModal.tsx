import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Committee {
  id: number;
  name: string;
  description: string;
  leader: string;
  location: string;
  nextMeeting?: string;
}

interface EditCommitteeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  committee: Committee | null;
}

const EditCommitteeModal: React.FC<EditCommitteeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  committee
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    leader: '',
    location: '',
    meetingDay: '',
    meetingTime: ''
  });

  useEffect(() => {
    if (committee) {
      setFormData({
        name: committee.name,
        description: committee.description,
        leader: committee.leader,
        location: committee.location,
        meetingDay: '',
        meetingTime: ''
      });
    }
  }, [committee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.leader) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate API call
    toast.success('Committee updated successfully!');
    onSuccess();
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!committee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Committee</DialogTitle>
          <DialogDescription>
            Update the committee information.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Committee Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter committee name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter committee description"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="leader">Committee Leader *</Label>
            <Input
              id="leader"
              value={formData.leader}
              onChange={(e) => handleInputChange('leader', e.target.value)}
              placeholder="Enter leader name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Meeting Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter meeting location"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="meetingDay">Meeting Day</Label>
              <Select value={formData.meetingDay} onValueChange={(value) => handleInputChange('meetingDay', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="tuesday">Tuesday</SelectItem>
                  <SelectItem value="wednesday">Wednesday</SelectItem>
                  <SelectItem value="thursday">Thursday</SelectItem>
                  <SelectItem value="friday">Friday</SelectItem>
                  <SelectItem value="saturday">Saturday</SelectItem>
                  <SelectItem value="sunday">Sunday</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meetingTime">Meeting Time</Label>
              <Input
                id="meetingTime"
                type="time"
                value={formData.meetingTime}
                onChange={(e) => handleInputChange('meetingTime', e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Update Committee
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCommitteeModal;