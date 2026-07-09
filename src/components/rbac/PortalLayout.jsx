import React from 'react';
import { useRBAC } from './context/RBACContext';
import SuperAdminDashboard from './SuperAdmin/SuperAdminDashboard';
import SchoolAdminDashboard from './SchoolAdmin/SchoolAdminDashboard';
import PrincipalDashboard from './Principal/PrincipalDashboard';
import TeacherDashboard from './Teacher/TeacherDashboard';
import StudentDashboard from './Student/StudentDashboard';
import ParentDashboard from './Parent/ParentDashboard';
import DeptHeadDashboard from './DeptHead/DeptHeadDashboard';
import { LogOut } from 'lucide-react';

export default function PortalLayout({ currentRole, onLogout }) {
  const { whiteLabelConfig } = useRBAC();
  const activeRole = currentRole || 'teacher';

  const renderActiveDashboard = () => {
    switch (activeRole) {
      case 'super_admin':
        return <SuperAdminDashboard />;
      case 'school_admin':
        return <SchoolAdminDashboard />;
      case 'principal':
        return <PrincipalDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'student':
        return <StudentDashboard />;
      case 'parent':
        return <ParentDashboard />;
      case 'dept_head':
        return <DeptHeadDashboard />;
      default:
        return <TeacherDashboard />;
    }
  };

  const roleNames = {
    super_admin: 'Super Admin',
    school_admin: 'School Admin',
    principal: 'Principal',
    teacher: 'Teacher',
    student: 'Student',
    parent: 'Parent',
    dept_head: 'Department Head',
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2E1E17] font-sans antialiased flex flex-col justify-between">
      
      {/* Top Brand Banner */}
      <header className="bg-white border-b border-[#2E1E17]/10 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={whiteLabelConfig.logoUrl} 
              alt="School Logo" 
              className="w-10 h-10 rounded-xl object-cover border border-[#2E1E17]/10 shadow-sm" 
            />
            <div>
              <h1 className="text-sm font-extrabold tracking-wider uppercase font-serif" style={{ color: whiteLabelConfig.primaryColor }}>
                {whiteLabelConfig.schoolName}
              </h1>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">
                RPAC Multi-Tenant Platform
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] bg-[#2E1E17]/5 font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider text-[#2E1E17]">
              Session: {roleNames[activeRole] || activeRole}
            </span>
            <button 
              onClick={onLogout}
              className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold py-1.5 px-3 rounded-xl transition flex items-center gap-1"
            >
              <LogOut size={12} /> Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {renderActiveDashboard()}
      </main>

      {/* Standard Copyright Footer */}
      <footer className="bg-white border-t border-[#2E1E17]/10 py-4 mt-auto text-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
        &copy; {new Date().getFullYear()} {whiteLabelConfig.schoolName} ERP. All Rights Reserved.
      </footer>

    </div>
  );
}
