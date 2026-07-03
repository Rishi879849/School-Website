import React, { useState } from 'react';
import { Award, Star, BookOpen, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';

export default function CareerConstellation() {
  const [selectedNode, setSelectedNode] = useState(3); // Default selection: student's active step

  // Career Constellation steps
  const nodes = [
    { id: 1, name: 'Foundation Algebra (Class 9-10)', status: 'completed', desc: 'Baseline school mathematics, algebraic equations, geometry, and trigonometry foundations.', code: 'MATH-SEC', hours: '45 Hrs', skills: ['Quadratic Equations', 'Trigonometry', 'Coordinate Geometry'] },
    { id: 2, name: 'Science & Physics (Class 10)', status: 'completed', desc: 'Introductory physics, chemical reactions, and basic computational coding logic.', code: 'SCI-SEC', hours: '30 Hrs', skills: ['Light & Electricity', 'Chemical Bonding', 'Python Basics'] },
    { id: 3, name: 'Stream Specialization (Class 11)', status: 'active', desc: 'Focus in senior secondary streams: advanced mathematics, mechanics, or computer science.', code: 'STEM-11', hours: '40 Hrs', skills: ['Limits & Derivatives', 'Mechanics', 'OOP Coding'] },
    { id: 4, name: 'Board Exams Prep (Class 12)', status: 'locked', desc: 'Comprehensive board exam mock tests, secondary school certificates preparation, and experiments.', code: 'BOARD-12', hours: '50 Hrs', skills: ['Calculus', 'Organic Chemistry', 'Data Structures'] },
    { id: 5, name: 'Olympiad & Entrances', status: 'locked', desc: 'National-level entrance exams prep, mathematics olympiads, and higher studies path mentoring.', code: 'ENTR-12', hours: '65 Hrs', skills: ['Aptitude Testing', 'Olympiad Math', 'Higher Education'] }
  ];

  return (
    <div className="w-full bg-white border border-[#2E1E17]/10 rounded-3xl p-6 text-left shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-[#2E1E17]/10 pb-4 gap-4">
        <div>
          <h3 className="text-base font-bold text-[#2E1E17] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF733B] animate-ping"></span> 
            AI Academic & Study Roadmap
          </h3>
          <p className="text-xs text-gray-500 mt-1">Interactive study roadmap to target: STEM & Higher Education Path</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500 font-semibold">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Completed</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Current Target</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-400"></span> Locked</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Constellation visualization column (SVG map) */}
        <div className="lg:col-span-7 relative h-72 flex items-center justify-center bg-[#FAF6F0] rounded-2xl border border-[#2E1E17]/10 p-4 overflow-hidden shadow-inner">
          {/* Animated background stars */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2e1e17_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <svg className="w-full h-full max-w-lg overflow-visible" viewBox="0 0 600 200">
            {/* SVG paths */}
            <path
              d="M 50,100 Q 150,40 250,100 T 450,100 T 550,130"
              fill="none"
              stroke="rgba(46,30,23,0.06)"
              strokeWidth="4"
            />
            {/* Glowing active path */}
            <path
              d="M 50,100 Q 150,40 250,100"
              fill="none"
              stroke="url(#gradient-completed-light)"
              strokeWidth="4"
              className="stroke-emerald-500"
              style={{ strokeDasharray: '8,8' }}
            />

            <defs>
              <linearGradient id="gradient-completed-light" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>

            {/* Render Nodes along coordinates */}
            {[
              { id: 1, cx: 50, cy: 100, label: '01' },
              { id: 2, cx: 150, cy: 55, label: '02' },
              { id: 3, cx: 250, cy: 100, label: '03' },
              { id: 4, cx: 375, cy: 120, label: '04' },
              { id: 5, cx: 520, cy: 110, label: '05' }
            ].map((node) => {
              const nodeData = nodes.find(n => n.id === node.id);
              const isActive = selectedNode === node.id;
              
              let nodeColor = 'fill-white stroke-gray-400';

              if (nodeData.status === 'completed') {
                nodeColor = 'fill-emerald-100 stroke-emerald-500';
              } else if (nodeData.status === 'active') {
                nodeColor = 'fill-amber-100 stroke-amber-500';
              }

              return (
                <g 
                  key={node.id} 
                  className="cursor-pointer group"
                  onClick={() => setSelectedNode(node.id)}
                >
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={isActive ? 22 : 16}
                    className={`transition-all duration-300 ${
                      isActive ? 'stroke-[#FF733B]/40 fill-[#FF733B]/5' : 'stroke-transparent fill-transparent group-hover:fill-black/5'
                    }`}
                  />
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r="12"
                    className={`transition-all duration-300 border-2 stroke-2 ${nodeColor}`}
                  />
                  <text
                    x={node.cx}
                    y={node.cy + 4}
                    textAnchor="middle"
                    className="text-[9px] font-extrabold fill-gray-700 pointer-events-none"
                  >
                    {node.label}
                  </text>
                  <text
                    x={node.cx}
                    y={node.cy - 18}
                    textAnchor="middle"
                    className={`text-[9px] font-bold transition-all ${
                      isActive ? 'fill-black' : 'fill-gray-400 group-hover:fill-gray-600'
                    }`}
                  >
                    {nodeData.name.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected node details column */}
        <div className="lg:col-span-5 flex flex-col justify-between h-72">
          {(() => {
            const data = nodes.find(n => n.id === selectedNode);
            return (
              <div className="bg-[#FAF6F0] rounded-2xl p-5 border border-[#2E1E17]/10 flex flex-col justify-between h-full relative overflow-hidden">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{data.code} • {data.hours}</span>
                    <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase border ${
                      data.status === 'completed' 
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                        : data.status === 'active'
                        ? 'bg-amber-100 text-amber-700 border-amber-200'
                        : 'bg-white text-gray-400 border-gray-200'
                    }`}>
                      {data.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#2E1E17] flex items-center gap-1.5 font-serif">
                    {data.name} 
                    {data.status === 'completed' && <CheckCircle2 size={14} className="text-emerald-600" />}
                  </h4>

                  <p className="text-xs text-gray-600 leading-relaxed">{data.desc}</p>
                </div>

                <div className="space-y-2 border-t border-[#2E1E17]/10 pt-3 mt-3">
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block">Topics Covered:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {data.skills.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className={`text-[9px] px-2 py-0.5 rounded font-semibold ${
                          data.status === 'completed' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                            : 'bg-white text-gray-600 border border-gray-200'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {data.status === 'active' && (
                  <button className="w-full mt-4 bg-[#FF733B] hover:bg-[#E6622E] text-white font-extrabold py-2 rounded-lg text-xs uppercase tracking-widest hover:scale-[1.02] transition">
                    Launch Study Planner
                  </button>
                )}
                {data.status === 'locked' && (
                  <div className="w-full mt-4 bg-[#2E1E17]/5 border border-[#2E1E17]/10 text-gray-400 text-xs py-2 rounded-lg text-center flex items-center justify-center gap-1.5 font-bold">
                    <Lock size={12} /> Syllabus Lock: Complete active node
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
