/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Component as HorizonHero } from '@/components/ui/horizon-hero-section';
import { DemoOne } from '@/components/ui/demo';
import { Navbar } from './components/Navbar';
import { NavigationDrawer } from './components/NavigationDrawer';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationTimeline } from './components/EducationTimeline';
import { ContactSection } from './components/ContactSection';
import { CosmicAudio } from './components/CosmicAudio';
import { Sparkles, Terminal, ChevronDown, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'portfolio' | 'demo'>('portfolio');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'hero-top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If the user selects the pure isolated demo
  if (activeView === 'demo') {
    return (
      <div className="relative min-h-screen bg-[#060614] text-white">
        {/* Floating return HUD */}
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
          <button
            onClick={() => setActiveView('portfolio')}
            className="px-4 py-2 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-rose-500/50 text-xs font-mono text-rose-300 shadow-xl transition-all"
          >
            ← BACK TO FULL PORTFOLIO
          </button>
        </div>

        {/* Demo Component directly as defined in demo.tsx */}
        <DemoOne />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#060614] text-white overflow-x-hidden selection:bg-rose-500 selection:text-white">
      {/* Top Floating HUD Navbar */}
      <Navbar
        onOpenMenu={() => setIsDrawerOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
        onNavigateSection={handleNavigateSection}
      />

      {/* SPACE Navigation Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeView={activeView}
        setActiveView={setActiveView}
        onNavigateSection={handleNavigateSection}
      />

      {/* Ambient Cosmic Sound Synthesizer */}
      <CosmicAudio />

      {/* 3D Horizon & Cosmos Hero Section */}
      <div id="hero-top" className="relative">
        <HorizonHero
          onMenuClick={() => setIsDrawerOpen(true)}
          title1="HORIZON"
          title2="COSMOS"
          title3="YATHIN KUMAR"
          sub1Line1="Where vision meets reality,"
          sub1Line2="we shape the future of tomorrow"
          sub2Line1="Beyond the boundaries of imagination,"
          sub2Line2="lies the universe of possibilities"
        />
      </div>

      {/* Smooth feather transition between 3D Hero and Portfolio */}
      <div className="relative z-20 h-28 -mt-28 pointer-events-none bg-gradient-to-b from-transparent via-[#060614]/80 to-[#070717]" />

      {/* Futuristic Telemetry Ribbon */}
      <div className="relative z-30 border-y-2 border-slate-700/80 bg-[#070717] py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-bold tracking-wide">STATUS: OPEN FOR RESEARCH & HACKATHONS</span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-slate-300 font-semibold">
            <span>INSTITUTE: <strong className="text-white">VIT CHENNAI</strong></span>
            <span>DEGREE: <strong className="text-white">B.TECH CSE (AI & ML)</strong></span>
            <span>COHORT: <strong className="text-white">2026 – 2030</strong></span>
          </div>

          <button
            onClick={() => handleNavigateSection('about')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-colors ml-auto sm:ml-0 font-bold border border-rose-500/40"
          >
            <span>ENTER ORBIT</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Portfolio Core Sections - Pristine, deep space backdrop where the light effect has cleanly ended */}
      <main className="relative z-30 bg-[#060614] space-y-16 py-12">
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationTimeline />
        <ContactSection />
      </main>

      {/* Futuristic Aerospace Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-[#020208] py-14 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-lg font-bold font-['Space_Grotesk'] text-white">
                YATHIN KUMAR
              </span>
            </div>
            <p className="text-xs text-white/50 max-w-sm">
              B.Tech Computer Science & Engineering (Artificial Intelligence & Machine Learning), VIT Chennai • Batch of 2030.
            </p>
          </div>

          {/* Quick nav */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-white/60">
            <button onClick={() => handleNavigateSection('hero-top')} className="hover:text-rose-400 transition-colors">
              HORIZON
            </button>
            <button onClick={() => handleNavigateSection('about')} className="hover:text-rose-400 transition-colors">
              IDENTITY
            </button>
            <button onClick={() => handleNavigateSection('skills')} className="hover:text-rose-400 transition-colors">
              AI MATRIX
            </button>
            <button onClick={() => handleNavigateSection('projects')} className="hover:text-rose-400 transition-colors">
              LABS
            </button>
            <button onClick={() => handleNavigateSection('education')} className="hover:text-rose-400 transition-colors">
              ACADEMIA
            </button>
            <button onClick={() => handleNavigateSection('contact')} className="hover:text-rose-400 transition-colors">
              TRANSMIT
            </button>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all group"
            title="Return to Horizon Zenith"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-white/40">
          <span>© {new Date().getFullYear()} YATHIN KUMAR. ALL RIGHTS RESERVED.</span>
          <span>CRAFTED WITH THREE.JS • REACT 19 • TAILWIND CSS • SHADCN STRUCTURE</span>
        </div>
      </footer>
    </div>
  );
}
