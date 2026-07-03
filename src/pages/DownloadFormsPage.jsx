import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Search, ArrowLeft } from 'lucide-react';

export default function DownloadFormsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const forms = [
    { name: 'Scholarship Application Form (75% Tuition Support)', category: 'student', size: '1.2 MB', code: 'FORM-SCH-2026' },
    { name: 'Hostel Registration & Logistics Declaration', category: 'student', size: '2.4 MB', code: 'FORM-HST-2026' },
    { name: 'Parent Security Consent & VR Club Permissions', category: 'parent', size: '980 KB', code: 'FORM-CON-2026' },
    { name: 'Student Medical Condition & Emergency Waiver', category: 'student', size: '1.5 MB', code: 'FORM-MED-2026' },
    { name: 'Academic Credit Transfer & Syllabus Waiver Intake', category: 'student', size: '1.8 MB', code: 'FORM-INT-2026' },
    { name: 'Teacher Research Sandbox Grant Request Form', category: 'teacher', size: '3.1 MB', code: 'FORM-GRN-2026' },
    { name: 'Parent-Teacher Telemetry Association Enrollment', category: 'parent', size: '750 KB', code: 'FORM-PTA-2026' }
  ];

  const handleDownload = (formName) => {
    alert(`Compiling DTV Secure Archive: ${formName}.pdf is preparing for system download.`);
  };

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          form.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || form.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 text-left">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF733B] hover:text-[#E6622E] transition">
          <ArrowLeft size={14} /> Back to Homepage
        </Link>
      </div>

      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Document Hub</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17]">Download Resource Forms</h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto font-medium">
            Access secure offline PDF resources for student applications, parent waivers, and teacher requests.
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-3xl border border-[#2E1E17]/10 p-5 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-xs">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search forms..."
              className="w-full py-2 pl-9 pr-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
            />
            <Search size={12} className="absolute left-3.5 top-3 text-gray-400" />
          </div>

          <div className="flex gap-1.5 w-full md:w-auto">
            {[
              { id: 'all', label: 'All Forms' },
              { id: 'student', label: 'Student' },
              { id: 'parent', label: 'Parent' },
              { id: 'teacher', label: 'Teacher' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`flex-1 md:flex-none text-[10px] font-extrabold uppercase tracking-wider px-4 py-2 rounded-xl transition ${
                  categoryFilter === cat.id
                    ? 'bg-[#FF733B] text-white shadow-md'
                    : 'bg-gray-50 border border-[#2E1E17]/10 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tables */}
        <div className="bg-white rounded-[2rem] border border-[#2E1E17]/10 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-[#2E1E17]/10 font-bold text-gray-500">
                  <th className="p-4 w-32">Document Code</th>
                  <th className="p-4">Resource Description</th>
                  <th className="p-4 w-28">Category</th>
                  <th className="p-4 w-24">File Size</th>
                  <th className="p-4 w-28 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2E1E17]/10 font-semibold text-[#2E1E17]/80">
                {filteredForms.length > 0 ? (
                  filteredForms.map((form, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF6F0]/20 transition duration-150">
                      <td className="p-4 font-mono font-bold text-gray-400">{form.code}</td>
                      <td className="p-4 font-bold text-[#2E1E17] flex items-center gap-2">
                        <FileText size={14} className="text-[#FF733B] shrink-0" />
                        <span>{form.name}</span>
                      </td>
                      <td className="p-4 text-xs">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                          form.category === 'student' 
                            ? 'bg-orange-100 text-orange-700' 
                            : form.category === 'parent' 
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {form.category}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400">{form.size}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDownload(form.name)}
                          className="bg-[#FAF6F0] hover:bg-[#FF733B] hover:text-white border border-[#2E1E17]/10 px-3 py-1.5 rounded-lg flex items-center gap-1 font-bold text-[10px] transition mx-auto"
                        >
                          <Download size={10} /> Download
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-400 font-semibold">No resource forms match your query filter</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
