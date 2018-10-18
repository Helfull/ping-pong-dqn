class Vector2 {

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

    subtract(vector) {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

	add(vector) {
		return new Vector2(this.x + vector.x, this.y + vector.y);
	}

    divide(vector) {
        return new Vector2(this.x / vector.x, this.y / vector.y);
    }

    divider(value) {
        const x = this.x === 0 ? 0 : value / this.x;
        const y = this.y === 0 ? 0 : value / this.y;
        return new Vector2(x, y);
    }

    multiplyBy(value) {
        return new Vector2(this.x * value, this.y * value);
    }

	multiply(vector) {
		return new Vector2(this.x * vector.x, this.y * vector.y);
	}

    sqr() {
        return new Vector2(this.x * this.x, this.y * this.y);
    }

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}
