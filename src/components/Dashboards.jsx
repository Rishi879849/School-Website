import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, Calendar, Settings, ShieldAlert, Award, Star,
  DollarSign, Activity, Bell, FileText, Send, Mail, Check, AlertTriangle, 
  TrendingUp, BarChart2, CheckCircle2, UserCheck, ShieldCheck, ChevronRight,
  Plus, UploadCloud, RefreshCw, Eye, HelpCircle, Lock, ArrowRight, MessageSquare, Unlock
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
  const [studentChatMessages, setStudentChatMessages] = useState([
    { sender: 'ai', text: "Hello Alexander! I'm your Edukids Study Buddy. Ask me about your Math or Science homework today! 📚", date: 'Just now' }
  ]);
  const [studentChatInput, setStudentChatInput] = useState('');
  const [algebraHWStatus, setAlgebraHWStatus] = useState('Pending');
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupProgress, setBackupProgress] = useState('');
  const [meetingLogs, setMeetingLogs] = useState([
    { id: 1, studentName: 'Kaelen Miller', date: '2026-07-08', time: '10:00 AM', status: 'Scheduled' }
  ]);
  const [superAdminSubTab, setSuperAdminSubTab] = useState('system');

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

  const handleStudentSendChat = (e) => {
    e.preventDefault();
    if (!studentChatInput.trim()) return;
    const userMsg = { 
      sender: 'student', 
      text: studentChatInput, 
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    let replyText = "That sounds interesting! Let's focus on mastering this topic step-by-step.";
    const query = studentChatInput.toLowerCase();
    if (query.includes('math') || query.includes('algebra')) {
      replyText = "Mathematics is all about patterns! For your Algebra homework, remember to solve the quadratic equation using the formula x = (-b ± √(b² - 4ac)) / 2a.";
    } else if (query.includes('science') || query.includes('physics')) {
      replyText = "Your General Science lab project on light optics is coming up. Make sure to draw clear ray diagrams for convex lenses!";
    } else if (query.includes('homework') || query.includes('pending')) {
      replyText = `You currently have ${algebraHWStatus === 'Pending' ? '1 pending assignment: Algebra Practice Sheet.' : '0 pending assignments! Outstanding job!'}`;
    }

    setStudentChatMessages(prev => [...prev, userMsg]);
    setStudentChatInput('');

    setTimeout(() => {
      setStudentChatMessages(prev => [...prev, {
        sender: 'ai',
        text: replyText,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 600);
  };

  const handleUploadHomework = () => {
    const fileUploaded = prompt("Enter mock homework file name (e.g., algebra_vance.pdf):");
    if (fileUploaded) {
      setAlgebraHWStatus('Submitted (Pending Grading)');
      alert(`Success: ${fileUploaded} uploaded to student files. Status updated to Submitted.`);
    }
  };

  const handleTriggerBackup = () => {
    setIsBackingUp(true);
    setBackupProgress('Initializing cloud backup node...\n');
    setTimeout(() => {
      setBackupProgress(prev => prev + 'Archiving global multi-campus schemas...\n');
    }, 600);
    setTimeout(() => {
      setBackupProgress(prev => prev + 'Encrypting record packages via SSL SHA-256...\n');
    }, 1200);
    setTimeout(() => {
      setBackupProgress(prev => prev + 'Backup sync complete. SHA Hash: 9e108d81ac\nStatus: Securely Vaulted.');
      setIsBackingUp(false);
    }, 1800);
  };

  const handleScheduleMeeting = (studentName) => {
    const date = prompt("Enter meeting date (YYYY-MM-DD):", "2026-07-10");
    const time = prompt("Enter meeting time:", "02:00 PM");
    if (date && time) {
      setMeetingLogs(prev => [
        ...prev,
        { id: Date.now(), studentName, date, time, status: 'Scheduled' }
      ]);
      alert(`Meeting scheduled with parents of {studentName} on ${date} at ${time}.`);
    }
  };

  const handlePayFee = (studentId) => {
    setFeeLedger(prev => prev.map(fee => {
      if (fee.studentId === studentId) {
        return { ...fee, status: 'paid', amountPaid: fee.amountDue };
      }
      return fee;
    }));
    alert("Payment Successful! Mock payment transaction completed via secure gateway.");
  };

  // Get active identity config
  const getRoleTheme = (role) => {
    switch (role) {
      case 'super_admin':
        return { label: 'Super Admin', gradient: 'from-[#1E293B] to-[#0F172A]', text: 'text-slate-700', border: 'border-slate-500/20' };
      case 'school_admin':
        return { label: 'School Admin', gradient: 'from-[#2E1E17] to-[#4A3226]', text: 'text-[#FF733B]', border: 'border-orange-500/20' };
      case 'principal':
        return { label: 'Principal Command', gradient: 'from-[#451A03] to-[#2E1001]', text: 'text-amber-700', border: 'border-amber-500/20' };
      case 'teacher':
        return { label: 'Teacher Workspace', gradient: 'from-[#064E3B] to-[#022C22]', text: 'text-emerald-700', border: 'border-emerald-500/20' };
      case 'student':
        return { label: 'Student Hub (AI active)', gradient: 'from-[#FF733B] to-amber-500', text: 'text-[#FF733B]', border: 'border-orange-500/20' };
      case 'parent':
        return { label: 'Parent Monitoring', gradient: 'from-purple-700 to-purple-900', text: 'text-purple-700', border: 'border-purple-500/20' };
      default:
        return { label: 'User Hub', gradient: 'from-gray-700 to-gray-400', text: 'text-gray-600', border: 'border-gray-500/10' };
    }
  };

  const currentTheme = getRoleTheme(activeRole);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#FAF6F0] text-[#2E1E17]">
      {/* Dynamic Top Bar */}
      <div className="w-full bg-white border-b border-[#2E1E17]/10 py-4.5 px-4 md:px-8 flex justify-between items-center z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <span className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${currentTheme.gradient} animate-pulse`}></span>
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#2E1E17]">DTV Portal // {currentTheme.label}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-[#2E1E17]/5 border border-[#2E1E17]/10 rounded-xl py-1.5 px-3.5 text-[10px] text-gray-500 font-extrabold">
            <ShieldCheck size={12} className="text-emerald-600" />
            <span>JWT Signed Session</span>
          </div>
          <button 
            onClick={onLogout}
            className="text-[10px] uppercase font-extrabold tracking-wider text-red-600 hover:text-red-500 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 max-w-[1600px] w-full mx-auto p-4 md:p-6 gap-6">
        {/* Left Persistent Sidebar */}
        <aside className="lg:col-span-2 bg-white border border-[#2E1E17]/10 rounded-[2rem] p-4 flex flex-col justify-between h-[calc(100vh-140px)] lg:sticky lg:top-24 shadow-sm">
          <div className="space-y-6">
            <div className="text-left py-2.5 border-b border-[#2E1E17]/10">
              <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block">Academic Year</span>
              <span className="text-xs font-bold text-[#2E1E17] block mt-0.5">AY 2026 - 2027</span>
            </div>

            {/* Sidebar navigation tabs based on role */}
            <nav className="flex flex-col gap-1.5">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                  activeTab === 'overview' ? 'bg-[#2E1E17]/5 text-black' : 'text-gray-500 hover:bg-[#2E1E17]/5 hover:text-black'
                }`}
              >
                <span>Dashboard Overview</span>
                <ChevronRight size={12} />
              </button>

              {activeRole === 'super_admin' && (
                <button 
                  onClick={() => setActiveTab('tenants')}
                  className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
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
                    className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                      activeTab === 'fees_setup' ? 'bg-[#2E1E17]/5 text-black' : 'text-gray-500 hover:bg-[#2E1E17]/5 hover:text-black'
                    }`}
                  >
                    <span>Fee Structures</span>
                    <ChevronRight size={12} />
                  </button>
                  <button 
                    onClick={() => setActiveTab('bulk_ingest')}
                    className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
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
                    className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                      activeTab === 'attendance' ? 'bg-[#2E1E17]/5 text-black' : 'text-gray-500 hover:bg-[#2E1E17]/5 hover:text-black'
                    }`}
                  >
                    <span>Mark Attendance</span>
                    <ChevronRight size={12} />
                  </button>
                  <button 
                    onClick={() => setActiveTab('gradebook')}
                    className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
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
                    className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
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
                  className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
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
            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block">Status Nodes</span>
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
              <Bell size={16} className={`${currentTheme.text} animate-bounce`} />
              <span>Latest Broadcast: <strong>{broadcasts[0]?.title}</strong> - {broadcasts[0]?.content}</span>
            </div>
            <span className="text-[9px] uppercase text-gray-400 font-bold">{broadcasts[0]?.date}</span>
          </div>

          {/* Render Active Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 1. SUPER ADMIN WORKSPACE */}
              {activeRole === 'super_admin' && (
                <div className="space-y-6">
                  {/* Premium Admin Header */}
                  <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white p-6 rounded-3xl relative overflow-hidden shadow-xl border border-white/10">
                    <div className="absolute right-[-10%] top-[-25%] w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[9px] bg-blue-600 text-white font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider inline-block">
                          Head of Trust Workspace
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold font-serif">Edukids School Trust Command</h3>
                        <p className="text-xs text-white/70">
                          Account: <strong className="text-white font-bold">superadmin@school.edu</strong> • Global Database: <strong className="text-emerald-400">Synced & Protected</strong>
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block"></span>
                        <span className="font-extrabold uppercase tracking-wider text-[10px]">All Systems Operational</span>
                      </div>
                    </div>
                  </div>

                  {/* Sub-Navigation Tabs */}
                  <div className="flex flex-wrap gap-2 border-b border-[#2E1E17]/10 pb-2">
                    {[
                      { id: 'system', label: 'System Telemetry', desc: 'Server load & backups' },
                      { id: 'operations', label: 'School Operations', desc: 'Broadcasts & settings' },
                      { id: 'academic', label: 'Academic Audits', desc: 'Roster & meetings' },
                      { id: 'finance', label: 'Global Fee Ledger', desc: 'Dues & payments status' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSuperAdminSubTab(tab.id)}
                        className={`py-2 px-4 rounded-xl text-xs font-bold transition-all text-left flex flex-col justify-center min-w-[120px] cursor-pointer ${
                          superAdminSubTab === tab.id
                            ? 'bg-[#2E1E17] text-white shadow-md'
                            : 'bg-white border border-[#2E1E17]/10 text-gray-500 hover:bg-[#2E1E17]/5 hover:text-black'
                        }`}
                      >
                        <span className="text-[10px] uppercase block tracking-wider">{tab.label}</span>
                        <span className="text-[8px] font-medium opacity-60 mt-0.5">{tab.desc}</span>
                      </button>
                    ))}
                  </div>

                  {/* Tab 1: System Telemetry */}
                  {superAdminSubTab === 'system' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm relative overflow-hidden">
                          <h4 className="text-sm font-bold text-[#2E1E17] font-serif border-b border-[#2E1E17]/5 pb-3">Server Resources Load</h4>
                          <div className="h-44 w-full bg-[#2F221E] rounded-2xl mt-4 relative overflow-hidden border border-amber-900/10 flex items-center justify-center p-4">
                            {/* Graphic lines simulation */}
                            <div className="flex items-end gap-1 w-full h-full justify-between pt-6">
                              {[35, 45, 30, 60, 75, 40, 50, 35, 65, 80, 55, 45, 90, 70, 65, 50, 60].map((h, i) => (
                                <div key={i} className="bg-gradient-to-t from-[#FF733B] to-amber-400 w-full rounded-t" style={{ height: `${h}%` }} />
                              ))}
                            </div>
                            <span className="absolute bottom-2 left-4 text-[9px] text-orange-200 uppercase tracking-widest font-extrabold font-mono">Network Query Requests Last 15 Mins</span>
                          </div>
                        </div>

                        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between min-h-[280px]">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
                              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Campus Provisioning</h4>
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            </div>
                            
                            <div className="space-y-3">
                              {onboardingTenants.slice(0, 3).map((t) => (
                                <div key={t.id} className="flex justify-between items-center text-xs border-b border-[#2E1E17]/5 pb-2">
                                  <div>
                                    <h5 className="font-extrabold text-[#2E1E17]">{t.name}</h5>
                                    <span className="text-[9px] text-gray-400 block font-mono">{t.subdomain}</span>
                                  </div>
                                  <span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                                    t.status === 'active' 
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                      : 'bg-amber-50 text-amber-700 border-amber-100 animate-pulse'
                                  }`}>{t.status}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <button 
                              onClick={handleTriggerBackup}
                              disabled={isBackingUp}
                              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 transition cursor-pointer"
                            >
                              {isBackingUp ? <RefreshCw size={12} className="animate-spin" /> : <ShieldCheck size={14} />} Backup Node
                            </button>
                            <button 
                              onClick={() => setActiveTab('tenants')}
                              className="flex-1 bg-[#2E1E17]/5 hover:bg-[#2E1E17]/10 text-[#2E1E17] border border-[#2E1E17]/10 font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-1 transition cursor-pointer"
                            >
                              Provision <ArrowRight size={12} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {backupProgress && (
                        <div className="bg-white border border-[#2E1E17]/10 rounded-3xl p-5 shadow-sm space-y-2">
                          <h5 className="text-[9px] font-extrabold uppercase tracking-widest text-[#FF733B]">Live Telemetry Backup Stream</h5>
                          <pre className="text-[10px] font-mono text-emerald-400 bg-black/90 p-4 rounded-xl border border-white/10 overflow-x-auto leading-relaxed whitespace-pre-line text-left">
                            {backupProgress}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab 2: School Operations */}
                  {superAdminSubTab === 'operations' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
                        <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
                          <h4 className="text-sm font-bold text-[#2E1E17] font-serif">School Operations Settings</h4>
                        </div>
                        
                        <div className="space-y-3.5 text-xs text-[#2E1E17]/80">
                          <div className="flex justify-between border-b border-[#2E1E17]/5 pb-2.5">
                            <span className="text-gray-500 font-semibold">Active Campuses:</span>
                            <strong className="text-black">4 Synced</strong>
                          </div>
                          <div className="flex justify-between border-b border-[#2E1E17]/5 pb-2.5">
                            <span className="text-gray-500 font-semibold">Global Segment:</span>
                            <strong className="text-black">Classes 1 to 12</strong>
                          </div>
                          <div className="flex justify-between border-b border-[#2E1E17]/5 pb-2.5">
                            <span className="text-gray-500 font-semibold">Broadcasting Center:</span>
                            <strong className="text-[#FF733B] font-bold">Enabled (Super Admin Level)</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 font-semibold">SQL Telemetry Logs:</span>
                            <strong className="text-emerald-600 font-bold">4,200 Student Nodes</strong>
                          </div>
                        </div>

                        <div className="flex gap-2.5 pt-3">
                          <button 
                            onClick={() => alert("Redirecting to Bulk Pupil loader...")}
                            className="flex-1 bg-[#2E1E17]/5 hover:bg-[#2E1E17]/10 text-[#2E1E17] border border-[#2E1E17]/10 font-bold py-3 rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition cursor-pointer"
                          >
                            <UploadCloud size={14} /> Bulk Student Ingest
                          </button>
                          <button 
                            onClick={() => alert("Opening trust fee configuration console...")}
                            className="flex-1 bg-[#FF733B] hover:bg-[#E6622E] text-white font-bold py-3 rounded-xl text-[10px] uppercase tracking-widest shadow-md flex items-center justify-center gap-1.5 transition cursor-pointer"
                          >
                            <DollarSign size={14} /> Global Fee Setup
                          </button>
                        </div>
                      </div>

                      {/* Global Broadcast compiler */}
                      <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
                        <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
                          <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Publish Trust-Wide Announcement</h4>
                          <span className="text-[9.5px] text-[#FF733B] font-bold uppercase tracking-wider">Broadcast Dispatch</span>
                        </div>

                        <form onSubmit={handlePublishBroadcast} className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] text-gray-500 uppercase font-extrabold mb-1">Headline</label>
                              <input 
                                type="text" 
                                placeholder="e.g. Campus Holiday Alert"
                                value={broadcastTitle}
                                onChange={(e) => setBroadcastTitle(e.target.value)}
                                className="w-full py-2 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none focus:border-[#FF733B] transition"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-gray-500 uppercase font-extrabold mb-1">Target Audience</label>
                              <select 
                                value={broadcastTarget}
                                onChange={(e) => setGalleryFilter(e.target.value)}
                                className="w-full py-2 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none focus:border-[#FF733B] transition"
                              >
                                <option value="all">All Campuses & Roles</option>
                                <option value="teachers">All Faculty Teachers Only</option>
                                <option value="parents">All Scholar Parents Only</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] text-gray-500 uppercase font-extrabold mb-1">Content Text Message</label>
                            <textarea 
                              placeholder="Type trust announcement details here..." 
                              rows={2}
                              value={broadcastContent}
                              onChange={(e) => setBroadcastContent(e.target.value)}
                              className="w-full py-2 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none focus:border-[#FF733B] transition"
                              required
                            ></textarea>
                          </div>
                          <button 
                            type="submit"
                            className="w-full bg-[#2E1E17] hover:bg-black text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-widest transition cursor-pointer"
                          >
                            Publish Trust Broadcast
                          </button>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Academic Audits */}
                  {superAdminSubTab === 'academic' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
                          <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
                            <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Global Student Academic Roster</h4>
                            <span className="text-[10px] text-[#FF733B] font-extrabold uppercase bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-100">Audit View</span>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left border-collapse">
                              <thead>
                                <tr className="border-b border-[#2E1E17]/10 text-gray-400 font-bold">
                                  <th className="py-2">Student Name</th>
                                  <th className="py-2">Class</th>
                                  <th className="py-2">Overall Score</th>
                                  <th className="py-2">Attendance</th>
                                  <th className="py-2 text-right">Academic Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {students.map((s) => (
                                  <tr key={s.id} className="border-b border-[#2E1E17]/5 hover:bg-gray-50/50 transition">
                                    <td className="py-3 flex items-center gap-2">
                                      <img src={s.avatar} alt="" className="w-6 h-6 rounded-full object-cover border border-[#2E1E17]/10" />
                                      <span className="font-bold text-[#2E1E17]">{s.name}</span>
                                    </td>
                                    <td className="py-3 text-gray-500">{s.class}</td>
                                    <td className="py-3 font-extrabold text-[#2E1E17]">{s.grade}%</td>
                                    <td className="py-3 uppercase font-semibold text-[10px] text-gray-600">{s.attendance}</td>
                                    <td className="py-3 text-right">
                                      {s.atRisk ? (
                                        <button 
                                          onClick={() => handleScheduleMeeting(s.name)}
                                          className="text-[9px] font-extrabold bg-red-50 hover:bg-red-100 text-red-600 px-2 py-0.5 rounded-lg border border-red-200 cursor-pointer"
                                        >
                                          Schedule Parent Meeting
                                        </button>
                                      ) : (
                                        <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg border border-emerald-200">
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

                        {/* Faculty list audit */}
                        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between min-h-[300px]">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
                              <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Faculty Performance Scores</h4>
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Global</span>
                            </div>

                            <div className="space-y-3.5">
                              {teachers.map((t) => (
                                <div key={t.id} className="text-xs border-b border-[#2E1E17]/5 pb-2 text-left">
                                  <div className="flex justify-between items-center mb-1">
                                    <h5 className="font-extrabold text-[#2E1E17]">{t.name}</h5>
                                    <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5">
                                      <Star size={10} fill="currentColor" /> {t.score}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-[9px] text-gray-500">
                                    <span>Specialization: {t.specialization}</span>
                                    <span>Class: {t.class}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Scheduled Meetings */}
                      {meetingLogs.length > 0 && (
                        <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
                          <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
                            <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Scheduled Parent Meetings</h4>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {meetingLogs.map((log) => (
                              <div key={log.id} className="p-3.5 bg-[#FAF6F0]/40 border border-[#2E1E17]/5 rounded-2xl text-xs text-left flex justify-between items-center">
                                <div>
                                  <h5 className="font-extrabold text-[#2E1E17]">{log.studentName}</h5>
                                  <span className="text-[9.5px] text-gray-500 block mt-0.5">Date: {log.date} • Time: {log.time}</span>
                                  <span className="text-[8.5px] font-extrabold uppercase px-1.5 py-0.5 rounded border border-purple-200 bg-purple-50 text-purple-700 mt-2 inline-block">
                                    {log.status}
                                  </span>
                                </div>
                                <button 
                                  onClick={() => {
                                    setMeetingLogs(prev => prev.filter(m => m.id !== log.id));
                                    alert('Meeting logged and completed.');
                                  }}
                                  className="text-[9.5px] font-extrabold text-emerald-600 hover:text-emerald-700 uppercase cursor-pointer"
                                >
                                  Complete
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab 4: Finance Ledgers */}
                  {superAdminSubTab === 'finance' && (
                    <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
                        <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Global Student Tuition Fee Ledger</h4>
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100">Financial Audit</span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">
                          <thead>
                            <tr className="border-b border-[#2E1E17]/10 text-gray-400 font-bold">
                              <th className="py-2.5">Student Name</th>
                              <th className="py-2.5">Due Date</th>
                              <th className="py-2.5">Total Dues</th>
                              <th className="py-2.5">Amount Paid</th>
                              <th className="py-2.5 font-bold">Status</th>
                              <th className="py-2.5 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {feeLedger.map((fee) => (
                              <tr key={fee.studentId} className="border-b border-[#2E1E17]/5 hover:bg-gray-50/50 transition">
                                <td className="py-3 font-extrabold text-[#2E1E17]">{fee.studentName}</td>
                                <td className="py-3 text-gray-500 font-mono">{fee.dueDate}</td>
                                <td className="py-3 font-bold text-[#2E1E17]">${fee.amountDue}</td>
                                <td className="py-3 text-gray-500">${fee.amountPaid}</td>
                                <td className="py-3">
                                  <span className={`text-[8.5px] font-extrabold uppercase px-2 py-0.5 rounded border inline-block ${
                                    fee.status === 'paid' 
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                      : fee.status === 'partial'
                                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                                      : 'bg-red-50 text-red-700 border-red-200 animate-pulse'
                                  }`}>
                                    {fee.status}
                                  </span>
                                </td>
                                <td className="py-3 text-right">
                                  {fee.status !== 'paid' ? (
                                    <button 
                                      onClick={() => handlePayFee(fee.studentId)}
                                      className="text-[9px] font-extrabold bg-[#FF733B]/10 hover:bg-[#FF733B]/20 text-[#FF733B] px-2.5 py-1 rounded-lg border border-[#FF733B]/20 transition cursor-pointer"
                                    >
                                      Mark Paid
                                    </button>
                                  ) : (
                                    <button 
                                      onClick={() => {
                                        setFeeLedger(prev => prev.map(f => {
                                          if (f.studentId === fee.studentId) {
                                            return { ...f, status: 'unpaid', amountPaid: 0 };
                                          }
                                          return f;
                                        }));
                                        alert("Status reverted to unpaid.");
                                      }}
                                      className="text-[9px] font-extrabold bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-lg border border-gray-200 transition cursor-pointer"
                                    >
                                      Mark Unpaid
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 2. SCHOOL ADMIN WORKSPACE */}
              {activeRole === 'school_admin' && (
                <div className="space-y-6">
                  {/* Premium Admin Header Banner */}
                  <div className="bg-gradient-to-br from-[#2E1E17] to-[#4A3226] text-white p-6 rounded-3xl relative overflow-hidden shadow-xl border border-orange-500/10">
                    <div className="absolute right-[-5%] top-[-20%] w-64 h-64 bg-[#FF733B]/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[9px] bg-[#FF733B] text-white font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider inline-block">
                          Campus Administration
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold font-serif">School Operations Portal</h3>
                        <p className="text-xs text-white/70">
                          Active Node: <strong className="text-white">schooladmin@school.edu</strong> • Segment: <strong className="text-white">Classes 1-12</strong>
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3 rounded-2xl text-xs md:text-right">
                        <span className="text-[9px] uppercase tracking-widest text-white/60 font-bold block">Fee target</span>
                        <span className="font-extrabold text-[#FF733B] block mt-0.5">88.5% Collected</span>
                        <span className="text-[9px] text-emerald-400 font-semibold block mt-0.5">AY 2026-27 Term 1</span>
                      </div>
                    </div>
                  </div>

                  {/* School Settings + Broadcast Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Settings Panel */}
                    <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-5">
                      <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
                        <h4 className="text-sm font-bold text-[#2E1E17] font-serif">School Records Settings</h4>
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">Live</span>
                      </div>
                      
                      <div className="space-y-3.5 text-xs text-[#2E1E17]/80">
                        <div className="flex justify-between border-b border-[#2E1E17]/5 pb-2.5">
                          <span className="text-gray-500 font-semibold">Institution ID:</span>
                          <strong className="text-black">EDUKA-SV-091</strong>
                        </div>
                        <div className="flex justify-between border-b border-[#2E1E17]/5 pb-2.5">
                          <span className="text-gray-500 font-semibold">Active School Segment:</span>
                          <strong className="text-black">Class 1–12 School Segment</strong>
                        </div>
                        <div className="flex justify-between border-b border-[#2E1E17]/5 pb-2.5">
                          <span className="text-gray-500 font-semibold">Active Term Duration:</span>
                          <strong className="text-black">Sep 01 - Jun 30</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 font-semibold">Database Record Count:</span>
                          <strong className="text-emerald-600 font-bold">1,940 Logs Active</strong>
                        </div>
                      </div>

                      <div className="flex gap-2.5 pt-3">
                        <button 
                          onClick={() => setActiveTab('bulk_ingest')}
                          className="flex-1 bg-[#2E1E17]/5 hover:bg-[#2E1E17]/10 text-[#2E1E17] border border-[#2E1E17]/10 font-bold py-3 rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <UploadCloud size={14} /> Bulk Pupil Load
                        </button>
                        <button 
                          onClick={() => setActiveTab('fees_setup')}
                          className="flex-1 bg-[#FF733B] hover:bg-[#E6622E] text-white font-bold py-3 rounded-xl text-[10px] uppercase tracking-widest shadow-md flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <DollarSign size={14} /> Configure Fees
                        </button>
                      </div>
                    </div>

                    {/* Broadcast Compiler */}
                    <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
                        <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Publish Immediate Broadcast</h4>
                        <span className="text-[9.5px] text-[#FF733B] font-bold uppercase tracking-wider">Homeroom Dispatcher</span>
                      </div>

                      <form onSubmit={handlePublishBroadcast} className="space-y-3.5">
                        <div>
                          <label className="block text-[10px] text-gray-500 uppercase font-extrabold mb-1">Broadcast Header</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Term Schedule Update"
                            value={broadcastTitle}
                            onChange={(e) => setBroadcastTitle(e.target.value)}
                            className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none focus:border-[#FF733B] transition"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-500 uppercase font-extrabold mb-1">Target Role Audience</label>
                          <select 
                            value={broadcastTarget}
                            onChange={(e) => setBroadcastTarget(e.target.value)}
                            className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none focus:border-[#FF733B] transition"
                          >
                            <option value="all">All School Roles</option>
                            <option value="teachers">Teachers Only</option>
                            <option value="parents">Parents Only</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-500 uppercase font-extrabold mb-1">Content Text</label>
                          <textarea 
                            placeholder="Type messages here..." 
                            rows={2}
                            value={broadcastContent}
                            onChange={(e) => setBroadcastContent(e.target.value)}
                            className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] focus:outline-none focus:border-[#FF733B] transition"
                            required
                          ></textarea>
                        </div>
                        <button 
                          type="submit"
                          className="w-full bg-[#2E1E17] hover:bg-black text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-widest transition cursor-pointer"
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
                  {/* Premium Header Banner */}
                  <div className="bg-gradient-to-br from-[#451A03] to-[#2E1001] text-white p-6 rounded-3xl relative overflow-hidden shadow-xl border border-amber-500/10">
                    <div className="absolute right-[-10%] top-[-25%] w-72 h-72 bg-[#FF733B]/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[9px] bg-[#FF733B] text-white font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider inline-block">
                          Office of the Principal
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold font-serif">Academic Command Center</h3>
                        <p className="text-xs text-white/70">
                          User: <strong className="text-white font-bold">principal@school.edu</strong> • Campus Jurisdiction: <strong className="text-white">Active</strong>
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3 rounded-2xl text-xs md:text-right">
                        <span className="text-[9px] uppercase tracking-widest text-white/60 font-bold block">Annual target</span>
                        <span className="font-extrabold text-[#FF733B] block mt-0.5">100% Board Pass Rate</span>
                        <span className="text-[9px] text-emerald-400 font-semibold block mt-0.5">100% Faculty Certified</span>
                      </div>
                    </div>
                  </div>

                  {/* Overview Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { title: 'Campus Attendance', value: '94.8%', detail: 'Term 1 average', icon: UserCheck, color: 'text-[#FF733B] bg-orange-50 border-orange-500/10' },
                      { title: 'Fee Collection Progress', value: '88.5%', detail: '$4,200 remaining dues', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50 border-emerald-500/10' },
                      { title: 'Teacher Performance Index', value: '4.8 / 5.0', detail: 'Based on student feedback', icon: Award, color: 'text-amber-600 bg-amber-50 border-amber-500/10' },
                      { title: 'Academic Risk Roster', value: `${students.filter(s => s.atRisk).length} Pupil`, detail: 'Needs immediate support', icon: ShieldAlert, color: 'text-red-600 bg-red-50 border-red-500/10' }
                    ].map((stat, idx) => (
                      <div key={idx} className={`bg-white border rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:scale-[1.02] transition duration-300 cursor-pointer ${stat.color}`}>
                        <div className="p-3 rounded-xl bg-white border border-[#2E1E17]/5 shadow-sm">
                          <stat.icon size={20} />
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">{stat.title}</span>
                          <h4 className="text-xl font-bold text-[#2E1E17] mt-1">{stat.value}</h4>
                          <span className="text-[10px] text-gray-400 block mt-0.5 font-semibold">{stat.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cohort and Faculty reviews */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Academic Risk Roster Table */}
                    <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
                        <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Student Cohort Academic Standings</h4>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Class 10-A</span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">
                          <thead>
                            <tr className="border-b border-[#2E1E17]/10 text-gray-400 font-bold">
                              <th className="py-2.5">Student Name</th>
                              <th className="py-2.5">Roll ID</th>
                              <th className="py-2.5">Overall Score</th>
                              <th className="py-2.5">Attendance</th>
                              <th className="py-2.5 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {students.map((s) => (
                              <tr key={s.id} className={`border-b border-[#2E1E17]/5 hover:bg-gray-50/55 transition ${s.atRisk ? 'bg-red-50/30' : ''}`}>
                                <td className="py-3 flex items-center gap-2">
                                  <img src={s.avatar} alt="" className="w-6 h-6 rounded-full object-cover border border-[#2E1E17]/10" />
                                  <span className="font-bold text-[#2E1E17]">{s.name}</span>
                                </td>
                                <td className="py-3 text-gray-500 font-mono">{s.roll}</td>
                                <td className="py-3 font-extrabold text-[#2E1E17]">{s.grade}%</td>
                                <td className="py-3 uppercase font-semibold text-[10px] text-gray-600">{s.attendance}</td>
                                <td className="py-3 text-right">
                                  {s.atRisk ? (
                                    <button 
                                      onClick={() => handleScheduleMeeting(s.name)}
                                      className="text-[9px] font-extrabold bg-red-100 hover:bg-red-200 text-red-700 px-2.5 py-1 rounded-lg border border-red-200 transition cursor-pointer"
                                    >
                                      Schedule Parent Meeting
                                    </button>
                                  ) : (
                                    <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200">
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

                    {/* Faculty performance audits */}
                    <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between min-h-[300px]">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
                          <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Faculty Audit Roster</h4>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">AY 2026-27</span>
                        </div>

                        <div className="space-y-3.5">
                          {teachers.map((t) => (
                            <div key={t.id} className="text-xs border-b border-[#2E1E17]/5 pb-2 text-left">
                              <div className="flex justify-between items-center mb-1">
                                <h5 className="font-extrabold text-[#2E1E17]">{t.name}</h5>
                                <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5">
                                  <Star size={10} fill="currentColor" /> {t.score}
                                </span>
                              </div>
                              <div className="flex justify-between text-[9px] text-gray-500">
                                <span>Specialization: {t.specialization}</span>
                                <span>Class: {t.class}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scheduled Parent Meetings Section */}
                  {meetingLogs.length > 0 && (
                    <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
                        <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Scheduled Parent Meetings Board</h4>
                        <span className="text-[9.5px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded font-extrabold uppercase">Principal Log</span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {meetingLogs.map((log) => (
                          <div key={log.id} className="p-3.5 bg-[#FAF6F0]/40 border border-[#2E1E17]/5 rounded-2xl text-xs text-left flex justify-between items-start gap-4">
                            <div>
                              <h5 className="font-extrabold text-[#2E1E17]">{log.studentName}</h5>
                              <span className="text-[9.5px] text-gray-500 block mt-0.5">Date: {log.date} • Time: {log.time}</span>
                              <span className="text-[8.5px] font-extrabold uppercase px-1.5 py-0.5 rounded border border-purple-200 bg-purple-50 text-purple-700 mt-2 inline-block">
                                {log.status}
                              </span>
                            </div>
                            <button 
                              onClick={() => {
                                setMeetingLogs(prev => prev.filter(m => m.id !== log.id));
                                alert('Meeting completed and logged.');
                              }}
                              className="text-[9.5px] font-extrabold text-emerald-600 hover:text-emerald-700 uppercase cursor-pointer"
                            >
                              Mark Done
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 4. TEACHER WORKSPACE */}
              {activeRole === 'teacher' && (
                <div className="space-y-6">
                  {/* Premium Teacher Header Banner */}
                  <div className="bg-gradient-to-br from-[#064E3B] to-[#022C22] text-white p-6 rounded-3xl relative overflow-hidden shadow-xl border border-emerald-500/10">
                    <div className="absolute right-[-10%] top-[-25%] w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1 flex flex-col items-start text-left">
                        <span className="text-[9px] bg-emerald-600 text-white font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider inline-block">
                          Faculty Workspace
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold font-serif mt-1.5">Homeroom Advisor Console</h3>
                        <p className="text-xs text-white/70">
                          Teacher: <strong className="text-white">Dr. Christopher Vance</strong> • Classroom: <strong className="text-white">Grade 10-A (Room 101)</strong>
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3 rounded-2xl text-xs md:text-right">
                        <span className="text-[9px] uppercase tracking-widest text-white/60 font-bold block">Section stats</span>
                        <span className="font-extrabold text-[#FF733B] block mt-0.5">{students.length} Enrolled Pupils</span>
                        <span className="text-[9.5px] text-emerald-400 font-semibold block mt-0.5">Today Attendance: 98%</span>
                      </div>
                    </div>
                  </div>

                  {/* Teacher Action Boards */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Telemetry Panel */}
                    <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
                          <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Class Section Telemetry</h4>
                          <span className="text-[10px] text-emerald-600 font-extrabold uppercase bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">AY 2026-27</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                          You are currently assigned to **Grade 10 - Section A** for Mathematics and General Science courses. Active rosters are connected to the central SQL trust database.
                        </p>
                      </div>

                      <div className="flex gap-2.5 mt-4">
                        <button 
                          onClick={() => setActiveTab('attendance')}
                          className="flex-1 bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-widest shadow-md flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <UserCheck size={14} /> Mark Attendance
                        </button>
                        <button 
                          onClick={() => setActiveTab('gradebook')}
                          className="flex-1 bg-[#2E1E17]/5 hover:bg-[#2E1E17]/10 text-[#2E1E17] border border-[#2E1E17]/10 font-bold py-3 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <FileText size={14} /> Enter Scores
                        </button>
                      </div>
                    </div>

                    {/* Teacher parent messenger */}
                    <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
                        <h4 className="text-sm font-bold text-[#2E1E17] font-serif flex items-center gap-1.5">
                          <MessageSquare size={16} className="text-emerald-600" />
                          Parent Direct Messenger
                        </h4>
                        <span className="text-[9px] uppercase tracking-widest text-[#FF733B] font-extrabold">Active Logs</span>
                      </div>

                      <div className="flex flex-col h-[200px]">
                        <div className="flex-1 overflow-y-auto space-y-2.5 mb-3 pr-1 text-xs text-left">
                          {parentMessages.map((m, idx) => (
                            <div key={idx} className={`p-2.5 rounded-2xl max-w-[85%] ${
                              m.sender === 'teacher' 
                                ? 'bg-emerald-600 text-white ml-auto shadow-md' 
                                : 'bg-[#FAF6F0] text-[#2E1E17] mr-auto border border-[#2E1E17]/5 shadow-sm'
                            }`}>
                              <p className="leading-relaxed font-semibold">{m.text}</p>
                              <span className={`text-[8.5px] block mt-1 text-right ${
                                m.sender === 'teacher' ? 'text-white/70' : 'text-gray-400'
                              }`}>{m.date}</span>
                            </div>
                          ))}
                        </div>

                        <form onSubmit={handleTeacherSendMsg} className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Send warnings or updates..."
                            value={teacherNewMsg}
                            onChange={(e) => setTeacherNewMsg(e.target.value)}
                            className="flex-1 py-2 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] placeholder-gray-400 focus:outline-none focus:border-[#FF733B] transition"
                          />
                          <button 
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-4 py-2 rounded-xl text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition cursor-pointer"
                          >
                            Send
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. STUDENT COMPASS HUB */}
              {activeRole === 'student' && (
                <div className="space-y-6">
                  {/* Premium Welcome Panel */}
                  <div className="bg-gradient-to-br from-[#2E1E17] to-[#4A3226] text-white p-6 rounded-3xl relative overflow-hidden shadow-xl border border-[#FF733B]/10">
                    <div className="absolute right-[-5%] top-[-20%] w-64 h-64 bg-[#FF733B]/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute left-[-10%] bottom-[-30%] w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1.5 text-left">
                        <span className="text-[10px] bg-[#FF733B] text-white font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider inline-block">
                          Active Student Workspace
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold font-serif">Welcome back, {students[0]?.name}! 👋</h3>
                        <p className="text-xs text-white/70 font-medium">
                          Class: <strong className="text-white">{students[0]?.class}</strong> • House: <strong className="text-white">Phoenix House 🔥</strong> • Roll: <strong className="text-white">{students[0]?.roll}</strong>
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3 rounded-2xl text-xs md:text-right">
                        <span className="text-[9px] uppercase tracking-widest text-white/60 font-bold block">Current Milestone</span>
                        <span className="font-extrabold text-[#FF733B] block mt-0.5">Stream Specialization (Class 11)</span>
                        <span className="text-[9.5px] text-emerald-400 font-semibold block mt-0.5">Academic standing: Strong</span>
                      </div>
                    </div>
                  </div>

                  {/* High-Fidelity Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { title: 'Academic Score', value: `${students[0]?.grade}%`, detail: 'Ranked 3rd in Class', icon: Award, color: 'text-orange-600 bg-orange-50 border-orange-500/10' },
                      { title: 'Term Attendance', value: '98.2%', detail: '0 Unexcused Absences', icon: UserCheck, color: 'text-emerald-600 bg-emerald-50 border-emerald-500/10' },
                      { title: 'Homework Status', value: algebraHWStatus === 'Pending' ? '14 / 16' : '15 / 16', detail: algebraHWStatus === 'Pending' ? '1 Pending Task' : '0 Pending Tasks', icon: FileText, color: 'text-purple-600 bg-purple-50 border-purple-500/10' },
                      { title: 'House Points', value: '450 pts', detail: '+50 gained yesterday', icon: Star, color: 'text-amber-600 bg-amber-50 border-amber-500/10' }
                    ].map((stat, idx) => (
                      <div key={idx} className={`bg-white border rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:scale-[1.02] transition duration-300 cursor-pointer ${stat.color}`}>
                        <div className="p-3 rounded-xl bg-white border border-[#2E1E17]/5 shadow-sm">
                          <stat.icon size={20} />
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">{stat.title}</span>
                          <h4 className="text-xl font-bold text-[#2E1E17] mt-1">{stat.value}</h4>
                          <span className="text-[10px] text-gray-400 block mt-0.5 font-semibold">{stat.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Timetable schedule and Grades Progress */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Period Timeline Schedule */}
                    <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
                        <h4 className="text-sm font-bold text-[#2E1E17] font-serif font-serif">Today's Daily Timetable</h4>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">AY 2026-27</span>
                      </div>

                      <div className="space-y-3.5">
                        {[
                          { time: '08:30 AM - 09:30 AM', subject: 'Mathematics', teacher: 'Dr. Christopher Vance', room: 'Room 101', active: true },
                          { time: '10:00 AM - 11:00 AM', subject: 'General Science', teacher: 'Sarah Lin, M.Sc.', room: 'Science Lab', next: true },
                          { time: '11:30 AM - 12:30 PM', subject: 'English Grammar', teacher: 'Prof. Alistair Cook', room: 'Room 103' },
                          { time: '01:30 PM - 02:30 PM', subject: 'Computer Studies', teacher: 'Homeroom Advisor', room: 'Computer Lab' }
                        ].map((period, index) => (
                          <div key={index} className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition duration-200 ${
                            period.active 
                              ? 'border-emerald-500/20 bg-emerald-50/40' 
                              : period.next 
                              ? 'border-amber-500/20 bg-amber-50/40'
                              : 'border-[#2E1E17]/5 bg-[#FAF6F0]/40'
                          }`}>
                            <div className="flex items-start gap-3 text-left">
                              <span className="text-[11px] font-extrabold text-[#FF733B] bg-white border border-[#2E1E17]/10 rounded-xl px-2.5 py-1 text-center shadow-sm whitespace-nowrap">
                                Period {index + 1}
                              </span>
                              <div>
                                <h5 className="text-xs font-bold text-[#2E1E17]">{period.subject}</h5>
                                <span className="text-[10px] text-gray-400 font-semibold">{period.teacher} • Room {period.room}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 self-start sm:self-center">
                              <span className="text-[9.5px] text-gray-400 font-bold">{period.time}</span>
                              {period.active && (
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block"></span>
                              )}
                              {period.next && (
                                <span className="text-[8px] bg-amber-100 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded font-extrabold uppercase">Next</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Course Marks Progression */}
                    <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4 flex flex-col justify-between">
                      <div className="border-b border-[#2E1E17]/5 pb-3">
                        <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Subject Mark Progression</h4>
                      </div>

                      <div className="space-y-4 py-2">
                        {[
                          { subject: 'Mathematics (Algebra)', score: students[0]?.mathGrade || 92, max: 100, color: 'bg-[#FF733B]' },
                          { subject: 'General Science (Physics)', score: students[0]?.physGrade || 88, max: 100, color: 'bg-blue-500' },
                          { subject: 'English Language', score: students[0]?.engGrade || 95, max: 100, color: 'bg-emerald-500' },
                          { subject: 'Computer Studies', score: 94, max: 100, color: 'bg-purple-500' }
                        ].map((prog, idx) => (
                          <div key={idx} className="space-y-1.5 text-xs text-left">
                            <div className="flex justify-between font-bold text-[#2E1E17]/90">
                              <span>{prog.subject}</span>
                              <span>{prog.score} / {prog.max}</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                              <div className={`h-full ${prog.color} rounded-full`} style={{ width: `${(prog.score / prog.max) * 100}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={() => setActiveTab('roadmap')}
                        className="w-full bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-widest hover:scale-[1.02] transition shadow-lg shadow-orange-500/25 flex items-center justify-center gap-1.5 mt-2 cursor-pointer"
                      >
                        <Award size={14} /> Open AI Academic Roadmap
                      </button>
                    </div>
                  </div>

                  {/* Homework and AI study coach widget */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Homework list */}
                    <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
                        <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Class Assignments & Projects</h4>
                        <span className="text-[9.5px] bg-[#FF733B]/10 text-[#FF733B] border border-[#FF733B]/20 px-2 py-0.5 rounded font-extrabold uppercase">Active</span>
                      </div>

                      <div className="space-y-3.5">
                        <div className="p-3.5 bg-[#FAF6F0]/40 border border-[#2E1E17]/5 rounded-2xl text-xs text-left flex justify-between items-center gap-4">
                          <div>
                            <h5 className="font-extrabold text-[#2E1E17]">Algebra Practice Sheet</h5>
                            <span className="text-[10px] text-gray-400 font-semibold block mt-0.5">Due: July 10, 2026 • Teacher: Dr. Vance</span>
                            <span className={`text-[8.5px] font-extrabold uppercase px-1.5 py-0.5 rounded border mt-1.5 inline-block ${
                              algebraHWStatus === 'Pending' 
                                ? 'bg-amber-50 text-amber-700 border-amber-200' 
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}>
                              {algebraHWStatus}
                            </span>
                          </div>
                          {algebraHWStatus === 'Pending' ? (
                            <button 
                              onClick={handleUploadHomework}
                              className="bg-white border border-[#2E1E17]/10 hover:border-black text-[#2E1E17] font-extrabold text-[10px] px-3.5 py-2 rounded-xl transition duration-200 shadow-sm whitespace-nowrap cursor-pointer"
                            >
                              Upload File
                            </button>
                          ) : (
                            <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-wider">Submitted</span>
                          )}
                        </div>

                        <div className="p-3.5 bg-[#FAF6F0]/40 border border-[#2E1E17]/5 rounded-2xl text-xs text-left flex justify-between items-center gap-4">
                          <div>
                            <h5 className="font-extrabold text-[#2E1E17]">Science Optics Lab Report</h5>
                            <span className="text-[10px] text-gray-400 font-semibold block mt-0.5">Due: July 15, 2026 • Teacher: Mrs. Lin</span>
                            <span className="text-[8.5px] font-extrabold uppercase px-1.5 py-0.5 rounded border mt-1.5 inline-block bg-purple-50 text-purple-700 border-purple-200">
                              In Progress
                            </span>
                          </div>
                          <button 
                            onClick={() => alert('Mock science report started. Resources are loading.')}
                            className="bg-white border border-[#2E1E17]/10 hover:border-black text-[#2E1E17] font-extrabold text-[10px] px-3.5 py-2 rounded-xl transition duration-200 shadow-sm whitespace-nowrap cursor-pointer"
                          >
                            Open Lab
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* AI Chat Buddy */}
                    <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
                        <h4 className="text-sm font-bold text-[#2E1E17] font-serif flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
                          Study Buddy AI Coach
                        </h4>
                        <span className="text-[9px] uppercase tracking-widest text-[#FF733B] font-extrabold bg-[#FF733B]/5 border border-[#FF733B]/10 px-2 py-0.5 rounded-lg">Online</span>
                      </div>

                      <div className="flex flex-col h-[180px]">
                        <div className="flex-1 overflow-y-auto space-y-2.5 mb-3 pr-1 text-xs text-left scrollbar-thin">
                          {studentChatMessages.map((m, idx) => (
                            <div key={idx} className={`p-2.5 rounded-2xl max-w-[85%] ${
                              m.sender === 'student' 
                                ? 'bg-[#FF733B] text-white ml-auto shadow-md' 
                                : 'bg-[#FAF6F0] text-[#2E1E17] mr-auto border border-[#2E1E17]/5 shadow-sm'
                            }`}>
                              <p className="leading-relaxed font-semibold">{m.text}</p>
                              <span className={`text-[8px] block mt-1 text-right ${
                                m.sender === 'student' ? 'text-white/70' : 'text-gray-400'
                              }`}>{m.date}</span>
                            </div>
                          ))}
                        </div>
                        <form onSubmit={handleStudentSendChat} className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Ask Study Buddy (e.g. 'Math', 'Science')..."
                            value={studentChatInput}
                            onChange={(e) => setStudentChatInput(e.target.value)}
                            className="flex-1 py-2 px-3.5 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] placeholder-gray-400 focus:outline-none focus:border-[#FF733B] transition"
                          />
                          <button 
                            type="submit"
                            className="bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold px-4 py-2 rounded-xl text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition cursor-pointer"
                          >
                            Send
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. PARENT TELEMETRY PORTAL */}
              {activeRole === 'parent' && (
                <div className="space-y-6">
                  {/* Premium Parent Header Banner */}
                  <div className="bg-gradient-to-br from-[#2E1E17] to-[#3D251A] text-white p-6 rounded-3xl relative overflow-hidden shadow-xl border border-purple-500/10">
                    <div className="absolute right-[-5%] top-[-20%] w-64 h-64 bg-[#FF733B]/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1 text-left">
                        <span className="text-[9px] bg-[#FF733B] text-white font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider inline-block">
                          Parent Portal Workspace
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold font-serif">Scholar Telemetry: Alexander Vance</h3>
                        <p className="text-xs text-white/70">
                          Grade: <strong className="text-white">Grade 10-A</strong> • Homeroom Advisor: <strong className="text-white">Dr. Christopher Vance</strong>
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-3 rounded-2xl text-xs md:text-right">
                        <span className="text-[9px] uppercase tracking-widest text-white/60 font-bold block">Attendance today</span>
                        <span className="font-extrabold text-[#FF733B] block mt-0.5">Present & Active</span>
                        <span className="text-[9px] text-emerald-400 font-semibold block mt-0.5">Logged in: 08:30 AM</span>
                      </div>
                    </div>
                  </div>

                  {/* Scholar Summary Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="bg-white rounded-2xl p-4 border border-[#2E1E17]/10 shadow-sm cursor-pointer hover:scale-[1.02] transition-transform">
                      <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Overall Grade Average</span>
                      <h5 className="text-2xl font-extrabold text-[#2E1E17] mt-1">92.5%</h5>
                      <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">Grade A (Passing)</span>
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-[#2E1E17]/10 shadow-sm cursor-pointer hover:scale-[1.02] transition-transform">
                      <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Term Attendance</span>
                      <h5 className="text-2xl font-extrabold text-[#2E1E17] mt-1">98.2%</h5>
                      <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">0 Unexcused Absences</span>
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-[#2E1E17]/10 shadow-sm cursor-pointer hover:scale-[1.02] transition-transform">
                      <span className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Assignments Completed</span>
                      <h5 className="text-2xl font-extrabold text-[#2E1E17] mt-1">15 / 16</h5>
                      <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">1 Grading Pending</span>
                    </div>
                  </div>

                  {/* Grade curves and fee ledger columns */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Course Grade Curves */}
                    <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
                        <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Subject Wise Grade Curves</h4>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Mid-Term AY 2026</span>
                      </div>

                      <div className="space-y-3.5">
                        {[
                          { subject: 'Mathematics (Algebra & Geometry)', score: 92, status: 'Outstanding', color: 'text-[#FF733B]' },
                          { subject: 'Science (Physics & Chemistry)', score: 88, status: 'Satisfactory', color: 'text-[#2E1E17]' },
                          { subject: 'Computer Studies (Coding & Logic)', score: 95, status: 'Outstanding', color: 'text-purple-600' }
                        ].map((s, idx) => (
                          <div key={idx} className="p-3.5 bg-[#FAF6F0]/40 rounded-2xl border border-[#2E1E17]/5 text-xs text-left flex items-center justify-between gap-4 transition hover:bg-[#FAF6F0]/80 cursor-pointer">
                            <div>
                              <strong className="text-[#2E1E17] block font-bold">{s.subject}</strong>
                              <span className="text-[9.5px] text-gray-500 block mt-0.5">Status: <strong className={s.color}>{s.status}</strong></span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-extrabold text-[#2E1E17] block">{s.score}%</span>
                              <span className="text-[9px] text-emerald-600 font-bold block">Passing Grade</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Outstanding fee ledger */}
                    <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#2E1E17]/10 shadow-sm flex flex-col justify-between min-h-[350px]">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-[#2E1E17]/5 pb-3">
                          <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Tuition Fee Ledger</h4>
                          <span className="text-[9.5px] text-gray-400 font-bold uppercase tracking-wider">Balances</span>
                        </div>

                        <div className="space-y-3">
                          {feeLedger.slice(0, 3).map((fee, idx) => (
                            <div key={idx} className="p-3 bg-[#FAF6F0]/40 rounded-2xl border border-[#2E1E17]/5 text-left flex justify-between items-center transition cursor-pointer">
                              <div>
                                <h5 className="font-extrabold text-[#2E1E17]">{fee.studentName}</h5>
                                <span className="text-[9.5px] text-gray-500 block mt-0.5">Due: {fee.dueDate}</span>
                              </div>
                              <div className="text-right flex flex-col items-end">
                                <span className="text-xs font-extrabold text-[#2E1E17] block">${fee.amountDue - fee.amountPaid}</span>
                                {fee.status !== 'paid' ? (
                                  <button 
                                    onClick={() => handlePayFee(fee.studentId)}
                                    className="text-[8px] bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded font-extrabold uppercase mt-1 transition animate-pulse cursor-pointer"
                                  >
                                    Pay ${fee.amountDue - fee.amountPaid}
                                  </button>
                                ) : (
                                  <span className="text-[8px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-extrabold uppercase mt-1 inline-block">
                                    Paid
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
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
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1 cursor-pointer"
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
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1 cursor-pointer"
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
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-widest transition flex items-center gap-2 cursor-pointer"
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
                <div className="text-left">
                  <h3 className="text-base font-bold text-[#2E1E17] flex items-center gap-1.5">
                    Daily Attendance Matrix 
                    {attendanceLocked ? <Lock size={14} className="text-red-500" /> : <Unlock size={14} className="text-emerald-500" />}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Class: Grade 10-Section A • Roster Size: {students.length}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => {
                      setStudents(students.map(s => ({ ...s, attendance: 'present' })));
                      alert('Roster set to present.');
                    }}
                    disabled={attendanceLocked}
                    className="bg-[#2E1E17]/5 hover:bg-[#2E1E17]/10 text-[#2E1E17] border border-[#2E1E17]/10 text-[10px] font-extrabold uppercase px-3 py-2 rounded-lg transition cursor-pointer"
                  >
                    Mark All Present
                  </button>
                  <button 
                    type="button"
                    onClick={lockAttendanceLogs}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-400 text-white text-[10px] font-extrabold uppercase px-4 py-2 rounded-lg transition shadow-md cursor-pointer"
                  >
                    Lock Telemetry Log
                  </button>
                  {attendanceLocked && (
                    <button 
                      type="button"
                      onClick={unlockAttendanceLogs}
                      className="bg-red-50 text-red-600 border border-red-200 text-[9px] font-bold px-2.5 py-2 rounded-lg transition cursor-pointer"
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
              <div className="border-b border-[#2E1E17]/10 pb-4 text-left">
                <h3 className="text-base font-bold text-[#2E1E17]">Gradebook & Terminal Marks Entry</h3>
                <p className="text-xs text-gray-400 mt-1">Compile subject scores to generate automated reports cards.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#2E1E17]/10 shadow-sm">
                  <h4 className="text-xs font-bold uppercase text-gray-400 mb-3 text-left">Update Mathematics Marks</h4>
                  
                  <form onSubmit={updateStudentGrade} className="space-y-4 text-xs text-left">
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
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-400 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-widest shadow-md cursor-pointer"
                    >
                      Save Score & Compile
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-[#2E1E17]/10 shadow-sm">
                  <h4 className="text-xs font-bold uppercase text-gray-400 mb-3 text-left">Report Card Output Preview</h4>
                  {(() => {
                    const selectedStudent = students.find(s => s.id === newMathGrade.studentId) || students[0];
                    return (
                      <div className="border border-[#2E1E17]/10 rounded-xl p-4 bg-[#FAF6F0] text-xs space-y-3 text-left">
                        <div className="flex justify-between border-b border-[#2E1E17]/10 pb-2">
                          <div>
                            <h5 className="font-bold text-[#2E1E17]">{selectedStudent.name}</h5>
                            <span className="text-[9px] text-gray-400">{selectedStudent.roll} • {selectedStudent.class}</span>
                          </div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase">Term 1 Report</span>
                        </div>

                        <div className="space-y-1.5 font-semibold text-gray-600">
                          <div className="flex justify-between">
                            <span>Subject: Mathematics:</span>
                            <strong className="text-[#2E1E17]">{selectedStudent.mathGrade}%</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Subject: General Science:</span>
                            <strong className="text-[#2E1E17]">{selectedStudent.physGrade}%</strong>
                          </div>
                          <div className="flex justify-between">
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
              <h3 className="text-base font-bold text-[#2E1E17] mb-2 text-left">Text Messenger (Assigned Subject Teachers)</h3>
              
              <div className="h-48 overflow-y-auto space-y-2 border border-[#2E1E17]/10 rounded-xl p-4 bg-[#FAF6F0] text-xs">
                {parentMessages.map((m, idx) => (
                  <div key={idx} className={`p-2.5 rounded-lg max-w-[85%] ${m.sender === 'parent' ? 'bg-purple-600 text-white ml-auto shadow-md' : 'bg-white border border-[#2E1E17]/5 text-[#2E1E17] mr-auto'}`}>
                    <p className="leading-relaxed font-semibold">{m.text}</p>
                    <span className="text-[8px] text-gray-400 block mt-1 text-right">{m.date}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleParentSendMsg} className="flex gap-2 text-xs">
                <input 
                  type="text" 
                  placeholder="Ask teachers regarding grades or attendance..."
                  value={parentNewMsg}
                  onChange={(e) => setParentNewMsg(e.target.value)}
                  className="flex-1 py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                />
                <button 
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-widest transition cursor-pointer"
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
