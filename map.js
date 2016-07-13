mapboxgl.accessToken = 'pk.eyJ1IjoibWFydGluciIsImEiOiJOSlEzS2RZIn0.XIliSNqiTISmBRBvKLf2qg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/martinr/ciqkjhapk000tbjm86rrpbjcw',
    center: [5.3770023, 52.1626588],
    zoom: 8,
    minZoom: 4
});

var sidebar = document.querySelector('.storelocator__sidebar__header');
var sideBarList = document.querySelector('.storelocator__sidebar__list');
var visibleMarkers = [];
map.addControl(new mapboxgl.Geocoder({
  flyTo: true,
  zoom: 11,
  container: sidebar
}));

map.on('load', function() {
    // Add a new source from our GeoJSON data and set the
    // 'cluster' option to true.
    map.addSource("earthquakes", {
        type: "geojson",
        data: "http://martinr.nl/all.geojson",
        cluster: true,
        clusterMaxZoom: 8, // Max zoom to cluster points on
        clusterRadius: 30 // Radius of each cluster when clustering points (defaults to 50)
    });

    // Use the earthquakes source to create five layers:
    // One for unclustered points, three for each cluster category,
    // and one for cluster labels.
    map.addLayer({
        "id": "markers",
        "type": "symbol",
        "source": "earthquakes",
        "layout": {
            "icon-image": "marker-15",
            "icon-size": 1
        },
        // "filter": ["in", "abbrev", ""]
    });

    // Display the earthquake data in three layers, each filtered to a range of
    // count values. Each range gets a different fill color.
    var layers = [
        [150, '#666'],
        [20, '#666'],
        [0, '#666']
    ];


    layers.forEach(function (layer, i) {
        map.addLayer({
            "id": "cluster-" + i,
            "type": "circle",
            "source": "earthquakes",
            "paint": {
                "circle-color": layer[1],
                "circle-radius": 14
            },
            "filter": i === 0 ?
                [">=", "point_count", layer[0]] :
                ["all",
                    [">=", "point_count", layer[0]],
                    ["<", "point_count", layers[i - 1][0]]]
        });
    });
    // Add a layer for the clusters' count labels
    map.addLayer({
        "id": "cluster-count",
        "type": "symbol",
        "source": "earthquakes",
        "layout": {
            "text-field": "{point_count}",
            "text-font": [
                "DIN Offc Pro Medium",
                "Arial Unicode MS Bold"
            ],
            "text-size": 12
        }
    });

    // When a click event occurs near a place, open a popup at the location of
    // the feature, with description HTML from its properties.
    map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['markers'] });

        if (!features.length) {
            return;
        }
        var feature = features[0];

        if(map.getZoom() <= 4){
          map.flyTo({
            center: features[0].geometry.coordinates,
            zoom: map.getZoom() + 6
          });
        }
        else{
          map.flyTo({
            center: feature.geometry.coordinates
          });
        }
        makeListItem(feature);

        // Populate the popup and set its coordinates
        // based on the feature found.
        var popup = new mapboxgl.Popup();
            popup.setLngLat(feature.geometry.coordinates);

            if(feature.properties.phone){
              popup.setHTML(
                '<h2>' + feature.properties.name + '</h2>'+
                '<p>' + feature.properties.address + '</p>'+
                '<p>' + feature.properties.phone + '</p>'
              );
            }
            else{
              popup.setHTML(
                '<h2>' + feature.properties.name + '</h2>'+
                '<p>' + feature.properties.address + '</p>'
              );
            }
            popup.addTo(map);
    });

    // Use the same approach as above to indicate that the symbols are clickable
    // by changing the cursor style to 'pointer'.
    map.on('mousemove', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['markers'], radius: 1000 });
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    });


    map.on('click', function (e) {
      // Use queryRenderedFeatures to get features at a click event's point
      // Use layer option to avoid getting results from other layers
      var features = map.queryRenderedFeatures(e.point, { layers: ['cluster-count'] });
      // if there are features within the given radius of the click event,
      // fly to the location of the click event
      if (features.length) {
          // Get coordinates from the symbol and center the map on those coordinates
          map.flyTo({
            center: features[0].geometry.coordinates,
            zoom: map.getZoom() + 3
          });
      }
  });
  // map.setFilter('markers', ['==', 'name', 'Brugman']);
});

function makeListItem(feature){
  var listItem = document.createElement( 'li' ),
  listItemTitle = document.createElement( 'h2' ),
  listItemTelephone = document.createElement( 'p' ),
  listItemAddress = document.createElement( 'p' );
  listItemAddress.textContent = feature.properties.address;
  listItemTelephone.textContent = 'Tel: ' + feature.properties.phone;
  listItemTitle.textContent = feature.properties.name;
  listItem.appendChild( listItemTitle );
  listItem.appendChild( listItemAddress );
  listItem.appendChild( listItemTelephone );
  sideBarList.appendChild(listItem);
}
