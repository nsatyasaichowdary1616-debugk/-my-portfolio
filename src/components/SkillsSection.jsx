import React, { useState } from 'react';
import { Database, Cpu, Terminal, Layers, CheckCircle2, Bot, Workflow, BarChart3, Cloud, Code2, Sparkles } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

// Map icon string to Lucide icon component
const iconMap = {
  Database: Database,
  BarChart3: BarChart3,
  PieChart: BarChart3,
  FileSpreadsheet: Layers,
  Layers: Layers,
  Binary: Code2,
  GitFork: Workflow,
  Bot: Bot,
  Workflow: Workflow,
  Cpu: Cpu,
  Server: Database,
  Sparkles: Sparkles,
  Brain: Cpu,
  Code2: Code2,
  Cloud: Cloud,
  Network: Workflow,
  GitBranch: Workflow,
  Terminal: Terminal
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);

  const currentCategoryData = skillCategories.find((c) => c.id === activeCategory) || skillCategories[0];

  return (
    <section id="skills" className="relative min-h-screen py-24 px-6 sm:px-12 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Cpu size={14} className="text-cyan-400 animate-spin" />
            <span className="tracking-widest">THE INTELLIGENCE CORE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Architected For <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Scalable Mastery</span>
          </h2>

          <p className="text-slate-300 font-sans text-sm sm:text-base">
            High-precision toolchains engineered for high-throughput relational data systems, automated multi-agent triage, and enterprise RAG synthesis.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {skillCategories.map((cat) => {
            const isSelected = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center space-x-2 border focus:outline-none cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                    : 'glass-panel text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{cat.category}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-cyan-400 text-black font-bold' : 'bg-slate-800 text-slate-400'}`}>
                  {cat.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Description Banner */}
        <div className="max-w-2xl mx-auto text-center text-xs font-mono text-slate-400">
          <span className="text-cyan-400 font-semibold">[OBJECTIVE]: </span>
          {currentCategoryData.description}
        </div>

        {/* Floating Translucent Glass Skill Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentCategoryData.skills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Code2;
            return (
              <div
                key={skill.name}
                className="glass-panel glass-panel-hover p-5 rounded-2xl border border-slate-800/80 bg-slate-950/50 relative overflow-hidden group"
              >
                {/* Subtle Cyan Corner Flare */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-400/5 group-hover:bg-cyan-400/15 rounded-full blur-xl transition-all duration-300" />

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h3>
                      <div className="text-[10px] font-mono text-slate-400">
                        VERIFIED PROFICIENCY
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                    {skill.level}%
                  </span>
                </div>

                {/* Animated Level Bar */}
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-4 border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                {/* Capability Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {skill.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-300 border border-slate-800/80 group-hover:border-slate-700 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Core AI Orchestration Highlight */}
        <div className="p-6 rounded-2xl glass-panel border border-cyan-500/20 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-400 flex-shrink-0">
              <Bot size={24} />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Autonomous Multi-Agent & RAG Pipeline Specialization
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Deep hands-on experience designing LangChain & AutoGen architectures capable of autonomous discrepancy discovery and 75% faster semantic retrieval.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 whitespace-nowrap bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
            ENTERPRISE TESTED
          </span>
        </div>

      </div>
    </section>
  );
}
