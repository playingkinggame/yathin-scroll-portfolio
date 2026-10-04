import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Github, Sparkles, Check, Code, Layers } from 'lucide-react';

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  architecture: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  githubUrl: string;
  liveUrl?: string;
  imageBg: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const isOpen = !!project;

  // Lock the page behind the modal while it is open, and close on Escape.
  useEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    const html = document.documentElement;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevPaddingRight;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog - Solid Dark Surface with High Contrast */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#09091e] border-2 border-slate-700 p-6 sm:p-8 z-10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-xl bg-[#141433] hover:bg-rose-500 text-slate-300 hover:text-white border border-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs font-mono font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{project.category}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk']">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-rose-300 font-mono font-semibold">
            {project.subtitle}
          </p>
        </div>

        {/* Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
          {project.metrics.map((m, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-[#141433] border-2 border-slate-700 text-center">
              <span className="text-xs text-slate-300 block font-mono font-bold">{m.label}</span>
              <span className="text-xl font-bold text-rose-400 font-['Space_Grotesk'] mt-0.5 block">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Detailed Description */}
        <div className="space-y-3 my-6">
          <h3 className="text-xs font-mono text-rose-300 uppercase tracking-wider font-bold flex items-center gap-2">
            <Layers className="w-4 h-4 text-rose-400" />
            System Blueprint & Impact
          </h3>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal bg-[#12122b] p-4 rounded-xl border border-slate-700/80">
            {project.description}
          </p>
        </div>

        {/* Architecture points */}
        <div className="space-y-3 my-6">
          <h3 className="text-xs font-mono text-rose-300 uppercase tracking-wider font-bold flex items-center gap-2">
            <Code className="w-4 h-4 text-rose-400" />
            Core Implementation Highlights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-200">
            {project.architecture.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#12122b] border border-slate-700/60 font-medium">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack badges */}
        <div className="space-y-2 my-6">
          <span className="text-xs font-mono text-slate-300 block font-bold">STACK UTILITIES:</span>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-[#141433] border border-slate-600 text-xs font-mono font-bold text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#141433] hover:bg-[#1a1a45] text-white text-xs font-mono font-bold border border-slate-600 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>SOURCE CODE</span>
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-mono font-bold shadow-lg shadow-rose-500/25 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>RUN SIMULATION</span>
              </a>
            )}
          </div>
          <span className="text-xs font-mono text-slate-400 font-medium">
            ENGINEERED BY YATHIN KUMAR
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
};