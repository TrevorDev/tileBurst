function LevelMap(map){

	this.cloneMap = function(map) {
		var created = []
		for(var i = 0;i<map.length;i++){
			created[i]=[]
			for(var j = 0;j<map[0].length;j++){
				created[i][j] = map[i][j]
			}
		}
		return created
	}

	this.setMap = function(map){
		this.map = this.cloneMap(map)
		this.width = this.map[0].length
		this.height = this.map.length
		this.viewWidth = this.width
		this.viewHeight = this.height
	}

	this.genRandMap = function(w, h){
		var created = []
		for(var i = 0;i<h;i++){
			created[i]=[]
			for(var j = 0;j<w;j++){
				var rand = Math.random()
				var newBlock = " "
				if (rand < 0.013) {
					newBlock = "."
				}else if(rand < 0.02){
					newBlock = "*"
				}
				created[i][j] = newBlock
			}
		}
		created[h-1][0] = "X"
		created[0][w-1] = "^"
		return created;
	}

	this.createCopyMap = function(){
		this.copyMap = this.cloneMap(this.map)
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
				for(var k in this.tileTypes) {
					if(this.getTile(j, i) != ' '){
						if(this.getTile(j, i) == this.tileTypes[k].character){
							var newSprite = new PIXI.Sprite(this.tileTypes[k].texture)
							newSprite.x = j*global.screen.canvas.width/this.viewWidth
							newSprite.y = i*global.screen.canvas.height/this.viewHeight
							this.sprites.push(newSprite)
						}
						
					}	
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

	this.clearTile = function(x, y, map){
		if(!map){ map = this.map }
		map[y][x] = " "
	}

	this.moveBadGuy = function(x, y){	
		if(this.frameCount % 2 == 0)	{
			var graphMap = new Graph(this.map)
			var player = this.getGetPlayer()
			var start = graphMap.nodes[y][x]
			var end = graphMap.nodes[player.y][player.x]
			var ret = astar.search(graphMap, start, end)
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
					}else if(this.getTile(nextX, nextY) == this.tileTypes.stairs.character){
						//this.swapTiles(j,i,nextX,nextY)
						this.setMap(this.genRandMap(20, 10))
					}else if(this.getTile(nextX, nextY) == this.tileTypes.gold.character){
						this.gold++;
						$("#goldCounter").html("Gold: "+this.gold)
						this.swapTiles(j,i,nextX,nextY)
						this.clearTile(j,i)
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

	this.map = []
	this.copyMap = []


	this.frameCount = 0;

	this.viewPosX = 0
	this.viewPosY = 0

	this.tileTypes = {player: new Player(),pathFinder: new PathFinder(),wall: new Wall(), gold: new Gold(), stairs: new Stairs()}
	this.sprites = []
	this.gold = 0
	this.health = 5
	//this.map = this.cloneMap(map)
	this.setMap(this.genRandMap(20, 10))

	
}