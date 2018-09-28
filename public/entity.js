class Entity {

	constructor(game, position, force=10) {
		this.game = game;
		this.position = position;
		this.velocity = new Vector2(0, 0);
		this.force = force;
	}

	update() {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}

	setVelY(force) {
		this.velocity.y = force;
	}

	getVelY() {
		return this.velocity.y;
	}

	setVelX(force) {
		this.velocity.x = force;
	}

	getVelX() {
		return this.velocity.x;
	}

	clearVelocity() {
		this.velocity = {x: 0, y: 0};
	}
}