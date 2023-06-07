// appliation service worker definiton

try {
  const PRECACHE = `cache-of-${new Date()?.getFullYear()}-${
    new Date()?.getMonth() + 1
  }`;
  const RUNTIME = "runtime";

  const OFFLINE_URL = "/offline";

  // A list of local resources we always want to be cached.
  const PRECACHE_URLS = [OFFLINE_URL, "/"];

  // The install handler takes care of precaching the resources we always need.
  self.addEventListener("install", async (event) => {
    console.log("installing the service worker");

    event.waitUntil(
      caches
        .open(RUNTIME)
        .then(
          async (cache) =>
            await Promise.allSettled(
              PRECACHE_URLS?.map((url) => {
                return cache.add(url).catch((error) => {
                  console.log(
                    "an error has occured in sw when adding cache items",
                    url,
                    error
                  );
                });
              })
            )
              .then((results) => {
                console.log("precached dependancy files", results);
              })
              .catch((error) => {
                console.log(
                  "an error has occured when precaching dependancy files",
                  error
                );
              })
        )
        .then(self.skipWaiting())
    );
  });

  // The activate handler takes care of cleaning up old caches.
  self.addEventListener("activate", (event) => {
    const currentCaches = [PRECACHE, RUNTIME];
    console.log("activate cache");
    event.waitUntil(
      caches
        .keys()
        .then((cacheNames) => {
          return cacheNames.filter(
            (cacheName) => !currentCaches.includes(cacheName)
          );
        })
        .then((cachesToDelete) => {
          console.log("cache is deleting");
          return Promise.all(
            cachesToDelete.map((cacheToDelete) => {
              return caches.delete(cacheToDelete);
            })
          );
        })
        .then(() => self.clients.claim())
    );
  });

  // The fetch handler serves responses for same-      	origin resources from a cache.
  // If no response is found, it populates the runtime cache with the response
  // from the network before returning it to the page.
  self.addEventListener("fetch", async (event) => {
    console.log("intercept request", event.request?.url);

    if (true) {
      event.respondWith(
        fetch(event.request)
          .then(async (networkResponse) => {
            return caches.open(RUNTIME).then((cache) => {
              cache
                .put(event.request, networkResponse.clone())
                .catch((error) => {
                  console.log(
                    "an error has occured when performing a put on cache",
                    error
                  );
                });
              return networkResponse;
            });
          })
          .catch(async () => {
            console.log("failed in sw to fetch");

            return caches.match(event.request).catch(async (error) => {
              console.log("failed to return cache record from sw");

              const cache = await caches.open(RUNTIME);

              return await cache.match(OFFLINE_URL);
            });
          })
      );
    } else {
      console.log("escaped request in sw", event.request.url);
    }
  });
} catch (e) {
  console.log(e);
}
