import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { createLabelTexture } from './utils/createLabelTexture';

export default function HoloHudPanels3D() {
  const neuralLinesRef = useRef();

  // Create offline canvas textures (zero network dependencies, zero 404 risk)
  const mlTitleTexture = useMemo(() => {
    return createLabelTexture('Machine Learning', {
      fontSize: 34,
      textColor: '#ffffff',
      subText: '3D Neural Graph',
      subColor: '#38bdf8',
      borderColor: '#00f0ff',
      bgColor: 'rgba(4, 15, 38, 0.85)',
      width: 360,
      height: 140
    });
  }, []);

  const techStackTexture = useMemo(() => {
    return createLabelTexture('SQL • PYTHON • POWER BI', {
      fontSize: 26,
      textColor: '#ffffff',
      subText: 'Core Analytics Stack',
      subColor: '#f59e0b',
      borderColor: '#38bdf8',
      bgColor: 'rgba(4, 12, 32, 0.85)',
      width: 400,
      height: 160
    });
  }, []);

  const analyticsTexture = useMemo(() => {
    return createLabelTexture('STREAM INGESTION', {
      fontSize: 24,
      textColor: '#94a3b8',
      subText: '1.4M+ Recs · 99.4% Integrity',
      subColor: '#00f0ff',
      borderColor: '#00f0ff',
      bgColor: 'rgba(4, 14, 36, 0.82)',
      width: 380,
      height: 140
    });
  }, []);

  // Create Neural Network Graph geometry (nodes & connecting lines)
  const { nodePositions, lineGeometry } = useMemo(() => {
    const nodes = [
      [-0.8, 0.4, 0],
      [-0.6, -0.4, 0.2],
      [-0.1, 0.6, -0.1],
      [0.0, 0.0, 0.3],
      [0.1, -0.5, 0],
      [0.6, 0.5, 0.1],
      [0.7, -0.2, -0.2],
      [0.8, 0.2, 0.2]
    ];

    const pairs = [
      [0, 1], [0, 2], [0, 3],
      [1, 3], [1, 4],
      [2, 3], [2, 5],
      [3, 4], [3, 5], [3, 6], [3, 7],
      [4, 6],
      [5, 7],
      [6, 7]
    ];

    const linePoints = [];
    pairs.forEach(([a, b]) => {
      linePoints.push(new THREE.Vector3(...nodes[a]));
      linePoints.push(new THREE.Vector3(...nodes[b]));
    });

    const geom = new THREE.BufferGeometry().setFromPoints(linePoints);
    return { nodePositions: nodes, lineGeometry: geom };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (neuralLinesRef.current) {
      neuralLinesRef.current.rotation.y = Math.sin(t * 0.4) * 0.15;
    }
  });

  return (
    <group>
      
      {/* 1. Upper-Right Floating HUD: "Machine Learning" Neural Web */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={[15, 8.5, -20]}>
        <group rotation={[0.05, -0.35, 0.05]}>
          {/* Glass HUD Frame Panel */}
          <mesh>
            <planeGeometry args={[4.2, 3.4]} />
            <meshPhysicalMaterial
              color="#04122c"
              emissive="#00f0ff"
              emissiveIntensity={0.15}
              roughness={0.1}
              metalness={0.2}
              transmission={0.88}
              transparent
              opacity={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Border Frame Outline */}
          <mesh position={[0, 0, 0.02]}>
            <ringGeometry args={[2.0, 2.05, 4]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} />
          </mesh>

          {/* Title Banner Sprite */}
          <mesh position={[0, 1.15, 0.05]}>
            <planeGeometry args={[3.2, 0.8]} />
            <meshBasicMaterial map={mlTitleTexture} transparent side={THREE.DoubleSide} />
          </mesh>

          {/* 3D Interconnected Neural Web */}
          <group ref={neuralLinesRef} position={[0.2, -0.3, 0.1]} scale={[1.3, 1.3, 1.3]}>
            <lineSegments geometry={lineGeometry}>
              <lineBasicMaterial color="#00f0ff" transparent opacity={0.75} />
            </lineSegments>

            {nodePositions.map((pos, idx) => (
              <mesh key={idx} position={pos}>
                <sphereGeometry args={[0.07, 12, 12]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            ))}
          </group>
        </group>
      </Float>

      {/* 2. Lower-Right Floating HUD: "SQL • Python • Power BI" Tech Tablet */}
      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.6} position={[16, -1.8, -19]}>
        <group rotation={[-0.1, -0.4, 0.05]}>
          {/* Glass Card Plate with Text Banner */}
          <mesh>
            <planeGeometry args={[3.8, 2.2]} />
            <meshBasicMaterial map={techStackTexture} transparent side={THREE.DoubleSide} />
          </mesh>

          {/* 3D Tech Emblems */}
          <group position={[0, -0.4, 0.06]}>
            <mesh position={[-1.0, 0, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.2, 16]} />
              <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.0} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.26, 0.26, 0.08]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2.0} />
            </mesh>
            <mesh position={[1.0, 0, 0]}>
              <boxGeometry args={[0.22, 0.32, 0.08]} />
              <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={2.0} />
            </mesh>
          </group>
        </group>
      </Float>

      {/* 3. Mid-Left Floating 3D Analytics Waveform / Line Chart HUD */}
      <Float speed={2.2} rotationIntensity={0.2} floatIntensity={0.4} position={[-12, 6.5, -22]}>
        <group rotation={[0.08, 0.35, -0.05]}>
          {/* Glass Chart Plate */}
          <mesh>
            <planeGeometry args={[4.2, 2.6]} />
            <meshPhysicalMaterial
              color="#05102a"
              emissive="#00f0ff"
              emissiveIntensity={0.1}
              roughness={0.15}
              transmission={0.85}
              transparent
              opacity={0.65}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Header Banner */}
          <mesh position={[0, 0.75, 0.04]}>
            <planeGeometry args={[3.4, 0.8]} />
            <meshBasicMaterial map={analyticsTexture} transparent side={THREE.DoubleSide} />
          </mesh>

          {/* Cyan Glowing Line Graph Bars */}
          {[-1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5].map((x, i) => {
            const heights = [0.3, 0.5, 0.4, 0.8, 0.65, 1.1, 1.3];
            const h = heights[i];
            return (
              <mesh key={i} position={[x, -0.6 + h / 2, 0.05]}>
                <boxGeometry args={[0.16, h, 0.04]} />
                <meshStandardMaterial
                  color="#00f0ff"
                  emissive="#00f0ff"
                  emissiveIntensity={2.2}
                />
              </mesh>
            );
          })}
        </group>
      </Float>

    </group>
  );
}
