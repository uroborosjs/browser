importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox
  .precaching
  .precacheAndRoute([]);

workbox
  .routing
  .registerNavigationRoute("/index.html");

// workbox
//   .routing
//   .registerRoute
//    ( new ReqExp ('\.png$')
//    , workbox.strategies.cacheFirst()
//    );
