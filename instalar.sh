#!/bin/bash

# ╔══════════════════════════════════════════════════════════╗
# ║              INSTALADOR - BOT TOM v8.0.0                ║
# ║              Script para Termux (Android)                ║
# ╚══════════════════════════════════════════════════════════╝

VERDE="\e[32m"
VERMELHO="\e[31m"
AMARELO="\e[33m"
AZUL="\e[34m"
RESET="\e[0m"
NEGRITO="\e[1m"

ok()   { echo -e "${VERDE}${NEGRITO}[✓]${RESET} $1"; }
erro() { echo -e "${VERMELHO}${NEGRITO}[✗]${RESET} $1"; }
info() { echo -e "${AZUL}${NEGRITO}[•]${RESET} $1"; }
aviso(){ echo -e "${AMARELO}${NEGRITO}[!]${RESET} $1"; }

echo -e "\n${NEGRITO}${AZUL}"
echo "╔══════════════════════════════════════════════════════════╗"
echo "║              INSTALADOR - BOT TOM v8.0.0                ║"
echo "║              Script para Termux (Android)                ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo -e "${RESET}\n"

# ─── 1. Atualizar repositórios do Termux ────────────────────
info "Atualizando repositórios do Termux..."
pkg update -y -q && pkg upgrade -y -q
ok "Repositórios atualizados."

# ─── 2. Instalar dependências do sistema ────────────────────
info "Instalando dependências do sistema..."
PKGS=(nodejs-lts ffmpeg git python)
for PKG in "${PKGS[@]}"; do
    if ! command -v "$PKG" &>/dev/null; then
        info "Instalando $PKG..."
        pkg install -y "$PKG" -q
    else
        ok "$PKG já instalado."
    fi
done

# ─── 3. Verificar versão do Node ────────────────────────────
NODE_VER=$(node --version 2>/dev/null | sed 's/v//' | cut -d. -f1)
if [ -z "$NODE_VER" ] || [ "$NODE_VER" -lt 20 ]; then
    erro "Node.js v20+ é necessário. Versão encontrada: $(node --version 2>/dev/null || echo 'não instalado')"
    info "Tentando instalar versão correta..."
    pkg install -y nodejs -q
fi
ok "Node.js $(node --version) detectado."

# ─── 4. Instalar dependências do projeto ────────────────────
echo ""
info "Instalando dependências do projeto (npm install)..."
if npm install --prefer-offline 2>&1; then
    ok "Dependências instaladas com sucesso!"
else
    aviso "Primeira tentativa falhou. Tentando limpar cache e reinstalar..."
    npm cache clean --force
    npm install
fi

# ─── 5. Verificar se os arquivos do bot existem ─────────────
echo ""
if [ ! -f "dados/src/connect.js" ]; then
    erro "Arquivo dados/src/connect.js não encontrado."
    erro "Certifique-se de estar na pasta raiz do bot."
    exit 1
fi
ok "Arquivos do bot verificados."

if [ ! -f "dados/src/config.json" ]; then
    erro "Arquivo config.json não encontrado em dados/src/"
    exit 1
fi
ok "Config.json encontrado."

# ─── 6. Verificar chaves Gemini ─────────────────────────────
GEMINI_COUNT=$(node -e "
try {
  const c = JSON.parse(require('fs').readFileSync('dados/src/config.json','utf8'));
  const keys = Array.isArray(c.geminiApiKeys) ? c.geminiApiKeys.filter(k => k && (typeof k === 'string' ? k : k.key)) : [];
  console.log(keys.length);
} catch(e) { console.log(0); }
" 2>/dev/null)

if [ "$GEMINI_COUNT" -gt 0 ]; then
    ok "$GEMINI_COUNT chave(s) Gemini encontrada(s) no config.json."
else
    aviso "Nenhuma chave Gemini no config.json."
    aviso "O SimSimi não funcionará até você adicionar chaves com /addgeminikey."
fi

# ─── 7. Criar pasta de logs se não existir ──────────────────
mkdir -p dados/database/logs
mkdir -p dados/database/shared
mkdir -p dados/database/subbots
ok "Diretórios de dados verificados."

# ─── 8. Resumo final ────────────────────────────────────────
echo ""
echo -e "${NEGRITO}${VERDE}"
echo "╔══════════════════════════════════════════════════════════╗"
echo "║                 INSTALAÇÃO CONCLUÍDA!                   ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo -e "${RESET}"
echo -e "  ${VERDE}✓${RESET} Dependências instaladas"
echo -e "  ${VERDE}✓${RESET} Bot pronto para iniciar"
echo ""
echo -e "${NEGRITO}Para iniciar o bot, execute:${RESET}"
echo -e "  ${AMARELO}npm start${RESET}"
echo ""

# ─── 9. Perguntar se quer iniciar agora ─────────────────────
read -r -p "$(echo -e ${NEGRITO}Deseja iniciar o bot agora? [S/n]:${RESET} )" RESPOSTA
RESPOSTA=${RESPOSTA:-S}
if [[ "$RESPOSTA" =~ ^[Ss]$ ]]; then
    echo ""
    info "Iniciando o bot..."
    echo ""
    npm start
else
    info "Para iniciar mais tarde, execute: npm start"
fi
