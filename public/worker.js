


const FILES_TO_CACHE = [
    '/',
    '/index.js',
    '/index.html',
    '/db.js',
    '/worker.js',
    '/styles.css',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
  ];

  self.addEventListener("install", function (evt) {  
    // pre cache all static assets
    evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log("Files pre-cached");
        return cache.addAll(FILES_TO_CACHE);
      })
    );
  });

  self.skipWaiting();

  self.addEventListener("activate", function(evt) {
    evt.waitUntil(
        caches.keys().then(keyList => {
        return Promise.all(
            keyList.map(key => {

        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
            }
          })
        );
      })
    );
    self.clients.claim();

  });