import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Layers, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ProjectModal({ project, onClose = () => {} }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl glass-panel border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl bg-slate-950/90 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 bg-black/60 transition-colors focus:outline-none"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>{project.category}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">{project.period}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            {project.title}
          </h2>
          <p className="text-sm font-mono text-slate-300">
            {project.subtitle}
          </p>
        </div>

        {/* Verified Impact Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 mb-6">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="text-center">
              <div className="text-lg sm:text-xl font-mono font-bold text-cyan-400">{metric.value}</div>
              <div className="text-xs font-mono text-slate-400">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Deep Architecture Description */}
        <div className="space-y-4 mb-6 text-sm text-slate-300 leading-relaxed font-sans">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            SYSTEM ARCHITECTURE & METHODOLOGY
          </div>
          <p>{project.fullDescription}</p>
        </div>

        {/* Pipeline Architecture Flowchart */}
        {project.architecture && (
          <div className="mb-6 p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20">
            <div className="text-[11px] font-mono font-bold text-slate-300 mb-2 flex items-center space-x-1.5">
              <Cpu size={14} className="text-cyan-400" />
              <span>DATA PIPELINE TOPOLOGY</span>
            </div>
            <div className="p-3 rounded-lg bg-black/60 border border-slate-800 font-mono text-xs text-cyan-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
              {project.architecture}
            </div>
          </div>
        )}

        {/* Technology Stack Tags */}
        <div className="mb-6">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
            INTEGRATED STACK
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 text-slate-200 border border-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer Links */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-cyan-400 text-slate-950 font-mono font-bold text-xs tracking-wider hover:bg-white transition-colors"
          >
            <Github size={15} />
            <span>ACCESS REPOSITORY</span>
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-slate-700 text-slate-300 hover:text-white font-mono text-xs tracking-wider transition-colors"
          >
            CLOSE TERMINAL
          </button>
        </div>
      </div>
    </div>
  );
}
