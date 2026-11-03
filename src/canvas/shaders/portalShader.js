export const PortalShader = {
  uniforms: {
    uTime: { value: 0 },
    uColorInner: { value: [0.85, 0.98, 1.0] },
    uColorCore: { value: [0.0, 0.94, 1.0] },
    uColorOuter: { value: [0.05, 0.2, 0.65] },
    uColorEdge: { value: [0.01, 0.04, 0.15] },
    uIntensity: { value: 1.2 },
    uAspect: { value: 2.2 } // vertical ellipse aspect ratio
  },

  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,

  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColorInner;
    uniform vec3 uColorCore;
    uniform vec3 uColorOuter;
    uniform vec3 uColorEdge;
    uniform float uIntensity;
    uniform float uAspect;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    // 2D Simplex-like noise helper
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      // Center coordinates (-1 to 1) with vertical portal aspect
      vec2 centered = (vUv - 0.5) * 2.0;
      centered.y *= 0.55; // vertical arch proportions

      float dist = length(centered);

      // Swirling polar coordinates
      float angle = atan(centered.y, centered.x);
      
      // Inward pull swirl
      float swirl = angle * 2.0 - uTime * 0.8 + dist * 3.5;
      vec2 swirlUv = vec2(cos(swirl), sin(swirl)) * dist;

      // Multi-layer procedural energy turbulence
      float n1 = snoise(swirlUv * 3.0 + vec2(uTime * 0.3, -uTime * 0.4));
      float n2 = snoise(centered * 6.0 - vec2(-uTime * 0.2, uTime * 0.5));
      float energyFlow = (n1 * 0.6 + n2 * 0.4);

      // Event horizon radial gradient
      float coreMask = smoothstep(0.95, 0.1, dist + energyFlow * 0.12);
      float innerWhite = smoothstep(0.4, 0.02, dist);
      float edgeFade = smoothstep(1.0, 0.72, dist);

      // Color composition
      vec3 color = mix(uColorOuter, uColorCore, coreMask);
      color = mix(color, uColorInner, innerWhite * 0.85);

      // Add animated luminous plasma filaments
      float filaments = pow(abs(energyFlow), 2.2) * 2.0;
      color += uColorCore * filaments * coreMask;

      // Outer portal boundary ring
      float ring = smoothstep(0.85, 0.95, dist) * smoothstep(1.05, 0.95, dist);
      color += uColorCore * ring * 3.0;

      float alpha = (1.0 - edgeFade) * (coreMask + ring * 1.5) * uIntensity;
      alpha = clamp(alpha, 0.0, 1.0);

      gl_FragColor = vec4(color * uIntensity, alpha);
    }
  `
};
