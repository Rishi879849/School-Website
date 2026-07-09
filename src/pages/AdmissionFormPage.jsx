import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, GraduationCap, User, Home, Award, ChevronRight, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdmissionFormPage() {
  const [formStep, setFormStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form State variables
  const [studentName, setStudentName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [grade, setGrade] = useState('Grade 10-A');
  
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [relation, setRelation] = useState('Father');

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const [prevSchool, setPrevSchool] = useState('');
  const [prevScore, setPrevScore] = useState('');

  const handleNextStep = (e) => {
    e.preventDefault();
    if (formStep < 4) setFormStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    if (formStep > 1) setFormStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 text-left">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF733B] hover:text-[#E6622E] transition">
          <ArrowLeft size={14} /> Back to Homepage
        </Link>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="bg-white rounded-[2.5rem] p-12 text-center border border-emerald-500/20 max-w-xl mx-auto space-y-6 shadow-xl relative overflow-hidden"
          >
            <div className="absolute right-[-10%] top-[-10%] w-[150px] h-[150px] bg-emerald-100/10 rounded-full blur-3xl pointer-events-none" />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.2 }}
              className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto"
            >
              <Check size={40} />
            </motion.div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-emerald-600 font-serif">Enrollment Application Registered!</h2>
              <p className="text-sm text-[#2E1E17]/80 font-semibold">
                The admission request for <strong>{studentName}</strong> has been logged into the school queue.
              </p>
            </div>
            <div className="bg-[#FAF6F0] p-6 rounded-3xl border border-[#2E1E17]/10 text-left text-xs space-y-2.5 font-semibold text-[#2E1E17]/80">
              <div className="flex justify-between">
                <span className="text-gray-500">Application ID:</span>
                <span className="font-bold text-[#2E1E17]">ADM-{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Selected Grade:</span>
                <span className="font-bold text-[#2E1E17]">{grade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Guardian Contact:</span>
                <span className="font-bold text-[#2E1E17]">{parentEmail}</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 font-bold leading-relaxed">
              A secure access token and intake syllabus guide has been dispatched to your email address.
            </p>
            <Link to="/" className="inline-block bg-[#FF733B] hover:bg-[#E6622E] text-white text-xs font-extrabold px-8 py-3.5 rounded-full transition shadow-md shadow-orange-500/10 hover:scale-[1.02] active:scale-95 duration-200">
              Return Home
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] border border-[#2E1E17]/10 overflow-hidden shadow-xl"
          >
            {/* Header */}
            <div className="bg-[#2F221E] text-white p-8 md:p-10 relative overflow-hidden">
              <div className="absolute right-[-5%] top-[-10%] w-[200px] h-[200px] bg-[#FF733B]/10 rounded-full blur-[40px] pointer-events-none" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Admissions 2026-2027</span>
              <h2 className="text-2xl md:text-3xl font-normal font-serif mt-1 flex items-center gap-2 text-white">
                <GraduationCap className="text-[#FF733B]" /> Student Intake Application
              </h2>
              <p className="text-xs text-gray-400 mt-2 max-w-xl font-semibold">
                Submit your pupil's details to initiate enrollment in the Edukids School academic streams.
              </p>

              {/* Stepper tracker */}
              <div className="grid grid-cols-4 gap-2 mt-8 text-[10px] font-extrabold uppercase tracking-wider text-center text-gray-500">
                {[
                  { step: 1, label: 'Student' },
                  { step: 2, label: 'Guardian' },
                  { step: 3, label: 'Address' },
                  { step: 4, label: 'Academic' }
                ].map(item => (
                  <div key={item.step} className="flex flex-col items-center gap-1.5 cursor-pointer" onClick={() => formStep > item.step && setFormStep(item.step)}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-[10px] transition duration-300 ${
                      formStep >= item.step 
                        ? 'bg-[#FF733B] border-none text-white font-extrabold shadow-md' 
                        : 'border-white/20 text-white/40'
                    }`}>
                      {item.step}
                    </div>
                    <span className={`transition duration-300 ${formStep >= item.step ? 'text-white' : 'text-white/40'}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={formStep === 4 ? handleSubmit : handleNextStep} className="p-6 md:p-10 space-y-6">
              
              <AnimatePresence mode="wait">
                {/* STEP 1: Student Information */}
                {formStep === 1 && (
                  <motion.div 
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF733B] flex items-center gap-1.5">
                      <User size={14} /> Student Personal Details
                    </h3>
                    <hr className="border-[#2E1E17]/10" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Student Full Name</label>
                        <input 
                          type="text" 
                          required 
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder="e.g. Liam Vance"
                          className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Date of Birth</label>
                        <input 
                          type="date" 
                          required 
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white focus:outline-none focus:border-[#FF733B]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Gender</label>
                        <select 
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white focus:outline-none focus:border-[#FF733B]"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Non-binary">Non-binary</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Desired Grade / Level</label>
                        <select 
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                          className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white focus:outline-none focus:border-[#FF733B]"
                        >
                          <option value="Nursery">Nursery / Playgroup</option>
                          <option value="Primary School">Primary (Grade 1-5)</option>
                          <option value="Middle School">Middle (Grade 6-8)</option>
                          <option value="Secondary School">Secondary (Grade 9-10)</option>
                          <option value="Senior Secondary">Senior Secondary (Grade 11-12)</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Guardian Details */}
                {formStep === 2 && (
                  <motion.div 
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF733B] flex items-center gap-1.5">
                      <User size={14} /> Parent & Guardian Information
                    </h3>
                    <hr className="border-[#2E1E17]/10" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Guardian Name</label>
                        <input 
                          type="text" 
                          required 
                          value={parentName}
                          onChange={(e) => setParentName(e.target.value)}
                          placeholder="e.g. Marcus Vance"
                          className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Relationship</label>
                        <select 
                          value={relation}
                          onChange={(e) => setRelation(e.target.value)}
                          className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white focus:outline-none focus:border-[#FF733B]"
                        >
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Guardian">Guardian / Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Email Address</label>
                        <input 
                          type="email" 
                          required 
                          value={parentEmail}
                          onChange={(e) => setParentEmail(e.target.value)}
                          placeholder="e.g. marcus@school.edu"
                          className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Contact Phone</label>
                        <input 
                          type="tel" 
                          required 
                          value={parentPhone}
                          onChange={(e) => setParentPhone(e.target.value)}
                          placeholder="e.g. +1 (555) 234-5678"
                          className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Address Details */}
                {formStep === 3 && (
                  <motion.div 
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF733B] flex items-center gap-1.5">
                      <Home size={14} /> Present Residence Details
                    </h3>
                    <hr className="border-[#2E1E17]/10" />

                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Street Address</label>
                      <input 
                        type="text" 
                        required 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. 128 Main Street Apt 4B"
                        className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">City</label>
                        <input 
                          type="text" 
                          required 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Palo Alto"
                          className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">State / Province</label>
                        <input 
                          type="text" 
                          required 
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="e.g. CA"
                          className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">ZIP / Postal Code</label>
                        <input 
                          type="text" 
                          required 
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                          placeholder="e.g. 94301"
                          className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Academic Records */}
                {formStep === 4 && (
                  <motion.div 
                    key="step-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF733B] flex items-center gap-1.5">
                      <Award size={14} /> Previous Academic History
                    </h3>
                    <hr className="border-[#2E1E17]/10" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Previous Institution</label>
                        <input 
                          type="text" 
                          required 
                          value={prevSchool}
                          onChange={(e) => setPrevSchool(e.target.value)}
                          placeholder="e.g. Oakridge Middle School"
                          className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Final Score (GPA / %)</label>
                        <input 
                          type="text" 
                          required 
                          value={prevScore}
                          onChange={(e) => setPrevScore(e.target.value)}
                          placeholder="e.g. 3.8 / 92%"
                          className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Upload Prior Transcript (PDF)</label>
                      <div className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#FF733B] hover:bg-[#FAF6F0]/20 transition cursor-pointer flex flex-col items-center gap-2">
                        <Upload size={24} className="text-[#FF733B]" />
                        <span className="text-xs font-bold text-[#2E1E17]">Click to select files or drag-and-drop here</span>
                        <span className="text-[10px] text-gray-400 font-semibold">Supports PDF or JPEG reports (Max 5MB)</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form actions */}
              <div className="flex justify-between items-center pt-6 border-t border-[#2E1E17]/10">
                <button 
                  type="button"
                  onClick={handlePrevStep}
                  disabled={formStep === 1}
                  className={`px-6 py-2.5 rounded-full border text-xs font-bold transition flex items-center gap-1 ${
                    formStep === 1 
                      ? 'border-[#2E1E17]/10 text-gray-300 cursor-not-allowed bg-[#FAF6F0]/50' 
                      : 'border-[#2E1E17]/20 hover:border-black text-[#2E1E17] bg-white cursor-pointer'
                  }`}
                >
                  Previous
                </button>
                
                <button 
                  type="submit"
                  className="bg-[#FF733B] hover:bg-[#E6622E] text-white text-xs font-extrabold px-8 py-2.5 rounded-full shadow-lg transition flex items-center gap-1 hover:scale-105 active:scale-95 duration-200 cursor-pointer"
                >
                  {formStep === 4 ? 'Submit File' : 'Next Step'} <ChevronRight size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
