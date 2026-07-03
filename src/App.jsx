import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ParticleBackground from './components/ParticleBackground';
import MarketingSite from './components/MarketingSite';
import Dashboards from './components/Dashboards';
import AIChatMentor from './components/AIChatMentor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import PortalLayout from './components/rbac/PortalLayout';

import AdmissionFormPage from './pages/AdmissionFormPage';
import RegistrationPage from './pages/RegistrationPage';
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

import { logout as apiLogout } from './services/auth.js';
import { supabase } from './supabaseClient'; 

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isHydrating, setIsHydrating] = useState(true);
  const [dbUsers, setDbUsers] = useState([]);
  const [dbLoading, setDbLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadSupabaseData() {
      try {
        setDbLoading(true);
        const { data, error } = await supabase.from('users').select('*');
        if (error) throw error;
        if (!cancelled && data) setDbUsers(data);
      } catch (err) {
        console.error("Error connecting to Supabase table:", err.message);
      } finally {
        if (!cancelled) {
          setDbLoading(false);
          setIsHydrating(false); 
        }
      }
    }

    loadSupabaseData();
    return () => { cancelled = true; };
  }, []);

  const handleLoginUser = async (email, password) => {
    try {
      const matchedUser = dbUsers.find(u => u.email?.toLowerCase() === email?.toLowerCase());
      
      if (matchedUser) {
        const userSession = {
          email: matchedUser.email,
          role: matchedUser.role || 'student'
        };
        setCurrentUser(userSession);
        return true;
      } else {
        throw new Error('User record not found in database.');
      }
    } catch (err) {
      throw new Error(err.message || 'Login failed.');
    }
  };

  const handleLogout = async () => {
    try { await apiLogout(); } catch { }
    setCurrentUser(null);
  };

  if (isHydrating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0] text-[#2E1E17]/50 text-xs font-bold uppercase tracking-widest">
        Loading workspace…
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col">
      <ParticleBackground role={currentUser ? currentUser.role : 'brand'} />

      {currentUser ? (
        <PortalLayout
          currentRole={currentUser.role}
          onLogout={handleLogout}
        />
      ) : (
        <>
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={
                <MarketingSite
                  onLogin={handleLoginUser}
                  activeRole={null}
                  onRoleChange={() => {}}
                />
              } />
              <Route path="/registration" element={<RegistrationPage />} />
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

      <AIChatMentor />
    </div>
  );
}

export default App;