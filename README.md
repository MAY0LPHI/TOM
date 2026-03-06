# 💀 TOM Bot — WhatsApp Bot

Bot de WhatsApp avançado e multifuncional desenvolvido em **Node.js** com a biblioteca **Baileys**, hospedado no **Replit**. Conta com mais de **1.600 comandos** distribuídos em categorias de administração, entretenimento, IA, RPG, downloads e muito mais.

---

## 📋 Índice

1. [Configuração](#-configuração)
2. [Conectando ao WhatsApp](#-conectando-ao-whatsapp)
3. [Estrutura do Projeto](#-estrutura-do-projeto)
4. [Comandos — Dono](#-comandos--dono)
5. [Comandos — Administração de Grupo](#-comandos--administração-de-grupo)
6. [Comandos — Figurinhas](#-comandos--figurinhas)
7. [Comandos — Inteligência Artificial](#-comandos--inteligência-artificial)
8. [Comandos — Downloads](#-comandos--downloads)
9. [Comandos — Brincadeiras](#-comandos--brincadeiras)
10. [Comandos — RPG](#-comandos--rpg)
11. [Comandos — Ferramentas](#-comandos--ferramentas)
12. [Comandos — Alteradores de Mídia](#-comandos--alteradores-de-mídia)
13. [Comandos — Buscas e Consultas](#-comandos--buscas-e-consultas)
14. [Comandos — Membros](#-comandos--membros)
15. [Recursos Especiais](#-recursos-especiais)
16. [Solução de Problemas](#-solução-de-problemas)

---

## ⚙️ Configuração

**Arquivo principal:** `dados/src/config.json`

```json
{
  "nomebot": "TOM",
  "prefixo": ".",
  "nomedono": "LIBID",
  "numerodono": "5527988963725"
}
```

**Secrets no Replit (obrigatório):**

| Secret | Uso |
|--------|-----|
| `GEMINI_API_KEY` | IA SimSimi, assistente e modelos Gemini |

---

## 📱 Conectando ao WhatsApp

### Via QR Code
1. Inicie o bot com `npm start`
2. Escaneie o QR code exibido no console
3. WhatsApp → **Configurações → Aparelhos Conectados → Conectar um Aparelho**

### Via Código de Pareamento
1. Execute `npm start` e informe o número quando solicitado
2. Receba um código (ex: `1234-5678`) no console
3. WhatsApp → **Configurações → Aparelhos Conectados → Conectar com Número de Telefone**

> ⚠️ Sempre use um número **secundário e dedicado** ao bot.

---

## 📁 Estrutura do Projeto

```
/
├── dados/
│   ├── src/
│   │   ├── index.js              # Core principal do bot (~32.000 linhas)
│   │   ├── config.json           # Nome, prefixo, dono
│   │   ├── menus/                # Menus por categoria
│   │   │   ├── menu.js           # Menu principal
│   │   │   ├── menuadm.js        # Menu de administração
│   │   │   ├── menudono.js       # Menu do dono
│   │   │   ├── menubn.js         # Menu de brincadeiras
│   │   │   ├── menudown.js       # Menu de downloads
│   │   │   ├── menuia.js         # Menu de IA
│   │   │   ├── menufig.js        # Menu de figurinhas
│   │   │   ├── menumemb.js       # Menu de membros
│   │   │   ├── menurpg.js        # Menu de RPG
│   │   │   ├── menubuscas.js     # Menu de buscas
│   │   │   ├── ferramentas.js    # Menu de ferramentas
│   │   │   └── alteradores.js    # Menu de alteradores
│   │   └── funcs/
│   │       ├── downloads/        # YouTube, TikTok, etc.
│   │       ├── private/          # IA, funções internas
│   │       └── utils/            # Utilitários gerais
│   ├── database/
│   │   ├── grupos/               # Dados por grupo (JSON)
│   │   └── dono/                 # Configs do dono (menu design, etc.)
│   └── local-api/                # API local (stickers, downloads)
├── package.json
└── README.md
```

---

## 👑 Comandos — Dono

> Todos os comandos abaixo são exclusivos do dono do bot.

### 🔧 Gestão do Bot

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

### 🛡️ Anti & Controle de Acesso

| Comando | Descrição |
|---------|-----------|
| `.antigp` | Ativa/desativa ignorar todos os comandos em um grupo |
| `.antipv` | Ignora completamente mensagens no privado |
| `.antipv2` | Responde que comandos só funcionam em grupos |
| `.antipv3` | Bloqueia usuários que usam comandos no privado |
| `.antipv4` | Avisa que o bot só funciona em grupos |
| `.antipvmsg [texto]` | Define a mensagem do antipv |
| `.antispamcmd` | Proteção anti-spam de comandos |
| `.antibanmarcar` | Protege o bot de ser marcado para ban |

### 📋 Gestão de Grupos

| Comando | Descrição |
|---------|-----------|
| `.listagp` | Lista todos os grupos onde o bot está |
| `.sairgp [id]` | Remove o bot de um grupo |
| `.bangp [id]` | Bane um grupo da lista |
| `.unbangp [id]` | Desbane um grupo |
| `.listbangp` | Lista grupos banidos |
| `.entrar [link]` | Entra em um grupo via convite |
| `.banghost` | Bane o grupo se o dono não for admin |
| `.personalizargrupo` | Personaliza configurações do grupo |

### 💎 Sistema VIP & Premium

| Comando | Descrição |
|---------|-----------|
| `.addpremium @user` | Adiciona usuário premium |
| `.delpremium @user` | Remove usuário premium |
| `.listprem` | Lista usuários premium |
| `.infovip` | Informações do sistema VIP |
| `.statsvip` | Estatísticas VIP |
| `.menuvip` | Exibe menu VIP |
| `.addcmdvip [cmd]` | Adiciona comando como VIP |
| `.removecmdvip [cmd]` | Remove comando VIP |
| `.listcmdvip` | Lista comandos VIP |
| `.togglecmdvip [cmd]` | Ativa/desativa comando VIP |
| `.addaluguel` | Adiciona aluguel de bot |
| `.removeraluguel` | Remove aluguel |
| `.listaluguel` | Lista aluguéis |
| `.modoaluguel` | Configura modo aluguel |

### 🤖 Sub-bots & Indicações

| Comando | Descrição |
|---------|-----------|
| `.addsubbot` | Adiciona sub-bot |
| `.removesubbot` | Remove sub-bot |
| `.listarsubbots` | Lista sub-bots |
| `.conectarsubbot` | Conecta a um sub-bot |
| `.addsubdono` | Adiciona sub-dono |
| `.delsubdono` | Remove sub-dono |
| `.listasubdonos` | Lista sub-donos |
| `.addindicacao` | Adiciona indicação |
| `.delindicacao` | Remove indicação |
| `.topindica` | Ranking de indicações |

### 🎨 Design do Menu

| Comando | Descrição |
|---------|-----------|
| `.designmenu` | Configura design do menu |
| `.resetdesign` | Reseta o design para padrão |
| `.setheader [texto]` | Define o cabeçalho |
| `.setitem [texto]` | Define o ícone de item |
| `.setseparador [texto]` | Define o separador |
| `.settitulo [texto]` | Define o título |
| `.setborda [char]` | Define a borda |
| `.setbordameio [char]` | Define a borda do meio |
| `.setbordafim [char]` | Define a borda do fim |
| `.setdiv [char]` | Define o divisor |
| `.audiomenu` | Configura menu de áudio |
| `.videomenu` | Configura menu de vídeo |
| `.fotomenu` | Configura foto do menu |

### 🔒 Bloqueios Globais

| Comando | Descrição |
|---------|-----------|
| `.blockcmdg [cmd]` | Bloqueia comando globalmente |
| `.unblockcmdg [cmd]` | Desbloqueia comando |
| `.listblocks` | Lista bloqueios globais |
| `.blockuserg @user` | Bloqueia usuário globalmente |
| `.unblockuserg @user` | Desbloqueia usuário |
| `.addblackglobal @user` | Adiciona à blacklist global |
| `.rmblackglobal @user` | Remove da blacklist global |
| `.listblackglobal` | Lista blacklist global |

### 📊 Monitoramento & Diagnóstico

| Comando | Descrição |
|---------|-----------|
| `.viewmsg` | Visualiza mensagens |
| `.cases` | Lista casos registrados |
| `.getcase [id]` | Detalhes de um caso |
| `.statustm` | Status do bot |
| `.tm` / `.tm2` | Informações técnicas |
| `.ping` | Latência do bot |
| `.limpardb` | Limpa o banco de dados |
| `.limparrankg` | Limpa rank global |
| `.modoliteglobal` | Ativa/desativa modo lite global |
| `.iaclear` | Limpa histórico da IA |

### ⚡ Comandos Personalizados

| Comando | Descrição |
|---------|-----------|
| `.addcmd [nome] [resposta]` | Cria comando personalizado |
| `.addcmdmidia [nome]` | Cria comando de mídia |
| `.delcmd [nome]` | Remove comando personalizado |
| `.listcmd` | Lista comandos criados |
| `.testcmd [nome]` | Testa um comando |
| `.setcmdmsg [cmd] [msg]` | Define mensagem do comando |
| `.configcmdnotfound [msg]` | Mensagem de comando não encontrado |
| `.cmdlimitar [cmd] [n]` | Limita usos de um comando |
| `.cmddeslimitar [cmd]` | Remove limite |
| `.cmdlimites` | Lista limites configurados |

**Flags suportadas:** `[owner]`, `[admin]`, `[group]`, `[private]`  
**Parâmetros:** `[param:string:nome:required]`, `[param:number:qtd:optional]`, `[param:enum:tipo:required:enum=a|b|c]`

---

## 🛡️ Comandos — Administração de Grupo

> Requerem que o usuário seja **administrador** do grupo.

### 👥 Gestão de Usuários

| Comando | Descrição |
|---------|-----------|
| `.ban @user` | Bane um usuário |
| `.ban2 @user` | Bane em modo silencioso |
| `.bam @user` | Bane com aviso |
| `.adv @user [motivo]` | Dá advertência |
| `.rmadv @user` | Remove advertência |
| `.listadv` | Lista advertências |
| `.mute @user` | Muta um usuário (ban automático ao falar) |
| `.mute2 @user` | Muta sem ban automático |
| `.desmute @user` | Desmuta |
| `.desmute2 @user` | Desmuta modo 2 |
| `.promover @user` | Promove a admin |
| `.rebaixar @user` | Rebaixa de admin |
| `.marcar` | Marca todos os membros |
| `.hidetag [msg]` | Marca todos sem aparecer os nomes |
| `.addblacklist @user` | Adiciona à blacklist do grupo |
| `.delblacklist @user` | Remove da blacklist |
| `.listblacklist` | Lista blacklist |
| `.addmod @user` | Adiciona moderador |
| `.delmod @user` | Remove moderador |
| `.listmods` | Lista moderadores |

### 💬 Gestão do Grupo

| Comando | Descrição |
|---------|-----------|
| `.nomegp [nome]` | Altera o nome do grupo |
| `.descgrupo [desc]` | Altera a descrição |
| `.fotogrupo` | Altera a foto do grupo |
| `.linkgp` | Obtém o link do grupo |
| `.opengp` | Abre o grupo para todos |
| `.closegp` | Fecha o grupo (só admins falam) |
| `.limpar [n]` | Apaga as últimas N mensagens |
| `.del` | Apaga a mensagem citada |
| `.sorteio @users` | Realiza um sorteio |
| `.grupo` | Informações do grupo |
| `.statusgp` | Status e configs do grupo |
| `.infoperso` | Informações de personalização |
| `.regras` | Exibe regras do grupo |
| `.addregra [regra]` | Adiciona uma regra |
| `.delregra [n]` | Remove uma regra |
| `.bemvindo` | Ativa/desativa mensagem de boas-vindas |
| `.fotobv` | Define foto de boas-vindas |
| `.rmfotobv` | Remove foto de boas-vindas |
| `.saida` | Ativa/desativa mensagem de saída |
| `.fotosaiu` | Define foto de saída |
| `.rmfotosaiu` | Remove foto de saída |
| `.legendabv [texto]` | Define legenda de boas-vindas |
| `.legendasaiu [texto]` | Define legenda de saída |

### 🔒 Segurança

| Comando | Descrição |
|---------|-----------|
| `.antidelete` | Recupera mensagens apagadas |
| `.antilink` | Remove links no grupo |
| `.antilinkgp` | Remove links de outros grupos |
| `.antilinkcanal` | Remove links de canais |
| `.antilinkhard` | Modo rígido anti-link |
| `.antilinksoft` | Modo suave anti-link |
| `.antiflood` | Protege contra flood |
| `.antiporn` | Detecta e remove conteúdo adulto |
| `.antitoxic <on/off>` | Filtra linguagem tóxica com IA |
| `.antipalavra <on/off/add/del/list>` | Filtra palavras específicas |
| `.antifig` | Remove figurinhas indesejadas |
| `.antibtn` | Remove mensagens com botões |
| `.antidoc` | Remove documentos |
| `.antiloc` | Remove localizações |
| `.antistatus` | Remove reposts de status |
| `.blockuser @user` | Bloqueia usuário no grupo |
| `.unblockuser @user` | Desbloqueia usuário |
| `.listblocksgp` | Lista usuários bloqueados |
| `.blockcmd [cmd]` | Bloqueia comando no grupo |
| `.unblockcmd [cmd]` | Desbloqueia comando |
| `.wladd @user` | Adiciona à whitelist |
| `.wl.remove @user` | Remove da whitelist |
| `.wl.lista` | Lista whitelist |

### ⚡ Ativações

| Comando | Descrição |
|---------|-----------|
| `.modobn` | Ativa/desativa modo brincadeira |
| `.modolite` | Ativa/desativa modo lite |
| `.modorpg` | Ativa/desativa modo RPG |
| `.modoparceria` | Ativa/desativa modo parcerias |
| `.assistente` | Ativa/desativa assistente IA do grupo |
| `.simsimi [personalidade]` | Ativa/desativa SimSimi com IA |
| `.autorepo` | Ativa/desativa repost automático |
| `.autodl` | Ativa/desativa download automático |
| `.autosticker` | Ativa/desativa figurinha automática |
| `.automsg [msg]` | Define mensagem automática |
| `.autorespostas` | Configura respostas automáticas |
| `.soadm` | Apenas admins usam comandos |
| `.sorteio` | Faz um sorteio no grupo |
| `.checkativo` | Verifica membros ativos |
| `.atividade` | Relatório de atividade |
| `.rankativo` | Ranking de membros ativos |
| `.rankativos` | Ranking geral de ativos |
| `.rankinativo` | Ranking de inativos |
| `.limparrank` | Limpa o ranking |
| `.resetrank` | Reseta o ranking |
| `.mantercontador` | Mantém contador de membros que saíram |
| `.minmessage [n]` | Define mínimo de mensagens |
| `.limitmessage [n]` | Limite de mensagens por período |
| `.cmdlimit [cmd] [n]` | Limite de uso de comando |

### 🎨 Configurações do Grupo

| Comando | Descrição |
|---------|-----------|
| `.setprefix [prefixo]` | Define prefixo do grupo |
| `.setbammsg [msg]` | Define mensagem de ban |
| `.fotomenugrupo` | Define foto do menu do grupo |
| `.addparceria [info]` | Adiciona parceria |
| `.delparceria` | Remove parceria |
| `.parcerias` | Lista parcerias |
| `.addautoadm` | Adiciona resposta automática de admin |
| `.delautoadm` | Remove resposta automática |
| `.listautoadm` | Lista respostas automáticas |
| `.solicitacoes` | Gerencia solicitações de entrada |
| `.aprovar` | Aprova solicitação |
| `.recusarsolic` | Recusa solicitação |
| `.role.criar` | Cria um cargo/role |
| `.role.alterar` | Altera um cargo |
| `.role.excluir` | Remove um cargo |
| `.roles` | Lista cargos |

---

## 🎨 Comandos — Figurinhas

| Comando | Descrição |
|---------|-----------|
| `.s` / `.sticker` | Cria figurinha de imagem/vídeo |
| `.sticker2` | Cria figurinha modo 2 |
| `.ttp [texto]` | Figurinha com texto |
| `.attp [texto]` | Figurinha animada com texto |
| `.toimg` | Converte figurinha em imagem |
| `.emojimix [emoji+emoji]` | Mistura dois emojis |
| `.figualeatoria` | Figurinha aleatória |
| `.sbg` | Remove fundo da figurinha |
| `.sfundo` | Adiciona fundo à figurinha |
| `.rename [nome]` | Renomeia figurinha |
| `.take` | Rouba figurinha de outra mensagem |
| `.rgtake` | Rouba figurinha redimensionada |
| `.qc` | Cria figurinha de citação |

---

## 🤖 Comandos — Inteligência Artificial

### Modelos de IA

| Comando | Modelo |
|---------|--------|
| `.ia [msg]` | IA padrão do bot |
| `.gemma` / `.gemma2` | Google Gemma |
| `.llama` / `.llama3` | Meta LLaMA |
| `.mistral` | Mistral AI |
| `.qwen` / `.qwen2` / `.qwen3` | Alibaba Qwen |
| `.phi` / `.phi3` | Microsoft Phi |
| `.falcon` | TII Falcon |
| `.yi` | 01.AI Yi |
| `.kimi` / `.kimik2` | Moonshot Kimi |
| `.magistral` | Mistral Magistral |
| `.marin` | Marin AI |
| `.rocket` | Rocket AI |
| `.baichuan` | Baichuan |
| `.cog` | Cog |
| `.swallow` | Swallow |
| `.rakutenai` | Rakuten AI |

### Ferramentas de IA

| Comando | Descrição |
|---------|-----------|
| `.corrigir [texto]` | Corrige gramática e ortografia |
| `.resumir [texto]` | Resume um texto |
| `.resumirurl [url]` | Resume uma página web |
| `.resumirchat` | Resume o chat do grupo |
| `.explicar [texto]` | Explica um conceito |
| `.debater [tema]` | Debate sobre um tema |
| `.ideias [tema]` | Gera ideias criativas |
| `.recomendar [tipo]` | Faz recomendações |
| `.horoscopo [signo]` | Horóscopo do dia |
| `.signos` | Informações sobre signos |
| `.iaclear` | Limpa histórico da IA |

### SimSimi (auto-resposta por grupo)

| Personalidade | Estilo |
|---------------|--------|
| `.simsimi divertido` | Casual e engraçado (padrão) |
| `.simsimi serio` | Direto e formal |
| `.simsimi romantico` | Carinhoso e meigo |
| `.simsimi debochado` | Irônico e sarcástico |
| `.simsimi filosofo` | Profundo e reflexivo |
| `.simsimi animado` | Empolgado com emojis |

> Use `.simsimi` sem argumento para desativar. Troque de personalidade enviando `.simsimi [nova_personalidade]` com o SimSimi já ativo.

---

## ⬇️ Comandos — Downloads

| Comando | Descrição |
|---------|-----------|
| `.play [música]` | Baixa áudio do YouTube |
| `.play2 [música]` | Baixa áudio (modo 2) |
| `.playvid [vídeo]` | Baixa vídeo do YouTube |
| `.tiktok [link]` | Baixa vídeo do TikTok |
| `.instagram [link]` | Baixa do Instagram |
| `.igstory [link]` | Baixa stories do Instagram |
| `.facebook [link]` | Baixa do Facebook |
| `.twitter [link]` | Baixa do Twitter/X |
| `.pinterest [link]` | Baixa do Pinterest |
| `.spotify [música]` | Baixa do Spotify |
| `.soundcloud [link]` | Baixa do SoundCloud |
| `.mediafire [link]` | Baixa do MediaFire |
| `.gdrive [link]` | Baixa do Google Drive |
| `.apps [app]` | Baixa APK de aplicativos |
| `.mcplugin [plugin]` | Baixa plugin do Minecraft |
| `.letra [música]` | Busca letra de música |
| `.dicionario [palavra]` | Definição de palavra |
| `.wikipedia [tema]` | Busca na Wikipedia |
| `.noticias` | Últimas notícias |
| `.google [busca]` | Busca no Google |

---

## 🎉 Comandos — Brincadeiras

> Disponíveis apenas em grupos com `.modobn` ativado.

### Relacionamentos

| Comando | Descrição |
|---------|-----------|
| `.namoro @user` | Pede alguém em namoro |
| `.casamento @user` | Pede alguém em casamento |
| `.terminar` | Termina o namoro |
| `.divorciar` | Pede divórcio |
| `.casal` | Exibe informações do casal |
| `.casais` | Lista casais do grupo |
| `.shipo @user @user` | Cria um ship entre dois usuários |
| `.chance [coisa]` | Calcula a chance de algo |
| `.sorte` | Sorte do dia |

### Interações

| Comando | Descrição |
|---------|-----------|
| `.abracar @user` | Abraça alguém |
| `.beijar @user` | Beija alguém |
| `.cafune @user` | Dá cafuné em alguém |
| `.tapa @user` | Dá um tapa |
| `.soco @user` | Dá um soco |
| `.chutar @user` | Chuta alguém |
| `.lamber @user` | Lambe alguém |
| `.morder @user` | Morde alguém |
| `.mata @user` | "Mata" alguém |
| `.explodir @user` | "Explode" alguém |
| `.elogio @user` | Elogia alguém |
| `.cantada @user` | Manda uma cantada |
| `.conselho` | Gera um conselho |
| `.conselhobiblico` | Conselho bíblico |
| `.motivacional` | Frase motivacional |
| `.piada` | Conta uma piada |
| `.fato` | Fato aleatório |
| `.charada` | Faz uma charada |

### Perfis & Personalidade

| Comando | Descrição |
|---------|-----------|
| `.perfil` | Exibe seu perfil |
| `.rankativo` | Ranking de ativos do grupo |
| `.rep @user` | Dá reputação a alguém |
| `.conquistas` | Suas conquistas |
| `.presente @user` | Envia um presente |
| `.afk [motivo]` | Marca como ausente |
| `.voltei` | Remove status AFK |
| `.online` / `.offline` | Altera status |

> O menu de brincadeiras também inclui mais de **200 tipos de personalidade** (`lindo`, `gado`, `nerd`, `patriotico`, etc.) e jogos como `.uno`, `.stop`, `.forca`, `.wordle`, `.jogodavelha`, `.connect4`, `.batalhanaval`, `.dueloquiz`, `.tictactoe`, `.cacapalavras`, `.memoria`.

---

## ⚔️ Comandos — RPG

> Sistema completo de RPG com economia, pets, clãs, masmorras e muito mais.

### Personagem & Progresso

| Comando | Descrição |
|---------|-----------|
| `.perfilrpg` | Exibe seu perfil RPG |
| `.class` | Escolhe/visualiza sua classe |
| `.meustats` | Suas estatísticas |
| `.habilidades` | Habilidades disponíveis |
| `.evoluir` | Evolui seu personagem |
| `.evolve` | Sistema de evolução avançado |
| `.prestige` | Sistema de prestígio |
| `.train` | Treina seu personagem |
| `.streak` | Sequência diária |
| `.diario` | Recompensas diárias |
| `.missoes` | Lista missões disponíveis |
| `.conquistas` | Conquistas desbloqueadas |
| `.vote` | Vota para ganhar recompensas |

### Economia

| Comando | Descrição |
|---------|-----------|
| `.carteira` | Saldo atual |
| `.dep [valor]` | Deposita moedas |
| `.sacar [valor]` | Saca moedas |
| `.pix @user [valor]` | Transfere para outro jogador |
| `.doar @user [valor]` | Doa moedas |
| `.work` | Trabalha para ganhar moedas |
| `.emprego` | Gerencia empregos |
| `.vagas` | Vagas de emprego |
| `.demitir` | Demite de um emprego |
| `.investir [valor]` | Investe moedas |
| `.crime` | Comete um crime |
| `.assaltar @user` | Tenta assaltar um jogador |
| `.topriqueza` | Ranking dos mais ricos |

### Jogos de Azar

| Comando | Descrição |
|---------|-----------|
| `.slots [valor]` | Máquina caça-níquel |
| `.roleta [valor]` | Roleta |
| `.blackjack [valor]` | Blackjack |
| `.coinflip [valor]` | Cara ou coroa |
| `.crash [valor]` | Jogo crash |
| `.apostar [valor]` | Apostas gerais |
| `.loteria [valor]` | Loteria |
| `.leilao` | Sistema de leilão |
| `.auction` | Leilão avançado |

### Loja & Equipamentos

| Comando | Descrição |
|---------|-----------|
| `.loja` | Loja principal |
| `.lojapremium` | Loja premium |
| `.comprar [item]` | Compra um item |
| `.vender [item]` | Vende um item |
| `.equipamentos` | Seus equipamentos |
| `.forge [item]` | Forja um equipamento |
| `.dismantle [item]` | Desmonta equipamento |
| `.enchant [item]` | Encanta equipamento |
| `.reparar [item]` | Repara equipamento |
| `.receitas` | Lista de receitas de craft |
| `.materiais` | Seus materiais |
| `.ingredientes` | Ingredientes disponíveis |
| `.precos` | Tabela de preços |
| `.mercado` | Mercado entre jogadores |
| `.cmerc` | Central do mercado |

### Pets & Fazenda

| Comando | Descrição |
|---------|-----------|
| `.pets` | Seus pets |
| `.feed [pet]` | Alimenta seu pet |
| `.equippet [pet]` | Equipa um pet |
| `.unequippet` | Desequipa pet |
| `.renamepet [pet] [nome]` | Renomeia pet |
| `.petbattle @user` | Batalha de pets |
| `.petbet [valor]` | Aposta na batalha |
| `.plantar [semente]` | Planta uma semente |
| `.plantacao` | Visualiza sua plantação |
| `.colher` | Colhe plantação |
| `.coletar` | Coleta recursos |
| `.sementes` | Suas sementes |
| `.fish` | Pesca |
| `.mine` | Minera recursos |
| `.cook [receita]` | Cozinha uma receita |
| `.eat [comida]` | Come um alimento |
| `.vendercomida [item]` | Vende comida |

### Exploração & Batalhas

| Comando | Descrição |
|---------|-----------|
| `.explore` | Explora novas áreas |
| `.dungeon` / `.masmorra` | Entra em uma masmorra |
| `.arena` | Entra na arena PvP |
| `.desafio @user` | Desafia outro jogador |
| `.duelrpg @user` | Duela com outro jogador |
| `.bossrpg` | Batalha contra boss |
| `.guerra` | Participa de guerra de clãs |
| `.torneio` | Torneio competitivo |
| `.eventos` | Eventos especiais |
| `.tributos` | Sistema de tributos |

### Clãs & Social

| Comando | Descrição |
|---------|-----------|
| `.cla` | Informações do seu clã |
| `.criarcla [nome]` | Cria um clã |
| `.convidar @user` | Convida para o clã |
| `.aceitarconvite` | Aceita convite de clã |
| `.recusarconvite` | Recusa convite |
| `.expulsar @user` | Expulsa do clã |
| `.sair` | Sai do clã |
| `.familia` | Sistema de família |
| `.adotar @user` | Adota um usuário |
| `.adotaruser` | Solicita adoção |
| `.relacionamento` | Seu relacionamento RPG |
| `.namorar @user` | Namora no RPG |
| `.casar @user` | Casa no RPG |
| `.divorciar` | Divorcia no RPG |
| `.deserdar @user` | Desherda alguém |

### Propriedades & Ranking

| Comando | Descrição |
|---------|-----------|
| `.casa` | Sua casa |
| `.propriedades` | Suas propriedades |
| `.cprop [prop]` | Compra propriedade |
| `.cprops` | Lista propriedades |
| `.proteger [prop]` | Protege propriedade |
| `.boost` | Ativa boost |
| `.toprpg` | Ranking RPG global |
| `.ranklvl` | Ranking por nível |
| `.rankglobal` | Ranking global |
| `.desafiomensal` | Desafio mensal |
| `.desafiosemanal` | Desafio semanal |
| `.meusan` | Seus santos |

### Admin RPG (Dono)

| Comando | Descrição |
|---------|-----------|
| `.rpgadd [item] @user` | Adiciona item a jogador |
| `.rpgremove [item] @user` | Remove item |
| `.rpgadditem [item]` | Adiciona item ao sistema |
| `.rpgremoveitem [item]` | Remove item do sistema |
| `.rpgresetplayer @user` | Reseta jogador |
| `.rpgresetglobal` | Reseta tudo |
| `.rpgsetlevel @user [n]` | Define nível |
| `.rpgstats` | Estatísticas do RPG |
| `.resetgold` | Reseta ouro global |

---

## 🔧 Comandos — Ferramentas

| Comando | Descrição |
|---------|-----------|
| `.calc [expressão]` | Calculadora |
| `.clima [cidade]` | Clima atual |
| `.hora` | Hora atual |
| `.aniversario [data]` | Calcula aniversário |
| `.tradutor [idioma] [texto]` | Traduz texto |
| `.encurtalink [url]` | Encurta um link |
| `.qrcode [texto]` | Gera QR code |
| `.lerqr` | Lê um QR code |
| `.ssweb [url]` | Screenshot de site |
| `.upload` | Faz upload de arquivo |
| `.verificar` | Verifica um arquivo/link |
| `.nota [texto]` | Cria uma nota |
| `.notas` | Lista suas notas |
| `.lembrete [tempo] [msg]` | Cria um lembrete |
| `.meuslembretes` | Lista lembretes |
| `.apagalembrete [id]` | Remove lembrete |
| `.gerarnick` | Gera nicks aleatórios |
| `.estatisticas` | Estatísticas gerais |
| `.dicionario [palavra]` | Definição de palavra |
| `.anagrama [palavra]` | Gera anagramas |

---

## 🎬 Comandos — Alteradores de Mídia

### Vídeo

| Comando | Descrição |
|---------|-----------|
| `.cortarvideo [início] [fim]` | Corta um vídeo |
| `.fastvid [velocidade]` | Acelera o vídeo |
| `.videolento [velocidade]` | Desacelera o vídeo |
| `.videoreverso` | Inverte o vídeo |
| `.videoloop` | Cria loop do vídeo |
| `.videomudo` | Remove o áudio |
| `.videobw` | Converte para preto e branco |
| `.espelhar` | Espelha o vídeo |
| `.rotacionar [graus]` | Rotaciona o vídeo |
| `.upscale` | Aumenta a resolução |
| `.sepia` | Aplica filtro sépia |
| `.pretoebranco` | Converte imagem p&b |
| `.rmbg` | Remove fundo de imagem |

### Áudio

| Comando | Descrição |
|---------|-----------|
| `.cortaraudio [início] [fim]` | Corta um áudio |
| `.audiorapido [velocidade]` | Acelera o áudio |
| `.audiolento [velocidade]` | Desacelera o áudio |
| `.audioreverso` | Inverte o áudio |
| `.aumentarvolume [n]` | Aumenta volume |
| `.volumeboost` | Boost de volume |
| `.normalizar` | Normaliza o áudio |
| `.tomp3` | Converte para MP3 |
| `.bass` / `.bass2` / `.bass3` | Aumenta o grave |
| `.bassbn` | Bass boost intenso |
| `.reverb` | Adiciona reverb |
| `.eco` | Adiciona eco |
| `.pitch [n]` | Altera o pitch |
| `.speed [n]` | Altera velocidade |
| `.chorus` | Efeito chorus |
| `.flanger` | Efeito flanger |
| `.phaser` | Efeito phaser |
| `.tremolo` | Efeito tremolo |
| `.vibrato` | Efeito vibrato |
| `.overdrive` | Efeito overdrive |
| `.equalizar [config]` | Equalizador |
| `.lowpass [freq]` | Filtro passa-baixo |
| `.grave` | Realça graves |
| `.boyvoice` | Voz masculina |
| `.manvoice` | Voz grave |
| `.childvoice` | Voz de criança |
| `.vozcrianca` | Voz de criança BR |
| `.vozcaverna` | Voz cavernosa |
| `.reverse` | Reverte o áudio |
| `.reversobn` | Reverso estilo funk |

---

## 🔍 Comandos — Buscas e Consultas

| Comando | Descrição |
|---------|-----------|
| `.cpf [número]` | Consulta CPF |
| `.cnpj [número]` | Consulta CNPJ |
| `.cnh [número]` | Consulta CNH |
| `.placa [placa]` | Consulta placa de veículo |
| `.chassi [número]` | Consulta chassi |
| `.cep [cep]` | Consulta CEP |
| `.tel [número]` | Consulta telefone |
| `.telefone [número]` | Informações de telefone |
| `.email [email]` | Consulta email |
| `.nome [nome]` | Busca por nome |
| `.mae [nome]` | Busca por nome da mãe |
| `.pai [nome]` | Busca por nome do pai |
| `.parentes [cpf]` | Busca parentes |
| `.vizinhos [cep]` | Busca vizinhos |
| `.enderecos [cpf]` | Busca endereços |
| `.empregos [cpf]` | Busca empregos vinculados |
| `.funcionarios [cnpj]` | Lista funcionários |
| `.compras [cpf]` | Histórico de compras |
| `.vacinas [cpf]` | Histórico de vacinas |
| `.obito [cpf]` | Certidão de óbito |
| `.titulo [cpf]` | Título de eleitor |
| `.proprietario [placa]` | Proprietário do veículo |
| `.score [cpf]` | Score de crédito |
| `.internet [cpf]` | Serviços de internet vinculados |

---

## 👤 Comandos — Membros

| Comando | Descrição |
|---------|-----------|
| `.perfil` | Exibe seu perfil |
| `.meustatus` | Seu status atual |
| `.ping` | Latência do bot |
| `.statusbot` | Status do bot |
| `.topcmd` | Ranking de comandos mais usados |
| `.totalcmd` | Total de comandos executados |
| `.toprep` | Ranking de reputação |
| `.rep @user` | Dá reputação a alguém |
| `.inv` | Seu inventário |
| `.caixa` | Sua caixa de itens |
| `.presente @user` | Envia um presente |
| `.denunciar @user` | Denuncia um usuário |
| `.denuncias` | Lista denúncias |
| `.infoff` | Informações do grupo |
| `.mention` | Menciona alguém |
| `.gitbot` | Repositório do bot |
| `.zipbot` | Download do bot em .zip |
| `.role.vou` | Confirma presença |
| `.role.nvou` | Não irá |
| `.role.confirmados` | Lista confirmados |

---

## ✨ Recursos Especiais

### AntiGP (`.antigp`)
Faz o bot ignorar **todos os comandos** em um grupo específico sem sair do grupo. Apenas o dono continua usando o bot ali. Útil para pausar o bot em grupos problemáticos sem precisar removê-lo.

### SimSimi com Personalidades
Modo de auto-resposta por IA usando **Gemini 2.5 Flash Lite**. Cada grupo pode ter sua própria personalidade configurada de forma independente. Quando ativo, o bot responde automaticamente a todas as mensagens não-comandos.

### Sistema de Menu Personalizável
O design do menu é totalmente customizável via comandos (`.designmenu`, `.setheader`, `.setitem`, etc.) com persistência em `dados/database/dono/menuDesign.json`.

### Comandos Personalizados (`.addcmd`)
Crie comandos personalizados com suporte a parâmetros tipados, flags de permissão e respostas dinâmicas com placeholders como `{nome}`, `{grupo}`, `{velocidade}`.

### Sistema de Moderadores (`.addmod`)
Delegue permissões específicas a moderadores sem precisar torná-los admins do WhatsApp. Configure exatamente quais comandos cada moderador pode usar.

---

## 🔧 Solução de Problemas

| Problema | Solução |
|----------|---------|
| QR code expira rápido | Reinicie e escaneie mais rápido, ou use código de pareamento |
| Bot desconecta frequentemente | Verifique a conexão no Replit; reinicie o workflow |
| SimSimi / IA não responde | Confirme que `GEMINI_API_KEY` está nos Secrets do Replit |
| Comandos ignorados no grupo | Verifique se `.antigp` ou `.botoff` está ativo |
| Figurinha animada sem transparência | Verifique se os frames PNG têm fundo vermelho puro (#FF0000) |
| Comando não encontrado | Confirme o prefixo correto (padrão: `.`) |

---

## 📝 Notas Técnicas

- **Prefixo padrão:** `.`
- **Modelo de IA:** Gemini 2.5 Flash Lite
- **Processamento de mídia:** FFmpeg + ImageMagick v7 (`magick`)
- **Fontes disponíveis:** DejaVu Sans, Serif, Mono
- **API local:** `dados/local-api/` (stickers, downloads)
- **Banco de dados:** JSON por grupo em `dados/database/grupos/`
- **Total de comandos:** ~1.600+
