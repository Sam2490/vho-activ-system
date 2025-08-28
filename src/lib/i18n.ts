// Internationalization system for ACTIV
export interface Translation {
  [key: string]: string | Translation;
}

export const translations = {
  en: {
    // Language Selection
    selectLanguage: 'Please select your preferred language',
    english: 'English',
    arabic: 'العربية',
    
    // App Name and Tagline
    appName: 'ACTIV',
    tagline: 'Attendance & Committee Tracking for Involved Volunteers',
    organization: 'Volunteer Hub Organization (VHO)',
    
    // Navigation
    dashboard: 'Dashboard',
    attendance: 'Attendance',
    scheduleMeeting: 'Schedule Meeting',
    committees: 'Committees',
    reports: 'Reports',
    users: 'Users',
    addUser: 'Add User',
    settings: 'Settings',
    logout: 'Logout',
    
    // Roles
    administrator: 'Administrator',
    hrPersonnel: 'HR Personnel',
    committeeHeader: 'Committee Header',
    volunteer: 'Volunteer',
    supervisor: 'Supervisor',
    
    // Committees
    humanResources: 'Human Resources Committee',
    developersClub: '01Developers Club',
    englishClub: 'English Club',
    bookCaffeineClub: 'Book Caffeine Club',
    legalAffairs: 'Legal Affairs Committee',
    
    // Dashboard
    dashboardOverview: 'Dashboard Overview',
    welcomeMessage: 'Welcome to Volunteer Hub Organization - Your volunteer management hub',
    myTotalHours: 'My Total Hours',
    meetingsAttended: 'Meetings Attended',
    thisMonthHours: 'This Month Hours',
    attendanceRate: 'Attendance Rate',
    quickActions: 'Quick Actions',
    checkMeetingAttendance: 'Check Meeting Attendance',
    viewMySchedule: 'View My Schedule',
    myAttendanceHistory: 'My Attendance History',
    notificationSettings: 'Notification Settings',
    recentActivities: 'Recent Activities',
    todaysSchedule: "Today's Schedule",
    
    // Tasks
    taskManagement: 'Task Management',
    assignAndTrackTasks: 'Assign and track volunteer tasks across committees',
    myTasks: 'My Tasks',
    assignedTasks: 'Tasks assigned to me',
    taskName: 'Task Name',
    taskDescription: 'Task Description',
    taskRequirements: 'Task Requirements',
    taskDeadline: 'Task Deadline',
    taskHours: 'Task Hours',
    assignTask: 'Assign Task',
    assignedTo: 'Assigned to',
    dueDate: 'Due Date',
    status: 'Status',
    priority: 'Priority',
    committee: 'Committee',
    assignedBy: 'Assigned by',
    inProgress: 'In Progress',
    completed: 'Completed',
    pendingApproval: 'Pending HR Approval',
    overdue: 'Overdue',
    awaitingHRApproval: 'Awaiting HR approval',
    taskCompleted: 'Task completed',
    totalTasks: 'Total Tasks',
    pendingHRApproval: 'Pending HR Approval',
    
    // HR Task Approval
    hrTaskApproval: 'HR Task Approval',
    approveTaskHours: 'Approve task hours for volunteers',
    estimatedHours: 'Estimated Hours',
    actualHours: 'Actual Hours',
    approve: 'Approve',
    approveHours: 'Approve Hours',
    hoursApproved: 'Hours Approved',
    
    // Supervisor
    attendanceSummary: 'Attendance Summary',
    organizationWideAttendance: 'Organization-wide Attendance Reports',
    downloadReport: 'Download Report',
    totalVolunteers: 'Total Volunteers',
    averageAttendance: 'Average Attendance',
    activeCommittees: 'Active Committees',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    create: 'Create',
    update: 'Update',
    search: 'Search',
    filter: 'Filter',
    all: 'All',
    yes: 'Yes',
    no: 'No',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
  },
  ar: {
    // Language Selection
    selectLanguage: 'يرجى اختيار اللغة المفضلة لديك',
    english: 'English',
    arabic: 'العربية',
    
    // App Name and Tagline
    appName: 'أكتف',
    tagline: 'تتبع الحضور واللجان للمتطوعين المشاركين',
    organization: 'منظمة مركز المتطوعين',
    
    // Navigation
    dashboard: 'لوحة التحكم',
    attendance: 'الحضور',
    scheduleMeeting: 'جدولة اجتماع',
    committees: 'اللجان',
    reports: 'التقارير',
    users: 'المستخدمين',
    addUser: 'إضافة مستخدم',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    
    // Roles
    administrator: 'مدير النظام',
    hrPersonnel: 'موظف الموارد البشرية',
    committeeHeader: 'رئيس اللجنة',
    volunteer: 'متطوع',
    supervisor: 'مشرف',
    
    // Committees
    humanResources: 'لجنة الموارد البشرية',
    developersClub: 'نادي المطورين 01',
    englishClub: 'نادي اللغة الإنجليزية',
    bookCaffeineClub: 'نادي كافيين الكتب',
    legalAffairs: 'لجنة الشؤون القانونية',
    
    // Dashboard
    dashboardOverview: 'نظرة عامة على لوحة التحكم',
    welcomeMessage: 'مرحباً بك في منظمة مركز المتطوعين - مركز إدارة التطوع الخاص بك',
    myTotalHours: 'إجمالي ساعاتي',
    meetingsAttended: 'الاجتماعات المُحضرة',
    thisMonthHours: 'ساعات هذا الشهر',
    attendanceRate: 'معدل الحضور',
    quickActions: 'إجراءات سريعة',
    checkMeetingAttendance: 'فحص حضور الاجتماع',
    viewMySchedule: 'عرض جدولي',
    myAttendanceHistory: 'تاريخ حضوري',
    notificationSettings: 'إعدادات الإشعارات',
    recentActivities: 'الأنشطة الأخيرة',
    todaysSchedule: 'جدول اليوم',
    
    // Tasks
    taskManagement: 'إدارة المهام',
    assignAndTrackTasks: 'تعيين وتتبع مهام المتطوعين عبر اللجان',
    myTasks: 'مهامي',
    assignedTasks: 'المهام المُعينة لي',
    taskName: 'اسم المهمة',
    taskDescription: 'وصف المهمة',
    taskRequirements: 'متطلبات المهمة',
    taskDeadline: 'موعد تسليم المهمة',
    taskHours: 'ساعات المهمة',
    assignTask: 'تعيين مهمة',
    assignedTo: 'مُعين إلى',
    dueDate: 'تاريخ الاستحقاق',
    status: 'الحالة',
    priority: 'الأولوية',
    committee: 'اللجنة',
    assignedBy: 'مُعين بواسطة',
    inProgress: 'قيد التنفيذ',
    completed: 'مكتمل',
    pendingApproval: 'في انتظار موافقة الموارد البشرية',
    overdue: 'متأخر',
    awaitingHRApproval: 'في انتظار موافقة الموارد البشرية',
    taskCompleted: 'تمت المهمة',
    totalTasks: 'إجمالي المهام',
    pendingHRApproval: 'في انتظار موافقة الموارد البشرية',
    
    // HR Task Approval
    hrTaskApproval: 'موافقة الموارد البشرية على المهام',
    approveTaskHours: 'الموافقة على ساعات المهام للمتطوعين',
    estimatedHours: 'الساعات المقدرة',
    actualHours: 'الساعات الفعلية',
    approve: 'موافقة',
    approveHours: 'الموافقة على الساعات',
    hoursApproved: 'تمت الموافقة على الساعات',
    
    // Supervisor
    attendanceSummary: 'ملخص الحضور',
    organizationWideAttendance: 'تقارير الحضور على مستوى المنظمة',
    downloadReport: 'تحميل التقرير',
    totalVolunteers: 'إجمالي المتطوعين',
    averageAttendance: 'متوسط الحضور',
    activeCommittees: 'اللجان النشطة',
    
    // Common
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    view: 'عرض',
    create: 'إنشاء',
    update: 'تحديث',
    search: 'بحث',
    filter: 'تصفية',
    all: 'الكل',
    yes: 'نعم',
    no: 'لا',
    loading: 'جاري التحميل...',
    success: 'نجح',
    error: 'خطأ',
  }
};

