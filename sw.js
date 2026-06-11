const CACHE_NAME = 'perisquash-cache-v4';
const ASSETS = [
  './',
  'index.html',
  'css/styles.css',
  'js/main.js',
  'assets/images/logo-perisquash.png',
  'assets/images/logo-perisquash.webp',
  'assets/images/cancha-juego.jpg',
  'assets/images/cancha-juego.webp',
  'assets/images/cancha-clase.jpg',
  'assets/images/cancha-clase.webp',
  'assets/images/fachada.jpg',
  'assets/images/fachada.webp',
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600&display=optional'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing Old Cache', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
