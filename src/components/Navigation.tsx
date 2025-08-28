import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  UserPlus, 
  BarChart3,
  LogOut,
  CheckCircle,
  Shield,
  ClipboardList
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userRole = localStorage.getItem('activ-selected-role') || 'volunteer';

  // Handle RTL for Arabic
  useEffect(() => {
    const currentLang = localStorage.getItem('activ-language') || 'en';
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, []);

  // Role-based navigation items
  const getNavigationItems = () => {
    const baseItems = [
      { path: '/dashboard', label: t('dashboard'), icon: BarChart3 },
    ];

    if (userRole === 'volunteer') {
      return [
        ...baseItems,
        { path: '/attendance', label: t('attendance'), icon: CheckCircle },
      ];
    }

    if (userRole === 'committee-header') {
      return [
        ...baseItems,
        { path: '/schedule-meeting', label: t('scheduleMeeting'), icon: Calendar },
        { path: '/committees', label: t('committees'), icon: Shield },
        { path: '/task-management', label: t('taskManagement'), icon: ClipboardList },
        { path: '/reports', label: t('reports'), icon: FileText },
      ];
    }

    if (userRole === 'supervisor') {
      return [
        ...baseItems,
        { path: '/attendance-summary', label: t('attendanceSummary'), icon: FileText },
      ];
    }

    if (userRole === 'hr') {
      return [
        ...baseItems,
        { path: '/reports', label: t('reports'), icon: FileText },
        { path: '/users', label: t('users'), icon: Users },
      ];
    }

    if (userRole === 'admin') {
      return [
        ...baseItems,
        { path: '/users', label: t('users'), icon: Users },
        { path: '/add-user', label: t('addUser'), icon: UserPlus },
        { path: '/committees', label: t('committees'), icon: Shield },
        { path: '/task-management', label: t('taskManagement'), icon: ClipboardList },
        { path: '/reports', label: t('reports'), icon: FileText },
        { path: '/settings', label: t('settings'), icon: Settings },
      ];
    }

    return baseItems;
  };

  const navItems = getNavigationItems();

  const handleLogout = () => {
    localStorage.removeItem('activ-user-authenticated');
    localStorage.removeItem('activ-selected-role');
    localStorage.removeItem('activ-language');
    navigate('/language-selection');
  };

  const getRoleTitle = (role: string) => {
    const roleMap: { [key: string]: string } = {
      'admin': t('administrator'),
      'hr': t('hrPersonnel'),
      'committee-header': t('committeeHeader'),
      'volunteer': t('volunteer')
    };
    return roleMap[role] || 'User';
  };

  return (
    <nav className="mb-8">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-large">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white font-semibold">{t('organization')}</h2>
            <p className="text-white/60 text-sm">{getRoleTitle(userRole)}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-white hover:bg-white/20 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {t('logout')}
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={`transition-smooth ${
                    isActive 
                      ? "bg-white text-primary shadow-soft" 
                      : "text-white hover:bg-white/20 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;