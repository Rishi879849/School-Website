import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function ContactUsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

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
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Support Directory</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17] leading-tight">Contact Us</h2>
          <p className="text-xs text-gray-500 font-semibold max-w-2xl leading-relaxed">
            Get in touch with our administrative office, admissions desk, or technical support nodes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
          {/* Information */}
          <div className="md:col-span-5 space-y-6">
            <h3 className="text-sm font-bold text-[#2E1E17] uppercase tracking-wider">Contact Directories</h3>
            
            <div className="space-y-4 text-xs font-semibold text-[#2E1E17]/80">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#FF733B] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold">Institution Address</span>
                  <span className="block text-gray-500 font-medium mt-0.5">Bhopal Bypass Road, Gandhi Nagar, Bhopal, MP 462033</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={16} className="text-[#FF733B] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold">Direct Phone Helpline</span>
                  <span className="block text-gray-500 font-medium mt-0.5">+91 (755) 267-8812</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={16} className="text-[#FF733B] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold">Email Inbox Nodes</span>
                  <span className="block text-gray-500 font-medium mt-0.5">support@edukids.edu</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7 bg-[#FAF6F0]/40 rounded-[2rem] border border-[#2E1E17]/5 p-6 shadow-inner">
            {submitted ? (
              <div className="bg-white rounded-2xl p-8 border border-emerald-500/20 text-center space-y-4 shadow-md my-6 animate-fade-in">
                <CheckCircle size={32} className="text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-[#2E1E17] font-serif">Message Dispatched!</h4>
                <p className="text-xs text-gray-500">
                  Our coordination desk has queued your query. Response details will be sent to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold text-[#2E1E17]/60 uppercase tracking-widest mb-1.5">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-[#2E1E17]/60 uppercase tracking-widest mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@school.edu"
                      className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-[#2E1E17]/60 uppercase tracking-widest mb-1.5">Subject</label>
                  <input 
                    type="text" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Admissions inquiry, transcript details..."
                    className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-[#2E1E17]/60 uppercase tracking-widest mb-1.5">Message</label>
                  <textarea 
                    required
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type details of your request here..."
                    className="w-full py-2.5 px-4 rounded-xl border border-gray-300 text-xs text-[#2E1E17] bg-white placeholder-gray-400 focus:outline-none focus:border-[#FF733B] resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#FF733B] hover:bg-[#E6622E] text-white text-xs font-extrabold py-3 rounded-xl transition duration-300 shadow-lg shadow-orange-500/20 flex items-center justify-center gap-1.5"
                >
                  <Send size={12} /> Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
