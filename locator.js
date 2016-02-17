var sidebar = document.querySelector(".storelocator__sidebar__list");
var southWest = L.latLng(-57.136239, -180),
    northEast = L.latLng(84.267172, 180),
    bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map', {
  maxZoom: 19,
	minZoom: 3,
	zoom: 3,
  zoomControl:false,
  maxBounds: bounds
}).setView([52.1626588, 5.3770023], 3);

var token = "pk.eyJ1IjoibWFydGluciIsImEiOiJOSlEzS2RZIn0.XIliSNqiTISmBRBvKLf2qg";
if (!token) {
    token = prompt('Mapbox Access Token');
}

var gl = L.mapboxGL({
    accessToken: token,
    style: 'mapbox://styles/mapbox/light-v8'

}).addTo(map);

// $('#search').keyup(search, addMarkers);
//
$("#search").keyup("keyup", function(e) {
  //on letter number
  if (e.which <= 90 && e.which >= 48)
  {
    search();
    addMarkers();
  }
  else {
    markers.clearLayers();
  }
});



function search(){
  var searchValue = document.getElementById("search").value;
  return searchValue;
}


var markers = L.markerClusterGroup({
  polygonOptions: {
    color: "#ec6363",
    weight: 2,
    opacity: 0.8
  }
});

var greenIcon = L.icon({
    iconUrl: 'marker.png',
    iconRetinaUrl: 'marker@2x.png',

    iconSize:     [19, 19], // size of the icon
    iconAnchor:   [19, 19], // point of the icon which will correspond to marker's location
    popupAnchor:  [-10, -19] // point from which the popup should open relative to the iconAnchor
});

// Looping through all markers creating the elements
function addMarkers(){
  console.log("executed addMarkers");
  for (var i = 0; i < geojson.length; i++) {
      var a = geojson[i];
      var title = geojson[i].properties.title;
      var marker = L.marker(new L.LatLng(geojson[i].geometry.coordinates[1], geojson[i].geometry.coordinates[0] ), {
        title: title,
        search: geojson[i].geometry.type,
        icon: greenIcon
      });

      var listitem = document.createElement("LI"),
          listitemTitle = document.createElement("H2"),
          listitemTelephone = document.createElement("P"),
          listitemAdres = document.createElement("P");

      listitemTitle.innerHTML = geojson[i].properties.title;
      listitemAdres.innerHTML = "Address: " + geojson[i].properties.adres;
      listitemTelephone.innerHTML = "Telephone: " + geojson[i].geometry.coordinates[0];
      listitem.appendChild(listitemTitle);
      listitem.appendChild(listitemAdres);
      listitem.appendChild(listitemTelephone);
      listitem.setAttribute("data-filter", geojson[i].geometry.coordinates[0]);

      marker.bindPopup(title);
      var searchResult = search();
      console.log(searchResult);

      if (marker.options.search == searchResult){
        markers.addLayer(marker);
        console.log(searchResult);
        sidebar.appendChild(listitem);
      }
      else{
        markers.clearLayers();
        sidebar.innerHTML ="";
      }

  }
}

addMarkers();
// Adding the markers to th map
map.addLayer(markers);


// Set layout heights and margins
$('.storelocator__sidebar__list').css("height", $( window ).innerHeight() - $('.storelocator__sidebar__header').innerHeight());
