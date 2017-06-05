function setInitialMapZoom() {
    var viewportWidth = window.innerWidth;
    var mapZoom;
    if (viewportWidth < [800]) {
        mapZoom = [8];
    } else {
        mapZoom = [8];
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
        [47.5324, 7.5118], // Southwest coordinates
        [49.7913, 10.4956] // Northeast coordinates
    ];
    //  center and zoom level
    var options = {
        cartodb_logo: false,
        center: [48.6616040, 9.3501340],
        zoom: setInitialMapZoom(),
        zoomControl: true,
        minZoom: 8,
        maxBounds: bounds // Sets bounds as max
    };
    var map_object = new L.Map('map', options);
    // set basemap
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        attribution: 'Karte: <a href="https://www.twitter.com/dahilzen">David Hilzendegen</a> | <a href="https://www.stimme.de">www.stimme.de</a>'
    }).addTo(map_object);
    var sublayers = [];
    // cartodb createLayer
    cartodb.createLayer(map_object, 'https://dahilzen.carto.com/api/v2/viz/5f7114b0-4a32-11e7-b3f2-0e98b61680bf/viz.json')
        .addTo(map_object)
        .on('done', function(layer) {
            // set interaction of the CartoDB layer (allow you to click on it)
            layer.setInteraction(true);
            // add sublayers & change the query for the first layer  
            var subLayerOptions = {
                sql: "SELECT * FROM alle_zahnaerzte_bawue",
                cartocss: "#alle_zahnaerzte_bawue{marker-fill-opacity:1;marker-line-color:#000000;marker-line-width:1;marker-line-opacity:1;marker-placement:point;marker-type:ellipse;marker-width:5;marker-fill:#F84F40;marker-allow-overlap:true;}#alle_zahnaerzte_bawue[zoom>10]{marker-fill-opacity:1;marker-line-color:#000000;marker-line-width:1;marker-line-opacity:1;marker-placement:point;marker-type:ellipse;marker-width:10;marker-fill:#F84F40;marker-allow-overlap:true;}"
            }
            var sublayer = layer.getSubLayer(0);
            sublayer.set(subLayerOptions);
            sublayers.push(sublayer);
            var subLayerOptions = {
                sql: "SELECT * FROM landkreise_simplify200",
                cartocss: "#landkreise_simplify200{polygon-fill:#FFFFFF;polygon-opacity:0;line-color:#000000;line-width:0.5;line-opacity:1;}"
            }
            var sublayer = layer.getSubLayer(1);
            sublayer.set(subLayerOptions);
            sublayers.push(sublayer);
        });
}
window.onload = main;