const cacheName = 'rady-wars-v1.1'; // تحديث الإصدار لفرض مسح الـ Cache القديم
const assets = [
    './',
    './index.html',
    './style.css',
    './game.js',
    './manifest.json'
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
