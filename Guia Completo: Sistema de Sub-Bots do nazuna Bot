# 🤖 Guia Completo: Sistema de Sub-Bots do nazuna Bot

## 📖 O que são Sub-Bots?

Sub-bots são **instâncias secundárias do nazuna Bot** que funcionam com números de WhatsApp diferentes do bot principal. Eles permitem que você:

- **Delegue o bot** para outras pessoas administrarem
- **Separe funcionalidades** por diferentes números
- **Escale o atendimento** com múltiplos bots simultaneamente
- **Venda ou alugue** instâncias do bot

Cada sub-bot:
- ✅ Tem seu **próprio número** de WhatsApp
- ✅ Tem seu **próprio dono** designado
- ✅ Funciona **independentemente** do bot principal
- ✅ Usa a **mesma base de código** mas com **configurações separadas**
- ✅ Tem **banco de dados separado** (grupos, usuários, etc)

---

## 🎯 Casos de Uso

### 1. **Vendendo Bots**
Você pode vender acesso ao bot para outras pessoas. Cada cliente terá seu próprio sub-bot com número exclusivo.

### 2. **Alugando Bots**
Similar à venda, mas com prazo definido. O cliente usa o bot pagando mensalmente.

### 3. **Equipe de Suporte**
Cada membro da equipe pode ter um sub-bot para atender diferentes grupos ou clientes.

### 4. **Testes**
Criar sub-bots para testar novas funcionalidades sem afetar o bot principal.

---

## 📋 Comandos Disponíveis

> **Nota**: Os comandos podem variar dependendo do prefixo configurado. Aqui usamos `/` como exemplo.

### Para o Dono Principal do Bot:

| Comando | Descrição | Uso |
|---------|-----------|-----|
| `/addsubbot` | Cria um novo sub-bot | Marque o número do futuro sub-bot e envie o comando |
| `/listarsubbots` | Lista todos os sub-bots cadastrados | `/listarsubbots` |
| `/removesubbot` | Remove um sub-bot | `/removesubbot [ID]` |
| `/conectarsubbot` | Reconecta um sub-bot desconectado | `/conectarsubbot [ID]` |

### Para o Dono do Sub-Bot:

| Comando | Descrição | Uso |
|---------|-----------|-----|
| `/gerarcodigo` | Gera código de pareamento para conectar | `/gerarcodigo` |

---

## 🚀 Como Criar um Sub-Bot

### Passo 1: Preparação

Antes de criar um sub-bot, você precisa ter:

1. **Número do WhatsApp** para o sub-bot (secundário, não use número principal!)
2. **Número do dono** do sub-bot (quem vai administrá-lo)
3. **Bot principal** já funcionando

### Passo 2: Criar o Sub-Bot

**Como dono principal do bot:**

1. No WhatsApp onde o **bot principal** está conectado
2. Marque (@) o **número que será o sub-bot**
3. Envie o comando:
   ```
   /addsubbot
   ```

**Exemplo:**
```
@5511987654321 /addsubbot
```

4. O bot vai responder algo como:

```
✅ SUB-BOT REGISTRADO COM SUCESSO!

📱 Número: 5511987654321
🆔 ID: `subbot_1738123456789_abc123def`
🔗 LID: `abc123@lid`

⚠️ IMPORTANTE:
O sub-bot foi registrado mas ainda não está ativo.

📲 Próximo passo:
O dono do sub-bot (5511987654321) deve usar o comando:
`/gerarcodigo`

Isso gerará o código de pareamento para conectar o sub-bot!
```

5. **Copie e guarde o ID** do sub-bot (você vai precisar para gerenciar)

### Passo 3: Gerar Código de Pareamento

**Como dono do sub-bot:**

1. No WhatsApp do **número do sub-bot** (5511987654321 no exemplo acima)
2. Envie mensagem para o **bot principal** com o comando:
   ```
   /gerarcodigo
   ```

3. O bot vai responder com:

```
🔑 CÓDIGO DE PAREAMENTO GERADO!

📱 Seu número: 5511987654321
🆔 ID: `subbot_1738123456789_abc123def`

🔢 CÓDIGO:
```ABCD-1234```

📲 Instruções:
1. Abra o WhatsApp no seu número
2. Vá em *Configurações > Aparelhos conectados*
3. Clique em *"Conectar um aparelho"*
4. Clique em *"Conectar com número de telefone"*
5. Digite o código acima

⏱️ Atenção: O código expira em alguns minutos!
🔄 Após parear, você será conectado automaticamente como sub-bot!
```

### Passo 4: Conectar o Sub-Bot

1. **No mesmo WhatsApp** do número do sub-bot:
2. Vá em **Configurações** > **Aparelhos conectados**
3. Clique em **"Conectar um aparelho"**
4. Clique em **"Conectar com número de telefone"**
5. Digite o código recebido (ex: `ABCD-1234`)
6. Aguarde a conexão

✅ **Pronto! O sub-bot está conectado e funcionando!**

---

## 📊 Gerenciando Sub-Bots

### Listar Todos os Sub-Bots

```
/listarsubbots
```

**Resposta:**
```
📋 SUB-BOTS CADASTRADOS (3)

1️⃣ ID: subbot_123...
   📱 Número: 5511987654321
   👤 Dono: 5511999999999
   🟢 Status: Conectado
   🕐 Última conexão: 30/01/2026 15:30

2️⃣ ID: subbot_456...
   📱 Número: 5511987651234
   👤 Dono: 5511988888888
   🔴 Status: Desconectado
   🕐 Última conexão: 29/01/2026 10:15

3️⃣ ID: subbot_789...
   📱 Número: 5511987659999
   👤 Dono: 5511977777777
   🟡 Status: Aguardando pareamento
   🕐 Criado em: 30/01/2026 14:00
```

