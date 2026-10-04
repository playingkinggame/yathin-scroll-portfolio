import React from 'react';
import { X, Orbit, Sparkles, Terminal, Code2, GraduationCap, Send, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: 'portfolio' | 'demo';
  setActiveView: (view: 'portfolio' | 'demo') => void;
  onNavigateSection: (sectionId: string) => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  activeView,
  setActiveView,
  onNavigateSection
}) => {
  if (!isOpen) return null;

  const navLinks = [
    { id: 'hero-top', label: '01 // HORIZON & COSMOS', icon: Orbit, subtitle: '3D Celestial Three.js Canvas' },
    { id: 'about', label: '02 // YATHIN KUMAR', icon: Terminal, subtitle: 'VIT Chennai CSE (AI & ML) Fresher' },
    { id: 'skills', label: '03 // AI MATRIX & TECH', icon: Code2, subtitle: 'PyTorch, Python, React, Three.js, C++' },
    { id: 'projects', label: '04 // EXPERIMENTS & LABS', icon: Sparkles, subtitle: 'Deep Learning & 3D Interactive Builds' },
    { id: 'education', label: '05 // ACADEMIC TRAJECTORY', icon: GraduationCap, subtitle: 'VIT Chennai (2026 – 2030)' },
    { id: 'contact', label: '06 // TRANSMISSION / CONNECT', icon: Send, subtitle: 'Collaborations & Hackathons' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-[#08081a]/95 border-l border-white/10 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 z-10 shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <div>
              <span className="text-xs font-mono tracking-widest text-rose-400 block uppercase">
                MISSION CONTROL
              </span>
              <span className="text-sm font-bold text-white font-['Space_Grotesk']">
                YATHIN KUMAR
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="my-5 p-1 rounded-xl bg-white/5 border border-white/10 flex">
          <button
            onClick={() => {
              setActiveView('portfolio');
              onClose();
            }}
            className={`flex-1 py-2 text-xs font-mono rounded-lg transition-all ${
              activeView === 'portfolio'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            PORTFOLIO MODE
          </button>
          <button
            onClick={() => {
              setActiveView('demo');
              onClose();
            }}
            className={`flex-1 py-2 text-xs font-mono rounded-lg transition-all ${
              activeView === 'demo'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            3D TEMPLATE DEMO
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto py-2 space-y-2 pr-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (activeView !== 'portfolio') setActiveView('portfolio');
                  onNavigateSection(item.id);
                  onClose();
                }}
                className="w-full text-left p-3.5 rounded-xl border border-white/5 hover:border-rose-500/30 bg-white/[0.02] hover:bg-white/[0.06] transition-all group flex items-start gap-4"
              >
                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20 group-hover:scale-105 transition-all mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white/90 group-hover:text-rose-400 transition-colors font-mono">
                    {item.label}
                  </div>
                  <div className="text-xs text-white/40 group-hover:text-white/70 transition-colors">
                    {item.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Quick Info */}
        <div className="pt-5 border-t border-white/10 space-y-3">
          <div className="text-[11px] font-mono text-white/50 flex justify-between">
            <span>INSTITUTE:</span>
            <span className="text-white/80 font-medium">VIT CHENNAI</span>
          </div>
          <div className="text-[11px] font-mono text-white/50 flex justify-between">
            <span>BATCH:</span>
            <span className="text-white/80 font-medium">2026 – 2030</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:yathinkumar.a2026@gmail.com"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              READY TO COLLABORATE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
