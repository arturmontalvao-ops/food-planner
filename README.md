# 🍽️ Planejamento Alimentar Inteligente

Sistema profissional de planejamento alimentar com inteligência artificial, desenvolvido para Vercel com integração completa de APIs de IA.

## ✨ Funcionalidades

### 🔍 Descoberta de Alimentos/Receitas
- **Alimentos**: Descrição, curiosidades, valor nutricional, preços de mercado português, 3 sugestões de receitas
- **Receitas**: Origem histórica, ingredientes detalhados, instruções completas, custos por pessoa

### 📅 Planejamento Semanal Inteligente  
- Configuração completa: calorias, orçamento, pessoas, refeições/dia, tipo de cozinha, tempo
- Algoritmo de otimização que respeita rigorosamente orçamentos
- Lista de compras inteligente com preços reais
- Instruções detalhadas de preparação

### 🏠 Receitas com Ingredientes Disponíveis
- Liste até 7 ingredientes que tem em casa
- Receba 3 receitas criativas personalizadas
- Aproveitamento máximo dos ingredientes
- Custos calculados para 4 pessoas

## 🚀 Deploy no Vercel

### 1. Preparação
```bash
# Clone ou faça upload dos arquivos
git clone <seu-repo>
cd planejamento-alimentar-inteligente
```

### 2. Configuração das APIs
No Vercel Dashboard → Settings → Environment Variables, adicione:

```env
OPENAI_API_KEY=sk-your-openai-key-here
CLAUDE_API_KEY=your-claude-key-here  
NODE_ENV=production
```

**Como obter as chaves:**
- **OpenAI**: https://platform.openai.com/api-keys
- **Claude**: https://console.anthropic.com/

### 3. Deploy
```bash
# Instalar Vercel CLI (se necessário)
npm i -g vercel

# Deploy
vercel --prod
```

## 🛠️ Estrutura do Projeto

```
planejamento-alimentar-inteligente/
├── api/
│   └── index.js              # API principal com todos os prompts estruturados
├── public/
│   ├── index.html           # Frontend HTML atrativo
│   ├── css/
│   │   └── style.css        # Estilos profissionais com tema de alimentos
│   └── js/
│       └── app.js           # JavaScript do frontend
├── .env.example             # Template de configuração
├── .gitignore              # Arquivos a ignorar
├── package.json            # Dependências
├── vercel.json             # Configuração do Vercel
└── README.md               # Este arquivo
```

## 🤖 Prompts de IA Implementados

### Descoberta de Alimentos
```
Por favor, forneça informações detalhadas sobre o alimento "{nome}" seguindo EXATAMENTE esta estrutura:

1. DESCRIÇÃO DO ALIMENTO: Características e uso culinário
2. CURIOSIDADES: Fatos interessantes e históricos  
3. VALOR NUTRICIONAL (por 100g): Calorias, proteínas, carboidratos, etc.
4. PREÇO DE MERCADO (1kg): Preços atuais em Portugal
5. 3 SUGESTÕES DE RECEITAS: Nome, descrição, tempo
```

### Descoberta de Receitas  
```
Por favor, forneça informações completas sobre a receita "{nome}" seguindo EXATAMENTE esta estrutura:

1. ORIGEM HISTÓRICA: História e contexto cultural
2. INGREDIENTES E CONFECÇÃO: Lista completa e instruções detalhadas
3. CUSTO PARA 4 PESSOAS: Breakdown detalhado de custos
```

### Planejamento Semanal
```
Crie um plano alimentar semanal personalizado com base nestas preferências:
- Calorias diárias, orçamento, pessoas, refeições/dia, etc.

REQUISITOS OBRIGATÓRIOS:
1. Respeitar RIGOROSAMENTE o orçamento definido
2. Atingir as calorias alvo (±50 calorias por dia)  
3. Incluir variedade nutricional adequada
4. Considerar o tempo de preparação disponível
5. Fornecer instruções detalhadas de confecção
```

### Receitas Caseiras
```
Com base nestes ingredientes disponíveis: {ingredientes}

Crie EXATAMENTE 3 receitas criativas e práticas que utilizem estes ingredientes.
Para cada receita, forneça: nome, ingredientes completos, instruções detalhadas, 
tempo, porções, custo estimado, dicas especiais.
```

## 🎨 Design e UX

- **Visual atrativo** com cores inspiradas em alimentos frescos
- **Totalmente responsivo** para todos os dispositivos  
- **Animações suaves** e transições elegantes
- **Ícones e emojis** para melhor usabilidade
- **Gradientes modernos** e sombras profissionais
- **Navegação intuitiva** por tabs

## ⚡ Performance

- **Edge computing** com Vercel Functions
- **Carregamento otimizado** de recursos
- **Fallbacks inteligentes** para APIs de IA
- **Respostas rápidas** e interface reativa

## 🔒 Segurança

- **Variáveis de ambiente** para chaves de API
- **Validação de entrada** em todos os endpoints
- **CORS configurado** corretamente
- **Tratamento de erros** robusto

## 🧪 Testando Localmente

```bash
# Instalar dependências
npm install

# Criar arquivo .env.local com suas chaves
cp .env.example .env.local
# Editar .env.local com suas chaves reais

# Executar localmente
vercel dev
```

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique se as chaves de API estão configuradas corretamente
2. Consulte os logs do Vercel Functions
3. Teste com dados diferentes para verificar consistência

## 🎯 Próximos Passos

- [ ] Sistema de autenticação de usuários
- [ ] Histórico de planos salvos  
- [ ] Exportação para PDF
- [ ] App móvel PWA
- [ ] Integração com APIs nutricionais reais
- [ ] Sistema de favoritos

---

**🌟 Desenvolvido com ❤️ e 🤖 IA para uma alimentação mais inteligente!**