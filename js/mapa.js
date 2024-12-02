let myMap = L.map('myMap').setView([10.0577889, -84.4328834], 20);

// Usando un servicio de tiles como OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(myMap);

// Marcador inicial
let marker = L.marker([10.0577889, -84.4328834]).addTo(myMap);

// Geolocalización del usuario
navigator.geolocation.getCurrentPosition(
  (pos) => {
    const { coords } = pos;
    const { latitude, longitude } = coords;
    console.log("Geolocalización exitosa", pos);

    // Crear marcador en la ubicación actual
    L.marker([latitude, longitude]).addTo(myMap);

    setTimeout(() => {
      myMap.panTo(new L.LatLng(latitude, longitude));
    }, 5000);
  },
  (error) => {
    console.log("Error en geolocalización:", error);
  },
  {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }
);

myMap.doubleClickZoom.disable();
myMap.on('dblclick', e => {
  let latLng = myMap.mouseEventToLatLng(e.originalEvent);
  L.marker([latLng.lat, latLng.lng]).addTo(myMap);
});