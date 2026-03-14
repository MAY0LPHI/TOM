import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SRC_DIR = path.join(__dirname, '..');
const ROOT_DIR = path.join(SRC_DIR, '..');

// Detecta se é sub-bot e ajusta os caminhos de database
const BASE_DATABASE_DIR = process.env.DATABASE_PATH || path.join(ROOT_DIR, 'database');
const DATABASE_DIR = BASE_DATABASE_DIR;
const GRUPOS_DIR = path.join(DATABASE_DIR, 'grupos');
const USERS_DIR = path.join(DATABASE_DIR, 'users');
const DONO_DIR = path.join(DATABASE_DIR, 'dono');
const PARCERIAS_DIR = path.join(DATABASE_DIR, 'parcerias');
const TMP_DIR = path.join(DATABASE_DIR, 'tmp');

const LEVELING_FILE = path.join(DATABASE_DIR, 'leveling.json');
const CUSTOM_AUTORESPONSES_FILE = path.join(DATABASE_DIR, 'customAutoResponses.json');
const DIVULGACAO_FILE = path.join(DONO_DIR, 'divulgacao.json');
const DONO_DIVULGACAO_FILE = path.join(DONO_DIR, 'divulgacao_dono.json');
const NO_PREFIX_COMMANDS_FILE = path.join(DATABASE_DIR, 'noPrefixCommands.json');
const COMMAND_ALIASES_FILE = path.join(DATABASE_DIR, 'commandAliases.json');
const GLOBAL_BLACKLIST_FILE = path.join(DONO_DIR, 'globalBlacklist.json');
const MENU_DESIGN_FILE = path.join(DONO_DIR, 'menuDesign.json');
const ECONOMY_FILE = path.join(DATABASE_DIR, 'economy.json');
const MSGPREFIX_FILE = path.join(DONO_DIR, 'msgprefix.json');
const MSGBOTON_FILE = path.join(DONO_DIR, 'msgboton.json');
const CUSTOM_REACTS_FILE = path.join(DATABASE_DIR, 'customReacts.json');
const REMINDERS_FILE = path.join(DATABASE_DIR, 'reminders.json');
const CMD_NOT_FOUND_FILE = path.join(DONO_DIR, 'cmdNotFound.json');
const CUSTOM_COMMANDS_FILE = path.join(DONO_DIR, 'customCommands.json');
const ANTIFLOOD_FILE = path.join(DATABASE_DIR, 'antiflood.json');
const ANTIPV_FILE = path.join(DATABASE_DIR, 'antipv.json');
const GLOBAL_BLOCKS_FILE = path.join(DATABASE_DIR, 'globalBlocks.json');
const CMD_LIMIT_FILE = path.join(DATABASE_DIR, 'cmdlimit.json');
const CMD_USER_LIMITS_FILE = path.join(DATABASE_DIR, 'cmduserlimits.json');
const ANTISPAM_FILE = path.join(DATABASE_DIR, 'antispam.json');
const BOT_STATE_FILE = path.join(DATABASE_DIR, 'botState.json');
const AUTO_HORARIOS_FILE = path.join(DATABASE_DIR, 'autohorarios.json');
const AUTO_MENSAGENS_FILE = path.join(DATABASE_DIR, 'automensagens.json');
const MODO_LITE_FILE = path.join(DATABASE_DIR, 'modolite.json');
const JID_LID_CACHE_FILE = path.join(DATABASE_DIR, 'jid_lid_cache.json');
const SUBDONOS_FILE = path.join(DONO_DIR, 'subdonos.json');
const ALUGUEIS_FILE = path.join(DONO_DIR, 'alugueis.json');
const CODIGOS_ALUGUEL_FILE = path.join(DONO_DIR, 'codigos_aluguel.json');
const RELATIONSHIPS_FILE = path.join(DATABASE_DIR, 'relationships.json');
const MASS_MENTION_LIMIT_FILE = path.join(DATABASE_DIR, 'massMentionLimit.json');
const MASS_MENTION_CONFIG_FILE = path.join(DONO_DIR, 'massMentionConfig.json');
const GROUP_CUSTOMIZATION_FILE = path.join(DONO_DIR, 'groupCustomization.json');
const MENU_AUDIO_FILE = path.join(DONO_DIR, 'menuAudio.json');
const MENU_LERMAIS_FILE = path.join(DONO_DIR, 'menuLerMais.json');
const SUPPORT_TICKETS_FILE = path.join(DATABASE_DIR, 'supportTickets.json');

// Detecta se é sub-bot e ajusta o caminho do config
const CONFIG_FILE = process.env.CONFIG_PATH || path.join(SRC_DIR, 'config.json');

// Diretório compartilhado entre TODOS os bots (principal + sub-bots)
// Usado para configurações globais do dono (blacklist, bloqueios, etc.)
const SHARED_DIR            = path.join(ROOT_DIR, 'database', 'shared');
const SHARED_BLACKLIST_FILE = path.join(SHARED_DIR, 'globalBlacklist.json');
const SHARED_BLOCKS_FILE    = path.join(SHARED_DIR, 'globalBlocks.json');
const SHARED_OWNERS_FILE    = path.join(SHARED_DIR, 'globalOwners.json');

const PACKAGE_JSON_PATH = path.join(ROOT_DIR, '..', 'package.json');

