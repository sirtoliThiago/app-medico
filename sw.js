const CACHE_NAME = 'appmedico-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/data.js',
  './manifest.json',
  './assets/images/icon-512.png',
  './assets/images/cha_ansiedade.png',
  './assets/images/compressa_ervas.png',
  './assets/images/convulsao.png',
  './assets/images/corte.png',
  './assets/images/diarreia.png',
  './assets/images/engasgo.png',
  './assets/images/enxaqueca.png',
  './assets/images/febre.png',
  './assets/images/first_aid.png',
  './assets/images/health_hero_bg.png',
  './assets/images/hero_bg.png',
  './assets/images/panico.png',
  './assets/images/pediatria.png',
  './assets/images/queimadura.png',
  './assets/images/rcp.png',
  './assets/images/respiracao.png',
  './assets/images/sangramento_nasal.png',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/@phosphor-icons/web'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request)
          .then(networkResponse => {
            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
          });
      })
  );
});
