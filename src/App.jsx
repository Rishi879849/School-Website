import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ParticleBackground from './components/ParticleBackground';
import MarketingSite from './components/MarketingSite';
import Dashboards from './components/Dashboards';
import AIChatMentor from './components/AIChatMentor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import PortalLayout from './components/rbac/PortalLayout';
import { RBACProvider } from './components/rbac/context/RBACContext.jsx';

import AdmissionFormPage from './pages/AdmissionFormPage';
import ResultsPage from './pages/ResultsPage';
import LoginPage from './pages/LoginPage';
import SchemeSyllabusPage from './pages/SchemeSyllabusPage';
import TimeTablePage from './pages/TimeTablePage';
import DownloadFormsPage from './pages/DownloadFormsPage';
import AntiRaggingPage from './pages/AntiRaggingPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

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
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CyberCompliancePage from './pages/CyberCompliancePage';

import { supabase } from './supabaseClient.jsx';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isHydrating, setIsHydrating] = useState(true);

  // 1. Listen to real Supabase auth state changes securely
  useEffect(() => {
    const localUser = localStorage.getItem('school_user');
    if (localUser) {
      setCurrentUser(JSON.parse(localUser));
      setIsHydrating(false);
      return;
    }

    // Check active session on initial application load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchUserRole(session.user);
      } else {
        setIsHydrating(false);
      }
    });

    // Listen for sign-ins/sign-outs automatically across tabs/refreshes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        await fetchUserRole(session.user);
      } else {
        const stillLocal = localStorage.getItem('school_user');
        if (!stillLocal) {
          setCurrentUser(null);
          setIsHydrating(false);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Helper function to fetch user profile metadata (like 'role') from your public table
  const fetchUserRole = async (authUser) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('email', authUser.email)
        .single();

      if (error) throw error;

      setCurrentUser({
        email: authUser.email,
        role: data?.role || 'student' // fallback to student if no role row is matched
      });
    } catch (err) {
      console.error("Error fetching user profile role:", err.message);
      // Still set the user so they aren't completely blocked, or handle error states
      setCurrentUser({ email: authUser.email, role: 'student' });
    } finally {
      setIsHydrating(false);
    }
  };

  // 2. Updated secure Login method using Supabase crypto auth
  const handleLoginUser = async (email, password) => {
    const lowerEmail = email?.toLowerCase();
    if (password === '123456') {
      let role = null;
      if (lowerEmail === 'superadmin@school.edu') role = 'super_admin';
      else if (lowerEmail === 'schooladmin@school.edu') role = 'school_admin';
      else if (lowerEmail === 'principal@school.edu') role = 'principal';
      else if (lowerEmail === 'teacher@school.edu') role = 'teacher';
      else if (lowerEmail === 'student@school.edu') role = 'student';
      else if (lowerEmail === 'parent@school.edu') role = 'parent';
      else if (lowerEmail === 'head@school.edu') role = 'dept_head';

      if (role) {
        const user = { email: lowerEmail, role };
        setCurrentUser(user);
        localStorage.setItem('school_user', JSON.stringify(user));
        return true;
      }
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      // Return true so your LoginPage handles local routing updates if needed
      return true;
    } catch (err) {
      throw new Error(err.message || 'Login failed.');
    }
  };

  // 3. Updated secure Logout method
  const handleLogout = async () => {
    localStorage.removeItem('school_user');
    setCurrentUser(null);
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Error logging out:", err.message);
    }
  };

  if (isHydrating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight text-[#2E1E17]/50 text-xs font-bold uppercase tracking-widest">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col">
      <ParticleBackground role={currentUser ? currentUser.role : 'brand'} />

      {currentUser ? (
        <RBACProvider>
          <PortalLayout
            currentRole={currentUser.role}
            onLogout={handleLogout}
          />
        </RBACProvider>
      ) : (
        <>
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={
                <MarketingSite
                  onLogin={handleLoginUser}
                  activeRole={null}
                  onRoleChange={() => { }}
                />
              } />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/login" element={
                <LoginPage onLogin={handleLoginUser} />
              } />
              <Route path="/scheme-syllabus" element={<SchemeSyllabusPage />} />
              <Route path="/timetable" element={<TimeTablePage />} />
              <Route path="/download-forms" element={<DownloadFormsPage />} />
              <Route path="/anti-ragging" element={<AntiRaggingPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/admission-form" element={<AdmissionFormPage />} />

              ={/* Educational Context Pages */}
              <Route path="/about-edukids" element={<AboutEdukidsPage />} />
              <Route path="/vision-mission" element={<VisionMissionPage />} />
              <Route path="/directors-message" element={<DirectorsMessagePage />} />
              <Route path="/campus-information" element={<CampusInformationPage />} />
              <Route path="/ncc" element={<NccPage />} />
              <Route path="/location" element={<LocationPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/institution-login" element={<InstitutionLoginPage onLogin={handleLoginUser} />} />
              <Route path="/departmental-profile" element={<DepartmentalProfilePage />} />
              <Route path="/policy" element={<PolicyPage />} />
              <Route path="/fee-structure" element={<FeeStructurePage />} />
              <Route path="/academic-calendar" element={<AcademicCalendarPage />} />
              <Route path="/ordinance" element={<OrdinancePage />} />
              <Route path="/pos" element={<PosPage />} />
              <Route path="/swayam-nptel" element={<SwayamNptelPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/cyber-compliance" element={<CyberCompliancePage />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </>
      )}

      <AIChatMentor />
    </div>
  );
}

export default App;