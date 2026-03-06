/**
 * Local API - Gerador de card de citação (estilo WhatsApp)
 * Substitui: cognima-quote.onrender.com/generate
 * Usa: ImageMagick (convert)
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMP_DIR = join(__dirname, '../midias/local_quote_temp');
const CONVERT = 'convert';
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

function escapeText(text) {
  return String(text || '')
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")
    .replace(/`/g, '\\`')
    .replace(/%/g, '%%');
}

function wrapText(text, maxChars = 35) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    if ((current + word).length <= maxChars) {
      current += (current ? ' ' : '') + word;
    } else {
      if (current) lines.push(current);
      current = word.length > maxChars ? word.substring(0, maxChars) : word;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 6).join('\n');
}

/**
 * Gera um card de citação estilo WhatsApp
 * @param {Object} opts
 * @param {string} opts.nome - Nome do usuário
 * @param {string} opts.texto - Mensagem/citação
 * @param {string|null} opts.fotoUrl - URL da foto de perfil (opcional)
 * @returns {Promise<{ok: boolean, image: string}>} image = base64 da imagem PNG
 */
export async function gerarQuoteCard({ nome, texto, fotoUrl = null }) {
  const outPath = tmpPath('quote.png');
  const avatarPath = tmpPath('avatar.png');
  const bubblePath = tmpPath('bubble.png');
  let avatarGerado = false;

  try {
    const nomeEscapado = escapeText((nome || 'Usuário').substring(0, 30));
    const textoFormatado = wrapText(texto || '', 35);
    const textoEscapado = escapeText(textoFormatado);

    if (fotoUrl) {
      try {
        const axios = (await import('axios')).default;
        const resp = await axios.get(fotoUrl, { responseType: 'arraybuffer', timeout: 10000 });
        writeFileSync(avatarPath, resp.data);
        await execAsync(`${CONVERT} "${avatarPath}" -resize 80x80^ -gravity Center -extent 80x80 -alpha off "${avatarPath}"`, { timeout: 10000 });
        avatarGerado = true;
      } catch {}
    }

    if (!avatarGerado) {
      const inicial = (nome || 'U').toUpperCase().charAt(0);
      await execAsync(
        `${CONVERT} -size 80x80 xc:#25d366 -fill white -font DejaVu-Sans-Bold -pointsize 48 -gravity Center -annotate 0 "${inicial}" "${avatarPath}"`,
        { timeout: 10000 }
      );
      avatarGerado = true;
    }

    const numLinhas = textoFormatado.split('\n').length;
    const alturaTexto = Math.max(200, 120 + numLinhas * 40);
    const largura = 512;
    const altura = 768;

    const cmd = [
      CONVERT,
      `-size ${largura}x${altura}`,
      `xc:#0b1418`,
      // Bolha verde (fundo da mensagem)
      `-fill "#1e2d24"`,
      `-draw "roundrectangle 60,${Math.floor(altura / 2) - Math.floor(alturaTexto / 2)},${largura - 20},${Math.floor(altura / 2) + Math.floor(alturaTexto / 2)},18,18"`,
      // Barra lateral verde
      `-fill "#25d366"`,
      `-draw "rectangle 60,${Math.floor(altura / 2) - Math.floor(alturaTexto / 2)},66,${Math.floor(altura / 2) + Math.floor(alturaTexto / 2)}"`,
      // Nome
      `-fill "#25d366"`,
      `-font DejaVu-Sans-Bold`,
      `-pointsize 22`,
      `-gravity None`,
      `-annotate +80+${Math.floor(altura / 2) - Math.floor(alturaTexto / 2) + 35} "${nomeEscapado}"`,
      // Texto
      `-fill "#e9edef"`,
      `-font DejaVu-Sans`,
      `-pointsize 24`,
      `-annotate +80+${Math.floor(altura / 2) - Math.floor(alturaTexto / 2) + 75} "${textoEscapado}"`,
      // Ícone de checkmark lido (azul)
      `-fill "#53bdeb"`,
      `-draw "circle ${largura - 35},${Math.floor(altura / 2) + Math.floor(alturaTexto / 2) - 20} ${largura - 32},${Math.floor(altura / 2) + Math.floor(alturaTexto / 2) - 17}"`,
      outPath
    ].join(' ');

    await execAsync(cmd, { timeout: 15000 });

    if (avatarGerado && existsSync(avatarPath) && existsSync(outPath)) {
      const avatarY = Math.floor(altura / 2) - 40;
      const compositeCmd = `${CONVERT} "${outPath}" "${avatarPath}" -gravity None -geometry +${largura - 100}+${avatarY} -composite "${outPath}"`;
      await execAsync(compositeCmd, { timeout: 10000 }).catch(() => {});
    }

    const buffer = readFileSync(outPath);
    const base64 = buffer.toString('base64');

    cleanup(outPath, avatarPath, bubblePath);
    return { ok: true, image: base64 };
  } catch (err) {
    cleanup(outPath, avatarPath, bubblePath);
    return { ok: false, msg: 'Erro ao gerar quote card: ' + (err.message?.split('\n')[0] || err) };
  }
}

export default { gerarQuoteCard };
