var coordinates;
var map;
var heat;

const criteria = [
    {id: "day-workday", column: 3, value: 1},
    {id: "day-holiday", column: 3, value: 0},
    {id: "hour-0", column: 2, value: 0},
    {id: "hour-1", column: 2, value: 1},
    {id: "hour-2", column: 2, value: 2},
    {id: "hour-3", column: 2, value: 3},
    {id: "hour-4", column: 2, value: 4},
    {id: "hour-5", column: 2, value: 5},
];


function updateHeatmapLayer() {

    // Deepcopy raw data
    coordinates = [...rawData];

    // Filter data according to filters criteria.
    criteria.forEach(function(criterion) {
        //console.log(document.getElementById(criterion.id));
        if (!document.getElementById(criterion.id).checked) {
            coordinates = coordinates.filter(
                function(p){
                    return (p[criterion.column]!=criterion.value);}
            );
        }
    });
    
    // Map input data to an array of arrays [lat, lgn].
    coordinates = coordinates.map(function (p) { return [p[0], p[1]]; });

    // If exists, remove previous heatmap layers.
    if(!(heat == null)) 
        map.removeLayer(heat);
    
    // Add a heatmap layer to the map.
    heat = L.heatLayer(coordinates, {radius: 20, blur: 40}).addTo(map);    
}

// Instanciate a map.
var map = L.map('map').setView([40.42, -3.67], 13);

// Set map maximum and minimum zoom.
map.options.minZoom = 12;
map.options.maxZoom = 17;

// Configure map tiles (use OpenStreetMap).
var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors; <a href=>',
}).addTo(map);


updateHeatmapLayer();







/*
locations = [...rawData]

coordinates = [...locations].map(function (p) { return [p[0], p[1]]; });



var heat = L.heatLayer(
    coordinates,
    {
        //minOpacity: 0,
        //maxZoom: 12,
        //max: 0.2,
        radius: 20,
        blur: 40,
        //gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}
    }
).addTo(map);

var rawData = [
    [40.382217932804984,-3.6488253588511323,4,1],
    [40.382217932804984,-3.6488253588511323,4,1],
    [40.382217932804984,-3.6488253588511323,4,0],
    [40.382217932804984,-3.6488253588511323,4,0],
    [40.382217932804984,-3.6488253588511323,4,0],
    [40.384346176249736,-3.7176504172216194,0,0],
    [40.384346176249736,-3.7176504172216194,0,0],
    [40.384346176249736,-3.7176504172216194,0,0]
]
*/