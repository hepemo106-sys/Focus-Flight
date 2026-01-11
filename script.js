// Coordenadas reales (lat, lng)
const cities = {
  madrid: { lat: 40.4168, lng: -3.7038 },
  paris:  { lat: 48.8566, lng: 2.3522  },
  rome:   { lat: 41.9028, lng: 12.4964 }
};

// Duración por defecto (segundos). Puedes cambiarla.
let duration = 30 * 60; // 30 minutos
let elapsed = 0;
let timerInterval = null;
let moveInterval = null;

// Mapa Leaflet
const map = L.map('map', { zoomControl: false }).setView([46.0, 6.0], 4);

// OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: ''
}).addTo(map);

// Dibujar marcadores de ciudades
for (const key of Object.keys(cities)) {
  const c = cities[key];
  const marker = L.marker([c.lat, c.lng], {
    icon: L.divIcon({
      className: 'city-label',
      html: `<div>${key.charAt(0).toUpperCase()+key.slice(1)}</div>`,
      iconSize: [80, 28],
      iconAnchor: [40, -10]
    })
  }).addTo(map);
}

// Avión: usamos un divIcon para poder rotarlo y moverlo fácilmente
const planeHtml = `<div class="plane-icon"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Airplane_silhouette.png" alt="plane"></div>`;
let planeMarker = null; // se creará al iniciar el vuelo
let currentPolyline = null;

// UI elements
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const timerEl = document.getElementById('timer');

startBtn.addEventListener('click', startFlight);
stopBtn.addEventListener('click', stopFlight);

function startFlight(){
  stopFlight(); // limpia cualquier vuelo previo
  elapsed = 0;

  const fromKey = document.getElementById('from').value;
  const toKey = document.getElementById('to').value;
  const start = cities[fromKey];
  const end = cities[toKey];

  // Si origen = destino no hacemos nada
  if (fromKey === toKey) {
    alert('Elige dos ciudades diferentes.');
    return;
  }

  // Línea de ruta en el mapa
  if (currentPolyline) map.removeLayer(currentPolyline);
  currentPolyline = L.polyline([[start.lat, start.lng], [end.lat, end.lng]], { color: '#2563eb', weight: 3, opacity: 0.9 }).addTo(map);

  // Centrar mapa en la ruta (padding)
  const bounds = currentPolyline.getBounds();
  map.fitBounds(bounds.pad(0.4));

  // Crear marcador avión en el punto de inicio
  planeMarker = L.marker([start.lat, start.lng], {
    icon: L.divIcon({
      html: planeHtml,
      className: '',
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    })
  }).addTo(map);

  // Duración: por ahora usamos la variable duration (30m),
  // más adelante la podemos calcular en función del vuelo real.
  startTimer();
  startMoveAnimation([start.lat, start.lng], [end.lat, end.lng], duration);
}

function stopFlight(){
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  if (moveInterval)  { clearInterval(moveInterval);  moveInterval = null; }
  elapsed = 0;
  timerEl.innerText = formatTime(duration);
  if (planeMarker) { map.removeLayer(planeMarker); planeMarker = null; }
  if (currentPolyline) { map.removeLayer(currentPolyline); currentPolyline = null; }
}

function startTimer(){
  timerEl.innerText = formatTime(duration);
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    elapsed++;
    timerEl.innerText = formatTime(Math.max(0, duration - elapsed));
    if (elapsed >= duration) {
      clearInterval(timerInterval);
      clearInterval(moveInterval);
      timerInterval = null;
      moveInterval = null;
      alert('✈️ Vuelo completado. Buen trabajo.');
    }
  }, 1000);
}

function formatTime(sec){
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2,'0')}`;
}

// Animación simple: movemos el avión interpolando lat/lng cada segundo
function startMoveAnimation(startLatLng, endLatLng, totalSeconds){
  let t = 0;
  if (moveInterval) clearInterval(moveInterval);

  // Precalcular deltas
  const latDelta = (endLatLng[0] - startLatLng[0]) / totalSeconds;
  const lngDelta = (endLatLng[1] - startLatLng[1]) / totalSeconds;

  // Rotación en grados basada en rumbo aproximado
  function computeRotation(lat1, lng1, lat2, lng2){
    // fórmula simplificada para ángulo en el plano (no geométrica precisa)
    const dy = lat2 - lat1;
    const dx = (lng2 - lng1) * Math.cos((lat1+lat2) * Math.PI/360); // corrección por latitud
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    return angle;
  }

  moveInterval = setInterval(() => {
    t++;
    const newLat = startLatLng[0] + latDelta * t;
    const newLng = startLatLng[1] + lngDelta * t;

    if (planeMarker) {
      planeMarker.setLatLng([newLat, newLng]);

      // rotar el <img> dentro del divIcon
      const nextLat = newLat + latDelta;
      const nextLng = newLng + lngDelta;
      const angle = computeRotation(newLat, newLng, nextLat, nextLng);
      // aplicar rotación vía DOM (si existe)
      const el = planeMarker.getElement();
      if (el) {
        const img = el.querySelector('img');
        if (img) img.style.transform = `rotate(${angle}deg)`;
      }
    }

    if (t >= totalSeconds) {
      clearInterval(moveInterval);
      moveInterval = null;
    }
  }, 1000);
}

// Inicializar timer mostrado por defecto
timerEl.innerText = formatTime(duration);
