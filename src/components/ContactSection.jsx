import React, { useState } from 'react';
import { Mail, Linkedin, Github, Phone, MapPin, Send, CheckCircle2, Copy, FileText, ArrowUpRight, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function ContactSection({ onOpenResume = () => {} }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    setIsSent(true);
    // In production, this can connect to Formspree, EmailJS, or user's API
  };

  return (
    <section id="contact" className="relative min-h-screen py-24 px-6 sm:px-12 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="tracking-widest">THE FINAL HORIZON</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-tight">
            “Have an interesting problem? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Let's explore it.”
            </span>
          </h2>

          <p className="text-slate-300 font-sans text-base max-w-xl mx-auto">
            Ready to deploy enterprise ETL pipelines, optimize relational data stores, build high-impact Power BI intelligence, or architect autonomous RAG & multi-agent systems.
          </p>
        </div>

        {/* Contact Matrix Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Primary Email Card */}
            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 bg-slate-950/70 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                  PRIMARY DISPATCH CHANNEL
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center space-x-1 text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  {copiedEmail ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedEmail ? 'COPIED TO CLIPBOARD' : 'COPY'}</span>
                </button>
              </div>

              <a
                href={`mailto:${personalInfo.email}`}
                className="text-lg sm:text-xl font-mono font-bold text-white group-hover:text-cyan-300 transition-colors break-all block"
              >
                {personalInfo.email}
              </a>
              <div className="text-xs font-mono text-slate-400 mt-1">Direct inquiries • Response within 24 hours</div>
            </div>

            {/* Social & Professional Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* LinkedIn */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel glass-panel-hover p-4 rounded-xl border border-slate-800 flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">LinkedIn</div>
                    <div className="text-[10px] font-mono text-slate-400">/in/nsatyasai</div>
                  </div>
                </div>
                <ArrowUpRight size={15} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </a>

              {/* GitHub */}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel glass-panel-hover p-4 rounded-xl border border-slate-800 flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-200">
                    <Github size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">GitHub</div>
                    <div className="text-[10px] font-mono text-slate-400">@nsatyasai</div>
                  </div>
                </div>
                <ArrowUpRight size={15} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </a>

              {/* Phone */}
              <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{personalInfo.phone}</div>
                  <div className="text-[10px] font-mono text-slate-400">Direct Phone</div>
                </div>
              </div>

              {/* Location */}
              <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{personalInfo.location}</div>
                  <div className="text-[10px] font-mono text-slate-400">Relocation / Remote Open</div>
                </div>
              </div>
            </div>

            {/* Resume Launch Card */}
            <div className="p-4 rounded-xl glass-panel border border-cyan-500/20 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText size={20} className="text-cyan-400" />
                <div>
                  <div className="text-xs font-bold text-white">Full Verified Resume Dossier</div>
                  <div className="text-[10px] font-mono text-slate-400">Updated with all verified production milestones</div>
                </div>
              </div>
              <button
                onClick={onOpenResume}
                className="px-4 py-2 rounded-lg bg-cyan-400 text-slate-950 font-mono font-bold text-xs hover:bg-white transition-colors"
              >
                VIEW RESUME
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Dispatch Terminal */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 bg-slate-950/70 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                    DIRECT MESSAGE DISPATCH CONSOLE
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">ENCRYPTED PROTOCOL</span>
              </div>

              {isSent ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-400/50 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 size={30} />
                  </div>
                  <h3 className="text-xl font-bold font-sans text-white">Transmission Delivered</h3>
                  <p className="text-xs font-mono text-slate-300 max-w-sm mx-auto">
                    Your message has been staged. A copy is also directly reachable via <span className="text-cyan-400">{personalInfo.email}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setFormState({ name: '', email: '', message: '' });
                    }}
                    className="mt-4 px-5 py-2 rounded-full border border-slate-700 text-xs font-mono text-slate-300 hover:text-white"
                  >
                    SEND ANOTHER TRANSMISSION
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
                        YOUR NAME / ENTITY
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Lead Engineer / Recruiter"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-sm font-sans focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
                        RETURN EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="contact@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-sm font-sans focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
                      MESSAGE / OBJECTIVE
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Outline your problem, project architecture, or career opportunity..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 text-sm font-sans focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-[11px] font-mono text-slate-500">
                      Direct mailbox: {personalInfo.email}
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3 rounded-xl bg-cyan-400 text-slate-950 font-mono font-bold text-xs tracking-wider hover:bg-white hover:shadow-[0_0_25px_rgba(0,240,255,0.7)] transition-all duration-300 cursor-pointer"
                    >
                      <span>TRANSMIT DISPATCH</span>
                      <Send size={13} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Global Footer */}
        <div className="pt-12 border-t border-slate-800/80 text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 text-xs font-mono text-slate-400">
            <span>© {new Date().getFullYear()} SATYA SAI KUMAR</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400">TURNING DATA INTO INTELLIGENCE</span>
          </div>
          <p className="text-[11px] font-mono text-slate-600">
            Architected with React, Three.js, React Three Fiber, Custom GLSL Shaders, Tailwind CSS & Web Audio Synthesis.
          </p>
        </div>

      </div>
    </section>
  );
}
