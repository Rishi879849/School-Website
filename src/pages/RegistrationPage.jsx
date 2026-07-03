import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft, Check, LogIn } from 'lucide-react';

export default function RegistrationPage({ onRegister }) {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  // Registration states
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  // Student Specific
  const [parentName, setParentName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [grade, setGrade] = useState('Grade 10-A');
  const [address, setAddress] = useState('');
  const [prevSchool, setPrevSchool] = useState('');
  
  // Teacher Specific
  const [specialization, setSpecialization] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !firstName || !lastName) {
      alert('Please fill out all required fields.');
      return;
    }

    const result = onRegister({
      role,
      email,
      password,
      firstName,
      lastName,
      parentName,
      dob,
      gender,
      grade,
      address,
      prevSchool,
      specialization
    });

    if (result) {
      setSuccess(true);
      setTimeout(() => {
        // Auto-navigate to login page after successful registration
        navigate('/login', { state: { email, password, role } });
      }, 2000);
    } else {
      alert('Registration failed.');
    }
  };

  return (
    <div className="flex-1 max-w-lg w-full mx-auto px-4 py-12 text-left">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF733B] hover:text-[#E6622E] transition">
          <ArrowLeft size={14} /> Back to Homepage
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-[#2E1E17]/10 p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-[-10%] top-[-10%] w-[150px] h-[150px] bg-[#FF733B]/5 rounded-full blur-[40px] pointer-events-none" />

        {success ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
              <Check size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#2E1E17] font-serif">Registration Successful!</h3>
            <p className="text-xs text-gray-500">Creating your record profile and redirecting you to sign in...</p>
          </div>
        ) : (
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-[#2E1E17] text-center font-serif flex items-center justify-center gap-2">
              <UserPlus className="text-[#FF733B]" size={22} /> Secure Account Creation
            </h3>
            <p className="text-xs text-[#2E1E17]/60 text-center mb-6 mt-1 font-medium">Select your portal role and enter your system credentials</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Select Role */}
              <div>
                <label className="block text-[10px] font-extrabold text-[#2E1E17]/60 uppercase tracking-widest mb-1.5">1. Select Workspace Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'student', label: 'Student' },
                    { id: 'teacher', label: 'Teacher' },
                    { id: 'parent', label: 'Parent' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setRole(item.id)}
                      className={`text-[9px] font-extrabold py-2 rounded-lg border text-center transition-all ${
                        role === item.id 
                          ? 'bg-[#FF733B] border-none text-white shadow-md' 
                          : 'bg-white border-[#2E1E17]/10 text-[#2E1E17] hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Core fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[10px] font-extrabold text-[#2E1E17]/60 uppercase tracking-widest mb-1">First Name</label>
                  <input 
                    type="text" 
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Liam"
                    className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-[#2E1E17]/60 uppercase tracking-widest mb-1">Last Name</label>
                  <input 
                    type="text" 
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Sterling"
                    className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-extrabold text-[#2E1E17]/60 uppercase tracking-widest mb-1">Email address</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. liam@school.edu"
                    className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-[#2E1E17]/60 uppercase tracking-widest mb-1">Password</label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Generate key"
                    className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
                  />
                </div>
              </div>

              {/* Student Introductory Admission Details */}
              {role === 'student' && (
                <div className="space-y-3 pt-3 border-t border-[#2E1E17]/10 bg-white/40 p-4 rounded-2xl">
                  <span className="text-[10px] font-extrabold text-[#FF733B] uppercase tracking-wider block">
                    🏫 Basic Student Admission Details:
                  </span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 uppercase">Date of Birth</label>
                      <input 
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 uppercase">Gender</label>
                      <select 
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 uppercase">Parent / Guardian Name</label>
                      <input 
                        type="text" 
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="e.g. Marcus Sterling"
                        className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 uppercase">Grade Level</label>
                      <select 
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                      >
                        <option value="Grade 10-A">Grade 10-A</option>
                        <option value="Grade 11-A">Grade 11-A</option>
                        <option value="Grade 12-A">Grade 12-A</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 uppercase">Present Address</label>
                      <input 
                        type="text" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. 128 Main St, NY"
                        className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 uppercase">Previous School</label>
                      <input 
                        type="text" 
                        value={prevSchool}
                        onChange={(e) => setPrevSchool(e.target.value)}
                        placeholder="e.g. Heights Academy"
                        className="w-full py-1.5 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Teacher Specialization */}
              {role === 'teacher' && (
                <div className="space-y-3 pt-3 border-t border-[#2E1E17]/10 bg-white/40 p-4 rounded-2xl">
                  <span className="text-[10px] font-extrabold text-[#FF733B] uppercase tracking-wider block">
                    🍎 Academic Specialization:
                  </span>
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 uppercase">Department / Core Specialization</label>
                    <input 
                      type="text" 
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      placeholder="e.g. Quantum Physics, Computational Finance"
                      className="w-full py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17]"
                    />
                  </div>
                </div>
              )}

              <button 
                type="submit"
                className="w-full mt-4 bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold py-3 rounded-xl text-xs md:text-sm uppercase tracking-widest transition duration-300 shadow-lg shadow-orange-500/20"
              >
                Register and Generate Account
              </button>

              <p className="text-[10px] text-center text-gray-400 mt-2 font-bold uppercase tracking-wider">
                Already have credentials?{' '}
                <Link to="/login" className="text-[#FF733B] hover:underline flex items-center justify-center gap-1 mt-1">
                  <LogIn size={11} /> Access Gate Here
                </Link>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
