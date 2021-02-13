var map = L.map('map',).setView([28.3949, 84.1240], 7.2);

var pokhara=L.marker([28.1575, 84.04541]).bindPopup('City of Lakes').openPopup().addTo(map);
var ktm=L.marker([27.6981,85.3592]).bindPopup('Capital City of Nepal').openPopup().addTo(map);
var lumbini=L.marker([27.6792,83.5070]).bindPopup('Birthplace of Lord Bu)ddha').openPopup().addTo(map);
    

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
}),
    osm=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}),
    Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
}),
    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
// var map = L.map('map', {
//     center: [28.3949, 84.1240],
//     zoom: 3,
//     layers: [Esri_WorldImagery, osm,Esri_WorldStreetMap, googleStreets]
// });

var baseLayers = {
    "Esri_WorldImagery": Esri_WorldImagery,
    "OpenStreetMap": osm,
    "Esri_WorldStreetMap":Esri_WorldStreetMap,
    "googleStreets":googleStreets
};

var overlays = {
    "first Marker": pokhara,
    "second Marker":ktm,
    "third Marker":lumbini
}

L.control.layers(baseLayers,overlays).addTo(map);
osm.addTo(map);
L.geoJSON(pointJSON).addTo(map);
L.geoJSON(lineJSON).addTo(map);
L.geoJSON(polygonJSON,{
    onEachFeatures:function(feature,layer){
        layer.bindPopup(feature.properties.name);
    }
}).addTo(map);