import React, { useState } from 'react';
import { ExternalLink, Github, ChevronRight, Layers, ArrowUpRight, Cpu, Eye, Workflow, Sparkles } from 'lucide-react';
import { verifiedProjects } from '../data/portfolioData';

export default function ProjectsSection({ onSelectProject = () => {} }) {
  const [filter, setFilter] = useState('ALL');

  const categories = ['ALL', 'AI & Vector Search', 'Agentic AI', 'Data Engineering', 'Business Intelligence', 'Spatial 3D & VR', 'Cloud Infrastructure'];

  const filteredProjects = filter === 'ALL'
    ? verifiedProjects
    : verifiedProjects.filter(p => p.category === filter);

  return (
    <section id="projects" className="relative min-h-screen py-24 px-6 sm:px-12 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Layers size={14} className="text-cyan-400" />
            <span className="tracking-widest">THE DATA UNIVERSE OBSERVATORY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Production Artifacts & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">Intelligent Systems</span>
          </h2>

          <p className="text-slate-300 font-sans text-sm sm:text-base">
            Verified production data architectures, autonomous multi-agent audit networks, high-throughput ETL engines, and award-winning spatial systems.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border focus:outline-none cursor-pointer ${
                filter === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                  : 'glass-panel text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Holographic Project Artifact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Corner Tech Framing Marks */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-cyan-500/40 group-hover:border-cyan-400 transition-colors" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-500/40 group-hover:border-cyan-400 transition-colors" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-500/40 group-hover:border-cyan-400 transition-colors" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-cyan-500/40 group-hover:border-cyan-400 transition-colors" />

              <div>
                {/* Header: Category Pill & Period */}
                <div className="flex items-center justify-between text-[11px] font-mono mb-3">
                  <span className="text-cyan-400 tracking-wider bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/30">
                    {project.category}
                  </span>
                  <span className="text-slate-500">{project.period}</span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-lg font-bold font-sans text-white group-hover:text-cyan-300 transition-colors mb-1 line-clamp-1">
                  {project.title}
                </h3>
                <div className="text-xs font-mono text-slate-400 mb-3">
                  {project.subtitle}
                </div>

                {/* Short Description */}
                <p className="text-slate-300 text-xs leading-relaxed mb-4 line-clamp-3">
                  {project.shortDescription}
                </p>

                {/* Key Verified Metrics Badges */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3 mb-4 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  {project.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="text-center">
                      <div className="text-xs font-mono font-bold text-cyan-400">{m.value}</div>
                      <div className="text-[9px] font-mono text-slate-400 truncate">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 4).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-500">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="inline-flex items-center space-x-1 text-cyan-400 group-hover:text-white transition-colors">
                    <span>INSPECT ARCHITECTURE</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                  
                  <span className="text-[11px] text-slate-500">
                    DETAILS →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
