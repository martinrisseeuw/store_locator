var sideBarSelector = '.storelocator__sidebar__list',
    sidebar = document.querySelector( sideBarSelector ),
    southWest = L.latLng(-57.136239, -180),
    northEast = L.latLng(84.267172, 180),
    bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map', {
  maxZoom: 19,
	minZoom: 3,
	zoom: 3,
  zoomControl:false,
  maxBounds: bounds
}).setView([ 52.1626588, 5.3770023 ], 3 );

var token = "pk.eyJ1IjoibWFydGluciIsImEiOiJOSlEzS2RZIn0.XIliSNqiTISmBRBvKLf2qg";
if (!token) {
    token = prompt('Mapbox Access Token');
}

var gl = L.mapboxGL({
    accessToken: token,
    style: 'mapbox://styles/mapbox/light-v8'

}).addTo(map);

$("#search").keyup("keyup", addMarkers );

function populateSelectBox(){
  var selectBox = document.getElementById('searchcountry');

  fetch('http://martinr.nl/countries.json').then(function(response) {
    return response.json();
  })
  .then(function(json) {
    json.countries.map(function(countries, index ){
      var option = new Option(countries.name, countries.cc);
      selectBox.appendChild(option);
    });
    //  console.log(geojson);
    // addOptionToSelectBox();
  })
  .catch(function(ex) {
    console.log('parsing failed', ex)
  });
}
function addOptionToSelectBox(){

}
populateSelectBox();

function search(){
  var searchValue = document.getElementById("search").value;
  return searchValue;
}

var markers = L.markerClusterGroup({
  maxClusterRadius: 30,
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
    iconAnchor:   [9.75, 9.75], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -5] // point from which the popup should open relative to the iconAnchor
});

// Looping through all markers creating the elements
function addMarkers(){
  var searchValue = document.getElementById( 'search' ).value,
      searchRegex = searchValue && new RegExp( searchValue, 'i' );

  markers.clearLayers();
  sidebar.innerHTML ="";

  function shouldDrawItem( item ) {
    if( !searchValue ) return true;
    return !!searchRegex.exec( item.properties.address );
  }

  return geojson.forEach( addMarker );

  function addMarker( item, i ) {
    // if( !shouldDrawItem( item ) ) return;

    var title = item.properties.title,
        coordinates = item.geometry.coordinates,
        marker = L.marker( new L.LatLng( coordinates[ 1 ], coordinates[ 0 ] ), {
          title: title,
          search: item.geometry.type,
          icon: greenIcon
        } );
    listItem.dataset.index = i;
    listItem.setAttribute("class", "store" + i);

    marker.bindPopup(title);
    markers.addLayer(marker);

    marker.on('click', function(e) {
      map.setView( new L.LatLng( coordinates[ 1 ], coordinates[ 0 ] ), 16);
      sidebar.textContent = "";
      sidebar.appendChild( createItemForStore( item.properties, coordinates ) );
      openSidePanel();
    })
  }
}


function createItemForStore( storeInfo, coordinates ){
  console.log(storeInfo);
  var storecontainer = document.createElement( 'div' ),
      listItem = document.createElement( 'li' ),
      listItemTitle = document.createElement( 'h2' ),
      listItemTelephone = document.createElement( 'p' ),
      listItemAddress = document.createElement( 'p' );

  listItemTitle.textContent = storeInfo.title;
  listItemAddress.textContent = 'Address: ' + storeInfo.address;
  listItemTelephone.textContent = 'Telephone: ' + storeInfo.phone;

  listItem.appendChild( listItemTitle );
  listItem.appendChild( listItemAddress );
  listItem.appendChild( listItemTelephone );

  listItem.addEventListener( 'mouseenter', listItemHover );
  listItem.addEventListener( 'click', listItemClick );

  return listItem;

  function listItemHover( event ) {
    map.setView( new L.LatLng( coordinates[ 1 ], coordinates[ 0 ] ), 7);
  }

  function listItemClick( event ) {
    map.setView( new L.LatLng( coordinates[ 1 ], coordinates[ 0 ] ), 16);
  }
}


function getMarkersForCountry( country ){
  fetch('http://martinr.nl/NL.json').then(function(response) {
    return response.json()
    // console.log(response.type); // "opaque"
  })
  .then(function(json) {
    //  console.log('parsed json', json)
    geojson = json;
    //  console.log(geojson);
    addMarkers();
  })
  .catch(function(ex) {
    console.log('parsing failed', ex)
  });
}

// Adding the markers to th map
map.addLayer(markers);


// Set layout heights and margins
function resize(){
  $('.storelocator__sidebar__list').css("height", $( window ).innerHeight() - $('.storelocator__sidebar__header').innerHeight());
}

window.onresize = function(event) {
  resize();
};

resize();
