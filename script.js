const cities = {
  madrid: { x: 200, y: 350 },
  paris: { x: 240, y: 220 },
  rome: { x: 310, y: 360 }
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

    let progress = elapsed / duration;

    let x = start.x + (end.x - start.x) * progress;
    let y = start.y + (end.y - start.y) * progress;

    plane.style.left = x + "px";
    plane.style.top = y + "px";

    updateTimer();

    if (elapsed >= duration) {
      clearInterval(interval);
      alert("✈️ Vuelo completado. Bien hecho.");
    }
  }, 1000);
}

function updateTimer() {
  let remaining = duration - elapsed;
  let min = Math.floor(remaining / 60);
  let sec = remaining % 60;
  document.getElementById("timer").innerText =
    min + ":" + sec.toString().padStart(2, "0");
}
