var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60)
    };
var canvas = document.createElement("canvas");
var width = 400;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
var ai = new AI();
var computer = new Computer();
var ball = new Ball(200, 300);

var keysDown = {};

var render = function () {
    context.fillStyle = "#FF00FF";
    context.fillRect(0, 0, width, height);
    ai.render();
    computer.render();
    ball.render();
};

let ball_prev_x = 0
let ball_prev_y = 0


const TOP_PLAYER_GOALED = 0
const BOTTOM_PLAYER_GOALED = 1
const BOTTOM_PLAYER_HIT_BALL = 2
const TOP_PLAYER_HIT_BALL = 3
const TOP_PLAYER_WON = 4
const BOTTOM_PLAYER_WON = 5


function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
}

Paddle.prototype.render = function () {
    context.fillStyle = "#0000FF";
    context.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.move = function (x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if (this.x < 0) {
        this.x = 0;
        this.x_speed = 0;
    } else if (this.x + this.width > 400) {
        this.x = 400 - this.width;
        this.x_speed = 0;
    }
};

function Computer() {
    this.paddle = new Paddle(175, 10, 50, 10);
}

Computer.prototype.render = function () {
    this.paddle.render();
};

Computer.prototype.update = function (ball) {
    var x_pos = ball.x;
    var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
    if (diff < 0 && diff < -4) {
        diff = -5;
    } else if (diff > 0 && diff > 4) {
        diff = 5;
    }
    this.paddle.move(diff, 0);
    if (this.paddle.x < 0) {
        this.paddle.x = 0;
    } else if (this.paddle.x + this.paddle.width > 400) {
        this.paddle.x = 400 - this.paddle.width;
    }
};

function AI() {
    this.paddle = new Paddle(175, 580, 50, 10);
}

AI.prototype.render = function () {
    this.paddle.render();
};

AI.prototype.update = function (action) {
    this.paddle.move(4 * action, 0);
};

// function Player() {
//     this.paddle = new Paddle(175, 580, 50, 10);
// }

// Player.prototype.render = function () {
//     this.paddle.render();
// };

// Player.prototype.update = function () {
//     for (var key in keysDown) {
//         var value = Number(key);
//         if (value == 37) {
//             this.paddle.move(-4, 0);
//         } else if (value == 39) {
//             this.paddle.move(4, 0);
//         } else {
//             this.paddle.move(0, 0);
//         }
//     }
// };

function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 3;
}

Ball.prototype.render = function () {
    context.beginPath();
    context.arc(this.x, this.y, 5, 2 * Math.PI, false);
    context.fillStyle = "#000000";
    context.fill();
};

Ball.prototype.update = function (paddle1, paddle2) {
    this.x += this.x_speed;
    this.y += this.y_speed;
    var top_x = this.x - 5;
    var top_y = this.y - 5;
    var bottom_x = this.x + 5;
    var bottom_y = this.y + 5;

    if (this.x - 5 < 0) {
        this.x = 5;
        this.x_speed = -this.x_speed;
    } else if (this.x + 5 > 400) {
        this.x = 395;
        this.x_speed = -this.x_speed;
    }

    if (this.y < 0) {
        this.x_speed = 0;
        this.y_speed = 3;
        this.x = 200;
        this.y = 300;
        return BOTTOM_PLAYER_GOALED
    }

    if (this.y > 600) {
        this.x_speed = 0;
        this.y_speed = 3;
        this.x = 200;
        this.y = 300;
        return TOP_PLAYER_GOALED
    }

    if (top_y > 300) {
        if (top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
            this.y_speed = -3;
            this.x_speed += (paddle1.x_speed / 2);
            this.y += this.y_speed;
            return BOTTOM_PLAYER_HIT_BALL
        }
    } else {
        if (top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
            this.y_speed = 3;
            this.x_speed += (paddle2.x_speed / 2);
            this.y += this.y_speed;
            return TOP_PLAYER_HIT_BALL
        }
    }

    return null
};

window.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];
});
