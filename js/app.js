// AppMedico - Lógica Principal e Roteamento Vanilla JS

const appContent = document.getElementById('app-content');

// --- Componentes ---

function renderHome() {
    let categoriesHtml = db.categories.map(cat => `
        <div onclick="router.navigate('category', '${cat.id}')" class="clean-card p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div class="${cat.color} p-3 rounded-full">
                <i class="ph ${cat.icon} text-3xl"></i>
            </div>
            <span class="text-sm font-semibold text-center text-slate-800 dark:text-slate-200">${cat.title}</span>
        </div>
    `).join('');

    let itemsHtml = db.videos.slice(0, 4).map(vid => `
        <div onclick="router.navigate('player', '${vid.id}')" class="clean-card overflow-hidden cursor-pointer flex flex-col mb-5">
            <!-- Thumbnail Exclusiva -->
            <div class="w-full h-40 bg-slate-100 dark:bg-slate-800 relative">
                <img src="${vid.image}" alt="${vid.title}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <div class="bg-black/50 backdrop-blur rounded-full w-12 h-12 flex items-center justify-center">
                        <i class="ph-fill ph-play text-white text-2xl"></i>
                    </div>
                </div>
            </div>
            <!-- Texto Explicativo Resumido na Thumbnail -->
            <div class="p-4 flex flex-col">
                <h3 class="font-bold text-base text-slate-800 dark:text-slate-100 mb-1">${vid.title}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">${vid.description}</p>
                <div class="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-3">
                    <span class="flex items-center gap-1"><i class="ph ph-eye"></i> ${vid.views}</span>
                    <span class="bg-primary/10 text-primary px-2 py-0.5 rounded-md font-medium"><i class="ph ph-video-camera"></i> Assistir</span>
                </div>
            </div>
        </div>
    `).join('');

    appContent.innerHTML = `
        <div class="fade-in px-4 pt-4 pb-24">
            <!-- Botão de Emergência SAMU -->
            <button onclick="window.location.href='tel:192'" class="clean-danger w-full text-white font-bold text-lg rounded-2xl p-4 flex items-center justify-center gap-3 mb-6 active:scale-95 transition-transform">
                <i class="ph-fill ph-phone-call text-3xl animate-pulse"></i>
                EMERGÊNCIA: LIGAR 192
            </button>

            <!-- Busca -->
            <div class="relative mb-8">
                <i class="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl"></i>
                <input type="text" placeholder="Buscar sintomas, ex: febre, corte..." class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full py-3 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-700 dark:text-slate-200">
            </div>

            <!-- Categorias -->
            <div class="mb-6">
                <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Navegar por Temas</h2>
                <div class="grid grid-cols-2 gap-4">
                    ${categoriesHtml}
                </div>
            </div>
            
            <!-- AdSense Placeholder -->
            <div class="ad-placeholder">
                Espaço para Anúncio (AdSense)
            </div>

            <!-- Destaques (Thumbnails com Texto) -->
            <div class="mt-6">
                <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Conteúdos recomendados</h2>
                <div class="flex flex-col">
                    ${itemsHtml}
                </div>
            </div>
        </div>
    `;
}

function renderPlayer(videoId) {
    const vid = db.videos.find(v => v.id === videoId);
    if (!vid) return router.navigate('home');

    const stepsHtml = vid.steps.map(step => `
        <li class="mb-2 text-slate-700 dark:text-slate-300 leading-relaxed">${step}</li>
    `).join('');

    // Sempre renderiza o vídeo agora
    const mediaHtml = `
        <div class="w-full aspect-video bg-black sticky top-0 z-0">
            <iframe class="w-full h-full" src="https://www.youtube.com/embed/${vid.youtubeId}?autoplay=1&modestbranding=1&rel=0" frameborder="0" allowfullscreen></iframe>
        </div>`;

    appContent.innerHTML = `
        <div class="fade-in bg-slate-50 dark:bg-slate-900 min-h-screen pb-10">
            <!-- Botão Voltar -->
            <div class="absolute top-4 left-4 z-10">
                <button onclick="router.navigate('home')" class="bg-black/50 backdrop-blur text-white p-2 rounded-full flex items-center justify-center hover:bg-black/70">
                    <i class="ph ph-caret-left text-xl"></i>
                </button>
            </div>

            <!-- Mídia -->
            ${mediaHtml}

            <!-- Detalhes do Vídeo -->
            <div class="p-5 -mt-4 relative bg-white dark:bg-slate-800 rounded-t-2xl z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] border-b border-slate-100 dark:border-slate-700">
                <div class="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-4"></div>
                <h1 class="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 leading-tight">${vid.title}</h1>
                
                <div class="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
                    <span class="flex items-center gap-1"><i class="ph ph-eye"></i> ${vid.views}</span>
                    <span class="flex items-center gap-1"><i class="ph ph-clock"></i> ${vid.duration}</span>
                </div>

                <!-- Botões de Ação -->
                <div class="flex gap-3 mb-2">
                    <button class="flex-1 bg-slate-100 dark:bg-slate-700 text-primary font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                        <i class="ph ph-download-simple text-xl"></i> Salvar Offline
                    </button>
                    <button class="w-12 h-12 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                        <i class="ph ph-share-network text-xl"></i>
                    </button>
                </div>
            </div>

            <!-- Texto Explicativo (Conforme solicitado na Fase 3) -->
            <div class="px-4 mt-4">
                <div class="clean-card p-5 border-l-4 border-l-primary">
                    <h3 class="font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
                        <i class="ph-fill ph-info text-primary text-xl"></i>
                        O que é isso?
                    </h3>
                    <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                        ${vid.description}
                    </p>
                </div>
            </div>

            <div class="px-4 mt-6">
                <!-- AdSense Placeholder Middle -->
                <div class="ad-placeholder !min-h-[50px] !my-0 mb-6">Anúncio (AdSense)</div>

                <div class="clean-card p-5">
                    <h3 class="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                        <i class="ph-fill ph-list-numbers text-primary text-xl"></i>
                        Passo a Passo Rápido
                    </h3>
                    <ul class="list-none text-sm space-y-2">
                        ${stepsHtml}
                    </ul>
                </div>
                
                <div class="mt-6 p-4 bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-xl">
                    <p class="text-xs text-blue-800 dark:text-slate-300 flex items-start gap-2">
                        <i class="ph-fill ph-warning-circle text-lg mt-0.5 text-primary"></i>
                        <strong>Aviso Médico:</strong> As informações contidas aqui não substituem avaliação médica profissional. Em caso de dúvidas graves, ligue 192.
                    </p>
                </div>
            </div>
        </div>
    `;
    window.scrollTo(0,0);
}

