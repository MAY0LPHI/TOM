/**
 * Local API - Downloads via yt-dlp
 * Substitui: nayan-video-downloader, y2mate, savetube, d.ecoe, d.ymcdn
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync, mkdirSync, readFileSync, unlinkSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMP_DIR = join(__dirname, '../midias/local_dl_temp');

const YTDLP = 'yt-dlp';
const TIMEOUT = 120000;

if (!existsSync(TEMP_DIR)) mkdirSync(TEMP_DIR, { recursive: true });

function cleanup(...paths) {
  for (const p of paths) {
    try { if (existsSync(p)) unlinkSync(p); } catch {}
  }
}

const cache = new Map();
const CACHE_TTL = 60 * 60 * 1000;

function getCached(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() - item.ts > CACHE_TTL) { cache.delete(key); return null; }
  return item.val;
}
function setCache(key, val) {
  if (cache.size >= 200) { const k = cache.keys().next().value; cache.delete(k); }
  cache.set(key, { val, ts: Date.now() });
}

/**
 * Baixar vídeo do YouTube (retorna buffer)
 * @param {string} url - URL do YouTube
 * @param {string} format - 'video' ou 'audio'
 * @param {string} quality - '360', '480', '720', '1080' (para video)
 */
export async function ytDownload(url, format = 'video', quality = '720') {
  const cacheKey = `yt:${url}:${format}:${quality}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const prefix = `ytdl_${Date.now()}`;
  const outTemplate = join(TEMP_DIR, `${prefix}_%(id)s.%(ext)s`);

  try {
    let cmd;
    if (format === 'audio') {
      cmd = `"${YTDLP}" -x --audio-format mp3 --audio-quality 0 -o "${outTemplate}" --no-playlist --no-warnings "${url}"`;
    } else {
      cmd = `"${YTDLP}" -f "bestvideo[height<=${quality}][ext=mp4]+bestaudio[ext=m4a]/best[height<=${quality}][ext=mp4]/best[height<=${quality}]/best" --merge-output-format mp4 -o "${outTemplate}" --no-playlist --no-warnings "${url}"`;
    }

    await execAsync(cmd, { timeout: TIMEOUT, maxBuffer: 1024 * 1024 * 10 });

    const files = readdirSync(TEMP_DIR).filter(f => f.startsWith(prefix));
    if (files.length === 0) return { ok: false, msg: 'Arquivo não gerado pelo yt-dlp' };

    const filePath = join(TEMP_DIR, files[0]);
    const buffer = readFileSync(filePath);
    cleanup(filePath);

    const result = { ok: true, buffer, filename: files[0], format };
    setCache(cacheKey, result);
    return result;
  } catch (err) {
    readdirSync(TEMP_DIR).filter(f => f.startsWith(prefix)).forEach(f => cleanup(join(TEMP_DIR, f)));
    return { ok: false, msg: err.message?.split('\n')[0] || 'Erro ao baixar com yt-dlp' };
  }
}

/**
 * Buscar informações de um vídeo do YouTube
 */
export async function ytInfo(url) {
  try {
    const { stdout } = await execAsync(
      `"${YTDLP}" --print "%(title)s|||%(duration)s|||%(thumbnail)s|||%(uploader)s|||%(view_count)s|||%(id)s" --no-playlist --no-warnings "${url}"`,
      { timeout: 30000, maxBuffer: 1024 * 1024 }
    );
    const [title, duration, thumbnail, uploader, views, id] = stdout.trim().split('|||');
    return { ok: true, title, duration: parseInt(duration), thumbnail, uploader, views: parseInt(views), id };
  } catch (err) {
    return { ok: false, msg: err.message?.split('\n')[0] };
  }
}

/**
 * Buscar no YouTube por query
 */
export async function ytSearch(query, limit = 5) {
  try {
    const { stdout } = await execAsync(
      `"${YTDLP}" "ytsearch${limit}:${query}" --print "%(title)s|||%(duration)s|||%(thumbnail)s|||%(uploader)s|||%(id)s" --no-playlist --no-warnings`,
      { timeout: 30000, maxBuffer: 1024 * 1024 }
    );
    const results = stdout.trim().split('\n').filter(Boolean).map(line => {
      const [title, duration, thumbnail, uploader, id] = line.split('|||');
      return { title, duration: parseInt(duration), thumbnail, uploader, id, url: `https://www.youtube.com/watch?v=${id}` };
    });
    return { ok: true, results };
  } catch (err) {
    return { ok: false, msg: err.message?.split('\n')[0] };
  }
}

/**
 * Download genérico (Facebook, Instagram, TikTok, Twitter, Reddit, etc.)
 */
