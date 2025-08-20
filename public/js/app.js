// ===== CONFIGURAÇÃO GLOBAL =====
const API_BASE_URL = window.location.origin + '/api';

// Estado global da aplicação
const AppState = {
    currentSection: 'discover',
    isLoading: false,
    lastResults: null
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    showSection('discover');
});

function initializeApp() {
    console.log('🍽️ Planejamento Alimentar Inteligente - Inicializando...');
    
    // Verificar se API está online
    checkApiHealth();
    
    // Configurar animações de entrada
    animateHeroElements();
}

function setupEventListeners() {
    // Navegação por tabs
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const section = e.target.dataset.section;
            showSection(section);
        });
    });

    // Formulário de descoberta
    const discoverForm = document.getElementById('discover-form');
    if (discoverForm) {
        discoverForm.addEventListener('submit', handleDiscoverSubmit);
    }

    // Formulário de planejamento semanal
    const planForm = document.getElementById('plan-form');
    if (planForm) {
        planForm.addEventListener('submit', handlePlanSubmit);
    }

    // Formulário de receitas caseiras
    const homeForm = document.getElementById('home-form');
    if (homeForm) {
        homeForm.addEventListener('submit', handleHomeSubmit);
    }

    // Botão para adicionar ingredientes
    const addIngredientBtn = document.getElementById('add-ingredient');
    if (addIngredientBtn) {
        addIngredientBtn.addEventListener('click', addIngredientInput);
    }
}

// ===== NAVEGAÇÃO =====
function showSection(sectionName) {
    // Atualizar estado
    AppState.currentSection = sectionName;
    
    // Esconder todas as seções
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('section-hidden');
    });
    
    // Mostrar seção ativa
    const activeSection = document.getElementById(`section-${sectionName}`);
    if (activeSection) {
        activeSection.classList.remove('section-hidden');
    }
    
    // Atualizar botões de navegação
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
        if (button.dataset.section === sectionName) {
            button.classList.add('active');
        }
    });
    
    // Animação suave
    activeSection.style.opacity = '0';
    activeSection.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        activeSection.style.transition = 'all 0.5s ease';
        activeSection.style.opacity = '1';
        activeSection.style.transform = 'translateY(0)';
    }, 50);
}

// ===== DESCOBERTA DE ALIMENTOS/RECEITAS =====
async function handleDiscoverSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const search = formData.get('search');
    const type = formData.get('type');
    
    if (!search || !type) {
        showError('Por favor, preencha todos os campos');
        return;
    }
    
    try {
        showLoading('discover-results');
        
        const response = await fetch(`${API_BASE_URL}/discover`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search, type })
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayDiscoverResults(data.result, type);
        } else {
            showError(data.error || 'Erro ao processar solicitação');
        }
    } catch (error) {
        console.error('Erro na descoberta:', error);
        showError('Erro de conectividade. Tente novamente.');
    } finally {
        hideLoading();
    }
}