export const getTranslation = (key: string, lang: string = 'en'): string => {
  const keys = key.split('.');
  let translation: any = translations[lang as keyof typeof translations] || translations.en;
  
  for (const k of keys) {
    translation = translation[k];
    if (!translation) {
      // Fallback to English if translation not found
      translation = translations.en;
      for (const fallbackKey of keys) {
        translation = translation[fallbackKey];
        if (!translation) return key;
      }
      break;
    }
  }
  
  return typeof translation === 'string' ? translation : key;
};

export const useTranslation = () => {
  const language = localStorage.getItem('activ-language') || 'en';
  
  const t = (key: string) => getTranslation(key, language);
  
  return { t, language };
};

export const committees = {
  en: [
    {
      id: 'hr',
      name: 'Human Resources Committee',
      description: 'Manages volunteer recruitment, development, and HR policies'
    },
    {
      id: 'developers',
      name: '01Developers Club',
      description: 'Focuses on technology development, coding projects, and digital solutions'
    },
    {
      id: 'english',
      name: 'English Club',
      description: 'Organizes English language learning activities and conversation sessions'
    },
    {
      id: 'books',
      name: 'Book Caffeine Club',
      description: 'Hosts book reading sessions, literary discussions, and reading activities'
    },
    {
      id: 'legal',
      name: 'Legal Affairs Committee',
      description: 'Handles legal matters, compliance, and policy development'
    }
  ],
  ar: [
    {
      id: 'hr',
      name: 'لجنة الموارد البشرية',
      description: 'تدير توظيف المتطوعين وتطويرهم وسياسات الموارد البشرية'
    },
    {
      id: 'developers',
      name: 'نادي المطورين 01',
      description: 'يركز على تطوير التكنولوجيا ومشاريع البرمجة والحلول الرقمية'
    },
    {
      id: 'english',
      name: 'نادي اللغة الإنجليزية',
      description: 'ينظم أنشطة تعلم اللغة الإنجليزية وجلسات المحادثة'
    },
    {
      id: 'books',
      name: 'نادي كافيين الكتب',
      description: 'يستضيف جلسات قراءة الكتب والمناقشات الأدبية وأنشطة القراءة'
    },
    {
      id: 'legal',
      name: 'لجنة الشؤون القانونية',
      description: 'تتعامل مع الأمور القانونية والامتثال وتطوير السياسات'
    }
  ]
};