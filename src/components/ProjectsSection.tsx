import React, { useState } from 'react';
import { Sparkles, ExternalLink, Github, ArrowUpRight, Cpu, Eye } from 'lucide-react';
import { ProjectData, ProjectModal } from './ProjectModal';

export const ProjectsSection: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [filter, setFilter] = useState<'all' | 'ai' | '3d'>('all');

  const projects: ProjectData[] = [
    {
      id: 'neuro-horizon',
      title: 'NeuroHorizon 3D',
      subtitle: 'Real-Time Neural Topology & Latent Space Navigator',
      category: 'Deep Learning & 3D WebGL',
      description: 'An interactive 3D WebGL environment designed to visualize deep neural network activations, multidimensional manifold projections, and loss landscapes in real time. Built with Three.js, custom GLSL point cloud shaders, and PyTorch export bindings.',
      architecture: [
        'Custom GLSL vertex shader simulating 10,000+ interactive tensor nodes',
        'Dynamic camera trajectory synchronized with training epoch checkpoints',
        'Dimensionality reduction visualization via t-SNE and UMAP clustering',
        'Zero-dependency browser inference runner using ONNX Web Runtime'
      ],
      techStack: ['Three.js', 'PyTorch', 'GLSL Shaders', 'TypeScript', 'WebGL', 'React 19'],
      metrics: [
        { label: 'FRAMES PER SEC', value: '60 FPS' },
        { label: 'SYNAPSE NODES', value: '10,000+' },
        { label: 'LATENCY', value: '< 16ms' }
      ],
      githubUrl: 'https://github.com',
      liveUrl: '#',
      imageBg: 'radial-gradient(circle at top right, #381045, #080718)'
    },
    {
      id: 'aura-vision',
      title: 'AuraVision AI',
      subtitle: 'Zero-Contact Spatial Gesture & Computer Vision Engine',
      category: 'Computer Vision & AI',
      description: 'A contactless interaction framework powered by deep convolutional networks and landmark tracking. Enables users to navigate 3D space environments, manipulate virtual objects, and trigger neural inference through intuitive natural hand postures.',
      architecture: [
        '21-point dual-hand 3D skeleton tracking and temporal smoothing',
        'Lightweight CNN model optimized for edge devices and standard webcams',
        'Kinematic gesture classifier with sub-25 millisecond response time',
        'Real-time HUD overlay rendering vector telemetry in canvas'
      ],
      techStack: ['Python', 'OpenCV', 'PyTorch', 'MediaPipe', 'TypeScript', 'Canvas API'],
      metrics: [
        { label: 'GESTURE ACCURACY', value: '98.4%' },
        { label: 'INFERENCE SPEED', value: '24ms' },
        { label: 'KEYPOINTS', value: '42 Points' }
      ],
      githubUrl: 'https://github.com',
      imageBg: 'radial-gradient(circle at top right, #102a45, #080718)'
    },
    {
      id: 'cosmo-query',
      title: 'CosmoQuery Agent',
      subtitle: 'Autonomous ArXiv Research Copilot with RAG Synthesis',
      category: 'LLMs & AI Agents',
      description: 'An autonomous multi-step research agent tailored for computer science and AI researchers. Ingests raw arXiv papers, breaks down mathematical proofs, generates concise visual concept summaries, and maintains verified citation chains.',
      architecture: [
        'Hierarchical document vectorization with hybrid dense/sparse search',
        'Grounded reasoning loops ensuring zero mathematical hallucination',
        'Automatic LaTeX extraction and formula diagram generation',
        'Streaming markdown renderer with interactive citation tooltips'
      ],
      techStack: ['Python', 'Hugging Face', 'Vector DB', 'FastAPI', 'Tailwind CSS', 'React 19'],
      metrics: [
        { label: 'PAPERS INDEXED', value: '2,500+' },
        { label: 'GROUNDING SCORE', value: '99.1%' },
        { label: 'SUMMARY TIME', value: '1.2s' }
      ],
      githubUrl: 'https://github.com',
      imageBg: 'radial-gradient(circle at top right, #3d1b28, #080718)'
    },
    {
      id: 'vit-pulse',
      title: 'VIT CampusPulse AI',
      subtitle: 'Predictive Campus Intelligence & Student Scheduler',
      category: 'AI Application & Systems',
      description: 'A smart campus concept engineered specifically for VIT Chennai students. Features predictive dining crowd analytics, smart timetable conflict resolution, and peer study group matching powered by heuristic clustering.',
      architecture: [
        'Heuristic scheduling algorithm balancing student credits and fatigue score',
        'Predictive rush-hour forecasting for campus food courts using time-series models',
        'Encrypted local storage for student privacy and offline timetable sync',
        'Sleek dark-mode interface built with Tailwind CSS and Framer Motion'
      ],
      techStack: ['TypeScript', 'C++', 'Python', 'React 19', 'Tailwind CSS', 'IndexedDB'],
      metrics: [
        { label: 'SCHEDULE EFFICIENCY', value: '+35%' },
        { label: 'TARGET COHORT', value: 'VIT 2026-30' },
        { label: 'RESPONSE TIME', value: '50ms' }
      ],
      githubUrl: 'https://github.com',
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
