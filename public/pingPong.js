
(function () {

    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");

    const game = new Game(ctx, new Vector2(20, 20));
    const player1 = game.player1 = new Bot(game);
    const player2 = game.player2 = new Bot(game, new Vector2(game.field.x - 20, 0));
    // const player2 = game.player2 = new Player(game);
    const ball = game.ball = new Ball(game);


    // game.renderer.translate(new Vector2(game.field.x / 2, game.field.y / 2));

    setInterval(() => {
    	ctx.clearRect(0, 0, 1280, 720);
    	game.draw(ctx);
    }, 1000 / 120);

    setInterval(() => {
    	game.update();
    }, 1000 / 60);


})()
