import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createLabelTexture } from './utils/createLabelTexture';

export default function InfiniteCorridor3D({ startZ = -70, count = 10, spacing = 8 }) {
  // Memoize frame materials
  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#081226',
    roughness: 0.3,
    metalness: 0.8,
  }), []);

  const conduitMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#00f0ff',
    emissive: '#00f0ff',
    emissiveIntensity: 1.8,
    roughness: 0.1,
  }), []);

  const floorConduitMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#38bdf8',
    emissive: '#38bdf8',
    emissiveIntensity: 1.2,
  }), []);

  // Pre-render offline textures for timeline waypoints
  const vangroveTexture = useMemo(() => {
    return createLabelTexture('2025 – 2026', {
      fontSize: 32,
      textColor: '#00f0ff',
      subText: 'DATA ANALYST · VANGROVE TECH',
      subColor: '#ffffff',
      borderColor: '#00f0ff',
      bgColor: 'rgba(5, 12, 30, 0.9)',
      width: 440,
      height: 180
    });
  }, []);

  const mlritTexture = useMemo(() => {
    return createLabelTexture('2021 – 2025', {
      fontSize: 32,
      textColor: '#a855f7',
      subText: 'B.TECH CSE · MLRIT (CGPA 7.34)',
      subColor: '#ffffff',
      borderColor: '#a855f7',
      bgColor: 'rgba(5, 12, 30, 0.9)',
      width: 440,
      height: 180
    });
  }, []);

  // Generate frame positions
  const frames = useMemo(() => {
    return Array.from({ length: count }, (_, i) => startZ - i * spacing);
  }, [count, spacing, startZ]);

  return (
    <group>
      {/* Repeating illuminated sci-fi corridor archways */}
      {frames.map((z, idx) => (
        <group key={idx} position={[0, 3.5, z]}>
          {/* Left Vertical Frame */}
          <mesh position={[-7, 0, 0]} material={frameMat}>
            <boxGeometry args={[0.8, 12, 0.8]} />
          </mesh>
          <mesh position={[-6.55, 0, 0]} material={conduitMat}>
            <boxGeometry args={[0.08, 11.5, 0.08]} />
          </mesh>

          {/* Right Vertical Frame */}
          <mesh position={[7, 0, 0]} material={frameMat}>
            <boxGeometry args={[0.8, 12, 0.8]} />
          </mesh>
          <mesh position={[6.55, 0, 0]} material={conduitMat}>
            <boxGeometry args={[0.08, 11.5, 0.08]} />
          </mesh>

          {/* Top Hexagonal Lintel */}
          <mesh position={[0, 6, 0]} material={frameMat}>
            <boxGeometry args={[14.8, 0.8, 0.8]} />
          </mesh>
          <mesh position={[0, 5.55, 0]} material={conduitMat}>
            <boxGeometry args={[13.5, 0.08, 0.08]} />
          </mesh>

          {/* Floor Guide Beams */}
          <mesh position={[-4, -5.4, 0]} material={floorConduitMat}>
            <boxGeometry args={[0.1, 0.05, spacing]} />
          </mesh>
          <mesh position={[4, -5.4, 0]} material={floorConduitMat}>
            <boxGeometry args={[0.1, 0.05, spacing]} />
          </mesh>
        </group>
      ))}

      {/* Corridor Floating Holographic Markers in 3D Space */}
      <mesh position={[-3.8, 2.5, -85]} rotation={[0, 0.3, 0]}>
        <planeGeometry args={[3.2, 1.3]} />
        <meshBasicMaterial map={vangroveTexture} transparent side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[3.8, 2.5, -112]} rotation={[0, -0.3, 0]}>
        <planeGeometry args={[3.2, 1.3]} />
        <meshBasicMaterial map={mlritTexture} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
