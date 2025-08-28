import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LanguageSelection from "./pages/LanguageSelection";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import AddUser from "./pages/AddUser";
import Committees from "./pages/Committees";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import AttendanceMeeting from "./pages/AttendanceMeeting";
import ScheduleMeeting from "./pages/ScheduleMeeting";
import EditUser from "./pages/EditUser";
import MeetingHistory from "./pages/MeetingHistory";
import NotificationSettings from "./pages/NotificationSettings";
import NotFound from "./pages/NotFound";
import RoleSelection from "./pages/RoleSelection";
import TaskManagement from "./pages/TaskManagement";
import AttendanceSummary from "./pages/AttendanceSummary";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('activ-user-authenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/language-selection" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/language-selection" replace />} />
          <Route path="/language-selection" element={<LanguageSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="committees" element={<Committees />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="attendance" element={<AttendanceMeeting />} />
            <Route path="schedule-meeting" element={<ScheduleMeeting />} />
            <Route path="edit-user/:id" element={<EditUser />} />
            <Route path="meeting-history" element={<MeetingHistory />} />
            <Route path="notification-settings" element={<NotificationSettings />} />
            <Route path="task-management" element={<TaskManagement />} />
            <Route path="attendance-summary" element={<AttendanceSummary />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
