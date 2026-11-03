import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { createLabelTexture } from './utils/createLabelTexture';

const CORE_SKILLS = [
  { name: 'PYTHON', desc: 'ETL & Vector Eng', color: '#00f0ff', angle: 0 },
  { name: 'SQL', desc: '82% Query Speedup', color: '#38bdf8', angle: (Math.PI * 2) / 6 },
  { name: 'POWER BI', desc: 'DAX & Cloud Refresh', color: '#f59e0b', angle: ((Math.PI * 2) / 6) * 2 },
  { name: 'AUTOGEN', desc: 'Multi-Agent Auditing', color: '#a855f7', angle: ((Math.PI * 2) / 6) * 3 },
  { name: 'RAG & VECTORS', desc: '15K+ Docs Indexed', color: '#10b981', angle: ((Math.PI * 2) / 6) * 4 },
  { name: 'ANALYTICS & BI', desc: '1.4M+ Recs / 99.4%', color: '#6366f1', angle: ((Math.PI * 2) / 6) * 5 },
];

export default function IntelligenceCore3D({ position = [0, 2, -45] }) {
  const groupRef = useRef();
  const innerCoreRef = useRef();
  const outerRingsRef = useRef();
  const orbitGroupRef = useRef();

  // Pre-generate offline canvas textures (zero network requests, zero 404)
  const runeTextures = useMemo(() => {
    return CORE_SKILLS.map(skill => {
      return createLabelTexture(skill.name, {
        fontSize: 34,
        textColor: '#ffffff',
        subText: skill.desc,
        subColor: skill.color,
        borderColor: skill.color,
        bgColor: 'rgba(5, 12, 30, 0.88)',
        width: 384,
        height: 192
      });
    });
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x = t * 0.4;
      innerCoreRef.current.rotation.y = t * 0.5;
    }
    if (outerRingsRef.current) {
      outerRingsRef.current.rotation.z = -t * 0.25;
      outerRingsRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
    }
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* 1. Luminous Geometric AI Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={innerCoreRef}>
          {/* Inner Glowing Polyhedron */}
          <mesh>
            <octahedronGeometry args={[1.8, 0]} />
            <meshStandardMaterial
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={1.8}
              roughness={0.1}
              metalness={0.9}
              wireframe
            />
          </mesh>

          {/* Central Pulsating Solid Event Core */}
          <mesh>
            <icosahedronGeometry args={[1.1, 1]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive="#38bdf8"
              emissiveIntensity={1.2}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </group>

        {/* Concentric Gyroscopic Rings */}
        <group ref={outerRingsRef}>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[3.0, 0.04, 16, 64]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
            <torusGeometry args={[3.4, 0.03, 16, 64]} />
            <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={1.5} />
          </mesh>
        </group>

        {/* Core Omni Light Source */}
        <pointLight color="#00f0ff" intensity={6} distance={25} decay={2} />
        <pointLight color="#a855f7" intensity={3} distance={20} decay={2} />
      </Float>

      {/* 2. Floating Translucent Glass Runes orbiting the Core */}
      <group ref={orbitGroupRef}>
        {CORE_SKILLS.map((skill, index) => {
          const radius = 6.2;
          const x = Math.cos(skill.angle) * radius;
          const z = Math.sin(skill.angle) * radius;
          const y = Math.sin(index * 1.2) * 1.2;

          return (
            <group key={skill.name} position={[x, y, z]} rotation={[0, -skill.angle + Math.PI / 2, 0]}>
              {/* Textured Glass Rune Panel */}
              <mesh>
                <planeGeometry args={[2.4, 1.2]} />
                <meshBasicMaterial
                  map={runeTextures[index]}
                  transparent
                  opacity={0.92}
                  side={THREE.DoubleSide}
                />
              </mesh>

              {/* Glowing Beveled Border Mesh */}
              <mesh position={[0, 0, -0.01]}>
                <planeGeometry args={[2.44, 1.24]} />
                <meshBasicMaterial color={skill.color} transparent opacity={0.3} side={THREE.DoubleSide} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
