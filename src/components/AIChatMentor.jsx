import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, BrainCircuit } from 'lucide-react';

export default function AIChatMentor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I am your AI Study Assistant. I am here to help you with your school subjects, lessons, and homework. What would you like to study today?", time: 'Just now' }
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
    if (text.includes('math') || text.includes('grade') || text.includes('score') || text.includes('algebra')) {
      return "Based on your math progress, I recommend practicing algebra and geometry problems for 20 minutes today. I've unlocked some extra practice worksheets for you.";
    }
    if (text.includes('science') || text.includes('physics') || text.includes('chemistry')) {
      return "To prepare for your upcoming Science class test, I suggest reviewing the force and energy chapters. I've prepared a brief mock test to help you practice.";
    }
    if (text.includes('fee') || text.includes('pay') || text.includes('finance')) {
      return "You can view the school fee structure on our Fee Matrix page, or log in to the Parent Portal to pay pending dues securely.";
    }
    if (text.includes('study') || text.includes('syllabus') || text.includes('exam')) {
      return "You can download the syllabus and term guides for all subjects on our Scheme & Syllabus page.";
    }
    return "That is a great question! I suggest reading the relevant textbook chapter and completing the exercises at the end. Let me know if you need help with a specific problem!";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { sender: 'student', text: inputValue, time: 'Now' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiMessage = { sender: 'ai', text: getAIResponse(userMessage.text), time: 'Now' };
      setMessages(prev => [...prev, aiMessage]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded chat window */}
      {isOpen ? (
        <div className="w-[340px] md:w-[380px] h-[480px] bg-[#FAF6F0] rounded-3xl border border-[#2E1E17]/10 flex flex-col overflow-hidden shadow-2xl mb-4 animate-float">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent border-b border-[#2E1E17]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-black font-extrabold">
                <BrainCircuit size={16} />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-[#2E1E17] flex items-center gap-1">
                  AI Compass Mentor <Sparkles size={10} className="text-[#FF733B] animate-pulse" />
                </h4>
                <span className="text-[9px] text-[#FF733B] uppercase tracking-widest font-bold">Active Career Audit</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-[#2E1E17] p-1 rounded-lg hover:bg-black/5 transition"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages list */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex gap-2.5 max-w-[85%] ${m.sender === 'ai' ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] ${
                  m.sender === 'ai' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-white text-[#2E1E17] border border-[#2E1E17]/10'
                }`}>
                  {m.sender === 'ai' ? <BrainCircuit size={12} /> : <User size={12} />}
                </div>
                <div>
                  <div className={`p-3 rounded-2xl border text-left leading-relaxed font-semibold ${
                    m.sender === 'ai' 
                      ? 'bg-amber-50 border-amber-200 text-amber-900' 
                      : 'bg-white border-[#2E1E17]/10 text-gray-800 shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                  <span className="text-[8px] text-gray-400 mt-1 block px-1">{m.time}</span>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isTyping && (
              <div className="flex gap-2.5 max-w-[85%] mr-auto items-center">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 border border-amber-200 flex items-center justify-center">
                  <BrainCircuit size={12} className="animate-spin" />
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 text-[10px] text-amber-700 font-semibold animate-pulse">
                  Analyzing skill gaps...
                </div>
              </div>
            )}
          </div>

          {/* Form input */}
          <form onSubmit={handleSend} className="p-3 border-t border-[#2E1E17]/10 bg-white/40 flex gap-2">
            <input 
              type="text" 
              placeholder="Ask for roadmap suggestions..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 py-2 px-3 rounded-lg border border-gray-300 text-xs bg-white text-[#2E1E17] placeholder-gray-400 focus:outline-none focus:border-[#FF733B]"
            />
            <button 
              type="submit"
              className="p-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold rounded-lg hover:scale-105 transition"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      ) : null}

      {/* Circle button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-black font-extrabold flex items-center justify-center shadow-xl shadow-amber-500/20 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
