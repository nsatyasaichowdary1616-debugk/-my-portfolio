import React from 'react';
import { ArrowDown, FileText, Compass, ChevronRight, Activity } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function HeroOverlay({ onExplore = () => {}, onOpenResume = () => {} }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-12 px-6 sm:px-12 pointer-events-none select-none">
      
      {/* Top Center Spatial Compass Indicator */}
      <div className="flex justify-center items-center pointer-events-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/20 text-[11px] font-mono text-cyan-300">
          <Activity size={12} className="text-cyan-400 animate-pulse" />
          <span className="tracking-widest">DATA ARCHITECTURE & SYNTHESIS</span>
        </div>
      </div>

      {/* Main Composition: Bottom Split View */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        
        {/* Lower-Left Region: Bold Editorial Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start pointer-events-auto space-y-4">
          
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            <span>NUNE SATYA SAI KUMAR</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-white tracking-tight leading-[1.05]">
            Turning Data <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 neon-glow-cyan">
              Into Intelligence.
            </span>
          </h1>

          <p className="text-lg sm:text-xl font-medium text-slate-300 tracking-wide font-sans max-w-xl">
            {personalInfo.subheadline}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExplore}
              className="inline-flex items-center space-x-2.5 px-6 py-3 rounded-full bg-cyan-400 text-slate-950 font-mono font-bold text-xs tracking-widest hover:bg-white hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] transition-all duration-300 group cursor-pointer focus:outline-none"
            >
              <span>EXPLORE MY WORK</span>
              <Compass size={14} className="group-hover:rotate-45 transition-transform duration-300" />
            </button>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center space-x-2.5 px-6 py-3 rounded-full glass-panel border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 font-mono text-xs tracking-widest transition-all duration-300 group cursor-pointer focus:outline-none shadow-lg"
            >
              <FileText size={14} className="text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>VIEW RESUME</span>
            </button>
          </div>
        </div>

        {/* Lower-Right Region: Elegant Concise Description */}
        <div className="lg:col-span-5 flex flex-col items-start lg:items-end text-left lg:text-right pointer-events-auto space-y-4">
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-700/60 max-w-md shadow-2xl backdrop-blur-xl">
            <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-2">
              EXECUTIVE STATEMENT
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              “{personalInfo.heroDescription}”
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>LOCATION: HYDERABAD, IN</span>
              <span className="text-cyan-400 font-semibold">1 YR EXP • PRODUCTION</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Edge: Verified Technology Badges & Minimal Scroll Indicator */}
      <div className="w-full max-w-7xl mx-auto pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 pointer-events-auto">
        
        {/* Verified Metadata Labels */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-400">
          <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-cyan-500/30 text-cyan-300">
            [SQL SPEEDUP -82%]
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-700 text-slate-300">
            [1.4M+ MONTHLY ETL]
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-indigo-500/30 text-indigo-300">
            [AUTOGEN MULTI-AGENT]
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-sky-500/30 text-sky-300">
            [RAG 15K+ DOCS]
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-amber-500/30 text-amber-300">
            [POWER BI / DAX]
          </span>
        </div>

        {/* Minimal Animated Scroll Indicator */}
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 tracking-widest">
          <span className="text-[11px]">SCROLL TO ENTER PORTAL</span>
          <div className="w-6 h-10 rounded-full border border-slate-700 flex justify-center pt-1.5">
            <span className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
