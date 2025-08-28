import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings as SettingsIcon, 
  Bell, 
  MapPin, 
  Database, 
  Globe,
  Clock,
  Shield,
  Save,
  AlertTriangle
} from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  
  const [generalSettings, setGeneralSettings] = useState({
    organizationName: 'Volunteer Hub Organization',
    defaultLanguage: 'English',
    timeZone: 'GMT+2 (Cairo)',
    sessionTimeout: 60
  });

  const [gpsSettings, setGpsSettings] = useState({
    defaultLocation: 'VHO Main Office, Cairo',
    accuracyRadius: 50,
    allowOutsideLocation: 'No - Strict GPS verification'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailReminders: true,
    smsNotifications: true,
    pushNotifications: false,
    reminder24h: true,
    reminder2h: true,
    reminder30min: false
  });

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'gps', label: 'GPS Settings', icon: MapPin },
    { id: 'backup', label: 'Backup', icon: Database }
  ];

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved Successfully!",
      description: "Your system settings have been updated.",
    });
  };

  const handleGeneralChange = (field: string, value: string | number) => {
    setGeneralSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleGpsChange = (field: string, value: string | number) => {
    setGpsSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
  };

  const registeredLocations = [
    { name: 'VHO Main Office', coordinates: '30.0444, 31.2357' },
    { name: 'Community Center', coordinates: '30.0626, 31.2497' },
    { name: 'Training Facility', coordinates: '30.0875, 31.3247' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
          System Settings
        </h1>
        <p className="text-white/80 drop-shadow">
          Configure system preferences and administrative options
        </p>
      </div>

      {/* Tab Navigation */}
      <Card>
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="mt-6 space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <SettingsIcon className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input
                  id="orgName"
                  value={generalSettings.organizationName}
                  onChange={(e) => handleGeneralChange('organizationName', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Default Language</Label>
                <select
                  id="language"
                  value={generalSettings.defaultLanguage}
                  onChange={(e) => handleGeneralChange('defaultLanguage', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>English</option>
                  <option>Arabic</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Time Zone</Label>
                <select
                  id="timezone"
                  value={generalSettings.timeZone}
                  onChange={(e) => handleGeneralChange('timeZone', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>GMT+2 (Cairo)</option>
                  <option>GMT+3 (Riyadh)</option>
                  <option>GMT+0 (London)</option>
                  <option>GMT-5 (New York)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeout">Session Timeout (minutes)</Label>
                <Input
                  id="timeout"
                  type="number"
                  value={generalSettings.sessionTimeout}
                  onChange={(e) => handleGeneralChange('sessionTimeout', parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        )}

        {/* Notifications Settings */}
        {activeTab === 'notifications' && (
          <div className="mt-6 space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
            </div>

            <div className="space-y-6">
              <Card className="bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-4">Meeting Reminders</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailReminders}
                      onChange={(e) => handleNotificationChange('emailReminders', e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-700">Email notifications</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notificationSettings.smsNotifications}
                      onChange={(e) => handleNotificationChange('smsNotifications', e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-700">SMS notifications</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notificationSettings.pushNotifications}
                      onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-700">Push notifications</span>
                  </label>
                </div>
              </Card>

              <Card className="bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-4">Reminder Timing</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notificationSettings.reminder24h}
                      onChange={(e) => handleNotificationChange('reminder24h', e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-700">24 hours before</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notificationSettings.reminder2h}
                      onChange={(e) => handleNotificationChange('reminder2h', e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-700">2 hours before</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notificationSettings.reminder30min}
                      onChange={(e) => handleNotificationChange('reminder30min', e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-700">30 minutes before</span>
                  </label>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* GPS Settings */}
        {activeTab === 'gps' && (
          <div className="mt-6 space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-gray-900">GPS & Location Settings</h2>
            </div>

            <div className="bg-warning-light border border-warning rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <p className="text-warning font-medium">
                  GPS verification is required for physical meeting attendance
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="defaultLocation">Default Office Location</Label>
                <Input
                  id="defaultLocation"
                  value={gpsSettings.defaultLocation}
                  onChange={(e) => handleGpsChange('defaultLocation', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accuracyRadius">GPS Accuracy Radius (meters)</Label>
                <Input
                  id="accuracyRadius"
                  type="number"
                  value={gpsSettings.accuracyRadius}
                  onChange={(e) => handleGpsChange('accuracyRadius', parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="outsideLocation">Allow Check-in Outside Location</Label>
                <select
                  id="outsideLocation"
                  value={gpsSettings.allowOutsideLocation}
                  onChange={(e) => handleGpsChange('allowOutsideLocation', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>No - Strict GPS verification</option>
                  <option>Yes - With admin approval</option>
                  <option>Yes - Manual override allowed</option>
                </select>
              </div>

              <Card className="bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-4">Registered Locations</h3>
                <div className="space-y-3">
                  {registeredLocations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{location.name}</span>
                        <span className="text-gray-500 text-sm">- {location.coordinates}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  Add Location
                </Button>
              </Card>
            </div>
          </div>
        )}

        {/* Backup Settings */}
        {activeTab === 'backup' && (
          <div className="mt-6 space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-gray-900">Backup & Data Management</h2>
            </div>

            <div className="space-y-4">
              <Card className="bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-4">Automatic Backups</h3>
                <p className="text-gray-600 mb-4">
                  System automatically creates backups every 24 hours
                </p>
                <div className="flex items-center space-x-4">
                  <Button variant="outline">
                    <Database className="w-4 h-4 mr-2" />
                    Create Backup Now
                  </Button>
                  <Button variant="outline">
                    <Database className="w-4 h-4 mr-2" />
                    View Backup History
                  </Button>
                </div>
              </Card>

              <Card className="bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-4">Data Export</h3>
                <p className="text-gray-600 mb-4">
                  Export system data for external analysis or backup purposes
                </p>
                <div className="flex items-center space-x-4">
                  <Button variant="outline">Export User Data</Button>
                  <Button variant="outline">Export Attendance Records</Button>
                  <Button variant="outline">Export Committee Data</Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <Button onClick={handleSaveSettings} className="w-full sm:w-auto">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;