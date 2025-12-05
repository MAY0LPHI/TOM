# 📚 DOCUMENTAÇÃO TÉCNICA - COMO O BOT FUNCIONA

## 🔄 FLUXO DE FUNCIONAMENTO

```
┌─────────────────────────────────────────────────────────────┐
│                    INICIALIZAÇÃO                             │
├─────────────────────────────────────────────────────────────┤
│ 1. npm start                                                 │
│    └─> start.js                                             │
│         └─> connect.js                                       │
│              ├─> Carrega config.json                        │
│              ├─> Inicializa autenticação (QR/Código)        │
│              ├─> Conecta ao WhatsApp via whaileys           │
│              └─> Registra listeners de eventos               │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                 RECEBIMENTO DE MENSAGEM                      │
├─────────────────────────────────────────────────────────────┤
│ WhatsApp API                                                 │
│    └─> Event: 'messages.upsert'                             │
│         └─> MessageQueue.add(mensagem)                       │
│              └─> processMessage(mensagem)                    │
│                   └─> index.js (NazuninhaBotExec)           │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                 PROCESSAMENTO (index.js)                     │
├─────────────────────────────────────────────────────────────┤
│ 1. Extrair informações da mensagem                          │
│    ├─> from (ID do chat)                                    │
│    ├─> sender (quem enviou)                                 │
│    ├─> body (texto da mensagem)                             │
│    └─> type (tipo: texto, imagem, etc.)                     │
│                                                              │
│ 2. Verificar contexto                                        │
│    ├─> isGroup (é grupo?)                                   │
│    ├─> isOwner (é dono?)                                    │
│    ├─> isAdmin (é admin?)                                   │
│    └─> isCmd (é comando?)                                   │
│                                                              │
│ 3. Aplicar filtros                                           │
│    ├─> Anti-spam                                            │
│    ├─> Blacklist                                            │
│    ├─> Modo somente admin                                   │
│    └─> Anti-link, anti-porn, etc.                           │
│                                                              │
│ 4. Executar comando                                          │
│    └─> switch(command) { case 'menu': ... }                 │
└─────────────────────────────────────────────────────────────┘
```

## 📁 ARQUIVOS PRINCIPAIS

### 1. `connect.js` - Conexão com WhatsApp

```javascript
// Principais componentes:

// 1. Importações da biblioteca whaileys
import makeWASocket, { 
  useMultiFileAuthState, 
  DisconnectReason 
} from 'whaileys';

// 2. Classe MessageQueue - Processa mensagens em paralelo
class MessageQueue {
  constructor(maxWorkers, batchSize, messagesPerBatch) {
    this.queue = [];
    this.maxWorkers = maxWorkers;
  }
  
  async add(message, processor) {
    // Adiciona à fila e processa
  }
  
  async processBatch(items) {
    // Processa múltiplas mensagens em paralelo
  }
}

// 3. Função principal de conexão
async function createBotSocket(authDir) {
  // Carrega estado de autenticação
  const { state, saveCreds } = await useMultiFileAuthState(authDir);
  
  // Cria socket do WhatsApp
  const sock = makeWASocket({
    version: [versão do WhatsApp],
    auth: state,
    // ... outras configurações
  });
  
  // Listeners de eventos
  sock.ev.on('connection.update', handleConnection);
  sock.ev.on('messages.upsert', handleMessages);
  sock.ev.on('group-participants.update', handleGroupUpdate);
  
  return sock;
}
```

### 2. `index.js` - Processador Principal

```javascript
// Estrutura principal:

async function NazuninhaBotExec(nazu, info, store, messagesCache) {
  // 1. EXTRAÇÃO DE DADOS
  const from = info.key.remoteJid;           // ID do chat
  const sender = info.key.participant;        // Quem enviou
  const body = getMessageText(info.message);  // Texto
  const isGroup = from.endsWith('@g.us');     // É grupo?
  
  // 2. VERIFICAÇÕES DE PERMISSÃO
  const isOwner = sender === ownerJid;
  const isAdmin = groupAdmins.includes(sender);
  const isCmd = body.startsWith(prefix);
  
  // 3. CARREGAMENTO DE DADOS DO GRUPO
  const groupData = loadJsonFile(groupFile);
  
  // 4. FILTROS E PROTEÇÕES
  if (isAntiLink && hasLink) { /* remove */ }
  if (isSpam) { /* bloqueia */ }
  
  // 5. PROCESSAMENTO DE COMANDOS
  const command = body.slice(prefix.length).split(' ')[0];
  const args = body.slice(prefix.length).split(' ').slice(1);
  
  switch(command) {
    case 'menu':
      await reply(menuText);
      break;
    case 'ban':
      await banUser();
      break;
    // ... centenas de comandos
  }
}
```

