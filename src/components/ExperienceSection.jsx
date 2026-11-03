import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { verifiedExperience, education } from '../data/portfolioData';

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative min-h-screen py-24 px-6 sm:px-12 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Briefcase size={14} className="text-cyan-400" />
            <span className="tracking-widest">THE INFINITE CORRIDOR</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Chronology of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Impact & Mastery</span>
          </h2>

          <p className="text-slate-300 font-sans text-sm sm:text-base">
            Verified production engineering milestones, data pipeline leadership, and academic foundations.
          </p>
        </div>

        {/* Timeline Corridor Architecture */}
        <div className="relative border-l-2 border-cyan-500/30 ml-4 md:ml-32 pl-6 sm:pl-10 space-y-12">
          
          {/* Milestone 1: Vangrove Tech */}
          {verifiedExperience.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Pulsing Corridor Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1 w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.8)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </div>

              {/* Experience Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 bg-slate-950/60 shadow-2xl relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/30">
                      PRIMARY PRODUCTION APPOINTMENT
                    </span>
                    <h3 className="text-2xl font-bold font-sans text-white mt-1">
                      {exp.role} <span className="text-cyan-400">@ {exp.company}</span>
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Calendar size={13} className="text-cyan-400" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="text-slate-600">/</span>
                    <span className="flex items-center space-x-1">
                      <MapPin size={13} className="text-slate-400" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Verified Bullet Highlights */}
                <div className="space-y-3 mb-6">
                  {exp.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start space-x-3 text-slate-300 text-sm leading-relaxed">
                      <CheckCircle2 size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Employed */}
                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 mr-2">TECH DEPLOYED:</span>
                  {exp.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Milestone 2: Education (MLRIT) */}
          <div className="relative group">
            {/* Secondary Node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1 w-6 h-6 rounded-full bg-slate-950 border-2 border-indigo-400 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.6)]">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
            </div>

            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 bg-slate-950/60 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-indigo-400 tracking-wider uppercase bg-indigo-950/80 px-2.5 py-0.5 rounded border border-indigo-500/30">
                    ACADEMIC FOUNDATION
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans text-white mt-1">
                    {education.degree}
                  </h3>
                  <div className="text-sm font-mono text-slate-300 mt-0.5">
                    {education.institution} • {education.location}
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Calendar size={13} className="text-indigo-400" />
                    <span>{education.period}</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-500/40 font-bold">
                    CGPA: {education.cgpa}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
                {education.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <Zap size={15} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
