function LevelMap(map){
	this.map = []
	this.width = map[0].length
	this.height = map.length

	this.viewWidth = 5
	this.viewHeight = 3

	this.viewWidth = this.width
	this.viewHeight = this.height

	this.viewPosX = 0
	this.viewPosY = 0


	for(var i = 0;i<this.height;i++){
		this.map[i]=[]
		for(var j = 0;j<this.width;j++){
			this.map[i][j] = map[i][j]
		}
	}

	this.print = function(){
		for(var i = 0;i<this.height;i++){
			console.log(this.map[i].join(""))
		}
	}

	this.characterTexture =  new PIXI.Texture.fromImage("assets/characters/nifty/nifty.png")
	this.badGuyTexture =  new PIXI.Texture.fromImage("assets/colors/red.png")
	this.sprites = []

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

	this.getTile = function(x,y){
		if (x < 0 || y < 0 || x >= this.width || y >= this.height){
			return "O"
		}else{
			return this.map[y][x]
		}
	}

	this.runFrame = function(){

	}
}