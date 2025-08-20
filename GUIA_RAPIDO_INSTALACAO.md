# 🚀 GUIA RÁPIDO - INSTALAÇÃO NO VERCEL

## ⚡ 3 Passos Simples

### 1. 📤 Upload do Projeto
- Baixe o arquivo ZIP: `planejamento-alimentar-vercel.zip`
- No Vercel Dashboard: **"Import Project"** → **"Upload ZIP"**
- Ou conecte seu repositório GitHub com estes arquivos

### 2. 🔑 Configurar APIs
No Vercel Dashboard → **Settings** → **Environment Variables**, adicione:

```
OPENAI_API_KEY = sk-sua-chave-openai-aqui
CLAUDE_API_KEY = sua-chave-claude-aqui
NODE_ENV = production
```

**📋 Como obter as chaves:**
- **OpenAI**: https://platform.openai.com/api-keys (crie conta → gere chave)
- **Claude**: https://console.anthropic.com/ (opcional, backup da OpenAI)

### 3. 🎉 Deploy
- Clique **"Deploy"** no Vercel
- Aguarde o build (1-2 minutos)
- Acesse sua URL: `https://seu-projeto.vercel.app`

## ✅ Verificação

Teste estas URLs após deploy:
- `https://seu-projeto.vercel.app` → Página principal
- `https://seu-projeto.vercel.app/api` → Status da API

## 🎯 Funcionalidades Ativas

✅ **Descoberta**: Pesquisar alimentos/receitas com IA  
✅ **Planejamento**: Planos semanais personalizados  
✅ **Receitas**: Sugestões com ingredientes disponíveis  
✅ **Design**: Interface profissional e responsiva  
✅ **Prompts**: Estruturados exatamente como solicitado  

## 🆘 Resolução de Problemas

**❌ API não responde?**
- Verifique se `OPENAI_API_KEY` está configurada
- Teste a chave no console da OpenAI
- Veja logs no Vercel Dashboard → Functions

**❌ Interface não carrega?**
- Cache do navegador: Ctrl+F5 (força reload)
- Verifique se arquivos estão na pasta `/public`

**❌ Prompts não funcionam?**
- Todas as estruturas estão implementadas no `/api/index.js`
- Fallbacks mockados funcionam mesmo sem APIs

## 💡 Dicas

- **Custo**: OpenAI GPT-4o-mini custa ~$0.15/1000 requests
- **Backup**: Claude API configurada como alternativa
- **Logs**: Use Vercel Dashboard para debugging
- **Domínio**: Configure domínio personalizado nas configurações

---
**🍽️ Seu sistema de planejamento alimentar estará online em minutos!**