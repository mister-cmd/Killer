const map = L.map('map').setView([58.01, 56.25], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let marker;
map.on('click', e => {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;
  if (marker) marker.setLatLng(e.latlng);
  else marker = L.marker(e.latlng).addTo(map);
  document.getElementById('location').value = lat.toFixed(6) + ', ' + lng.toFixed(6);
});

document.getElementById('orderForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));

fetch('https://killer.onrender.com/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  .then(r => r.json())
  .then(() => {
    document.getElementById('response').innerHTML = '<p style="color:#0f0">Данные получены. Мы вас записали (ну типа).</p>';
    e.target.reset();
  });
});
