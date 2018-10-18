class Game {
	constructor(ctx, fieldSize) {
		this.field = fieldSize || new Vector2(600, 800);

		this.renderer = new Renderer(ctx, this);
		this.ball = null;
		this.player1 = null;
		this.player2 = null;
		this.pxRationX = ctx.canvas.width / this.field.x;
		this.pxRationY = ctx.canvas.height / this.field.y;
		this.pxRatio = new Vector2(this.pxRationX, this.pxRationY);
		this.doUpdate = true;
		this.debug = false;


		document.addEventListener('keyup', (event) => {
			if (event.code === 'Space') {
				this.doUpdate = !this.doUpdate;
			}

			if (event.code === 'Backspace') {
				this.debug = !this.debug;
			}
		});
	}

	get top() {
		return 0;
	}

	get right() {
		return this.field.x;
	}

	get bottom() {
		return this.field.y;
	}

	get left() {
		return 0;
	}

	update() {
		if (this.doUpdate) {
			this.ball.update()
			this.player1.update();
			this.player2.update();
		}
	}

	draw() {
		this.drawDebug();

		this.renderer.defaultStyle();
		this.ball.draw();
		this.renderer.defaultStyle();
		this.player1.draw();
		this.renderer.defaultStyle();
		this.player2.draw();
	}

	drawDebug() {
		if (this.debug) {
			this.ball.drawDebug();
			this.player1.drawDebug();
			this.player2.drawDebug();
			this.renderer.defaultStyle();
		}
	}
}