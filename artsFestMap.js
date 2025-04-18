// Create map background --------------------
const map = L.map('map', {
	crs: L.CRS.Simple,
	minZoom: -1,
	attributionControl: false,
	zoomControl: false,
});
const w = 768, h = 836;
const imageBounds = [[0, 0], [h, w]];
L.imageOverlay('Elements/Map.svg', imageBounds).addTo(map);
map.fitBounds(imageBounds);

// Create watermark --------------------		
L.Control.Watermark=L.Control.extend({
	onAdd:function(map){
		const img = L.DomUtil.create('img');
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

// Create zoom buttons --------------------
const zoom = L.control.zoom({
	position: 'bottomleft'
}).addTo(map);

// Create searchbox --------------------
const searchbox = L.control.searchbox({
    position: 'topright',
    expand: 'left'
}).addTo(map);

// Initialize icons --------------------
let icons = {}
for (let i = 0; i <= 16; i++)
{
	icons[`place${i}`] = L.icon({iconUrl: [`Elements/Icons/${i}.svg`], iconSize: [25, 50],});
}
const exit = L.icon({iconUrl: 'Elements/Icons/exit.svg',iconSize: [25, 50],});
const restroom = L.icon({iconUrl: 'Elements/Icons/restroom.svg', iconSize: [25, 50],});

// Initialize activites, shops, restrooms, and exits --------------------
const places = [
	{label: "activity", name: "1. Performing Arts Center", marker: L.marker([429.779847, 565], {icon: icons.place1}, {alt: 'Performing Arts Center'}).addTo(map).bindPopup("<b>Performing Arts Center</b><br>Main stage events.")},
	{label: "activity", name: "2. Sidewalk Chalk", marker: L.marker([397.762495, 429], {icon: icons.place2}, {alt: 'Sidewalk Chalk'}).addTo(map).bindPopup("<b>Sidewalk Chalk</b><br>Create beautiful art on the bridge!")},
	{label: "activity", name: "3. Middle School Art", marker: L.marker([517.827565, 362], {icon: icons.place3}, {alt: 'Middle School Art'}).addTo(map).bindPopup("<b>Middle School Art</b><br>View art from our middle schools!")},
	{label: "activity", name: "4. Henna", marker: L.marker([632.889923, 390], {icon: icons.place4}, {alt: 'Henna'}).addTo(map).bindPopup("<b>Henna</b><br>Get beautiful henna tatoos! Cash only.")},
	{label: "activity", name: "5. Tile Painting", marker: L.marker([694.923543, 326], {icon: icons.place5}, {alt: 'Tile Painting'}).addTo(map).bindPopup("<b>Tile Painting</b><br>Paint tiles to take home.")},
	{label: "activity", name: "6. Music", marker: L.marker([761.959874, 321], {icon: icons.place6}, {alt: 'Music'}).addTo(map).bindPopup("<b>Music (Room 136)</b><br>Learn to play electrifying music!")},
	{label: "activity", name: "7. Photobooth", marker: L.marker([759.958789, 373], {icon: icons.place7}, {alt: 'Photobooth'}).addTo(map).bindPopup("<b>Photobooth (Room 136)</b><br>Take glamarous photos courtesy of photo club.")},
	{label: "activity", name: "8. Junk to Funk Printmaking", marker: L.marker([724.93981, 401], {icon: icons.place8}, {alt: 'Junk to Funk Printmaking'}).addTo(map).bindPopup("<b>Junk to Funk Printmaking (Room 136)</b><br>Create prints that you can take home!")},
	{label: "activity", name: "9. Sculpture Gallery", marker: L.marker([692.922458, 433], {icon: icons.place9}, {alt: 'Sculpture Gallery'}).addTo(map).bindPopup("<b>Sculpture Gallery (Room 136)</b><br>View different sculptures!")},
	{label: "activity", name: "10. Elementary School Art", marker: L.marker([422.776051, 269], {icon: icons.place10}, {alt: 'Elementary School Art'}).addTo(map).bindPopup("<b>Elementary School Art</b><br>View art from our elementary schools!")},
	{label: "activity", name: "11. Spanish National Honor Society Paper Crafts", marker: L.marker([203.70827, 161], {icon: icons.place11}, {alt: 'Spanish National Honor Society Paper Crafts'}).addTo(map).bindPopup("<b>Spanish National Honor Society Paper Crafts</b><br>Create paper crafts courtesy of the Spanish National Honor Society.")},
	{label: "shop", name: "12. National Art Honor Society Store", marker: L.marker([660.956078, 475], {icon: icons.place12}, {alt: 'National Art Honor Society Store'}).addTo(map).bindPopup("<b>National Art Honor Society Store (Room 136)</b><br>Support NAHS and student artists! Buy something nice!")},
	{label: "shop", name: "13. FCS Food", marker: L.marker([671.962043, 581], {icon: icons.place13}, {alt: 'FCS Food'}).addTo(map).bindPopup("<b>FCS Food (Room 136)</b><br>Hungry? Check out tasty treats from our kitchen!")},
	{label: "shop", name: "14. Moore College of Art", marker: L.marker([207.774966, 324], {icon: icons.place14}, {alt: 'Moore College of Art'}).addTo(map).bindPopup("<b>Moore College of Art</b><br>Moore College of Art is a art school located in Philadelphia, Pennsylvania.")},
	{label: "shop", name: "15. Student Vendors", marker: L.marker([189.765206, 343], {icon: icons.place15}, {alt: 'Student Vendors'}).addTo(map).bindPopup("<b>Student Vendors</b><br>Support our student artists!")},
	{label: "shop", name: "16. CMA Concessions", marker: L.marker([175.757614, 363], {icon: icons.place16}, {alt: 'CMA Concessions'}).addTo(map).bindPopup("<b>CMA Concessions</b><br>Support the Choral Music Association!")},
	{label: "restroom", name: "Restroom", marker: L.marker([268.79991, 164], {icon: restroom}, {alt: 'Restroom'}).addTo(map)},
	{label: "restroom", name: "Restroom", marker: L.marker([312.823769, 267], {icon: restroom}, {alt: 'Restroom'}).addTo(map)},
	{label: "restroom", name: "Restroom", marker: L.marker([236.782558, 464], {icon: restroom}, {alt: 'Restroom'}).addTo(map)},
	{label: "restroom", name: "Restroom", marker: L.marker([98.707727, 145], {icon: restroom}, {alt: 'Restroom'}).addTo(map)},
	{label: "restroom", name: "Restroom", marker: L.marker([591.975057, 663], {icon: restroom}, {alt: 'Restroom'}).addTo(map)},
	{label: "exit", name: "Exit", marker: L.marker([152.676277, 223.03719], {icon: exit}, {alt: 'Exit'}).addTo(map)},
	{label: "exit", name: "Exit", marker: L.marker([119.919611, 306.516898], {icon: exit}, {alt: 'Exit'}).addTo(map)},
	{label: "exit", name: "Exit", marker: L.marker([68.641821, 424.298863], {icon: exit}, {alt: 'Exit'}).addTo(map)},
	{label: "exit", name: "Exit", marker: L.marker([97.808315, 80.033525], {icon: exit}, {alt: 'Exit'}).addTo(map)},
	{label: "exit", name: "Exit", marker: L.marker([215.923272, 568.622293], {icon: exit}, {alt: 'Exit'}).addTo(map)},
	{label: "exit", name: "Exit", marker: L.marker([358.000271, 712.161248], {icon: exit}, {alt: 'Exit'}).addTo(map)},
	{label: "exit", name: "Exit", marker: L.marker([522.029824, 691.131794], {icon: exit}, {alt: 'Exit'}).addTo(map)}
]

// Set up search --------------------
const index = places.filter(p => p.label === "activity" || p.label === "shop");
const fuse = new Fuse(index, {
	keys: ['name'],
	threshold: 0.3
});
searchbox.onInput("keyup", function (e) {
	if (e.keyCode == 13) {
		search();
	} else {
		const value = searchbox.getValue().trim();
		if (value !="") {
			const results = fuse.search(value);
			searchbox.setItems(results.map(res => res.item.name).slice(0,5));
		} else {
			searchbox.clearItems();
		}
	}
});
searchbox._container.addEventListener("searchbox:selected", function (e) {
    const selectedName = e.detail.value;
    const match = places.find(p => p.name === selectedName);
    if (match) {
        map.flyTo(match.marker.getLatLng(), 1, {
            duration: 1.5
        });
        match.marker.openPopup();
        setTimeout(() => {
            searchbox.hide();
            searchbox.clear();
        }, 1000);
    }
});

// Create layers panel --------------------
const baseLayers = {
    "Main Floor": map
};
const labels = {
    "Activities": "activity",
    "Shop & Eat": "shop",
    "Restrooms": "restroom",
    "Exits": "exit"
};
const overlayMaps = {};
for (const [label, key] of Object.entries(labels)) {
    overlayMaps[label] = L.layerGroup(
        places.filter(place => place.label === key).map(place => place.marker)
    ).addTo(map);
}
const layerControl = L.control.layers(baseLayers, overlayMaps, {
	hideSingleBase: true,
	position: 'bottomright',
	collapsed: false
}).addTo(map);

/*map.on("contextmenu", function (event) {
	L.marker(event.latlng).addTo(map).bindPopup(event.latlng.toString())
});*/
