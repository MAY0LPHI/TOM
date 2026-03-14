/**
 * Local API - Gerador de figurinha com texto
 * Substitui: huratera.sirv.com (ttp/attp)
 * Usa: ImageMagick 7 (magick) + ffmpeg + FredokaOne (fonte cartoon)
 * Estilo: Tom & Jerry - texto grande, contorno preto espesso, fundo transparente
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync, mkdirSync, readFileSync, unlinkSync, readdirSync, rmdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMP_DIR = join(__dirname, '../midias/local_ttp_temp');
const FONT_DIR = join(__dirname, '../../.local/share/fonts');
const FONT_PATH = join(FONT_DIR, 'FredokaOne.ttf');
const FONT_NAME = 'Fredoka One';
const MAGICK = 'magick';
const FFMPEG = 'ffmpeg';

if (!existsSync(TEMP_DIR)) mkdirSync(TEMP_DIR, { recursive: true });

const CORES = [
  'ff00ff', 'ff0202', '00ff2e', 'efff00', '00ecff',
  '3100ff', 'ffb400', 'ff00b0', '00ff95', '9d00ff',
  'ff6b00', '00fff7', 'ff00d4', 'a8ff00', 'ff0062',
  '00b3ff', 'd4ff00', 'ff009d'
];

function tmpPath(name) {
  return join(TEMP_DIR, `${Date.now()}_${Math.random().toString(36).slice(2)}_${name}`);
}

function cleanup(...paths) {
  for (const p of paths) {
    try { if (existsSync(p)) unlinkSync(p); } catch {}
  }
}

function getFontSize(text) {
  const len = text.length;
  if (len <= 3)  return 200;
  if (len <= 6)  return 170;
  if (len <= 10) return 140;
  if (len <= 16) return 110;
  if (len <= 24) return 85;
  return 65;
}

async function ensureFont() {
  if (existsSync(FONT_PATH)) return;
  try {
    mkdirSync(FONT_DIR, { recursive: true });
    await execAsync(
      `curl -L "https://github.com/google/fonts/raw/main/ofl/fredokaone/FredokaOne-Regular.ttf" -o "${FONT_PATH}"`,
      { timeout: 30000 }
    );
    await execAsync(`fc-cache -f "${FONT_DIR}" 2>/dev/null || true`, { timeout: 10000 });
  } catch (e) {
    console.warn('[sticker-text] Não foi possível baixar FredokaOne:', e.message);
  }
}

function buildPangoFrame(text, cor, fontSize) {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return `<span font="${FONT_NAME} ${fontSize}" foreground="#${cor}" weight="ultrabold">${escaped}</span>`;
}

async function gerarFrame(text, cor, outPath) {
  const fontSize = getFontSize(text);
  const pango = buildPangoFrame(text, cor, fontSize);
  const cmd = [
    MAGICK,
    `-background none`,
    `-size 512x512`,
    `pango:'${pango}'`,
    `\\( +clone -morphology Dilate Disk:10 +level-colors black,black \\)`,
    `-swap 0,1 -composite`,
    `-gravity Center`,
    `-extent 512x512`,
    outPath
  ].join(' ');
  await execAsync(cmd, { timeout: 20000, shell: '/bin/sh' });
}

/**
 * Gera figurinha estática com texto colorido (ttp)
 * Estilo Tom & Jerry: FredokaOne, contorno preto espesso, fundo transparente
 */
export async function gerarTTP(text, cor = null) {
  await ensureFont();
  const corUsada = cor || CORES[Math.floor(Math.random() * CORES.length)];
  const outPath = tmpPath('ttp.png');

  try {
    await gerarFrame(text, corUsada, outPath);
    const buffer = readFileSync(outPath);
    cleanup(outPath);
    return { ok: true, buffer };
  } catch (err) {
    cleanup(outPath);
    return { ok: false, msg: 'Erro ao gerar ttp: ' + (err.message?.split('\n')[0] || err) };
  }
}

/**
 * Gera figurinha animada com texto colorido (attp)
 * Estilo Tom & Jerry: FredokaOne, contorno preto espesso, cores ciclando, fundo transparente
 */
export async function gerarATTP(text) {
  await ensureFont();

  const sessionId = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const frameDir = join(TEMP_DIR, `frames_${sessionId}`);
  const outputWebp = tmpPath('attp.webp');
  const framePaths = [];

  try {
    mkdirSync(frameDir, { recursive: true });
    const numFrames = 18;

    for (let i = 0; i < numFrames; i++) {
      const cor = CORES[i % CORES.length];
      const framePath = join(frameDir, `frame_${String(i).padStart(3, '0')}.png`);
      framePaths.push(framePath);
      await gerarFrame(text, cor, framePath);
    }

    const webpCmd = `${FFMPEG} -y -framerate 10 -i "${frameDir}/frame_%03d.png" -vcodec libwebp -lossless 0 -compression_level 6 -q:v 50 -loop 0 -preset picture -an -vsync 0 "${outputWebp}"`;
    await execAsync(webpCmd, { timeout: 60000, shell: '/bin/sh' });

    const buffer = readFileSync(outputWebp);
    cleanup(outputWebp);
    framePaths.forEach(f => cleanup(f));
    try { rmdirSync(frameDir); } catch {}

    return { ok: true, buffer };
  } catch (err) {
    cleanup(outputWebp);
    try { framePaths.forEach(f => cleanup(f)); } catch {}
    try { readdirSync(frameDir).forEach(f => cleanup(join(frameDir, f))); rmdirSync(frameDir); } catch {}
    return { ok: false, msg: 'Erro ao gerar attp: ' + (err.message?.split('\n')[0] || err) };
  }
}
