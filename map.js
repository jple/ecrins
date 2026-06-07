var map = L.map('map');
map.on('error', function(e) {
  console.log('Error loading file: ' + e.err);
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map); 


const options = {
    async: true,
    marker_options: {
        iconSize: [15, 15],
        iconAnchor: [15, 15],
    },
    gpx_options: {
        parseElements: ["track", "waypoint"],
        // joinTrackSegments: false
    },
};


const gpx_selection = document.getElementById("gpx_selection")
var gpxpath = gpx_selection.selectedOptions[0].value;
var gpx;


function plotElevation(d){
    var trace1 = {
        x: d.map(e => e[0]),
        y: d.map(e => e[1]),
        type: 'scatter'
    };

    var data = [trace1];
    Plotly.newPlot('plot', data);
}


function updateGpx(){
    gpxpath = gpx_selection.selectedOptions[0].value;

    if (gpx !== undefined) {
        gpx.remove();
    }
    gpx = new L.GPX(gpxpath, options);
    gpx.on('loaded', (e) => {
        map.fitBounds(e.target.getBounds());

        plotElevation(e.target.get_elevation_data())
    });

    gpx.addTo(map);
    console.log(gpx);
};

updateGpx();
gpx_selection.addEventListener('change', updateGpx);
