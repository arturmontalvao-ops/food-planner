'use client';

import { useState } from 'react';

export default function PlanejamentoAlimentar() {
  const [ingredients, setIngredients] = useState<string[]>(['', '', '']);

  const addIngredient = () => {
    if (ingredients.length < 7) setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, value: string) => {
    const next = [...ingredients];
    next[index] = value;
    setIngredients(next);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      <header className="bg-gradient-to-r from-green-500 to-orange-500 text-white py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">🍽️ Planejamento Alimentar Inteligente</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Descubra, planeie e optimize a sua alimentação
        </p>
      </header>

      <main className="py-16 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          🏠 O Que Tens em Casa
        </h2>

        {/* Cartão com “hard fix” de cores */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto force-input-colors">
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
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl 
                             focus:border-green-500 focus:outline-none 
                             text-black placeholder-gray-500 bg-white"
                  style={{
                    color: '#111827',
                    WebkitTextFillColor: '#111827',
                    backgroundColor: '#ffffff',
                    caretColor: '#111827',
                  }}
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

          {ingredients.length < 7 && (
            <button
              type="button"
              onClick={addIngredient}
              className="px-6 py-3 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition-colors"
            >
              ➕ Adicionar Ingrediente
            </button>
          )}
        </div>

        {/* Exemplo de SELECT corrigido (no mesmo cartão com force-input-colors) */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto mt-12 force-input-colors">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">⚙️ Exemplo Select</h3>
          <select
            defaultValue=""
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl 
                       focus:border-green-500 focus:outline-none 
                       text-gray-900 bg-white"
            style={{
              color: '#111827',
              WebkitTextFillColor: '#111827',
              backgroundColor: '#ffffff',
              caretColor: '#111827',
            }}
          >
            <option value="" disabled>Selecione</option>
            <option value="1200">1200 kcal (perda de peso)</option>
            <option value="1500">1500 kcal (manutenção leve)</option>
            <option value="1800">1800 kcal (manutenção)</option>
            <option value="2000">2000 kcal (ativo)</option>
            <option value="2500">2500 kcal (muito ativo)</option>
          </select>
        </div>
      </main>
    </div>
  );
}
