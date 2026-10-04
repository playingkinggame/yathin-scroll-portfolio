import React, { useState } from 'react';
import { Sparkles, ExternalLink, Github, ArrowUpRight, Cpu, Eye } from 'lucide-react';
import { ProjectData, ProjectModal } from './ProjectModal';

export const ProjectsSection: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [filter, setFilter] = useState<'all' | 'ai' | '3d'>('all');

  const projects: ProjectData[] = [
    {
      id: 'blockworld',
      title: 'Blockworld 3D',
      subtitle: 'Playable Voxel Adventure & Interactive Developer Portfolio',
      category: '3D WebGL & Interactive Game',
      description: 'A playable voxel adventure game that doubles as my developer portfolio. Explore a fully 3D voxel world built with Three.js and React to discover projects, skills, and achievements, or switch to an accessible 2D portfolio view at any time.',
      architecture: [
        'Fully explorable 3D voxel world rendered in the browser with Three.js',
        'Projects, skills, and achievements discovered as in-world game content',
        'Accessible 2D portfolio view available as an instant alternate mode',
        'Global game and UI state managed with Zustand, deployed on Vercel'
      ],
      techStack: ['Three.js', 'React', 'TypeScript', 'Zustand', 'Tailwind CSS', 'Vite'],
      metrics: [
        { label: 'RENDERING', value: 'Three.js 3D' },
        { label: 'VIEW MODES', value: '3D + 2D' },
        { label: 'DEPLOYMENT', value: 'Vercel' }
      ],
      githubUrl: 'https://github.com/playingkinggame/game_portfolio_ultra',
      liveUrl: 'https://yathin-game-portfolio-ultra.vercel.app',
      imageBg: 'radial-gradient(circle at top right, #381045, #080718)'
    },
    {
      id: 'jarvis',
      title: 'J.A.R.V.I.S Assistant',
      subtitle: 'Voice-Controlled Desktop AI with Computer Vision',
      category: 'AI Assistant & Computer Vision',
      description: 'A voice-controlled personal desktop assistant with a cinematic PySide6 interface, computer vision, hand-tracking air drawing, app and window control, persistent memory, and a floating hologram mode window.',
      architecture: [
        'Wake-word voice listening with Groq-powered AI chat and intent handling',
        'Camera-based live scene analysis using YOLO object detection and OCR',
        'Hand-tracking air-drawing app built on OpenCV and MediaPipe',
        'Persistent facts memory stored in MySQL, plus screen analysis and a floating hologram window'
      ],
      techStack: ['Python', 'PySide6', 'OpenCV', 'MediaPipe', 'YOLOv8', 'MySQL'],
      metrics: [
        { label: 'INTERFACE', value: 'Voice + Vision' },
        { label: 'AI ENGINE', value: 'Groq LLM' },
        { label: 'PLATFORM', value: 'Windows' }
      ],
      githubUrl: 'https://github.com/playingkinggame/advance_jarvis_project',
      imageBg: 'radial-gradient(circle at top right, #102a45, #080718)'
    },
    {
      id: 'autopilot',
      title: 'Autopilot Job Agent',
      subtitle: 'Autonomous Job Matching & Cover Letter Agent with Critic Loop',
      category: 'LLMs & AI Agents',
      description: 'An AI agent that finds real job and internship listings matching your resume, scores your fit for each, drafts tailored cover letters, and fact-checks every draft with an independent LLM critic before it is considered final. Every decision is logged and streamed live to a dashboard.',
      architecture: [
        'Planner, Executor, and Critic agent loop orchestrating every run',
        'Live job search via SerpApi Google Jobs with auto-generated queries from the resume',
        'LLM fit scoring (0-100) with reasoning, matched skills, and gaps',
        'Hallucination critic audits each cover letter against the resume, with live SSE decision log'
      ],
      techStack: ['Python', 'FastAPI', 'Groq', 'SerpApi', 'SQLite', 'JavaScript'],
      metrics: [
        { label: 'AGENT LOOP', value: 'Plan > Execute > Critic' },
        { label: 'FIT SCORING', value: '0-100' },
        { label: 'STREAMING', value: 'Live SSE Log' }
      ],
      githubUrl: 'https://github.com/playingkinggame/autopilot',
      imageBg: 'radial-gradient(circle at top right, #3d1b28, #080718)'
    },
    {
      id: 'finpilot',
      title: 'FinPilot',
      subtitle: 'AI-Powered Private Financial Operating System',
      category: 'AI Application & Systems',
      description: 'An AI-assisted personal finance workspace to track transactions, budgets, goals, and subscriptions, visualize cash flow, and ask a Groq-powered copilot questions about your own money, all backed by your own private Supabase database.',
      architecture: [
        'Dashboard, analytics, cash flow, What-If simulator, money-leak detector, and expense DNA',
        'AI Copilot chat and receipt scanning powered by Groq',
        'Email/password auth and Google Sign-In via Supabase Auth',
        'Postgres schema with Row Level Security scoping every row to the signed-in user, plus offline Demo Mode'
      ],
      techStack: ['React 19', 'TypeScript', 'Supabase', 'Groq', 'Tailwind CSS', 'Express'],
      metrics: [
        { label: 'DATA SECURITY', value: 'Row Level Security' },
        { label: 'AI MODEL', value: 'Llama 3.3 70B' },
        { label: 'AUTH', value: 'Google + Email' }
      ],
      githubUrl: 'https://github.com/playingkinggame/FinPilot',
      liveUrl: 'https://yathin-finpilot.vercel.app',
      imageBg: 'radial-gradient(circle at top right, #1f143d, #080718)'
    }
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === 'ai') return p.category.includes('AI') || p.category.includes('Deep Learning') || p.category.includes('LLM');
    if (filter === '3d') return p.category.includes('3D') || p.category.includes('WebGL');
    return true;
  });

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-20">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INNOVATIONS // 03</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white">
          FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-red-400 to-amber-300">EXPERIMENTS</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
          Showcasing practical explorations in neural architectures, real-time computer vision, autonomous systems, and interactive 3D simulations.
        </p>

        {/* Filter tags - High contrast */}
        <div className="flex items-center gap-2 mt-8 p-1.5 rounded-2xl bg-[#0b0b20] border-2 border-slate-700/80 text-xs font-mono shadow-lg">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              filter === 'all'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            ALL PROJECTS
          </button>
          <button
            onClick={() => setFilter('ai')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              filter === 'ai'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            AI & DEEP LEARNING
          </button>
          <button
            onClick={() => setFilter('3d')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              filter === '3d'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            3D WEBGL & GRAPHICS
          </button>
        </div>
      </div>

      {/* Projects Grid - Solid Dark Surfaces */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setActiveProject(project)}
            className="group cursor-pointer rounded-3xl border-2 border-slate-700/60 bg-[#0b0b20] hover:border-rose-500 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 shadow-2xl hover:shadow-rose-500/15 flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              {/* Category & Action */}
              <div className="flex items-center justify-between relative z-10 mb-5">
                <span className="text-xs font-mono font-bold tracking-wider text-rose-300 bg-rose-500/20 px-3.5 py-1.5 rounded-full border border-rose-500/40 uppercase">
                  {project.category}
                </span>
                <div className="w-10 h-10 rounded-full bg-[#141433] border border-slate-600 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:border-rose-500 group-hover:bg-rose-500 transition-all shadow-md">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk'] group-hover:text-rose-300 transition-colors relative z-10">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-rose-300 font-mono font-semibold mt-1.5 relative z-10">
                {project.subtitle}
              </p>

              {/* Description */}
              <p className="mt-4 text-sm text-slate-200 line-clamp-3 font-normal leading-relaxed relative z-10">
                {project.description}
              </p>
            </div>

            {/* Bottom Tech badges & metrics */}
            <div className="mt-8 pt-6 border-t border-slate-700/80 relative z-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono font-semibold px-3 py-1 rounded-lg bg-[#141433] text-slate-200 border border-slate-600"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-[#141433] text-slate-400 border border-slate-700">
                    +{project.techStack.length - 4} more
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <span className="flex items-center gap-1.5 text-rose-400 font-bold group-hover:underline">
                  <Eye className="w-4 h-4" />
                  VIEW SYSTEM DETAILS
                </span>
                <span className="text-slate-300 font-bold bg-[#141433] px-2.5 py-1 rounded-md border border-slate-700">
                  {project.metrics[0].label}: <span className="text-rose-300">{project.metrics[0].value}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};