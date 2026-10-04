import React from 'react';
import { Menu, Orbit, Sparkles, Terminal, Code2, GraduationCap, Send, Layers } from 'lucide-react';

interface NavbarProps {
  onOpenMenu: () => void;
  activeView: 'portfolio' | 'demo';
  setActiveView: (view: 'portfolio' | 'demo') => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMenu,
  activeView,
  setActiveView,
  onNavigateSection
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 flex items-center justify-between pointer-events-none">
      {/* Brand logo & status */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <button
          onClick={() => onNavigateSection('hero-top')}
          className="flex items-center gap-2.5 p-2 px-3.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 hover:border-rose-500/40 transition-all group"
        >
          <div className="w-2 h-2 rounded-full bg-rose-500 group-hover:scale-125 transition-transform" />
          <span className="font-bold text-xs tracking-wider font-['Space_Grotesk'] text-white">
            YATHIN KUMAR
          </span>
          <span className="text-[10px] font-mono text-white/40 hidden sm:inline">
            // VIT CHENNAI '30
          </span>
        </button>
      </div>

      {/* Center Nav Links (Hidden on small screens) */}
      <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 pointer-events-auto text-xs font-mono">
        <button
          onClick={() => {
            if (activeView !== 'portfolio') setActiveView('portfolio');
            onNavigateSection('hero-top');
          }}
          className="px-3.5 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          HORIZON
        </button>
        <button
          onClick={() => {
            if (activeView !== 'portfolio') setActiveView('portfolio');
            onNavigateSection('about');
          }}
          className="px-3.5 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          IDENTITY
        </button>
        <button
          onClick={() => {
            if (activeView !== 'portfolio') setActiveView('portfolio');
            onNavigateSection('skills');
          }}
          className="px-3.5 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          AI MATRIX
        </button>
        <button
          onClick={() => {
            if (activeView !== 'portfolio') setActiveView('portfolio');
            onNavigateSection('projects');
          }}
          className="px-3.5 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          LABS
        </button>
        <button
          onClick={() => {
            if (activeView !== 'portfolio') setActiveView('portfolio');
            onNavigateSection('education');
          }}
          className="px-3.5 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          ACADEMIA
        </button>
        <button
          onClick={() => {
            if (activeView !== 'portfolio') setActiveView('portfolio');
            onNavigateSection('contact');
          }}
          className="px-3.5 py-1.5 rounded-full text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 transition-colors"
        >
          CONNECT
        </button>
      </nav>

      {/* Right Controls: View Switcher & Hamburger */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="flex p-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-mono">
          <button
            onClick={() => setActiveView('portfolio')}
            className={`px-3 py-1 rounded-full transition-all ${
              activeView === 'portfolio'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            PORTFOLIO
          </button>
          <button
            onClick={() => setActiveView('demo')}
            className={`px-3 py-1 rounded-full transition-all ${
              activeView === 'demo'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            DEMO
          </button>
        </div>

        <button
          onClick={onOpenMenu}
          className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 hover:border-rose-500/40 text-white transition-all group"
          title="Open System Drawer"
        >
          <Menu className="w-4 h-4 text-white/80 group-hover:text-rose-400" />
        </button>
      </div>
    </header>
  );
};
