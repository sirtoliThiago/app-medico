// ================================================================
// HELPER DE ANÚNCIOS ADSENSE
// Substitua os data-ad-slot pelos IDs reais criados no painel AdSense
// Publisher ID: altere "ca-pub-XXXXXXXXXXXXXXXX" no index.html
// ================================================================
function adUnit(type = 'banner') {
    const slots = {
        banner:  '1111111111',  // ← substitua pelo slot real "appmedico-banner"
        infeed:  '2222222222',  // ← substitua pelo slot real "appmedico-infeed"
        player:  '3333333333',  // ← substitua pelo slot real "appmedico-player"
    };
    const classes = {
        banner: 'ad-banner',
        infeed: 'ad-infeed',
        player: 'ad-player',
    };
    return `
        <div class="ad-wrap px-4">
            <ins class="adsbygoogle ${classes[type]}"
                style="display:block; width:100%;"
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot="${slots[type]}"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});<\/script>
        </div>`;
}

// ================================================================

const appContent = document.getElementById('app-content');


// --- Helpers ---
function cardHtml(vid) {
    return `
        <div onclick="router.navigate('player', '${vid.id}')" class="clean-card overflow-hidden cursor-pointer flex flex-col mb-5 hover:shadow-md transition-shadow">
            <div class="w-full h-44 bg-slate-100 dark:bg-slate-800 relative">
                <img src="${vid.image}" alt="${vid.title}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <div class="bg-black/50 backdrop-blur rounded-full w-12 h-12 flex items-center justify-center">
                        <i class="ph-fill ph-play text-white text-2xl"></i>
                    </div>
                </div>
            </div>
            <div class="p-4 flex flex-col">
                <h3 class="font-bold text-base text-slate-800 dark:text-slate-100 mb-1">${vid.title}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">${vid.description}</p>
                <div class="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-3">
                    <span class="flex items-center gap-1"><i class="ph ph-eye"></i> ${vid.views}</span>
                    <span class="bg-primary/10 text-primary px-2 py-0.5 rounded-md font-medium"><i class="ph ph-video-camera"></i> Assistir</span>
                </div>
            </div>
        </div>
    `;
}

// --- Views ---
function renderHome() {
    const categoriesHtml = db.categories.map(cat => `
        <div onclick="router.navigate('category', '${cat.id}')"
            class="clean-card cat-card slide-up p-4 flex flex-col items-center justify-center gap-2 cursor-pointer">
            <div class="${cat.color} p-3 rounded-2xl shadow-sm">
                <i class="ph ${cat.icon} text-3xl"></i>
            </div>
            <span class="text-sm font-semibold text-center text-slate-700 dark:text-slate-200 leading-tight">${cat.title}</span>
        </div>
    `).join('');

    const allItemsHtml = db.videos.map(vid => cardHtml(vid)).join('');

    appContent.innerHTML = `
        <div class="fade-in pb-28">

            <!-- HERO SECTION com imagem animada de saúde (Ken Burns) -->
            <div class="hero-section">
                <img src="assets/images/health_hero_bg.png" alt="Saúde e Bem-estar" class="hero-bg hero-ken-burns">
                <div class="hero-overlay"></div>
                <div class="hero-content flex flex-col items-center text-center gap-4">
                    <!-- Anel de Respiração -->
                    <div class="breathe-ring mb-1">
                        <div class="bg-white/25 rounded-full p-4">
                            <i class="ph-fill ph-heartbeat text-4xl text-white drop-shadow-lg"></i>
                        </div>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-white drop-shadow-md">Cuidando de você</h2>
                        <p class="text-sm text-white/80 mt-1">Informações médicas rápidas e confiáveis</p>
                    </div>
                    <!-- Botão de Emergência -->
                    <button onclick="window.location.href='tel:192'"
                        class="clean-danger w-full text-white font-bold text-base rounded-2xl p-4 flex items-center justify-center gap-3 active:scale-95 transition-transform mt-1">
                        <i class="ph-fill ph-phone-call text-2xl animate-pulse"></i>
                        EMERGÊNCIA — LIGAR 192
                    </button>
                </div>
            </div>

            <!-- Busca Funcional -->
            <div class="relative mb-6 px-4">
                <i class="ph ph-magnifying-glass absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 text-xl"></i>
                <input id="searchInput" type="text" placeholder="Buscar: febre, corte, convulsão..."
                    class="w-full bg-white/70 dark:bg-slate-800/70 backdrop-blur border border-white/80 dark:border-slate-700 rounded-full py-3 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-700 dark:text-slate-200 transition-all">
            </div>

            <!-- Resultado da Busca -->
            <div id="searchResults" class="hidden mb-6 px-4">
                <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Resultados da busca</h2>
                <div id="searchList"></div>
            </div>

            <!-- Conteúdo principal -->
            <div id="mainContent">
                <!-- Categorias -->
                <div class="mb-6 px-4">
                    <h2 class="text-base font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-4">Navegar por Temas</h2>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">${categoriesHtml}</div>
                </div>

                ${adUnit('banner')}

                <!-- Todos os conteúdos -->
                <div class="mt-2 px-4">
                    <h2 class="text-base font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-4">Todos os Conteúdos</h2>
                    <div id="all-items-list">${allItemsHtml}</div>
                </div>

                ${adUnit('banner')}
            </div>
        </div>
    `;

    // Busca funcional
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchList = document.getElementById('searchList');
    const mainContent = document.getElementById('mainContent');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        if (query.length < 2) {
            searchResults.classList.add('hidden');
            mainContent.classList.remove('hidden');
            return;
        }
        const filtered = db.videos.filter(v =>
            v.title.toLowerCase().includes(query) ||
            v.description.toLowerCase().includes(query)
        );
        mainContent.classList.add('hidden');
        searchResults.classList.remove('hidden');
        if (filtered.length === 0) {
            searchList.innerHTML = `<p class="text-center text-slate-500 dark:text-slate-400 py-8">Nenhum resultado para "<strong>${query}</strong>"</p>`;
        } else {
            searchList.innerHTML = filtered.map(v => cardHtml(v)).join('');
        }
    });
}


