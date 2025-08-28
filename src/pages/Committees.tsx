import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import CreateCommitteeModal from '@/components/CreateCommitteeModal';
import EditCommitteeModal from '@/components/EditCommitteeModal';
import ViewMembersModal from '@/components/ViewMembersModal';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import SuccessModal from '@/components/SuccessModal';
import { Shield, Users, Edit, Eye, Trash2, Plus, MapPin, Calendar } from 'lucide-react';
import { useTranslation, committees } from '@/lib/i18n';

const Committees = () => {
  const { t, language } = useTranslation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewMembersModalOpen, setIsViewMembersModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedCommittee, setSelectedCommittee] = useState<any>(null);
  const [selectedCommitteeName, setSelectedCommitteeName] = useState('');

  const handleEditCommittee = (committee: any) => {
    setSelectedCommittee(committee);
    setIsEditModalOpen(true);
  };

  const handleViewMembers = (committee: any) => {
    setSelectedCommittee(committee);
    setSelectedCommitteeName(committee.name);
    setIsViewMembersModalOpen(true);
  };

  const handleDeleteCommittee = (committee: any) => {
    setSelectedCommittee(committee);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleSuccess = () => {
    // Refresh data or perform other success actions
  };
  const committeeData = committees[language as keyof typeof committees] || committees.en;
  
  const committeesWithDetails = [
    {
      id: 1,
      ...committeeData[0],
      leader: 'Sarah Mohamed',
      members: 15,
      activeProjects: 3,
      nextMeeting: 'July 25, 2025 - 2:00 PM',
      location: 'VHO Main Office'
    },
    {
      id: 2,
      ...committeeData[1],
      leader: 'Omar Ali',
      members: 10,
      activeProjects: 5,
      nextMeeting: 'July 28, 2025 - 6:00 PM',
      location: 'Community Center'
    },
    {
      id: 3,
      ...committeeData[2],
      leader: 'Fatima Ahmed',
      members: 8,
      activeProjects: 2,
      nextMeeting: 'August 1, 2025 - 10:00 AM',
      location: 'VHO Main Office'
    },
    {
      id: 4,
      ...committeeData[3],
      leader: 'Ahmed Hassan',
      members: 12,
      activeProjects: 4,
      nextMeeting: 'July 30, 2025 - 4:00 PM',
      location: 'Training Facility'
    },
    {
      id: 5,
      ...committeeData[4],
      leader: 'Mahmoud Khaled',
      members: 18,
      activeProjects: 6,
      nextMeeting: 'July 27, 2025 - 3:00 PM',
      location: 'Community Center'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
          {t('committees')}
        </h1>
        <p className="text-white/80 drop-shadow">
          Organize and manage volunteer committees and their activities
        </p>
      </div>

      {/* Create Committee Button */}
      <div className="flex justify-center">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Committee
        </Button>
      </div>

      {/* Committees Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {committeesWithDetails.map((committee) => (
          <Card key={committee.id} className="hover:scale-105">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{committee.name}</h3>
                  <p className="text-sm text-gray-600">Led by {committee.leader}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditCommittee(committee)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewMembers(committee)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteCommittee(committee)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              {committee.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{committee.members} members</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{committee.activeProjects} active projects</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <h4 className="font-medium text-gray-900 text-sm">Next Meeting</h4>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{committee.nextMeeting}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{committee.location}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleViewMembers(committee)}
              >
                <Users className="w-4 h-4 mr-2" />
                View Members
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
          <h3 className="text-2xl font-bold text-gray-900">{committeesWithDetails.length}</h3>
          <p className="text-gray-600 text-sm">Total Committees</p>
        </Card>
        <Card className="text-center">
          <Users className="w-8 h-8 mx-auto mb-2 text-success" />
          <h3 className="text-2xl font-bold text-gray-900">
            {committeesWithDetails.reduce((total, committee) => total + committee.members, 0)}
          </h3>
          <p className="text-gray-600 text-sm">Total Members</p>
        </Card>
        <Card className="text-center">
          <Calendar className="w-8 h-8 mx-auto mb-2 text-secondary" />
          <h3 className="text-2xl font-bold text-gray-900">
            {committeesWithDetails.length}
          </h3>
          <p className="text-gray-600 text-sm">Meetings This Week</p>
        </Card>
        <Card className="text-center">
          <Shield className="w-8 h-8 mx-auto mb-2 text-warning" />
          <h3 className="text-2xl font-bold text-gray-900">
            {committeesWithDetails.reduce((total, committee) => total + committee.activeProjects, 0)}
          </h3>
          <p className="text-gray-600 text-sm">Active Projects</p>
        </Card>
      </div>

      {/* Modals */}
      <CreateCommitteeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <EditCommitteeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleSuccess}
        committee={selectedCommittee}
      />

      <ViewMembersModal
        isOpen={isViewMembersModalOpen}
        onClose={() => setIsViewMembersModalOpen(false)}
        committeeName={selectedCommitteeName}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Committee"
        description="Are you sure you want to delete this committee? This will remove all associated data including members and meetings."
        itemName={selectedCommittee?.name}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Committee Deleted"
        description="The committee has been successfully deleted from the system."
      />
    </div>
  );
};

export default Committees;