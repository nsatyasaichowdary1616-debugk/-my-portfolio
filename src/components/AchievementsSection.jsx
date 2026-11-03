import React from 'react';
import { Trophy, Award, Sparkles, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { verifiedAchievements, verifiedMetrics } from '../data/portfolioData';

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative min-h-screen py-24 px-6 sm:px-12 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Trophy size={14} className="text-cyan-400" />
            <span className="tracking-widest">THE LIGHT CHAMBER</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Verified Honors & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">Accomplishments</span>
          </h2>

          <p className="text-slate-300 font-sans text-sm sm:text-base">
            Honored at national competitive hackathons and verified through concrete production-grade algorithmic breakthroughs.
          </p>
        </div>

        {/* Hackathon Laurels Cards (Metallic & Glass Floating Structures) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {verifiedAchievements.map((ach, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 rounded-3xl border border-cyan-500/30 bg-slate-950/70 shadow-2xl relative overflow-hidden group hover:border-cyan-400 transition-all duration-300"
            >
              {/* Luminous Corner Shimmer */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-cyan-500/20 via-indigo-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
                  <Trophy size={28} />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  {ach.badge}
                </span>
              </div>

              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                {ach.domain} • {ach.year}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-sans text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {ach.title}
              </h3>

              <div className="text-xs font-mono text-slate-400 mb-4">
                Venue: {ach.venue}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {ach.description}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-cyan-300">
                <span className="text-slate-400">KEY INNOVATION: </span>
                {ach.impact}
              </div>
            </div>
          ))}
        </div>

        {/* Quantified Production Impact Matrix (Verified Statistics Only) */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 bg-slate-950/50">
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 tracking-wider mb-6">
            <TrendingUp size={16} />
            <span className="font-bold">VERIFIED PRODUCTION IMPACT METRICS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {verifiedMetrics.map((stat, sIdx) => (
              <div
                key={sIdx}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center hover:border-cyan-500/30 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-mono font-semibold text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-[10px] text-slate-400 leading-tight">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