### 3. `database.js` - Gerenciamento de Dados

```javascript
// Funções principais:

// Carregar arquivo JSON com validação
function loadJsonFile(path, defaultValue = {}) {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  } catch {
    return defaultValue;
  }
}

// Salvar com escrita atômica (evita corrupção)
function saveJsonFile(path, data) {
  const tempPath = path + '.tmp';
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2));
  fs.renameSync(tempPath, path);
}

// Sistema de economia
function getEcoUser(userId) {
  const economy = loadJsonFile(ECONOMY_FILE);
  return economy[userId] || { coins: 0, bank: 0, level: 1 };
}

// Sistema de níveis
function addXP(userId, amount) {
  const leveling = loadJsonFile(LEVELING_FILE);
  leveling[userId].xp += amount;
  // Verifica level up
  saveJsonFile(LEVELING_FILE, leveling);
}
```

### 4. `helpers.js` - Funções Utilitárias

```javascript
// Normalizar texto (remover acentos)
function normalizar(texto) {
  return texto.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

// Validar ID do WhatsApp
function isValidJid(str) {
  return /^\d+@s\.whatsapp\.net$/.test(str);
}

// Construir ID do usuário
function buildUserId(numero, config) {
  return `${numero}@s.whatsapp.net`;
}

// Formatar tempo
function formatUptime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
}
```

## 🎨 SISTEMA DE MENUS

Os menus são funções que retornam strings formatadas:

```javascript
// menus/menu.js
export const menu = (prefix, nomebot, pushname) => `
╭━━━「 🤖 *${nomebot}* 🤖 」━━━╮
│
│ 👋 Olá, *${pushname}*!
│
│ ⚡ *Prefixo:* ${prefix}
│
├───「 📋 *COMANDOS* 」───
│
│ ${prefix}menu - Este menu
│ ${prefix}menuadm - Menu admin
│ ${prefix}menudown - Downloads
│
╰━━━━━━━━━━━━━━━━━━━━━━╯
`;
```

## 🔐 SISTEMA DE PERMISSÕES

```
┌─────────────────────────────────────────────────────────────┐
│                    HIERARQUIA DE PERMISSÕES                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  👑 DONO (isOwner)                                          │
│  │   └─> Acesso total a todos os comandos                   │
│  │                                                          │
│  ├─> 🛡️ SUBDONO (isSubOwner)                               │
│  │   └─> Acesso a maioria dos comandos do dono              │
│  │                                                          │
│  ├─> ⭐ PREMIUM (isPremium)                                 │
│  │   └─> Recursos extras, sem limites                       │
│  │                                                          │
│  ├─> 👤 ADMIN DO GRUPO (isGroupAdmin)                       │
│  │   └─> Comandos de administração do grupo                 │
│  │                                                          │
│  ├─> 🛠️ MODERADOR (isModerator)                            │
│  │   └─> Comandos específicos permitidos                    │
│  │                                                          │
│  └─> 👥 MEMBRO                                              │
│      └─> Comandos públicos apenas                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 📊 ESTRUTURA DE DADOS

### config.json
```json
{
  "prefixo": "/",
  "nomebot": "nazuna",
  "nomedono": "Hiudy",
  "numerodono": "5533999285117",
  "apikey": "sua-api-key",
  "lidowner": "id-do-dono@lid",
  "debug": false
}
```

### Arquivo de Grupo (grupos/id@g.us.json)
```json
{
  "groupName": "Nome do Grupo",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "bemvindo": true,
  "textbv": "Bem-vindo ao grupo!",
  "soadm": false,
  "antilink": true,
  "antilinkgp": false,
  "antiporn": false,
  "antidel": false,
  "modobrincadeira": true,
  "blacklist": {},
  "moderators": [],
  "allowedModCommands": [],
  "mutedUsers": {},
  "rules": [],
  "customPrefix": null,
  "blockedCommands": {}
}
```

### economy.json
```json
{
  "user@lid": {
    "coins": 1000,
    "bank": 5000,
    "level": 5,
    "xp": 2500,
    "lastDaily": 1704067200000,
    "inventory": {}
  }
}
```

## 🔌 EVENTOS DO WHATSAPP

```javascript
// Eventos principais que o bot escuta:

