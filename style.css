/* Global */
:root {
  --bg: #0f172a;
  --panel: #071027;
  --muted: #94a3b8;
  --accent: #2563eb;
  --text: #e6eef8;
}

* { box-sizing: border-box; }

body{
  margin:0;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header / Controls */
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 28px;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent);
  border-bottom: 1px solid rgba(255,255,255,0.03);
}

.brand h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.brand p {
  margin: 2px 0 0 0;
  font-size: 13px;
  color: var(--muted);
}

/* Controls layout */
.controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.controls label {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: var(--muted);
}

select {
  margin-top: 6px;
  padding: 8px 10px;
  border-radius: 8px;
  border: none;
  background: var(--panel);
  color: var(--text);
  font-size: 14px;
  min-width: 140px;
}

button {
  margin-left: 6px;
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  background: var(--accent);
  color: white;
  cursor: pointer;
  font-weight: 600;
}

button#stopBtn {
  background: #ef4444;
}

/* Timer */
.timer-wrap { margin-left: 20px; }
#timer {
  font-size: 18px;
  color: var(--text);
  background: rgba(255,255,255,0.02);
  padding: 8px 12px;
  border-radius: 8px;
}

/* Main map area */
main {
  flex: 1;
  padding: 24px;
}

#map {
  width: min(1100px, 95%);
  height: 620px; /* NECESARIO: si no pones altura, el mapa no aparece */
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(2,6,23,0.6);
  border: 1px solid rgba(255,255,255,0.03);
}

/* Leaflet default tweaks to match style */
.leaflet-control-attribution, .leaflet-control-zoom { display: none; }

/* City marker style (circle with label) */
.city-label {
  background: rgba(4,8,16,0.8);
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.03);
  color: var(--text);
  font-size: 12px;
  white-space: nowrap;
}

/* Plane icon inside divIcon (we rotate with CSS) */
.plane-icon img {
  width: 34px;
  height: 34px;
  transform-origin: center;
  display: block;
  filter: drop-shadow(0 6px 10px rgba(0,0,0,0.6));
}
