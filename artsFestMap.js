// Initialize the map
const map = L.map('map', {
	crs: L.CRS.Simple,
	minZoom: -1,
	attributionControl: false,
	zoomControl: false,
	
});

// Add logo watermark			
L.Control.Watermark=L.Control.extend({
	onAdd:function(map){
		var img = L.DomUtil.create('img');
		img.src = 'Elements/Logo.svg';
		img.style.width = '200px';
		img.style.opacity = 0.7;
	    return img;
	},
	onRemove:function(map){},
});
L.control.watermark = function(opts){
	return new L.Control.Watermark(opts);
}
L.control.watermark({position:'topleft'}).addTo(map);

// Initialize zoom
L.control.zoom({
	position: 'bottomleft'
}).addTo(map);

// Initialize search
var searchbox = L.control.searchbox({
    position: 'topright',
    expand: 'left'
}).addTo(map);
var places =["1. Performing Arts Center", 
	"2. Sidewalk Chalk", 
	"3. Middle School Art", 
	"4. Henna", 
	"5. Tile Painting", 
	"6. Music", 
	"7. Photobooth", 
	"8. Junk to Funk Printmaking", 
	"9. Sculpture Gallery", 
	"10. Elementary School Art", 
	"11. Spanish National Honor Society Paper Crafts", 
	"12. National Art Honor Society Store", 
	"13. FCS Food", 
	"14. Moore College of Art", 
	"15. Student Vendors", 
	"16. CMA Concessions"
];
var fuse = new Fuse(places, {
	shouldSort: true,
	threshold: 0.6,
	location: 0,
	distance: 100,
	minMatchCharLength: 1
});
searchbox.onInput("keyup", function (e) {
	if (e.keyCode == 13) {
		search();
	} else {
		var value = searchbox.getValue();
		if (value != "") {
			var results = fuse.search(value);
			searchbox.setItems(results.map(res => res.item).slice(0, 5));
		} else {
			searchbox.clearItems();
		}
	}
});
searchbox.onButton("click", search);
function search() {
    var value = searchbox.getValue();
    if (value != "") {
        var results = fuse.search(value);
        const marker = placeLookup[results[0]?.item];
        if (marker) {
            map.flyTo(marker.getLatLng(), 1, {
                duration: 1.5
            });
            marker.openPopup();
        }
    }

    setTimeout(function () {
        searchbox.hide();
        searchbox.clear();
    }, 1000);
}

searchbox._container.addEventListener("searchbox:selected", function (e) {
    const selectedValue = e.detail.value;
    const marker = placeLookup[selectedValue];

    if (marker) {
        map.flyTo(marker.getLatLng(), 1, {
            duration: 1.5
        });
        marker.openPopup();

        // Collapse and clear the searchbox
        setTimeout(() => {
            searchbox.hide();
            searchbox.clear();
        }, 1000);
    }
});

			
// Dimensions of the image in pixels
const w = 768, h = 836;
const imageBounds = [[0, 0], [h, w]];
			
// Add image overlay
L.imageOverlay('Elements/Map.svg', imageBounds).addTo(map);
map.fitBounds(imageBounds);
			
// Initialize icons
var place1 = L.icon({
	iconUrl: 'Elements/Icons/1.svg',
	iconSize: [25, 50],
});
var place2 = L.icon({
	iconUrl: 'Elements/Icons/2.svg',
	iconSize: [25, 50],
});
var place3 = L.icon({
	iconUrl: 'Elements/Icons/3.svg',
	iconSize: [25, 50],
});
var place4 = L.icon({
	iconUrl: 'Elements/Icons/4.svg',
	iconSize: [25, 50],
	});
var place5 = L.icon({
	iconUrl: 'Elements/Icons/5.svg',
	iconSize: [25, 50],
});
var place6 = L.icon({
	iconUrl: 'Elements/Icons/6.svg',
	iconSize: [25, 50],
});
var place7 = L.icon({
	iconUrl: 'Elements/Icons/7.svg',
	iconSize: [25, 50],
});
var place8 = L.icon({
	iconUrl: 'Elements/Icons/8.svg',
	iconSize: [25, 50],
});
var place9 = L.icon({
	iconUrl: 'Elements/Icons/9.svg',
	iconSize: [25, 50],
});
var place10 = L.icon({
	iconUrl: 'Elements/Icons/10.svg',
	iconSize: [25, 50],
});
var place11 = L.icon({
	iconUrl: 'Elements/Icons/11.svg',
	iconSize: [25, 50],
});
var place12 = L.icon({
	iconUrl: 'Elements/Icons/12.svg',
	iconSize: [25, 50],
});
var place13 = L.icon({
	iconUrl: 'Elements/Icons/13.svg',
	iconSize: [25, 50],
});
var place14 = L.icon({
	iconUrl: 'Elements/Icons/14.svg',
	iconSize: [25, 50],
});
var place15 = L.icon({
	iconUrl: 'Elements/Icons/15.svg',
	iconSize: [25, 50],
});
var place16 = L.icon({
	iconUrl: 'Elements/Icons/16.svg',
	iconSize: [25, 50],
});
var exit = L.icon({
	iconUrl: 'Elements/Icons/exit.svg',
	iconSize: [25, 50],
});
var restroom = L.icon({
	iconUrl: 'Elements/Icons/restroom.svg',
	iconSize: [25, 50],
});
		
