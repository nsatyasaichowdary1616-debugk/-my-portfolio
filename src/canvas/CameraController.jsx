import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Waypoints corresponding to the 7 sections of the portfolio experience
const CAMERA_WAYPOINTS = [
  // 0: HERO (Framing Colossal Cyber Bust, Visor, Silhouette & Cosmic Rings)
  { pos: new THREE.Vector3(0, 1.4, 11), target: new THREE.Vector3(1.6, 2.8, -18) },
  // 1: ABOUT (Approaching the cybernetic core)
  { pos: new THREE.Vector3(1.2, 2.2, -5), target: new THREE.Vector3(3.0, 3.0, -18) },
  // 2: SKILLS (The Intelligence Core chamber)
  { pos: new THREE.Vector3(0, 2.2, -36), target: new THREE.Vector3(0, 2.0, -45) },
  // 3: PROJECTS (The Holographic Data Universe Observatory)
  { pos: new THREE.Vector3(2.0, 3.2, -54), target: new THREE.Vector3(0, 1.8, -62) },
  // 4: EXPERIENCE (The Infinite Corridor)
  { pos: new THREE.Vector3(0, 2.4, -80), target: new THREE.Vector3(0, 2.4, -115) },
  // 5: ACHIEVEMENTS (The Light Chamber)
  { pos: new THREE.Vector3(-2.2, 3.0, -118), target: new THREE.Vector3(0, 2.2, -132) },
  // 6: CONTACT (The Final Horizon)
  { pos: new THREE.Vector3(0, 3.8, -142), target: new THREE.Vector3(0, 3.0, -170) },
];

export default function CameraController({ activeIndex = 0, scrollProgress = 0, freeOrbit = false }) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 1.4, 11));
  const currentTarget = useRef(new THREE.Vector3(1.6, 2.8, -18));
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (freeOrbit) return;

    // Calculate interpolated position based on continuous scrollProgress (0 to 6)
    const clampedProgress = Math.min(Math.max(scrollProgress, 0), CAMERA_WAYPOINTS.length - 1);
    const lowerIdx = Math.floor(clampedProgress);
    const upperIdx = Math.min(lowerIdx + 1, CAMERA_WAYPOINTS.length - 1);
    const blend = clampedProgress - lowerIdx;

    const lowerWaypoint = CAMERA_WAYPOINTS[lowerIdx];
    const upperWaypoint = CAMERA_WAYPOINTS[upperIdx];

    // Desired camera pos with mouse parallax
    const desiredPos = new THREE.Vector3()
      .copy(lowerWaypoint.pos)
      .lerp(upperWaypoint.pos, blend);

    // Subtle pointer parallax tilt
    const parallaxFactorX = 0.5;
    const parallaxFactorY = 0.3;
    desiredPos.x += mouse.current.x * parallaxFactorX;
    desiredPos.y += mouse.current.y * parallaxFactorY;

    // Desired camera target
    const desiredTarget = new THREE.Vector3()
      .copy(lowerWaypoint.target)
      .lerp(upperWaypoint.target, blend);

    // Smoothly damp towards target using exponential smoothing
    currentPos.current.lerp(desiredPos, Math.min(delta * 4.0, 1.0));
    currentTarget.current.lerp(desiredTarget, Math.min(delta * 4.0, 1.0));

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
