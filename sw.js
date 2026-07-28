self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("fetch", (e) => {
  // Mantém o app carregando os dados online normalmente
});
