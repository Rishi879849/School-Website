import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, Calendar, Settings, ShieldAlert, Award, Star,
  DollarSign, Activity, Bell, FileText, Send, Mail, Check, AlertTriangle, 
  TrendingUp, BarChart2, CheckCircle2, UserCheck, ShieldCheck, ChevronRight,
  Plus, UploadCloud, RefreshCw, Eye, HelpCircle, Lock, ArrowRight, MessageSquare
} from 'lucide-react';
import CareerConstellation from './CareerConstellation';

export default function Dashboards({ 
  activeRole, 
  onLogout,
  students,
  setStudents,
  teachers,
  setTeachers,
  feeLedger,
  setFeeLedger,
  parentMessages,
  setParentMessages,
  broadcasts,
  setBroadcasts,
  onboardingTenants,
  setOnboardingTenants
}) {

  // Dashboard Sub-navigation tabs
  const [activeTab, setActiveTab] = useState('overview');

  // Input states
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastContent, setBroadcastContent] = useState('');
  const [broadcastTarget, setBroadcastTarget] = useState('all');
  const [csvFile, setCsvFile] = useState(null);
  const [ingestionLog, setIngestionLog] = useState('');
  const [isIngesting, setIsIngesting] = useState(false);
  const [attendanceLocked, setAttendanceLocked] = useState(false);
  const [attendanceTime, setAttendanceTime] = useState('');
  const [newMathGrade, setNewMathGrade] = useState({ studentId: 'S101', score: 90 });
  const [parentNewMsg, setParentNewMsg] = useState('');
  const [teacherNewMsg, setTeacherNewMsg] = useState('');

  // Auto timestamp log locks on initial mount
  useEffect(() => {
    const time = new Date().toLocaleTimeString();
    setAttendanceTime(time);
  }, []);

  // --- ACTIONS HANDLERS ---
  const handlePublishBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastContent) return;
    const newB = {
      id: Date.now(),
      title: broadcastTitle,
      content: broadcastContent,
      date: new Date().toISOString().split('T')[0],
      target: broadcastTarget,
      sender: activeRole === 'school_admin' ? 'School Admin' : 'Principal'
    };
    setBroadcasts([newB, ...broadcasts]);
    setBroadcastTitle('');
    setBroadcastContent('');
    alert('Broadcast published instantly to school directories.');
  };

  const handleCsvUpload = (e) => {
    e.preventDefault();
    if (!csvFile) {
      alert('Please select a mock CSV file to upload.');
      return;
    }
    setIsIngesting(true);
    setIngestionLog('Opening CSV file stream...\n');
    setTimeout(() => {
      setIngestionLog(prev => prev + 'Validating schema against database_schema.sql...\n');
    }, 800);
    setTimeout(() => {
      setIngestionLog(prev => prev + 'Processing records for student_profiles table...\n');
    }, 1600);
    setTimeout(() => {
      setIngestionLog(prev => prev + 'Rows Ingested: 154 | Errors: 0\nIngestion completed successfully.');
      setIsIngesting(false);
      setStudents(prev => [
        ...prev,
        { id: 'S105', name: 'Ingested Scholar Beta', roll: 'DTV-099-26', class: 'Grade 10-A', parentName: 'Guardian Alpha', attendance: 'present', grade: 85, mathGrade: 85, physGrade: 82, engGrade: 88, atRisk: false, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60' }
      ]);
    }, 2800);
  };

  const toggleAttendance = (studentId) => {
    if (attendanceLocked) return;
    setStudents(students.map(s => {
      if (s.id === studentId) {
        return { ...s, attendance: s.attendance === 'present' ? 'absent' : 'present' };
      }
      return s;
    }));
  };

  const lockAttendanceLogs = () => {
    setAttendanceLocked(true);
    alert(`Attendance log timestamped and locked at ${attendanceTime}. Corrections only allowed today.`);
  };

  const unlockAttendanceLogs = () => {
    setAttendanceLocked(false);
  };

  const updateStudentGrade = (e) => {
    e.preventDefault();
    setStudents(students.map(s => {
      if (s.id === newMathGrade.studentId) {
        const math = parseInt(newMathGrade.score) || 0;
        const avg = Math.round((math + s.physGrade + s.engGrade) / 3);
        const atRisk = avg < 65;
        return { ...s, mathGrade: math, grade: avg, atRisk };
      }
      return s;
    }));
    alert('Grade sheet compiled. View report card preview below.');
  };

  const handleTeacherSendMsg = (e) => {
    e.preventDefault();
    if (!teacherNewMsg.trim()) return;
    setParentMessages([
      ...parentMessages,
      { sender: 'teacher', text: teacherNewMsg, date: 'Just now' }
    ]);
    setTeacherNewMsg('');
  };

  const handleParentSendMsg = (e) => {
    e.preventDefault();
    if (!parentNewMsg.trim()) return;
    setParentMessages([
      ...parentMessages,
      { sender: 'parent', text: parentNewMsg, date: 'Just now' }
    ]);
    setParentNewMsg('');
  };

  // Get active identity config
  const getRoleTheme = (role) => {
    switch (role) {
      case 'super_admin':
        return { label: 'Super Admin', gradient: 'from-blue-600 to-indigo-500', text: 'text-blue-600', border: 'border-blue-500/20' };
      case 'school_admin':
        return { label: 'School Admin', gradient: 'from-blue-600 to-indigo-500', text: 'text-blue-600', border: 'border-blue-500/20' };
      case 'principal':
        return { label: 'Principal Command', gradient: 'from-rose-600 to-red-400', text: 'text-rose-600', border: 'border-rose-500/20' };
      case 'teacher':
        return { label: 'Teacher Workspace', gradient: 'from-emerald-600 to-emerald-400', text: 'text-emerald-600', border: 'border-emerald-500/20' };
      case 'student':
        return { label: 'Student Hub (AI active)', gradient: 'from-[#FF733B] to-amber-500', text: 'text-[#FF733B]', border: 'border-orange-500/20' };
      case 'parent':
        return { label: 'Parent Monitoring', gradient: 'from-purple-600 to-purple-400', text: 'text-purple-600', border: 'border-purple-500/20' };
      default:
        return { label: 'User Hub', gradient: 'from-gray-700 to-gray-400', text: 'text-gray-600', border: 'border-gray-500/10' };
    }
  };

  const currentTheme = getRoleTheme(activeRole);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#FAF6F0] text-[#2E1E17]">
      {/* Dynamic Top Bar */}
      <div className="w-full bg-[#FAF6F0] border-b border-[#2E1E17]/10 py-4 px-4 md:px-8 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <span className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${currentTheme.gradient} animate-pulse`}></span>
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#2E1E17]">DTV Portal // {currentTheme.label}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-[#2E1E17]/5 border border-[#2E1E17]/10 rounded-lg py-1 px-3 text-[10px] text-gray-600">
            <ShieldCheck size={12} className="text-emerald-600" />
            <span>JWT Signed Session</span>
          </div>
          <button 
            onClick={onLogout}
            className="text-[10px] uppercase font-extrabold tracking-wider text-red-600 hover:text-red-500 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 max-w-[1600px] w-full mx-auto p-4 md:p-6 gap-6">
        {/* Left Persistent Sidebar */}
        <aside className="lg:col-span-2 bg-white border border-[#2E1E17]/10 rounded-3xl p-4 flex flex-col justify-between h-[calc(100vh-120px)] lg:sticky lg:top-24 shadow-sm">
          <div className="space-y-6">
            <div className="text-left py-2 border-b border-[#2E1E17]/10">
              <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block">Academic Year</span>
              <span className="text-xs font-bold text-[#2E1E17] block mt-0.5">AY 2026 - 2027</span>
            </div>

            {/* Sidebar navigation tabs based on role */}
            <nav className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                  activeTab === 'overview' ? 'bg-[#2E1E17]/5 text-black' : 'text-gray-500 hover:bg-[#2E1E17]/5 hover:text-black'
                }`}
              >
                <span>Dashboard Overview</span>
                <ChevronRight size={12} />
              </button>

              {activeRole === 'super_admin' && (
                <button 
                  onClick={() => setActiveTab('tenants')}
                  className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                    activeTab === 'tenants' ? 'bg-[#2E1E17]/5 text-black' : 'text-gray-500 hover:bg-[#2E1E17]/5 hover:text-black'
                  }`}
                >
                  <span>Onboarding & Tenants</span>
                  <ChevronRight size={12} />
                </button>
              )}

              {activeRole === 'school_admin' && (
                <>
                  <button 
                    onClick={() => setActiveTab('fees_setup')}
                    className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                      activeTab === 'fees_setup' ? 'bg-[#2E1E17]/5 text-black' : 'text-gray-500 hover:bg-[#2E1E17]/5 hover:text-black'
                    }`}
                  >
                    <span>Fee Structures</span>
                    <ChevronRight size={12} />
                  </button>
                  <button 
                    onClick={() => setActiveTab('bulk_ingest')}
                    className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                      activeTab === 'bulk_ingest' ? 'bg-[#2E1E17]/5 text-black' : 'text-gray-500 hover:bg-[#2E1E17]/5 hover:text-black'
                    }`}
                  >
                    <span>Bulk Ingestion</span>
                    <ChevronRight size={12} />
                  </button>
                </>
              )}

              {activeRole === 'teacher' && (
                <>
                  <button 
                    onClick={() => setActiveTab('attendance')}
                    className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                      activeTab === 'attendance' ? 'bg-[#2E1E17]/5 text-black' : 'text-gray-500 hover:bg-[#2E1E17]/5 hover:text-black'
                    }`}
                  >
                    <span>Mark Attendance</span>
                    <ChevronRight size={12} />
                  </button>
                  <button 
                    onClick={() => setActiveTab('gradebook')}
                    className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                      activeTab === 'gradebook' ? 'bg-[#2E1E17]/5 text-black' : 'text-gray-500 hover:bg-[#2E1E17]/5 hover:text-black'
                    }`}
                  >
                    <span>Gradebook & Marks</span>
                    <ChevronRight size={12} />
                  </button>
                </>
              )}

              {activeRole === 'student' && (
                <>
                  <button 
                    onClick={() => setActiveTab('roadmap')}
                    className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                      activeTab === 'roadmap' ? 'bg-[#2E1E17]/5 text-black' : 'text-gray-500 hover:bg-[#2E1E17]/5 hover:text-black'
                    }`}
                  >
                    <span>AI Career Roadmap</span>
                    <ChevronRight size={12} />
                  </button>
                </>
              )}

              {activeRole === 'parent' && (
                <button 
                  onClick={() => setActiveTab('parent_comms')}
                  className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                    activeTab === 'parent_comms' ? 'bg-[#2E1E17]/5 text-black' : 'text-gray-500 hover:bg-[#2E1E17]/5 hover:text-black'
                  }`}
                >
                  <span>Teacher Messaging</span>
                  <ChevronRight size={12} />
                </button>
              )}
            </nav>
          </div>

          <div className="text-left border-t border-[#2E1E17]/10 pt-4">
            <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block">Status Nodes</span>
            <div className="flex items-center gap-1.5 mt-1 text-[10px] text-emerald-600 font-semibold">
              <Check size={12} /> Database Connected
            </div>
          </div>
        </aside>

        {/* Main Dashboard Space */}
        <main className="lg:col-span-10 space-y-6 text-left">
          {/* NOTICE INDICATOR BANNER */}
          <div className="w-full bg-white border border-[#2E1E17]/10 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-3 shadow-sm">
            <div className="flex items-center gap-2.5 text-xs text-[#2E1E17]">
              <Bell size={16} className={`${currentTheme.text}`} />
              <span>Latest Broadcast: <strong>{broadcasts[0]?.title}</strong> - {broadcasts[0]?.content}</span>
            </div>
            <span className="text-[9px] uppercase text-gray-500 font-bold">{broadcasts[0]?.date}</span>
          </div>

          {/* Render Active Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 1. SUPER ADMIN WORKSPACE */}
              {activeRole === 'super_admin' && (
                <div className="space-y-6">
                  {/* Trust Metrics grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { title: 'Active Trust Campuses', value: '4 Campuses', detail: 'Delhi, Mumbai, Bangalore, Pune', icon: BookOpen, color: 'text-blue-600 bg-blue-50' },
                      { title: 'Global Student Roster', value: '4,200 Pupils', detail: 'Classes 1 to 12 enrolled', icon: Users, color: 'text-indigo-600 bg-indigo-50' },
                      { title: 'Active Faculty & Staff', value: '320 Teachers', detail: '98% retention rate', icon: Activity, color: 'text-emerald-600 bg-emerald-50' },
                      { title: 'System Telemetry Nodes', value: '99.98% Uptime', detail: 'All campuses synced', icon: ShieldCheck, color: 'text-teal-600 bg-teal-50' }
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-white border border-[#2E1E17]/10 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                        <div className={`p-3 rounded-xl ${stat.color}`}>
                          <stat.icon size={18} />
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">{stat.title}</span>
                          <h4 className="text-xl font-bold text-[#2E1E17] mt-1">{stat.value}</h4>
                          <span className="text-[10px] text-gray-400 block mt-0.5">{stat.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Telemetry charts and logs */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#2E1E17]/10 shadow-sm">
                      <h4 className="text-sm font-bold text-[#2E1E17] mb-4">Trust Systems Digital Network Load</h4>
                      <div className="h-48 w-full bg-[#FAF6F0] border border-[#2E1E17]/10 rounded-xl flex items-end p-4 relative justify-between">
                        {[35, 45, 60, 50, 42, 65, 80, 72, 90, 85, 95, 78, 62, 54, 40].map((val, idx) => (
                          <div key={idx} className="flex-1 mx-0.5 bg-blue-600 rounded-t" style={{ height: `${val}%` }}></div>
                        ))}
                        <span className="absolute bottom-2 left-4 text-[9px] text-gray-400 uppercase tracking-widest font-bold">Network query requests last 15 mins</span>
                      </div>
                    </div>

                    <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#2E1E17] mb-3">Campus Provisioning States</h4>
                        <div className="space-y-3">
                          {onboardingTenants.map((t) => (
                            <div key={t.id} className="flex justify-between items-center text-xs border-b border-[#2E1E17]/5 pb-2">
                              <div>
                                <h5 className="font-bold text-[#2E1E17]">{t.name}</h5>
                                <span className="text-[9px] text-gray-400 block">{t.subdomain}</span>
                              </div>
                              <span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded ${
                                t.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                              }`}>{t.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button 
                        onClick={() => setActiveTab('tenants')}
                        className="w-full bg-[#2E1E17]/5 hover:bg-[#2E1E17]/10 text-[#2E1E17] font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest border border-[#2E1E17]/10 mt-4 flex items-center justify-center gap-1"
                      >
                        Manage Campuses <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. SCHOOL ADMIN WORKSPACE */}
              {activeRole === 'school_admin' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
                      <h4 className="text-sm font-bold text-[#2E1E17]">School Records Settings</h4>
                      
                      <div className="space-y-3 text-xs text-[#2E1E17]/80">
                        <div className="flex justify-between border-b border-[#2E1E17]/5 pb-2">
                          <span className="text-gray-500">Institution ID:</span>
                          <strong className="text-black">EDUKA-SV-091</strong>
                        </div>
                        <div className="flex justify-between border-b border-[#2E1E17]/5 pb-2">
                          <span className="text-gray-500">Active School Segment:</span>
                          <strong className="text-black">Class 1–12 School Segment</strong>
                        </div>
                        <div className="flex justify-between border-b border-[#2E1E17]/5 pb-2">
                          <span className="text-gray-500">Active Term Duration:</span>
                          <strong className="text-black">Sep 01 - Jun 30</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Database Record Count:</span>
                          <strong className="text-emerald-600 font-bold">1,940 Logs Active</strong>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button 
                          onClick={() => setActiveTab('bulk_ingest')}
                          className="flex-1 bg-[#2E1E17]/5 hover:bg-[#2E1E17]/10 text-[#2E1E17] font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest border border-[#2E1E17]/10 flex items-center justify-center gap-1.5"
                        >
                          <UploadCloud size={14} /> Bulk Pupil Load
                        </button>
                        <button 
                          onClick={() => setActiveTab('fees_setup')}
                          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest shadow-md flex items-center justify-center gap-1.5"
                        >
                          <DollarSign size={14} /> Configure Fees
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-[#2E1E17]/10 shadow-sm">
                      <h4 className="text-sm font-bold text-[#2E1E17] mb-3">Publish Immediate Broadcast</h4>
                      <form onSubmit={handlePublishBroadcast} className="space-y-3">
                        <div>
                          <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Broadcast Header</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Schedule Update"
                            value={broadcastTitle}
                            onChange={(e) => setBroadcastTitle(e.target.value)}
                            className="w-full py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Target Role Audience</label>
                          <select 
                            value={broadcastTarget}
                            onChange={(e) => setBroadcastTarget(e.target.value)}
                            className="w-full py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                          >
                            <option value="all">All School Roles</option>
                            <option value="teachers">Teachers Only</option>
                            <option value="parents">Parents Only</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Content Text</label>
                          <textarea 
                            placeholder="Type messages here..." 
                            rows={3}
                            value={broadcastContent}
                            onChange={(e) => setBroadcastContent(e.target.value)}
                            className="w-full py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                            required
                          ></textarea>
                        </div>
                        <button 
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-widest transition"
                        >
                          Publish School Broadcast
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. PRINCIPAL COMMAND DASHBOARD */}
              {activeRole === 'principal' && (
                <div className="space-y-6">
                  {/* Overview Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { title: 'Campus-wide Attendance', value: '94.8%', icon: UserCheck, color: 'text-rose-600 bg-rose-50' },
                      { title: 'Fee Collection Progress', value: '88.5%', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
                      { title: 'Teacher Performance index', value: '4.8 / 5.0', icon: Award, color: 'text-amber-600 bg-amber-50' },
                      { title: 'Scholars At Academic Risk', value: '1 Student', icon: ShieldAlert, color: 'text-red-600 bg-red-50' }
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-white border border-[#2E1E17]/10 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                        <div className={`p-3 rounded-xl ${stat.color}`}>
                          <stat.icon size={18} />
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">{stat.title}</span>
                          <h4 className="text-xl font-bold text-[#2E1E17] mt-1">{stat.value}</h4>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Attendance curves & Teacher audit grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#2E1E17]/10 shadow-sm text-left">
                      <h4 className="text-sm font-bold text-[#2E1E17] mb-4">Student Cohort Academic Standing (Alert Active)</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">
                          <thead>
                            <tr className="border-b border-[#2E1E17]/10 text-gray-400 font-bold">
                              <th className="py-2">Student Name</th>
                              <th className="py-2">Roll ID</th>
                              <th className="py-2">Class</th>
                              <th className="py-2">Overall Score</th>
                              <th className="py-2">Attendance Status</th>
                              <th className="py-2">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {students.map((s) => (
                              <tr key={s.id} className={`border-b border-[#2E1E17]/5 hover:bg-gray-50 ${s.atRisk ? 'bg-red-50/50 text-red-700' : ''}`}>
                                <td className="py-3 flex items-center gap-2">
                                  <img src={s.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                                  <span className="font-bold text-[#2E1E17]">{s.name}</span>
                                </td>
                                <td className="py-3 text-gray-500">{s.roll}</td>
                                <td className="py-3 text-gray-500">{s.class}</td>
                                <td className="py-3 font-extrabold text-[#2E1E17]">{s.grade}%</td>
                                <td className="py-3 uppercase font-semibold text-[10px] text-gray-600">{s.attendance}</td>
                                <td className="py-3">
                                  {s.atRisk ? (
                                    <span className="text-[9px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded border border-red-200">
                                      Needs Academic Support
                                    </span>
                                  ) : (
                                    <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                                      On Track
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#2E1E17]/10 shadow-sm">
                      <h4 className="text-sm font-bold text-[#2E1E17] mb-3">Faculty Performance Reviews</h4>
                      <div className="space-y-3">
                        {teachers.map((t) => (
                          <div key={t.id} className="text-xs border-b border-[#2E1E17]/5 pb-2">
                            <div className="flex justify-between items-center mb-1">
                              <h5 className="font-bold text-[#2E1E17]">{t.name}</h5>
                              <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5">
                                <Star size={10} fill="currentColor" /> {t.score}
                              </span>
                            </div>
                            <div className="flex justify-between text-[10px] text-gray-500">
                              <span>Specialization: {t.specialization}</span>
                              <span>Class: {t.class}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. TEACHER WORKSPACE */}
              {activeRole === 'teacher' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-[#2E1E17]/10 shadow-sm text-left flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#2E1E17] mb-2">Class Section Telemetry (AY 2026)</h4>
                        <p className="text-xs text-gray-500 leading-relaxed mb-4">
                          You are currently assigned to **Grade 10 - Section A** for Mathematics and Science. Active roster contains {students.length} scholars.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setActiveTab('attendance')}
                          className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-400 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-widest shadow-md flex items-center justify-center gap-1.5"
                        >
                          <UserCheck size={14} /> Open Attendance Matrix
                        </button>
                        <button 
                          onClick={() => setActiveTab('gradebook')}
                          className="flex-1 bg-[#2E1E17]/5 hover:bg-[#2E1E17]/10 text-[#2E1E17] font-bold py-2.5 rounded-lg text-xs uppercase tracking-widest border border-[#2E1E17]/10 flex items-center justify-center gap-1.5"
                        >
                          <FileText size={14} /> Mark Entry
                        </button>
                      </div>
                    </div>

                    {/* Teacher direct text messenger to parents */}
                    <div className="bg-white rounded-2xl p-6 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#2E1E17] mb-3">Teacher-Parent Direct Messenger</h4>
                        <div className="h-32 overflow-y-auto space-y-2 border border-[#2E1E17]/10 rounded-xl p-3 bg-[#FAF6F0] text-xs">
                          {parentMessages.map((m, idx) => (
                            <div key={idx} className={`p-2.5 rounded-lg max-w-[85%] ${m.sender === 'teacher' ? 'bg-emerald-100 text-emerald-900 ml-auto' : 'bg-purple-100 text-purple-900 mr-auto'}`}>
                              <p className="leading-relaxed font-semibold">{m.text}</p>
                              <span className="text-[8px] text-gray-500 block mt-1 text-right">{m.date}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <form onSubmit={handleTeacherSendMsg} className="mt-3 flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Send attendance warning to parents..."
                          value={teacherNewMsg}
                          onChange={(e) => setTeacherNewMsg(e.target.value)}
                          className="flex-1 py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                        />
                        <button 
                          type="submit"
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-1.5 rounded-lg text-xs"
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. STUDENT COMPASS HUB */}
              {activeRole === 'student' && (
                <div className="space-y-6">
                  {/* Calendar timetable + Grade view */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 space-y-6">
                      <div className="bg-white rounded-2xl p-6 border border-[#2E1E17]/10 shadow-sm">
                        <h4 className="text-sm font-bold text-[#2E1E17] mb-4">Daily Class Timetable Calendar</h4>
                        <div className="grid grid-cols-5 gap-3 text-xs text-center">
                          {[
                            { day: 'MON', time: '08:30 AM', subject: 'Mathematics', room: 'Room 101' },
                            { day: 'TUE', time: '10:00 AM', subject: 'General Science', room: 'Science Lab' },
                            { day: 'WED', time: '01:00 PM', subject: 'English Grammar', room: 'Room 103' },
                            { day: 'THU', time: '08:30 AM', subject: 'Computer Studies', room: 'Computer Lab' },
                            { day: 'FRI', time: '10:00 AM', subject: 'History & Civics', room: 'Room 101' }
                          ].map((t, idx) => (
                            <div key={idx} className="bg-[#FAF6F0] rounded-xl p-3 border border-[#2E1E17]/10 text-center">
                              <span className="text-[10px] text-[#FF733B] font-extrabold uppercase tracking-wider block">{t.day}</span>
                              <strong className="block text-[#2E1E17] mt-1 text-[11px] truncate">{t.subject}</strong>
                              <span className="text-[9px] text-gray-500 block mt-1">{t.time}</span>
                              <span className="text-[8px] text-gray-400 block mt-0.5 font-bold uppercase">{t.room}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Transcripts and attendance */}
                      <div className="bg-white rounded-2xl p-6 border border-[#2E1E17]/10 shadow-sm">
                        <h4 className="text-sm font-bold text-[#2E1E17] mb-4">Personal Academic Transcript (Mock SQL Logs)</h4>
                        
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#2E1E17]/10">
                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Mathematics Grade</span>
                            <h5 className="text-xl font-extrabold text-[#2E1E17] mt-1">{students[0].mathGrade}%</h5>
                            <span className="text-[9px] text-emerald-600 font-semibold block mt-0.5">Grade A (Passed)</span>
                          </div>
                          <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#2E1E17]/10">
                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Science Grade</span>
                            <h5 className="text-xl font-extrabold text-[#2E1E17] mt-1">{students[0].physGrade}%</h5>
                            <span className="text-[9px] text-emerald-600 font-semibold block mt-0.5">Grade B (Passed)</span>
                          </div>
                          <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#2E1E17]/10">
                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Historical Attendance</span>
                            <h5 className="text-xl font-extrabold text-[#2E1E17] mt-1">98.2%</h5>
                            <span className="text-[9px] text-gray-400 block mt-0.5">0 Unexcused Absences</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                      <div className="bg-white rounded-2xl p-6 border border-[#2E1E17]/10 shadow-sm">
                        <h4 className="text-sm font-bold text-[#2E1E17] mb-3">Pending Action Items</h4>
                        <div className="space-y-3 text-xs">
                          {[
                            { title: 'Algebra Practice Sheet', due: 'July 10, 2026', type: 'Homework' },
                            { title: 'Science Project submission', due: 'July 15, 2026', type: 'Project' }
                          ].map((item, idx) => (
                            <div key={idx} className="p-3 bg-[#FAF6F0] rounded-xl border border-[#2E1E17]/10 text-left flex justify-between items-center">
                              <div>
                                <h5 className="font-bold text-[#2E1E17]">{item.title}</h5>
                                <span className="text-[9px] text-gray-400 block mt-0.5">Due: {item.due}</span>
                              </div>
                              <span className="text-[8px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded font-extrabold border border-orange-200">
                                {item.type}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button 
                        onClick={() => setActiveTab('roadmap')}
                        className="w-full bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-widest hover:scale-[1.02] transition shadow-lg shadow-orange-500/25 flex items-center justify-center gap-1.5"
                      >
                        <Award size={14} /> Open Academic Study Roadmap
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. PARENT TELEMETRY PORTAL */}
              {activeRole === 'parent' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#2E1E17]/10 shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                        <h4 className="text-sm font-bold text-[#2E1E17]">Linked Scholar: Alexander Vance (Grade 10-A)</h4>
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 py-0.5 px-2 rounded-full font-bold">
                          Attendance Status Today: Present
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-6">
                        <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#2E1E17]/10">
                          <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Overall Grade Point</span>
                          <h5 className="text-xl font-extrabold text-[#2E1E17] mt-1">92.5%</h5>
                          <span className="text-[9px] text-emerald-600 font-semibold block mt-0.5">Grade A Average</span>
                        </div>
                        <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#2E1E17]/10">
                          <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Academic Term Attendance</span>
                          <h5 className="text-xl font-extrabold text-[#2E1E17] mt-1">98.2%</h5>
                          <span className="text-[9px] text-gray-400 block mt-0.5">On Target</span>
                        </div>
                        <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#2E1E17]/10">
                          <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Assigned Homeroom Teacher</span>
                          <h5 className="text-xs font-bold text-[#2E1E17] mt-1 truncate">Dr. Christopher Vance</h5>
                          <span className="text-[8px] text-sky-600 block mt-0.5 font-semibold">Specialist</span>
                        </div>
                      </div>

                      {/* Course progress list */}
                      <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Subject Wise Grade Curves</h5>
                      <div className="space-y-3">
                        {[
                          { subject: 'Mathematics (Algebra & Geometry)', score: 92, status: 'Outstanding' },
                          { subject: 'Science (Physics & Chemistry)', score: 88, status: 'Satisfactory' },
                          { subject: 'Computer Studies (Coding & Logic)', score: 95, status: 'Outstanding' }
                        ].map((s, idx) => (
                          <div key={idx} className="p-3 bg-[#FAF6F0] rounded-xl border border-[#2E1E17]/10 text-xs text-left flex items-center justify-between">
                            <div>
                              <strong className="text-[#2E1E17] block">{s.subject}</strong>
                              <span className="text-[9px] text-gray-500 block mt-0.5">Status: {s.status}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-extrabold text-[#2E1E17] block">{s.score}%</span>
                              <span className="text-[9px] text-emerald-600 font-bold block">Passing Grade</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between h-[360px]">
                      <div>
                        <h4 className="text-sm font-bold text-[#2E1E17] mb-3">Outstanding Fee Ledger</h4>
                        <div className="space-y-3 text-xs">
                          {feeLedger.slice(0, 3).map((fee, idx) => (
                            <div key={idx} className="p-3 bg-[#FAF6F0] rounded-xl border border-[#2E1E17]/10 text-left flex justify-between items-center">
                              <div>
                                <h5 className="font-bold text-[#2E1E17]">{fee.studentName}</h5>
                                <span className="text-[9px] text-gray-400 block mt-0.5">Due: {fee.dueDate}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-extrabold text-[#2E1E17] block">${fee.amountDue - fee.amountPaid}</span>
                                <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded border mt-1 inline-block ${
                                  fee.status === 'paid' 
                                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                    : fee.status === 'partial'
                                    ? 'bg-amber-100 text-amber-700 border-amber-200'
                                    : 'bg-red-100 text-red-700 border-red-200 animate-pulse'
                                }`}>
                                  {fee.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-[#2E1E17]/10 pt-4 mt-4">
                        <button 
                          onClick={() => alert('Secure payment sandbox mock triggered successfully.')}
                          className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest hover:scale-[1.02] transition shadow-lg shadow-purple-500/25 flex items-center justify-center gap-1.5"
                        >
                          <DollarSign size={14} /> Clear Ledger Balance
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ONBOARDING & TENANTS TABS (SUPER ADMIN) */}
          {activeTab === 'tenants' && activeRole === 'super_admin' && (
            <div className="bg-white rounded-2xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-[#2E1E17]/10 pb-4">
                <h3 className="text-base font-bold text-[#2E1E17]">Manage Trust Campuses</h3>
                <button 
                  onClick={() => {
                    const name = prompt('Enter new campus name:');
                    const sub = prompt('Enter subdomain prefix:');
                    if (name && sub) {
                      setOnboardingTenants([
                        ...onboardingTenants,
                        { id: Date.now(), name, subdomain: `${sub}.dtv-eduka.com`, users: 0, date: new Date().toISOString().split('T')[0], status: 'provisioning' }
                      ]);
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1"
                >
                  <Plus size={14} /> Provision New Campus
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="text-gray-400 border-b border-[#2E1E17]/10">
                      <th className="py-2">School Name</th>
                      <th className="py-2">Subdomain URL</th>
                      <th className="py-2">Active Users</th>
                      <th className="py-2">Onboard Date</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {onboardingTenants.map((t) => (
                      <tr key={t.id} className="border-b border-[#2E1E17]/5">
                        <td className="py-3 font-bold text-[#2E1E17]">{t.name}</td>
                        <td className="py-3 text-sky-600 font-semibold">{t.subdomain}</td>
                        <td className="py-3 text-gray-500">{t.users} Pupils</td>
                        <td className="py-3 text-gray-500">{t.date}</td>
                        <td className="py-3">
                          <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                            t.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700 animate-pulse'
                          }`}>
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* FEES SETUP & CLASS CONFIG (SCHOOL ADMIN) */}
          {activeTab === 'fees_setup' && activeRole === 'school_admin' && (
            <div className="bg-white rounded-2xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-[#2E1E17]/10 pb-4">
                <h3 className="text-base font-bold text-[#2E1E17]">Configure Section Fee Matrices</h3>
                <button 
                  onClick={() => {
                    const amt = prompt('Enter Fee Structure Amount ($):');
                    if (amt) {
                      setFeeLedger(feeLedger.map(f => ({ ...f, amountDue: parseInt(amt) || f.amountDue })));
                      alert('Fee structure updated globally across class sections.');
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1"
                >
                  <Plus size={14} /> Add Structure
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="text-gray-400 border-b border-[#2E1E17]/10">
                      <th className="py-2">Student Scholar</th>
                      <th className="py-2">Total Amount Due</th>
                      <th className="py-2">Paid Ledger</th>
                      <th className="py-2">Due Date</th>
                      <th className="py-2">Ledger Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeLedger.map((fee, idx) => (
                      <tr key={idx} className="border-b border-[#2E1E17]/5">
                        <td className="py-3 font-bold text-[#2E1E17]">{fee.studentName}</td>
                        <td className="py-3 text-gray-500">${fee.amountDue}</td>
                        <td className="py-3 text-emerald-600 font-semibold">${fee.amountPaid}</td>
                        <td className="py-3 text-gray-500">{fee.dueDate}</td>
                        <td className="py-3">
                          <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                            fee.status === 'paid' 
                              ? 'bg-emerald-100 text-emerald-700'
                              : fee.status === 'partial'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {fee.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* BULK CSV INGESTION PORTAL (SCHOOL ADMIN) */}
          {activeTab === 'bulk_ingest' && activeRole === 'school_admin' && (
            <div className="bg-white rounded-2xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-6">
              <div className="border-b border-[#2E1E17]/10 pb-4">
                <h3 className="text-base font-bold text-[#2E1E17]">Bulk Data Ingestion Console</h3>
                <p className="text-xs text-gray-400 mt-1">Upload student records or staff directories in standard RFC-4180 CSV format.</p>
              </div>

              <form onSubmit={handleCsvUpload} className="space-y-4 max-w-lg">
                <div className="border-2 border-dashed border-[#2E1E17]/15 hover:border-blue-500/50 rounded-2xl p-8 text-center transition cursor-pointer relative bg-[#FAF6F0]">
                  <input 
                    type="file" 
                    accept=".csv"
                    onChange={(e) => setCsvFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <UploadCloud size={32} className="text-gray-400 mx-auto mb-3" />
                  <span className="text-xs text-[#2E1E17] block font-bold">
                    {csvFile ? `Selected: ${csvFile.name}` : 'Drag & Drop CSV File here or Click to browse'}
                  </span>
                  <span className="text-[10px] text-gray-400 block mt-1">Accepts headers: first_name, last_name, roll_number, parent_email</span>
                </div>

                <button 
                  type="submit"
                  disabled={isIngesting}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-widest transition flex items-center gap-2"
                >
                  {isIngesting ? <RefreshCw size={12} className="animate-spin" /> : null}
                  Start Database Ingestion
                </button>
              </form>

              {ingestionLog && (
                <div className="border border-[#2E1E17]/15 bg-[#FAF6F0] rounded-xl p-4 font-mono text-[10px] text-[#2E1E17]/80 text-left whitespace-pre-line leading-relaxed">
                  <h5 className="font-bold text-[#2E1E17] mb-2 uppercase tracking-widest text-[9px]">Ingestion Telemetry Console:</h5>
                  {ingestionLog}
                </div>
              )}
            </div>
          )}

          {/* DAILY ATTENDANCE MARKING MATRIX (TEACHER) */}
          {activeTab === 'attendance' && activeRole === 'teacher' && (
            <div className="bg-white rounded-2xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#2E1E17]/10 pb-4 gap-4">
                <div>
                  <h3 className="text-base font-bold text-[#2E1E17] flex items-center gap-1.5">
                    Daily Attendance Matrix 
                    {attendanceLocked && <Lock size={14} className="text-red-500" />}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Class: Grade 10-Section A • Roster Size: {students.length}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setStudents(students.map(s => ({ ...s, attendance: 'present' })));
                      alert('Roster set to present.');
                    }}
                    disabled={attendanceLocked}
                    className="bg-[#2E1E17]/5 hover:bg-[#2E1E17]/10 text-[#2E1E17] border border-[#2E1E17]/10 text-[10px] font-extrabold uppercase px-3 py-2 rounded-lg transition"
                  >
                    Mark All Present
                  </button>
                  <button 
                    onClick={lockAttendanceLogs}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-400 text-white text-[10px] font-extrabold uppercase px-4 py-2 rounded-lg transition shadow-md"
                  >
                    Lock Telemetry Log
                  </button>
                  {attendanceLocked && (
                    <button 
                      onClick={unlockAttendanceLogs}
                      className="bg-red-50 text-red-600 border border-red-200 text-[9px] font-bold px-2.5 py-2 rounded-lg transition"
                    >
                      Self-Service Correct
                    </button>
                  )}
                </div>
              </div>

              {attendanceLocked && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2">
                  <ShieldAlert size={16} />
                  <span>Telemetry logs locked at {attendanceTime}. Unlocks require principal validation nodes.</span>
                </div>
              )}

              {/* Photo grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {students.map((student) => (
                  <div 
                    key={student.id}
                    onClick={() => toggleAttendance(student.id)}
                    className={`bg-white rounded-2xl p-4 border text-center transition cursor-pointer relative ${
                      student.attendance === 'present' 
                        ? 'border-emerald-500/20 bg-emerald-50/50' 
                        : 'border-red-500/20 bg-red-50/50'
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mx-auto mb-2">
                      <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        student.attendance === 'present' ? 'bg-emerald-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                    
                    <h4 className="text-xs font-bold text-[#2E1E17] truncate">{student.name}</h4>
                    <span className="text-[9px] text-gray-500 block truncate">{student.roll}</span>
                    <span className={`text-[9px] font-extrabold uppercase mt-2 inline-block ${
                      student.attendance === 'present' ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {student.attendance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GRADEBOOK & REPORT CARD PREVIEW (TEACHER) */}
          {activeTab === 'gradebook' && activeRole === 'teacher' && (
            <div className="bg-white rounded-2xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-6">
              <div className="border-b border-[#2E1E17]/10 pb-4">
                <h3 className="text-base font-bold text-[#2E1E17]">Gradebook & Terminal Marks Entry</h3>
                <p className="text-xs text-gray-400 mt-1">Compile subject scores to generate automated reports cards.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#2E1E17]/10 shadow-sm">
                  <h4 className="text-xs font-bold uppercase text-gray-400 mb-3">Update Mathematics Marks</h4>
                  
                  <form onSubmit={updateStudentGrade} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-gray-500 mb-1">Select Student Scholar</label>
                      <select 
                        value={newMathGrade.studentId}
                        onChange={(e) => setNewMathGrade({ ...newMathGrade, studentId: e.target.value })}
                        className="w-full py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                      >
                        {students.map(s => (
                          <option key={s.id} value={s.id}>{s.name} ({s.roll})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-500 mb-1">Score Obtained (Max 100)</label>
                      <input 
                        type="number" 
                        min="0" 
                        max="100"
                        value={newMathGrade.score}
                        onChange={(e) => setNewMathGrade({ ...newMathGrade, score: e.target.value })}
                        className="w-full py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                        required
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-400 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-widest shadow-md"
                    >
                      Save Score & Compile
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-[#2E1E17]/10 shadow-sm">
                  <h4 className="text-xs font-bold uppercase text-gray-400 mb-3">Report Card Output Preview</h4>
                  {(() => {
                    const selectedStudent = students.find(s => s.id === newMathGrade.studentId);
                    return (
                      <div className="border border-[#2E1E17]/10 rounded-xl p-4 bg-[#FAF6F0] text-xs space-y-3">
                        <div className="flex justify-between border-b border-[#2E1E17]/10 pb-2">
                          <div>
                            <h5 className="font-bold text-[#2E1E17]">{selectedStudent.name}</h5>
                            <span className="text-[9px] text-gray-400">{selectedStudent.roll} • {selectedStudent.class}</span>
                          </div>
                          <span className="text-[10px] text-gray-500 font-bold uppercase">Term 1 Terminal Report</span>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between text-gray-500">
                            <span>Subject: Mathematics:</span>
                            <strong className="text-[#2E1E17]">{selectedStudent.mathGrade}%</strong>
                          </div>
                          <div className="flex justify-between text-gray-500">
                            <span>Subject: General Science:</span>
                            <strong className="text-[#2E1E17]">{selectedStudent.physGrade}%</strong>
                          </div>
                          <div className="flex justify-between text-gray-500">
                            <span>Subject: English Language:</span>
                            <strong className="text-[#2E1E17]">{selectedStudent.engGrade}%</strong>
                          </div>
                          <div className="flex justify-between border-t border-[#2E1E17]/10 pt-2 text-[#2E1E17] font-extrabold">
                            <span>Aggregate Mark Average:</span>
                            <span className="text-emerald-600">{selectedStudent.grade}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* AI CAREER CONSTELLATION MAP TAB (STUDENT) */}
          {activeTab === 'roadmap' && activeRole === 'student' && (
            <div className="space-y-6">
              <CareerConstellation />

              {/* AUTOMATED SKILL GAP ANALYSIS */}
              <div className="bg-white border border-[#2E1E17]/10 rounded-3xl p-6 text-left space-y-4 shadow-sm">
                <h4 className="text-sm font-bold text-[#2E1E17] flex items-center gap-1.5">
                  <TrendingUp size={16} className="text-amber-600" />
                  AI Academic Progress Analysis
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                  Real-time academic scanner auditing student grade profiles to recommend study focuses and board exam preparations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 text-xs text-left">
                    <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-widest block mb-2">Strong Subject Metrics:</span>
                    <ul className="space-y-1 text-emerald-700 font-semibold">
                      <li>• Geometry & Quadratic Formulations (Outstanding)</li>
                      <li>• Computer coding logic and Python constructs</li>
                      <li>• English essay structure and reading comprehension</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-red-50/50 rounded-2xl border border-red-200 text-xs text-left">
                    <span className="text-[9px] font-bold text-red-800 uppercase tracking-widest block mb-2">Recommended Focus Areas:</span>
                    <ul className="space-y-1 text-red-700 font-semibold">
                      <li>• Optics & Electricity formulations (General Science)</li>
                      <li>• Mechanics chapter review exercises</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PARENT DIRECT MESSAGE PIPELINE (PARENT) */}
          {activeTab === 'parent_comms' && activeRole === 'parent' && (
            <div className="bg-white rounded-2xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#2E1E17] mb-2">Text Messenger (Assigned Subject Teachers)</h3>
              
              <div className="h-48 overflow-y-auto space-y-2 border border-[#2E1E17]/10 rounded-xl p-4 bg-[#FAF6F0] text-xs">
                {parentMessages.map((m, idx) => (
                  <div key={idx} className={`p-2.5 rounded-lg max-w-[85%] ${m.sender === 'parent' ? 'bg-purple-100 text-purple-900 ml-auto' : 'bg-white border border-[#2E1E17]/5 text-[#2E1E17] mr-auto'}`}>
                    <p className="leading-relaxed font-semibold">{m.text}</p>
                    <span className="text-[8px] text-gray-500 block mt-1 text-right">{m.date}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleParentSendMsg} className="flex gap-2 text-xs">
                <input 
                  type="text" 
                  placeholder="Ask teachers regarding grade curves or attendance dropped logs..."
                  value={parentNewMsg}
                  onChange={(e) => setParentNewMsg(e.target.value)}
                  className="flex-1 py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                />
                <button 
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-widest transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
