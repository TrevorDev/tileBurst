function update()
{
	global.stats.begin();
	if(global.controller.keyHasBeenPressed){
		global.currentLevel.movePlayer(global.controller.keyHasBeenPressed)
		global.currentLevel.runFrame()
		global.currentLevel.draw()
		global.screen.render();
	}
	
	requestAnimFrame(update);
	global.controller.clearPressed()
	global.stats.end();
}
