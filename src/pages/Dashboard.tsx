import React from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { Users, Calendar, FileBarChart, Settings, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/lib/i18n';
import VolunteerTasksSection from '@/components/VolunteerTasksSection';
import HRTaskApproval from '@/components/HRTaskApproval';

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userRole = localStorage.getItem('activ-selected-role') || 'volunteer';
  const stats = [
    { title: t('myTotalHours'), value: '48', icon: Clock, color: 'text-primary' },
    { title: t('meetingsAttended'), value: '12', icon: CheckCircle, color: 'text-success' },
    { title: t('thisMonthHours'), value: '16', icon: Calendar, color: 'text-secondary' },
    { title: t('attendanceRate'), value: '85%', icon: Users, color: 'text-success' },
  ];

  const recentActivities = [
    { action: 'Attended 01Developers Club meeting', time: '2 hours ago', type: 'success' },
    { action: 'Checked in to Training Session', time: '1 day ago', type: 'success' },
    { action: 'Missed Weekly Review meeting', time: '3 days ago', type: 'warning' },
    { action: 'Completed Project Planning session', time: '5 days ago', type: 'info' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
          {t('dashboardOverview')}
        </h1>
        <p className="text-white/80 drop-shadow">
          {t('welcomeMessage')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center hover:scale-105">
              <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('quickActions')}</h2>
          <div className="space-y-3">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/attendance-meeting')}
            >
              <Clock className="w-4 h-4 mr-2" />
              {t('checkMeetingAttendance')}
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/schedule-meeting')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {t('viewMySchedule')}
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/meeting-history')}
            >
              <FileBarChart className="w-4 h-4 mr-2" />
              {t('myAttendanceHistory')}
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/notification-settings')}
            >
              <Settings className="w-4 h-4 mr-2" />
              {t('notificationSettings')}
            </Button>
          </div>
        </Card>

        {/* Recent Activities */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('recentActivities')}</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-success' :
                  activity.type === 'warning' ? 'bg-warning' : 'bg-primary'
                }`} />
                <div className="flex-1">
                  <p className="text-gray-900 text-sm">{activity.action}</p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('todaysSchedule')}</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-medium text-gray-900">01Developers Club Meeting</h3>
                <p className="text-sm text-gray-600">VHO Main Office • 2:00 PM - 4:00 PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">In 2 hours</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-success" />
              <div>
                <h3 className="font-medium text-gray-900">Training Session</h3>
                <p className="text-sm text-gray-600">Online via Google Meet • 6:00 PM - 8:00 PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">In 6 hours</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Role-specific sections */}
      {userRole === 'volunteer' && (
        <VolunteerTasksSection />
      )}

      {userRole === 'hr' && (
        <HRTaskApproval />
      )}
    </div>
  );
};

export default Dashboard;