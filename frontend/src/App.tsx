import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/citizen/LandingPage';
import ReportDefectPage from './pages/citizen/ReportDefectPage';
import TrackComplaintPage from './pages/citizen/TrackComplaintPage';
import OfficerLoginPage from './pages/officer/LoginPage';
import OfficerLayout from './components/officer/OfficerLayout';
import OfficerDashboard from './pages/officer/Dashboard';
import OfficerComplaints from './pages/officer/Complaints';
import OfficerComplaintDetails from './pages/officer/ComplaintDetails';
import OfficerAnalytics from './pages/officer/Analytics';
import OfficerReports from './pages/officer/Reports';
import OfficerNotifications from './pages/officer/Notifications';
import OfficerProfile from './pages/officer/Profile';

import AdminLoginPage from './pages/admin/LoginPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import Municipalities from './pages/admin/Municipalities';
import Officers from './pages/admin/Officers';
import Complaints from './pages/admin/Complaints';
import Reassignment from './pages/admin/Reassignment';
import AIMonitoring from './pages/admin/AIMonitoring';
import Reports from './pages/admin/Reports';
import Analytics from './pages/admin/Analytics';
import AuditLogs from './pages/admin/AuditLogs';
import Settings from './pages/admin/Settings';
import Notifications from './pages/admin/Notifications';
import Profile from './pages/admin/Profile';

function App() {
  return (
    <Routes>
      {/* Citizen Portal */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/report" element={<ReportDefectPage />} />
      <Route path="/track" element={<TrackComplaintPage />} />

      {/* Officer Portal */}
      <Route path="/officer/login" element={<OfficerLoginPage />} />
      <Route path="/officer" element={<OfficerLayout />}>
        <Route index element={<Navigate to="/officer/dashboard" replace />} />
        <Route path="dashboard" element={<OfficerDashboard />} />
        <Route path="complaints" element={<OfficerComplaints />} />
        <Route path="complaints/:id" element={<OfficerComplaintDetails />} />
        <Route path="analytics" element={<OfficerAnalytics />} />
        <Route path="reports" element={<OfficerReports />} />
        <Route path="notifications" element={<OfficerNotifications />} />
        <Route path="profile" element={<OfficerProfile />} />
      </Route>

      {/* Admin Portal (Layout wrapped) */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="municipalities" element={<Municipalities />} />
        <Route path="officers" element={<Officers />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="reassignment" element={<Reassignment />} />
        <Route path="ai-monitoring" element={<AIMonitoring />} />
        <Route path="reports" element={<Reports />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
