(function(){
  const languages = {
    "en": {
      "title": "Points of sale",
      "body": "Find a Secrid retail location near you. Navigate on the map or type in a search term to start.",
      "placeholder": "Address, Town/City, Country",
      "website": "Website",
      "route": "Directions",
      "phone": "Phone Number",
      "results": "Show results in list",
      "hide": "Hide list",
      "call": "call",
      "back": "back"
    },
    "nl": {
      "title": "Verkooppunten",
      "body": "Vind één van onze retail locaties bij u in de buurt. Navigeer op de kaart of type een zoekterm om te starten.",
      "placeholder": "Adres, plaats, land",
      "website": "Website",
      "route": "Route",
      "phone": "Telefoon",
      "results": "Toon resultaten in lijst",
      "hide": "Hide list",
      "call": "Bellen",
      "back": "Terug"
    },
    "it": {
      "title": "Punti di vendita",
      "body": "Trova un rivenditore locale Secrid vicino a te. Cerca sulla mappa o digita uno dei termini chiave per iniziare.",
      "placeholder": "Indirizzo, Città, Paese",
      "website": "Sito Web",
      "route": "Direzioni",
      "phone": "Numero di telefono",
      "results": "Mostra risultati in una lista",
      "hide": "Nascondi risultati",
      "call": "Chiamata",
      "back": "Indietro"
    },
    "de": {
      "title": "Verkaufsstellen",
      "body": "Finden Sie eine Secrid Verkaufsstelle in Ihrer Nähe. Benutzen Sie die Karte oder typen Sie im Suchfenster.",
      "placeholder": "Adresse, Ort, Land",
      "website": "Webseite",
      "route": "Anfahrt",
      "phone": "Telefonnummer",
      "results": "Ergebnisse in einer Liste zeigen",
      "hide": "Ergebnisse verbergen",
      "call": "Anrufen",
      "back": "Zurück"
    },
    "zhs": {
      "title": "销售点",
      "body": "找出离你最近的 Secrid （塞卡瑞迪）零售点。浏览地图或输入搜索字词。",
      "placeholder": "地址",
      "website": "网站",
      "route": "导航说明",
      "phone": "电话号码",
      "results": "以列表形式显示结果",
      "hide": "隐藏结果",
      "call": " 致电",
      "back": "返回"
    },
    "zh": {
      "title": "銷售點",
      "body": "找出離你最近的 Secrid （塞卡瑞迪）零售點。瀏覽地圖或輸入搜索字詞。",
      "placeholder": "地址",
      "website": "網站",
      "route": "導航說明",
      "phone": "電話號碼",
      "results": "以列表形式顯示結果",
      "hide": "隱藏結果",
      "call": "致電",
      "back": "返回"
    },
    "fi": {
      "title": "Myyntipisteet",
      "body": "Etsi lähelläsi olevia Secridin jälleenmyyntipisteitä. Navigoi kartalla tai kirjoita hakusana.",
      "placeholder": "Osoite",
      "website": "Nettisivu",
      "route": "Reittiohjeet",
      "phone": "Puhelinnumero",
      "results": "Näytä tulokset listalla",
      "hide": "Piilota lista",
      "call": "Soittaa",
      "back": "Takaisin"
    },
    "pt": {
      "title": "Localizador de lojas",
      "body": "Encontre um representante da Secrid perto de você. Navegue no mapa ou digite uma palavra de busca para começar.",
      "placeholder": "Endereço",
      "website": "Site",
      "route": "Como chegar",
      "phone": "Telefone",
      "results": "Mostrar resultados na lista",
      "hide": "Ocultar lista",
      "call": "Telefonar",
      "back": "Voltar"
    },
    "tr": {
      "title": "Satış noktaları",
      "body": "Burada yakınınızdaki bayilerimizden birini bulabilirsiniz. Başlamak için haritada yeri işaretleyiniz veya bir arama terimi yazınız.",
      "placeholder": "Adres",
      "website": "İnternet sitesi",
      "route": "Güzergah",
      "phone": "Arama",
      "results": "Sonuçları listede göster",
      "hide": "Listeyi gizle",
      "call": "Ara",
      "back": "Geri dön"
    },
    "es": {
      "title": "Puntos de venta",
      "body": "Encuentre aquí una de nuestras localizaciones con comercio minorista en la zona. Navegue por el mapa o teclee un término de búsqueda para comenzar.",
      "placeholder": "Dirección",
      "website": "Sitio web",
      "route": "Ruta",
      "phone": "Contacto",
      "results": "Mostrar lista de resultados",
      "hide": "Ocultar lista",
      "call": "Llamar",
      "back": "De vuelta"
    },
    "da": {
      "title": "Salgssteder",
      "body": "Find et af vores detailhandelssteder i dit nærområde. Navigér på kortet eller indtast et søgeord for at starte.",
      "placeholder": "Adresse",
      "website": "Hjemmeside",
      "route": "Rute",
      "phone": "Ringe",
      "results": "Vis resultater på liste",
      "hide": "Skjul liste",
      "call": "Ringe op",
      "back": "Tilbage"
    },
    "no": {
      "title": "Salgssteder",
      "body": "Finn en av våre utsalgssteder i nærheten. Naviger på kartet eller skriv inn et søkeord for å starte",
      "placeholder": "Adresse",
      "website": "Website",
      "route": "Rute",
      "phone": "Ringe",
      "results": "Vis resultatene i listen",
      "hide": "Skjul listen",
      "call": "Ringe",
      "back": "Tilbake"
    },
    "sv": {
      "title": "Försäljningspunkter",
      "body": "Hitta här en av våra återförsäljningsplatser i närheten av dig. Navigera på kartan och skriv in ett sökord för att starta.",
      "placeholder": "Adress",
      "website": "Website",
      "route": "Rutt",
      "phone": "Ringa",
      "results": "Visa resultaten i listan",
      "hide": "Göm listan",
      "call": "Ringa",
      "back": "Tillbaka"
    },
    "pl": {
      "title": "Punkty sprzedaży",
      "body": "Tutaj znajdziesz jeden z naszych punktów detalicznych w Twojej okolicy. Znajdź na mapie albo wpisz szukaną frazę, aby zacząć wyszukiwanie.",
      "placeholder": "Adres",
      "website": "Witryna internetowa",
      "route": "Trasa",
      "phone": "Kontakt telefoniczny",
      "results": "Pokaż wyniki w postaci listy",
      "hide": "Ukryj",
      "call": "Telefonować",
      "back": "Wróć"
    },
    "fr": {
      "title": "Points de vente",
      "body": "Trouvez un point de vente de Secrid près de chez vous. Naviguez sur la carte ou tapez un terme de recherche pour commencer.",
      "placeholder": "Adresse",
      "website": "Site Web",
      "route": "Itinéraire",
      "phone": "Numéro de téléphone",
      "results": "Afficher les résultats",
      "hide": "Masquer la liste",
      "call": "Appeler",
      "back": "Retour"
    },
    "ko": {
      "title": "판매처",
      "body": "씨크리드 판매 위치를 찾아 보세요. 지도를 찾아 보거나 검색어를 넣어 보세요.",
      "placeholder": "타운/도시",
      "website": "웹사이트",
      "route": "항공편",
      "phone": "전화 번호",
      "results": "리스트 결과 보기",
      "hide": "숨겨진 리스트",
      "call": "전화",
      "back": "뒤로"
    }
  };

  const currentParLang = getParameterByName('lang');
  let currentLanguage = languages[currentParLang] || languages.nl;

  document.getElementById('languagedrop').addEventListener("change", function(){
    const currentOption = this.options[this.selectedIndex].value;
    const selectedLang = this.options[this.selectedIndex].value;
    currentLanguage = languages[selectedLang];

    let str = window.location.search
    str = replaceQueryParam('lang', currentOption, str)
    window.location = window.location.pathname + `#${str}`

    loadLanguage();

    return;
  });

  function loadLanguage(){
    document.querySelector('.storelocator__sidebar__header h1').innerHTML = `${currentLanguage.title}`
    document.querySelector('.storelocator__sidebar__header p').innerHTML = `${currentLanguage.body}`
    document.querySelector('.mapboxgl-ctrl-geocoder input').placeholder = `${currentLanguage.placeholder}`
    document.querySelector('.backbtn').innerHTML = `${currentLanguage.back}`
    document.querySelector('.mobile__results').innerHTML = `${currentLanguage.results} <span class="down__icon"></span>`
  }


  mapboxgl.accessToken = 'pk.eyJ1IjoibGV4aXMiLCJhIjoiUXA2MVFYSSJ9.2LIrKSEKKZtCJKxe81xf_g';
  const flyToSpeed = 0.8;
  let ListActive = false;

  const bounds = [
      [-180, 82],
      [180, -82]
  ];

  const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/lexis/ciqm41fi50009cfkvx7oyl7vt',
      center: [5.3770023, 52.1626588],
      zoom: 6 ,
      minZoom: 2.5,
      // pitch: 25,
      // maxBounds: bounds,
  });

  const sidebar = document.querySelector('#geocoder__container');
  const sideBarList = document.querySelector('.storelocator__sidebar__list');

  const geocoder = new mapboxgl.Geocoder({
    flyTo: true,
    zoom: 16,
    container: sidebar,
    placeholder: `${currentLanguage.placeholder}`,
    accessToken: mapboxgl.accessToken
  });


  map.addControl(geocoder);


  document.querySelector('.mobile__results').addEventListener('click', showMobileResults);

  map.on('load', function() {
      map.addSource("stores", {
          type: "geojson",
          data: "https://sq12w11pzk.execute-api.eu-central-1.amazonaws.com/prod/storelocator",
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
      const layers = [
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
        const features = map.queryRenderedFeatures(point, { layers: ['markers'] });

        if (!features.length) {
            return;
        }
        const feature = features[0];
        managePopUp(feature);
      }

      map.on('mousemove', function (e) {
        const features = map.queryRenderedFeatures(e.point, { layers: ['markers'], radius: 1000 });
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
      });


      map.on('click', function (e) {
        const features = map.queryRenderedFeatures(e.point, { layers: ['cluster-count'] });
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
    const listItem = document.createElement( 'li' ),
    listItemTitle = document.createElement( 'h2' ),
    listItemTelephone = document.createElement( 'p' ),
    listItemAddress = document.createElement( 'p' ),
    routeLink = document.createElement('a'),
    websiteLink = document.createElement('a');

    routeLink.href = 'https://maps.google.com?saddr=Current+Location&daddr=' + feature.geometry.coordinates[1] + ',' + feature.geometry.coordinates[0] + '';
    routeLink.classList.add('route__link');
    routeLink.setAttribute('target', '_blank');
    routeLink.innerHTML = `<span class="route__icon"></span> ${currentLanguage.route}`;

    websiteLink.href = feature.properties.website;
    websiteLink.classList.add('website__link');
    websiteLink.setAttribute('target', '_blank');
    websiteLink.innerHTML = `<span class="website__icon"></span> ${currentLanguage.website}`;

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

  let currentPops = [];


  function managePopUp(feature){
    currentPops.forEach(function(popup){
      popup._closeButton.click();
    });

    currentPops = [];

    const popup = new mapboxgl.Popup();
    popup.setLngLat(feature.geometry.coordinates);

    popup.setHTML(
      `<div class="pop__flex">
        <div class="main__pop">
        <h2>${feature.properties.name}</h2>
        <p>${feature.properties.address}</p>
        ${feature.properties.phone ? `<p>${feature.properties.phone}</p>` : ''}
      </div>
      <div class="pop__links">
      ${feature.properties.website ? `<a class="websiteBtn" href="${feature.properties.website}"><div><span class="website__icon"></span><span>${currentLanguage.website}</span></div></a>` : ''}
      ${feature.properties.phone ? `<a class="callBtn" href="tel:${feature.properties.phone}"><div><span class="bellen__icon"></span><span>${currentLanguage.call}</span></div></a>` : ''}
      <a href="https://maps.google.com?saddr=Current+Location&daddr=${feature.geometry.coordinates[1]},${feature.geometry.coordinates[0]}"><div><span class="route__icon"></span><span>${currentLanguage.route}</span></div></a>
      </div>`
    );

    if (window.innerWidth < 1024){
      map.flyTo({center: feature.geometry.coordinates});
    }

    currentPops.push(popup);
    popup.addTo(map);
  }

  function getCurrentInView(){
    sideBarList.innerHTML = "";
    
    const clientRect = document.getElementById('map').getBoundingClientRect();

    const canvas = map.getCanvasContainer();
    const rect = canvas.getBoundingClientRect();
    const bounds = map.getBounds();
    const box = [
      {x: 0, y: 0},
      {x: rect.width, y: clientRect.bottom}
    ];

    const features = map.queryRenderedFeatures(box, { layers: ['markers'] });
    const uniqueNames = uniqueByPropertiesName(features);

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
        // tooltip or overlay here
    getCurrentInView();
  });

  map.on('zoomend', function(){
    getCurrentInView();
  });

  map.on('load', function() {
    setTimeout(getCurrentInView, 1500);
  });

  map.addControl(new mapboxgl.Navigation());


  function calculateSidebarPosition(){
    const headerHeight =  document.querySelector('.storelocator__sidebar__header').offsetHeight;
    const sideBarList = document.querySelector('.storelocator__sidebar__list');
    const mapHeight = document.getElementById('map').offsetHeight;
    sideBarList.style.height = mapHeight - (headerHeight + 20) + 'px';
  }

  function showMobileResults(){
    if(!ListActive){
      document.querySelector('.storelocator__sidebar__list').classList.add('active');
      document.querySelector('.mobile__results').innerHTML = `${currentLanguage.hide} <span class='down__icon active'></span>`;
      // document.getElementById('map').style.transform = 'translate(0,' + queryElementHeight('.storelocator__sidebar') + 'px)';
      
      document.body.style.overflow = "hidden";
      ListActive = true;
    }
    else if(ListActive){
      document.querySelector('.storelocator__sidebar__list').classList.remove('active');
      document.querySelector('.mobile__results').innerHTML = `${currentLanguage.results} <span class='down__icon'></span>`;
      // document.getElementById('map').style.transform = 'translate(0,' + queryElementHeight('.storelocator__sidebar') + 'px)';
      document.body.style.overflow = "auto";
      ListActive = false;
    }
  }




  document.addEventListener("DOMContentLoaded", function(event) {
    loadLanguage();
    SelectElement(currentParLang);
    createSelectElements();

    if(currentParLang != null) {
      const languageName = document.querySelector('option[value="' + currentParLang + '"]').getAttribute("name");
      document.querySelector('.select-target').innerHTML = `${languageName} <b></b>`
    } else {
      document.querySelector('.select-target').innerHTML = `Nederlands <b></b>`
    }
  });
})();



function queryElementHeight(e){
  const x = document.querySelector(e).offsetHeight;
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


function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function replaceQueryParam(param, newval, search) {
    const regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
    const query = search.replace(regex, "$1").replace(/&$/, '');

    return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
}

function SelectElement(valueToSelect) {    
  const element = document.getElementById('languagedrop');
  element.value = valueToSelect;
}

function createSelectElements(){
  const selectBoxes = Array.prototype.slice.call(document.querySelectorAll('.select__item'));
  
  selectBoxes.map(function(el) {
    const selectBoxWidth = el.offsetWidth;

    let selectInstance = new Select({
      el: el,
      className: 'select-theme-default',
      useNative: false
    });
    setSize(selectBoxWidth);
  });
}

function goBack() {
  window.history.back();
}

function setSize(selectBoxWidth){
  const dropDownBoxes = Array.prototype.slice.call(document.querySelectorAll('.select.select-theme-default'));
  dropDownBoxes.map(function(el) {
    el.style.width = selectBoxWidth + 'px';
  });
}


