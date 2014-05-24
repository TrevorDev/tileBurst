module.exports = function(x,y,width,height){
	this.createEmptyMap = function(width, height){
		var map = []
		for(var i = 0;i<height;i++){
			map[i]=[]
			for(var j = 0;j<width;j++){
				map[i][j] = " "
			}
		}
		map[0][0] = "X"
		return map
	}

	this.x = x
	this.y = y
	this.map = this.createEmptyMap(width, height);
	this.players = {}
}