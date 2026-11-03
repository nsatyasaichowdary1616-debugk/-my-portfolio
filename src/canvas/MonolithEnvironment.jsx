import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GroundShader } from './shaders/groundShader';

export default function MonolithEnvironment() {
  const groundRef = useRef();

  // Create Ground Shader Material
  const groundMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(GroundShader.uniforms),
      vertexShader: GroundShader.vertexShader,
      fragmentShader: GroundShader.fragmentShader,
      transparent: false,
    });
  }, []);

  // Obsidian Rock Material
  const obsidianMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#080d1a',
      roughness: 0.35,
      metalness: 0.65,
      flatShading: true,
    });
  }, []);

  // Emissive Tech Trim Material
  const techTrimMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#00f0ff',
      emissive: '#00f0ff',
      emissiveIntensity: 1.8,
      roughness: 0.1,
      metalness: 0.9,
    });
  }, []);

  useFrame((_, delta) => {
    if (groundMaterial) {
      groundMaterial.uniforms.uTime.value += delta;
    }
  });

  return (
    <group>
      {/* 1. Reflective Obsidian Floor */}
      <mesh
        ref={groundRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
        material={groundMaterial}
      >
        <planeGeometry args={[160, 160, 64, 64]} />
      </mesh>

      {/* 2. Colossal Central Architectural Monolith Frame (Flanking Portal at z = -22) */}
      <group position={[0, 4.5, -22]}>
        {/* Left Monolith Pillar */}
        <mesh position={[-6.2, 0, 0]} material={obsidianMat}>
          <boxGeometry args={[2.4, 24, 3.2]} />
        </mesh>
        {/* Left Pillar Cyan Tech Conduit */}
        <mesh position={[-5.05, 0, 1.62]} material={techTrimMat}>
          <boxGeometry args={[0.08, 22, 0.08]} />
        </mesh>

        {/* Right Monolith Pillar */}
        <mesh position={[6.2, 0, 0]} material={obsidianMat}>
          <boxGeometry args={[2.4, 24, 3.2]} />
        </mesh>
        {/* Right Pillar Cyan Tech Conduit */}
        <mesh position={[5.05, 0, 1.62]} material={techTrimMat}>
          <boxGeometry args={[0.08, 22, 0.08]} />
        </mesh>

        {/* Monolith Header Arch */}
        <mesh position={[0, 11.2, 0]} material={obsidianMat}>
          <boxGeometry args={[15, 2.2, 3.4]} />
        </mesh>
        {/* Header Arch Bottom Conduit */}
        <mesh position={[0, 10.05, 1.62]} material={techTrimMat}>
          <boxGeometry args={[11, 0.08, 0.08]} />
        </mesh>

        {/* Monolith Base Foundations */}
        <mesh position={[-6.2, -6.5, 0]} material={obsidianMat}>
          <boxGeometry args={[3.6, 2, 4.5]} />
        </mesh>
        <mesh position={[6.2, -6.5, 0]} material={obsidianMat}>
          <boxGeometry args={[3.6, 2, 4.5]} />
        </mesh>
      </group>

      {/* 3. Outer Flanking Monumental Monolith Pillars for Dramatic Parallax */}
      <group position={[-16, 5, -28]}>
        <mesh rotation={[0, 0.35, -0.05]} material={obsidianMat}>
          <boxGeometry args={[3.5, 32, 4.2]} />
        </mesh>
        <mesh position={[1.4, 0, 2]} rotation={[0, 0.35, -0.05]} material={techTrimMat}>
          <boxGeometry args={[0.08, 26, 0.08]} />
        </mesh>
      </group>

      <group position={[16, 5, -28]}>
        <mesh rotation={[0, -0.35, 0.05]} material={obsidianMat}>
          <boxGeometry args={[3.5, 32, 4.2]} />
        </mesh>
        <mesh position={[-1.4, 0, 2]} rotation={[0, -0.35, 0.05]} material={techTrimMat}>
          <boxGeometry args={[0.08, 26, 0.08]} />
        </mesh>
      </group>

      {/* Distant Colossal Spires on the Horizon */}
      <mesh position={[-35, 12, -70]} rotation={[0, 0.2, -0.04]} material={obsidianMat}>
        <coneGeometry args={[4.5, 50, 5]} />
      </mesh>
      <mesh position={[38, 14, -75]} rotation={[0, -0.2, 0.04]} material={obsidianMat}>
        <coneGeometry args={[5.2, 54, 5]} />
      </mesh>

      {/* 4. Sharp Jagged Obsidian Rock Formations flanking foreground and midground */}
      {/* Left Rock Clusters */}
      <group position={[-9, -1.0, -10]}>
        <mesh rotation={[0.4, 0.2, 0.1]} material={obsidianMat}>
          <dodecahedronGeometry args={[2.2, 0]} />
        </mesh>
        <mesh position={[-2.5, -0.5, 2]} rotation={[-0.2, 0.8, -0.3]} material={obsidianMat}>
          <octahedronGeometry args={[1.6, 0]} />
        </mesh>
        <mesh position={[-1.8, 1.2, -1.5]} rotation={[0.5, -0.3, 0.2]} material={obsidianMat}>
          <tetrahedronGeometry args={[1.5, 0]} />
        </mesh>
      </group>

      {/* Right Rock Clusters */}
      <group position={[9, -1.0, -10]}>
        <mesh rotation={[-0.3, -0.4, 0.2]} material={obsidianMat}>
          <dodecahedronGeometry args={[2.4, 0]} />
        </mesh>
        <mesh position={[2.2, -0.4, 1.8]} rotation={[0.4, -0.7, 0.1]} material={obsidianMat}>
          <octahedronGeometry args={[1.8, 0]} />
        </mesh>
        <mesh position={[1.5, 1.4, -1]} rotation={[-0.2, 0.5, -0.4]} material={obsidianMat}>
          <tetrahedronGeometry args={[1.4, 0]} />
        </mesh>
      </group>

      {/* Foreground Jagged Obsidian Outcrops */}
      <mesh position={[-7.5, -1.6, -2]} rotation={[0.3, 0.5, -0.2]} material={obsidianMat}>
        <octahedronGeometry args={[1.2, 0]} />
      </mesh>
      <mesh position={[7.8, -1.6, -1.8]} rotation={[-0.2, -0.6, 0.3]} material={obsidianMat}>
        <octahedronGeometry args={[1.3, 0]} />
      </mesh>
    </group>
  );
}
