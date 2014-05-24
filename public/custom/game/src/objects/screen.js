function Screen (width, height) {
		this.canvas = document.createElement( 'canvas' );
		this.canvas.width = width;
		this.canvas.height = height;

		this.renderer = PIXI.autoDetectRenderer(config.width, config.height);
		this.renderer.view.style.position = "absolute";
		document.body.appendChild(this.renderer.view);

		this.stage = new PIXI.Stage(0xEEEEEE);
		this.container = new PIXI.SpriteBatch();
		this.stage.addChild(this.container);

		this.render = function(){
			this.renderer.render(this.stage);
		}
}