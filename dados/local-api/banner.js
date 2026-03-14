import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MENU_IMAGE = path.join(__dirname, '..', 'midias', 'menu.jpg');

export async function generatePingBanner(speed) {
  const width = 1280;
  const height = 896;

  const safeSpeed = Number.isFinite(speed) ? speed : 0;

  let accentColor, glowColor, statusText, statusIcon;
  if (safeSpeed <= 2) {
    accentColor = '#00ff88';
    glowColor = 'rgba(0,255,136,0.3)';
    statusText = 'EXCELENTE';
    statusIcon = '🟢';
  } else if (safeSpeed <= 5) {
    accentColor = '#f0e040';
    glowColor = 'rgba(240,224,64,0.3)';
    statusText = 'BOM';
    statusIcon = '🟡';
  } else if (safeSpeed <= 8) {
    accentColor = '#ff8800';
    glowColor = 'rgba(255,136,0,0.3)';
    statusText = 'MÉDIO';
    statusIcon = '🟠';
  } else {
    accentColor = '#ff3344';
    glowColor = 'rgba(255,51,68,0.3)';
    statusText = 'RUIM';
    statusIcon = '🔴';
  }

  const barMaxWidth = 520;
  const barFill = Math.min(Math.max((safeSpeed / 10) * barMaxWidth, 20), barMaxWidth);

  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="darkOverlay" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(0,0,0,0.85)"/>
      <stop offset="55%" stop-color="rgba(0,0,0,0.75)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.30)"/>
    </linearGradient>
    <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${accentColor}"/>
      <stop offset="100%" stop-color="${accentColor}" stop-opacity="0.6"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="textShadow">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="rgba(0,0,0,0.8)"/>
    </filter>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#darkOverlay)"/>

  <rect x="40" y="40" width="620" height="${height - 80}" rx="24" ry="24" fill="rgba(0,0,0,0.45)" stroke="rgba(0,255,136,0.15)" stroke-width="1"/>

  <line x1="60" y1="160" x2="640" y2="160" stroke="rgba(0,255,136,0.2)" stroke-width="1"/>

  <text x="80" y="120" fill="${accentColor}" font-size="28" font-family="monospace" font-weight="bold" filter="url(#textShadow)" letter-spacing="6">⚡ PING STATUS</text>

  <text x="80" y="260" fill="#ffffff" font-size="90" font-family="monospace" font-weight="bold" filter="url(#glow)">${safeSpeed.toFixed(3)}</text>
  <text x="${80 + (safeSpeed.toFixed(3).length) * 54}" y="260" fill="rgba(255,255,255,0.4)" font-size="50" font-family="monospace" font-weight="bold">s</text>

  <text x="80" y="320" fill="${accentColor}" font-size="32" font-family="monospace" font-weight="bold" filter="url(#textShadow)">${statusText}</text>

  <text x="80" y="410" fill="rgba(255,255,255,0.5)" font-size="18" font-family="monospace" letter-spacing="2">LATÊNCIA</text>
  <rect x="80" y="430" width="${barMaxWidth}" height="16" rx="8" ry="8" fill="rgba(255,255,255,0.08)"/>
  <rect x="80" y="430" width="${barFill}" height="16" rx="8" ry="8" fill="url(#barGrad)" filter="url(#glow)"/>

  <text x="80" y="510" fill="rgba(255,255,255,0.5)" font-size="18" font-family="monospace" letter-spacing="2">QUALIDADE DO SINAL</text>
  ${generateSignalBars(safeSpeed, 80, 530)}

  <line x1="60" y1="620" x2="640" y2="620" stroke="rgba(0,255,136,0.2)" stroke-width="1"/>

  <text x="80" y="670" fill="rgba(255,255,255,0.35)" font-size="16" font-family="monospace" letter-spacing="1">VELOCIDADE</text>
  <text x="280" y="670" fill="rgba(255,255,255,0.6)" font-size="16" font-family="monospace">${safeSpeed <= 1 ? 'INSTANTÂNEA' : safeSpeed <= 3 ? 'RÁPIDA' : safeSpeed <= 6 ? 'MODERADA' : 'LENTA'}</text>

  <text x="80" y="710" fill="rgba(255,255,255,0.35)" font-size="16" font-family="monospace" letter-spacing="1">SERVIDOR</text>
  <text x="280" y="710" fill="${accentColor}" font-size="16" font-family="monospace">● ONLINE</text>

  <text x="80" y="750" fill="rgba(255,255,255,0.35)" font-size="16" font-family="monospace" letter-spacing="1">PROTOCOLO</text>
  <text x="280" y="750" fill="rgba(255,255,255,0.6)" font-size="16" font-family="monospace">WhatsApp Web v2</text>

  <text x="80" y="${height - 60}" fill="rgba(0,255,136,0.3)" font-size="14" font-family="monospace" letter-spacing="3">TOM BOT • NAZUNA FRAMEWORK</text>

  ${generateMatrixRain(660, 40, width - 700, height - 80)}
</svg>`;

  const baseImage = await sharp(MENU_IMAGE)
    .resize(width, height, { fit: 'cover' })
    .toBuffer();

  const overlayBuffer = Buffer.from(overlay);

  const result = await sharp(baseImage)
    .composite([{ input: overlayBuffer, top: 0, left: 0 }])
    .jpeg({ quality: 90 })
    .toBuffer();

  return result;
}

function generateSignalBars(speed, x, y) {
  const totalBars = 8;
  let activeBars;
  if (speed <= 1) activeBars = 8;
  else if (speed <= 2) activeBars = 7;
  else if (speed <= 3) activeBars = 6;
  else if (speed <= 5) activeBars = 4;
  else if (speed <= 8) activeBars = 2;
  else activeBars = 1;

  let bars = '';
  for (let i = 0; i < totalBars; i++) {
    const barH = 12 + (i * 4);
    const barX = x + (i * 28);
    const barY = y + (44 - barH);
    const isActive = i < activeBars;
    const color = isActive ? (speed <= 2 ? '#00ff88' : speed <= 5 ? '#f0e040' : speed <= 8 ? '#ff8800' : '#ff3344') : 'rgba(255,255,255,0.1)';
    bars += `<rect x="${barX}" y="${barY}" width="18" height="${barH}" rx="4" ry="4" fill="${color}" opacity="${isActive ? 1 : 0.3}"/>`;
  }
  return bars;
}

function generateMatrixRain(x, y, w, h) {
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
  let elements = '';
  const cols = Math.floor(w / 22);
  for (let col = 0; col < cols; col++) {
    const colX = x + (col * 22);
    const numChars = 5 + Math.floor(Math.abs(Math.sin(col * 1.5)) * 15);
    const startY = Math.floor(Math.abs(Math.cos(col * 2.3)) * (h / 2));
    for (let row = 0; row < numChars; row++) {
      const charY = y + startY + (row * 26);
      if (charY > y + h) break;
      const charIdx = Math.floor(Math.abs(Math.sin(col * 3.7 + row * 1.3)) * chars.length) % chars.length;
      const opacity = row === 0 ? 0.8 : Math.max(0.05, 0.4 - (row * 0.025));
      const fill = row === 0 ? '#ffffff' : '#00ff88';
      elements += `<text x="${colX}" y="${charY}" fill="${fill}" opacity="${opacity}" font-size="16" font-family="monospace">${chars[charIdx]}</text>`;
    }
  }
  return elements;
}
