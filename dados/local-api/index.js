/**
 * dados/local-api/index.js
 * Ponto central das APIs locais que substituem serviços externos
 *
 * APIs substituídas:
 *   nayan-video-downloader.vercel.app  →  downloads.js (yt-dlp)
 *   media.savetube.me                  →  downloads.js (yt-dlp)
 *   y2mate.nu                          →  downloads.js (yt-dlp)
 *   d.ecoe.cc / d.ymcdn.org            →  downloads.js (yt-dlp)
 *   huratera.sirv.com (ttp/attp)       →  sticker-text.js (ImageMagick + ffmpeg)
 *   cognima-quote.onrender.com         →  quotes.js (ImageMagick)
 *   nsfw-demo.sashido.io               →  nsfw.js (mock local)
 */

export * from './downloads.js';
export * from './sticker-text.js';
export * from './quotes.js';
export * from './nsfw.js';
