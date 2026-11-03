import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import { audioManager } from '../data/audioAmbience';
import { personalInfo } from '../data/portfolioData';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-10 pt-4 sm:pt-6 pointer-events-auto">
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-2 sm:py-2.5 px-4 sm:px-6 rounded-full bg-slate-950/60 backdrop-blur-2xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)] transition-all duration-300">
        
        {/* Brand Left: Stylized Delta Logo + Satya Sai / Data Analyst */}
        <button
          onClick={() => handleItemClick('hero')}
          className="flex items-center space-x-3 text-left group cursor-pointer focus:outline-none"
        >
          {/* Futuristic Stylized 'A' / Delta Logo */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.5)] group-hover:shadow-[0_0_22px_rgba(168,85,247,0.8)] transition-all duration-300">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
              <path d="M12 3L20 20L12 16L4 20L12 3Z" fill="currentColor" opacity="0.9" />
              <path d="M12 7L16 17L12 15L8 17L12 7Z" fill="#030712" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="font-sans font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              {personalInfo.brandName}
            </span>
            <span className="text-[11px] font-sans font-medium text-slate-400 -mt-0.5">
              {personalInfo.title}
            </span>
          </div>
        </button>

        {/* Center Navigation Capsule Pill */}
        <div className="hidden lg:flex items-center space-x-1 bg-black/60 px-2 py-1 rounded-full border border-white/10 shadow-inner">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`px-4 py-1.5 text-xs sm:text-[13px] font-sans tracking-wide transition-all duration-300 rounded-full focus:outline-none ${
                  isActive
                    ? 'text-white font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 shadow-[0_0_15px_rgba(0,212,255,0.6)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Controls Right: Sound + Eco/HQ + Let's Connect Button */}
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
            title="Toggle Graphics Mode"
          >
            <Sparkles size={12} className={isLowPerf ? 'text-amber-400' : 'text-cyan-400'} />
            <span>{isLowPerf ? 'ECO' : 'HQ'}</span>
          </button>

          {/* Top-Right Outlined Pill Button: Let's Connect → */}
          <button
            onClick={() => handleItemClick('contact')}
            className="hidden sm:inline-flex items-center space-x-2 px-5 py-2 rounded-full border border-cyan-400/80 text-xs sm:text-sm font-sans font-semibold tracking-wide text-white bg-slate-900/60 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 hover:border-transparent transition-all duration-300 shadow-[0_0_18px_rgba(0,212,255,0.35)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] cursor-pointer focus:outline-none"
          >
            <span>Let's Connect</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
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
        <div className="lg:hidden mt-2 p-4 rounded-3xl bg-slate-950/90 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl flex flex-col space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`text-left px-4 py-2.5 rounded-xl font-sans text-sm tracking-wide transition-colors ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg'
                  : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleItemClick('contact')}
            className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-sans font-bold text-sm tracking-wide mt-2"
          >
            Let's Connect →
          </button>
        </div>
      )}
    </header>
  );
}
