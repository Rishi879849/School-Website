import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ParticleBackground from './components/ParticleBackground';
import MarketingSite from './components/MarketingSite';
import Dashboards from './components/Dashboards';
import AIChatMentor from './components/AIChatMentor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Sub-pages
import AdmissionFormPage from './pages/AdmissionFormPage';
import RegistrationPage from './pages/RegistrationPage';
import ResultsPage from './pages/ResultsPage';
import LoginPage from './pages/LoginPage';
import SchemeSyllabusPage from './pages/SchemeSyllabusPage';
import TimeTablePage from './pages/TimeTablePage';
import DownloadFormsPage from './pages/DownloadFormsPage';
import AntiRaggingPage from './pages/AntiRaggingPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// New Dropdown pages
import AboutEdukidsPage from './pages/AboutEdukidsPage';
import VisionMissionPage from './pages/VisionMissionPage';
import DirectorsMessagePage from './pages/DirectorsMessagePage';
import CampusInformationPage from './pages/CampusInformationPage';
import NccPage from './pages/NccPage';
import LocationPage from './pages/LocationPage';
import ContactUsPage from './pages/ContactUsPage';
import InstitutionLoginPage from './pages/InstitutionLoginPage';
import DepartmentalProfilePage from './pages/DepartmentalProfilePage';
import PolicyPage from './pages/PolicyPage';
import FeeStructurePage from './pages/FeeStructurePage';
import AcademicCalendarPage from './pages/AcademicCalendarPage';
import OrdinancePage from './pages/OrdinancePage';
import PosPage from './pages/PosPage';
import SwayamNptelPage from './pages/SwayamNptelPage';