function displayDiscoverResults(result, type) {
    const resultsContainer = document.getElementById('discover-results');
    
    if (type === 'food') {
        resultsContainer.innerHTML = `
            <div class="result-card">
                <h3 class="result-title">🥗 ${result.name}</h3>
                
                <div class="result-section">
                    <h4>📝 Descrição</h4>
                    <p class="result-content">${result.description || 'Informação não disponível'}</p>
                </div>
                
                <div class="result-section">
                    <h4>🤔 Curiosidades</h4>
                    <p class="result-content">${result.curiosities || 'Curiosidades não disponíveis'}</p>
                </div>
                
                <div class="result-grid">
                    <div class="result-card">
                        <h4>📊 Valor Nutricional (100g)</h4>
                        ${result.nutrition ? `
                            <ul class="nutrition-list">
                                <li>🔥 Calorias: ${result.nutrition.calories || 'N/A'}</li>
                                <li>🥩 Proteínas: ${result.nutrition.protein || 'N/A'}</li>
                                <li>🌾 Carboidratos: ${result.nutrition.carbs || 'N/A'}</li>
                                <li>🥑 Gorduras: ${result.nutrition.fat || 'N/A'}</li>
                                <li>🌿 Fibra: ${result.nutrition.fiber || 'N/A'}</li>
                                <li>💊 Vitaminas: ${result.nutrition.vitamins || 'N/A'}</li>
                            </ul>
                        ` : '<p>Informação nutricional não disponível</p>'}
                    </div>
                    
                    <div class="result-card">
                        <h4>💰 Preço de Mercado</h4>
                        ${result.price ? `
                            <ul class="price-list">
                                <li>💵 Atual: ${result.price.current || 'N/A'}</li>
                                <li>📈 Variação: ${result.price.seasonal || 'N/A'}</li>
                                <li>📊 Comparação: ${result.price.comparison || 'N/A'}</li>
                            </ul>
                        ` : '<p>Informação de preços não disponível</p>'}
                    </div>
                </div>
                
                <div class="result-section">
                    <h4>👨‍🍳 Sugestões de Receitas</h4>
                    <div class="recipes-grid">
                        ${result.recipes ? result.recipes.map(recipe => `
                            <div class="recipe-card">
                                <h5>🍳 ${recipe.name}</h5>
                                <p>${recipe.description}</p>
                                <span class="recipe-time">⏰ ${recipe.time || 'Tempo não especificado'}</span>
                            </div>
                        `).join('') : '<p>Receitas não disponíveis</p>'}
                    </div>
                </div>
            </div>
        `;
    } else {
        // Resultados para receitas
        resultsContainer.innerHTML = `
            <div class="result-card">
                <h3 class="result-title">🍳 ${result.name}</h3>
                
                <div class="result-section">
                    <h4>📚 Origem Histórica</h4>
                    <p class="result-content">${result.history || 'História não disponível'}</p>
                </div>
                
                <div class="result-grid">
                    <div class="result-card">
                        <h4>🛒 Ingredientes</h4>
                        ${result.ingredients ? `
                            <ul class="ingredients-list">
                                ${result.ingredients.map(ing => `
                                    <li>${ing.item} - ${ing.quantity} (${ing.cost || 'Preço N/A'})</li>
                                `).join('')}
                            </ul>
                        ` : '<p>Lista de ingredientes não disponível</p>'}
                    </div>
                    
                    <div class="result-card">
                        <h4>💰 Custo Total</h4>
                        ${result.cost ? `
                            <ul class="cost-list">
                                <li>💵 Total: ${result.cost.total || 'N/A'}</li>
                                <li>👤 Por pessoa: ${result.cost.per_person || 'N/A'}</li>
                                <li>💡 Dicas: ${result.cost.tips || 'N/A'}</li>
                            </ul>
                        ` : '<p>Informação de custos não disponível</p>'}
                    </div>
                </div>
                
                <div class="result-section">
                    <h4>👨‍🍳 Instruções de Preparação</h4>
                    ${result.instructions ? `
                        <ol class="instructions-list">
                            ${result.instructions.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    ` : '<p>Instruções não disponíveis</p>'}
                    
                    ${result.timing ? `
                        <div class="timing-info">
                            <span class="timing-item">⏱️ Preparo: ${result.timing.prep || 'N/A'}</span>
                            <span class="timing-item">🔥 Cozimento: ${result.timing.cooking || 'N/A'}</span>
                            <span class="timing-item">⏰ Total: ${result.timing.total || 'N/A'}</span>
                            <span class="timing-item">📊 Dificuldade: ${result.difficulty || 'N/A'}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    // Animar entrada dos resultados
    animateResults(resultsContainer);
}

// ===== PLANEJAMENTO SEMANAL =====
async function handlePlanSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const preferences = {
        calories: formData.get('calories'),
        budget: formData.get('budget'),
        people: formData.get('people'),
        mealsPerDay: formData.get('mealsPerDay'),
        cuisine: formData.get('cuisine'),
        time: formData.get('time'),
        restrictions: formData.get('restrictions') || ''
    };
    
    try {
        showLoading('plan-results');
        
        const response = await fetch(`${API_BASE_URL}/plan-week`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(preferences)
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayPlanResults(data.plan);
        } else {
            showError(data.error || 'Erro ao gerar plano');
        }
    } catch (error) {
        console.error('Erro no planejamento:', error);
        showError('Erro de conectividade. Tente novamente.');
    } finally {
        hideLoading();
    }
}

function displayPlanResults(plan) {
    const resultsContainer = document.getElementById('plan-results');
    
    resultsContainer.innerHTML = `
        <div class="result-card">
            <h3 class="result-title">📅 Seu Plano Semanal Personalizado</h3>
            
            <div class="plan-summary">
                <h4>📊 Resumo do Plano</h4>
                <div class="summary-grid">
                    <div class="summary-item">
                        <span class="summary-label">👥 Pessoas:</span>
                        <span class="summary-value">${plan.people || 'N/A'}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">🍽️ Refeições/dia:</span>
                        <span class="summary-value">${plan.mealsPerDay || 'N/A'}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">💰 Orçamento:</span>
                        <span class="summary-value">${plan.budget || 'N/A'}€</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">🔥 Calorias/dia:</span>
                        <span class="summary-value">${plan.calories || 'N/A'} kcal</span>
                    </div>
                </div>
            </div>
            
            <div class="plan-content">
                ${plan.message ? `<p class="plan-message">${plan.message}</p>` : ''}
                ${plan.raw_response ? `
                    <div class="ai-response">
                        <h4>🤖 Resposta da IA</h4>
                        <div class="ai-content">${formatAIResponse(plan.raw_response)}</div>
                    </div>
                ` : ''}
            </div>
            
            <div class="plan-actions">
                <button class="btn btn-primary" onclick="downloadPlan()">
                    📥 Baixar Plano
                </button>
                <button class="btn btn-secondary" onclick="sharePlan()">
                    🔗 Partilhar
                </button>
            </div>
        </div>
    `;
    
    animateResults(resultsContainer);
}

// ===== RECEITAS CASEIRAS =====
async function handleHomeSubmit(e) {
    e.preventDefault();
    
    const ingredients = Array.from(document.querySelectorAll('.ingredient-input'))
        .map(input => input.value.trim())
        .filter(value => value.length > 0);
    
    if (ingredients.length === 0) {
        showError('Por favor, adicione pelo menos um ingrediente');
        return;
    }
    
    try {
        showLoading('home-results');
        
        const response = await fetch(`${API_BASE_URL}/home-recipes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients })
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayHomeResults(data.recipes, ingredients);
        } else {
            showError(data.error || 'Erro ao gerar receitas');
        }
    } catch (error) {
        console.error('Erro nas receitas:', error);
        showError('Erro de conectividade. Tente novamente.');
    } finally {
        hideLoading();
    }
}

function displayHomeResults(recipes, ingredients) {
    const resultsContainer = document.getElementById('home-results');
    
    resultsContainer.innerHTML = `
        <div class="result-card">
            <h3 class="result-title">🏠 Receitas com Seus Ingredientes</h3>
            
            <div class="ingredients-used">
                <h4>🛒 Ingredientes Utilizados</h4>
                <div class="ingredients-tags">
                    ${ingredients.map(ing => `<span class="ingredient-tag">${ing}</span>`).join('')}
                </div>
            </div>
            
            <div class="recipes-content">
                ${recipes.message ? `<p class="recipes-message">${recipes.message}</p>` : ''}
                ${recipes.raw_response ? `
                    <div class="ai-response">
                        <h4>🤖 Sugestões da IA</h4>
                        <div class="ai-content">${formatAIResponse(recipes.raw_response)}</div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    animateResults(resultsContainer);
}

// ===== UTILITÁRIOS =====
function addIngredientInput() {
    const container = document.getElementById('ingredients-container');
    const currentInputs = container.querySelectorAll('.ingredient-input');
    
    if (currentInputs.length >= 7) {
        showError('Máximo de 7 ingredientes permitido');
        return;
    }
    
    const newInput = document.createElement('div');
    newInput.className = 'form-group';
    newInput.innerHTML = `
        <input type="text" class="form-input ingredient-input" 
               placeholder="Ingrediente ${currentInputs.length + 1}">
        <button type="button" class="btn-remove" onclick="removeIngredient(this)">×</button>
    `;
    
    container.appendChild(newInput);
}

function removeIngredient(button) {
    button.parentElement.remove();
}

function showLoading(containerId) {
    AppState.isLoading = true;
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <p>Processando sua solicitação...</p>
        </div>
    `;
}

function hideLoading() {
    AppState.isLoading = false;
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <strong>⚠️ Erro:</strong> ${message}
        <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; font-size: 1.2rem; cursor: pointer;">×</button>
    `;
    
    document.querySelector('.container').insertBefore(errorDiv, document.querySelector('.content-section'));
    
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 5000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <strong>✅ Sucesso:</strong> ${message}
        <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; font-size: 1.2rem; cursor: pointer;">×</button>
    `;
    
    document.querySelector('.container').insertBefore(successDiv, document.querySelector('.content-section'));
    
    setTimeout(() => {
        if (successDiv.parentElement) {
            successDiv.remove();
        }
    }, 3000);
}

function formatAIResponse(response) {
    return response.split('\n').map(line => {
        line = line.trim();
        if (line.startsWith('##')) {
            return `<h4>${line.replace('##', '').trim()}</h4>`;
        }
        if (line.startsWith('#')) {
            return `<h3>${line.replace('#', '').trim()}</h3>`;
        }
        if (line.startsWith('-') || line.startsWith('*')) {
            return `<li>${line.substring(1).trim()}</li>`;
        }
        if (line.length > 0) {
            return `<p>${line}</p>`;
        }
        return '';
    }).join('');
}

function animateHeroElements() {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-stats');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function animateResults(container) {
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    setTimeout(() => {
        container.style.transition = 'all 0.5s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
}

async function checkApiHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}`);
        const data = await response.json();
        console.log('✅ API Status:', data.status);
    } catch (error) {
        console.warn('⚠️ API não está respondendo:', error.message);
    }
}

function downloadPlan() {
    showSuccess('Funcionalidade de download será implementada em breve!');
}

function sharePlan() {
    if (navigator.share) {
        navigator.share({
            title: 'Meu Plano Alimentar',
            text: 'Confira meu plano alimentar personalizado!',
            url: window.location.href
        });
    } else {
        showSuccess('Link copiado para a área de transferência!');
    }
}