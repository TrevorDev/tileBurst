function TileType(c, texture){
	this.character = c
	this.texture = new PIXI.Texture.fromImage(texture)
}

function PathFinder(){
	TileType.call(this, ".", "assets/colors/red.png")
}

function Player(){
	TileType.call(this, "X", "assets/colors/blue.png")
}

function Wall(){
	TileType.call(this, "O", "assets/colors/black.png")
}