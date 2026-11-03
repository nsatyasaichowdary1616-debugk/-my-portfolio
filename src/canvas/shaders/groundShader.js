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
      
      // Portal reflection streak along Z-axis toward viewer (X close to 0)
      float portalStreakX = smoothstep(12.0, 0.0, abs(vWorldPosition.x));
      float portalStreakZ = smoothstep(60.0, -10.0, vWorldPosition.z) * smoothstep(-40.0, -10.0, vWorldPosition.z);
      
      // Micro-surface ripples
      float ripple = sin(vWorldPosition.z * 1.5 + sin(vWorldPosition.x * 2.0) + uTime * 1.2) * 0.5 + 0.5;
      float microDetail = sin(vWorldPosition.x * 12.0 + uTime * 0.5) * sin(vWorldPosition.z * 12.0);
      
      // Combine reflection specular streak
      float reflectionIntensity = portalStreakX * portalStreakZ * (0.6 + ripple * 0.4);
      
      // Grid lines / technological floor traces (very subtle obsidian tile tessellation)
      vec2 grid = abs(fract(vWorldPosition.xz * 0.2 - 0.5) - 0.5) / fwidth(vWorldPosition.xz * 0.2);
      float line = min(grid.x, grid.y);
      float gridIntensity = 1.0 - min(line, 1.0);
      gridIntensity *= smoothstep(40.0, 5.0, dist) * 0.12;

      // Color composite
      vec3 color = uColorBase;
      color += uColorGlow * reflectionIntensity * 0.75;
      color += uColorGlow * gridIntensity;

      // Distance fog falloff
      float fogFactor = smoothstep(25.0, 90.0, dist);
      color = mix(color, uColorFog, fogFactor);

      gl_FragColor = vec4(color, 1.0);
    }
  `
};
