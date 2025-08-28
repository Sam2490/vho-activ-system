import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/lib/i18n';
import { Search, Download, Users, Clock, Calendar, BarChart3 } from 'lucide-react';

const AttendanceSummary = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommittee, setSelectedCommittee] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data for attendance summary
  const attendanceData = [
    {
      volunteer: 'Ahmed Mohamed',
      committee: 'Human Resources Committee',
      totalMeetings: 12,
      attendedMeetings: 10,
      attendanceRate: 83.3,
      totalHours: 24.5,
      lastAttended: '2025-08-25',
    },
    {
      volunteer: 'Fatma Ali',
      committee: '01Developers Club',
      totalMeetings: 15,
      attendedMeetings: 14,
      attendanceRate: 93.3,
      totalHours: 35.2,
      lastAttended: '2025-08-24',
    },
    {
      volunteer: 'Omar Hassan',
      committee: 'English Club',
      totalMeetings: 8,
      attendedMeetings: 6,
      attendanceRate: 75.0,
      totalHours: 16.8,
      lastAttended: '2025-08-23',
    },
    {
      volunteer: 'Nour Ahmed',
      committee: 'Book Caffeine Club',
      totalMeetings: 10,
      attendedMeetings: 9,
      attendanceRate: 90.0,
      totalHours: 22.1,
      lastAttended: '2025-08-25',
    },
    {
      volunteer: 'Khaled Said',
      committee: 'Legal Affairs Committee',
      totalMeetings: 7,
      attendedMeetings: 7,
      attendanceRate: 100.0,
      totalHours: 18.7,
      lastAttended: '2025-08-24',
    }
  ];

  const summaryStats = {
    totalVolunteers: 45,
    averageAttendance: 88.3,
    activeCommittees: 5,
    totalMeetingsThisMonth: 23
  };

  const filteredData = attendanceData.filter(item => {
    const matchesSearch = item.volunteer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.committee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCommittee = selectedCommittee === 'all' || 
                            item.committee.toLowerCase().includes(selectedCommittee);
    
    return matchesSearch && matchesCommittee;
  });

  const handleDownloadReport = () => {
    // Create CSV content
    const csvContent = [
      ['Volunteer Name', 'Committee', 'Total Meetings', 'Attended Meetings', 'Attendance Rate (%)', 'Total Hours', 'Last Attended'],
      ...filteredData.map(item => [
        item.volunteer,
        item.committee,
        item.totalMeetings,
        item.attendedMeetings,
        item.attendanceRate,
        item.totalHours,
        item.lastAttended
      ])
    ].map(row => row.join(',')).join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance_summary_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
          {t('attendanceSummary')}
        </h1>
        <p className="text-white/80 drop-shadow">
          {t('organizationWideAttendance')}
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('totalVolunteers')}</p>
              <p className="text-3xl font-bold text-gray-900">{summaryStats.totalVolunteers}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('averageAttendance')}</p>
              <p className="text-3xl font-bold text-gray-900">{summaryStats.averageAttendance}%</p>
            </div>
            <BarChart3 className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('activeCommittees')}</p>
              <p className="text-3xl font-bold text-gray-900">{summaryStats.activeCommittees}</p>
            </div>
            <Clock className="h-8 w-8 text-purple-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Meetings</p>
              <p className="text-3xl font-bold text-gray-900">{summaryStats.totalMeetingsThisMonth}</p>
            </div>
            <Calendar className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search volunteers or committees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCommittee} onValueChange={setSelectedCommittee}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select Committee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Committees</SelectItem>
                <SelectItem value="human resources">Human Resources</SelectItem>
                <SelectItem value="developers">01Developers Club</SelectItem>
                <SelectItem value="english">English Club</SelectItem>
                <SelectItem value="book">Book Caffeine Club</SelectItem>
                <SelectItem value="legal">Legal Affairs</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleDownloadReport} className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            {t('downloadReport')}
          </Button>
        </div>
      </Card>

      {/* Attendance Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium text-gray-900">Volunteer Name</th>
                <th className="text-left p-4 font-medium text-gray-900">Committee</th>
                <th className="text-center p-4 font-medium text-gray-900">Total Meetings</th>
                <th className="text-center p-4 font-medium text-gray-900">Attended</th>
                <th className="text-center p-4 font-medium text-gray-900">Attendance Rate</th>
                <th className="text-center p-4 font-medium text-gray-900">Total Hours</th>
                <th className="text-center p-4 font-medium text-gray-900">Last Attended</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{item.volunteer}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-600">{item.committee}</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-gray-900">{item.totalMeetings}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-gray-900">{item.attendedMeetings}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.attendanceRate >= 90 
                        ? 'bg-green-100 text-green-800' 
                        : item.attendanceRate >= 70 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.attendanceRate}%
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-gray-900">{item.totalHours}h</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-sm text-gray-600">{item.lastAttended}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No attendance records found matching your criteria.
          </div>
        )}
      </Card>
    </div>
  );
};

export default AttendanceSummary;