var map = L.map('map').setView([28.3949, 84.1240], 2);

var osm=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


var pokhara=L.marker([28.20144, 84.9946]).bindPopup('City of Lakes').openPopup().addTo(map);
var ktm=L.marker([27.6981,85.3592]).bindPopup('Kathmandu').openPopup().addTo(map);
var lumbini=L.marker([27.6792,83.5070]).bindPopup('Birthplace of Lord Buddha').openPopup().addTo(map);
    

    var latlngs = [
        [45.51, -122.68],
        [37.77, -122.43],
        [34.04, -118.2]
    ];
    
    var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
    
    // zoom the map to the polyline

    L.control.mousePosition().addTo(map);
    var options = {
        position: 'topleft',
        lengthUnit: {
          factor: 1,    //  from km to nm
          display: 'km',
          decimal: 2
        }
      };
     
     var drawnItems = new L.FeatureGroup();
     map.addLayer(drawnItems);
     var drawControl = new L.Control.Draw({
         edit: {
             featureGroup: drawnItems
         }
     });
     map.addControl(drawControl);

   map.on('draw:created',function(e){
       drawnItems.addLayer(e.layer)
   });
   map.on(L.Draw.Event.CREATED,function(e){
   map.addLayer(e.layer)
   });
   L.control.scale().addTo(map);
   function userLocation() {
    if (navigator.geolocation) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(displayLocationInfo);
            }
            function displayLocationInfo(position) {
            const lng = position.coords.longitude;
            const lat = position.coords.latitude;
  
            L.circle([lat, lng], {
              radius: 1000,
              opacity: 1,
              weight:1,
              fillopactity: 1,
              fillColor: 'blue'
            })
            .addTo(map)
            .bindPopup(`longitude: ${ lng } | latitude: ${ lat }`).openPopup();
            map.setView([lat,lng],12);
        }
    } else {
        console.log('You dont have geolocation');
    }
  };
  
  var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
Esri_WorldImagery.addTo(map);
osm.addTo(map);
   