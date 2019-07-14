const cacheName = 'ChatApp'; 
// app koi bhi naam de shakte hain
const staticAssets = [
    './',
    './index.html',
    './js/app.js',
    './css/index.css',
    './pages/home.html',
    './js/home.js',
    './css/home.js',
    './pages/chat.html',
    './js/chat.js',
    './css/chat.js',

]
// ./ standard phir jo bhi file offline karna hai wo path den ge

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
          console.log('[ServiceWorker] Caching app shell');
        //   install service worker jo ek goolge ne dia hai
          return cache.addAll(staticAssets);
        })
      );
})
self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(req))
    } else {
        event.respondWith(networkFirst(req))
    }
})

async function cacheFirst(req) {
    const cacheResponse = await caches.match(req);
    return cacheResponse || fetch(req);
    // save cache memory main jab offline hai
}

async function networkFirst(req) {
    const cache = await caches.open(cacheName);
    try {
        const res = await fetch(req);
        cache.put(req, res.clone())
        return res
    } catch (error) {
        return await cache.match(req)
    }
    // send cahce memory to datbase when internet works 

}