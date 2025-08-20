'use client';

import { useState } from 'react';

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
        </div>
      </header>

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
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-black placeholder-gray-400"
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
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-black"
                      required
                    >
                      <option value="">Selecione o tipo</option>
                      <option value="food">🥗 Alimento</option>
                      <option value="recipe">🍳 Receita</option>
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
                  Liste até 7 ingredientes
                </p>

                <div className="space-y-4 mb-8">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => updateIngredient(index, e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-black placeholder-gray-400"
                        placeholder={`Ingrediente ${index + 1}`}
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
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
