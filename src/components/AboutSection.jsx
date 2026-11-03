import React from 'react';
import { ShieldCheck, Database, Cpu, Sparkles, MapPin, Terminal, Award } from 'lucide-react';
import { personalInfo, verifiedMetrics } from '../data/portfolioData';

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen py-24 px-6 sm:px-12 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Dossier Framing & Core Mission */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="tracking-widest">TRANSCENDING THE DATA HORIZON</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            Synthesizing Raw Data Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Autonomous Intelligence.
            </span>
          </h2>

          <div className="space-y-4 text-slate-300 font-sans text-base sm:text-lg leading-relaxed">
            {personalInfo.aboutText.map((paragraph, index) => (
              <p key={index} className="glass-panel p-4 rounded-xl border border-slate-800/80 bg-slate-950/40">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Quick Verified Credentials Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="glass-panel p-3 rounded-xl border border-slate-800 flex items-center space-x-2.5">
              <MapPin size={18} className="text-cyan-400 flex-shrink-0" />
              <div>
                <div className="text-[10px] font-mono text-slate-400">BASE LOCATION</div>
                <div className="text-xs font-bold text-white">Hyderabad, India</div>
              </div>
            </div>

            <div className="glass-panel p-3 rounded-xl border border-slate-800 flex items-center space-x-2.5">
              <Award size={18} className="text-indigo-400 flex-shrink-0" />
              <div>
                <div className="text-[10px] font-mono text-slate-400">ACADEMICS</div>
                <div className="text-xs font-bold text-white">B.Tech CSE (7.34 CGPA)</div>
              </div>
            </div>

            <div className="glass-panel p-3 rounded-xl border border-slate-800 flex items-center space-x-2.5">
              <ShieldCheck size={18} className="text-emerald-400 flex-shrink-0" />
              <div>
                <div className="text-[10px] font-mono text-slate-400">CREDENTIALS</div>
                <div className="text-xs font-bold text-white">100% Resume Verified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Holographic Metric Matrix */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center space-x-2">
                <Terminal size={14} className="text-cyan-400" />
                <span className="text-xs font-mono font-bold tracking-widest text-slate-200">
                  SYSTEM IMPACT BENCHMARKS
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                PROD STATS
              </span>
            </div>

            {/* Metric Rows */}
            <div className="space-y-3.5">
              {verifiedMetrics.slice(0, 4).map((metric, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-xs font-mono font-semibold text-slate-300">{metric.label}</span>
                    <span className="text-lg font-mono font-bold text-cyan-400">{metric.value}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{metric.subtext}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>SOURCE: VANGROVE TECH PROD</span>
              <span className="text-emerald-400 font-semibold">VERIFIED</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

