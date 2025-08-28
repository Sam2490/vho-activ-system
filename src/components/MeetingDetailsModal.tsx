import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, FileText, CheckCircle, XCircle } from 'lucide-react';

interface Meeting {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  totalInvited: number;
  status: string;
}

interface MeetingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  meeting: Meeting | null;
}

const MeetingDetailsModal: React.FC<MeetingDetailsModalProps> = ({
  isOpen,
  onClose,
  meeting
}) => {
  if (!meeting) return null;

  const mockAgenda = [
    'Opening and welcome remarks',
    'Review of previous meeting minutes',
    'Project status updates',
    'Budget discussion',
    'New volunteer recruitment',
    'Upcoming events planning',
    'Action items and next steps'
  ];

  const mockAttendees = [
    { name: 'Ahmed Hassan', status: 'present', role: 'Leader' },
    { name: 'Fatima Al-Zahra', status: 'present', role: 'Vice Leader' },
    { name: 'Omar Ibrahim', status: 'present', role: 'Member' },
    { name: 'Aisha Mohamed', status: 'absent', role: 'Member' },
    { name: 'Hassan Ali', status: 'present', role: 'Member' }
  ];

  const mockDecisions = [
    'Approved budget increase for community outreach program',
    'Scheduled next volunteer training for March 15th',
    'Assigned marketing tasks to social media team',
    'Confirmed venue for annual fundraising event'
  ];

  const getStatusIcon = (status: string) => {
    return status === 'present' 
      ? <CheckCircle className="w-4 h-4 text-success" />
      : <XCircle className="w-4 h-4 text-destructive" />;
  };

  const getStatusBadge = (status: string) => {
    return status === 'present'
      ? <Badge variant="default" className="bg-success/10 text-success border-success/20">Present</Badge>
      : <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">Absent</Badge>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Meeting Details
          </DialogTitle>
          <DialogDescription>
            Complete information for {meeting.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Meeting Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">{meeting.title}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{meeting.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{meeting.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{meeting.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{meeting.attendees}/{meeting.totalInvited} attendees</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Badge variant="outline">{meeting.type}</Badge>
              <div className="bg-muted/50 p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Attendance Rate</h4>
                <div className="text-2xl font-bold">
                  {Math.round((meeting.attendees / meeting.totalInvited) * 100)}%
                </div>
              </div>
            </div>
          </div>

          {/* Agenda */}
          <div>
            <h4 className="font-semibold mb-3">Meeting Agenda</h4>
            <div className="bg-muted/50 p-4 rounded-lg">
              <ol className="space-y-2">
                {mockAgenda.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium min-w-[24px] text-center">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Attendees */}
          <div>
            <h4 className="font-semibold mb-3">Attendees ({mockAttendees.length})</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockAttendees.map((attendee, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(attendee.status)}
                    <div>
                      <div className="font-medium text-sm">{attendee.name}</div>
                      <div className="text-xs text-muted-foreground">{attendee.role}</div>
                    </div>
                  </div>
                  {getStatusBadge(attendee.status)}
                </div>
              ))}
            </div>
          </div>

          {/* Key Decisions */}
          <div>
            <h4 className="font-semibold mb-3">Key Decisions & Action Items</h4>
            <div className="bg-muted/50 p-4 rounded-lg">
              <ul className="space-y-2">
                {mockDecisions.map((decision, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>{decision}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => window.print()}>
            Print Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingDetailsModal;