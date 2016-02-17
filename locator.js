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
  var searchValue = document.getElementById( 'search' ).value;

  markers.clearLayers();
  sidebar.innerHTML ="";

  function shouldDrawItem( item ) {
    if( !searchValue ) return true;
    return searchValue.toLowerCase() === item.geometry.type.toLowerCase();
  }

  return geojson.forEach( addMarker );

  function addMarker( item ) {
    if( !shouldDrawItem( item ) ) return;

    var title = item.properties.title,
        coordinates = item.geometry.coordinates,
        marker = L.marker( new L.LatLng( coordinates[ 1 ], coordinates[ 0 ] ), {
          title: title,
          search: item.geometry.type,
          icon: greenIcon
        } ),
        listItem = document.createElement( 'li' ),
        listItemTitle = document.createElement( 'h2' ),
        listItemTelephone = document.createElement( 'p' ),
        listItemAddress = document.createElement( 'p' );

    listItemTitle.textContent = title;
    listItemAddress.textContent = 'Address: ' + item.properties.adres;
    listItemTelephone.textContent = 'Telephone: ' + item.geometry.coordinates[ 0 ];

    listItem.appendChild( listItemTitle );
    listItem.appendChild( listItemAddress );
    listItem.appendChild( listItemTelephone );
    listItem.dataset.filter = coordinates[ 0 ];

    marker.bindPopup(title);
    markers.addLayer(marker);
    sidebar.appendChild(listItem);
  }
}

addMarkers();
// Adding the markers to th map
map.addLayer(markers);


// Set layout heights and margins
$('.storelocator__sidebar__list').css("height", $( window ).innerHeight() - $('.storelocator__sidebar__header').innerHeight());
