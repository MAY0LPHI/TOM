import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const SUBBOTS_DIR = path.join(__dirname, '..', '..', 'database', 'subbots');
const MAX_LINES   = 3000;

function getLogFile(botId) {
  return path.join(SUBBOTS_DIR, botId, 'bot.log');
}

function timestamp() {
  return new Date().toLocaleString('pt-BR', { hour12: false });
}

function writeLog(botId, level, message) {
  try {
    const logFile = getLogFile(botId);
    const dir     = path.dirname(logFile);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const line = `[${timestamp()}] [${level}] ${message}\n`;
    fs.appendFileSync(logFile, line);

    rotateIfNeeded(logFile);
  } catch {}
}

function rotateIfNeeded(logFile) {
  try {
    const content = fs.readFileSync(logFile, 'utf8');
    const lines   = content.split('\n');
    if (lines.length > MAX_LINES + 200) {
      fs.writeFileSync(logFile, lines.slice(-MAX_LINES).join('\n') + '\n');
    }
  } catch {}
}

const loggers = {};

export function getSubBotLogger(botId) {
  if (loggers[botId]) return loggers[botId];

  const logger = {
    info:  (msg) => { console.log(`[${botId}] ${msg}`); writeLog(botId, 'INFO',  msg); },
    warn:  (msg) => { console.warn(`[${botId}] ⚠️ ${msg}`); writeLog(botId, 'WARN',  msg); },
    error: (msg) => { console.error(`[${botId}] ❌ ${msg}`); writeLog(botId, 'ERROR', msg); },
    event: (msg) => { writeLog(botId, 'EVENT', msg); },
  };

  loggers[botId] = logger;
  return logger;
}

export function logSubBotEvent(botId, event, detail = '') {
  writeLog(botId, 'EVENT', `${event}${detail ? ': ' + detail : ''}`);
}

export function clearSubBotLog(botId) {
  try { fs.writeFileSync(getLogFile(botId), ''); } catch {}
}
