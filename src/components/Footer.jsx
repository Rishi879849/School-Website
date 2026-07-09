import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Footer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill out all fields in the contact form.');
      return;
    }
    // Simulate contact form submission
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <footer id="footer" className="w-full bg-[#2F221E] text-white/90 border-t border-white/5 pt-16 pb-8 px-4 md:px-8 relative overflow-hidden transition-all duration-300">
      {/* Visual background details */}
      <div className="absolute right-[-10%] bottom-[-10%] w-[350px] h-[350px] bg-[#FF733B]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute left-[-5%] top-[-5%] w-[250px] h-[250px] bg-amber-500/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* About Us Section */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tight text-white font-serif">
              Edukids<span className="text-[#FF733B]">.</span>
            </span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed max-w-md font-medium">
            Our mission is to foster holistic growth in children, blending foundational academic instruction with smart learning, sports, and arts. We prepare students to become creative thinkers, responsible citizens, and future leaders.
          </p>
          <div className="space-y-3 pt-2 text-xs font-semibold text-gray-300">
            <div className="flex items-center gap-3">
              <MapPin size={14} className="text-[#FF733B]" />
              <span>Bhopal Bypass Road, Gandhi Nagar, Bhopal, MP 462033</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={14} className="text-[#FF733B]" />
              <span>+91 (755) 267-8812</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={14} className="text-[#FF733B]" />
              <span>contact@edukids.edu</span>
            </div>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="lg:col-span-3 space-y-4 text-left">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF733B] border-b border-white/10 pb-2">
            School Links
          </h4>
          <div className="grid grid-cols-1 gap-2 text-xs text-gray-400 font-semibold">
            <a href="/" className="hover:text-white transition">Our School Profile</a>
            <a href="/" className="hover:text-white transition">Academic Calendar</a>
            <a href="/" className="hover:text-white transition">Campus Virtual Tour</a>
            <a href="/" className="hover:text-white transition">Our Teachers</a>
            <a href="/" className="hover:text-white transition">Anti-Ragging Policy</a>
            <a href="/" className="hover:text-white transition">Public Disclosures</a>
          </div>
        </div>

        {/* Contact Us Form Section */}
        <div className="lg:col-span-4 space-y-4 text-left">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF733B] border-b border-white/10 pb-2">
            Connect With Us
          </h4>
          
          {submitted ? (
            <div className="bg-white/5 border border-emerald-500/20 rounded-2xl p-6 text-center space-y-3 animate-fade-in">
              <CheckCircle size={28} className="text-[#4ADE80] mx-auto animate-bounce" />
              <h5 className="text-sm font-bold text-white">Message Logged!</h5>
              <p className="text-[11px] text-gray-400">
                Our support team has registered your request. A school representative will respond shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input 
                  type="text" 
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF733B] focus:bg-white/10 transition"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF733B] focus:bg-white/10 transition"
                />
              </div>
              <div>
                <textarea 
                  required
                  rows="3"
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF733B] focus:bg-white/10 transition resize-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#FF733B] hover:bg-[#E6622E] text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/10 hover:scale-[1.02] active:scale-95 duration-200"
              >
                <Send size={12} /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer copyright */}
      <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
        <span>© 2026 Edukids Inc. All Rights Reserved.</span>
        <div className="flex gap-4">
          <a href="/" className="hover:text-gray-300 transition">Privacy Policy</a>
          <a href="/" className="hover:text-gray-300 transition">Terms of Service</a>
          <a href="/" className="hover:text-gray-300 transition">Cyber Compliance</a>
        </div>
      </div>
    </footer>
  );
}
