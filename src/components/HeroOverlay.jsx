import React from 'react';
import { ArrowRight, Download, Mouse, Github, Linkedin, ExternalLink, Mail, BarChart3, LayoutDashboard, Trophy, Zap } from 'lucide-react';
import { personalInfo, heroQuickStats } from '../data/portfolioData';

// Map icon strings to components
const statIcons = {
  BarChart3: BarChart3,
  LayoutDashboard: LayoutDashboard,
  Trophy: Trophy,
  Zap: Zap
};

export default function HeroOverlay({ onExplore = () => {}, onOpenResume = () => {} }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between pt-28 sm:pt-32 pb-8 sm:pb-10 px-6 sm:px-12 pointer-events-none select-none">
      
      {/* Main Hero Content (Aligned to Left half as in the image) */}
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center">
        <div className="max-w-2xl space-y-5 pointer-events-auto">
          
          {/* Top Pill Badge: • Data • AI • Innovation */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 text-xs font-sans text-slate-200 shadow-[0_0_15px_rgba(0,212,255,0.25)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,212,255,1)] animate-pulse" />
            <span className="tracking-wide font-medium">Data • AI • Innovation</span>
          </div>

          {/* Primary Name Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold text-white tracking-tight leading-[1.08]">
            Nune Satya Sai <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-400">Kumar</span>
          </h1>

          {/* Subheadline with violet 'Impact.' */}
          <p className="text-2xl sm:text-4xl font-sans font-bold text-slate-200 leading-snug">
            Turning Data into Insights, <br />
            and Ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 shadow-purple-500/50">Impact.</span>
          </p>

          {/* Concise Professional Description */}
          <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed max-w-xl">
            {personalInfo.heroDescription}
          </p>

          {/* Action Buttons: View My Projects → & Download Resume */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            {/* Primary Gradient Pill Button */}
            <button
              onClick={onExplore}
              className="inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white font-sans font-bold text-sm tracking-wide hover:shadow-[0_0_30px_rgba(0,212,255,0.7)] hover:scale-105 transition-all duration-300 group cursor-pointer focus:outline-none"
            >
              <span>View My Projects</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Glass Pill Button */}
            <button
              onClick={onOpenResume}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-slate-950/70 hover:bg-slate-900 backdrop-blur-xl border border-white/20 hover:border-cyan-400/60 text-slate-200 hover:text-white font-sans font-semibold text-sm tracking-wide transition-all duration-300 group cursor-pointer focus:outline-none shadow-lg"
            >
              <span>Download Resume</span>
              <Download size={15} className="text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Bottom-Left Glass Stats HUD Strip (Exact Match from Image) */}
          <div className="pt-6">
            <div className="inline-flex flex-wrap sm:flex-nowrap items-center divide-y sm:divide-y-0 sm:divide-x divide-white/10 rounded-2xl bg-slate-950/75 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)] p-3 sm:p-4 gap-3 sm:gap-5">
              {heroQuickStats.map((stat, idx) => {
                const IconComp = statIcons[stat.icon] || BarChart3;
                return (
                  <div key={idx} className="flex items-center space-x-3 px-2 sm:px-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-950/80 to-purple-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <IconComp size={18} />
                    </div>
                    <div>
                      <div className="text-lg font-bold font-sans text-white leading-tight">
                        {stat.value}
                      </div>
                      <div className="text-[11px] font-sans text-slate-400 whitespace-nowrap">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Scroll Indicator on Left & Social Glass Dock on Right */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between pt-4 pointer-events-auto">
        
        {/* Scroll Indicator Left */}
        <div className="flex items-center space-x-2.5 text-xs font-sans text-slate-400">
          <div className="w-5 h-8 rounded-full border border-slate-600 flex justify-center pt-1.5">
            <span className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce" />
          </div>
          <span className="tracking-wide">Scroll to explore</span>
        </div>

        {/* Social Icons Dock Right (Exact 4 icons from reference image) */}
        <div className="flex items-center space-x-2.5">
          {/* GitHub */}
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/15 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-cyan-300 shadow-[0_0_12px_rgba(0,0,0,0.6)] hover:shadow-[0_0_16px_rgba(0,212,255,0.4)] transition-all duration-300"
            title="GitHub"
          >
            <Github size={16} />
          </a>

          {/* LinkedIn */}
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/15 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-cyan-300 shadow-[0_0_12px_rgba(0,0,0,0.6)] hover:shadow-[0_0_16px_rgba(0,212,255,0.4)] transition-all duration-300"
            title="LinkedIn"
          >
            <Linkedin size={16} />
          </a>

          {/* External / Resume Link */}
          <button
            onClick={onOpenResume}
            className="w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/15 hover:border-purple-400 flex items-center justify-center text-slate-300 hover:text-purple-300 shadow-[0_0_12px_rgba(0,0,0,0.6)] hover:shadow-[0_0_16px_rgba(168,85,247,0.4)] transition-all duration-300 focus:outline-none"
            title="Resume Dossier"
          >
            <ExternalLink size={16} />
          </button>

          {/* Direct Email */}
          <a
            href={`mailto:${personalInfo.email}`}
            className="w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/15 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-cyan-300 shadow-[0_0_12px_rgba(0,0,0,0.6)] hover:shadow-[0_0_16px_rgba(0,212,255,0.4)] transition-all duration-300"
            title="Email Dispatch"
          >
            <Mail size={16} />
          </a>
        </div>

      </div>

    </div>
  );
}
