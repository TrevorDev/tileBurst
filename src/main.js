function update()
{
	global.stats.begin();
	if(global.controller.keyHasBeenPressed){

		global.currentLevel.runFrame()
		global.currentLevel.movePlayer(global.controller.keyHasBeenPressed)
		global.currentLevel.draw()
		global.screen.render();
	}
	
	requestAnimFrame(update);
	global.controller.clearPressed()
	global.stats.end();
}