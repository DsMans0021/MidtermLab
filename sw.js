const CACHE = "midterm-lab-v1";
const CORE = [
  "./",
  "./index.html",
  "./404.html",
  "./offline.html",
  "./manifest.webmanifest",
  "./assets/style.css",
  "./assets/site.js",
  "./assets/search-index.json",
  "./assets/icon.svg",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./algebra/complex-numbers.html",
  "./algebra/final-exam.html",
  "./algebra/formulas.html",
  "./algebra/gauss-method.html",
  "./algebra/index.html",
  "./algebra/numerical-analysis.html",
  "./algebra/theory-of-equations.html",
  "./chemistry/final-exam.html",
  "./chemistry/formulas.html",
  "./chemistry/gases.html",
  "./chemistry/index.html",
  "./chemistry/material-balance.html",
  "./mechanics/equilibrium.html",
  "./mechanics/final-exam.html",
  "./mechanics/forces.html",
  "./mechanics/formulas.html",
  "./mechanics/friction.html",
  "./mechanics/index.html",
  "./mechanics/moments.html",
  "./mechanics/vectors.html",
  "./mechanics/wrench.html",
  "./physics/deformation.html",
  "./physics/expansion.html",
  "./physics/final-exam.html",
  "./physics/fluids.html",
  "./physics/formulas.html",
  "./physics/ideal-gas.html",
  "./physics/index.html",
  "./physics/temperature.html",
  "./physics/thermal-energy.html",
  "./physics/thermodynamics.html",
  "./physics/units.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then(hit => hit || caches.match("./offline.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(cache => cache.put(req, copy));
      return res;
    }).catch(() => caches.match("./offline.html")))
  );
});
