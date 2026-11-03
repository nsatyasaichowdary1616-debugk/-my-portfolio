import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PortalShader } from './shaders/portalShader';

export default function EnergyPortal({ position = [0, 4.5, -22], scale = [1, 1, 1], activeSection = 'hero' }) {
  const meshRef = useRef();
  const ringRef = useRef();
  const innerGlowRef = useRef();

  // Create customized shader material
  const portalMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(PortalShader.uniforms),
      vertexShader: PortalShader.vertexShader,
      fragmentShader: PortalShader.fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      portalMaterial.uniforms.uTime.value += delta * 1.5;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
    }
    if (innerGlowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2.5) * 0.15 + 1.0;
      innerGlowRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Volumetric Cyan-Blue Portal Mesh (Vertical Ellipse) */}
      <mesh ref={meshRef} position={[0, 0, 0]} material={portalMaterial}>
        <planeGeometry args={[9, 18, 32, 64]} />
      </mesh>

      {/* Outer Luminous Tech Ring Frame */}
      <group ref={ringRef} position={[0, 0, -0.1]}>
        <mesh>
          <torusGeometry args={[5.2, 0.08, 16, 64]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={2.5}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        
        {/* Secondary Concentric Orbital Ring */}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[5.8, 0.03, 16, 48]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Inner Event Horizon Core Light */}
      <pointLight
        ref={innerGlowRef}
        position={[0, 0, 0.5]}
        color="#00f0ff"
        intensity={8}
        distance={35}
        decay={2}
      />

      {/* Ambient Deep Blue Backlight */}
      <pointLight
        position={[0, 0, -2]}
        color="#1d4ed8"
        intensity={10}
        distance={45}
        decay={2}
      />
    </group>
  );
}
