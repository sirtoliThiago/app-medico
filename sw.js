const CACHE_NAME = 'appmedico-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/data.js',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/@phosphor-icons/web'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o cache se encontrar, senão faz a requisição na rede
        return response || fetch(event.request);
      })
  );
});
