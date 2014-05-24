var socket = io.connect('/');

socket.on('updateMap', function (data) {
	console.log(data);
	global.currentLevel.setMap(data.map)
});