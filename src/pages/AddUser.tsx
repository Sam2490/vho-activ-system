import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AddUser = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'Volunteer',
    committee: 'None'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate user creation
    toast({
      title: "User Created Successfully!",
      description: `${formData.fullName} has been added to the system and will receive login credentials via email.`,
    });

    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      role: 'Volunteer',
      committee: 'None'
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
          Add New User
        </h1>
        <p className="text-white/80 drop-shadow">
          Create a new volunteer, committee header, or administrator account
        </p>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-white/80">
        <Link to="/users" className="hover:text-white transition-colors">
          Admin
        </Link>
        <span>›</span>
        <Link to="/users" className="hover:text-white transition-colors">
          Users
        </Link>
        <span>›</span>
        <span className="text-white">Add New User</span>
      </div>

      {/* Back Button */}
      <Link to="/users">
        <Button variant="hero" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Users
        </Button>
      </Link>

      {/* Form */}
      <Card className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <UserPlus className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold text-gray-900">User Information</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Organization Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="user@vho.org"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+20123456789"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="Volunteer">Volunteer</option>
                <option value="Committee Header">Committee Header</option>
                <option value="HR">HR</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="committee">Committee (if applicable)</Label>
            <select
              id="committee"
              name="committee"
              value={formData.committee}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="None">None</option>
              <option value="01Developers Club">01Developers Club</option>
              <option value="Human Resources Committee">Human Resources Committee</option>
              <option value="Legal Affairs Committee">Legal Affairs Committee</option>
              <option value="Book Caffeine Club">Book Caffeine Club</option>
              <option value="English Club">English Club</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button type="submit" className="flex-1">
              <UserPlus className="w-4 h-4 mr-2" />
              Create User
            </Button>
            <Button type="button" variant="secondary" className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </Card>

      {/* Info Card */}
      <Card className="max-w-2xl mx-auto bg-primary-light">
        <h3 className="font-semibold text-gray-900 mb-2">Important Notes:</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• New users will receive login credentials via email</li>
          <li>• Committee assignment can be changed later by administrators</li>
          <li>• All fields marked with * are required</li>
          <li>• Email addresses must be unique in the system</li>
        </ul>
      </Card>
    </div>
  );
};

export default AddUser;