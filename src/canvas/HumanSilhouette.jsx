import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function HumanSilhouette({ position = [0, -1.75, -4.5] }) {
  const materials = useMemo(() => ({
    body: new THREE.MeshStandardMaterial({
      color: '#02050e',
      roughness: 0.9,
      metalness: 0.1,
    }),
    cyanGlow: new THREE.MeshStandardMaterial({
      color: '#00f0ff',
      emissive: '#00f0ff',
      emissiveIntensity: 2.5,
    }),
    rimLight: new THREE.MeshBasicMaterial({
      color: '#38bdf8',
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    })
  }), []);

  return (
    <group position={position} scale={[0.34, 0.34, 0.34]} rotation={[0, 0, 0]}>
      {/* Head */}
      <mesh position={[0, 4.4, 0]} material={materials.body}>
        <sphereGeometry args={[0.24, 16, 16]} />
      </mesh>
      
      {/* Upper Torso / Tech Jacket */}
      <mesh position={[0, 2.9, 0]} material={materials.body}>
        <cylinderGeometry args={[0.32, 0.48, 2.1, 12]} />
      </mesh>

      {/* Distinct Glowing Cyan Triangle Node on Back (exact match from reference image!) */}
      <group position={[0, 3.1, 0.26]} rotation={[0, 0, Math.PI]}>
        <mesh material={materials.cyanGlow}>
          <coneGeometry args={[0.14, 0.22, 3]} />
        </mesh>
      </group>

      {/* Cloak / Long Jacket Flare */}
      <mesh position={[0, 2.2, 0.05]} rotation={[0.08, 0, 0]} material={materials.body}>
        <cylinderGeometry args={[0.24, 0.62, 1.8, 10]} />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.2, 1.0, 0]} material={materials.body}>
        <cylinderGeometry args={[0.13, 0.1, 1.8, 8]} />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.2, 1.0, 0]} material={materials.body}>
        <cylinderGeometry args={[0.13, 0.1, 1.8, 8]} />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.45, 3.0, 0]} rotation={[0, 0, 0.08]} material={materials.body}>
        <cylinderGeometry args={[0.09, 0.08, 1.4, 8]} />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.45, 3.0, 0]} rotation={[0, 0, -0.08]} material={materials.body}>
        <cylinderGeometry args={[0.09, 0.08, 1.4, 8]} />
      </mesh>

      {/* Subtle Cyan Back-Rim Glow Silhouette Effect */}
      <mesh position={[0, 2.7, -0.05]} scale={[1.05, 1.05, 1.05]} material={materials.rimLight}>
        <cylinderGeometry args={[0.35, 0.65, 3.6, 12]} />
      </mesh>
    </group>
  );
}
