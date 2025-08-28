import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import MeetingDetailsModal from '@/components/MeetingDetailsModal';
import MeetingReportModal from '@/components/MeetingReportModal';
import { Search, Calendar, Clock, MapPin, Users, Eye, FileText } from 'lucide-react';

const MeetingHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);

  const handleViewDetails = (meeting: any) => {
    setSelectedMeeting(meeting);
    setIsDetailsModalOpen(true);
  };

  const handleGenerateReport = (meeting: any) => {
    setSelectedMeeting(meeting);
    setIsReportModalOpen(true);
  };

  const meetings = [
    {
      id: 1,
      title: 'Strategy Planning Session',
      date: 'July 20, 2025',
      time: '2:00 PM - 4:00 PM',
      location: 'VHO Main Office',
      type: 'physical',
      attendance: { attended: 12, total: 15 }
    },
    {
      id: 2,
      title: 'Monthly Review',
      date: 'July 15, 2025',
      time: '6:00 PM - 8:00 PM',
      location: 'Online via Google Meet',
      type: 'online',
      attendance: { attended: 14, total: 15 }
    },
    {
      id: 3,
      title: 'Team Building Workshop',
      date: 'July 10, 2025',
      time: '10:00 AM - 12:00 PM',
      location: 'Community Center',
      type: 'physical',
      attendance: { attended: 10, total: 12 }
    }
  ];

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === '' || typeFilter === 'all' || meeting.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-primary p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <nav className="text-white/70 text-sm mb-1">
            Committee Header &gt; Meeting History
          </nav>
          <h1 className="text-3xl font-bold text-white mb-2">Meeting History - 01Developers Club</h1>
          <p className="text-white/80">View and manage your committee's meeting history</p>
        </div>

        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search meetings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="physical">Physical Meetings</SelectItem>
                <SelectItem value="online">Online Meetings</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="secondary" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          {filteredMeetings.map((meeting) => (
            <Card key={meeting.id}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{meeting.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {meeting.date} • {meeting.time}
                    </div>
                    <div className="flex items-center gap-1">
                      {meeting.type === 'physical' ? (
                        <MapPin className="h-4 w-4" />
                      ) : (
                        <div className="h-4 w-4 bg-blue-500 rounded-sm flex items-center justify-center">
                          <span className="text-xs text-white">📹</span>
                        </div>
                      )}
                      {meeting.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Attended: {meeting.attendance.attended}/{meeting.attendance.total} volunteers
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(meeting)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => handleGenerateReport(meeting)}
                  >
                    <FileText className="h-4 w-4" />
                    Report
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredMeetings.length === 0 && (
          <Card>
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No meetings found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          </Card>
        )}
      </div>

      {/* Modals */}
      <MeetingDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        meeting={selectedMeeting}
      />

      <MeetingReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        meeting={selectedMeeting}
      />
    </div>
  );
};

export default MeetingHistory;