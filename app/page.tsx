'use client';

import { useState, useEffect } from 'react';

// ===== TIPOS TYPESCRIPT =====
interface FoodResult {
  name: string;
  description: string;
  curiosities: string;
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
    vitamins: string;
  };
  price: {
    current: string;
    seasonal: string;
    comparison: string;
  };
  recipes: Array<{
    name: string;
    description: string;
    time: string;
  }>;
}

interface RecipeResult {
  name: string;
  history: string;
  ingredients: Array<{
    item: string;
    quantity: string;
    cost: string;
  }>;
  instructions: string[];
  timing: {
    prep: string;
    cooking: string;
    total: string;
  };
  difficulty: string;
  cost: {
    breakdown: string;
    total: string;
    per_person: string;
    tips: string;
  };
}

// ===== COMPONENTE PRINCIPAL =====
export default function PlanejamentoAlimentar() {
  const [currentSection, setCurrentSection] = useState<'discover' | 'plan' | 'home'>('discover');
  const [isLoading, setIsLoading] = useState(false);
  const [discoverResults, setDiscoverResults] = useState<any>(null);
  const [planResults, setPlanResults] = useState<any>(null);
  const [homeResults, setHomeResults] = useState<any>(null);
  const [ingredients, setIngredients] = useState<string[]>(['', '', '']);

  // ===== FUNÇÕES DA API =====
  const callAPI = async (endpoint: string, data: any) => {
    const response = await fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  };

  const handleDiscover = async (search: string, type: 'food' | 'recipe') => {
    setIsLoading(true);
    try {
      const result = await callAPI('discover', { search, type });
      setDiscoverResults(result);
    } catch (error) {
      console.error('Erro na descoberta:', error);
      alert('Erro ao processar solicitação. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlan = async (preferences: any) => {
    setIsLoading(true);
    try {
      const result = await callAPI('plan-week', preferences);
      setPlanResults(result);
    } catch (error) {
      console.error('Erro no planejamento:', error);
      alert('Erro ao gerar plano. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleHome = async (ingredientsList: string[]) => {
    const filteredIngredients = ingredientsList.filter(ing => ing.trim().length > 0);
    if (filteredIngredients.length === 0) {
      alert('Adicione pelo menos um ingrediente');
      return;
    }

    setIsLoading(true);
    try {
      const result = await callAPI('home-recipes', { ingredients: filteredIngredients });
      setHomeResults(result);
    } catch (error) {
      console.error('Erro nas receitas:', error);
      alert('Erro ao gerar receitas. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const addIngredient = () => {
    if (ingredients.length < 7) {
      setIngredients([...ingredients, '']);
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* ===== HEADER HERO ===== */}
      <header className="hero-header bg-gradient-to-r from-green-500 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-up">
            🍽️ Planejamento Alimentar Inteligente
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-95">
            Descubra, planeie e optimize a sua alimentação com controlo calórico e de custos usando inteligência artificial avançada
          </p>
          
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="text-center">
              <span className="block text-3xl font-bold text-yellow-300">1000+</span>
              <span className="text-sm opacity-90">Alimentos</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-bold text-yellow-300">500+</span>
              <span className="text-sm opacity-90">Receitas</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-bold text-yellow-300">95%</span>
              <span className="text-sm opacity-90">Satisfação</span>
            </div>
          </div>
        </div>
      </header>

      {/* ===== SEÇÃO DE DESTAQUE ===== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Como Funciona</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-6xl">🥗</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">🔍 Descobre o Alimento</h3>
                <p className="text-gray-600 mb-4">
                  Pesquise qualquer alimento ou receita e receba informações detalhadas com IA.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>✓ Descrição completa do alimento</li>
                  <li>✓ Curiosidades e história</li>
                  <li>✓ Valor nutricional detalhado</li>
                  <li>✓ Preços do mercado português</li>
                  <li>✓ 3 sugestões de receitas</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <span className="text-6xl">📅</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">📅 Planeia a Semana</h3>
                <p className="text-gray-600 mb-4">
                  Configure suas preferências e receba um plano alimentar semanal personalizado.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>✓ Controle calórico preciso</li>
                  <li>✓ Respeito rigoroso ao orçamento</li>
                  <li>✓ Refeições configuráveis (2-6 por dia)</li>
                  <li>✓ Lista de compras inteligente</li>
                  <li>✓ Instruções de preparação</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                <span className="text-6xl">🏠</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">🏠 O Que Tens em Casa</h3>
                <p className="text-gray-600 mb-4">
                  Liste seus ingredientes disponíveis e receba receitas criativas personalizadas.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>✓ Até 7 ingredientes</li>
                  <li>✓ 3 receitas criativas</li>
                  <li>✓ Aproveitamento máximo</li>
                  <li>✓ Custo por pessoa</li>
                  <li>✓ Instruções detalhadas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NAVEGAÇÃO POR TABS ===== */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-4 gap-4 flex-wrap">
            <button
              onClick={() => setCurrentSection('discover')}
              className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                currentSection === 'discover'
                  ? 'bg-gradient-to-r from-green-500 to-orange-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>🔍</span>
              <span>Descobre o Alimento</span>
            </button>
            <button
              onClick={() => setCurrentSection('plan')}
              className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                currentSection === 'plan'
                  ? 'bg-gradient-to-r from-green-500 to-orange-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>📅</span>
              <span>Planeia a Semana</span>
            </button>
            <button
              onClick={() => setCurrentSection('home')}
              className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                currentSection === 'home'
                  ? 'bg-gradient-to-r from-green-500 to-orange-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>🏠</span>
              <span>O Que Tens em Casa</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ===== CONTEÚDO PRINCIPAL ===== */}
      <main className="py-16">
        <div className="container mx-auto px-4">
          
          {/* SEÇÃO DESCOBERTA */}
          {currentSection === 'discover' && (
            <section className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                🔍 Descobre o Alimento/Receita
              </h2>
              
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const search = formData.get('search') as string;
                  const type = formData.get('type') as 'food' | 'recipe';
                  if (search && type) {
                    handleDiscover(search, type);
                  }
                }}>
                  <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                      🔍 O que deseja descobrir?
                    </label>
                    <input
                      type="text"
                      name="search"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                      placeholder="Ex: abacate, bacalhau à brás, quinoa..."
                      required
                    />
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                      🏷️ Tipo de pesquisa
                    </label>
                    <select
                      name="type"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                      required
                    >
                      <option value="">Selecione o tipo</option>
                      <option value="food">🥗 Alimento (informações nutricionais e preços)</option>
                      <option value="recipe">🍳 Receita (origem e modo de preparação)</option>
                    </select>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    {isLoading ? '🔄 Processando...' : '✨ Descobrir com IA'}
                  </button>
                </form>

                {/* Resultados da Descoberta */}
                {discoverResults && (
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">📋 Resultados:</h3>
                    <pre className="whitespace-pre-wrap text-sm bg-white p-4 rounded border overflow-auto max-h-96">
                      {JSON.stringify(discoverResults, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* SEÇÃO PLANEJAMENTO */}
          {currentSection === 'plan' && (
            <section className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                📅 Planeia a Semana
              </h2>
              
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const preferences = {
                    calories: formData.get('calories'),
                    budget: formData.get('budget'),
                    people: formData.get('people'),
                    mealsPerDay: formData.get('mealsPerDay'),
                    cuisine: formData.get('cuisine'),
                    time: formData.get('time'),
                    restrictions: formData.get('restrictions') || ''
                  };
                  handlePlan(preferences);
                }}>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-2">
                        🔥 Calorias diárias alvo
                      </label>
                      <select name="calories" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none" required>
                        <option value="">Selecione</option>
                        <option value="1200">1200 kcal (perda de peso)</option>
                        <option value="1500">1500 kcal (manutenção leve)</option>
                        <option value="1800">1800 kcal (manutenção)</option>
                        <option value="2000">2000 kcal (ativo)</option>
                        <option value="2500">2500 kcal (muito ativo)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-2">
                        💰 Orçamento semanal
                      </label>
                      <select name="budget" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none" required>
                        <option value="">Selecione</option>
                        <option value="50">50€ (económico)</option>
                        <option value="100">100€ (equilibrado)</option>
                        <option value="150">150€ (confortável)</option>
                        <option value="200">200€ (premium)</option>
                        <option value="250">250€ (luxo)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-2">
                        👥 Número de pessoas
                      </label>
                      <select name="people" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none" required>
                        <option value="">Selecione</option>
                        <option value="1">1 pessoa</option>
                        <option value="2">2 pessoas</option>
                        <option value="3">3 pessoas</option>
                        <option value="4">4 pessoas</option>
                        <option value="5">5 pessoas</option>
                        <option value="6">6 pessoas</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-2">
                        🍽️ Refeições por dia
                      </label>
                      <select name="mealsPerDay" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none" required>
                        <option value="">Selecione</option>
                        <option value="2">2 refeições</option>
                        <option value="3">3 refeições</option>
                        <option value="4">4 refeições (+ 1 lanche)</option>
                        <option value="5">5 refeições (+ 2 lanches)</option>
                        <option value="6">6 refeições (+ ceia)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-2">
                        🌍 Tipo de cozinha
                      </label>
                      <select name="cuisine" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none" required>
                        <option value="">Selecione</option>
                        <option value="portuguesa">🇵🇹 Portuguesa</option>
                        <option value="mediterranea">🫒 Mediterrânea</option>
                        <option value="italiana">🇮🇹 Italiana</option>
                        <option value="asiatica">🥢 Asiática</option>
                        <option value="vegetariana">🌱 Vegetariana</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-2">
                        ⏰ Tempo disponível
                      </label>
                      <select name="time" className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none" required>
                        <option value="">Selecione</option>
                        <option value="rapido">⚡ Rápido (até 30 min)</option>
                        <option value="medio">⏱️ Médio (30-60 min)</option>
                        <option value="demorado">🕒 Demorado (mais de 60 min)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                      🚫 Restrições alimentares (opcional)
                    </label>
                    <input
                      type="text"
                      name="restrictions"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                      placeholder="Ex: sem glúten, sem lactose, vegano..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    {isLoading ? '🔄 Gerando plano...' : '✨ Gerar Plano Semanal com IA'}
                  </button>
                </form>

                {/* Resultados do Planejamento */}
                {planResults && (
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">📋 Seu Plano Semanal:</h3>
                    <pre className="whitespace-pre-wrap text-sm bg-white p-4 rounded border overflow-auto max-h-96">
                      {JSON.stringify(planResults, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* SEÇÃO INGREDIENTES EM CASA */}
          {currentSection === 'home' && (
            <section className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                🏠 O Que Tens em Casa
              </h2>
              
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <p className="text-center text-gray-600 mb-8">
                  Liste até 7 ingredientes que tem em casa e receba 3 receitas criativas personalizadas pela IA
                </p>

                <div className="space-y-4 mb-8">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => updateIngredient(index, e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                        placeholder={`Ingrediente ${index + 1} (ex: tomate, cebola, alho...)`}
                      />
                      {index > 2 && (
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-center mb-8">
                  {ingredients.length < 7 && (
                    <button
                      type="button"
                      onClick={addIngredient}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      ➕ Adicionar Ingrediente
                    </button>
                  )}
                </div>
                
                <button
                  onClick={() => handleHome(ingredients)}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {isLoading ? '🔄 Criando receitas...' : '✨ Gerar Receitas com IA'}
                </button>

                {/* Resultados das Receitas */}
                {homeResults && (
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">👨‍🍳 Suas Receitas Criativas:</h3>
                    <pre className="whitespace-pre-wrap text-sm bg-white p-4 rounded border overflow-auto max-h-96">
                      {JSON.stringify(homeResults, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-8 mb-6 flex-wrap">
            <a href="#" className="hover:text-green-400 transition-colors">ℹ️ Sobre</a>
            <a href="#" className="hover:text-green-400 transition-colors">🔒 Privacidade</a>
            <a href="#" className="hover:text-green-400 transition-colors">📧 Contacto</a>
            <a href="#" className="hover:text-green-400 transition-colors">💻 GitHub</a>
          </div>
          
          <p className="mb-4 opacity-80">
            &copy; 2025 Planejamento Alimentar Inteligente.
          </p>
          <p className="font-bold text-lg">
            🌟 Coma bem, viva melhor!
          </p>
          <p className="text-sm opacity-60 mt-2">
            Desenvolvido com ❤️ e 🤖 IA para uma alimentação mais inteligente
          </p>
        </div>
      </footer>
    </div>
  );
}