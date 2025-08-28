import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Calendar, MapPin, Clock, Users, Plus, Play, Square } from 'lucide-react';

const ScheduleMeeting = () => {
  const { toast } = useToast();
  const [activeMeeting, setActiveMeeting] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    type: 'physical',
    location: '',
    onlineLink: '',
    description: ''
  });

  const [scheduledMeetings] = useState([
    {
      id: 1,
      title: 'Marketing Team Strategy',
      date: '2025-07-25',
      startTime: '14:00',
      endTime: '16:00',
      type: 'physical',
      location: 'VHO Main Office',
      attendees: 15,
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Training Session',
      date: '2025-07-26',
      startTime: '18:00',
      endTime: '20:00',
      type: 'online',
      location: 'Google Meet',
      attendees: 12,
      status: 'active'
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Meeting Scheduled!",
      description: `${formData.title} has been scheduled successfully. Attendees will receive notifications.`,
    });

    // Reset form
    setFormData({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      type: 'physical',
      location: '',
      onlineLink: '',
      description: ''
    });
  };

  const handleStartMeeting = (meetingId: number) => {
    setActiveMeeting(meetingId);
    toast({
      title: "Meeting Started!",
      description: "Attendance tracking is now active. Volunteers can check in.",
    });
  };

  const handleEndMeeting = (meetingId: number) => {
    setActiveMeeting(null);
    toast({
      title: "Meeting Ended",
      description: "Attendance tracking has been stopped. Attendance report is available.",
    });
  };

  const handleEndUserAttendance = (userId: number) => {
    toast({
      title: "User Attendance Ended",
      description: "Individual attendance has been marked as completed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
          Meeting Management
        </h1>
        <p className="text-white/80 drop-shadow">
          Schedule meetings and manage attendance tracking
        </p>
      </div>

      {/* Active Meetings */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Meetings</h2>
        <div className="space-y-4">
          {scheduledMeetings.filter(meeting => meeting.status === 'active').map((meeting) => (
            <div key={meeting.id} className="border border-green-200 bg-green-50 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-green-900">{meeting.title}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-green-700 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{meeting.startTime} - {meeting.endTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{meeting.attendees} attendees</span>
                    </div>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleEndMeeting(meeting.id)}
                  >
                    <Square className="w-4 h-4 mr-1" />
                    End Meeting
                  </Button>
                </div>
              </div>
              
              {/* Active Attendees */}
              <div className="mt-4 pt-4 border-t border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Currently Checked In</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {['Ahmed Hassan', 'Sarah Mohamed', 'Omar Ali'].map((name, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                      <span className="text-sm text-gray-900">{name}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEndUserAttendance(index)}
                      >
                        End Attendance
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Scheduled Meetings */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Scheduled Meetings</h2>
        <div className="space-y-4">
          {scheduledMeetings.filter(meeting => meeting.status === 'scheduled').map((meeting) => (
            <div key={meeting.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-gray-600 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{meeting.startTime} - {meeting.endTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{meeting.location}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => handleStartMeeting(meeting.id)}
                  disabled={activeMeeting !== null}
                >
                  <Play className="w-4 h-4 mr-1" />
                  Start Meeting
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Schedule New Meeting */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Schedule New Meeting</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Meeting Title *</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter meeting title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time *</Label>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time *</Label>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Meeting Type *</Label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="physical">Physical Meeting</option>
              <option value="online">Online Meeting</option>
            </select>
          </div>

          {formData.type === 'physical' ? (
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="Meeting location address"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="onlineLink">Online Meeting Link *</Label>
              <Input
                id="onlineLink"
                name="onlineLink"
                type="url"
                placeholder="https://meet.google.com/..."
                value={formData.onlineLink}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              placeholder="Meeting agenda or description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary h-24"
            />
          </div>

          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Meeting
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ScheduleMeeting;