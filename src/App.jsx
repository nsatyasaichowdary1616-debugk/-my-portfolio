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
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isLowPerf, setIsLowPerf] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsLowPerf(true);
    }
  }, []);

  // Track scroll position to synchronize 3D camera journey
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight <= 0) return;

      // Calculate fractional section index (0 to 6)
      const sectionElements = SECTIONS.map(id => document.getElementById(id));
      
      let currentSection = 'hero';
      let progress = 0;

      for (let i = 0; i < sectionElements.length; i++) {
        const el = sectionElements[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        
        // If section is around viewport center
        if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45) {
          currentSection = SECTIONS[i];
        }
      }

      // Smooth continuous global progress (0.0 to 6.0)
      const rawProgress = (scrollY / docHeight) * (SECTIONS.length - 1);
      setScrollProgress(rawProgress);
      setActiveSection(currentSection);
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
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-400 selection:text-black">
      
      {/* 1. Thin Elegant Viewport Frame */}
      <ViewportFrame activeSection={activeSection} />

      {/* 2. Global Fixed Interactive 3D Canvas */}
      <SceneContainer
        activeIndex={SECTIONS.indexOf(activeSection)}
        scrollProgress={scrollProgress}
        isLowPerf={isLowPerf}
      />

      {/* 3. Subtle Sci-Fi Scanline Texture Overlay */}
      <div className="fixed inset-0 z-10 scanline-overlay pointer-events-none opacity-40" />

      {/* 4. Top Navigation Bar */}
      <Navigation
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isLowPerf={isLowPerf}
        onTogglePerf={() => setIsLowPerf(!isLowPerf)}
      />

      {/* 5. Main Scrollable Content Journey */}
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

      {/* Project Architectural Inspector Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Verified Resume Dossier Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
