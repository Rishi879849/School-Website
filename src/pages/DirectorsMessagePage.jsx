import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Quote } from 'lucide-react';

export default function DirectorsMessagePage() {
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
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF733B]">Welcome Note</span>
          <h2 className="text-3xl font-normal font-serif text-[#2E1E17] leading-tight">Director's Message</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-2">
          {/* Avatar frame */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-48 h-60 rounded-3xl overflow-hidden border border-[#2E1E17]/10 shadow-md bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=60" 
                alt="Director" 
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#2F221E] text-white py-2 text-center text-[10px] font-extrabold uppercase tracking-wider">
                Mr. Rajesh Kumar
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="md:col-span-8 space-y-4">
            <div className="text-xs text-gray-500 font-semibold leading-relaxed space-y-4">
              <p>
                <Quote size={20} className="text-[#FF733B] inline-block mr-1.5 shrink-0 rotate-180" />
                Welcome to Edukids School. As Director, I am immensely proud of our legacy in nurturing young minds and providing quality primary and secondary education.
              </p>
              <p>
                In today's modern era, we believe that education must go beyond standard textbook learning. We are building smart classrooms, active science labs, and creative play areas to prepare our students for board exam milestones and future life challenges.
              </p>
              <p>
                We invite you to join our school community, explore our sports and arts facilities, and build a rewarding academic path for your child.
              </p>
            </div>
            
            <div className="pt-2">
              <span className="block text-xs font-bold text-[#2E1E17]">Mr. Rajesh Kumar</span>
              <span className="block text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Director, Edukids School</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
