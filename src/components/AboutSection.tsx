import React, { useState } from 'react';
import { Terminal, BrainCircuit, Cpu, Sparkles, BookOpen, MapPin, Calendar, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'terminal' | 'academics'>('profile');
  const [commandHistory, setCommandHistory] = useState<Array<{ cmd: string; result: string | React.ReactNode }>>([
    {
      cmd: 'yathin.identity()',
      result: 'Yathin Kumar | B.Tech CSE (Spec. AI & ML) | VIT Chennai (2026-2030)'
    },
    {
      cmd: 'yathin.current_focus()',
      result: 'Building autonomous AI agents, exploring PyTorch neural architectures, and crafting high-performance 3D WebGL experiences.'
    }
  ]);
  const [currentCmd, setCurrentCmd] = useState('');

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let res: string | React.ReactNode = '';

    if (trimmed === 'help') {
      res = 'Available commands: whoami, edu, skills, goals, clear, contact';
    } else if (trimmed === 'whoami' || trimmed === 'yathin.whoami()') {
      res = 'Yathin Kumar: First-year Computer Science Engineering student passionate about Artificial Intelligence, Machine Learning, and Interactive 3D Web Systems.';
    } else if (trimmed === 'edu' || trimmed === 'yathin.edu()') {
      res = 'Vellore Institute of Technology (VIT Chennai) - B.Tech CSE with specialization in AI & ML (Batch: 2026-2030)';
    } else if (trimmed === 'skills' || trimmed === 'yathin.skills()') {
      res = 'Python, PyTorch, C++, TypeScript, React, Three.js, Math for ML (Linear Algebra, Multivariable Calculus)';
    } else if (trimmed === 'goals' || trimmed === 'yathin.goals()') {
      res = 'Hackathons, open-source AI contributions, research papers in generative models, and pushing the boundaries of AI & 3D computing.';
    } else if (trimmed === 'clear') {
      setCommandHistory([]);
      return;
    } else if (trimmed === 'contact') {
      res = 'Email: yathinkumar.a2026@gmail.com | Open for tech partnerships & hackathons.';
    } else {
      res = `Command '${trimmed}' unrecognized. Type 'help' for available diagnostic commands.`;
    }

    setCommandHistory(prev => [...prev, { cmd, result: res }]);
    setCurrentCmd('');
  };

  return (
    <section id="about" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-20">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>IDENTITY // 01</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white">
          THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-red-400 to-amber-300">ARCHITECT</span> BEHIND THE SYSTEM
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
          Bridging foundational computer science with cutting-edge artificial intelligence, neural computing, and immersive digital horizons.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Profile Card - Solid High-Contrast Dark Surface */}
        <div className="lg:col-span-5 rounded-3xl bg-[#0b0b20] border-2 border-slate-700/60 p-6 sm:p-8 relative overflow-hidden shadow-2xl hover:border-rose-500/50 transition-all duration-300">
          {/* Avatar / Holographic badge */}
          <div className="flex items-center gap-5 pb-6 border-b border-slate-700/80">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-400 p-[2.5px] shadow-lg shadow-rose-500/30">
                <div className="w-full h-full rounded-2xl bg-[#070717] flex items-center justify-center text-2xl font-black font-['Space_Grotesk'] text-white">
                  YK
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 p-1.5 bg-emerald-500 rounded-full border-2 border-[#0b0b20]" title="Active & Ready" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                Yathin Kumar
              </h3>
              <p className="text-rose-400 text-sm font-mono font-semibold mt-1">
                AI & ML Engineer • Fresher
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Chennai, India (VIT)</span>
              </div>
            </div>
          </div>

          {/* Academic Highlights */}
          <div className="py-6 space-y-4 border-b border-slate-700/80">
            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#12122f] border border-slate-700/60">
              <div className="p-2 rounded-lg bg-rose-500/20 text-rose-300 mt-0.5 shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-rose-300 font-semibold tracking-wider block">
                  DEGREE & MAJOR
                </span>
                <span className="text-sm font-bold text-white block mt-0.5">
                  B.Tech in Computer Science & Engineering
                </span>
                <span className="text-xs text-rose-300 block mt-1 font-mono font-medium">
                  Spec: Artificial Intelligence & Machine Learning
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#12122f] border border-slate-700/60">
              <div className="p-2 rounded-lg bg-rose-500/20 text-rose-300 mt-0.5 shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-rose-300 font-semibold tracking-wider block">
                  CAMPUS
                </span>
                <span className="text-sm font-bold text-white block mt-0.5">
                  Vellore Institute of Technology (VIT Chennai)
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#12122f] border border-slate-700/60">
              <div className="p-2 rounded-lg bg-rose-500/20 text-rose-300 mt-0.5 shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-rose-300 font-semibold tracking-wider block">
                  ACADEMIC COHORT
                </span>
                <span className="text-sm font-bold text-white block mt-0.5">
                  Batch 2026 – 2030 (First-Year Undergrad)
                </span>
              </div>
            </div>
          </div>

          {/* Quick statement */}
          <div className="pt-6">
            <p className="text-sm text-slate-200 leading-relaxed font-normal bg-[#12122f] p-4 rounded-xl border border-slate-700/60 italic">
              "Starting my journey with deep curiosity for algorithmic reasoning, machine intelligence, and high-fidelity computing. I believe the future belongs to engineers who can bridge mathematical rigour with breathtaking interactive experiences."
            </p>
          </div>
        </div>

        {/* Right Column: High-Contrast Focus Pillars & Terminal */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tab selector - High contrast solid pill */}
          <div className="flex rounded-2xl bg-[#0b0b20] p-1.5 border-2 border-slate-700/80 text-xs font-mono shadow-lg">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              FOCUS PILLARS
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${
                activeTab === 'terminal'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              INTERACTIVE CLI
            </button>
            <button
              onClick={() => setActiveTab('academics')}
              className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${
                activeTab === 'academics'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              ACADEMIC ROADMAP
            </button>
          </div>

          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#0b0b20] border-2 border-slate-700/60 hover:border-rose-500/60 transition-all shadow-xl">
                <div className="w-11 h-11 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 mb-4">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  Machine Learning & Deep Learning
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 mt-2.5 leading-relaxed font-normal">
                  Focusing on transformer architectures, gradient optimization, convolutional vision models, and fine-tuning open-weights models.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0b0b20] border-2 border-slate-700/60 hover:border-rose-500/60 transition-all shadow-xl">
                <div className="w-11 h-11 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  Algorithmic Rigor & Systems
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 mt-2.5 leading-relaxed font-normal">
                  Mastering data structures, algorithms, memory models in C++, and performance-critical computing from the silicon up.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0b0b20] border-2 border-slate-700/60 hover:border-rose-500/60 transition-all shadow-xl">
                <div className="w-11 h-11 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  3D Creative Computing
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 mt-2.5 leading-relaxed font-normal">
                  Harnessing Three.js, custom GLSL vertex/fragment shaders, and GSAP timelines to bring cosmic visual storytelling to the web.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0b0b20] border-2 border-slate-700/60 hover:border-rose-500/60 transition-all shadow-xl">
                <div className="w-11 h-11 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 mb-4">
                  <Terminal className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  Autonomous AI Agents
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 mt-2.5 leading-relaxed font-normal">
                  Exploring agentic decision loops, tool-calling pipelines, RAG with vector databases, and multi-modal interaction.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terminal' && (
            <div className="rounded-2xl bg-[#040410] border-2 border-slate-700/80 p-5 font-mono text-xs shadow-2xl">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/80 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-slate-400 text-xs font-semibold">yathin@vit-chennai: ~</span>
              </div>

              {/* Console log */}
              <div className="space-y-3 min-h-[220px] max-h-[280px] overflow-y-auto pr-2">
                <div className="text-slate-300 leading-relaxed">
                  Welcome to Yathin's developer console. Try typing <span className="text-rose-400 font-bold underline cursor-pointer" onClick={() => runCommand('help')}>'help'</span> or <span className="text-rose-400 font-bold underline cursor-pointer" onClick={() => runCommand('whoami')}>'whoami'</span>.
                </div>
                {commandHistory.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-rose-400 font-bold flex items-center gap-1.5">
                      <span className="text-slate-400">$</span>
                      <span>{item.cmd}</span>
                    </div>
                    <div className="text-slate-100 pl-3 border-l-2 border-rose-500/50 leading-relaxed font-normal">
                      {item.result}
                    </div>
                  </div>
                ))}
              </div>

              {/* Prompt Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (currentCmd) runCommand(currentCmd);
                }}
                className="mt-4 pt-3 border-t border-slate-700/80 flex items-center gap-2"
              >
                <span className="text-rose-400 font-bold">$</span>
                <input
                  type="text"
                  value={currentCmd}
                  onChange={(e) => setCurrentCmd(e.target.value)}
                  placeholder="Type a command (whoami, edu, skills, goals, contact)..."
                  className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-slate-500 text-xs font-mono font-medium"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg bg-rose-500 text-white font-bold hover:bg-rose-600 transition-colors shadow-sm"
                >
                  EXEC
                </button>
              </form>
            </div>
          )}

          {activeTab === 'academics' && (
            <div className="p-6 rounded-2xl bg-[#0b0b20] border-2 border-slate-700/60 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                <span className="text-base font-bold text-white font-['Space_Grotesk']">
                  B.Tech CSE - AI & ML Coursework at VIT Chennai
                </span>
                <span className="text-xs font-mono font-bold text-rose-400">2026 - 2030</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-[#12122f] border border-slate-700/60 flex items-start justify-between gap-4">
                  <div>
                    <span className="font-bold text-white text-sm block">Year 1 (Current // Fresher)</span>
                    <span className="text-slate-200 mt-1 block">Calculus & Linear Algebra • Problem Solving in C++ • Digital Logic • Intro to AI</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold shrink-0">
                    IN PROGRESS
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#12122f] border border-slate-700/60 flex items-start justify-between gap-4">
                  <div>
                    <span className="font-bold text-white text-sm block">Year 2 (Foundations of ML)</span>
                    <span className="text-slate-200 mt-1 block">Data Structures & Algorithms • Probability & Statistics for ML • Operating Systems • Python for Data Science</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-white/10 text-slate-300 text-xs font-mono font-medium shrink-0">
                    PLANNED
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#12122f] border border-slate-700/60 flex items-start justify-between gap-4">
                  <div>
                    <span className="font-bold text-white text-sm block">Year 3 & 4 (Advanced AI & Research)</span>
                    <span className="text-slate-200 mt-1 block">Deep Learning • Computer Vision • NLP & LLMs • Reinforcement Learning • Capstone Research</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-white/10 text-slate-300 text-xs font-mono font-medium shrink-0">
                    FUTURE
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
