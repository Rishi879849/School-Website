import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Table, DollarSign, Download } from 'lucide-react';

export default function FeeStructurePage() {
  const fees = [
    { level: 'Class 1 - 5 (Primary School)', tuition: '$120 / Month', library: '$50 / Yr', activity: '$100 / Yr', total: '$1,590 / Yr' },
    { level: 'Class 6 - 8 (Middle School)', tuition: '$150 / Month', library: '$60 / Yr', activity: '$120 / Yr', total: '$1,980 / Yr' },
    { level: 'Class 9 - 10 (Secondary School)', tuition: '$180 / Month', library: '$80 / Yr', activity: '$180 / Yr', total: '$2,420 / Yr' },
    { level: 'Class 11 - 12 (Senior Secondary - Commerce/Arts)', tuition: '$200 / Month', library: '$100 / Yr', activity: '$100 / Yr', total: '$2,600 / Yr' },
    { level: 'Class 11 - 12 (Senior Secondary - Science)', tuition: '$220 / Month', library: '$100 / Yr', activity: '$250 / Yr', total: '$2,990 / Yr' }
  ];

  const handleDownload = () => {
    alert('Compiling Edukids Secure Archive: School_Fee_Structure_2026.pdf is preparing for system download.');
  };

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 text-left">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF733B] hover:text-[#E6622E] transition">
          <ArrowLeft size={14} /> Back to Homepage
        </Link>
      </div>

      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Financial Ledgers</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17]">Fee Matrix Structures</h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto font-medium">
            Access transparent cost schedules, tuition matrices, and library/activity fee charges from Class 1 to 12.
          </p>
        </div>

        {/* Tables */}
        <div className="bg-white rounded-[2.5rem] border border-[#2E1E17]/10 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-[#2E1E17]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
            <div>
              <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-2">
                <Table size={16} className="text-[#FF733B]" /> Tuition Fee Matrix (2026-2027)
              </h3>
              <p className="text-[11px] text-gray-400 mt-1">Fee breakdown listed per month and academic term.</p>
            </div>
            
            <button
              onClick={handleDownload}
              className="bg-[#FF733B] hover:bg-[#E6622E] text-white text-xs font-extrabold px-4 py-2 rounded-xl transition shadow-md shadow-orange-500/10 flex items-center gap-1"
            >
              <Download size={12} /> Download PDF
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-gray-100/50 border-b border-[#2E1E17]/10 font-bold text-gray-500">
                  <th className="p-4">Grade / Class Level</th>
                  <th className="p-4">Monthly Tuition</th>
                  <th className="p-4">Library Fund</th>
                  <th className="p-4">Activity Fee</th>
                  <th className="p-4 text-center">Net Annual Charge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2E1E17]/10 font-semibold text-[#2E1E17]/80">
                {fees.map((fee, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF6F0]/20 transition">
                    <td className="p-4 font-bold text-[#2E1E17]">{fee.level}</td>
                    <td className="p-4 text-gray-500">{fee.tuition}</td>
                    <td className="p-4 text-gray-500">{fee.library}</td>
                    <td className="p-4 text-gray-500">{fee.activity}</td>
                    <td className="p-4 text-center text-sm font-bold text-emerald-600">{fee.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#2E1E17]/10 text-xs space-y-3">
          <h4 className="font-bold text-[#2E1E17] uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign size={14} className="text-[#FF733B]" /> Scholarship & Installment Waiver Rules
          </h4>
          <p className="text-gray-500 leading-relaxed font-semibold">
            Installment payment requests can be submitted via the parent portal. Students with average grades above 90% or with qualified research paper submissions can apply for the 75% tuition support scholarship track using <Link to="/download-forms" className="text-[#FF733B] hover:underline font-bold">FORM-SCH-2026</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
