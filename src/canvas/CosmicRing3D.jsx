import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CosmicRing3D({ position = [5, 2.5, -18], count = 450 }) {
  const ringRef = useRef();
  const ring2Ref = useRef();
  const particlesRef = useRef();

  // Particle stream circling the ring
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color('#00f0ff');
    const purple = new THREE.Color('#a855f7');
    const blue = new THREE.Color('#3b82f6');

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 11.5 + (Math.random() - 0.5) * 1.8;
      const height = (Math.random() - 0.5) * 0.8;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      const pick = Math.random();
      const c = pick > 0.5 ? cyan : pick > 0.2 ? purple : blue;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.12;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.16;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.25;
    }
  });

  return (
    // Tilted ring plane matching the reference image (~30 deg X, -20 deg Z)
    <group position={position} rotation={[0.65, -0.4, 0.45]}>
      {/* Primary Cyan Glowing Energy Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[11.5, 0.09, 16, 120]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={3.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Secondary Violet Outer Energy Ring */}
      <mesh ref={ring2Ref} scale={[1.06, 1.06, 1]}>
        <torusGeometry args={[11.5, 0.05, 16, 96]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={2.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Orbiting Particle Accretion Stream */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.18}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Ambient Ring Glow Point Light */}
      <pointLight color="#00f0ff" intensity={5} distance={20} decay={2} position={[0, 0, 5]} />
    </group>
  );
}
