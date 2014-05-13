function resize()
{

	var width = $(window).width(); 
	var height = $(window).height(); 
	
	if(width > config.width)width  = config.width;
	if(height > config.height)height = config.height;
	
	maxX = width;
	minX = 0;
	maxY = height;
	minY = 0;
	
	var w = $(window).width() / 2 - width/2;
	var h = $(window).height() / 2 - height/2;
	
	global.screen.renderer.view.style.left = $(window).width() / 2 - width/2 + "px"
	global.screen.renderer.view.style.top = $(window).height() / 2 - height/2 + "px"
	
	global.stats.domElement.style.left = w + "px";
	global.stats.domElement.style.top = h + "px";
	
	global.screen.renderer.resize(width, height);
}

function onReady()
{
	global.screen = new Screen(config.width, config.height);
	
	global.stats = new Stats();
	document.body.appendChild( global.stats.domElement );
	global.stats.domElement.style.position = "absolute";
	global.stats.domElement.style.top = "0px";
	
	global.controller = new Controller({ 
		left: "left",
		right: "right",
		up: "up",
		down: "down",
		attack: ".",
		juggle: ","
	});

	global.currentLevel = new LevelMap([
		"      O                             ",
		"  .   O                             ",
		"      O                             ",
		"      O                             ",
		"      O          X                  ",
		"      O                             ",
		"      O                             ",
		"      O                             ",
		"      O                             ",
		"      O                             ",
		"      O                             ",
		"      O                             ",
		"      O                             ",
		"                                    ",
		"                                    ",
		"                                    "
	])
	//global.currentLevel.print()

	resize();
	requestAnimFrame(update);
}

$(document).ready(onReady)
$(window).resize(resize)
window.onorientationchange = resize;
