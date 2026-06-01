const CACHE = 'krwg-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './sw.js',
  './assets/krwg.css',
  './assets/krwg.js',
  './assets/graph.js',
  './assets/scene3d.js',
  './assets/scene-boot.js',
  './assets/giscus-config.js',
  './assets/icon.svg',
  './assets/portrait-placeholder.svg',
  './assets/og-spring.svg',
  './assets/og-summer.svg',
  './assets/og-autumn.svg',
  './assets/og-winter.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok && shouldCache(url.pathname)) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

function shouldCache(path) {
  return /\.(html|css|js|svg|webmanifest|jpg|jpeg|png|webp)$/.test(path) || path.endsWith('/');
}