### Ver Informações de um Sub-Bot

```
/infosubbot subbot_123...
```

### Remover um Sub-Bot

```
/removesubbot subbot_123...
```

⚠️ **Atenção**: Isso vai:
- Desconectar o sub-bot
- Apagar todos os dados do sub-bot (grupos, usuários, etc)
- Não é possível recuperar depois!

### Reconectar um Sub-Bot

Se um sub-bot desconectar:

```
/conectarsubbot subbot_123...
```

Ou o dono do sub-bot pode gerar novo código:

```
/gerarcodigo
```

---

## 🔧 Como Funciona Internamente

### Estrutura de Pastas

Quando você cria um sub-bot, o seguinte é criado:

```
nazuna-main/
└── dados/
    └── database/
        └── subbots/
            ├── subbots.json          ← Registro de todos os sub-bots
            └── subbot_123.../         ← Pasta do sub-bot
                ├── auth/              ← Credenciais/sessão WhatsApp
                │   └── creds.json
                └── database/          ← Banco de dados próprio
                    ├── config.json    ← Configurações do sub-bot
                    ├── grupos/        ← Grupos do sub-bot
                    ├── users/         ← Usuários do sub-bot
                    └── dono/          ← Configurações de admin
```

### Configuração Independente

Cada sub-bot tem seu próprio `config.json`:

```json
{
  "numerodono": "5511999999999",      ← Dono do sub-bot
  "nomedono": "Dono",
  "nomebot": "SubBot abc123de",
  "prefixo": "/",
  "lidowner": "abc123@lid",           ← LID do dono
  "botNumber": "5511987654321"        ← Número do sub-bot
}
```

---

## ⚠️ Avisos Importantes

### 1. **Use Números Secundários**
- ❌ **NÃO use seu número principal** como sub-bot
- ✅ Use números secundários ou chips de operadora

### 2. **Limites do WhatsApp**
- Cada número só pode estar conectado em **4 dispositivos** simultaneamente
- Não exagere na quantidade de sub-bots por servidor

### 3. **Recursos do Servidor**
- Cada sub-bot consome RAM e CPU
- Recomendado: **512MB de RAM** por sub-bot
- Se hospedar na Discloud: considere planos com mais recursos

### 4. **Backups**
- Faça backup da pasta `database/subbots/`
- Perder essa pasta = perder todos os sub-bots e dados

### 5. **Segurança**
- Não compartilhe IDs de sub-bots publicamente
- Não compartilhe códigos de pareamento
- Configure permissões adequadas

---

## 💡 Dicas e Boas Práticas

### ✅ **DO (Faça):**

1. **Organize os IDs**: Mantenha uma planilha com IDs, donos e números dos sub-bots
2. **Monitore status**: Verifique regularmente com `/listarsubbots`
3. **Comunique-se**: Mantenha contato com os donos dos sub-bots
4. **Documente**: Crie um manual para os donos dos sub-bots
5. **Teste antes**: Crie um sub-bot de teste antes de vender/alugar

### ❌ **DON'T (Não faça):**

1. Não crie sub-bots desnecessários (consomem recursos)
2. Não compartilhe acesso ao bot principal
3. Não use números temporários/descartáveis
4. Não esqueça de fazer backups
5. Não ignore sub-bots desconectados por muito tempo

---

## 🆘 Solução de Problemas

### ❌ "LID do sub-bot inválido!"
**Causa**: Você não marcou (@) o número corretamente
**Solução**: Use `@5511999999999 /criarsubbot` (marcando o número)

### ❌ "Já existe um sub-bot com este número!"
**Causa**: Este número já está cadastrado
**Solução**: Use `/listarsubbots` para ver, ou use outro número

### ❌ "Você não está cadastrado como sub-bot!"
**Causa**: O número que está usando `/gerarcodigo` não é um sub-bot registrado
**Solução**: O dono principal precisa criar o sub-bot primeiro com `/criarsubbot`

### ❌ Sub-bot não conecta
**Causa**: Código expirado ou erro na conexão
**Solução**: 
1. Gere novo código com `/gerarcodigo`
2. Use o código imediatamente
3. Verifique conexão com internet

### ❌ Sub-bot desconecta sozinho
**Causa**: Falta de recursos, internet instável, ou sessão corrompida
**Solução**:
1. Verifique recursos do servidor
2. Gere novo código e reconecte
3. Se persistir, remova e recrie o sub-bot

---

## 📝 Exemplo Completo

### Cenário: Você vai vender um bot para João

**1. João compra o bot e fornece:**
- Número do bot: `5511987654321`
- Número dele (dono): `5511999999999`

#### **Passo 1: Criar o Sub-Bot** (você, como dono principal)
```
@5511987654321 /addsubbot
```
*(Marque o número que será o sub-bot)**
- O ID gerado pelo bot
- Instruções de como conectar

**4. João (no WhatsApp 5511987654321):**
- Envia para seu bot principal:
```
/gerarcodigo
```
- Recebe o código: `ABCD-1234`

**5. João conecta:**
- Abre WhatsApp > Configurações > Aparelhos conectados
- Conectar com número de telefone
- Digita `ABCD-1234`

**6. Conectado!**
- João agora tem seu próprio bot funcionando
- Ele pode adicionar o bot em seus grupos
- Usar todos os comandos normalmente

---

## 🎉 Conclusão

O sistema de sub-bots do nazuna é **poderoso e flexível**, permitindo que você:

✅ Venda/alugue bots facilmente
✅ Gerencie múltiplas instâncias
✅ Delegue administração
✅ Escale seu negócio

**Lembre-se:**
- Use números secundários
- Monitore recursos
- Faça backups
- Documente tudo

**Boa sorte com seus sub-bots! 🚀**
