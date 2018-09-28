class Renderer {

	constructor(ctx, game) {
		this.ctx = ctx;
		this.game = game;
		this.defaultFillStyle = "rgba(0, 0, 200, 0.5)";
		this.defaultStrokeStyle = "rgba(0, 0, 200, 0.5)";

	}

    defaultStyle() {
        this.strokeStyle(this.defaultStrokeStyle);
        this.fillStyle(this.defaultFillStyle);
    }

    strokeStyle(style) {
        this.ctx.strokeStyle = style;
    }

    fillStyle(style) {
        this.ctx.fillStyle = style;
    }

	arc(vector1, radius) {
		const position = vector1.multiply(this.game.pxRatio);
		this.ctx.beginPath();
		this.ctx.arc(position.x, position.y, (radius * 2) * this.game.pxRatio.y, 0, 360, false);
		this.ctx.fill();
	}

	rect(vector1, vector2) {
		const from = vector1.multiply(this.game.pxRatio);
		const to = vector2.multiply(this.game.pxRatio);
        this.ctx.fillRect(from.x,from.y, to.x, to.y);
	}

	line(vector1, vector2) {
		const from = vector1.multiply(this.game.pxRatio);
		const to = vector2.multiply(this.game.pxRatio);
		this.ctx.beginPath();
		this.ctx.moveTo(from.x, from.y);
		this.ctx.lineTo(to.x, to.y);
		this.ctx.stroke()
	}
}