// Add activities to the map
var placeAct1 = L.marker([429.779847, 565], {icon: place1}, {alt: 'Performing Arts Center'}).addTo(map).bindPopup("<b>Performing Arts Center</b><br>Main stage events.");
var placeAct2 = L.marker([397.762495, 429], {icon: place2}, {alt: 'Sidewalk Chalk'}).addTo(map).bindPopup("<b>Sidewalk Chalk</b><br>Create beautiful art on the bridge!");
var placeAct3 = L.marker([517.827565, 362], {icon: place3}, {alt: 'Middle School Art'}).addTo(map).bindPopup("<b>Middle School Art</b><br>View art from our middle schools!");
var placeAct4 = L.marker([632.889923, 390], {icon: place4}, {alt: 'Henna'}).addTo(map).bindPopup("<b>Henna</b><br>Get beautiful henna tatoos! Cash only.");
var placeAct5 = L.marker([694.923543, 326], {icon: place5}, {alt: 'Tile Painting'}).addTo(map).bindPopup("<b>Tile Painting</b><br>Paint tiles to take home.");
var placeAct6 = L.marker([761.959874, 321], {icon: place6}, {alt: 'Music'}).addTo(map).bindPopup("<b>Music (Room 136)</b><br>Learn to play electrifying music!");
var placeAct7 = L.marker([759.958789, 373], {icon: place7}, {alt: 'Photobooth'}).addTo(map).bindPopup("<b>Photobooth (Room 136)</b><br>Take glamarous photos courtesy of photo club.");
var placeAct8 = L.marker([724.93981, 401], {icon: place8}, {alt: 'Junk to Funk Printmaking'}).addTo(map).bindPopup("<b>Junk to Funk Printmaking (Room 136)</b><br>Create prints that you can take home!");
var placeAct9 = L.marker([692.922458, 433], {icon: place9}, {alt: 'Sculpture Gallery'}).addTo(map).bindPopup("<b>Sculpture Gallery (Room 136)</b><br>View different sculptures!");
var placeAct10 = L.marker([422.776051, 269], {icon: place10}, {alt: 'Elementary School Art'}).addTo(map).bindPopup("<b>Elementary School Art</b><br>View art from our elementary schools!");
var placeAct11 = L.marker([203.70827, 161], {icon: place11}, {alt: 'Spanish National Honor Society Paper Crafts'}).addTo(map).bindPopup("<b>Spanish National Honor Society Paper Crafts</b><br>Create paper crafts courtesy of the Spanish National Honor Society.");
var activities = L.layerGroup([placeAct1, placeAct2, placeAct3, placeAct4, placeAct5, placeAct6, placeAct7, placeAct8, placeAct9, placeAct10, placeAct11]);
			
// Add shop & eat to the map
var placeShop12 = L.marker([660.956078, 475], {icon: place12}, {alt: 'National Art Honor Society Store'}).addTo(map).bindPopup("<b>National Art Honor Society Store (Room 136)</b><br>Support NAHS and student artists! Buy something nice!");
var placeShop13 = L.marker([671.962043, 581], {icon: place13}, {alt: 'FCS Food'}).addTo(map).bindPopup("<b>FCS Food (Room 136)</b><br>Hungry? Check out tasty treats from our kitchen!");
var placeShop14 = L.marker([207.774966, 324], {icon: place14}, {alt: 'Moore College of Art'}).addTo(map).bindPopup("<b>Moore College of Art</b><br>Moore College of Art is a art school located in Philadelphia, Pennsylvania.");
var placeShop15 = L.marker([189.765206, 343], {icon: place15}, {alt: 'Student Vendors'}).addTo(map).bindPopup("<b>Student Vendors</b><br>Support our student artists!");
var placeShop16 = L.marker([175.757614, 363], {icon: place16}, {alt: 'CMA Concessions'}).addTo(map).bindPopup("<b>CMA Concessions</b><br>Support the Choral Music Association!");
var shopsAndEat = L.layerGroup([placeShop12, placeShop13, placeShop14, placeShop15, placeShop16]);

