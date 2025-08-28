import React, { useState, useEffect } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Clock, Users, CheckCircle, ExternalLink, Wifi, WifiOff } from 'lucide-react';

const AttendanceMeeting = () => {
  const { toast } = useToast();
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [attendanceTime, setAttendanceTime] = useState<Date | null>(null);
  const [checkoutTime, setCheckoutTime] = useState<Date | null>(null);
  const [isWithinRadius, setIsWithinRadius] = useState(false);
  const [meetingStatus, setMeetingStatus] = useState<'upcoming' | 'active' | 'ended'>('active');
  const [onlineTimeLog, setOnlineTimeLog] = useState<number>(0);

  // Mock meeting data
  const currentMeeting = {
    id: 1,
    title: 'Human Resources Team Strategy Meeting',
    type: 'physical', // 'physical' or 'online'
    startTime: '2:00 PM',
    endTime: '4:00 PM',
    date: 'July 25, 2025',
    location: {
      name: 'VHO Main Office',
      address: 'Conference Room A, 123 Main St, Cairo',
      coordinates: { lat: 30.0444, lng: 31.2357 }
    },
    onlineLink: 'https://meet.google.com/abc-defg-hij',
    committee: '01Developers',
    attendees: 15
  };

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation && currentMeeting.type === 'physical') {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(userLocation);
          
          // Calculate distance to meeting location
          const distance = calculateDistance(
            userLocation,
            currentMeeting.location.coordinates
          );
          
          // Check if within 50 meters (as per SRS requirements)
          setIsWithinRadius(distance <= 50);
        },
        (error) => {
          toast({
            title: "Location Access Required",
            description: "Please enable location services to check in to physical meetings.",
            variant: "destructive"
          });
        }
      );
    }
  }, []);

  const calculateDistance = (pos1: {lat: number, lng: number}, pos2: {lat: number, lng: number}) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = pos1.lat * Math.PI/180;
    const φ2 = pos2.lat * Math.PI/180;
    const Δφ = (pos2.lat-pos1.lat) * Math.PI/180;
    const Δλ = (pos2.lng-pos1.lng) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  const handleCheckIn = () => {
    if (currentMeeting.type === 'physical' && !isWithinRadius) {
      toast({
        title: "Location Required",
        description: "You must be within 50 meters of the meeting location to check in.",
        variant: "destructive"
      });
      return;
    }

    setCheckedIn(true);
    setAttendanceTime(new Date());
    
    toast({
      title: "Checked In Successfully!",
      description: `You have checked in to ${currentMeeting.title}`,
    });
  };

  const handleCheckOut = () => {
    const checkOutTime = new Date();
    setCheckoutTime(checkOutTime);
    const totalTime = attendanceTime 
      ? Math.round((checkOutTime.getTime() - attendanceTime.getTime()) / 60000) 
      : 0;

    setCheckedIn(false);
    
    // Clear online time logging interval
    if ((window as any).onlineTimeInterval) {
      clearInterval((window as any).onlineTimeInterval);
    }
    
    toast({
      title: "Checked Out Successfully!",
      description: `Total attendance time: ${totalTime} minutes${currentMeeting.type === 'online' ? ` (Online logged: ${onlineTimeLog} min)` : ''}`,
    });
  };

  const handleJoinOnlineMeeting = () => {
    window.open(currentMeeting.onlineLink, '_blank');
    handleCheckIn();
    
    // Start time logging for online meetings
    const interval = setInterval(() => {
      setOnlineTimeLog(prev => prev + 1);
    }, 60000); // Log every minute
    
    // Store interval ID to clear later
    (window as any).onlineTimeInterval = interval;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
          Meeting Attendance
        </h1>
        <p className="text-white/80 drop-shadow">
          Track your attendance for scheduled meetings
        </p>
      </div>

      {/* Meeting Information */}
      <Card>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentMeeting.title}
            </h2>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{currentMeeting.startTime} - {currentMeeting.endTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{currentMeeting.attendees} expected attendees</span>
              </div>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            meetingStatus === 'active' ? 'bg-green-100 text-green-800' :
            meetingStatus === 'upcoming' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {meetingStatus === 'active' ? 'Active' : 
             meetingStatus === 'upcoming' ? 'Upcoming' : 'Ended'}
          </div>
        </div>

        {/* Meeting Type Specific Information */}
        {currentMeeting.type === 'physical' ? (
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium text-blue-900 mb-1">Physical Meeting Location</h3>
                <p className="text-blue-700 text-sm">{currentMeeting.location.name}</p>
                <p className="text-blue-600 text-xs">{currentMeeting.location.address}</p>
                
                {location && (
                  <div className="mt-3 flex items-center space-x-2">
                    {isWithinRadius ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-green-700 text-sm font-medium">
                          You are within the check-in area
                        </span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span className="text-red-700 text-sm font-medium">
                          Move closer to the meeting location to check in
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Wifi className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <h3 className="font-medium text-purple-900 mb-1">Online Meeting</h3>
                <p className="text-purple-700 text-sm mb-2">Join the meeting using the link below</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleJoinOnlineMeeting}
                  disabled={checkedIn}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Join Meeting & Check In
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Attendance Controls */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Attendance Tracking</h3>
          
          {!checkedIn ? (
            <div className="space-y-4">
              <Button 
                onClick={handleCheckIn}
                disabled={
                  currentMeeting.type === 'physical' && !isWithinRadius ||
                  meetingStatus !== 'active'
                }
                className="w-full"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Check In to Meeting
              </Button>
              
              {currentMeeting.type === 'physical' && !isWithinRadius && (
                <p className="text-red-600 text-sm text-center">
                  GPS location verification required for physical meetings
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-900">Checked In</span>
                </div>
                <p className="text-green-700 text-sm">
                  Check-in time: {attendanceTime?.toLocaleTimeString()}
                </p>
              </div>
              
              <Button 
                onClick={handleCheckOut}
                variant="destructive"
                className="w-full"
              >
                <Clock className="w-4 h-4 mr-2" />
                Check Out
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Meeting Reminders */}
      <Card>
        <h3 className="font-semibold text-gray-900 mb-3">Upcoming Meetings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Training Session</p>
              <p className="text-sm text-gray-600">Tomorrow, 6:00 PM - Online</p>
            </div>
            <div className="text-xs text-gray-500">
              Reminder sent
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Weekly Review</p>
              <p className="text-sm text-gray-600">July 28, 10:00 AM - VHO Office</p>
            </div>
            <div className="text-xs text-gray-500">
              12h reminder pending
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AttendanceMeeting;