export async function genericDownload(url, audioOnly = false) {
  const cacheKey = `generic:${url}:${audioOnly}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const prefix = `gdl_${Date.now()}`;
  const outTemplate = join(TEMP_DIR, `${prefix}_%(id)s.%(ext)s`);

  try {
    let cmd;
    if (audioOnly) {
      cmd = `"${YTDLP}" -x --audio-format mp3 -o "${outTemplate}" --no-warnings "${url}"`;
    } else {
      cmd = `"${YTDLP}" -f "best[ext=mp4]/best" -o "${outTemplate}" --no-warnings "${url}"`;
    }

    await execAsync(cmd, { timeout: TIMEOUT, maxBuffer: 1024 * 1024 * 10 });

    const files = readdirSync(TEMP_DIR).filter(f => f.startsWith(prefix));
    if (files.length === 0) return { ok: false, msg: 'Arquivo não gerado' };

    const name = files[0];
    const filePath = join(TEMP_DIR, name);
    const buffer = readFileSync(filePath);
    cleanup(filePath);

    const isVideo = name.match(/\.(mp4|mkv|webm|avi|mov)$/i);
    const isAudio = name.match(/\.(mp3|m4a|ogg|flac|opus)$/i);

    const result = {
      ok: true,
      buffer,
      filename: name,
      type: isVideo ? 'video' : isAudio ? 'audio' : 'file',
      mime: isVideo ? 'video/mp4' : isAudio ? 'audio/mpeg' : 'application/octet-stream'
    };

    setCache(cacheKey, result);
    return result;
  } catch (err) {
    readdirSync(TEMP_DIR).filter(f => f.startsWith(prefix)).forEach(f => cleanup(join(TEMP_DIR, f)));
    return { ok: false, msg: err.message?.split('\n')[0] || 'Erro no download' };
  }
}

/**
 * Download do Facebook (substitui nayan-video-downloader /ndown)
 */
export async function facebookDownload(url) {
  const result = await genericDownload(url);
  if (!result.ok) return { ok: false, msg: result.msg };
  return {
    ok: true,
    buffer: result.buffer,
    resolution: 'best',
    thumbnail: null,
    filename: result.filename
  };
}

/**
 * Download do Instagram (substitui nayan-video-downloader /igdown)
 */
export async function instagramDownload(url) {
  const prefix = `ig_${Date.now()}`;
  const outTemplate = join(TEMP_DIR, `${prefix}_%(id)s_%(playlist_index)s.%(ext)s`);
  try {
    await execAsync(
      `"${YTDLP}" -f "best[ext=mp4]/best" -o "${outTemplate}" --no-warnings "${url}"`,
      { timeout: TIMEOUT, maxBuffer: 1024 * 1024 * 10 }
    );

    const downloaded = readdirSync(TEMP_DIR)
      .filter(f => f.startsWith(prefix))
      .map(f => join(TEMP_DIR, f))
      .filter(existsSync);

    if (downloaded.length === 0) return { ok: false, msg: 'Nenhuma mídia encontrada' };

    const results = downloaded.map(f => {
      const buf = readFileSync(f);
      const isVideo = f.match(/\.(mp4|mkv|webm)$/i);
      cleanup(f);
      return {
        type: isVideo ? 'video' : 'image',
        buff: buf,
        url: '',
        mime: isVideo ? 'video/mp4' : 'image/jpeg'
      };
    });

    return { ok: true, criador: 'local', data: results, count: results.length };
  } catch (err) {
    return { ok: false, msg: err.message?.split('\n')[0] };
  }
}

/**
 * Download do SoundCloud (substitui nayan-video-downloader /soundcloud)
 */
export async function soundcloudDownload(url) {
  const prefix = `sc_${Date.now()}`;
  const outTemplate = join(TEMP_DIR, `${prefix}_%(title)s.%(ext)s`);
  try {
    const { stdout: info } = await execAsync(
      `"${YTDLP}" --print "%(title)s|||%(uploader)s|||%(thumbnail)s" --no-warnings "${url}"`,
      { timeout: 30000, maxBuffer: 1024 * 1024 }
    );
    const [title, artist, thumbnail] = info.trim().split('|||');

    await execAsync(
      `"${YTDLP}" -x --audio-format mp3 --audio-quality 0 -o "${outTemplate}" --no-warnings "${url}"`,
      { timeout: TIMEOUT, maxBuffer: 1024 * 1024 * 10 }
    );

    const files = readdirSync(TEMP_DIR).filter(f => f.startsWith(prefix));
    if (files.length === 0) return { ok: false, msg: 'Arquivo não gerado' };

    const filePath = join(TEMP_DIR, files[0]);
    const buffer = readFileSync(filePath);
    cleanup(filePath);

    return { ok: true, buffer, title, artist, thumbnail, filename: `${title}.mp3` };
  } catch (err) {
    return { ok: false, msg: err.message?.split('\n')[0] };
  }
}

/**
 * Buscar no Spotify via yt-dlp (pesquisa no YouTube Music como fallback)
 */
export async function spotifySearch(query, limit = 10) {
  return ytSearch(query + ' site:spotify.com OR music', limit);
}

/**
 * Download de música do Spotify (via YouTube Music como fallback)
 */
export async function spotifyDownload(url) {
  try {
    const { stdout: info } = await execAsync(
      `"${YTDLP}" --print "%(title)s|||%(uploader)s|||%(thumbnail)s|||%(duration)s" --no-warnings "${url}"`,
      { timeout: 30000, maxBuffer: 1024 * 1024 }
    ).catch(() => ({ stdout: '|||||||' }));

    const [title, artist, thumbnail, duration] = info.trim().split('|||');

    const spPrefix = `sp_${Date.now()}`;
    const outTemplate = join(TEMP_DIR, `${spPrefix}_%(title)s.%(ext)s`);
    await execAsync(
      `"${YTDLP}" -x --audio-format mp3 --audio-quality 0 -o "${outTemplate}" --no-warnings "${url}"`,
      { timeout: TIMEOUT, maxBuffer: 1024 * 1024 * 10 }
    );

    const files = readdirSync(TEMP_DIR).filter(f => f.startsWith(spPrefix));
    if (files.length === 0) return { ok: false, msg: 'Arquivo não gerado' };

    const filePath = join(TEMP_DIR, files[0]);
    const buffer = readFileSync(filePath);
    cleanup(filePath);

    return {
      ok: true,
      buffer,
      title: title || 'Música',
      artist: artist || 'Artista',
      thumbnail,
      duration: parseInt(duration) || 0,
      filename: `${title || 'musica'}.mp3`
    };
  } catch (err) {
    return { ok: false, msg: err.message?.split('\n')[0] };
  }
}
