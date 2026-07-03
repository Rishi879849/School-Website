import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ParticleBackground from './components/ParticleBackground';
import MarketingSite from './components/MarketingSite';
import Dashboards from './components/Dashboards';
import AIChatMentor from './components/AIChatMentor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import PortalLayout from './components/rbac/PortalLayout';

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

import { login as apiLogin, logout as apiLogout, fetchCurrentUser } from './services/auth.js';

function App() {
  // The authenticated user, or null. Hydrated from /api/auth/me on mount.
  const [currentUser, setCurrentUser] = useState(null);
  const [isHydrating, setIsHydrating] = useState(true);

  // On first mount, ask the server: "is there a session?" If yes, restore it.
  // This makes refreshes survive — without it, refreshing after login would
  // drop the user back to the public site even though the cookie is still set.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const user = await fetchCurrentUser();
        if (!cancelled) setCurrentUser(user);
      } catch {
        // 401 is expected when not logged in. The api.js interceptor already
        // handled the offline/refresh dance; here we just give up cleanly.
        if (!cancelled) setCurrentUser(null);
      } finally {
        if (!cancelled) setIsHydrating(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleLoginUser = async (email, password) => {
    try {
      const user = await apiLogin(email, password);
      setCurrentUser(user);
      return true;
    } catch (err) {
      // Surface the server's error message to the LoginPage if it wants to display it.
      const message = err?.response?.data?.error || 'Login failed.';
      throw new Error(message);
    }
  };

  const handleLogout = async () => {
    try { await apiLogout(); } catch { /* ignore — we're logging out anyway */ }
    setCurrentUser(null);
  };

  // While hydrating, show a minimal splash so we don't flash the marketing site
  // for users who are already logged in.
  if (isHydrating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0] text-[#2E1E17]/50 text-xs font-bold uppercase tracking-widest">
        Loading workspace…
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Subtle light particle canvas background */}
      <ParticleBackground role={currentUser ? currentUser.role : 'brand'} />

      {/* Role State Routing */}
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
