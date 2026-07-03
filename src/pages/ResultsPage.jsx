import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, AlertCircle, FileText, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ResultsPage({ students = [] }) {
  const [rollNumber, setRollNumber] = useState('');
  const [term, setTerm] = useState('Term 1 Computational Lab');
  const [searched, setSearched] = useState(false);
  const [studentResult, setStudentResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!rollNumber.trim()) {
      alert('Please enter a student roll number.');
      return;
    }
    
    // Find student in local data list
    const found = students.find(s => s.roll.toLowerCase() === rollNumber.trim().toLowerCase());
    setStudentResult(found || null);
    setSearched(true);
  };

  return (
    <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-12 text-left">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF733B] hover:text-[#E6622E] transition">
          <ArrowLeft size={14} /> Back to Homepage
        </Link>
      </div>

      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Simulation Ledger</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17]">Digital Report Cards Gate</h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto font-medium">
            Retrieve term-wise evaluations, digital sandbox average performance scores, and tutor comments.
          </p>
        </div>

        {/* Search query box */}
        <div className="bg-white rounded-[2rem] border border-[#2E1E17]/10 p-6 md:p-8 shadow-lg">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-6">
              <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Student Roll Number</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="e.g. DTV-009-26"
                  className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
                />
                <Search size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
              </div>
            </div>
            
            <div className="md:col-span-4">
              <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Evaluation Term</label>
              <select 
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white focus:outline-none focus:border-[#FF733B]"
              >
                <option value="Term 1 Computational Lab">Term 1 Computational Lab</option>
                <option value="Term 2 Quantum Physics">Term 2 Quantum Physics</option>
                <option value="Final Progression Audit">Final Progression Audit</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button 
                type="submit"
                className="w-full bg-[#FF733B] hover:bg-[#E6622E] text-white text-xs font-extrabold py-2.5 rounded-xl transition duration-300 shadow-md shadow-orange-500/10"
              >
                Lookup
              </button>
            </div>
          </form>

          {/* Quick preset links to test */}
          <div className="mt-4 pt-4 border-t border-[#2E1E17]/5 flex flex-wrap items-center gap-2 text-[10px] font-bold text-gray-500 uppercase">
            <span>Query Presets:</span>
            {students.slice(0, 3).map(student => (
              <button
                key={student.id}
                type="button"
                onClick={() => setRollNumber(student.roll)}
                className="px-2.5 py-1 bg-[#FAF6F0] hover:bg-gray-100 text-[#2E1E17] border border-[#2E1E17]/10 rounded-lg transition"
              >
                {student.name} ({student.roll})
              </button>
            ))}
          </div>
        </div>

        {/* Display Results */}
        {searched && (
          <div className="animate-fade-in">
            {studentResult ? (
              <div className="bg-white rounded-[2.5rem] border border-[#2E1E17]/10 overflow-hidden shadow-xl">
                
                {/* Header panel */}
                <div className="bg-[#2F221E] text-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#2E1E17]/10">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#FF733B] px-2 py-0.5 bg-orange-500/10 rounded-full">
                      Evaluation Pass
                    </span>
                    <h3 className="text-xl md:text-2xl font-normal font-serif mt-1">{studentResult.name}</h3>
                    <p className="text-xs text-gray-400 font-semibold">{studentResult.class} • Roll: {studentResult.roll}</p>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center md:self-end">
                    <span className="block text-[8px] font-extrabold uppercase text-gray-400 tracking-wider">Average Grade</span>
                    <span className="text-2xl font-bold font-serif text-[#FF733B]">{studentResult.grade}%</span>
                  </div>
                </div>

                {/* Performance table */}
                <div className="p-6 md:p-8 space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2E1E17] flex items-center gap-1.5">
                    <BookOpen size={14} className="text-[#FF733B]" /> Subject-Wise Score Breakdown
                  </h4>
                  
                  <div className="overflow-x-auto rounded-2xl border border-[#2E1E17]/10">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-[#2E1E17]/10 font-bold text-gray-500">
                          <th className="p-4">Subject Course</th>
                          <th className="p-4">Credit Units</th>
                          <th className="p-4 text-center">Score Grade</th>
                          <th className="p-4 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2E1E17]/10 font-semibold text-[#2E1E17]/80">
                        <tr>
                          <td className="p-4 font-bold flex items-center gap-2"><FileText size={12} className="text-gray-400" /> Genomics & AI Design</td>
                          <td className="p-4">4.0 Credits</td>
                          <td className="p-4 text-center text-sm font-bold text-emerald-600">{studentResult.mathGrade}%</td>
                          <td className="p-4 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] rounded-full">Outstanding</span></td>
                        </tr>
                        <tr>
                          <td className="p-4 font-bold flex items-center gap-2"><FileText size={12} className="text-gray-400" /> Quantum Physics Simulation</td>
                          <td className="p-4">4.0 Credits</td>
                          <td className="p-4 text-center text-sm font-bold text-emerald-600">{studentResult.physGrade}%</td>
                          <td className="p-4 text-center"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] rounded-full">Exceeded</span></td>
                        </tr>
                        <tr>
                          <td className="p-4 font-bold flex items-center gap-2"><FileText size={12} className="text-gray-400" /> Computational English Binders</td>
                          <td className="p-4">3.0 Credits</td>
                          <td className="p-4 text-center text-sm font-bold text-[#FF733B]">{studentResult.engGrade}%</td>
                          <td className="p-4 text-center"><span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] rounded-full">Distinction</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Summary commentary card */}
                  <div className="bg-[#FAF6F0]/60 rounded-2xl p-4 border border-[#2E1E17]/5 text-xs space-y-2">
                    <div className="flex gap-2 items-start">
                      <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={14} />
                      <p className="font-semibold text-gray-600 leading-relaxed">
                        <span className="font-bold text-[#2E1E17]">Academic Board Summary:</span> {studentResult.name} displays exemplary performance inside simulator sandboxes, especially on quantum vector mathematics. No compliance issues detected. Recommended for next semester advancement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-red-50/50 border border-red-500/10 rounded-[2rem] p-8 text-center space-y-3">
                <AlertCircle className="text-red-500 mx-auto" size={32} />
                <h4 className="text-sm font-bold text-red-800">Roll Number Not Found</h4>
                <p className="text-xs text-red-700 max-w-sm mx-auto font-medium">
                  We could not find a matching student profile ledger for <strong>"{rollNumber}"</strong>. Please verify the roll number structure or try query presets above.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
