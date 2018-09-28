
(function () {

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

let game = new Game(ctx);
let player1 = game.player1 = new Bot(game);
let player2 = game.player2 = new Bot(game, new Vector2(game.field.x - 20, 0));
// let player2 = game.player2 = new Player(game);
let ball = game.ball = new Ball(game);



setInterval(() => {
	ctx.clearRect(0,0,1280,720);
	game.draw(ctx);
}, 1000 / 120);

setInterval(() => {
	game.update();
}, 1000 / 60);


})()
