const cities = {
  madrid: { lat: 40.4168, lng: -3.7038 },
  paris: { lat: 48.8566, lng: 2.3522 },
  rome: { lat: 41.9028, lng: 12.4964 }
};

let duration = 30 * 60;
let elapsed = 0;
let timerInterval = null;
let moveInterval = null;

const map = L.map("map").setView([46, 6], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19
}).addTo(map);

const planeIcon = L.divIcon({
  html: `<div class="plane-icon">
           <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Airplane_silhouette.png">
         </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

let planeMarker = null;
let routeLine = null;

document.getElementById("startBtn").onclick = startFlight;
document.getElementById("stopBtn").onclick = stopFlight;

function startFlight() {
  stopFlight();
  elapsed = 0;

  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  if (from === to) {
    alert("Elige dos ciudades distintas");
    return;
  }

  const start = cities[from];
  const end = cities[to];

  routeLine = L.polyline(
    [[start.lat, start.lng], [end.lat, end.lng]],
    { color: "#2563eb", weight: 3 }
  ).addTo(map);

  map.fitBounds(routeLine.getBounds().pad(0.4));

  planeMarker = L.marker([start.lat, start.lng], {
    icon: planeIcon
  }).addTo(map);

  startTimer();
  movePlane(start, end);
}

function stopFlight() {
  if (timerInterval) clearInterval(timerInterval);
  if (moveInterval) clearInterval(moveInterval);

  timerInterval = null;
  moveInterval = null;
  elapsed = 0;

  document.getElementById("timer").innerText = formatTime(duration);

  if (planeMarker) map.removeLayer(planeMarker);
  if (routeLine) map.removeLayer(routeLine);

  planeMarker = null;
  routeLine = null;
}

function startTimer() {
  timerInterval = setInterval(() => {
    elapsed++;
    document.getElementById("timer").innerText =
      formatTime(duration - elapsed);

    if (elapsed >= duration) {
      stopFlight();
      alert("✈️ Vuelo completado. Buen trabajo.");
    }
  }, 1000);
}

function movePlane(start, end) {
  let t = 0;
  const steps = duration;

  const dLat = (end.lat - start.lat) / steps;
  const dLng = (end.lng - start.lng) / steps;

  moveInterval = setInterval(() => {
    t++;
    planeMarker.setLatLng([
      start.lat + dLat * t,
      start.lng + dLng * t
    ]);

    if (t >= steps) clearInterval(moveInterval);
  }, 1000);
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

document.getElementById("timer").innerText = formatTime(duration);