function renderPlayer(videoId) {
    const vid = db.videos.find(v => v.id === videoId);
    if (!vid) return router.navigate('home');

    const stepsHtml = vid.steps.map(step => `
        <li class="flex items-start gap-3 py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
            <span class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">${step}</span>
        </li>
    `).join('');

    // Player com fallback automático se o vídeo for bloqueado
    const mediaHtml = `
        <div class="w-full aspect-video bg-slate-900 sticky top-0 z-0 relative" id="videoWrapper">
            <iframe id="yt-iframe" class="w-full h-full"
                src="https://www.youtube.com/embed/${vid.youtubeId}?modestbranding=1&rel=0"
                frameborder="0" allowfullscreen allow="autoplay">
            </iframe>
            <!-- Overlay de fallback: sempre mostramos um botão de abertura direta -->
            <a href="https://www.youtube.com/watch?v=${vid.youtubeId}" target="_blank"
                class="absolute bottom-3 right-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-lg transition-colors z-10">
                <i class="ph-fill ph-youtube-logo text-base"></i>
                Abrir no YouTube
            </a>
        </div>`;

    appContent.innerHTML = `
        <div class="fade-in bg-slate-50 dark:bg-slate-900 min-h-screen pb-10">
            <div class="absolute top-4 left-4 z-10">
                <button onclick="router.navigate('home')" class="bg-black/50 backdrop-blur text-white p-2 rounded-full flex items-center justify-center hover:bg-black/70">
                    <i class="ph ph-caret-left text-xl"></i>
                </button>
            </div>

            ${mediaHtml}

            <!-- Cabeçalho do conteúdo -->
            <div class="p-5 -mt-4 relative bg-white dark:bg-slate-800 rounded-t-2xl z-10 shadow-sm border-b border-slate-100 dark:border-slate-700">
                <div class="w-12 h-1.5 bg-slate-200 dark:bg-slate-600 rounded-full mx-auto mb-4"></div>
                <h1 class="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 leading-tight">${vid.title}</h1>
                <div class="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-5">
                    <span class="flex items-center gap-1"><i class="ph ph-eye"></i> ${vid.views}</span>
                    <span class="flex items-center gap-1"><i class="ph ph-clock"></i> ${vid.duration}</span>
                </div>
                <div class="flex gap-3">
                    <button class="flex-1 bg-slate-100 dark:bg-slate-700 text-primary font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                        <i class="ph ph-download-simple text-xl"></i> Salvar Offline
                    </button>
                    <button id="shareBtn" class="w-12 h-12 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                        <i class="ph ph-share-network text-xl"></i>
                    </button>
                </div>
            </div>

            <!-- Texto Explicativo -->
            <div class="px-4 mt-4">
                <div class="clean-card p-5 border-l-4 border-l-primary">
                    <h3 class="font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
                        <i class="ph-fill ph-info text-primary text-xl"></i>
                        O que é isso?
                    </h3>
                    <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">${vid.description}</p>
                </div>
            </div>

            <div class="px-4 mt-4">
                ${adUnit('player')}

                <div class="clean-card p-5 mb-6">
                    <h3 class="font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                        <i class="ph-fill ph-list-numbers text-primary text-xl"></i>
                        Passo a Passo Rápido
                    </h3>
                    <ul class="list-none">${stepsHtml}</ul>
                </div>

                <div class="p-4 bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-xl">
                    <p class="text-xs text-blue-800 dark:text-slate-300 flex items-start gap-2">
                        <i class="ph-fill ph-warning-circle text-lg mt-0.5 text-primary flex-shrink-0"></i>
                        <span><strong>Aviso Médico:</strong> As informações aqui não substituem avaliação médica profissional. Em emergências graves, ligue 192 (SAMU).</span>
                    </p>
                </div>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);

    // Botão de compartilhar funcional
    const shareBtn = document.getElementById('shareBtn');
    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: `AppMedico — ${vid.title}`,
            text: vid.description,
            url: window.location.href
        };
        if (navigator.share) {
            try { await navigator.share(shareData); }
            catch(e) { /* cancelado */ }
        } else {
            navigator.clipboard.writeText(window.location.href);
            shareBtn.innerHTML = '<i class="ph ph-check text-xl text-green-500"></i>';
            setTimeout(() => { shareBtn.innerHTML = '<i class="ph ph-share-network text-xl"></i>'; }, 2000);
        }
    });
}

function renderCategory(categoryId) {
    const cat = db.categories.find(c => c.id === categoryId);
    if (!cat) return router.navigate('home');
    const catVideos = db.videos.filter(v => v.categoryId === categoryId);

    const itemsHtml = catVideos.length > 0
        ? catVideos.map(vid => cardHtml(vid)).join('')
        : `<div class="text-center p-8 text-slate-500 dark:text-slate-400"><i class="ph ph-smiley-sad text-4xl mb-2 block"></i>Nenhum conteúdo encontrado.</div>`;

    appContent.innerHTML = `
        <div class="fade-in bg-slate-50 dark:bg-slate-900 min-h-screen pb-10">
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
            ${adUnit('banner')}
            <div class="px-4">${itemsHtml}</div>
            ${adUnit('infeed')}
        </div>
    `;
    window.scrollTo(0, 0);
}

// --- Roteador ---
const router = {
    navigate: function(route, param = null) {
        // Atualiza o hash da URL para suporte ao botão voltar
        if (route === 'home') window.location.hash = '';
        else if (param) window.location.hash = `${route}/${param}`;
        else window.location.hash = route;
        _render(route, param);
    }
};

function _render(route, param) {
    if (route === 'home') renderHome();
    else if (route === 'player') renderPlayer(param);
    else if (route === 'category') renderCategory(param);
    else renderHome();
    updateNavActive(route, param);
}

// Suporte ao botão voltar do celular via hash
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return _render('home', null);
    const [route, param] = hash.split('/');
    _render(route, param || null);
});

// --- Dark Mode ---
function initDarkMode() {
    const toggleBtn = document.getElementById('darkModeToggle');
    const icon = document.getElementById('darkModeIcon');
    const isDark = localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
        document.documentElement.classList.add('dark');
        if (icon) icon.classList.replace('ph-moon', 'ph-sun');
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const dark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', dark ? 'dark' : 'light');
            if (icon) {
                icon.classList.toggle('ph-moon', !dark);
                icon.classList.toggle('ph-sun', dark);
            }
        });
    }
}

// --- Navegação Inferior (botões por ID) ---
function initBottomNav() {
    const navMap = {
        'nav-home':      () => router.navigate('home'),
        'nav-search':    () => {
            router.navigate('home');
            setTimeout(() => document.getElementById('searchInput')?.focus(), 350);
        },
        'nav-socorros':  () => router.navigate('category', 'primeiros-socorros'),
        'nav-natural':   () => router.navigate('category', 'medicina-alternativa'),
    };

    Object.entries(navMap).forEach(([id, fn]) => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', fn);
    });
}

// Atualiza o botão ativo na nav
function updateNavActive(route, param) {
    const activeMap = {
        'home': 'nav-home',
        'search': 'nav-search',
        'category/primeiros-socorros': 'nav-socorros',
        'category/medicina-alternativa': 'nav-natural',
    };
    const key = param ? `${route}/${param}` : route;
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-primary');
        btn.classList.add('text-slate-400', 'dark:text-slate-500');
    });
    const activeId = activeMap[key] || 'nav-home';
    const activeBtn = document.getElementById(activeId);
    if (activeBtn) {
        activeBtn.classList.add('text-primary');
        activeBtn.classList.remove('text-slate-400', 'dark:text-slate-500');
    }
}

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    // Retoma a rota pelo hash se existir
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const [route, param] = hash.split('/');
        _render(route, param || null);
    } else {
        renderHome();
    }
    initBottomNav();
});
