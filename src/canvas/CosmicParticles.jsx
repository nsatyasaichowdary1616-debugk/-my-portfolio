import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CosmicParticles({ count = 800 }) {
  const pointsRef = useRef();

  // Generate random particles in a vast 3D volume
  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    const cyan = new THREE.Color('#00f0ff');
    const blue = new THREE.Color('#2563eb');
    const white = new THREE.Color('#f8fafc');
    const violet = new THREE.Color('#a855f7');

    for (let i = 0; i < count; i++) {
      // Spread in front of and around camera corridor
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = Math.random() * 25 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 120 - 20;

      // Color variation: 60% cyan, 20% blue, 15% white, 5% violet
      const pick = Math.random();
      let c = cyan;
      if (pick > 0.6) c = blue;
      if (pick > 0.8) c = white;
      if (pick > 0.95) c = violet;

      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      sz[i] = Math.random() * 2.5 + 0.8;
    }

    return { positions: pos, colors: col, sizes: sz };
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x = Math.sin(_.clock.elapsedTime * 0.1) * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
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
        size={0.16}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

