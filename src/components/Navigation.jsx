import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles, Terminal } from 'lucide-react';
import { audioManager } from '../data/audioAmbience';
import { personalInfo } from '../data/portfolioData';

const NAV_ITEMS = [
  { id: 'hero', label: 'ORIGIN' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'achievements', label: 'HONORS' },
  { id: 'contact', label: 'CONTACT' },
];

export default function Navigation({
  activeSection = 'hero',
  onNavigate = () => {},
  isLowPerf = false,
  onTogglePerf = () => {}
}) {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAudioToggle = () => {
    const active = audioManager.toggle();
    setIsAudioActive(active);
  };

  const handleItemClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    audioManager.playPortalHum();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 sm:pt-6 pointer-events-auto">
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-2.5 px-4 sm:px-6 rounded-full glass-panel border border-cyan-500/20 shadow-2xl transition-all duration-300">
        
        {/* Brand Left */}
        <button
          onClick={() => handleItemClick('hero')}
          className="flex flex-col items-start text-left group cursor-pointer focus:outline-none"
        >
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-sm group-hover:rotate-45 transition-transform duration-300" />
            <span className="font-display font-bold text-sm sm:text-base tracking-[0.25em] text-white group-hover:text-cyan-400 transition-colors">
              {personalInfo.brandName}
            </span>
          </div>
          <span className="text-[9px] font-mono tracking-widest text-cyan-400/80 pl-4">
            {personalInfo.subtitle}
          </span>
        </button>

        {/* Desktop Center Navigation */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 bg-black/40 px-3 py-1 rounded-full border border-slate-800">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`relative px-3 py-1.5 text-xs font-mono tracking-widest transition-all duration-300 rounded-full focus:outline-none ${
                  isActive
                    ? 'text-cyan-300 font-bold bg-cyan-950/60 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-cyan-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Controls Right */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Procedural Audio Ambience Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`p-2 rounded-full border transition-all duration-300 text-xs flex items-center justify-center focus:outline-none ${
              isAudioActive
                ? 'border-cyan-400 text-cyan-400 bg-cyan-950/40 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 bg-black/40'
            }`}
            title={isAudioActive ? 'Mute Ambient Synthesizer' : 'Enable Ambient Synthesizer'}
            aria-label="Toggle Sound"
          >
            {isAudioActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Eco / High Fidelity Toggle */}
          <button
            onClick={onTogglePerf}
            className={`hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-full border text-[11px] font-mono tracking-wider transition-colors focus:outline-none ${
              isLowPerf
                ? 'border-amber-500/40 text-amber-400 bg-amber-950/20'
                : 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 bg-black/40'
            }`}
            title="Toggle Graphics Performance Mode"
          >
            <Sparkles size={12} className={isLowPerf ? 'text-amber-400' : 'text-cyan-400'} />
            <span>{isLowPerf ? 'ECO' : 'HQ'}</span>
          </button>

          {/* Top-Right Outlined Button: LET'S CONNECT */}
          <button
            onClick={() => handleItemClick('contact')}
            className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full border border-cyan-400/80 text-xs font-mono font-semibold tracking-wider text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] cursor-pointer focus:outline-none"
          >
            <span>LET'S CONNECT</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full border border-slate-800 text-slate-300 hover:text-white bg-black/40 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 rounded-2xl glass-panel border border-cyan-500/30 shadow-2xl flex flex-col space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`text-left px-4 py-2.5 rounded-xl font-mono text-xs tracking-widest transition-colors ${
                activeSection === item.id
                  ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
            <span className="text-[11px] font-mono text-slate-400">GRAPHICS MODE</span>
            <button
              onClick={onTogglePerf}
              className="text-xs font-mono px-3 py-1 rounded-lg border border-slate-700 text-cyan-400"
            >
              {isLowPerf ? 'ECO (Optimized)' : 'HQ (Cinematic)'}
            </button>
          </div>
          <button
            onClick={() => handleItemClick('contact')}
            className="w-full text-center py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-mono font-bold text-xs tracking-widest mt-1"
          >
            LET'S CONNECT
          </button>
        </div>
      )}
    </header>
  );
}
