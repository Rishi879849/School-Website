import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AIChatMentor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      sender: 'ai', 
      text: "Hello! Welcome to Edukids School. I am your AI Guidance Assistant. How can I help you and your child today?", 
      time: 'Just now' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getAIResponse = (userText) => {
    const text = userText.toLowerCase();
    if (text.includes('admission') || text.includes('apply') || text.includes('enroll')) {
      return "To apply, please visit our Admission Form page. The onboarding process is split into 4 simple steps: Student profile, Guardian details, Address details, and Academic records upload.";
    }
    if (text.includes('fee') || text.includes('cost') || text.includes('scholarship')) {
      return "Tuition and co-curricular fees vary by grade cohort (Nursery, Primary, Middle, and Senior Secondary). We also offer scholarships based on merit and sports achievements. Read more on our Fee Structure page.";
    }
    if (text.includes('syllabus') || text.includes('curriculum') || text.includes('subject')) {
      return "We follow a CBSE-aligned curriculum featuring Science, Mathematics, Languages, and Humanities. Term calendars and syllabus guides can be downloaded on our Scheme & Syllabus page.";
    }
    if (text.includes('contact') || text.includes('phone') || text.includes('call')) {
      return "You can reach our administrative office at +91 (755) 267-8812 or email contact@edukids.edu. Our campus is open Mon-Sat: 8:00 AM - 2:00 PM.";
    }
    return "Thank you for your question. I recommend reviewing our School Profile on the About Us page, or filling out a contact inquiry form in the footer so our admin team can follow up directly!";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { sender: 'user', text: inputValue, time: 'Now' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiMessage = { sender: 'ai', text: getAIResponse(userMessage.text), time: 'Now' };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleQuickQuestion = (questionText) => {
    const userMessage = { sender: 'user', text: questionText, time: 'Now' };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiMessage = { sender: 'ai', text: getAIResponse(questionText), time: 'Now' };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 120 }}
            className="w-[340px] md:w-[380px] h-[500px] bg-white rounded-[2rem] border border-[#2E1E17]/10 flex flex-col overflow-hidden shadow-2xl mb-4 relative"
          >
            {/* Header */}
            <div className="p-4 bg-[#2F221E] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FF733B]/20 flex items-center justify-center text-[#FF733B]">
                  <Sparkles size={16} fill="currentColor" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    Edukids Assistant
                  </h4>
                  <span className="text-[9px] text-gray-400 font-extrabold uppercase tracking-widest block">24/7 Virtual Guide</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages list */}
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin text-xs bg-[#FAF6F0]">
              <AnimatePresence initial={false}>
                {messages.map((m, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    key={idx} 
                    className={`flex gap-2.5 max-w-[85%] ${m.sender === 'ai' ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] ${
                      m.sender === 'ai' ? 'bg-[#FF733B]/10 text-[#FF733B] border border-[#FF733B]/20' : 'bg-[#2E1E17] text-white'
                    }`}>
                      {m.sender === 'ai' ? <Sparkles size={10} fill="currentColor" /> : <User size={10} />}
                    </div>
                    <div>
                      <div className={`p-3 rounded-2xl border text-left leading-relaxed font-semibold shadow-sm ${
                        m.sender === 'ai' 
                          ? 'bg-white border-[#2E1E17]/5 text-[#2E1E17]' 
                          : 'bg-[#FF733B] border-none text-white'
                      }`}>
                        {m.text}
                      </div>
                      <span className="text-[8px] text-gray-400 mt-1 block px-1">{m.time}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Typing simulation */}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5 max-w-[85%] mr-auto items-center"
                >
                  <div className="w-6 h-6 rounded-full bg-[#FF733B]/10 text-[#FF733B] border border-[#FF733B]/20 flex items-center justify-center">
                    <Sparkles size={10} fill="currentColor" className="animate-spin" />
                  </div>
                  <div className="bg-white border border-[#2E1E17]/5 rounded-2xl px-4 py-2.5 text-[10px] text-gray-500 font-bold flex items-center gap-1.5 shadow-sm">
                    Assistant is typing
                    <span className="flex gap-0.5">
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Quick Questions Deck */}
              {messages.length === 1 && !isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2 pt-2 text-left"
                >
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#FF733B] flex items-center gap-1">
                    <HelpCircle size={10} /> Frequently Asked Questions
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {[
                      'How to apply for admissions?',
                      'What is the tuition fee structure?',
                      'Academic syllabus resources',
                      'Contact the administration office'
                    ].map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickQuestion(q)}
                        className="w-full text-left bg-white hover:bg-white/80 border border-[#2E1E17]/5 hover:border-[#FF733B]/20 p-2.5 rounded-xl transition text-[10px] font-bold text-[#2E1E17]/80 flex items-center justify-between group cursor-pointer"
                      >
                        {q}
                        <ChevronRight className="text-gray-400 group-hover:text-[#FF733B] transition-colors" size={12} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-[#2E1E17]/10 bg-white flex gap-2">
              <input 
                type="text" 
                placeholder="Ask our virtual assistant..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 py-2 px-3 rounded-xl border border-gray-300 text-xs bg-white text-[#2E1E17] placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
              />
              <button 
                type="submit"
                className="p-2.5 bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main trigger button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold flex items-center justify-center shadow-xl shadow-orange-500/20 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}

// Custom ChevronRight just for the bot options
function ChevronRight(props) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={props.size || 24} 
      height={props.size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
