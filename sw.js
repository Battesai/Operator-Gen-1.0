const CACHE='operator-3.0-photos-v2';
const ASSETS=['./','./index.html','./manifest.json'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))));
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 event.respondWith(caches.match(request).then(async cached=>{
  if(cached)return cached;
  const response=await fetch(request);
  const isPosePhoto=request.url.startsWith('https://raw.githubusercontent.com/Zerg00s/yoga-app/main/img/poses/');
  if(isPosePhoto&&response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{}))}
  return response;
 }));
});