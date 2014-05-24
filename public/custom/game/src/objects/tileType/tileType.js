function TileType(c, texture){
	this.character = c
	this.texture = new PIXI.Texture.fromImage(texture)
	this.move = function(level, x, y){
		return {x:x,y:y}
	}
}

function PathFinder(){
	TileType.call(this, ".", "/public/custom/game/assets/colors/red.png")
}

function Player(){
	TileType.call(this, "X", "/public/custom/game/assets/colors/blue.png")
}

function Wall(){
	TileType.call(this, "O", "/public/custom/game/assets/colors/black.png")
}