import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

export default function HoloHudPanels3D() {
  const neuralLinesRef = useRef();

  // Create Neural Network Graph geometry (nodes & connecting lines)
  const { nodePositions, lineGeometry } = useMemo(() => {
    // 8 interconnected nodes in a neural web
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

          {/* HUD Header Title */}
          <Text
            position={[-1.6, 1.25, 0.05]}
            fontSize={0.28}
            color="#ffffff"
            anchorX="left"
            letterSpacing={0.06}
          >
            Machine
          </Text>
          <Text
            position={[-1.6, 0.95, 0.05]}
            fontSize={0.28}
            color="#38bdf8"
            anchorX="left"
            letterSpacing={0.06}
          >
            Learning
          </Text>

          {/* 3D Interconnected Neural Web */}
          <group ref={neuralLinesRef} position={[0.4, -0.2, 0.1]} scale={[1.3, 1.3, 1.3]}>
            <lineSegments geometry={lineGeometry}>
              <lineBasicMaterial color="#00f0ff" transparent opacity={0.65} linewidth={1} />
            </lineSegments>

            {nodePositions.map((pos, idx) => (
              <mesh key={idx} position={pos}>
                <sphereGeometry args={[0.06, 12, 12]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            ))}
          </group>

          {/* HUD Tech Corner Ticks */}
          <mesh position={[-1.9, 1.5, 0.04]}>
            <planeGeometry args={[0.2, 0.04]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
          <mesh position={[1.9, -1.5, 0.04]}>
            <planeGeometry args={[0.2, 0.04]} />
            <meshBasicMaterial color="#8b5cf6" />
          </mesh>
        </group>
      </Float>

      {/* 2. Lower-Right Floating HUD: "SQL • Python • Power BI" Tech Tablet */}
      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.6} position={[16, -1.8, -19]}>
        <group rotation={[-0.1, -0.4, 0.05]}>
          {/* Glass Card Plate */}
          <mesh>
            <planeGeometry args={[3.8, 2.6]} />
            <meshPhysicalMaterial
              color="#040d22"
              emissive="#38bdf8"
              emissiveIntensity={0.12}
              roughness={0.1}
              metalness={0.3}
              transmission={0.85}
              transparent
              opacity={0.75}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Glowing Border Trim */}
          <mesh position={[0, 0, 0.02]}>
            <ringGeometry args={[1.65, 1.68, 4]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.5} />
          </mesh>

          {/* SQL Row */}
          <group position={[-1.2, 0.6, 0.05]}>
            <mesh position={[-0.2, 0, 0]}>
              <cylinderGeometry args={[0.18, 0.18, 0.24, 16]} />
              <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1.5} />
            </mesh>
            <Text position={[0.3, 0, 0]} fontSize={0.24} color="#ffffff" anchorX="left" letterSpacing={0.05}>
              SQL
            </Text>
          </group>

          {/* Python Row */}
          <group position={[-1.2, 0.0, 0.05]}>
            <mesh position={[-0.2, 0, 0]}>
              <boxGeometry args={[0.26, 0.26, 0.08]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.5} />
            </mesh>
            <Text position={[0.3, 0, 0]} fontSize={0.24} color="#ffffff" anchorX="left" letterSpacing={0.05}>
              Python
            </Text>
          </group>

          {/* Power BI Row */}
          <group position={[-1.2, -0.6, 0.05]}>
            <mesh position={[-0.2, 0, 0]}>
              <boxGeometry args={[0.22, 0.32, 0.08]} />
              <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.8} />
            </mesh>
            <Text position={[0.3, 0, 0]} fontSize={0.24} color="#ffffff" anchorX="left" letterSpacing={0.05}>
              Power BI
            </Text>
          </group>
        </group>
      </Float>

      {/* 3. Mid-Left Floating 3D Analytics Waveform / Line Chart HUD */}
      <Float speed={2.2} rotationIntensity={0.2} floatIntensity={0.4} position={[-12, 6.5, -22]}>
        <group rotation={[0.08, 0.35, -0.05]}>
          {/* Glass Chart Plate */}
          <mesh>
            <planeGeometry args={[4.2, 2.5]} />
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

          {/* Cyan Glowing Line Graph Trend */}
          {[-1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5].map((x, i) => {
            const heights = [0.3, 0.5, 0.4, 0.8, 0.65, 1.1, 1.3];
            const h = heights[i];
            return (
              <mesh key={i} position={[x, -0.5 + h / 2, 0.05]}>
                <boxGeometry args={[0.15, h, 0.04]} />
                <meshStandardMaterial
                  color="#00f0ff"
                  emissive="#00f0ff"
                  emissiveIntensity={2.0}
                />
              </mesh>
            );
          })}

          {/* Top connecting curve wire */}
          <mesh position={[0, 0.2, 0.06]} rotation={[0, 0, 0.25]}>
            <boxGeometry args={[3.2, 0.04, 0.02]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>

          <Text position={[-1.7, 0.9, 0.05]} fontSize={0.16} color="#94a3b8" anchorX="left">
            DATA INGESTION STREAM
          </Text>
          <Text position={[1.7, 0.9, 0.05]} fontSize={0.16} color="#00f0ff" anchorX="right">
            99.4% INTEGRITY
          </Text>
        </group>
      </Float>

    </group>
  );
}
