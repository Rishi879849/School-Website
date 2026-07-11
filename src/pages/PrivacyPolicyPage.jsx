import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 text-left">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF733B] hover:text-[#E6622E] transition">
          <ArrowLeft size={14} /> Back to Homepage
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-[#2E1E17]/10 p-8 md:p-10 shadow-xl space-y-8 relative overflow-hidden">
        <div className="absolute right-[-5%] top-[-5%] w-[200px] h-[200px] bg-[#FF733B]/5 rounded-full blur-[40px] pointer-events-none" />

        <div className="space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B] flex items-center gap-1.5">
            <Shield size={12} /> Compliance & Legal
          </span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17] leading-tight">Privacy Policy</h2>
          <p className="text-xs text-gray-500 font-semibold max-w-2xl leading-relaxed">
            DTV School Support is committed to protecting the privacy of our students, parents, and faculty members.
          </p>
        </div>

        <div className="space-y-6 text-xs text-[#2E1E17]/80 leading-relaxed font-semibold">
          <section className="space-y-2">
            <h4 className="text-sm font-bold text-[#2E1E17]">1. Information We Collect</h4>
            <p>
              We collect personal information necessary for student registration, academic record keeping, billing, and communication. This includes student names, guardian contact details, billing information, academic reports, and portal login histories.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="text-sm font-bold text-[#2E1E17]">2. How We Use Information</h4>
            <p>
              Information collected is used solely to facilitate educational instruction, maintain school records, issue grading profiles, handle parent notifications, and secure digital portal sessions. We do not sell or trade any user information to third-party advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="text-sm font-bold text-[#2E1E17]">3. Data Security & Storage</h4>
            <p>
              Student and staff records are stored securely in encrypted databases. Access to student portals, parent notification channels, and grade databases is strictly restricted using Role-Based Access Control (RBAC).
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="text-sm font-bold text-[#2E1E17]">4. Cookies & Portal Settings</h4>
            <p>
              Our web platform uses essential cookies and local storage tokens to manage authenticated login sessions. These cookies are critical to prevent unauthorized access and verify staff, administrator, and teacher credentials.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