// 1. Atualização de conexão
sock.ev.on('connection.update', (update) => {
  const { connection, lastDisconnect, qr } = update;
  
  if (qr) {
    // Mostrar QR Code para autenticação
  }
  
  if (connection === 'open') {
    // Bot conectado!
  }
  
  if (connection === 'close') {
    // Tentar reconectar
  }
});

// 2. Novas mensagens
sock.ev.on('messages.upsert', (m) => {
  for (const msg of m.messages) {
    if (m.type === 'notify') {
      processMessage(msg);
    }
  }
});

// 3. Atualizações de participantes
sock.ev.on('group-participants.update', (update) => {
  // update.action: 'add', 'remove', 'promote', 'demote'
  // Enviar mensagem de boas-vindas/saída
});

// 4. Atualização de credenciais
sock.ev.on('creds.update', saveCreds);
```

## 🛡️ SISTEMA DE PROTEÇÕES

```javascript
// Anti-Spam
if (antiSpam.enabled) {
  const now = Date.now();
  const userSpam = antiSpam.users[sender] || { count: 0, lastMsg: 0 };
  
  if (now - userSpam.lastMsg < intervalMs) {
    userSpam.count++;
    if (userSpam.count >= limit) {
      // Bloquear usuário temporariamente
    }
  }
}

// Anti-Link
if (antiLink && hasLink(body)) {
  await sock.sendMessage(from, { delete: info.key });
  if (isBotAdmin) {
    await sock.groupParticipantsUpdate(from, [sender], 'remove');
  }
}

// Anti-Flood
if (antiFlood.enabled) {
  // Similar ao anti-spam, mas para mensagens rápidas demais
}
```

## 📤 ENVIANDO MENSAGENS

```javascript
// Texto simples
await sock.sendMessage(from, { text: 'Olá!' });

// Com menções
await sock.sendMessage(from, { 
  text: 'Olá @usuario!',
  mentions: ['usuario@s.whatsapp.net']
});

// Imagem
await sock.sendMessage(from, {
  image: { url: 'https://...' },
  caption: 'Legenda'
});

// Vídeo
await sock.sendMessage(from, {
  video: { url: 'https://...' },
  caption: 'Legenda'
});

// Sticker
await sock.sendMessage(from, {
  sticker: buffer
});

// Áudio
await sock.sendMessage(from, {
  audio: { url: 'https://...' },
  ptt: true // voice note
});

// Documento
await sock.sendMessage(from, {
  document: buffer,
  fileName: 'arquivo.pdf',
  mimetype: 'application/pdf'
});

// Reação
await sock.sendMessage(from, {
  react: { text: '👍', key: info.key }
});
```

## 🔧 ADICIONANDO NOVOS COMANDOS

Para adicionar um novo comando:

1. Abra `index.js`
2. Encontre o `switch(command)`
3. Adicione um novo `case`:

```javascript
case 'meucomando':
case 'aliasdomeucomando':
  try {
    // Verificar permissões se necessário
    if (!isOwner) return reply('Apenas o dono!');
    
    // Verificar argumentos
    if (!args[0]) return reply('Uso: /meucomando <argumento>');
    
    // Lógica do comando
    const resultado = await minhaFuncao(args[0]);
    
    // Responder
    await reply(resultado);
  } catch (e) {
    console.error('Erro em meucomando:', e);
    await reply('Ocorreu um erro!');
  }
  break;
```

---

*Documentação criada para auxiliar no entendimento e recriação do bot nazuna.*
