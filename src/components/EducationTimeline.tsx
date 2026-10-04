import React from 'react';
import { GraduationCap, Sparkles, Calendar, BookOpen, Trophy, Compass, CheckCircle } from 'lucide-react';

export const EducationTimeline: React.FC = () => {
  const milestones = [
    {
      year: '2026 (Semester 1 - 2 // CURRENT)',
      title: 'First-Year Engineering & AI Onboarding',
      institution: 'VIT Chennai (Vellore Institute of Technology)',
      status: 'In Progress // Fresher',
      statusColor: 'text-emerald-300 bg-emerald-500/20 border-emerald-500/50',
      description: 'Building deep foundations in engineering mathematics (Calculus, Linear Algebra), C++ algorithmic problem solving, digital logic, and introduction to artificial intelligence methodologies.',
      points: [
        'Mastering core computational thinking & Data Structures basics',
        'Exploring machine learning pipelines and mathematical tensor calculus',
        'Active participation in university hackathons and AI student chapters'
      ]
    },
    {
      year: '2027 (Semester 3 - 4)',
      title: 'Machine Learning Systems & Algorithm Mastery',
      institution: 'VIT Chennai',
      status: 'Planned Trajectory',
      statusColor: 'text-rose-300 bg-rose-500/20 border-rose-500/50',
      description: 'Transitioning to advanced machine learning paradigms, operating systems, database management systems, and probability theory for statistical learning.',
      points: [
        'Comprehensive study of deep neural networks and PyTorch training pipelines',
        'Competitive programming and algorithmic complexity analysis',
        'Initiating research on specialized vision & transformer architectures'
      ]
    },
    {
      year: '2028 (Semester 5 - 6)',
      title: 'Deep Learning, Vision & Autonomous Agents',
      institution: 'VIT Chennai',
      status: 'Future Milestone',
      statusColor: 'text-slate-200 bg-[#161636] border-slate-600',
      description: 'Specialization modules covering Computer Vision, Natural Language Processing, Reinforcement Learning, and distributed AI computing systems.',
      points: [
        'Building autonomous agent workflows and RAG retrieval networks',
        'Industry internship and open-source machine learning contributions',
        'Publishing undergraduate research in peer-reviewed conferences'
      ]
    },
    {
      year: '2029 – 2030 (Semester 7 - 8)',
      title: 'Capstone Thesis & Engineering Graduation',
      institution: 'VIT Chennai',
      status: 'Graduation Year',
      statusColor: 'text-amber-300 bg-amber-500/20 border-amber-500/50',
      description: 'Major capstone project in generative artificial intelligence and deployment of production-grade neural systems, completing the B.Tech degree.',
      points: [
        'Final Year Capstone Project in frontier AI & machine intelligence',
        'Transition to high-impact AI/ML engineering or advanced master’s/research',
        'Graduation with honors in B.Tech CSE (AI & ML)'
      ]
    }
  ];

  return (
    <section id="education" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-20">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>ACADEMIA // 04</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white">
          ACADEMIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-300">TRAJECTORY</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
          A dedicated 4-year roadmap at Vellore Institute of Technology (VIT Chennai), synthesizing algorithmic foundations with frontier AI specialization.
        </p>
      </div>

      {/* University Hero Card - High Contrast Solid Surface */}
      <div className="rounded-3xl bg-[#0b0b20] border-2 border-slate-700/80 p-6 sm:p-8 mb-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30 shrink-0">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-rose-300 uppercase tracking-widest block">
              PREMIER TECHNICAL INSTITUTION
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk'] mt-0.5">
              Vellore Institute of Technology, Chennai
            </h3>
            <p className="text-sm sm:text-base text-slate-200 font-medium mt-1">
              B.Tech in Computer Science and Engineering (Specialization: AI & ML)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
          <div className="px-4 py-2.5 rounded-xl bg-[#141433] border-2 border-slate-700 text-center">
            <span className="text-slate-400 block text-[10px] font-semibold">COHORT</span>
            <span className="text-white font-bold text-sm">2026 – 2030</span>
          </div>
          <div className="px-4 py-2.5 rounded-xl bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-300 text-center">
            <span className="text-emerald-300/80 block text-[10px] font-semibold">STATUS</span>
            <span className="font-bold text-sm">FIRST YEAR / FRESHER</span>
          </div>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="relative border-l-4 border-slate-700/80 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
        {milestones.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot */}
            <div className={`absolute -left-[32px] sm:-left-[48px] top-1.5 w-5 h-5 rounded-full border-4 border-[#060614] ${idx === 0 ? 'bg-rose-500 ring-4 ring-rose-500/30' : 'bg-slate-400'}`} />

            {/* Card Content - Solid Dark Surface */}
            <div className="rounded-2xl bg-[#0b0b20] border-2 border-slate-700/60 hover:border-rose-500/50 p-6 sm:p-7 shadow-xl transition-all duration-300">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-rose-300 tracking-wider">
                  {item.year}
                </span>
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${item.statusColor}`}>
                  {item.status}
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk']">
                {item.title}
              </h4>
              <p className="text-xs font-mono text-slate-300 font-semibold mt-1">
                {item.institution}
              </p>

              <p className="text-sm text-slate-200 font-normal mt-3 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-700/80 space-y-2.5">
                {item.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
