import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraController from './CameraController';
import MonolithEnvironment from './MonolithEnvironment';
import EnergyPortal from './EnergyPortal';
import HumanSilhouette from './HumanSilhouette';
import IntelligenceCore3D from './IntelligenceCore3D';
import InfiniteCorridor3D from './InfiniteCorridor3D';
import CosmicParticles from './CosmicParticles';

function CanvasFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#030712] text-cyan-400 font-mono text-sm">
      <div className="text-center p-6 border border-cyan-500/30 rounded-lg bg-black/80 max-w-md">
        <p className="text-lg font-bold text-white mb-2">INITIALIZING 3D SYNTHESIS</p>
        <p className="text-slate-400 text-xs">Calibrating WebGL graphics pipeline...</p>
      </div>
    </div>
  );
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
      const supported = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setHasWebGL(supported);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#02050b] via-[#051124] to-[#02050b]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,240,255,0.15),transparent_70%)]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 1.6, 11], fov: 48, near: 0.1, far: 240 }}
        dpr={isLowPerf ? 1 : [1, 1.8]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
      >
        <Suspense fallback={null}>
          {/* Deep Cinematic Environmental Fog */}
          <color attach="background" args={['#030712']} />
          <fog attach="fog" args={['#030712', 15, 140]} />

          {/* Balanced Cinematic Lighting */}
          <ambientLight color="#0c1a30" intensity={1.2} />
          
          {/* Key Directional Rim Light for Monoliths */}
          <directionalLight
            position={[15, 25, 10]}
            color="#38bdf8"
            intensity={2.2}
          />
          {/* Violet Counter-Fill */}
          <directionalLight
            position={[-15, 15, -10]}
            color="#7c3aed"
            intensity={1.0}
          />

          {/* Camera Motion & Choreography */}
          <CameraController
            activeIndex={activeIndex}
            scrollProgress={scrollProgress}
            freeOrbit={freeOrbit}
          />

          {/* 3D Scene Components */}
          <MonolithEnvironment />
          <EnergyPortal position={[0, 4.5, -22]} />
          <HumanSilhouette position={[0, -1.8, -4]} />
          <IntelligenceCore3D position={[0, 2.2, -45]} />
          <InfiniteCorridor3D startZ={-70} count={9} spacing={8} />
          <CosmicParticles count={isLowPerf ? 350 : 850} />
        </Suspense>
      </Canvas>
    </div>
  );
}
