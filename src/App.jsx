import React, { useState, useEffect, useRef } from 'react';
import SceneContainer from './canvas/SceneContainer';
import ViewportFrame from './components/ViewportFrame';
import Navigation from './components/Navigation';
import HeroOverlay from './components/HeroOverlay';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';

const SECTIONS = ['hero', 'about', 'skills', 'projects', 'experience', 'achievements', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isLowPerf, setIsLowPerf] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  // Custom cursor follower
  useEffect(() => {
    const handlePointerMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsLowPerf(true);
    }
  }, []);

  // Track scroll position to synchronize 3D camera journey and top progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight <= 0) return;

      const pct = Math.min(Math.max((scrollY / docHeight) * 100, 0), 100);
      setScrollPercent(pct);

      // Fractional section progress (0 to 6)
      const rawProgress = (scrollY / docHeight) * (SECTIONS.length - 1);
      setScrollProgress(rawProgress);

      // Section intersection
      const sectionElements = SECTIONS.map(id => document.getElementById(id));
      for (let i = 0; i < sectionElements.length; i++) {
        const el = sectionElements[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45) {
          setActiveSection(SECTIONS[i]);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020612] text-slate-100 selection:bg-cyan-400 selection:text-black">
      
      {/* 1. Top Laser Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-600 shadow-[0_0_10px_rgba(0,212,255,0.8)] transition-all duration-150 ease-out"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* 2. Custom Ambient Cursor Glow */}
      <div
        className="fixed w-72 h-72 rounded-full pointer-events-none z-30 opacity-20 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-purple-600 blur-3xl transition-transform duration-75 ease-out"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />

      {/* 3. Thin Elegant Viewport Frame */}
      <ViewportFrame activeSection={activeSection} />

      {/* 4. Global Fixed Interactive 3D Canvas */}
      <SceneContainer
        activeIndex={SECTIONS.indexOf(activeSection)}
        scrollProgress={scrollProgress}
        isLowPerf={isLowPerf}
      />

      {/* 5. Subtle Sci-Fi Scanline Texture Overlay */}
      <div className="fixed inset-0 z-10 scanline-overlay pointer-events-none opacity-30" />

      {/* 6. Top Navigation Bar */}
      <Navigation
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isLowPerf={isLowPerf}
        onTogglePerf={() => setIsLowPerf(!isLowPerf)}
      />

      {/* 7. Main Scrollable Content Journey */}
      <main className="relative z-20">
        {/* Section 0: Hero Scene */}
        <section id="hero" className="relative min-h-screen flex items-center">
          <HeroOverlay
            onExplore={() => scrollToSection('projects')}
            onOpenResume={() => setIsResumeOpen(true)}
          />
        </section>

        {/* Section 1: About / Enter The Unknown */}
        <AboutSection />

        {/* Section 2: Skills / The Intelligence Core */}
        <SkillsSection />

        {/* Section 3: Projects / The Data Universe */}
        <ProjectsSection onSelectProject={setSelectedProject} />

        {/* Section 4: Experience / The Infinite Corridor */}
        <ExperienceSection />

        {/* Section 5: Achievements / The Light Chamber */}
        <AchievementsSection />

        {/* Section 6: Contact / The Final Horizon */}
        <ContactSection onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Project Architectural Inspector Terminal Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Official Verified Resume Dossier Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
