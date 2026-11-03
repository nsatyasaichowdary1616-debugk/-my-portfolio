export const GroundShader = {
  uniforms: {
    uTime: { value: 0 },
    uColorBase: { value: [0.015, 0.03, 0.06] },
    uColorGlow: { value: [0.0, 0.6, 0.85] },
    uColorFog: { value: [0.01, 0.02, 0.05] },
  },

  vertexShader: `
    varying vec2 vUv;
    varying vec3 vWorldPosition;

    void main() {
      vUv = uv;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,

  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColorBase;
    uniform vec3 uColorGlow;
    uniform vec3 uColorFog;

    varying vec2 vUv;
    varying vec3 vWorldPosition;

    void main() {
      // Perspective distance from camera
      float dist = length(vWorldPosition.xz);
      
      // Portal & bust reflection streak along Z-axis toward viewer
      float streakX = smoothstep(14.0, 0.0, abs(vWorldPosition.x - 2.5));
      float streakZ = smoothstep(55.0, -12.0, vWorldPosition.z) * smoothstep(-45.0, -12.0, vWorldPosition.z);
      
      // Micro-surface ripples
      float ripple = sin(vWorldPosition.z * 1.5 + sin(vWorldPosition.x * 2.0) + uTime * 1.2) * 0.5 + 0.5;
      
      // Combine reflection specular streak
      float reflectionIntensity = streakX * streakZ * (0.65 + ripple * 0.35);
      
      // Grid lines / technological floor traces using clean analytical sine without fwidth
      float gridX = abs(sin(vWorldPosition.x * 0.6));
      float gridZ = abs(sin(vWorldPosition.z * 0.6));
      float gridIntensity = pow(max(gridX, gridZ), 32.0);
      gridIntensity *= smoothstep(45.0, 5.0, dist) * 0.22;

      // Color composite
      vec3 color = uColorBase;
      color += uColorGlow * reflectionIntensity * 0.85;
      color += vec3(0.55, 0.3, 0.95) * reflectionIntensity * 0.4;
      color += uColorGlow * gridIntensity;

      // Distance fog falloff
      float fogFactor = smoothstep(22.0, 95.0, dist);
      color = mix(color, uColorFog, fogFactor);

      gl_FragColor = vec4(color, 1.0);
    }
  `
};
