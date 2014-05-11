function update()
{
	global.stats.begin();
	if(global.controller.keyHasBeenPressed){
		if(global.controller.keyHasBeenPressed=='left'){

		}
		global.currentLevel.runFrame()
		global.currentLevel.draw()
		global.screen.render();
	}
	
	requestAnimFrame(update);
	global.controller.clearPressed()
	global.stats.end();
}