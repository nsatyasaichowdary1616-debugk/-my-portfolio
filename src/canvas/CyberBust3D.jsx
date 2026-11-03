import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CyberBust3D({ position = [5, 2.5, -18], scale = [1.2, 1.2, 1.2] }) {
  const groupRef = useRef();
  const visorRef = useRef();
  const scanlineRef = useRef();
  const circuitsRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });

  // Visor Scanline Shader Material
  const visorMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#00f0ff') },
        uColor2: { value: new THREE.Color('#8b5cf6') },
        uColorCore: { value: new THREE.Color('#ffffff') }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColorCore;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);
          float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.5);

          // Horizontal high-tech laser scanlines
          float scanline = sin(vUv.y * 120.0 - uTime * 6.0) * 0.5 + 0.5;
          scanline = pow(scanline, 4.0);

          // Fast laser sweep beam
          float sweep = smoothstep(0.06, 0.0, abs(fract(vUv.y * 2.0 - uTime * 0.4) - 0.5));

          // Base gradient cyan to purple
          vec3 baseColor = mix(uColor1, uColor2, vUv.x + sin(uTime * 0.8) * 0.2);
          vec3 finalColor = baseColor * (0.8 + scanline * 0.4) + uColorCore * sweep * 1.5;
          finalColor += uColor1 * fresnel * 1.8;

          gl_FragColor = vec4(finalColor, 0.88);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  // Cyber Skin Material (Deep obsidian with subtle metallic sheen & blue rim)
  const cyberSkinMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#060b18',
    roughness: 0.28,
    metalness: 0.85,
    flatShading: true,
  }), []);

  // Glowing Cyber Conduit / Circuitry Material
  const circuitMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#00f0ff',
    emissive: '#00f0ff',
    emissiveIntensity: 2.2,
    roughness: 0.1,
  }), []);

  const violetCircuitMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#a855f7',
    emissive: '#a855f7',
    emissiveIntensity: 2.0,
    roughness: 0.1,
  }), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    visorMaterial.uniforms.uTime.value = t;

    // Follow pointer with smooth dampened gaze
    const targetRotY = state.pointer.x * 0.15 - 0.22; // slight natural angle facing hero center
    const targetRotX = -state.pointer.y * 0.1 - 0.08; // gazing slightly upward toward the stars

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 3.5, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 3.5, delta);
      // Gentle breathing idle float
      groupRef.current.position.y = 2.5 + Math.sin(t * 1.2) * 0.08;
    }

    if (circuitsRef.current) {
      circuitMat.emissiveIntensity = 2.0 + Math.sin(t * 3.0) * 0.8;
      violetCircuitMat.emissiveIntensity = 1.8 + Math.cos(t * 2.5) * 0.7;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      
      {/* 1. Cranium / Head Structure */}
      <group position={[0, 4.2, 0]}>
        {/* Main Cranium Base */}
        <mesh material={cyberSkinMat}>
          <sphereGeometry args={[2.8, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.85]} />
        </mesh>

        {/* Angular Jaw / Chin Form */}
        <mesh position={[0, -1.8, 1.2]} rotation={[0.45, 0, 0]} material={cyberSkinMat}>
          <coneGeometry args={[1.7, 3.2, 5]} />
        </mesh>

        {/* Cheekbone & Temple Cybernetic Armor Plates */}
        <mesh position={[-1.7, -0.6, 1.5]} rotation={[0.2, 0.4, -0.2]} material={cyberSkinMat}>
          <boxGeometry args={[1.1, 1.6, 0.8]} />
        </mesh>
        <mesh position={[1.7, -0.6, 1.5]} rotation={[0.2, -0.4, 0.2]} material={cyberSkinMat}>
          <boxGeometry args={[1.1, 1.6, 0.8]} />
        </mesh>

        {/* Cyber Crest / Armored Hair Plating sweeping back */}
        {[-0.8, -0.4, 0, 0.4, 0.8].map((xOffset, idx) => (
          <mesh
            key={idx}
            position={[xOffset * 1.8, 2.0 + Math.abs(xOffset) * 0.3, -0.5 - Math.abs(xOffset) * 0.5]}
            rotation={[-0.45, 0, xOffset * 0.15]}
            material={cyberSkinMat}
          >
            <boxGeometry args={[0.55, 3.2, 1.2]} />
          </mesh>
        ))}

        {/* 2. Sleek Glowing Holographic VR/AR Visor */}
        <group position={[0, 0.15, 2.2]} rotation={[0.1, 0, 0]}>
          {/* Main Curved Visor Screen */}
          <mesh ref={visorRef} material={visorMaterial}>
            <cylinderGeometry args={[2.55, 2.45, 1.35, 32, 1, false, Math.PI * 0.72, Math.PI * 0.56]} />
          </mesh>

          {/* Visor Upper Metallic Brow Frame */}
          <mesh position={[0, 0.72, 0]} material={cyberSkinMat}>
            <cylinderGeometry args={[2.62, 2.62, 0.18, 32, 1, false, Math.PI * 0.7, Math.PI * 0.6]} />
          </mesh>

          {/* Visor Lower Metallic Frame */}
          <mesh position={[0, -0.72, 0]} material={cyberSkinMat}>
            <cylinderGeometry args={[2.52, 2.52, 0.15, 32, 1, false, Math.PI * 0.7, Math.PI * 0.6]} />
          </mesh>

          {/* Visor Edge Cyan Accent Conduits */}
          <mesh position={[-2.1, 0, 0.8]} rotation={[0, 0.4, 0]} material={circuitMat}>
            <boxGeometry args={[0.08, 1.2, 0.15]} />
          </mesh>
          <mesh position={[2.1, 0, 0.8]} rotation={[0, -0.4, 0]} material={circuitMat}>
            <boxGeometry args={[0.08, 1.2, 0.15]} />
          </mesh>

          {/* Visor Projector Light Source illuminating user */}
          <pointLight color="#00f0ff" intensity={4.5} distance={12} decay={2} position={[0, 0, 2]} />
        </group>

        {/* Ear Cyber Nodes / Audio Receptors */}
        <mesh position={[-2.7, -0.2, 0.2]} rotation={[0, 0, Math.PI / 2]} material={cyberSkinMat}>
          <cylinderGeometry args={[0.7, 0.7, 0.4, 16]} />
        </mesh>
        <mesh position={[-2.85, -0.2, 0.2]} rotation={[0, 0, Math.PI / 2]} material={circuitMat}>
          <torusGeometry args={[0.5, 0.06, 12, 24]} />
        </mesh>

        <mesh position={[2.7, -0.2, 0.2]} rotation={[0, 0, Math.PI / 2]} material={cyberSkinMat}>
          <cylinderGeometry args={[0.7, 0.7, 0.4, 16]} />
        </mesh>
        <mesh position={[2.85, -0.2, 0.2]} rotation={[0, 0, Math.PI / 2]} material={circuitMat}>
          <torusGeometry args={[0.5, 0.06, 12, 24]} />
        </mesh>
      </group>

      {/* 3. Cybernetic Neck & Bioluminescent Conduits */}
      <group ref={circuitsRef} position={[0, 0.8, 0]}>
        {/* Core Neck Pillar */}
        <mesh position={[0, 0.4, -0.2]} material={cyberSkinMat}>
          <cylinderGeometry args={[1.5, 2.1, 3.2, 24]} />
        </mesh>

        {/* Glowing Circuitry Conduits Along the Neck */}
        <mesh position={[-1.1, 0.4, 0.9]} rotation={[0, 0.2, -0.1]} material={circuitMat}>
          <cylinderGeometry args={[0.06, 0.06, 3.0, 8]} />
        </mesh>
        <mesh position={[1.1, 0.4, 0.9]} rotation={[0, -0.2, 0.1]} material={circuitMat}>
          <cylinderGeometry args={[0.06, 0.06, 3.0, 8]} />
        </mesh>

        <mesh position={[-1.6, 0.2, 0.3]} rotation={[0, 0.5, -0.15]} material={violetCircuitMat}>
          <cylinderGeometry args={[0.05, 0.05, 2.8, 8]} />
        </mesh>
        <mesh position={[1.6, 0.2, 0.3]} rotation={[0, -0.5, 0.15]} material={violetCircuitMat}>
          <cylinderGeometry args={[0.05, 0.05, 2.8, 8]} />
        </mesh>
      </group>

      {/* 4. Armored Shoulders & Torso Mantle */}
      <group position={[0, -2.2, 0]}>
        {/* Broad Cybernetic Chest & Collar */}
        <mesh position={[0, 0.2, 0.4]} rotation={[0.2, 0, 0]} material={cyberSkinMat}>
          <boxGeometry args={[7.2, 3.4, 3.5]} />
        </mesh>

        {/* Left Shoulder Pauldron */}
        <mesh position={[-4.5, 0.6, 0]} rotation={[0, 0, 0.25]} material={cyberSkinMat}>
          <sphereGeometry args={[2.1, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
        </mesh>
        <mesh position={[-4.5, 1.2, 0.6]} rotation={[0, 0, 0.25]} material={circuitMat}>
          <torusGeometry args={[1.4, 0.05, 8, 24]} />
        </mesh>

        {/* Right Shoulder Pauldron */}
        <mesh position={[4.5, 0.6, 0]} rotation={[0, 0, -0.25]} material={cyberSkinMat}>
          <sphereGeometry args={[2.1, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
        </mesh>
        <mesh position={[4.5, 1.2, 0.6]} rotation={[0, 0, -0.25]} material={circuitMat}>
          <torusGeometry args={[1.4, 0.05, 8, 24]} />
        </mesh>

        {/* Central Chest Reactor / Arc Core */}
        <mesh position={[0, 0.8, 2.2]} material={circuitMat}>
          <cylinderGeometry args={[0.6, 0.6, 0.2, 24]} />
        </mesh>
        <pointLight color="#00f0ff" intensity={3} distance={8} decay={2} position={[0, 0.8, 2.6]} />
      </group>

      {/* Rim Accent Lights */}
      <pointLight color="#8b5cf6" intensity={6} distance={20} decay={2} position={[6, 4, -4]} />
      <pointLight color="#00f0ff" intensity={8} distance={22} decay={2} position={[-6, 4, 4]} />
    </group>
  );
}

