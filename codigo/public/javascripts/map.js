var mymap = L.map('map').setView([38.707099, -9.152485], 13);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 15,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoieXVyaXJhYmFuZXRlIiwiYSI6ImNraW5tYzR1cjBhZGoyem95ZGF6OWl3ZGgifQ.wdSHZxrLtGQql4dIvm7ZAQ'
}).addTo(mymap);
