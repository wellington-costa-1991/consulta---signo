/* global self */
const CACHE_NAME = "mapa-astral-cache-v1";
const ASSETS = ["./", "./index.html", "./manifest.json", "./sw.js"];

// Instala o Service Worker e guarda os arquivos no cache
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting()),
  );
});

// Limpa caches antigos quando o app atualiza
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }),
      );
    }),
  );
});

// Responde com os arquivos salvos se o usuário estiver sem internet
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    }),
  );
});
