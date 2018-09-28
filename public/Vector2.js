class Vector2 {

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(vector) {
		return new Vector2(this.x + vector.x, this.y + vector.y);
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
}
