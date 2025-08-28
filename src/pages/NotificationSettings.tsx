import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NotificationSettings: React.FC = () => {
  const { toast } = useToast();

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
    timing: {
      twentyFourHours: true,
      twoHours: true,
      thirtyMinutes: false
    }
  });

  const handleNotificationChange = (type: string, checked: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [type]: checked
    }));
  };

  const handleTimingChange = (timing: string, checked: boolean) => {
    setNotifications(prev => ({
      ...prev,
      timing: {
        ...prev.timing,
        [timing]: checked
      }
    }));
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your notification preferences have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-primary p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <nav className="text-white/70 text-sm mb-1">
            Profile &gt; Notification Settings
          </nav>
          <h1 className="text-3xl font-bold text-white mb-2">Notification Preferences</h1>
          <p className="text-white/80">Customize how you receive meeting reminders and updates</p>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Meeting Reminders</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="email"
                  checked={notifications.email}
                  onCheckedChange={(checked) => handleNotificationChange('email', !!checked)}
                />
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="email">Email notifications</Label>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="sms"
                  checked={notifications.sms}
                  onCheckedChange={(checked) => handleNotificationChange('sms', !!checked)}
                />
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="sms">SMS notifications</Label>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="push"
                  checked={notifications.push}
                  onCheckedChange={(checked) => handleNotificationChange('push', !!checked)}
                />
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="push">Push notifications</Label>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-4">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Reminder Timing</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="twentyFourHours"
                  checked={notifications.timing.twentyFourHours}
                  onCheckedChange={(checked) => handleTimingChange('twentyFourHours', !!checked)}
                />
                <Label htmlFor="twentyFourHours">24 hours before</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="twoHours"
                  checked={notifications.timing.twoHours}
                  onCheckedChange={(checked) => handleTimingChange('twoHours', !!checked)}
                />
                <Label htmlFor="twoHours">2 hours before</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="thirtyMinutes"
                  checked={notifications.timing.thirtyMinutes}
                  onCheckedChange={(checked) => handleTimingChange('thirtyMinutes', !!checked)}
                />
                <Label htmlFor="thirtyMinutes">30 minutes before</Label>
              </div>
            </div>
          </Card>

          <Card>
            <Button onClick={handleSavePreferences} className="w-full md:w-auto">
              Save Preferences
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;