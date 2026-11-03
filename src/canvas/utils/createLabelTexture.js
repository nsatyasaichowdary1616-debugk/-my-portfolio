import * as THREE from 'three';

/**
 * Creates an offline CanvasTexture with crisp text and optional glowing border.
 * 100% synchronous, 0 network requests, 0 chance of 404 or Suspense deadlock.
 */
export function createLabelTexture(text, {
  fontSize = 36,
  textColor = '#ffffff',
  bgColor = 'rgba(5, 12, 28, 0.85)',
  borderColor = '#00f0ff',
  subText = null,
  subColor = '#94a3b8',
  width = 512,
  height = 256
} = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.Texture();

  // Clear background
  ctx.clearRect(0, 0, width, height);

  // Rounded panel background
  const r = 24;
  ctx.fillStyle = bgColor;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(width - r, 0);
  ctx.quadraticCurveTo(width, 0, width, r);
  ctx.lineTo(width, height - r);
  ctx.quadraticCurveTo(width, height, width - r, height);
  ctx.lineTo(r, height);
  ctx.quadraticCurveTo(0, height, 0, height - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.fill();

  // Glowing border
  if (borderColor) {
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 4;
    ctx.stroke();
  }

  // Draw main text
  ctx.fillStyle = textColor;
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = subText ? 'bottom' : 'middle';
  const textY = subText ? height * 0.52 : height * 0.5;
  ctx.fillText(text, width / 2, textY);

  // Draw optional subtitle
  if (subText) {
    ctx.fillStyle = subColor;
    ctx.font = `${Math.floor(fontSize * 0.5)}px monospace`;
    ctx.fillText(subText, width / 2, height * 0.78);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
