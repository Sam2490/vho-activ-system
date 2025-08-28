import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  Calendar, 
  Users, 
  BarChart3, 
  TrendingUp,
  Clock,
  MapPin,
  Mail
} from 'lucide-react';

const Reports = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [committeeFilter, setCommitteeFilter] = useState('All Committees');

  const attendanceData = [
    {
      date: 'July 20, 2025',
      meeting: 'Strategy Meeting',
      committee: '01Developers Club',
      attended: 12,
      total: 15,
      hours: 24,
      location: 'VHO Main Office'
    },
    {
      date: 'July 19, 2025',
      meeting: 'Training Session',
      committee: 'Human Resources Committee',
      attended: 8,
      total: 10,
      hours: 16,
      location: 'Online'
    },
    {
      date: 'July 18, 2025',
      meeting: 'Weekly Review',
      committee: '01Developers Club',
      attended: 7,
      total: 8,
      hours: 14,
      location: 'Community Center'
    },
    {
      date: 'July 17, 2025',
      meeting: 'Planning Session',
      committee: 'Human Resources Committee',
      attended: 10,
      total: 12,
      hours: 20,
      location: 'Training Facility'
    }
  ];

  const individualReports = [
    {
      name: 'Ahmed Hassan',
      committee: 'Book Caffeine Club',
      totalHours: 48,
      meetingsAttended: 12,
      totalMeetings: 14,
      attendanceRate: 85.7,
      avgLateTime: 3,
      status: 'Excellent'
    },
    {
      name: 'Sarah Mohamed',
      committee: 'English Club',
      totalHours: 52,
      meetingsAttended: 14,
      totalMeetings: 14,
      attendanceRate: 100,
      avgLateTime: 0,
      status: 'Outstanding'
    },
    {
      name: 'Omar Ali',
      committee: 'Legal Affairs Committee',
      totalHours: 45,
      meetingsAttended: 9,
      totalMeetings: 12,
      attendanceRate: 75,
      avgLateTime: 5,
      status: 'Good'
    }
  ];

  const getAttendanceRate = (attended: number, total: number) => {
    return Math.round((attended / total) * 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Outstanding':
        return 'text-success bg-success-light';
      case 'Excellent':
        return 'text-primary bg-primary-light';
      case 'Good':
        return 'text-warning bg-warning-light';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
          Detailed Reports
        </h1>
        <p className="text-white/80 drop-shadow">
          Comprehensive attendance and performance analytics
        </p>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Month</option>
              <option>Custom Range</option>
            </select>
            <select
              value={committeeFilter}
              onChange={(e) => setCommitteeFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All Committees</option>
              <option>01Developers Club</option>
              <option>Human Resources Committee</option>
              <option>Book Caffeine Club</option>
              <option>Legal Affairs Committee</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Button>
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="secondary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Chart Placeholder */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Attendance Trends</h2>
        <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-2" />
            <p className="text-blue-600 font-medium">📊 Attendance Trends Chart</p>
            <p className="text-blue-500 text-sm">Interactive chart showing attendance patterns over time</p>
          </div>
        </div>
      </Card>

      {/* Attendance Table */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Meeting Attendance Report</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Meeting</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Committee</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Attendance</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Hours</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Location</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((row, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{row.date}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{row.meeting}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{row.committee}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {row.attended}/{row.total}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        getAttendanceRate(row.attended, row.total) >= 80
                          ? 'bg-success-light text-success'
                          : getAttendanceRate(row.attended, row.total) >= 60
                          ? 'bg-warning-light text-warning'
                          : 'bg-destructive-light text-destructive'
                      }`}>
                        {getAttendanceRate(row.attended, row.total)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{row.hours} hrs</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{row.location}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Individual Reports */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Individual Volunteer Reports</h2>
        <div className="space-y-4">
          {individualReports.map((volunteer, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{volunteer.name}</h3>
                  <p className="text-sm text-gray-600">{volunteer.committee}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(volunteer.status)}`}>
                    {volunteer.status}
                  </span>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-1" />
                    Email Report
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Total Hours</p>
                  <p className="font-semibold text-gray-900">{volunteer.totalHours} hours</p>
                </div>
                <div>
                  <p className="text-gray-600">Meetings</p>
                  <p className="font-semibold text-gray-900">
                    {volunteer.meetingsAttended}/{volunteer.totalMeetings}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Attendance Rate</p>
                  <p className="font-semibold text-gray-900">{volunteer.attendanceRate}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Avg Late Time</p>
                  <p className="font-semibold text-gray-900">{volunteer.avgLateTime} min</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Reports;