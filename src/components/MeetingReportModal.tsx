import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { FileText, Download, Send } from 'lucide-react';

interface Meeting {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
}

interface MeetingReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  meeting: Meeting | null;
}

const MeetingReportModal: React.FC<MeetingReportModalProps> = ({
  isOpen,
  onClose,
  meeting
}) => {
  const [reportData, setReportData] = useState({
    reportType: '',
    summary: '',
    keyPoints: '',
    actionItems: '',
    followUpDate: '',
    includeAttendance: true,
    includeDecisions: true,
    includeActionItems: true,
    reportFormat: 'pdf'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportData.reportType || !reportData.summary) {
      toast.error('Please fill in the required fields');
      return;
    }

    // Simulate report generation
    toast.success('Meeting report generated successfully!');
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateQuickReport = () => {
    toast.success('Quick report generated and downloaded!');
  };

  if (!meeting) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Generate Meeting Report
          </DialogTitle>
          <DialogDescription>
            Create a comprehensive report for {meeting.title}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Meeting Info Display */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Meeting Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Title:</span>
                <div className="font-medium">{meeting.title}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Date:</span>
                <div className="font-medium">{meeting.date}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Time:</span>
                <div className="font-medium">{meeting.time}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Location:</span>
                <div className="font-medium">{meeting.location}</div>
              </div>
            </div>
          </div>

          {/* Report Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type *</Label>
              <Select value={reportData.reportType} onValueChange={(value) => handleInputChange('reportType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Meeting Summary</SelectItem>
                  <SelectItem value="detailed">Detailed Report</SelectItem>
                  <SelectItem value="action-items">Action Items Only</SelectItem>
                  <SelectItem value="attendance">Attendance Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportFormat">Format</Label>
              <Select value={reportData.reportFormat} onValueChange={(value) => handleInputChange('reportFormat', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="doc">Word Document</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Content Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="summary">Meeting Summary *</Label>
              <Textarea
                id="summary"
                value={reportData.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                placeholder="Provide a brief summary of the meeting"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keyPoints">Key Discussion Points</Label>
              <Textarea
                id="keyPoints"
                value={reportData.keyPoints}
                onChange={(e) => handleInputChange('keyPoints', e.target.value)}
                placeholder="List the main topics discussed"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actionItems">Action Items</Label>
              <Textarea
                id="actionItems"
                value={reportData.actionItems}
                onChange={(e) => handleInputChange('actionItems', e.target.value)}
                placeholder="List action items and responsibilities"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="followUpDate">Follow-up Date</Label>
              <Input
                id="followUpDate"
                type="date"
                value={reportData.followUpDate}
                onChange={(e) => handleInputChange('followUpDate', e.target.value)}
              />
            </div>
          </div>

          {/* Include Options */}
          <div className="space-y-3">
            <Label>Include in Report</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeAttendance"
                  checked={reportData.includeAttendance}
                  onCheckedChange={(checked) => handleInputChange('includeAttendance', checked as boolean)}
                />
                <Label htmlFor="includeAttendance" className="text-sm">Attendance list</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeDecisions"
                  checked={reportData.includeDecisions}
                  onCheckedChange={(checked) => handleInputChange('includeDecisions', checked as boolean)}
                />
                <Label htmlFor="includeDecisions" className="text-sm">Key decisions made</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeActionItems"
                  checked={reportData.includeActionItems}
                  onCheckedChange={(checked) => handleInputChange('includeActionItems', checked as boolean)}
                />
                <Label htmlFor="includeActionItems" className="text-sm">Action items and assignments</Label>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" variant="secondary" onClick={handleGenerateQuickReport}>
              <Download className="w-4 h-4 mr-2" />
              Quick Report
            </Button>
            <Button type="submit">
              <Send className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingReportModal;