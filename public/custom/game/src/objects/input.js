var listener = new window.keypress.Listener();
var controllers = []

var Controller = function(keys){
	keyMap = {}
	for(var i in keys){
		keyMap[i] = [keys[i], false, false]
	}

	this.keyHasBeenPressed = null
	this.keys = keyMap;
	this.keyUp = function(key){
		this.keys[key][1]=false;
	};
	this.keyDown = function(key){
		this.keyHasBeenPressed = key
		this.keys[key][1]=true;
		this.keys[key][2]=true;
	};
	this.getKey = function(key){
		return this.keys[key][1];
	}

	this.getKeyPressed = function(key){
		return this.keys[key][2];
	}

	this.clearPressed = function(){
		this.keyHasBeenPressed = null
		for(var k in this.keys){
			this.keys[k][2]=false
		}
	}

	for (var key in this.keys) {
	  listener.register_combo({
	    keys              : this.keys[key][0],
	    on_keydown        : this.keyDown.bind(this, [key]),
	    on_keyup          : this.keyUp.bind(this, [key]),
	    prevent_repeat    : true
		});
	}
}
