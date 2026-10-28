// Little Learners offline support.
// First visit (online): every file is saved on the device. After that the app opens and plays with no internet.
// When online, the newest version is used (so updates from GitHub show up); if the network is slow or gone, the saved copy is used.
const CACHE = 'little-learners-v7';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-180.png', './icon-192.png', './icon-512.png', './assets/abc-bg.jpg'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => Promise.all(FILES.map(f => c.add(f).catch(() => {}))))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
    const list = await self.clients.matchAll();
    list.forEach(c => c.postMessage('offline-ready'));
  })());
});

const wait = ms => new Promise((_, rej) => setTimeout(rej, ms));

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const keep = res => {
    if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  };
  if (req.mode === 'navigate') {
    e.respondWith(
      Promise.race([fetch(req), wait(3000)]).then(keep)
        .catch(() => caches.match(req, { ignoreSearch: true }).then(h => h || caches.match('./index.html')))
    );
    return;
  }
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(keep))
  );
});
