# 🤖 PROMPT PARA RECRIAR O BOT COM QUALQUER TEMÁTICA

## 📋 COMO USAR ESTE PROMPT

Copie todo o conteúdo abaixo e cole em uma IA de código (como Claude, ChatGPT, Copilot, etc), substituindo `[SUA TEMÁTICA]` pela temática desejada.

---

## 🎯 PROMPT COMPLETO

```
Crie um bot de WhatsApp completo em Node.js com a temática [SUA TEMÁTICA]. 

## ESTRUTURA DO PROJETO

O bot deve seguir esta estrutura de pastas:

```
[nome-do-bot]/
├── package.json
├── README.md
├── dados/
│   ├── database/           # Dados persistentes (JSON)
│   │   ├── grupos/         # Configurações por grupo
│   │   ├── dono/           # Configurações do dono
│   │   └── *.json          # Arquivos de configuração
│   ├── midias/             # Imagens e mídias do bot
│   │   └── menu.jpg        # Banner do menu
│   └── src/
│       ├── .scripts/       # Scripts auxiliares
│       │   ├── config.js   # Configuração inicial
│       │   ├── start.js    # Script de inicialização
│       │   └── update.js   # Script de atualização
│       ├── funcs/          # Funções/comandos do bot
│       │   ├── downloads/  # Comandos de download
│       │   ├── private/    # Funções privadas/IA
│       │   ├── utils/      # Utilitários
│       │   └── exports.js  # Exportador de módulos
│       ├── menus/          # Menus temáticos
│       │   ├── index.js    # Exportador de menus
│       │   ├── menu.js     # Menu principal
│       │   ├── menuadm.js  # Menu de administração
│       │   └── *.js        # Outros menus
│       ├── utils/          # Utilitários principais
│       │   ├── database.js # Gestão de banco de dados
│       │   ├── helpers.js  # Funções auxiliares
│       │   └── paths.js    # Caminhos constantes
│       ├── config.json     # Configuração do bot
│       ├── connect.js      # Conexão com WhatsApp
│       └── index.js        # Processador principal de mensagens
```

## TECNOLOGIAS E DEPENDÊNCIAS

```json
{
  "type": "module",
  "dependencies": {
    "@hapi/boom": "^10.0.1",
    "axios": "^1.13.2",
    "fluent-ffmpeg": "^2.1.3",
    "linkedom": "^0.18.12",
    "node-cache": "^5.1.2",
    "node-cron": "^4.2.1",
    "node-webpmux": "^3.2.1",
    "pino": "^10.1.0",
    "qrcode-terminal": "^0.12.0",
    "whaileys": "^6.4.3"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

## FUNCIONALIDADES OBRIGATÓRIAS

### 1. CONEXÃO COM WHATSAPP (connect.js)
- Autenticação via QR Code ou código de pareamento
- Reconexão automática com backoff exponencial
- Sistema de fila de mensagens para processamento paralelo
- Cache de mensagens para anti-delete
- Gerenciamento de sessão persistente

### 2. PROCESSADOR DE MENSAGENS (index.js)
O arquivo principal deve:
- Detectar se é grupo ou privado
- Identificar o remetente (LID/JID)
- Verificar permissões (dono, subdono, admin, membro)
- Processar comandos com prefixo configurável
- Suportar aliases de comandos
- Sistema de cooldown/anti-spam
- Modo lite para economia de recursos

### 3. SISTEMA DE MENUS TEMÁTICOS
Todos os menus devem seguir a temática [SUA TEMÁTICA]:

```javascript
// Exemplo de menu temático
export const menu = (prefix, nomebot, pushname) => `
╭━━━「 ${emoji} *${nomebot}* ${emoji} 」━━━╮
│
│ 👋 Olá, *${pushname}*!
│
│ ⚡ *Prefixo:* ${prefix}
│
├───「 📋 *CATEGORIAS* 」───
│
│ ${prefix}menu1
│ ${prefix}menu2
│ ...
│
╰━━━━━━━━━━━━━━━━━━━━━╯
`;
```

### 4. COMANDOS POR CATEGORIA

#### 📥 DOWNLOADS
- TikTok, Instagram, YouTube, Pinterest
- Música/áudio de vídeos
- Auto-download quando detectar links

#### 🛡️ ADMINISTRAÇÃO DE GRUPOS
- ban, kick, add (gerenciar membros)
- promote, demote (gerenciar admins)
- mute, unmute (silenciar usuários)
- antilink, antispam, antiporn
- welcome/exit (mensagens de entrada/saída)
- Blacklist global e por grupo
- Moderadores (admins virtuais)

#### 🎮 ENTRETENIMENTO
- Jogos: velha, forca, quiz
- Rankings aleatórios temáticos
- Roletas e sorteios
- Modo brincadeira (jogos adultos opcionais)

#### 🔧 FERRAMENTAS
- Stickers (criar, converter)
- Busca de imagens/gifs
- Tradução
- Encurtador de links
- Upload de arquivos

#### 🤖 INTELIGÊNCIA ARTIFICIAL
- Chat com IA (GPT/Claude)
- Geração de imagens
- Resumo de áudios/textos
- Assistente do grupo

#### 👑 COMANDOS DO DONO
- Configurar bot
- Gerenciar grupos
- Broadcast (mensagem em massa)
- Reiniciar bot
- Ver status/estatísticas

### 5. SISTEMA DE BANCO DE DADOS (database.js)
- Salvar/carregar dados em JSON
- Validação de dados
- Backup automático
- Funções de economia virtual
- Sistema de níveis/XP
- Comandos customizados

### 6. HELPERS E UTILITÁRIOS (helpers.js)
- Normalização de texto
- Validação de IDs (JID/LID)
- Formatação de tempo
- Download de mídia
- Conversão de formatos

### 7. CONFIGURAÇÃO (config.json)
```json
{
  "prefixo": "!",
  "nomebot": "[NOME TEMÁTICO]",
  "nomedono": "Dono",
  "numerodono": "5511999999999",
  "apikey": "",
  "debug": false
}
```

## PERSONALIZAÇÃO TEMÁTICA

Para a temática [SUA TEMÁTICA]:

1. **Nome do Bot**: Escolha um nome criativo relacionado à temática
2. **Emojis**: Use emojis consistentes com o tema em todos os menus
3. **Linguagem**: Adapte as mensagens ao estilo da temática
4. **Cores/Símbolos**: Use caracteres ASCII art temáticos
5. **Comandos**: Renomeie comandos para combinar (ex: "atacar" em vez de "kick")
6. **Imagem do Menu**: Crie ou sugira uma imagem temática

## EXEMPLO DE TEMÁTICAS

- **Anime**: Nomes japoneses, emojis de anime (🎌🗡️🌸)
- **Games**: Referências a jogos, emojis gamer (🎮🕹️🏆)
- **Futebol**: Times, estatísticas, emojis de futebol (⚽🏟️🏆)
- **Dark/Gothic**: Visual sombrio, emojis místicos (🦇🌙💀)
- **Kawaii**: Fofo, colorido, emojis cute (🌈💖✨)
- **Robótico/Tech**: Futurista, emojis tech (🤖💻⚡)
- **Natureza**: Animais, plantas, emojis nature (🌿🦋🌺)

## BOAS PRÁTICAS

1. Use ESM (`type: "module"`)
2. Trate erros com try/catch
3. Use async/await para operações assíncronas
4. Valide entrada do usuário
5. Limite taxa de requisições (rate limiting)
6. Cache dados frequentemente acessados
7. Logs para debug
8. Documentação clara

## SCRIPTS NPM

```json
{
  "scripts": {
    "start": "node dados/src/.scripts/start.js",
    "dev": "nodemon dados/src/.scripts/start.js",
    "config": "node dados/src/.scripts/config.js",
    "config:install": "node dados/src/.scripts/config.js --install",
    "update": "node dados/src/.scripts/update.js"
  }
}
```

Agora crie o bot completo com a temática [SUA TEMÁTICA], incluindo todos os arquivos necessários, menus personalizados e comandos adaptados ao tema!
```

---

## 🎨 EXEMPLOS DE TEMÁTICAS

### Temática: ANIME
```
Substitua [SUA TEMÁTICA] por: ANIME/OTAKU

O bot deve ter:
- Nome: "Neko Bot" ou "Senpai Bot"
- Emojis: 🎌 🗡️ 🌸 🍜 🎎 ⛩️
- Comandos: senpaiadd, kohaiban, etc.
- Mensagens em estilo anime (nya~, desu, etc.)
```

### Temática: FUTEBOL
```
Substitua [SUA TEMÁTICA] por: FUTEBOL/ESPORTES

O bot deve ter:
- Nome: "Bola Bot" ou "Craque Bot"  
- Emojis: ⚽ 🏟️ 🏆 🥅 🎽
- Comandos: escalar, banco, cartao
- Rankings de artilheiros, assistências
```

### Temática: GAMES
```
Substitua [SUA TEMÁTICA] por: GAMES/GAMER

O bot deve ter:
- Nome: "Player Bot" ou "GG Bot"
- Emojis: 🎮 🕹️ 🏆 👾 🎯
- Comandos: respawn, buff, nerf
- Sistema de XP e níveis como RPG
```

---

## 📝 NOTAS IMPORTANTES

1. **API Key**: Alguns comandos precisam de API key externa
2. **WhatsApp**: Use um número secundário para evitar banimento
3. **Recursos**: Mínimo 256MB RAM, recomendado 512MB
4. **Node.js**: Versão 20 ou superior obrigatória
5. **Hospedagem**: PM2 para manter online 24/7

---

## 🔧 COMANDOS PARA INSTALAÇÃO

```bash
# Clonar/criar projeto
git clone [url] ou mkdir [nome-do-bot]
cd [nome-do-bot]

# Configurar
npm run config
npm run config:install

# Iniciar
npm start
```

---

*Este prompt foi gerado baseado na análise do repositório nazuna Bot por MAY0LPHI.*
