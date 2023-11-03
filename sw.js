const staticCacheName = "site-static-v1.0";
const dynamicCacheName = "site-dynamic-v1";

const assets = [
  "/",
  "/index.html",
  "./Common/JS/app.js",
  "./Common/JS/history.js",
  "/settings.html",
  "/history.html",
  "/overview.html",
  "/desktop.html",
  "/fallback.html",
  "./Mobile/CSS/MobileRightNow.scss",
  "/assets/style/index.css",
  "/assets/style/history.css",
  "/CSS/main.css",
  "./Common/JS/Nav_script.js",
  "./Common/JS/app.js",
  "./CSS/desktop_style.scss"
];


caches.open('my-cache').then(cache => {
    // Tilføj flere filerne fra arrayet ovenover
    cache.addAll(assets); 
});


self.addEventListener("install", (event) => {
  console.log("Service Worker has been installed");

  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("Write asset files to cache");
      cache.addAll(assets).catch((error) => {
        console.log(error, "Der er en fejl");
      });
    })
  );
});


self.addEventListener("activate", (event) => {
  console.log("Service Worker has been activated");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys

          .filter((key) => key !== staticCacheName)

          .map((key) => caches.delete(key))
      );
    })
  );
});


self.addEventListener("fetch", (event) => {
  if (!(event.request.url.indexOf("http") === 0)) return;

  event.respondWith(
    caches
      .match(event.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(event.request).then(async (fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(event.request.url, fetchRes.clone());

              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        
        return caches.match("/fallback.html");
      })
  );
  // Limit
  const limitCacheTwo = (cacheName, numberOfAllowedFiles) => {
    caches.open(cacheName).then((cache) => {
      cache.keys().then((keys) => {
        if (keys.length > numberOfAllowedFiles) {
          cache
            .delete(keys[0])
            .then(limitCacheTwo(caches, numberOfAllowedFiles));
        }
      });
    });
  };

  limitCacheTwo(dynamicCacheName, 2);
});