function renderCategory(categoryId) {
    const cat = db.categories.find(c => c.id === categoryId);
    if (!cat) return router.navigate('home');

    const catVideos = db.videos.filter(v => v.categoryId === categoryId);
    
    let itemsHtml = catVideos.map(vid => `
        <div onclick="router.navigate('player', '${vid.id}')" class="clean-card overflow-hidden cursor-pointer flex flex-col mb-5">
            <!-- Thumbnail Exclusiva -->
            <div class="w-full h-40 bg-slate-100 dark:bg-slate-800 relative">
                <img src="${vid.image}" alt="${vid.title}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <div class="bg-black/50 backdrop-blur rounded-full w-12 h-12 flex items-center justify-center">
                        <i class="ph-fill ph-play text-white text-2xl"></i>
                    </div>
                </div>
            </div>
            <!-- Texto Explicativo -->
            <div class="p-4 flex flex-col">
                <h3 class="font-bold text-base text-slate-800 dark:text-slate-100 mb-1">${vid.title}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">${vid.description}</p>
                <div class="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-3">
                    <span class="flex items-center gap-1"><i class="ph ph-eye"></i> ${vid.views}</span>
                    <span class="bg-primary/10 text-primary px-2 py-0.5 rounded-md font-medium"><i class="ph ph-video-camera"></i> Assistir</span>
                </div>
            </div>
        </div>
    `).join('');

    if(catVideos.length === 0) {
        itemsHtml = `<div class="text-center p-8 text-slate-500">Nenhum conteúdo encontrado nesta categoria.</div>`;
    }

    appContent.innerHTML = `
        <div class="fade-in bg-slate-50 dark:bg-slate-900 min-h-screen pb-10">
            <!-- Header Específico da Categoria -->
            <div class="bg-white dark:bg-slate-800 px-4 py-6 shadow-sm mb-6 rounded-b-3xl relative border-b border-slate-100 dark:border-slate-700">
                <button onclick="router.navigate('home')" class="absolute top-6 left-4 text-slate-500 dark:text-slate-400 hover:text-primary">
                    <i class="ph ph-caret-left text-2xl"></i>
                </button>
                <div class="flex flex-col items-center mt-2">
                    <div class="${cat.color} p-4 rounded-full mb-3">
                        <i class="ph ${cat.icon} text-4xl"></i>
                    </div>
                    <h1 class="text-2xl font-bold text-slate-800 dark:text-slate-100">${cat.title}</h1>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">${catVideos.length} conteúdos disponíveis</p>
                </div>
            </div>

            <!-- Lista de Vídeos -->
            <div class="px-4">
                ${itemsHtml}
            </div>
            
            <div class="px-4">
                <!-- AdSense Placeholder -->
                <div class="ad-placeholder mt-8">Espaço de Anúncio</div>
            </div>
        </div>
    `;
    window.scrollTo(0,0);
}

// --- Roteador Simples ---
const router = {
    navigate: function(route, param = null) {
        if(route === 'home') renderHome();
        else if(route === 'player') renderPlayer(param);
        else if(route === 'category') renderCategory(param);
        else renderHome();
    }
};

// --- Dark Mode Logic ---
function initDarkMode() {
    const toggleBtn = document.getElementById('darkModeToggle');
    const icon = document.getElementById('darkModeIcon');
    
    // Verifica a preferência do usuário armazenada ou a configuração do sistema
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        if(icon) { icon.classList.replace('ph-moon', 'ph-sun'); }
    } else {
        document.documentElement.classList.remove('dark');
        if(icon) { icon.classList.replace('ph-sun', 'ph-moon'); }
    }

    if(toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                icon.classList.replace('ph-sun', 'ph-moon');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                icon.classList.replace('ph-moon', 'ph-sun');
            }
        });
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    router.navigate('home');
});
