import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function CyberCompliancePage() {
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
            <ShieldCheck size={12} /> Digital Safety
          </span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17] leading-tight">Cyber Compliance</h2>
          <p className="text-xs text-gray-500 font-semibold max-w-2xl leading-relaxed">
            Edukids School maintains strict digital compliance standards to protect student data and school infrastructure.
          </p>
        </div>

        <div className="space-y-6 text-xs text-[#2E1E17]/80 leading-relaxed font-semibold">
          <section className="space-y-2">
            <h4 className="text-sm font-bold text-[#2E1E17]">1. Data Protection Compliance</h4>
            <p>
              We adhere to national data protection and child safety acts (COPPA and related domestic guidelines). Access to student records, grades, PTM summaries, and personal directories is audited periodically.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="text-sm font-bold text-[#2E1E17]">2. Network Security Measures</h4>
            <p>
              Our school server networks operate behind advanced web application firewalls. All data transactions are secured using standard SSL encryption to protect against unauthorized packet sniffing or identity theft.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="text-sm font-bold text-[#2E1E17]">3. Password Guidelines</h4>
            <p>
              Staff portal access keys must be changed at the beginning of each academic term. Multi-factor authentication mechanisms are available for administrator profiles to secure higher-level permissions.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="text-sm font-bold text-[#2E1E17]">4. Student & Parent Awareness</h4>
            <p>
              The school conducts regular digital safety workshops for middle and secondary students, promoting cyber safety guidelines, reporting bullying actions, and warning against sharing password keys.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
