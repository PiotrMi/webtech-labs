/**
 * All functionalities needed to make the page dynamic.
 * @author: Junior
 */


/**
 * Call when the page gets loaded.
 */
function pageAboutTobeLoaded(){
	attachListeners();
}


function attachListeners(){
	attachListenersToResultTable();
}

function attachListenersToResultTable(){
	var table = document.getElementById("result_table");
	var size = table.rows.length;
	var row;
	var cell;
	var cinema;
	for(var i = 0; i < size ; i++ ){
		row = table.rows[i];
		if("result_table_header" == row.id){
			continue;
		}
		for(var j = 0 ; j < row.cells.length; j++){
			cell = row.cells[j];
			cell.onclick = function onCinemaSelected(event){
				cinema = event.target.firstChild.nodeValue;
				showCinemaInfo(cinema);
			}
		}
	}
}

//TODO update this method...
/**
 * Here you can specify what should be shown on in the north_content and south_content pane
 */
function showCinemaInfo(cinema){
	clearRightContent();
	var par = document.createElement("p");
	
	var text = document.createTextNode("Do you really want information about " + cinema + "????");
	par.appendChild(text);
	document.getElementById("north_content").appendChild(par);
	text = document.createTextNode("Canvas can be placed here...");
	document.getElementById("south_content").appendChild(text);
}

/**
 * Track the user geo-location.
 */
function trackGeoLocation(){
	if(navigator.geolocation){
		navigator.geolocation.watchPosition(showPosition);
	}else{
		alert("Your browser does not support geo location...");
	}
}

/**
 * Display the location.
 * 
 * @param an object encapsulating the geolocation.
 */
function showPosition(position){
	document.getElementById("latitude").innerHTML = position.coords.latitude;
	document.getElementById("longitude").innerHTML = position.coords.longitude;
	showMap();
}

/**
 * Shows a map in the right content if you like
 */
function showMap(){
	//TODO add map to the north_content
}

function clearRightContent(){
	clearNorthContent();
	clearSouthContent();
}

function clearNorthContent(){
	var northContentPane = document.getElementById("north_content");
	while(northContentPane.firstChild){
		northContentPane.removeChild(northContentPane.firstChild);
	}
}
function clearSouthContent(){
	var southContentPane = document.getElementById("south_content");
	while(southContentPane.firstChild){
		southContentPane.removeChild(southContentPane.firstChild);
	}
}
