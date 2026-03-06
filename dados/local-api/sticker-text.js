/**
 * Local API - Gerador de figurinha com texto
 * Substitui: huratera.sirv.com (ttp/attp)
 * Usa: ImageMagick 7 (magick) + ffmpeg
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync, mkdirSync, readFileSync, unlinkSync, readdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMP_DIR = join(__dirname, '../midias/local_ttp_temp');
const MAGICK = 'magick';
const FFMPEG = 'ffmpeg';

if (!existsSync(TEMP_DIR)) mkdirSync(TEMP_DIR, { recursive: true });

function tmpPath(name) {
  return join(TEMP_DIR, `${Date.now()}_${Math.random().toString(36).slice(2)}_${name}`);
}

function cleanup(...paths) {
  for (const p of paths) {
    try { if (existsSync(p)) unlinkSync(p); } catch {}
  }
}

const CORES = [
  'ff00ff', 'ff0000', '00ff00', 'ffff00', '00ffff',
  '8800ff', 'ff8800', 'ff00aa', '00ffaa', 'ff6600',
  '00aaff', 'ddff00', 'ff0055', 'aeff00', '0088ff',
  'd4ff00', 'ff009d', '9d00ff'
];

const FONTES = [
  'DejaVu-Sans-Bold',
  'DejaVu-Serif-Bold',
  'DejaVu-Sans-Mono-Bold',
  'DejaVu-Sans',
  'DejaVu-Serif',
  'DejaVu-Sans-Mono'
];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Gera figurinha estática com texto colorido (ttp)
 * @param {string} text - Texto para a figurinha
 * @param {string} cor - Cor em hex (sem #), ou null para aleatório
 * @param {string} fonte - Nome da fonte, ou null para aleatório
 */
export async function gerarTTP(text, cor = null, fonte = null) {
  const corUsada = cor || randomFrom(CORES);
  const fonteUsada = fonte || randomFrom(FONTES);
  const outPath = tmpPath('ttp.png');
  const txtPath = tmpPath('ttp.txt');

  try {
    writeFileSync(txtPath, text, 'utf8');

    const cmd = [
      MAGICK,
      `-background none`,
      `-fill '#${corUsada}'`,
      `-stroke '#000000'`,
      `-strokewidth 2`,
      `-font '${fonteUsada}'`,
      `-pointsize 72`,
      `-size 512x512`,
      `-gravity Center`,
      `caption:@${txtPath}`,
      outPath
    ].join(' ');

    await execAsync(cmd, { timeout: 15000 });
    const buffer = readFileSync(outPath);
    cleanup(outPath, txtPath);
    return { ok: true, buffer };
  } catch (err) {
    cleanup(outPath, txtPath);
    return { ok: false, msg: 'Erro ao gerar sticker: ' + (err.message?.split('\n')[0] || err) };
  }
}

/**
 * Gera figurinha animada com texto colorido (attp)
 * Cria múltiplos frames com cores diferentes e junta em webp animado
 * @param {string} text - Texto para a figurinha
 */
export async function gerarATTP(text) {
  const sessionId = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const frameDir = join(TEMP_DIR, `frames_${sessionId}`);
  const outputWebp = tmpPath('attp.webp');
  const txtPath = tmpPath('attp.txt');
  const framePaths = [];

  try {
    mkdirSync(frameDir, { recursive: true });
    writeFileSync(txtPath, text, 'utf8');

    const fonte = randomFrom(FONTES);
    const numFrames = 18;

    for (let i = 0; i < numFrames; i++) {
      const cor = CORES[i % CORES.length];
      const framePath = join(frameDir, `frame_${String(i).padStart(3, '0')}.png`);
      framePaths.push(framePath);

      const cmd = [
        MAGICK,
        `-background none`,
        `-fill '#${cor}'`,
        `-stroke '#000000'`,
        `-strokewidth 2`,
        `-font '${fonte}'`,
        `-pointsize 72`,
        `-size 512x512`,
        `-gravity Center`,
        `caption:@${txtPath}`,
        framePath
      ].join(' ');

      await execAsync(cmd, { timeout: 10000 });
    }

    cleanup(txtPath);

    const webpCmd = `${FFMPEG} -y -framerate 10 -i "${frameDir}/frame_%03d.png" -vcodec libwebp -lossless 0 -compression_level 6 -q:v 50 -loop 0 -preset picture -an -vsync 0 "${outputWebp}"`;
    await execAsync(webpCmd, { timeout: 60000 });

    const buffer = readFileSync(outputWebp);

    cleanup(outputWebp);
    framePaths.forEach(f => cleanup(f));
    try {
      const { rmdirSync } = await import('fs');
      rmdirSync(frameDir);
    } catch {}

    return { ok: true, buffer };
  } catch (err) {
    cleanup(outputWebp, txtPath);
    try { framePaths.forEach(f => cleanup(f)); } catch {}
    try { readdirSync(frameDir).forEach(f => cleanup(join(frameDir, f))); } catch {}
    return { ok: false, msg: 'Erro ao gerar attp: ' + (err.message?.split('\n')[0] || err) };
  }
}
