// Caches the app after the first visit so it opens instantly and works offline.
// Pages are fetched network-first so updates you upload to GitHub show up right away.
const CACHE = 'little-learners-v2';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg', './assets/abc-bg.jpg'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => Promise.all(FILES.map(f => c.add(f).catch(() => {}))))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const keep = res => {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(e.request, copy));
    return res;
  };
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).then(keep).catch(() => caches.match(e.request).then(h => h || caches.match('./index.html'))));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(keep))
  );
});
