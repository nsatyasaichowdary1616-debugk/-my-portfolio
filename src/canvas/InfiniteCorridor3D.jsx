import React, { useMemo } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

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

          {/* Depth Light Pockets */}
          {idx % 3 === 0 && (
            <pointLight position={[0, 5, 0]} color="#00f0ff" intensity={1.5} distance={15} decay={2} />
          )}
        </group>
      ))}

      {/* Corridor Floating Holographic Markers in 3D Space */}
      <group position={[-3.8, 2.5, -85]}>
        <Text
          fontSize={0.35}
          color="#00f0ff"
          anchorX="center"
          letterSpacing={0.1}
        >
          2025 – 2026
        </Text>
        <Text
          position={[0, -0.4, 0]}
          fontSize={0.22}
          color="#ffffff"
          anchorX="center"
        >
          DATA ANALYST • VANGROVE TECH
        </Text>
        <Text
          position={[0, -0.75, 0]}
          fontSize={0.16}
          color="#94a3b8"
          anchorX="center"
        >
          1.4M+ Transactions • 82% Query Speedup
        </Text>
      </group>

      <group position={[3.8, 2.5, -112]}>
        <Text
          fontSize={0.35}
          color="#a855f7"
          anchorX="center"
          letterSpacing={0.1}
        >
          2021 – 2025
        </Text>
        <Text
          position={[0, -0.4, 0]}
          fontSize={0.22}
          color="#ffffff"
          anchorX="center"
        >
          B.TECH CSE • MLRIT
        </Text>
        <Text
          position={[0, -0.75, 0]}
          fontSize={0.16}
          color="#94a3b8"
          anchorX="center"
        >
          CGPA 7.34 • National Hackathon Laurels
        </Text>
      </group>
    </group>
  );
}
