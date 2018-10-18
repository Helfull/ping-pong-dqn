class Renderer {

	constructor(ctx, game) {
		this.ctx = ctx;
		this.game = game;
		this.defaultFillStyle = "rgba(0, 0, 200, 0.5)";
		this.defaultStrokeStyle = "rgba(0, 0, 200, 0.5)";
        this.center = new Vector2(0, 0);
        this.pxRatio = (new Vector2(ctx.canvas.width, ctx.canvas.height)).divide(game.field);
        this.flipped = new Vector2(1, -1);
	}

    translate(center) {
        this.center = center;
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
		const position = this._normalizePosition(vector1);
		this.ctx.beginPath();
		this.ctx.arc(position.x, position.y, (radius * 2) * this.pxRatio.y, 0, 360, false);
		this.ctx.fill();
	}

	rect(vector1, vector2) {
		const from = this._normalizePosition(vector1);
		const to = this._normalizePosition(vector2);
        this.ctx.fillRect(from.x,from.y, to.x, to.y);
	}

	line(vector1, vector2) {
		const from = this._normalizePosition(vector1);
		const to = this._normalizePosition(vector2);
		this.ctx.beginPath();
		this.ctx.moveTo(from.x, from.y);
		this.ctx.lineTo(to.x, to.y);
		this.ctx.stroke()
	}

    _translatePosition(vector) {
        if (! this.center) {
            return vector;
        }
        return new Vector2(this.center.x + vector.x, this.center.y + vector.y);
    }

    _normalizePosition(vector) {
        return this._translatePosition(vector.multiply(this.flipped)).multiply(this.pxRatio);
    }
}