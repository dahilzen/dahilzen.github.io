function setInitialMapZoom() {

    var viewportWidth = window.innerWidth;
//    var center = [49.1397278, 9.219251];
    var mapZoom;

    if (viewportWidth < [800]) {
        mapZoom = [8];
    } else {
        mapZoom = [10];
    }

    return mapZoom;
};


function main() {
    var map;
    var events = [];
    var attr1 = [];
    var attr2 = [];
    var polygon;
    var bounds = [
        [48.994636, 8.787689], // Southwest coordinates
        [59.442236, 9.908295] // Northeast coordinates
    ];


          //  center and zoom level
      var options = {
        center: [49.1397278, 9.219251], 
        zoom: setInitialMapZoom(),
        zoomControl: false,
        minZoom: 8,
        maxZoom: 15,
        maxBounds: bounds // Sets bounds as max
      };


    var map_object = new L.Map('map', options);



    // set basemap
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        attribution: 'Karte: <a href="https://www.twitter.com/dahilzen">David Hilzendegen</a> | Recherche: Fiona Drewnitzky, Christoph Feil | <a href="https://www.stimme.de">www.stimme.de</a>'
    }).addTo(map_object);


    var sublayers = [];

    // cartodb createLayer
    cartodb.createLayer(map_object, 'https://stimmeonline.carto.com/api/v2/viz/061f06dc-47cc-11e7-8734-0e8c56e2ffdb/viz.json')
        .addTo(map_object)
        .on('done', function(layer) {
            // set interaction of the CartoDB layer (allow you to click on it)
            layer.setInteraction(true);

            // add sublayers & change the query for the first layer  
            var subLayerOptions = {
                sql: "SELECT * FROM freizeittipps WHERE typ IS NOT NULL",
                cartocss: "#freizeittipps{ marker-fill-opacity: 0.9;  marker-line-color: #FFF;  marker-line-width: 1;  marker-line-opacity: 1;  marker-placement: point;  marker-type: ellipse;  marker-width: 10;  marker-fill: #136400;  marker-allow-overlap: true;}"
            }

            var sublayer = layer.getSubLayer(0);

            sublayer.set(subLayerOptions);

            sublayers.push(sublayer);

            //we define the queries that will be performed when we click on the buttons, by modifying the SQL of our layer
  var LayerActions = {
          alles: function() {
        sublayers[0].set({
        sql: "SELECT * FROM freizeittipps WHERE typ IS NOT NULL",
        cartocss: "#freizeittipps{marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 10;marker-fill: #136400;marker-allow-overlap: true;}"     
        });
      return true;
    },
      sport: function() {
        sublayers[0].set({
        sql: "SELECT * FROM freizeittipps WHERE typ = 'Sport'",
        cartocss: "#freizeittipps{marker-file: url(https://s3.amazonaws.com/com.cartodb.users-assets.production/production/stimmeonline/assets/20170519094557Bewegung.png);marker-fill-opacity: 1;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 30;marker-fill: #136400;marker-allow-overlap: true;}"     
        });
      return true;
    },
          kultur: function() {
        sublayers[0].set({
        sql: "SELECT * FROM freizeittipps WHERE typ = 'Kultur'",
        cartocss: "#freizeittipps{  marker-file: url(https://s3.amazonaws.com/com.cartodb.users-assets.production/production/stimmeonline/assets/20170519093942Theater.png);marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 30;marker-fill: #136400;marker-allow-overlap: true;}"     
        });
      return true;
    },
          spiel: function() {
        sublayers[0].set({
        sql: "SELECT * FROM freizeittipps WHERE typ = 'Spiel'",
        cartocss: "#freizeittipps{  marker-file: url(https://s3.amazonaws.com/com.cartodb.users-assets.production/production/stimmeonline/assets/20170519094107Spiel-Spa%C3%9F.png);marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 30;marker-fill: #136400;marker-allow-overlap: true;}"     
        });
      return true;
    },
              wasser: function() {
        sublayers[0].set({
        sql: "SELECT * FROM freizeittipps WHERE typ = 'Wasser'",
        cartocss: "#freizeittipps{  marker-file: url(https://s3.amazonaws.com/com.cartodb.users-assets.production/production/stimmeonline/assets/20170519093756Wasser.png);marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 30;marker-fill: #136400;marker-allow-overlap: true;}"     
        });
      return true;
    },
              entdecken: function() {
        sublayers[0].set({
        sql: "SELECT * FROM freizeittipps WHERE typ = 'Entdecken'",
        cartocss: "#freizeittipps{  marker-file: url(https://s3.amazonaws.com/com.cartodb.users-assets.production/production/stimmeonline/assets/20170519094144Entdecken.png);marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 30;marker-fill: #136400;marker-allow-overlap: true;}"     
        });
      return true;
    },
              museen: function() {
        sublayers[0].set({
        sql: "SELECT * FROM freizeittipps WHERE typ = 'Museen'",
        cartocss: "#freizeittipps{  marker-file: url(https://s3.amazonaws.com/com.cartodb.users-assets.production/production/stimmeonline/assets/20170519094334Museen.png);marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 30;marker-fill: #136400;marker-allow-overlap: true;}"     
        });
      return true;
    },
              burgen: function() {
        sublayers[0].set({
        sql: "SELECT * FROM freizeittipps WHERE typ = 'Burgen'",
        cartocss: "#freizeittipps{  marker-file: url(https://s3.amazonaws.com/com.cartodb.users-assets.production/production/stimmeonline/assets/20170519094454Turm.png);marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 30;marker-fill: #136400;marker-allow-overlap: true;}"     
        });
      return true;
    },
              tiere: function() {
        sublayers[0].set({
        sql: "SELECT * FROM freizeittipps WHERE typ = 'Tiere'",
        cartocss: "#freizeittipps{  marker-file: url(https://s3.amazonaws.com/com.cartodb.users-assets.production/production/stimmeonline/assets/20170519094522Tiere.png);marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 30;marker-fill: #136400;marker-allow-overlap: true;}"     
        });
      return true;
    },
}
            $('.button').click(function() {
                $('.button').removeClass('selected');
                $(this).addClass('selected');
                //this gets the id of the different buttons and calls to LayerActions which responds according to the selected id
                LayerActions[$(this).attr('id')]();
            });

            $('#selector').change(function() {
                LayerActions[$(this).val()]();
            });

            // when the CartoDB layer is clicked...
            layer.on('featureClick', function(e, latlng, pos, data) {
                // data1 stores the cartodb_id value of the selected polygon
                data1 = data.cartodb_id;


                /* change zoom level to zoom level 11, when user click on the CARTO geometries
          
            map_object.setView(latlng,8,true); 

            */

                // if Leaflet polygon is added on the map, remove it
                if (map_object.hasLayer(polygon)) {
                    map_object.removeLayer(polygon)
                    console.log("removed")
                }

                // use SQL API to extract the attribute values from the selected polygons
                var sql = new cartodb.SQL({ user: 'stimmeonline' });
                // select the attribute tables to extract from CartoDB table
                sql.execute("SELECT ST_asGeoJSON(ST_Boundary(the_geom)) as geom FROM freizeittipps WHERE cartodb_id IN (" + data1 + ")")
                    .done(function(data) {

                        var geom = data.rows[0].geom;
                        polygon = L.geoJson(JSON.parse(geom), {
                            style: {
                                color: "#000", // color of stroke line
                                weight: 5, // width of stroke line
                                //fillColor: "blue", // define color of polygon
                                fill: true // set polygon
                            }

                        });
                        // add leaflet polygon on the map
                        map_object.addLayer(polygon);

                    });

            });



        });



}


window.onload = main;
