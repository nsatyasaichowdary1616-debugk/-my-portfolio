import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingAsteroids3D() {
  const groupRef = useRef();

  // Create asteroid positions and rotational speeds
  const asteroids = useMemo(() => {
    return [
      { pos: [-16, 1, -12], scale: 1.4, rotSpeed: [0.1, 0.2, 0.05], type: 'dodeca' },
      { pos: [-18, -2, -8], scale: 0.9, rotSpeed: [-0.15, 0.1, 0.08], type: 'octa' },
      { pos: [14, 2, -10], scale: 1.2, rotSpeed: [0.08, -0.15, 0.12], type: 'tetra' },
      { pos: [17, -3, -11], scale: 1.5, rotSpeed: [0.12, 0.1, -0.05], type: 'dodeca' },
      { pos: [-8, 9, -20], scale: 1.1, rotSpeed: [-0.05, 0.18, 0.1], type: 'octa' },
      { pos: [8, 12, -24], scale: 1.6, rotSpeed: [0.1, -0.1, 0.08], type: 'dodeca' },
    ];
  }, []);

  const obsidianMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#070d1c',
    roughness: 0.35,
    metalness: 0.8,
    flatShading: true,
  }), []);

  const cyanRimMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#00f0ff',
    emissive: '#00f0ff',
    emissiveIntensity: 0.8,
    roughness: 0.2,
    wireframe: true,
  }), []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const item = asteroids[i];
        if (item) {
          child.rotation.x += item.rotSpeed[0] * delta;
          child.rotation.y += item.rotSpeed[1] * delta;
          child.rotation.z += item.rotSpeed[2] * delta;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {asteroids.map((ast, idx) => (
        <group key={idx} position={ast.pos} scale={[ast.scale, ast.scale, ast.scale]}>
          {ast.type === 'dodeca' && (
            <mesh material={obsidianMat}>
              <dodecahedronGeometry args={[1, 0]} />
            </mesh>
          )}
          {ast.type === 'octa' && (
            <mesh material={obsidianMat}>
              <octahedronGeometry args={[1.1, 0]} />
            </mesh>
          )}
          {ast.type === 'tetra' && (
            <mesh material={obsidianMat}>
              <tetrahedronGeometry args={[1.2, 0]} />
            </mesh>
          )}

          {/* Subtle cyan wireframe halo on every rock */}
          <mesh scale={[1.02, 1.02, 1.02]} material={cyanRimMat}>
            <octahedronGeometry args={[1.05, 0]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
