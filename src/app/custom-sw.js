self.addEventListener('fetch', (event) => {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/assets/fallback.html');
      })
    );
  });
  