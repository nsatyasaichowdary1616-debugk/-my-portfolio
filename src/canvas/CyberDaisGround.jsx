import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GroundShader } from './shaders/groundShader';

export default function CyberDaisGround({ position = [0, -2, 0] }) {
  const ringsRef = useRef();

  const groundMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(GroundShader.uniforms),
      vertexShader: GroundShader.vertexShader,
      fragmentShader: GroundShader.fragmentShader,
      transparent: false,
    });
  }, []);

  const daisMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#050a16',
    roughness: 0.3,
    metalness: 0.85,
  }), []);

  const cyanRingMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#00f0ff',
    emissive: '#00f0ff',
    emissiveIntensity: 2.5,
    roughness: 0.1,
  }), []);

  const violetRingMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#8b5cf6',
    emissive: '#8b5cf6',
    emissiveIntensity: 2.0,
    roughness: 0.1,
  }), []);

  useFrame((state, delta) => {
    if (groundMaterial) {
      groundMaterial.uniforms.uTime.value += delta;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* 1. Vast Reflective Wet Obsidian Ground Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={groundMaterial}>
        <planeGeometry args={[180, 180, 64, 64]} />
      </mesh>

      {/* 2. Concentric Stepped Cybernetic Platform / Dais (at z = -4.5) */}
      <group position={[0, 0.05, -4.5]}>
        {/* Outer Dais Tier */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[5.2, 5.6, 0.1, 48]} />
          <primitive object={daisMat} />
        </mesh>
        {/* Outer Cyan Ring Light */}
        <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4.8, 4.92, 48]} />
          <primitive object={cyanRingMat} />
        </mesh>

        {/* Middle Dais Tier */}
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[3.6, 3.9, 0.08, 48]} />
          <primitive object={daisMat} />
        </mesh>
        {/* Middle Violet Ring Light */}
        <mesh position={[0, 0.17, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.2, 3.3, 48]} />
          <primitive object={violetRingMat} />
        </mesh>

        {/* Inner Core Stepping Dais */}
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[2.0, 2.2, 0.06, 36]} />
          <primitive object={daisMat} />
        </mesh>
        {/* Inner Cyan Target Ring */}
        <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.6, 1.68, 36]} />
          <primitive object={cyanRingMat} />
        </mesh>

        {/* Rotating Radial Tech Spokes */}
        <group ref={ringsRef} position={[0, 0.23, 0]}>
          {[0, Math.PI / 3, (Math.PI * 2) / 3].map((angle, idx) => (
            <mesh key={idx} rotation={[-Math.PI / 2, 0, angle]}>
              <planeGeometry args={[0.06, 3.2]} />
              <meshBasicMaterial color="#00f0ff" />
            </mesh>
          ))}
        </group>

        {/* Ground Light illuminating explorer silhouette */}
        <pointLight color="#00f0ff" intensity={3.5} distance={8} decay={2} position={[0, 1.2, 0]} />
        <pointLight color="#8b5cf6" intensity={2.5} distance={10} decay={2} position={[0, 0.8, -1]} />
      </group>
    </group>
  );
}
