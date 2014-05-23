function LevelMap(map){
	this.map = []
	this.copyMap = []
	this.width = map[0].length
	this.height = map.length

	this.frameCount = 0;

	this.viewWidth = 5
	this.viewHeight = 3

	this.viewWidth = this.width
	this.viewHeight = this.height

	this.viewPosX = 0
	this.viewPosY = 0

	this.characterTexture =  new PIXI.Texture.fromImage("assets/colors/blue.png")
	this.badGuyTexture =  new PIXI.Texture.fromImage("assets/colors/red.png")
	this.wallTexture =  new PIXI.Texture.fromImage("assets/colors/black.png")
	this.sprites = []

	for(var i = 0;i<this.height;i++){
		this.map[i]=[]
		for(var j = 0;j<this.width;j++){
			this.map[i][j] = map[i][j]
		}
	}

	this.createCopyMap = function(){
		this.copyMap = []
		for(var i = 0;i<this.height;i++){
			this.copyMap[i]=[]
			for(var j = 0;j<this.width;j++){
				this.copyMap[i][j] = this.map[i][j]
			}
		}
	}

	this.print = function(map){
		if(!map){ map = this.map }
		for(var i = 0;i<this.height;i++){
			console.log(map[i].join(""))
		}
	}

	this.draw = function(){
		for(var i = 0;i<this.sprites.length;i++){
			global.screen.container.removeChild(this.sprites[i])
		}
		this.sprites = []

		
		

		for(var i = this.viewPosY;i<this.viewHeight;i++){
			for(var j = this.viewPosX;j<this.viewWidth;j++){
				if(this.getTile(j, i) != ' '){
					if(this.getTile(j, i) == '.'){
						var newSprite = new PIXI.Sprite(this.badGuyTexture)
					}else if(this.getTile(j, i) == 'X'){
						var newSprite = new PIXI.Sprite(this.characterTexture)
					}else if(this.getTile(j, i) == 'O'){
						var newSprite = new PIXI.Sprite(this.wallTexture)
					}
					newSprite.x = j*global.screen.canvas.width/this.viewWidth
					newSprite.y = i*global.screen.canvas.height/this.viewHeight
					this.sprites.push(newSprite)
				}					
			}	
		}

		for(var i = 0;i<this.sprites.length;i++){
			this.sprites[i].width = global.screen.canvas.width/this.viewWidth
			this.sprites[i].height = global.screen.canvas.height/this.viewHeight
			global.screen.container.addChild(this.sprites[i])
		}
	}
	
	this.getTile = function(x, y, map){
		if(!map){ map = this.map }

		if (x < 0 || y < 0 || x >= this.width || y >= this.height){
			return "O"
		}else{
			return map[y][x]
		}
	}

	this.swapTiles = function(x, y, x2, y2, map){
		if(!map){ map = this.map }

		var tmp = this.getTile(x,y)
		map[y][x] = map[y2][x2]
		map[y2][x2] = tmp;
	}

	this.moveBadGuy = function(x, y){	
		if(this.frameCount % 2 == 0)	{
			var graphMap = new Graph(this.map)
			var player = this.getGetPlayer()
			var start = graphMap.nodes[y][x]
			var end = graphMap.nodes[player.y][player.x]
			var ret = astar.search(graphMap, start, end)
			console.log(ret)
			if(this.getTile(ret[0].x, ret[0].y) == ' '){
				this.swapTiles(x,y,ret[0].x,ret[0].y)
			}
		}
	}

	this.getGetPlayer = function(){
		for(var i = 0;i<this.height;i++){
			for(var j = 0;j<this.width;j++){
				if(this.getTile(j,i) == "X"){
					return {x: j, y: i}
				}
			}
		}
	}

	this.movePlayer = function(move){
		this.createCopyMap()
		for(var i = 0;i<this.height;i++){
			for(var j = 0;j<this.width;j++){
				if(this.getTile(j,i, this.copyMap)=='X'){
					var nextX = j
					var nextY = i
					if(move == "left"){
						nextX--;
					}else if(move == "right"){
						nextX++;
					}else if(move == "up"){
						nextY--
					}else if(move == "down"){
						nextY++
					}
					if(this.getTile(nextX, nextY) == ' '){
						this.swapTiles(j,i,nextX,nextY)
					}
				}
			}
		}
	}

	this.runFrame = function(){
		this.frameCount++;
		this.createCopyMap()
		for(var i = 0;i<this.height;i++){
			for(var j = 0;j<this.width;j++){
				if(this.getTile(j,i, this.copyMap)=='.'){
					this.moveBadGuy(j,i)
				}
			}
		}
	}
}