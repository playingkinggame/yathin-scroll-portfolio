import React, { useState } from 'react';
import { Brain, Cpu, Layers, Code2, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface SkillItem {
  name: string;
  level: string;
  badge: string;
  highlight?: boolean;
}

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'ai' | 'web' | 'systems' | 'math'>('ai');

  const categories = [
    {
      id: 'ai' as const,
      label: 'AI & Machine Learning',
      icon: Brain,
      desc: 'Neural architectures, data preprocessing, deep learning frameworks, and model evaluation'
    },
    {
      id: 'web' as const,
      label: '3D Graphics & Modern Web',
      icon: Layers,
      desc: 'Three.js shaders, WebGL rendering, React 19, GSAP animations, and Tailwind styling'
    },
    {
      id: 'systems' as const,
      label: 'Core Languages & Systems',
      icon: Cpu,
      desc: 'C++, Python, memory concepts, algorithms, Git version control, and Linux environment'
    },
    {
      id: 'math' as const,
      label: 'Mathematics for AI',
      icon: Code2,
      desc: 'Linear algebra, matrix calculus, probability distributions, and gradient optimization'
    }
  ];

  const skillsData: Record<string, SkillItem[]> = {
    ai: [
      { name: 'Python', level: 'Proficient', badge: 'Core Language', highlight: true },
      { name: 'PyTorch', level: 'Building Models', badge: 'Deep Learning', highlight: true },
      { name: 'Scikit-Learn', level: 'Active', badge: 'Classical ML' },
      { name: 'TensorFlow / Keras', level: 'Familiar', badge: 'Neural Nets' },
      { name: 'OpenCV', level: 'Exploring', badge: 'Computer Vision' },
      { name: 'Hugging Face Transformers', level: 'Implementing', badge: 'LLMs & NLP' },
      { name: 'NumPy & Pandas', level: 'Proficient', badge: 'Data Wrangling' },
      { name: 'Neural Networks Architecture', level: 'Foundational', badge: 'Theory & Math' }
    ],
    web: [
      { name: 'Three.js / WebGL', level: 'Active Build', badge: '3D Celestial Visuals', highlight: true },
      { name: 'React 19 & TypeScript', level: 'Proficient', badge: 'Frontend Core', highlight: true },
      { name: 'GSAP (GreenSock)', level: 'Timeline Animations', badge: 'Motion' },
      { name: 'Tailwind CSS', level: 'Proficient', badge: 'Modern Styling' },
      { name: 'Vite & Bundlers', level: 'Proficient', badge: 'Tooling' },
      { name: 'GLSL Shaders', level: 'Learning & Tweaking', badge: 'Custom Visuals' },
      { name: 'shadcn/ui Design Pattern', level: 'Integrated', badge: 'UI Components' },
      { name: 'Responsive Web Design', level: 'High Quality', badge: 'Cross-Device' }
    ],
    systems: [
      { name: 'C++ (Modern C++)', level: 'Core Academics', badge: 'Systems & DSA', highlight: true },
      { name: 'Data Structures & Algorithms', level: 'Active Practice', badge: 'Problem Solving' },
      { name: 'Git & GitHub', level: 'Version Control', badge: 'Workflow' },
      { name: 'Linux / Bash Scripting', level: 'Everyday OS', badge: 'Dev Environment' },
      { name: 'Object-Oriented Design', level: 'Solid Base', badge: 'Software Eng' },
      { name: 'REST APIs & Express', level: 'Practical', badge: 'Backend' }
    ],
    math: [
      { name: 'Linear Algebra', level: 'Academic Rigor', badge: 'Tensors & Vector Spaces', highlight: true },
      { name: 'Multivariable Calculus', level: 'In Progress', badge: 'Gradients & Backprop' },
      { name: 'Probability & Statistics', level: 'Foundations', badge: 'Distributions & Bayes' },
      { name: 'Discrete Mathematics', level: 'Coursework', badge: 'Graph Theory & Logic' }
    ]
  };

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-20">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CAPABILITIES // 02</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white">
          THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-300">INTELLIGENCE</span> STACK
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
          A focused developer arsenal engineered for artificial intelligence, machine learning algorithms, and high-performance visual computing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Category selector */}
        <div className="lg:col-span-4 space-y-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between shadow-lg ${
                  isSelected
                    ? 'bg-[#141438] border-rose-500 shadow-rose-500/20'
                    : 'bg-[#0b0b20] border-slate-700/60 hover:bg-[#101030] hover:border-slate-500'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30' : 'bg-[#181838] text-rose-300'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-['Space_Grotesk'] text-white">
                      {cat.label}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                      {cat.desc}
                    </p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-rose-400 translate-x-1' : 'text-slate-500'}`} />
              </button>
            );
          })}

          <div className="p-5 rounded-2xl bg-[#0f0e2b] border-2 border-rose-500/30 mt-6 shadow-xl">
            <span className="text-xs font-mono text-rose-300 font-bold tracking-wider block uppercase mb-1.5">
              CONTINUOUS LEARNING AT VIT
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              Currently deepening understanding of algorithmic efficiency and practical deep learning models while participating in student technical events and collaborative coding sprints.
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="lg:col-span-8 rounded-3xl bg-[#0b0b20] border-2 border-slate-700/60 p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                {categories.find(c => c.id === selectedCategory)?.label}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                {categories.find(c => c.id === selectedCategory)?.desc}
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#181838] text-rose-300 border border-slate-600 shadow-sm shrink-0">
              {skillsData[selectedCategory].length} TECHNOLOGIES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillsData[selectedCategory].map((skill, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border-2 transition-all ${
                  skill.highlight
                    ? 'bg-[#151233] border-rose-500/50 hover:border-rose-400 shadow-md'
                    : 'bg-[#10102b] border-slate-700/60 hover:border-slate-500 hover:bg-[#131333]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${skill.highlight ? 'text-rose-400' : 'text-emerald-400'}`} />
                    <span className="text-sm font-bold text-white font-mono">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#1f1e42] text-rose-200 border border-slate-600 shrink-0">
                    {skill.badge}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-medium">Proficiency:</span>
                  <span className="text-rose-300 font-bold">{skill.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