export function getEffectivePaths(subBotConfigPath = null) {
  if (!subBotConfigPath) return null;

  const dbDir = path.dirname(subBotConfigPath);
  const donoDir = path.join(dbDir, 'dono');

  return new Map([
    [DATABASE_DIR,              dbDir],
    [GRUPOS_DIR,                path.join(dbDir, 'grupos')],
    [USERS_DIR,                 path.join(dbDir, 'users')],
    [DONO_DIR,                  donoDir],
    [PARCERIAS_DIR,             path.join(dbDir, 'parcerias')],
    [TMP_DIR,                   path.join(dbDir, 'tmp')],
    [LEVELING_FILE,             path.join(dbDir, 'leveling.json')],
    [CUSTOM_AUTORESPONSES_FILE, path.join(dbDir, 'customAutoResponses.json')],
    [DIVULGACAO_FILE,           path.join(donoDir, 'divulgacao.json')],
    [DONO_DIVULGACAO_FILE,      path.join(donoDir, 'divulgacao_dono.json')],
    [NO_PREFIX_COMMANDS_FILE,   path.join(dbDir, 'noPrefixCommands.json')],
    [COMMAND_ALIASES_FILE,      path.join(dbDir, 'commandAliases.json')],
    [GLOBAL_BLACKLIST_FILE,     path.join(donoDir, 'globalBlacklist.json')],
    [MENU_DESIGN_FILE,          path.join(donoDir, 'menuDesign.json')],
    [ECONOMY_FILE,              path.join(dbDir, 'economy.json')],
    [MSGPREFIX_FILE,            path.join(donoDir, 'msgprefix.json')],
    [MSGBOTON_FILE,             path.join(donoDir, 'msgboton.json')],
    [CUSTOM_REACTS_FILE,        path.join(dbDir, 'customReacts.json')],
    [REMINDERS_FILE,            path.join(dbDir, 'reminders.json')],
    [CMD_NOT_FOUND_FILE,        path.join(donoDir, 'cmdNotFound.json')],
    [CUSTOM_COMMANDS_FILE,      path.join(donoDir, 'customCommands.json')],
    [ANTIFLOOD_FILE,            path.join(dbDir, 'antiflood.json')],
    [ANTIPV_FILE,               path.join(dbDir, 'antipv.json')],
    [GLOBAL_BLOCKS_FILE,        path.join(dbDir, 'globalBlocks.json')],
    [CMD_LIMIT_FILE,            path.join(dbDir, 'cmdlimit.json')],
    [CMD_USER_LIMITS_FILE,      path.join(dbDir, 'cmduserlimits.json')],
    [ANTISPAM_FILE,             path.join(dbDir, 'antispam.json')],
    [BOT_STATE_FILE,            path.join(dbDir, 'botState.json')],
    [AUTO_HORARIOS_FILE,        path.join(dbDir, 'autohorarios.json')],
    [AUTO_MENSAGENS_FILE,       path.join(dbDir, 'automensagens.json')],
    [MODO_LITE_FILE,            path.join(dbDir, 'modolite.json')],
    [SUBDONOS_FILE,             path.join(donoDir, 'subdonos.json')],
    [ALUGUEIS_FILE,             path.join(donoDir, 'alugueis.json')],
    [CODIGOS_ALUGUEL_FILE,      path.join(donoDir, 'codigos_aluguel.json')],
    [RELATIONSHIPS_FILE,        path.join(dbDir, 'relationships.json')],
    [MASS_MENTION_LIMIT_FILE,   path.join(dbDir, 'massMentionLimit.json')],
    [MASS_MENTION_CONFIG_FILE,  path.join(donoDir, 'massMentionConfig.json')],
    [GROUP_CUSTOMIZATION_FILE,  path.join(donoDir, 'groupCustomization.json')],
    [MENU_AUDIO_FILE,           path.join(donoDir, 'menuAudio.json')],
    [MENU_LERMAIS_FILE,         path.join(donoDir, 'menuLerMais.json')],
    [SUPPORT_TICKETS_FILE,      path.join(dbDir, 'supportTickets.json')],
    [CONFIG_FILE,               subBotConfigPath],
  ]);
}

export {
  ROOT_DIR, 
  SRC_DIR,
  DATABASE_DIR,
  GRUPOS_DIR,
  USERS_DIR,
  DONO_DIR,
  PARCERIAS_DIR,
  TMP_DIR,
  LEVELING_FILE,
  CUSTOM_AUTORESPONSES_FILE,
  DIVULGACAO_FILE,
  DONO_DIVULGACAO_FILE,
  NO_PREFIX_COMMANDS_FILE,
  COMMAND_ALIASES_FILE,
  GLOBAL_BLACKLIST_FILE,
  MENU_DESIGN_FILE,
  ECONOMY_FILE,
  MSGPREFIX_FILE,
  MSGBOTON_FILE,
  CUSTOM_REACTS_FILE,
  REMINDERS_FILE,
  CMD_NOT_FOUND_FILE,
  CUSTOM_COMMANDS_FILE,
  ANTIFLOOD_FILE,
  ANTIPV_FILE,
  GLOBAL_BLOCKS_FILE,
  CMD_LIMIT_FILE,
  CMD_USER_LIMITS_FILE,
  ANTISPAM_FILE,
  BOT_STATE_FILE,
  AUTO_HORARIOS_FILE,
  AUTO_MENSAGENS_FILE,
  MODO_LITE_FILE,
  JID_LID_CACHE_FILE,
  SUBDONOS_FILE,
  ALUGUEIS_FILE,
  CODIGOS_ALUGUEL_FILE,
  RELATIONSHIPS_FILE,
  MASS_MENTION_LIMIT_FILE,
  MASS_MENTION_CONFIG_FILE,
  GROUP_CUSTOMIZATION_FILE,
  MENU_AUDIO_FILE,
  MENU_LERMAIS_FILE,
  SUPPORT_TICKETS_FILE,
  CONFIG_FILE,
  SHARED_DIR,
  SHARED_BLACKLIST_FILE,
  SHARED_BLOCKS_FILE,
  SHARED_OWNERS_FILE,
  PACKAGE_JSON_PATH
};
