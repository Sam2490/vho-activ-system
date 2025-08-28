import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Phone, Calendar } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

interface ViewMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  committeeName: string;
}

const ViewMembersModal: React.FC<ViewMembersModalProps> = ({
  isOpen,
  onClose,
  committeeName
}) => {
  // Mock members data
  const members: Member[] = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      phone: '+20 123 456 789',
      role: 'Committee Leader',
      joinDate: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Fatima Al-Zahra',
      email: 'fatima.alzahra@email.com',
      phone: '+20 123 456 788',
      role: 'Vice Leader',
      joinDate: '2024-02-01',
      status: 'active'
    },
    {
      id: 3,
      name: 'Omar Ibrahim',
      email: 'omar.ibrahim@email.com',
      role: 'Member',
      joinDate: '2024-02-15',
      status: 'active'
    },
    {
      id: 4,
      name: 'Aisha Mohamed',
      email: 'aisha.mohamed@email.com',
      phone: '+20 123 456 787',
      role: 'Member',
      joinDate: '2024-03-01',
      status: 'inactive'
    }
  ];

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge variant="default" className="bg-success/10 text-success border-success/20">Active</Badge>
      : <Badge variant="secondary" className="bg-muted text-muted-foreground">Inactive</Badge>;
  };

  const getRoleBadge = (role: string) => {
    const variant = role === 'Committee Leader' ? 'default' : 
                   role === 'Vice Leader' ? 'secondary' : 'outline';
    return <Badge variant={variant}>{role}</Badge>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Committee Members</DialogTitle>
          <DialogDescription>
            Members of {committeeName} ({members.length} total)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{member.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {getRoleBadge(member.role)}
                      {getStatusBadge(member.status)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{member.email}</span>
                </div>
                {member.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{member.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined: {new Date(member.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMembersModal;