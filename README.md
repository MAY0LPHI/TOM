<div align="center">

<img src="dados/midias/menu.jpg" alt="TOM Bot Banner" width="700" style="border-radius: 16px"/>

# 💀 TOM Bot

**Bot de WhatsApp avançado e multifuncional**  
Desenvolvido em **Node.js** com **Baileys** · Hospedado no **Replit**

![Status](https://img.shields.io/badge/STATUS-ATIVO-00ff41?style=flat-square&logo=whatsapp)
![Node](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js)
![Comandos](https://img.shields.io/badge/Comandos-1600%2B-00ff41?style=flat-square)
![IA](https://img.shields.io/badge/IA-Gemini%202.5-4285F4?style=flat-square&logo=google)
![Prefixo](https://img.shields.io/badge/Prefixo-.-ffffff?style=flat-square)

</div>

---

## 📋 Navegação Rápida

> Clique em qualquer seção abaixo para expandir os comandos.

- [⚙️ Configuração](#%EF%B8%8F-configuração)
- [📱 Conectando ao WhatsApp](#-conectando-ao-whatsapp)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [👑 Comandos do Dono](#-comandos-do-dono)
- [🛡️ Administração de Grupo](#%EF%B8%8F-administração-de-grupo)
- [🎨 Figurinhas](#-figurinhas)
- [🤖 Inteligência Artificial](#-inteligência-artificial)
- [⬇️ Downloads](#%EF%B8%8F-downloads)
- [🎉 Brincadeiras](#-brincadeiras)
- [⚔️ RPG](#%EF%B8%8F-rpg)
- [🔧 Ferramentas](#-ferramentas)
- [🎬 Alteradores de Mídia](#-alteradores-de-mídia)
- [🔍 Buscas e Consultas](#-buscas-e-consultas)
- [👤 Membros](#-membros)
- [✨ Recursos Especiais](#-recursos-especiais)

---

## ⚙️ Configuração

**Arquivo:** `dados/src/config.json`

```json
{
  "nomebot": "TOM",
  "prefixo": ".",
  "nomedono": "LIBID",
  "numerodono": "5"
}
```

**Secrets no Replit:**

| Secret | Obrigatório | Uso |
|--------|-------------|-----|
| `GEMINI_API_KEY` | ✅ | IA SimSimi, assistente, modelos Gemini |

---

## 📱 Conectando ao WhatsApp

<details>
<summary><strong>🔍 Clique para ver os métodos de conexão</strong></summary>

### Via QR Code
1. Inicie o bot com `npm start`
2. Escaneie o QR code exibido no console
3. WhatsApp → **Configurações → Aparelhos Conectados → Conectar um Aparelho**

### Via Código de Pareamento
1. Execute `npm start` e informe o número do bot quando solicitado
2. O console exibirá um código (ex: `1234-5678`)
3. WhatsApp → **Configurações → Aparelhos Conectados → Conectar com Número de Telefone**

> ⚠️ Sempre use um número **secundário e dedicado** ao bot. Não use seu número pessoal.

</details>

---

## 📁 Estrutura do Projeto

<details>
<summary><strong>🗂️ Clique para ver a estrutura de arquivos</strong></summary>

```
/
├── dados/
│   ├── src/
│   │   ├── index.js              # Core principal (~32.000 linhas)
│   │   ├── config.json           # Nome, prefixo, dono
│   │   ├── menus/                # Menus por categoria
│   │   │   ├── menu.js           # Menu principal
│   │   │   ├── menuadm.js        # Administração
│   │   │   ├── menudono.js       # Dono
│   │   │   ├── menubn.js         # Brincadeiras
│   │   │   ├── menudown.js       # Downloads
│   │   │   ├── menuia.js         # Inteligência Artificial
│   │   │   ├── menufig.js        # Figurinhas
│   │   │   ├── menumemb.js       # Membros
│   │   │   ├── menurpg.js        # RPG
│   │   │   ├── menubuscas.js     # Buscas
│   │   │   ├── ferramentas.js    # Ferramentas
│   │   │   └── alteradores.js    # Alteradores de mídia
│   │   └── funcs/
│   │       ├── downloads/        # YouTube, TikTok, etc.
│   │       ├── private/          # IA, funções internas
│   │       └── utils/            # Utilitários
│   ├── database/
│   │   ├── grupos/               # Dados por grupo (.json)
│   │   └── dono/                 # Configs do dono
│   └── local-api/                # API local (stickers, downloads)
├── package.json
└── README.md
```

</details>

---

## 👑 Comandos do Dono

> Exclusivos do dono do bot. Funcionam em qualquer lugar.

<details>
<summary><strong>🔧 Gestão do Bot — nome, foto, prefixo, reiniciar</strong></summary>

| Comando | Descrição |
|---------|-----------|
| `.nomebot [nome]` | Altera o nome do bot |
| `.nomedono [nome]` | Altera o nome do dono |
| `.numerodono [número]` | Altera o número do dono |
| `.prefixo [prefixo]` | Altera o prefixo global |
| `.fotobot` | Altera a foto do bot |
| `.reiniciar` | Reinicia o bot |
| `.atualizar` | Atualiza o bot |
| `.botoff` / `.boton` | Desliga/liga o bot globalmente |
| `.nuke` | Limpa dados do bot |
| `.reviverqr` | Regera o QR code |

</details>

<details>
<summary><strong>🛡️ Anti & Controle de Acesso — antigp, antipv, bloqueios</strong></summary>

| Comando | Descrição |
|---------|-----------|
| `.antigp` | Ignora **todos** os comandos em um grupo específico |
| `.antipv` | Ignora completamente mensagens no privado |
| `.antipv2` | Avisa que comandos só funcionam em grupos |
| `.antipv3` | Bloqueia usuários que usam comandos no privado |
| `.antipv4` | Avisa que o bot só funciona em grupos |
| `.antipvmsg [texto]` | Define a mensagem do antipv |
| `.antispamcmd` | Proteção anti-spam de comandos |
| `.antibanmarcar` | Protege o bot de marcações para ban |

</details>

<details>
<summary><strong>📋 Gestão de Grupos — entrar, sair, banir grupos</strong></summary>

| Comando | Descrição |
|---------|-----------|
| `.listagp` | Lista todos os grupos do bot |
| `.sairgp [id]` | Remove o bot de um grupo |
| `.bangp [id]` | Bane um grupo da lista |
| `.unbangp [id]` | Desbane um grupo |
| `.listbangp` | Lista grupos banidos |
| `.entrar [link]` | Entra em um grupo via convite |
| `.banghost` | Bane grupo se o dono não for admin |
| `.personalizargrupo` | Personaliza configurações do grupo |

</details>

<details>
<summary><strong>💎 VIP, Premium & Aluguel — assinaturas e monetização</strong></summary>

| Comando | Descrição |
|---------|-----------|
| `.addpremium @user` | Adiciona usuário premium |
| `.delpremium @user` | Remove usuário premium |
| `.listprem` | Lista usuários premium |
| `.infovip` | Informações do sistema VIP |
| `.statsvip` | Estatísticas VIP |
| `.menuvip` | Exibe menu VIP |
| `.addcmdvip [cmd]` | Marca comando como VIP |
| `.removecmdvip [cmd]` | Remove restrição VIP |
| `.listcmdvip` | Lista comandos VIP |
| `.togglecmdvip [cmd]` | Ativa/desativa restrição VIP |
| `.addaluguel` | Adiciona aluguel de bot |
| `.removeraluguel` | Remove aluguel |
| `.listaluguel` | Lista aluguéis ativos |
| `.modoaluguel` | Configura modo aluguel |
| `.dayfree` | Concede acesso gratuito temporário |
| `.estenderaluguel` | Estende prazo de aluguel |

</details>

<details>
<summary><strong>🤖 Sub-bots & Indicações — rede de bots</strong></summary>

| Comando | Descrição |
|---------|-----------|
| `.addsubbot` | Adiciona sub-bot |
| `.removesubbot` | Remove sub-bot |
| `.listarsubbots` | Lista sub-bots |
| `.conectarsubbot` | Conecta a um sub-bot |
| `.addsubdono` | Adiciona sub-dono |
| `.delsubdono` | Remove sub-dono |
| `.listasubdonos` | Lista sub-donos |
| `.addindicacao` | Adiciona sistema de indicação |
| `.delindicacao` | Remove indicação |
| `.topindica` | Ranking de indicações |

</details>

<details>
<summary><strong>🎨 Design do Menu — personalização visual completa</strong></summary>

| Comando | Descrição |
|---------|-----------|
| `.designmenu` | Painel de configuração do design |
| `.resetdesign` | Reseta para o design padrão |
| `.setheader [texto]` | Define o cabeçalho do menu |
| `.setitem [char]` | Define o ícone de item |
| `.setseparador [char]` | Define o separador de seção |
| `.settitulo [texto]` | Define o título |
| `.setborda [char]` | Define a borda superior |
| `.setbordameio [char]` | Define a borda do meio |
| `.setbordafim [char]` | Define a borda inferior |
| `.setdiv [char]` | Define o divisor |
| `.audiomenu` | Define áudio do menu |
| `.videomenu` | Define vídeo do menu |
| `.fotomenu` | Define foto do menu |

</details>

<details>
<summary><strong>🔒 Bloqueios Globais — comandos e usuários banidos</strong></summary>

| Comando | Descrição |
|---------|-----------|
| `.blockcmdg [cmd]` | Bloqueia um comando em todos os grupos |
| `.unblockcmdg [cmd]` | Desbloqueia o comando |
| `.listblocks` | Lista todos os bloqueios globais |
| `.blockuserg @user` | Bloqueia usuário globalmente |
| `.unblockuserg @user` | Desbloqueia usuário |
| `.addblackglobal @user` | Adiciona à blacklist global |
| `.rmblackglobal @user` | Remove da blacklist global |
| `.listblackglobal` | Lista a blacklist global |

</details>

<details>
<summary><strong>📊 Monitoramento & Diagnóstico — status e logs</strong></summary>

| Comando | Descrição |
|---------|-----------|
| `.viewmsg` | Visualiza mensagens em tempo real |
| `.cases` | Lista casos registrados |
| `.getcase [id]` | Detalhes de um caso |
| `.statustm` | Status completo do bot |
| `.tm` / `.tm2` | Informações técnicas |
| `.ping` | Latência do bot |
| `.limpardb` | Limpa o banco de dados |
| `.limparrankg` | Limpa ranking global |
| `.modoliteglobal` | Ativa/desativa modo lite globalmente |
| `.iaclear` | Limpa histórico da IA |

</details>

<details>
<summary><strong>⚡ Comandos Personalizados — crie seus próprios comandos</strong></summary>

| Comando | Descrição |
|---------|-----------|
| `.addcmd [nome] [resposta]` | Cria um comando personalizado |
| `.addcmdmidia [nome]` | Cria comando com mídia |
| `.delcmd [nome]` | Remove um comando |
| `.listcmd` | Lista todos os comandos criados |
| `.testcmd [nome]` | Testa um comando |
| `.setcmdmsg [cmd] [msg]` | Define mensagem do comando |
| `.configcmdnotfound [msg]` | Mensagem de comando não encontrado |
| `.cmdlimitar [cmd] [n]` | Limita usos por usuário |
| `.cmddeslimitar [cmd]` | Remove o limite |
| `.cmdlimites` | Lista limites configurados |

**Flags:** `[owner]` `[admin]` `[group]` `[private]`  
**Parâmetros:** `[param:string:nome:required]` · `[param:number:qtd:optional]` · `[param:enum:tipo:required:enum=a|b|c]`  
**Placeholders:** `{nome}` `{grupo}` `{velocidade}` `{groupdesc}`

</details>

---

## 🛡️ Administração de Grupo

> Comandos para quem é **administrador** do grupo.

<details>
<summary><strong>👥 Gestão de Usuários — ban, adv, mute, promover</strong></summary>

| Comando | Descrição |
|---------|-----------|
| `.ban @user` | Bane um usuário do grupo |
| `.ban2 @user` | Bane em modo silencioso |
| `.bam @user` | Bane com aviso personalizado |
| `.adv @user [motivo]` | Dá advertência |
| `.rmadv @user` | Remove advertência |
| `.listadv` | Lista advertências do grupo |
| `.mute @user` | Muta (ban automático ao falar) |
| `.mute2 @user` | Muta sem ban automático |
| `.desmute @user` | Desmuta usuário |
| `.promover @user` | Promove a administrador |
| `.rebaixar @user` | Rebaixa de administrador |
| `.marcar` | Marca todos os membros |
| `.hidetag [msg]` | Marca todos sem exibir nomes |
| `.addblacklist @user` | Adiciona à blacklist do grupo |
| `.delblacklist @user` | Remove da blacklist |
| `.listblacklist` | Lista a blacklist |
| `.addmod @user` | Adiciona moderador |
| `.delmod @user` | Remove moderador |
| `.listmods` | Lista moderadores |

</details>

<details>
<summary><strong>💬 Gestão do Grupo — nome, foto, regras, mensagens</strong></summary>

| Comando | Descrição |
|---------|-----------|
| `.nomegp [nome]` | Altera o nome do grupo |
| `.descgrupo [desc]` | Altera a descrição |
| `.fotogrupo` | Define a foto do grupo |
| `.linkgp` | Obtém o link de convite |
| `.opengp` | Abre o grupo para todos |
| `.closegp` | Fecha (só admins falam) |
| `.limpar [n]` | Apaga as últimas N mensagens |
| `.del` | Apaga a mensagem citada |
| `.sorteio` | Realiza um sorteio |
| `.grupo` | Informações do grupo |
| `.statusgp` | Status e configs do grupo |
| `.regras` | Exibe regras do grupo |
| `.addregra [regra]` | Adiciona uma regra |
| `.delregra [n]` | Remove uma regra |
| `.bemvindo` | Ativa/desativa boas-vindas |
| `.fotobv` | Define foto de boas-vindas |
| `.legendabv [texto]` | Define legenda de boas-vindas |
| `.saida` | Ativa/desativa mensagem de saída |
| `.fotosaiu` | Define foto de saída |
| `.legendasaiu [texto]` | Define legenda de saída |

</details>

<details>
<summary><strong>🔒 Segurança — anti-links, anti-spam, anti-conteúdo</strong></summary>

| Comando | Descrição |
|---------|-----------|
| `.antidelete` | Recupera mensagens apagadas |
| `.antilink` | Remove links no grupo |
| `.antilinkgp` | Remove links de outros grupos |
| `.antilinkcanal` | Remove links de canais |
| `.antilinkhard` | Modo rígido anti-link |
| `.antilinksoft` | Modo suave anti-link |
| `.antiflood` | Protege contra flood |
| `.antiporn` | Remove conteúdo adulto com IA |
| `.antitoxic <on/off>` | Filtra linguagem tóxica com IA |
| `.antipalavra <on/off/add/del/list>` | Filtra palavras específicas |
| `.antifig` | Remove figurinhas indesejadas |
| `.antibtn` | Remove mensagens com botões |
| `.antidoc` | Remove documentos |
| `.antiloc` | Remove localizações |
| `.antistatus` | Remove reposts de status |
| `.blockuser @user` | Bloqueia usuário no grupo |
| `.unblockuser @user` | Desbloqueia usuário |
| `.wladd @user` | Adiciona à whitelist |
| `.wl.remove @user` | Remove da whitelist |

</details>

<details>
<summary><strong>⚡ Ativações — modos, automações e ranking</strong></summary>

| Comando | Descrição |
|---------|-----------|
| `.modobn` | Ativa/desativa modo brincadeira |
| `.modolite` | Ativa/desativa modo lite |
| `.modorpg` | Ativa/desativa modo RPG |
| `.modoparceria` | Ativa/desativa modo parcerias |
| `.assistente` | Assistente IA automático do grupo |
| `.simsimi [personalidade]` | Auto-resposta com IA por personalidade |
| `.autorepo` | Repost automático de mensagens |
| `.autodl` | Download automático de links |
| `.autosticker` | Figurinha automática de imagens |
| `.automsg [msg]` | Mensagem automática periódica |
| `.autorespostas` | Configura respostas automáticas |
| `.soadm` | Apenas admins usam comandos |
| `.checkativo` | Verifica membros ativos |
| `.atividade` | Relatório de atividade |
| `.rankativo` | Ranking de ativos |
| `.limparrank` | Limpa o ranking |
| `.mantercontador` | Mantém contador de quem saiu |
| `.minmessage [n]` | Mínimo de mensagens para constar |
| `.limitmessage [n]` | Limite de mensagens por período |

</details>

<details>
<summary><strong>🎨 Configurações Visuais — prefix, fotos, parcerias, cargos</strong></summary>

| Comando | Descrição |
|---------|-----------|
| `.setprefix [prefixo]` | Define prefixo do grupo |
| `.setbammsg [msg]` | Define mensagem de ban |
| `.fotomenugrupo` | Define foto do menu do grupo |
| `.addparceria [info]` | Adiciona parceria |
| `.delparceria` | Remove parceria |
| `.parcerias` | Lista parcerias |
| `.role.criar [nome]` | Cria um cargo |
| `.role.alterar [cargo]` | Altera um cargo |
| `.role.excluir [cargo]` | Remove um cargo |
| `.roles` | Lista todos os cargos |
| `.solicitacoes` | Gerencia solicitações de entrada |
| `.aprovar` | Aprova solicitação |
| `.recusarsolic` | Recusa solicitação |

</details>

---

## 🎨 Figurinhas

<details>
<summary><strong>🖼️ Criar, converter e editar figurinhas</strong></summary>

| Comando | Descrição |
|---------|-----------|
| `.s` / `.sticker` | Cria figurinha de imagem ou vídeo |
| `.sticker2` | Cria figurinha no modo alternativo |
| `.ttp [texto]` | Figurinha com texto estático |
| `.attp [texto]` | Figurinha animada com texto (fundo transparente) |
| `.toimg` | Converte figurinha em imagem |
| `.emojimix [emoji+emoji]` | Mistura dois emojis em figurinha |
| `.figualeatoria` | Envia figurinha aleatória |
| `.sbg` | Remove o fundo da figurinha |
| `.sfundo` | Adiciona fundo à figurinha |
| `.rename [nome]` | Renomeia a figurinha |
| `.take` | Rouba figurinha de outra mensagem |
| `.rgtake` | Rouba figurinha redimensionada |
| `.qc` | Cria figurinha de citação estilizada |

</details>

---

## 🤖 Inteligência Artificial

<details>
<summary><strong>🧠 Modelos de IA disponíveis — Gemini, LLaMA, Mistral e mais</strong></summary>

| Comando | Modelo / Empresa |
|---------|-----------------|
| `.ia [msg]` | IA padrão do bot |
| `.gemma` / `.gemma2` | Google Gemma |
| `.llama` / `.llama3` | Meta LLaMA |
| `.mistral` | Mistral AI |
| `.magistral` | Mistral Magistral |
| `.qwen` / `.qwen2` / `.qwen3` | Alibaba Qwen |
| `.phi` / `.phi3` | Microsoft Phi |
| `.falcon` | TII Falcon |
| `.yi` | 01.AI Yi |
| `.kimi` / `.kimik2` | Moonshot Kimi |
| `.marin` | Marin AI |
| `.rocket` | Rocket AI |
| `.baichuan` | Baichuan AI |
| `.cog` | Cog |
| `.swallow` | Swallow |
| `.rakutenai` | Rakuten AI |

</details>

<details>
<summary><strong>🛠️ Ferramentas de IA — resumir, corrigir, explicar e mais</strong></summary>

| Comando | Descrição |
|---------|-----------|
| `.corrigir [texto]` | Corrige gramática e ortografia |
| `.resumir [texto]` | Resume um texto longo |
| `.resumirurl [url]` | Resume o conteúdo de uma página web |
| `.resumirchat` | Resume as mensagens recentes do grupo |
| `.explicar [texto]` | Explica um conceito de forma simples |
| `.debater [tema]` | Debate sobre um tema com argumentos |
| `.ideias [tema]` | Gera ideias criativas sobre um assunto |
| `.recomendar [tipo]` | Faz recomendações personalizadas |
| `.horoscopo [signo]` | Horóscopo do dia com IA |
| `.signos` | Informações sobre os signos |
| `.iaclear` | Limpa o histórico de conversa com a IA |

</details>

<details>
<summary><strong>💬 SimSimi — auto-resposta por grupo com personalidades</strong></summary>

Quando ativo, o bot responde **automaticamente a todas as mensagens** do grupo usando IA Gemini. Cada grupo tem sua própria personalidade independente.

| Comando | Personalidade |
|---------|---------------|
| `.simsimi divertido` | Casual e engraçado *(padrão)* |
| `.simsimi serio` | Direto e formal |
| `.simsimi romantico` | Carinhoso e meigo |
| `.simsimi debochado` | Irônico e sarcástico |
| `.simsimi filosofo` | Profundo e reflexivo |
| `.simsimi animado` | Empolgado com emojis |
| `.simsimi` *(sem argumento)* | Desativa o SimSimi |

> Troque de personalidade a qualquer momento sem precisar desativar — basta enviar `.simsimi [nova_personalidade]`.

</details>

---

## ⬇️ Downloads

<details>
<summary><strong>🎵 Música, vídeo e arquivos de diversas plataformas</strong></summary>

| Comando | Plataforma / Função |
|---------|---------------------|
| `.play [música]` | Áudio do YouTube |
| `.play2 [música]` | Áudio YouTube (modo 2) |
| `.playvid [vídeo]` | Vídeo do YouTube |
| `.tiktok [link]` | Vídeo do TikTok |
| `.instagram [link]` | Post/Reels do Instagram |
| `.igstory [link]` | Stories do Instagram |
| `.facebook [link]` | Vídeo do Facebook |
| `.twitter [link]` | Vídeo do Twitter/X |
| `.pinterest [link]` | Imagem do Pinterest |
| `.spotify [música]` | Áudio do Spotify |
| `.soundcloud [link]` | Áudio do SoundCloud |
| `.mediafire [link]` | Arquivo do MediaFire |
| `.gdrive [link]` | Arquivo do Google Drive |
| `.apps [app]` | Download de APK |
| `.mcplugin [plugin]` | Plugin do Minecraft |
| `.letra [música]` | Letra de música |
| `.dicionario [palavra]` | Definição no dicionário |
| `.wikipedia [tema]` | Artigo da Wikipedia |
| `.noticias` | Últimas notícias |
| `.google [busca]` | Pesquisa no Google |

</details>

---

## 🎉 Brincadeiras

> Requer `.modobn` ativo no grupo.

<details>
<summary><strong>💕 Relacionamentos — namoro, casamento, ship</strong></summary>

| Comando | Descrição |
|---------|-----------|
| `.namoro @user` | Pede alguém em namoro |
| `.casamento @user` | Pede alguém em casamento |
| `.terminar` | Termina o relacionamento |
| `.divorciar` | Pede divórcio |
| `.casal` | Informações do seu casal |
| `.casais` | Lista casais do grupo |
| `.shipo @user @user` | Cria um ship entre dois usuários |
| `.chance [coisa]` | Calcula a chance de algo acontecer |
| `.sorte` | Sorte do dia |

</details>

<details>
<summary><strong>🤺 Interações — abraçar, beijo, soco, elogios e mais</strong></summary>

| Comando | Descrição |
|---------|-----------|
| `.abracar @user` | Abraça alguém |
| `.beijar @user` | Beija alguém |
| `.cafune @user` | Dá cafuné |
| `.tapa @user` | Dá um tapa |
| `.soco @user` | Dá um soco