function App() {
  const [activeRole, setActiveRole] = useState('student');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  // --- CORE MOCK DATABASE STATE (LIFTED TO APP LEVEL) ---
  const [registeredUsers, setRegisteredUsers] = useState([
    { email: 'superadmin@school.edu', password: '123456', role: 'super_admin' },
    { email: 'schooladmin@school.edu', password: '123456', role: 'school_admin' },
    { email: 'principal@school.edu', password: '123456', role: 'principal' },
    { email: 'teacher@school.edu', password: '123456', role: 'teacher' },
    { email: 'student@school.edu', password: '123456', role: 'student' },
    { email: 'parent@school.edu', password: '123456', role: 'parent' }
  ]);

  const [students, setStudents] = useState([
    { id: 'S101', name: 'Alexander Vance', roll: 'DTV-009-26', class: 'Grade 10-A', parentName: 'Marcus K. Sterling', attendance: 'present', grade: 92, mathGrade: 92, physGrade: 88, engGrade: 95, atRisk: false, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=60' },
    { id: 'S102', name: 'Elena Rostova', roll: 'DTV-014-26', class: 'Grade 10-A', parentName: 'Dimitri Rostov', attendance: 'present', grade: 94, mathGrade: 96, physGrade: 91, engGrade: 95, atRisk: false, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60' },
    { id: 'S103', name: 'Kaelen Miller', roll: 'DTV-031-26', class: 'Grade 10-A', parentName: 'John Miller', attendance: 'absent', grade: 64, mathGrade: 60, physGrade: 58, engGrade: 74, atRisk: true, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60' },
    { id: 'S104', name: 'Zoya Patel', roll: 'DTV-052-26', class: 'Grade 10-A', parentName: 'Rajesh Patel', attendance: 'present', grade: 88, mathGrade: 89, physGrade: 84, engGrade: 91, atRisk: false, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60' }
  ]);

  const [teachers, setTeachers] = useState([
    { id: 'T201', name: 'Dr. Christopher Vance', specialization: 'Mathematics', class: '10-A', score: 4.9 },
    { id: 'T202', name: 'Sarah Lin, M.Sc.', specialization: 'General Science', class: '10-B', score: 4.8 },
    { id: 'T203', name: 'Prof. Alistair Cook', specialization: 'Computer Studies', class: '11-A', score: 4.6 }
  ]);

  const [feeLedger, setFeeLedger] = useState([
    { studentId: 'S101', studentName: 'Alexander Vance', amountDue: 3500, amountPaid: 3500, dueDate: '2026-08-01', status: 'paid' },
    { studentId: 'S102', studentName: 'Elena Rostova', amountDue: 3500, amountPaid: 2000, dueDate: '2026-08-01', status: 'partial' },
    { studentId: 'S103', studentName: 'Kaelen Miller', amountDue: 3500, amountPaid: 0, dueDate: '2026-07-01', status: 'overdue' },
    { studentId: 'S104', studentName: 'Zoya Patel', amountDue: 3500, amountPaid: 3500, dueDate: '2026-08-01', status: 'paid' }
  ]);

  const [parentMessages, setParentMessages] = useState([
    { sender: 'teacher', text: "Hello Marcus, I noticed Alexander's physics score dropped slightly in unit test 3. I suggest reviewing the WebGL vectors module.", date: '2026-07-02 14:30' }
  ]);

  const [broadcasts, setBroadcasts] = useState([
    { id: 1, title: 'Term 1 Computational Lab Ingestion', content: 'All teachers must lock grade sheets by July 10th.', date: '2026-07-02', target: 'teachers', sender: 'School Admin' },
    { id: 2, title: 'DTV Virtual Fair Announcement', content: 'Parents are invited to review student virtual reality project twins on Aug 15.', date: '2026-07-01', target: 'all', sender: 'Principal' }
  ]);

  const [onboardingTenants, setOnboardingTenants] = useState([
    { id: 1, name: 'St. Xavier Academy', subdomain: 'xavier.dtv-eduka.com', users: 1850, date: '2026-06-28', status: 'active' },
    { id: 2, name: 'Hogwarts Tech High', subdomain: 'hogwarts.dtv-eduka.com', users: 240, date: '2026-07-01', status: 'provisioning' }
  ]);

  // --- REGISTRATION / LOGIN VALIDATIONS ---
  const handleRegisterUser = (newUserRecord) => {
    // 1. Add to auth credentials
    const credentials = {
      email: newUserRecord.email,
      password: newUserRecord.password,
      role: newUserRecord.role
    };
    setRegisteredUsers(prev => [...prev, credentials]);

    // 2. Add to students/teachers profiles if matching role
    if (newUserRecord.role === 'student') {
      const studentProfile = {
        id: `S${Date.now().toString().slice(-3)}`,
        name: `${newUserRecord.firstName} ${newUserRecord.lastName}`,
        roll: `DTV-0${Math.floor(Math.random()*80 + 10)}-26`,
        class: newUserRecord.grade || 'Grade 10-A',
        parentName: newUserRecord.parentName || 'Guardian',
        attendance: 'present',
        grade: 85,
        mathGrade: 85,
        physGrade: 80,
        engGrade: 90,
        atRisk: false,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60'
      };
      setStudents(prev => [...prev, studentProfile]);

      // Add default unpaid ledger
      setFeeLedger(prev => [...prev, {
        studentId: studentProfile.id,
        studentName: studentProfile.name,
        amountDue: 3500,
        amountPaid: 0,
        dueDate: '2026-08-01',
        status: 'unpaid'
      }]);
    } else if (newUserRecord.role === 'teacher') {
      const teacherProfile = {
        id: `T${Date.now().toString().slice(-3)}`,
        name: `${newUserRecord.firstName} ${newUserRecord.lastName}`,
        specialization: newUserRecord.specialization || 'General Studies',
        class: '10-A',
        score: 5.0
      };
      setTeachers(prev => [...prev, teacherProfile]);
    }
    return true;
  };

  const handleLoginUser = (email, password) => {
    const matchedUser = registeredUsers.find(u => u.email === email && u.password === password);
    if (matchedUser) {
      setActiveRole(matchedUser.role);
      setCurrentUserEmail(email);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUserEmail('');
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Subtle light particle canvas background */}
      <ParticleBackground role={isLoggedIn ? activeRole : 'brand'} />

      {/* Role State Routing */}
      {isLoggedIn ? (
        <Dashboards 
          activeRole={activeRole} 
          onLogout={handleLogout}
          students={students}
          setStudents={setStudents}
          teachers={teachers}
          setTeachers={setTeachers}
          feeLedger={feeLedger}
          setFeeLedger={setFeeLedger}
          parentMessages={parentMessages}
          setParentMessages={setParentMessages}
          broadcasts={broadcasts}
          setBroadcasts={setBroadcasts}
          onboardingTenants={onboardingTenants}
          setOnboardingTenants={setOnboardingTenants}
        />
      ) : (
        <>
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={
                <MarketingSite 
                  onLogin={handleLoginUser} 
                  onRegister={handleRegisterUser}
                  activeRole={activeRole} 
                  onRoleChange={setActiveRole} 
                />
              } />
              <Route path="/registration" element={<RegistrationPage onRegister={handleRegisterUser} />} />
              <Route path="/results" element={<ResultsPage students={students} />} />
              <Route path="/login" element={
                <LoginPage 
                  onLogin={handleLoginUser} 
                  activeRole={activeRole} 
                  onRoleChange={setActiveRole} 
                />
              } />
              <Route path="/scheme-syllabus" element={<SchemeSyllabusPage />} />
              <Route path="/timetable" element={<TimeTablePage />} />
              <Route path="/download-forms" element={<DownloadFormsPage />} />
              <Route path="/anti-ragging" element={<AntiRaggingPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/admission-form" element={<AdmissionFormPage />} />
              
              {/* New Dropdown page routes */}
              <Route path="/about-edukids" element={<AboutEdukidsPage />} />
              <Route path="/vision-mission" element={<VisionMissionPage />} />
              <Route path="/directors-message" element={<DirectorsMessagePage />} />
              <Route path="/campus-information" element={<CampusInformationPage />} />
              <Route path="/ncc" element={<NccPage />} />
              <Route path="/location" element={<LocationPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/institution-login" element={<InstitutionLoginPage />} />
              <Route path="/departmental-profile" element={<DepartmentalProfilePage />} />
              <Route path="/policy" element={<PolicyPage />} />
              <Route path="/fee-structure" element={<FeeStructurePage />} />
              <Route path="/academic-calendar" element={<AcademicCalendarPage />} />
              <Route path="/ordinance" element={<OrdinancePage />} />
              <Route path="/pos" element={<PosPage />} />
              <Route path="/swayam-nptel" element={<SwayamNptelPage />} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </>
      )}

      {/* Floating AI Mentor Chat Assistant */}
      <AIChatMentor />
    </div>
  );
}

export default App;
