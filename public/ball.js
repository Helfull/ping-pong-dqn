class Ball extends Entity {

    constructor(game) {
        super(
            game,
            new Vector2(
                game.field.x / 2,
                game.field.y / 2
            ),
            5
        );

        this.speedMultiplier = 1.05
        this.radius = 20;
        this.closest = new Vector2(0, 0);
        this.distCenter = new Vector2(0,0);

        // this.setVelY(rand(-10, 10));
        // this.setVelX(rand(-10, 10));
        //
        this.setVelY(this.force);
        this.setVelX(-this.force);
    }

    update() {
        super.update();

        if (this.position.x >= this.game.right || this.position.x <= this.game.left) {
            this.setVelX(-this.getVelX());
        }

        if (this.position.y >= this.game.bottom || this.position.y <= this.game.top) {
            this.setVelY(-this.getVelY());
        }

        if (this.position.x < this.game.field.x / 2) {
            if (this.collisionX(this.game.player1)) {
                this.setVelX(-(this.getVelX()) + this.game.player1.getVelX());

                this.setVelY(this.getVelY() * this.speedMultiplier);
                this.setVelX(this.getVelX() * this.speedMultiplier);
            }

            if (this.collisionY(this.game.player1)) {
                this.setVelY(-(this.getVelY()) + this.game.player1.getVelY());

                this.setVelY(this.getVelY() * this.speedMultiplier);
                this.setVelX(this.getVelX() * this.speedMultiplier);
            }
        } else {
            if (this.collisionX(this.game.player2)) {
                this.setVelX(-(this.getVelX()) + this.game.player2.getVelX());

                this.setVelY(this.getVelY() * this.speedMultiplier);
                this.setVelX(this.getVelX() * this.speedMultiplier);
            }

            if (this.collisionY(this.game.player2)) {
                this.setVelY(-(this.getVelY()) + this.game.player2.getVelY());

                this.setVelY(this.getVelY() * this.speedMultiplier);
                this.setVelX(this.getVelX() * this.speedMultiplier);
            }
        }

        if (this.die()) {
            this.position = new Vector2(
                this.game.field.x / 2,
                this.game.field.y / 2
            );
        }

        if (this.game.debug) {
            console.log(this.velocity);
        }
    }

    die() {
        return this.position.x <= 10;
    }

    closestPointTo(player) {
        return this.closest = new Vector2(
            clamp(this.position.x, player.position.x, player.position.x + player.size.x),
            clamp(this.position.y, player.position.y, player.position.y + player.size.y)
        );
    }

    /**
     * Did we hit on the X axis (left or right)
     * @param  {Player} player
     * @return {boolean}
     */
    collisionX(player) {

        this.closestPointTo(player);
        return this.collision(this.closest) &&
            this.closest.y > player.position.y &&
            this.closest.y < player.size.y + player.position.y;
    }

    /**
     * Did we hit on the y axis (top or bottom)
     * @param  {Player} player
     * @return {boolean}
     */
    collisionY(player) {
        this.closestPointTo(player);
        return this.collision(this.closest) &&
            this.closest.x > player.position.x &&
            this.closest.x < player.size.x + player.position.x;
    }

    /**
     * Did we hit the player?
     * @param  {Player} player
     * @return {boolean}
     */
    collision(closest) {

        this.distCenter = new Vector2(
            this.position.x - closest.x,
            this.position.y - closest.y
        );

        const distSqrt = (this.distCenter.x * this.distCenter.x) + (this.distCenter.y * this.distCenter.y);
        return distSqrt < (this.radius *.85  * this.radius * .85);
    }



    draw() {
        this.game.renderer.defaultStyle();

        this.game.renderer.arc(this.position, this.radius);
    }

    drawDebug() {
        this.game.renderer.strokeStyle("green");
        this.game.renderer.fillStyle("green");
        this.game.renderer.arc(this.closest, Math.abs(this.distCenter.x + this.distCenter.y));

        this.game.renderer.strokeStyle("red");
        this.game.renderer.fillStyle("red");

        this.game.renderer.arc(this.position, 2);
        this.game.renderer.line(this.position, this.closest);
        this.game.renderer.arc(this.closest, 2);

        this.game.renderer.rect(new Vector2(0,0), new Vector2(10, this.game.field.y));
    }
}