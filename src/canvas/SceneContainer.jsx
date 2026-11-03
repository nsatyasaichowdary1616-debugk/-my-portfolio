import React, { Suspense, useState, useEffect, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraController from './CameraController';
import CyberDaisGround from './CyberDaisGround';
import CyberBust3D from './CyberBust3D';
import CosmicRing3D from './CosmicRing3D';
import CelestialPlanet3D from './CelestialPlanet3D';
import HoloHudPanels3D from './HoloHudPanels3D';
import FloatingAsteroids3D from './FloatingAsteroids3D';
import HumanSilhouette from './HumanSilhouette';
import IntelligenceCore3D from './IntelligenceCore3D';
import InfiniteCorridor3D from './InfiniteCorridor3D';
import CosmicParticles from './CosmicParticles';

// Reliable High-Fidelity Cyber Fallback Backdrop
function FallbackBackdrop() {
  return (
    <div className="fixed inset-0 z-0 bg-[#020612] overflow-hidden pointer-events-none">
      {/* Background Cyber Hero Visual */}
      <img
        src="/cyber-hero.jpg"
        alt="Cybernetic Digital Universe"
        className="w-full h-full object-cover object-center opacity-65 scale-105"
      />
      {/* Ambient gradient vignette overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020612] via-transparent to-[#020612]/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020612] via-transparent to-[#020612]/80" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse" />
    </div>
  );
}

// React Error Boundary to catch any potential WebGL runtime exceptions
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("WebGL Canvas encountered an issue, gracefully presenting visual fallback:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackBackdrop />;
    }
    return this.props.children;
  }
}

export default function SceneContainer({
  activeIndex = 0,
  scrollProgress = 0,
  isLowPerf = false,
  freeOrbit = false
}) {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setHasWebGL(supported);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return <FallbackBackdrop />;
  }

  return (
    <CanvasErrorBoundary>
      {/* Fallback ambient image behind canvas so there is NEVER a black flash */}
      <div className="fixed inset-0 z-0 bg-[#020612] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(0,212,255,0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(168,85,247,0.08),transparent_60%)]" />
      </div>

      <div
        className="fixed inset-0 z-0 pointer-events-none w-screen h-screen overflow-hidden"
        style={{ width: '100vw', height: '100vh' }}
      >
        <Canvas
          camera={{ position: [0, 1.4, 11], fov: 46, near: 0.1, far: 240 }}
          dpr={isLowPerf ? 1 : [1, 1.8]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
          }}
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <Suspense fallback={null}>
            {/* Deep Cinematic Environmental Fog */}
            <color attach="background" args={['#020612']} />
            <fog attach="fog" args={['#020612', 18, 150]} />

            {/* Balanced Cinematic Lighting */}
            <ambientLight color="#081426" intensity={1.5} />
            
            {/* Key Directional Rim Light for Cybernetic Figure */}
            <directionalLight
              position={[12, 18, 8]}
              color="#38bdf8"
              intensity={2.8}
            />
            {/* Electric Violet Counter-Fill */}
            <directionalLight
              position={[-14, 12, -6]}
              color="#a855f7"
              intensity={1.8}
            />

            {/* Camera Motion & Choreography */}
            <CameraController
              activeIndex={activeIndex}
              scrollProgress={scrollProgress}
              freeOrbit={freeOrbit}
            />

            {/* 1. Ground & Concentric Cybernetic Dais with Explorer Silhouette */}
            <CyberDaisGround position={[0, -2, 0]} />
            <HumanSilhouette position={[0, -1.75, -4.5]} />

            {/* 2. Central Colossal Cybernetic Bust with Glowing VR Visor & Accretion Rings */}
            <CyberBust3D position={[5, 2.5, -18]} scale={[1.2, 1.2, 1.2]} />
            <CosmicRing3D position={[5, 2.5, -18]} count={isLowPerf ? 220 : 480} />

            {/* 3. Celestial Planet / Moon & Megastructure in Cosmic Background */}
            <CelestialPlanet3D />

            {/* 4. Floating 3D Holographic HUD Artifacts */}
            <HoloHudPanels3D />

            {/* 5. Zero-Gravity Tumbling Obsidian Asteroids */}
            <FloatingAsteroids3D />

            {/* 6. Deep Journey Chamber Elements (Sections B & D) */}
            <IntelligenceCore3D position={[0, 2.2, -45]} />
            <InfiniteCorridor3D startZ={-70} count={9} spacing={8} />

            {/* 7. Fine Cosmic Starfield & Drifting Dust Motes */}
            <CosmicParticles count={isLowPerf ? 350 : 850} />
          </Suspense>
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
}
