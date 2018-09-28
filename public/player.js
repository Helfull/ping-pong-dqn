class Player extends Entity {

	constructor(game, position=new Vector2(10, 0)) {
		super(game, position, 10);
		this.size = new Vector2(10, 100);
		document.addEventListener('keydown', (event) => {
			if (event.code === 'ArrowUp') {
				this.setVelY(-this.force);
			}

			if (event.code === 'ArrowDown') {
				this.setVelY(this.force);
			}
		});


		document.addEventListener('keyup', (event) => {
			if (event.code === 'ArrowUp') {
				this.setVelY(0);
			}

			if (event.code === 'ArrowDown') {
				this.setVelY(0);
			}
		});
	}

	draw() {
		this.game.renderer.rect(this.position, this.size);
	}

	drawDebug() {}

	debug() {
		console.log(this);
	}
}

class Bot extends Player {
	update() {
		super.update();

		this.position.y  = this.game.ball.position.y - this.size.y / 2;
	}
}