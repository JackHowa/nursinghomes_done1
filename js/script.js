//Defining chart 
//Setting center of view, near center of MO
//Using zoom to fit all circles inside view
//Referencing leaflet library in html 

var map = L.map('chart').setView([38.524170, -92.557949], 7);
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(map);
				
//Initialize the SVG layer

	map._initPathRoot()    

//Pick up the SVG from the map object 

	var svg = d3.select("#chart").select("svg"),
	g = svg.append("g");

//beyond this point, there's circles
	
	d3.json("js/circles_purple.json", function(collection) {
		collection.objects.forEach(function(d) {
			d.LatLng = new L.LatLng(d.circle.coordinates[0],
									d.circle.coordinates[1])
		})
		
		var feature = g.selectAll("circle")
			.data(collection.objects)
			.enter().append("circle")
			.style("stroke", "black")  
			.style("opacity", .3) 
			.style("fill", "purple")
			.attr("r", 10);


//repeat this with a different name. keep the former though 
// d3.json("js/circles_gray.json", function(collection) {
// 		collection.objects.forEach(function(d) {
// 			d.LatLng = new L.LatLng(d.circle.coordinates[0],
// 									d.circle.coordinates[1])
// 		})
		
// 		var feature = g.selectAll("circle")
// 			.data(collection.objects)
// 			.enter().append("circle")
// 			.style("stroke", "black")  
// 			.style("opacity", .3) 
// 			.style("fill", "purple")
// 			.attr("r", 10);



		
		map.on("viewreset", update);
		update();

		function update() {
			feature.attr("transform", 
			function(d) { 
				return "translate("+ 
					map.latLngToLayerPoint(d.LatLng).x +","+ 
					map.latLngToLayerPoint(d.LatLng).y +")";
				}
			)
		}
	})			 



