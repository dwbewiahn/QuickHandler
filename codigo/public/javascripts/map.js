var map = L.map('map').setView([38.707099, -9.152485], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 14,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoieXVyaXJhYmFuZXRlIiwiYSI6ImNraW5tYzR1cjBhZGoyem95ZGF6OWl3ZGgifQ.wdSHZxrLtGQql4dIvm7ZAQ'
}).addTo(map);

var searchControl = L.esri.Geocoding.geosearch({position:'topright'}).addTo(map);

function loadMarker(address,id, user) {
L.esri.Geocoding.geocode().text(address).run((err, results, response) => {
    console.log(results.results[0].latlng);
    const { lat, lng } = results.results[0].latlng;
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup("<input type='button' class='pedidoMarker' onclick='pedidoOpen(" + id +")' value='"+user+"'>")
  });
}

var geocodeService = L.esri.Geocoding.geocodeService();
//falta colocar funcao na webpage (Criar pedido)
function getAddress() {
map.on('click', function (e) {
    geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
        if(error) {
            return;
        }
        L.marker(result.latlng).addTo(map).bindPopup(result.address.Match_addr).openPopup();
    })
});
}

var ghRouting = new GraphHopper.Routing({key:"3c32eb71-d25c-4d72-bdda-edb65abcdee9", host: "https://graphhopper.com/api/1", vehicle: "car", elevation:false});
var routingLayer = L.layerGroup();

function calcularRotas(morada){  
  map.on('click',function(e){
    L.esri.Geocoding.geocode().text(morada).run((err, results, response) => { 
      const {lat, lng } = results.results[0].latlng; 
      ghRouting.addPoint(new GHInput(e.latlng.lat, e.latlng.lng));
      ghRouting.addPoint(new GHInput(lat,lng));
      L.marker(e.latlng).addTo(map);
      routingLayer = L.geoJSON().addTo(map);
    ghRouting.doRequest()
    .then(function (json) {
      var path = json.paths[0];
      routingLayer.addData({
       "type": "Feature",
        "geometry": path.points
      });
    })
    .catch(function (err) {
      var str = "An error occured: " + err.message;
      $("#routing-response").text(str);
    });
    })
  });
}

  var results = L.layerGroup().addTo(map);

  searchControl.on('results', function (data) {
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });


