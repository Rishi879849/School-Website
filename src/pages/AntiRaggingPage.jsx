import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, AlertTriangle, PhoneCall, Mail, FileText, CheckCircle, ArrowLeft } from 'lucide-react';

export default function AntiRaggingPage() {
  return (
    <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-12 text-left">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF733B] hover:text-[#E6622E] transition">
          <ArrowLeft size={14} /> Back to Homepage
        </Link>
      </div>

      <div className="space-y-8">
        {/* Banner Header */}
        <div className="bg-red-50/50 border border-red-500/10 rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="p-4 bg-red-500/10 text-red-600 rounded-3xl shrink-0">
            <ShieldAlert size={36} />
          </div>
          <div className="space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-600">Strict Compliance Mandate</span>
            <h2 className="text-2xl md:text-3xl font-normal font-serif text-[#2E1E17] leading-tight">Zero Tolerance Anti-Ragging Policy</h2>
            <p className="text-xs text-red-700 font-semibold">
              DTV School Support enforces an absolute zero-tolerance policy against any form of ragging or student harassment.
            </p>
          </div>
        </div>

        {/* Regulatory Statement */}
        <div className="bg-white rounded-[2rem] border border-[#2E1E17]/10 p-6 md:p-8 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle size={14} className="text-[#FF733B]" /> Regulatory Definition & Directives
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed font-semibold">
            In compliance with the Supreme Court directives and UGC Regulations on curbing the menace of ragging in higher educational institutions, ragging constitutes any act of physical or mental abuse (including bullying and exclusion) directed at fresh students, causing annoyance, hardship, psychological harm, or fear.
          </p>

          <div className="bg-[#FAF6F0]/60 rounded-2xl p-4 border border-[#2E1E17]/5 space-y-3">
            <h4 className="text-xs font-bold text-[#2E1E17]">Actions Classified as Ragging:</h4>
            <ul className="list-disc list-inside text-[11px] text-gray-600 space-y-1.5 font-medium pl-2">
              <li>Teasing, treating, or handling freshman students with rudeness.</li>
              <li>Compelling students to perform tasks that cause physical strain or embarrassment.</li>
              <li>Any act of financial extortion or forceful collection of contributions.</li>
              <li>Psychological pressure, cyber-bullying, or verbal slurs.</li>
            </ul>
          </div>
        </div>

        {/* Helpline Details */}
        <div className="bg-[#2F221E] text-white rounded-[2.5rem] p-6 md:p-8 relative overflow-hidden shadow-xl">
          <div className="absolute right-[-5%] top-[-5%] w-[150px] h-[150px] bg-[#FF733B]/10 rounded-full blur-[40px] pointer-events-none" />
          
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <PhoneCall size={14} className="text-[#FF733B]" /> Emergency Anti-Ragging Helplines
              </h3>
              <p className="text-xs text-gray-400 mt-1">If you or a peer are experiencing harassment, contact these secure nodes immediately.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                <span className="block text-[9px] font-extrabold uppercase text-gray-400 tracking-wider">National Toll-Free Line</span>
                <span className="text-xl font-bold font-serif text-[#FF733B] flex items-center gap-2">
                  1800-180-5522
                </span>
                <p className="text-[10px] text-gray-500">Available 24 hours a day, 7 days a week, anonymous filing supported.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                <span className="block text-[9px] font-extrabold uppercase text-gray-400 tracking-wider">Academy Compliance Office</span>
                <span className="text-xl font-bold font-serif text-[#FF733B] flex items-center gap-2">
                  antiragging@dtvschoolsupport.edu
                </span>
                <p className="text-[10px] text-gray-500">Intake coordinator response guaranteed within 3 business hours.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Affidavits */}
        <div className="bg-white rounded-[2rem] border border-[#2E1E17]/10 p-6 md:p-8 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
            <FileText size={14} className="text-[#FF733B]" /> Mandatory Student Affidavits
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed font-semibold">
            Every enrolled student and parent must submit a signed compliance affidavit. This must be completed online via the national anti-ragging web portal.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="border border-[#2E1E17]/10 rounded-2xl p-4 flex gap-3 items-start hover:border-[#FF733B]/50 transition duration-200">
              <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={14} />
              <div>
                <h4 className="text-xs font-bold text-[#2E1E17]">File Student Affidavit</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">Submit student declaration of compliance and code conduct approval.</p>
                <a href="https://www.antiragging.in" target="_blank" rel="noreferrer" className="text-[10px] text-[#FF733B] font-bold mt-2 inline-block hover:underline">
                  Visit National Portal →
                </a>
              </div>
            </div>

            <div className="border border-[#2E1E17]/10 rounded-2xl p-4 flex gap-3 items-start hover:border-[#FF733B]/50 transition duration-200">
              <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={14} />
              <div>
                <h4 className="text-xs font-bold text-[#2E1E17]">File Parent Affidavit</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">Submit parent/guardian verification of anti-harassment regulations.</p>
                <a href="https://www.antiragging.in" target="_blank" rel="noreferrer" className="text-[10px] text-[#FF733B] font-bold mt-2 inline-block hover:underline">
                  Visit National Portal →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
