const cities = {
  madrid: { x: 260, y: 380 },
  paris: { x: 300, y: 240 },
  rome: { x: 380, y: 400 }
};

let duration = 30 * 60; // 30 minutos
let elapsed = 0;
let interval;

function startFlight() {
  clearInterval(interval);
  elapsed = 0;

  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  const start = cities[from];
  const end = cities[to];
  const plane = document.getElementById("plane");

  interval = setInterval(() => {
    elapsed++;

    const progress = elapsed / duration;

    const x = start.x + (end.x - start.x) * progress;
    const y = start.y + (end.y - start.y) * progress;

    plane.style.left = x + "px";
    plane.style.top = y + "px";

    updateTimer();

    if (elapsed >= duration) {
      clearInterval(interval);
      alert("Vuelo completado. Buen trabajo.");
    }
  }, 1000);
}

function updateTimer() {
  const remaining = duration - elapsed;
  const min = Math.floor(remaining / 60);
  const sec = remaining % 60;

  document.getElementById("timer").innerText =
    min + ":" + sec.toString().padStart(2, "0");
}
