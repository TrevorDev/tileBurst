var MapArea = require("./mapArea")
var mapAreas = {}

exports.getMapArea = function(x, y){
	var mapArea = mapAreas[x+","+y]
	if (mapArea == null) {
		mapAreas[x+","+y] = new MapArea(0,0,60,30)
		mapArea = mapAreas[x+","+y]
	}
	return mapArea
}

exports.addPlayerToMapArea = function(socket, x, y){
	//remove from old area
	if(socket.playerData.mapArea != null) {
		socket.playerData.mapArea.players[socket.id] = null
	}

	var mapArea = exports.getMapArea(x, y)
	mapArea.players[socket.id] = socket
	socket.playerData.mapArea = mapArea
}