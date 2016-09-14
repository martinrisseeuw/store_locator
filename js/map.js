(function(){
  mapboxgl.accessToken = 'pk.eyJ1IjoibGV4aXMiLCJhIjoiUXA2MVFYSSJ9.2LIrKSEKKZtCJKxe81xf_g';
  var flyToSpeed = 0.8;
  var ListActive = false;

  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/lexis/ciqm41fi50009cfkvx7oyl7vt',
      center: [5.3770023, 52.1626588],
      zoom: 6 ,
      minZoom: 2.5,
      pitch: 25,
  });

  var sidebar = document.querySelector('#geocoder__container');
  var sideBarList = document.querySelector('.storelocator__sidebar__list');

  var geocoder = new mapboxgl.Geocoder({
    flyTo: true,
    zoom: 16,
    container: sidebar
  });

  map.addControl(geocoder);
  document.querySelector('.mobile__results').addEventListener('click', showMobileResults);

  map.on('load', function() {
      // Add a new source from our GeoJSON data and set the
      // 'cluster' option to true.
      map.addSource("stores", {
          type: "geojson",
          data: "http://martinr.nl/all.geojson",
          cluster: true,
          clusterMaxZoom: 12, // Max zoom to cluster points on
          clusterRadius: 95 // Radius of each cluster when clustering points (defaults to 50)
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
          [150, 'rgba(0, 0, 0, 0.8)', 36],
          [20, 'rgba(0, 0, 0, 0.7)', 26],
          [0, 'rgba(0, 0, 0, 0.6)', 16]
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
        "paint": {
          "text-color":"white"
        },
        "layout": {
          "text-field": "{point_count}",
          "text-font": [
              "DIN Offc Pro Medium",
              "Arial Unicode MS Bold"
          ],
          "text-size": 15
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
        managePopUp(feature);
      }

      map.on('mousemove', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['markers'], radius: 1000 });
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
      });


      map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['cluster-count'] });
        if (features.length) {
          map.flyTo({
            center: features[0].geometry.coordinates,
            zoom: map.getZoom() + 3,
            speed: flyToSpeed
          });
        }
        map.fire('flystart');
    });
  });

  function makeListItem(feature){
    var listItem = document.createElement( 'li' ),
    listItemTitle = document.createElement( 'h2' ),
    listItemTelephone = document.createElement( 'p' ),
    listItemAddress = document.createElement( 'p' ),
    routeLink = document.createElement('a'),
    websiteLink = document.createElement('a');

    routeLink.href = 'https://maps.google.com?saddr=Current+Location&daddr=' + feature.geometry.coordinates[1] + ',' + feature.geometry.coordinates[0] + '';
    routeLink.classList.add('route__link');
    routeLink.setAttribute('target', '_blank');
    routeLink.innerHTML = '<span class="route__icon"></span> Route';

    websiteLink.href = feature.properties.website;
    websiteLink.classList.add('website__link');
    websiteLink.setAttribute('target', '_blank');
    websiteLink.innerHTML = '<span class="website__icon"></span> Website';

    listItemAddress.textContent = feature.properties.address;
    listItemTelephone.textContent = 'Tel: ' + feature.properties.phone;
    listItemTitle.textContent = feature.properties.name;
    listItem.appendChild( listItemTitle );
    listItem.appendChild( listItemAddress );


    if(feature.properties.phone){
      listItem.appendChild( listItemTelephone );
    }
    listItem.appendChild( websiteLink );
    listItem.appendChild( routeLink );
    listItem.addEventListener("click", function(e){
      managePopUp(feature);
      showMobileResults();
    });
    sideBarList.insertBefore( listItem, sideBarList.firstChild );
  }

  var currentPops = [];


  function managePopUp(feature){

    currentPops.forEach(function(popup){
      popup._closeButton.click();
    });

    currentPops = [];

    var popup = new mapboxgl.Popup();
    popup.setLngLat(feature.geometry.coordinates);

    popup.setHTML(
      `<div class="pop__flex">
        <div class="main__pop">
        <h2>${feature.properties.name}</h2>
        <p>${feature.properties.address}</p>
        ${feature.properties.phone ? `<p>${feature.properties.phone}</p>` : ''}
      </div>
      <div class="pop__links">
      ${feature.properties.website ? `<a class="websiteBtn" href="${feature.properties.website}"><div><span class="website__icon"></span><span>website</span></div></a>` : ''}
      ${feature.properties.phone ? `<a class="callBtn" href="tel:${feature.properties.phone}"><div><span class="bellen__icon"></span><span>bellen</span></div></a>` : ''}
      <a href="https://maps.google.com?saddr=Current+Location&daddr=${feature.geometry.coordinates[1]},${feature.geometry.coordinates[0]}"><div><span class="route__icon"></span><span>route</span></div></a>
      </div>`
    );

    if (window.innerWidth < 1024){
      map.flyTo({center: feature.geometry.coordinates});
    }

    currentPops.push(popup);
    popup.addTo(map);
  }

  // var AllFeatures = [];

  function getCurrentInView(){
    sideBarList.innerHTML = "";
    
    var clientRect = document.getElementById('map').getBoundingClientRect();

    var canvas = map.getCanvasContainer();
    var rect = canvas.getBoundingClientRect();
    var bounds = map.getBounds();
    var box = [
      {x: 0, y: 0},
      {x: rect.width, y: clientRect.bottom}
    ];

    const features = map.queryRenderedFeatures(box, { layers: ['markers'] });

    const uniqueNames = uniqueByPropertiesName(features)
    console.log('filtered features', uniqueNames)

    function uniqueByPropertiesName(array = []) {
  
      const nameMap = {}
      
      return array.filter(findInMap)
      
      function findInMap(object = {}) {
        const value = object['properties']['name']
        const notUnique = nameMap[value]
        if (notUnique) return false
        else {
          nameMap[value] = true
          return true
        }
      }

    }

    


    uniqueNames.map(function(feature){
      makeListItem(feature);
    });
  }


  map.on('moveend', function() {
    map.fire('flyend');
  });

  map.on('flyend', function(){
    getCurrentInView();
  });

  map.on('flystart', function(){
  });

  map.on('zoomed', function() {
    getCurrentInView();
  });

  map.on('load', function() {
    setTimeout(getCurrentInView, 400);
  });

  map.addControl(new mapboxgl.Navigation());


  function calculateSidebarPosition(){
    var headerHeight =  document.querySelector('.storelocator__sidebar__header').offsetHeight;
    var sideBarList = document.querySelector('.storelocator__sidebar__list');
    var mapHeight = document.getElementById('map').offsetHeight;
    sideBarList.style.height = mapHeight - (headerHeight + 20) + 'px';
  }

  function showMobileResults(){
    if(!ListActive){
      document.querySelector('.storelocator__sidebar__list').classList.add('active');
      document.querySelector('.mobile__results').innerHTML = "Verberg lijst <span class='down__icon'></span>";
      // document.getElementById('map').style.transform = 'translate(0,' + queryElementHeight('.storelocator__sidebar') + 'px)';
      document.body.style.overflow = "hidden";
      ListActive = true;
    }
    else if(ListActive){
      document.querySelector('.storelocator__sidebar__list').classList.remove('active');
      document.querySelector('.mobile__results').innerHTML = "Toon resultaten in lijst <span class='down__icon'></span>";
      // document.getElementById('map').style.transform = 'translate(0,' + queryElementHeight('.storelocator__sidebar') + 'px)';
      document.body.style.overflow = "auto";
      ListActive = false;
    }
  }
})();


function queryElementHeight(e){
  var x = document.querySelector(e).offsetHeight;
  return x
}

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else {
      alert("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
    alert("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude); 
}
