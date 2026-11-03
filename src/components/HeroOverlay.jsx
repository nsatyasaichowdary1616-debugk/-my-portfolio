import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Download, Mouse, Github, Linkedin, ExternalLink, Mail, BarChart3, LayoutDashboard, Trophy, Zap, Clock, Cpu, Bot, Database } from 'lucide-react';
import { personalInfo, heroQuickStats } from '../data/portfolioData';

// Rotating dynamic roles for typewriter effect
const ROLES = [
  "Data Analyst",
  "GenAI Engineer",
  "Agentic AI Builder",
  "Enterprise ETL Architect"
];

const statIcons = {
  BarChart3: BarChart3,
  LayoutDashboard: LayoutDashboard,
  Trophy: Trophy,
  Zap: Zap
};

export default function HeroOverlay({ onExplore = () => {}, onOpenResume = () => {} }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [kolkataTime, setKolkataTime] = useState('');
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Live Asia/Kolkata Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setKolkataTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect for roles
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentRole.length) {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentRole.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  // Subtle pointer tilt calculation for HUD panels
  useEffect(() => {
    const handleMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      setMouseOffset({ x: normX, y: normY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between pt-28 sm:pt-32 pb-8 sm:pb-10 px-6 sm:px-12 pointer-events-none select-none">
      
      {/* Main Hero Container */}
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center relative">
        
        {/* Left Side: Editorial Typography & Stats */}
        <div className="max-w-2xl space-y-5 pointer-events-auto z-20">
          
          {/* Top Pill Badge + Live Asia/Kolkata Clock */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 text-xs font-sans text-slate-200 shadow-[0_0_15px_rgba(0,212,255,0.25)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,212,255,1)] animate-pulse" />
              <span className="tracking-wide font-medium">Data • AI • Innovation</span>
            </div>

            {/* Live Asia/Kolkata Time Badge */}
            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-[11px] font-mono text-cyan-400">
              <Clock size={11} className="text-cyan-400" />
              <span>IST {kolkataTime || '22:15:00'} (HYD)</span>
            </div>
          </div>

          {/* Primary Name Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold text-white tracking-tight leading-[1.08]">
            Nune Satya Sai <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-400">Kumar</span>
          </h1>

          {/* Typewriter Dynamic Role Line */}
          <div className="flex items-center space-x-2 text-sm sm:text-base font-mono text-cyan-300">
            <span className="text-slate-400">&gt; SPECIALIZATION:</span>
            <span className="font-bold underline decoration-cyan-400 decoration-2 underline-offset-4">
              {displayedText}
            </span>
            <span className="w-2 h-4 bg-cyan-400 animate-pulse inline-block" />
          </div>

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

          {/* Bottom-Left Glass Stats HUD Strip */}
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

        {/* Right Side: Floating Interactive Glass HUD Panels (Responsive & Cursor-Reactive) */}
        <div className="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 pointer-events-auto z-10 w-[420px] h-[520px]">
          
          {/* HUD Panel 1: Machine Learning Neural Web (Top-Right) */}
          <div
            className="absolute top-2 right-4 w-64 p-4 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-cyan-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out hover:border-cyan-400 group"
            style={{
              transform: `perspective(800px) rotateX(${mouseOffset.y * -8}deg) rotateY(${mouseOffset.x * 8}deg) translateZ(10px)`
            }}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <span className="text-[11px] font-mono font-bold text-white tracking-wider flex items-center space-x-1.5">
                <Cpu size={13} className="text-cyan-400 animate-spin" />
                <span>MACHINE LEARNING</span>
              </span>
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
                ACTIVE
              </span>
            </div>

            {/* Neural Net SVG Graph Visual */}
            <div className="h-20 w-full relative flex items-center justify-center">
              <svg viewBox="0 0 160 80" className="w-full h-full text-cyan-400">
                {/* Connecting Laser Beams */}
                <line x1="25" y1="20" x2="80" y2="40" stroke="#00f0ff" strokeWidth="1" strokeDasharray="3,3" opacity="0.7" />
                <line x1="25" y1="60" x2="80" y2="40" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />
                <line x1="80" y1="40" x2="135" y2="25" stroke="#a855f7" strokeWidth="1.2" />
                <line x1="80" y1="40" x2="135" y2="55" stroke="#a855f7" strokeWidth="1.2" />
                <line x1="25" y1="20" x2="80" y2="15" stroke="#38bdf8" strokeWidth="1" opacity="0.4" />
                <line x1="80" y1="15" x2="135" y2="25" stroke="#38bdf8" strokeWidth="1" opacity="0.4" />
                
                {/* Nodes */}
                <circle cx="25" cy="20" r="4.5" fill="#00f0ff" />
                <circle cx="25" cy="60" r="4.5" fill="#00f0ff" />
                <circle cx="80" cy="15" r="4" fill="#38bdf8" />
                <circle cx="80" cy="40" r="6" fill="#ffffff" stroke="#00f0ff" strokeWidth="2" />
                <circle cx="135" cy="25" r="4.5" fill="#a855f7" />
                <circle cx="135" cy="55" r="4.5" fill="#a855f7" />
              </svg>
            </div>
            <div className="text-[10px] font-mono text-slate-400 flex justify-between pt-1">
              <span>Deep Semantic RAG</span>
              <span className="text-cyan-400">75% Speedup</span>
            </div>
          </div>

          {/* HUD Panel 2: Business Analytics Bar Chart (Mid-Left) */}
          <div
            className="absolute top-48 left-0 w-64 p-4 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-purple-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out hover:border-purple-400 group"
            style={{
              transform: `perspective(800px) rotateX(${mouseOffset.y * -6}deg) rotateY(${mouseOffset.x * 6}deg) translateZ(20px)`
            }}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <span className="text-[11px] font-mono font-bold text-white tracking-wider flex items-center space-x-1.5">
                <BarChart3 size={13} className="text-purple-400" />
                <span>BUSINESS ANALYTICS</span>
              </span>
              <span className="text-[9px] font-mono text-purple-400 bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-500/30">
                1.4M+ RECS
              </span>
            </div>

            {/* Glowing Analytics Bars */}
            <div className="h-16 flex items-end justify-between px-2 pt-2 gap-2">
              <div className="w-5 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-sm h-[40%] transition-all duration-500 group-hover:h-[55%]" />
              <div className="w-5 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-sm h-[65%] transition-all duration-500 group-hover:h-[80%]" />
              <div className="w-5 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-sm h-[50%] transition-all duration-500 group-hover:h-[65%]" />
              <div className="w-5 bg-gradient-to-t from-purple-600 to-pink-400 rounded-t-sm h-[85%] transition-all duration-500 group-hover:h-[95%]" />
              <div className="w-5 bg-gradient-to-t from-purple-600 to-cyan-400 rounded-t-sm h-[100%]" />
            </div>
            <div className="text-[10px] font-mono text-slate-400 flex justify-between pt-2">
              <span>Query Latency</span>
              <span className="text-emerald-400 font-bold">-82% Slashed</span>
            </div>
          </div>

          {/* HUD Panel 3: Agentic AI / Tech Stack (Bottom-Right) */}
          <div
            className="absolute bottom-4 right-2 w-72 p-4 rounded-2xl bg-slate-950/75 backdrop-blur-xl border border-sky-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out hover:border-cyan-400"
            style={{
              transform: `perspective(800px) rotateX(${mouseOffset.y * -10}deg) rotateY(${mouseOffset.x * 10}deg) translateZ(15px)`
            }}
          >
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/10">
              <span className="text-[11px] font-mono font-bold text-white tracking-wider flex items-center space-x-1.5">
                <Bot size={13} className="text-sky-400" />
                <span>AGENTIC AI & BI STACK</span>
              </span>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                PROD READY
              </span>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
              <span className="px-2 py-1 rounded bg-slate-900 border border-cyan-500/30 text-cyan-300 text-center">
                SQL (PgSQL/MySQL)
              </span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-amber-500/30 text-amber-300 text-center">
                Power BI & DAX
              </span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-purple-500/30 text-purple-300 text-center">
                AutoGen Multi-Agent
              </span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-blue-500/30 text-blue-300 text-center">
                Vector DB & RAG
              </span>
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

        {/* Social Icons Dock Right */}
        <div className="flex items-center space-x-2.5">
          {/* GitHub */}
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
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
            aria-label="LinkedIn Profile"
            className="w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/15 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-cyan-300 shadow-[0_0_12px_rgba(0,0,0,0.6)] hover:shadow-[0_0_16px_rgba(0,212,255,0.4)] transition-all duration-300"
            title="LinkedIn"
          >
            <Linkedin size={16} />
          </a>

          {/* External / Resume Link */}
          <button
            onClick={onOpenResume}
            aria-label="Open Resume Dossier"
            className="w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/15 hover:border-purple-400 flex items-center justify-center text-slate-300 hover:text-purple-300 shadow-[0_0_12px_rgba(0,0,0,0.6)] hover:shadow-[0_0_16px_rgba(168,85,247,0.4)] transition-all duration-300 focus:outline-none"
            title="Resume Dossier"
          >
            <ExternalLink size={16} />
          </button>

          {/* Direct Email */}
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Send Email"
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
