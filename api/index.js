const cors = require('cors');

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://vercel.app', process.env.VERCEL_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Apply CORS middleware
function applyCors(req, res) {
  return new Promise((resolve, reject) => {
    cors(corsOptions)(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// ===== PROMPTS ESTRUTURADOS EXATAMENTE COMO SOLICITADO NO INÍCIO =====

const FOOD_DISCOVERY_PROMPT = (foodName) => `
Por favor, forneça informações detalhadas sobre o alimento "${foodName}" seguindo EXATAMENTE esta estrutura:

1. DESCRIÇÃO DO ALIMENTO:
   - Forneça uma descrição clara e concisa do alimento
   - Inclua origem, características físicas e uso culinário

2. CURIOSIDADES:
   - Apresente 2-3 curiosidades interessantes ou fatos históricos sobre este alimento
   - Inclua informações culturais ou tradicionais relevantes

3. VALOR NUTRICIONAL (por 100g):
   - Calorias
   - Proteínas (g)
   - Carboidratos (g)
   - Gorduras (g)
   - Fibra (g)
   - Vitaminas e minerais principais

4. PREÇO DE MERCADO (1kg):
   - Preço atual no mercado português em euros
   - Variação sazonal se aplicável
   - Comparação com produtos similares

5. 3 SUGESTÕES DE RECEITAS:
   - Nome da receita
   - Descrição breve da preparação (2-3 linhas)
   - Tempo de preparação estimado

IMPORTANTE: Use dados reais e precisos. Se não tiver certeza de alguma informação, indique claramente.

Formate a resposta em JSON com a seguinte estrutura:
{
  "name": "${foodName}",
  "description": "...",
  "curiosities": "...",
  "nutrition": {
    "calories": "...",
    "protein": "...",
    "carbs": "...",
    "fat": "...",
    "fiber": "...",
    "vitamins": "..."
  },
  "price": {
    "current": "...",
    "seasonal": "...",
    "comparison": "..."
  },
  "recipes": [
    {"name": "...", "description": "...", "time": "..."},
    {"name": "...", "description": "...", "time": "..."},
    {"name": "...", "description": "...", "time": "..."}
  ]
}
`;

const RECIPE_DISCOVERY_PROMPT = (recipeName) => `
Por favor, forneça informações completas sobre a receita "${recipeName}" seguindo EXATAMENTE esta estrutura:

1. ORIGEM HISTÓRICA:
   - História e origem da receita
   - Contexto cultural e tradicional
   - Evolução ao longo do tempo

2. INGREDIENTES E CONFECÇÃO:
   - Lista completa de ingredientes com quantidades precisas
   - Passo a passo detalhado da preparação
   - Tempo de preparação e cocção
   - Dificuldade (fácil/médio/difícil)

3. CUSTO PARA 4 PESSOAS:
   - Breakdown detalhado de custos por ingrediente
   - Custo total estimado em euros
   - Custo por pessoa
   - Dicas para economizar

IMPORTANTE: Use receitas autênticas e preços reais do mercado português.

Formate a resposta em JSON com a seguinte estrutura:
{
  "name": "${recipeName}",
  "history": "...",
  "ingredients": [
    {"item": "...", "quantity": "...", "cost": "..."}
  ],
  "instructions": [
    "Passo 1: ...",
    "Passo 2: ...",
    "..."
  ],
  "timing": {
    "prep": "...",
    "cooking": "...",
    "total": "..."
  },
  "difficulty": "...",
  "cost": {
    "breakdown": "...",
    "total": "...",
    "per_person": "...",
    "tips": "..."
  }
}
`;

const WEEKLY_PLANNING_PROMPT = (preferences) => `
Crie um plano alimentar semanal personalizado com base nestas preferências:

PREFERÊNCIAS DO UTILIZADOR:
- Calorias diárias: ${preferences.calories}
- Orçamento semanal: ${preferences.budget}€
- Número de pessoas: ${preferences.people}
- Refeições por dia: ${preferences.mealsPerDay}
- Tipo de cozinha: ${preferences.cuisine}
- Tempo disponível: ${preferences.time}
- Restrições alimentares: ${preferences.restrictions || 'Nenhuma'}

REQUISITOS OBRIGATÓRIOS:
1. Respeitar RIGOROSAMENTE o orçamento definido
2. Atingir as calorias alvo (±50 calorias por dia)
3. Incluir variedade nutricional adequada
4. Considerar o tempo de preparação disponível
5. Fornecer instruções detalhadas de confecção

Para cada dia da semana, forneça:
- Pequeno-almoço, almoço, jantar (+ lanches se aplicável)
- Ingredientes com quantidades exatas
- Instruções de preparação detalhadas
- Calorias por refeição
- Custo por refeição

Inclua também:
- Lista de compras agregada e organizada por categorias
- Resumo nutricional da semana
- Percentagem de utilização do orçamento
- Dicas de preparação e conservação

Formate em JSON estruturado para facilitar a apresentação.
`;

const HOME_INGREDIENTS_PROMPT = (ingredients) => `
Com base nestes ingredientes disponíveis: ${ingredients.join(', ')}

Crie EXATAMENTE 3 receitas criativas e práticas que utilizem estes ingredientes.

Para cada receita, forneça:
1. Nome atraente e descritivo
2. Lista completa de ingredientes (incluindo temperos básicos)
3. Instruções passo-a-passo detalhadas
4. Tempo de preparação
5. Porções que rende
6. Custo estimado para 4 pessoas
7. Dicas especiais ou variações

IMPORTANTE:
- Use TODOS os ingredientes fornecidos sempre que possível
- Se algum ingrediente não se adequar a uma receita, crie variações
- Sugira ingredientes adicionais básicos se necessário
- Foque em receitas práticas e saborosas

Formate a resposta em JSON estruturado.
`;

// ===== FUNÇÕES DE INTEGRAÇÃO COM IA =====

async function callOpenAI(prompt) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY não configurada');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em nutrição e culinária portuguesa. Forneça sempre informações precisas, práticas e baseadas em dados reais do mercado português.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callClaude(prompt) {
  if (!process.env.CLAUDE_API_KEY) {
    throw new Error('CLAUDE_API_KEY não configurada');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.CLAUDE_API_KEY,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `Você é um especialista em nutrição e culinária portuguesa. ${prompt}`
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

// Função principal para chamar IA (com fallback)
async function callAI(prompt) {
  try {
    // Tenta OpenAI primeiro
    if (process.env.OPENAI_API_KEY) {
      return await callOpenAI(prompt);
    }
    // Fallback para Claude
    if (process.env.CLAUDE_API_KEY) {
      return await callClaude(prompt);
    }
    throw new Error('Nenhuma API de IA configurada');
  } catch (error) {
    console.error('Erro na chamada da IA:', error);
    // Fallback para resposta mockada em caso de erro
    return getMockResponse(prompt);
  }
}

// Função de fallback com respostas mockadas
function getMockResponse(prompt) {
  if (prompt.includes('DESCRIÇÃO DO ALIMENTO')) {
    return JSON.stringify({
      name: "Alimento",
      description: "Descrição mockada do alimento para teste.",
      curiosities: "Curiosidades interessantes sobre o alimento.",
      nutrition: {
        calories: "100 kcal",
        protein: "5g",
        carbs: "15g",
        fat: "3g",
        fiber: "2g",
        vitamins: "Vitamina C, Potássio"
      },
      price: {
        current: "2.50€/kg",
        seasonal: "Varia entre 2€-3€",
        comparison: "Preço médio da categoria"
      },
      recipes: [
        {name: "Receita 1", description: "Preparação simples", time: "15 min"},
        {name: "Receita 2", description: "Preparação grelhada", time: "20 min"},
        {name: "Receita 3", description: "Preparação refogada", time: "10 min"}
      ]
    });
  }
  
  return JSON.stringify({
    message: "Resposta mockada - configure as APIs para integração real"
  });
}

// ===== ROTAS DA API =====

module.exports = async (req, res) => {
  await applyCors(req, res);

  const { method, url } = req;
  const pathname = new URL(url, `http://${req.headers.host}`).pathname;

  try {
    if (method === 'GET' && pathname === '/api') {
      return res.status(200).json({ 
        message: 'API do Planejamento Alimentar Inteligente',
        version: '1.0.0',
        status: 'online',
        endpoints: [
          'POST /api/discover - Descobrir alimentos e receitas',
          'POST /api/plan-week - Planejar semana alimentar',
          'POST /api/home-recipes - Receitas com ingredientes disponíveis'
        ]
      });
    }

    if (method === 'POST' && pathname === '/api/discover') {
      const { search, type } = req.body;

      if (!search || !type) {
        return res.status(400).json({
          success: false,
          error: 'Parâmetros "search" e "type" são obrigatórios'
        });
      }

      let prompt;
      if (type === 'food') {
        prompt = FOOD_DISCOVERY_PROMPT(search);
      } else if (type === 'recipe') {
        prompt = RECIPE_DISCOVERY_PROMPT(search);
      } else {
        return res.status(400).json({
          success: false,
          error: 'Tipo deve ser "food" ou "recipe"'
        });
      }

      const aiResponse = await callAI(prompt);
      
      try {
        const parsedResponse = JSON.parse(aiResponse);
        return res.status(200).json({
          success: true,
          result: parsedResponse
        });
      } catch (parseError) {
        return res.status(200).json({
          success: true,
          result: {
            name: search,
            raw_response: aiResponse
          }
        });
      }
    }

    if (method === 'POST' && pathname === '/api/plan-week') {
      const preferences = req.body;

      const prompt = WEEKLY_PLANNING_PROMPT(preferences);
      const aiResponse = await callAI(prompt);

      try {
        const parsedResponse = JSON.parse(aiResponse);
        return res.status(200).json({
          success: true,
          plan: parsedResponse
        });
      } catch (parseError) {
        return res.status(200).json({
          success: true,
          plan: {
            message: "Plano gerado com sucesso",
            raw_response: aiResponse
          }
        });
      }
    }

    if (method === 'POST' && pathname === '/api/home-recipes') {
      const { ingredients } = req.body;

      if (!ingredients || !Array.isArray(ingredients)) {
        return res.status(400).json({
          success: false,
          error: 'Lista de ingredientes é obrigatória'
        });
      }

      const prompt = HOME_INGREDIENTS_PROMPT(ingredients);
      const aiResponse = await callAI(prompt);

      try {
        const parsedResponse = JSON.parse(aiResponse);
        return res.status(200).json({
          success: true,
          recipes: parsedResponse
        });
      } catch (parseError) {
        return res.status(200).json({
          success: true,
          recipes: {
            message: "Receitas geradas com sucesso",
            raw_response: aiResponse
          }
        });
      }
    }

    // Rota não encontrada
    return res.status(404).json({
      success: false,
      error: 'Endpoint não encontrado'
    });

  } catch (error) {
    console.error('Erro na API:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
};