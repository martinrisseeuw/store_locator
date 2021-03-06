(function(){
  mapboxgl.accessToken = 'pk.eyJ1IjoibGV4aXMiLCJhIjoiUXA2MVFYSSJ9.2LIrKSEKKZtCJKxe81xf_g';
  var flyToSpeed = 0.3;

  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/lexis/ciqm41fi50009cfkvx7oyl7vt',
      center: [5.3770023, 52.1626588],
      zoom: 12 ,
      minZoom: 4,
      pitch: 30,
  });

  var sidebar = document.querySelector('.storelocator__sidebar__header');
  var sideBarList = document.querySelector('.storelocator__sidebar__list');


  // map.addControl(new mapboxgl.Geocoder({
  //   flyTo: false,
  //   zoom: 16,
  //   container: sidebar
  // }));

  var geocoder = new mapboxgl.Geocoder({
    flyTo: false,
    zoom: 16,
    container: sidebar
  });



  geocoder.on('result', function(e) {
    var result = e.result;
    console.log(result);
    map.flyTo({
      speed: flyToSpeed,
      center: result.geometry.coordinates
      // Pass result and custom animation
    });
  });
  map.addControl(geocoder);

  map.on('load', function() {
      // Add a new source from our GeoJSON data and set the
      // 'cluster' option to true.
      map.addSource("stores", {
          type: "geojson",
          data: "http://martinr.nl/all.geojson",
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 30 // Radius of each cluster when clustering points (defaults to 50)
      });

      // Use the stores source to create five layers:
      // One for unclustered points, three for each cluster category,
      // and one for cluster labels.
      map.addLayer({
          "id": "markers",
          "type": "symbol",
          "source": "stores",
          "layout": {
              "icon-image": "marker-15",
              "icon-size": 1
          }
      });

      // Display the earthquake data in three layers, each filtered to a range of
      // count values. Each range gets a different fill color.
      var layers = [
          [150, '#84E7B9', 20],
          [30, '#8488E7', 16],
          [0, '#E78484', 12]
      ];

      layers.forEach(function (layer, i) {
        map.addLayer({
          "id": "cluster-" + i,
          "type": "circle",
          "source": "stores",
          "paint": {
            "circle-color": layer[1],
            "circle-radius": layer[2]
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
        "source": "stores",
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
      map.on('click', function(e){
        popUpAction(e.point);
      });

      function popUpAction(point){
        var features = map.queryRenderedFeatures(point, { layers: ['markers'] });

        if (!features.length) {
            return;
        }
        var feature = features[0];

        if(map.getZoom() <= 4){
          map.flyTo({
            center: features[0].geometry.coordinates,
            zoom: map.getZoom() + 6,
            speed: flyToSpeed
          });
        }
        else{
          map.flyTo({
            center: feature.geometry.coordinates,
            speed: flyToSpeed
          });
        }
        managePopUp(feature);
      }

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
              zoom: map.getZoom() + 3,
              speed: flyToSpeed
            });
        }
    });
  });

  function makeListItem(feature){
    var listItem = document.createElement( 'li' ),
    listItemTitle = document.createElement( 'h2' ),
    listItemTelephone = document.createElement( 'p' ),
    listItemAddress = document.createElement( 'p' ),
    routeLink = document.createElement('a');

    routeLink.href = 'https://maps.google.com?saddr=Current+Location&daddr=' + feature.geometry.coordinates[1] + ',' + feature.geometry.coordinates[0] + '';
    routeLink.classList.add('route__link');
    routeLink.setAttribute('target', '_blank');
    routeLink.innerHTML = 'Get directions';

    listItemAddress.textContent = feature.properties.address;
    listItemTelephone.textContent = 'Tel: ' + feature.properties.phone;
    listItemTitle.textContent = feature.properties.name;
    listItem.appendChild( listItemTitle );
    listItem.appendChild( listItemAddress );
    listItem.appendChild( listItemTelephone );
    listItem.appendChild( routeLink );

    listItem.addEventListener("click", function(e){
      managePopUp(feature);
    });

    sideBarList.appendChild(listItem);
    sideBarList.insertBefore( listItem, sideBarList.firstChild );
  }

  var currentPops = [];

  function managePopUp(feature){
    currentPops.forEach(function(popup){
      popup._closeButton.click();
    });
    currentPops = [];

    map.flyTo({
      center: feature.geometry.coordinates,
      speed: flyToSpeed
    });

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
    currentPops.push(popup);
    popup.addTo(map);
  }

  function getCurrentInView(){
    var clientRect = document.getElementById('map').getBoundingClientRect();

    var box = [
      {x: 0, y: 0},
      {x: (clientRect.right - clientRect.left), y: clientRect.bottom}
    ];

    // console.log(box);

    var features = map.queryRenderedFeatures(box, { layers: ['markers'] });
    sideBarList.innerHTML = "";
    features.map(function(feature){
      makeListItem(feature);
    });

    // if (box) {
    //     box = document.createElement('div');
    //     box.classList.add('boxdraw');
    //     document.getElementById('map').appendChild(box);
    // }
    //  // Adjust width and xy position of the box element ongoing
    //  var pos = 'translate(' + 0 + 'px,' + clientRect.top + 'px)';
    //  box.style.transform = pos;
    //  box.style.WebkitTransform = pos;
    //  box.style.width = clientRect.right - clientRect.left + 'px';
    //  box.style.height = clientRect.bottom - clientRect.top + 'px';
  }


  map.on('moveend', function() {
    getCurrentInView();
  });
  map.on('zoomed', function() {
    getCurrentInView();
  });

  // map.on('mousemove', function (e) {
  //   document.getElementById('info').innerHTML =
  //     JSON.stringify(e.point) + '<br />' +
  //     'Zoom is:' + JSON.stringify(map.getZoom());
  // });

  function calculateSidebarPosition(){
    var headerHeight =  document.querySelector('.storelocator__sidebar__header').offsetHeight;
    var sideBarList = document.querySelector('.storelocator__sidebar__list');
    var mapHeight = document.getElementById('map').offsetHeight;

    console.log(mapHeight)
    console.log(headerHeight)
    sideBarList.style.height = mapHeight - (headerHeight + 20) + 'px';
  }
  calculateSidebarPosition();
})();
