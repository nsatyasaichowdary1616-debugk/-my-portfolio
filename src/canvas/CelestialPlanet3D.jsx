import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CelestialPlanet3D() {
  const planetRef = useRef();
  const stationRef = useRef();

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.015;
    }
    if (stationRef.current) {
      stationRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <group>
      {/* 1. Giant Cosmic Planet / Moon in Top-Right Background */}
      <group position={[32, 22, -60]}>
        {/* Planet Sphere */}
        <mesh ref={planetRef}>
          <sphereGeometry args={[14, 48, 48]} />
          <meshStandardMaterial
            color="#081024"
            roughness={0.7}
            metalness={0.2}
            bumpScale={0.05}
          />
        </mesh>

        {/* Crescent Atmospheric Glow Ring */}
        <mesh position={[-0.8, -0.4, 0.5]} scale={[1.04, 1.04, 1.04]}>
          <sphereGeometry args={[14, 32, 32]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.18}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Planet Specular Rim Light */}
        <pointLight color="#60a5fa" intensity={4} distance={60} decay={2} position={[-16, -10, 10]} />
      </group>

      {/* 2. Top-Left Orbital Space Megastructure / Station */}
      <group ref={stationRef} position={[-28, 20, -50]} rotation={[0.4, 0.2, -0.3]}>
        {/* Central Spindle */}
        <mesh>
          <cylinderGeometry args={[0.6, 0.6, 24, 12]} />
          <meshStandardMaterial color="#0c1830" roughness={0.4} metalness={0.8} />
        </mesh>
        {/* Rotating Habitat Torus */}
        <mesh position={[0, 2, 0]}>
          <torusGeometry args={[5, 0.4, 12, 32]} />
          <meshStandardMaterial color="#08142b" roughness={0.3} metalness={0.9} />
        </mesh>
        {/* Glowing Tech Windows / Conduits */}
        <mesh position={[0, 2, 0]}>
          <torusGeometry args={[5.05, 0.08, 8, 32]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  );
}