// Add restrooms to the map
var restroom1 = L.marker([268.79991, 164], {icon: restroom}, {alt: 'Restroom'}).addTo(map);
var restroom2 = L.marker([312.823769, 267], {icon: restroom}, {alt: 'Restroom'}).addTo(map);
var restroom3 = L.marker([236.782558, 464], {icon: restroom}, {alt: 'Restroom'}).addTo(map);
var restroom4 = L.marker([98.707727, 145], {icon: restroom}, {alt: 'Restroom'}).addTo(map);
var restroom5 = L.marker([591.975057, 663], {icon: restroom}, {alt: 'Restroom'}).addTo(map);
var restrooms = L.layerGroup([restroom1, restroom2, restroom3, restroom4, restroom5]);

// Add exits to the map
var exit1 = L.marker([152.676277, 223.03719], {icon: exit}).addTo(map);
var exit2 = L.marker([119.919611, 306.516898], {icon: exit}).addTo(map);
var exit3 = L.marker([68.641821, 424.298863], {icon: exit}).addTo(map);
var exit4 = L.marker([97.808315, 80.033525], {icon: exit}).addTo(map);
var exit5 = L.marker([215.923272, 568.622293], {icon: exit}).addTo(map);
var exit6 = L.marker([358.000271, 712.161248], {icon: exit}).addTo(map);
var exit7 = L.marker([522.029824, 691.131794], {icon: exit}).addTo(map);
var exits = L.layerGroup([exit1, exit2, exit3, exit4, exit5, exit6, exit7]);

const placeLookup = {
    "1. Performing Arts Center": placeAct1,
    "2. Sidewalk Chalk": placeAct2,
    "3. Middle School Art": placeAct3,
    "4. Henna": placeAct4,
    "5. Tile Painting": placeAct5,
    "6. Music": placeAct6,
    "7. Photobooth": placeAct7,
    "8. Junk to Funk Printmaking": placeAct8,
    "9. Sculpture Gallery": placeAct9,
    "10. Elementary School Art": placeAct10,
    "11. Spanish National Honor Society Paper Crafts": placeAct11,
    "12. National Art Honor Society Store": placeShop12,
    "13. FCS Food": placeShop13,
    "14. Moore College of Art": placeShop14,
    "15. Student Vendors": placeShop15,
    "16. CMA Concessions": placeShop16
};

// Code for getting coords
/* map.on("contextmenu", function (event) {
	console.log("Coordinates: " + event.latlng.toString());
	L.marker(event.latlng).addTo(map) 
}); */

// Initialize layers panel
const baseLayers = {
    "Main Floor": map
};
const overlayMaps = {
    "Activities": activities,
	"Shop & Eat": shopsAndEat,
	"Restrooms": restrooms,
	"Exits": exits
};
const layerControl = L.control.layers(baseLayers, overlayMaps, {
	hideSingleBase: true,
	position: 'bottomright',
	collapsed: false
}).addTo(map);

activities.addTo(map);
shopsAndEat.addTo(map);
restrooms.addTo(map);
exits.addTo(map);

let pointA = null;
let pointB = null;
let selecting = null;
let pathLine = null;

document.getElementById('selectA').addEventListener('click', () => {
  selecting = 'A';
});

document.getElementById('selectB').addEventListener('click', () => {
  selecting = 'B';
});

document.getElementById('clearPath').addEventListener('click', () => {
  if (pathLine) map.removeLayer(pathLine);
  pointA = pointB = selecting = null;
});

map.on('click', function (e) {
  if (!selecting) return;

  if (selecting === 'A') {
    if (pointA) map.removeLayer(pointA);
    pointA = L.marker(e.latlng, { title: "Point A" }).addTo(map);
  } else if (selecting === 'B') {
    if (pointB) map.removeLayer(pointB);
    pointB = L.marker(e.latlng, { title: "Point B" }).addTo(map);
  }

  selecting = null;

  // If both points are selected, draw path
  if (pointA && pointB) {
    const coords = [pointA.getLatLng(), pointB.getLatLng()];
    if (pathLine) map.removeLayer(pathLine);
    pathLine = L.polyline(coords, { color: 'blue', weight: 4 }).addTo(map);
    map.fitBounds(pathLine.getBounds(), { padding: [20, 20] });
  }
});
