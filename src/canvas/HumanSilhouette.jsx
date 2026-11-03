import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function HumanSilhouette({ position = [0, -1.8, -6] }) {
  // Construct stylized low-poly human silhouette with dark obsidian/cloth texture
  const materials = useMemo(() => ({
    body: new THREE.MeshStandardMaterial({
      color: '#020617',
      roughness: 0.9,
      metalness: 0.1,
    }),
    rimLight: new THREE.MeshBasicMaterial({
      color: '#00f0ff',
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    })
  }), []);

  return (
    <group position={position} scale={[0.32, 0.32, 0.32]}>
      {/* Head */}
      <mesh position={[0, 4.3, 0]} material={materials.body}>
        <sphereGeometry args={[0.22, 16, 16]} />
      </mesh>
      
      {/* Torso / Long Trench Coat / Explorer Suit */}
      <mesh position={[0, 2.8, 0]} material={materials.body}>
        <cylinderGeometry args={[0.3, 0.55, 2.2, 12]} />
      </mesh>

      {/* Cape / Cloak Tail extending subtly backwards */}
      <mesh position={[0, 2.2, 0.15]} rotation={[0.15, 0, 0]} material={materials.body}>
        <cylinderGeometry args={[0.2, 0.65, 2.0, 8]} />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.2, 1.0, 0]} material={materials.body}>
        <cylinderGeometry args={[0.12, 0.1, 1.8, 8]} />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.2, 1.0, 0]} material={materials.body}>
        <cylinderGeometry args={[0.12, 0.1, 1.8, 8]} />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.45, 3.0, 0]} rotation={[0, 0, 0.1]} material={materials.body}>
        <cylinderGeometry args={[0.09, 0.08, 1.4, 8]} />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.45, 3.0, 0]} rotation={[0, 0, -0.1]} material={materials.body}>
        <cylinderGeometry args={[0.09, 0.08, 1.4, 8]} />
      </mesh>

      {/* Subtle Cyan Back-Rim Glow Silhouette Effect */}
      <mesh position={[0, 2.6, -0.05]} scale={[1.05, 1.05, 1.05]} material={materials.rimLight}>
        <cylinderGeometry args={[0.35, 0.65, 3.6, 12]} />
      </mesh>
    </group>
  );
}

