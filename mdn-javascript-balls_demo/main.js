// 设定画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 设定画布长宽
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数
function random(min,max) {
    return Math.floor(Math.random()*(max-min)) + min;
}

// 生成随机颜色的函数
function randomColor() {
    return 'rgb(' +
        random(0, 255) + ', ' +
        random(0, 255) + ', ' +
        random(0, 255) + ')';
}

//一些默认的参数
const BALL_MAX_VEL = 10
const BALL_MIN_SIZE = 10
const BALL_MAX_SIZE = 20

function Ball(x, y, velX, velY, size, color) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.size = size;
    this.color = color;
}

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

Ball.prototype.update = function() {
    if (this.x + this.size >= width) {
        this.velX = -(this.velX);
    }
    if (this.x - this.size <= 0) {
        this.velX = -(this.velX);
    }
    if (this.y + this.size >= height) {
        this.velY = -(this.velY);
    }
    if (this.y - this.size <= 0) {
        this.velY = -(this.velY);
    }
    this.x += this.velX;
    this.y += this.velY;
}

Ball.prototype.collisionDetect = function() {   //碰撞检测
    for (let i = 0; i < balls.length; i += 1) {
        if (balls[i] === this) {
            continue;
        }
        let dx = balls[i].x - this.x;
        let dy = balls[i].y - this.y;
        let dist = dx * dx + dy * dy;
        if (dist <= (balls[i].size + this.size) * (balls[i].size + this.size)) {
            this.color = randomColor();
            //balls[i].color = randomColor();   //似乎没必要
        }
    }
}

var balls = [];

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);
    //
    while (balls.length < 20) {
        let ball = new Ball(
            random(0 + BALL_MAX_SIZE, width - BALL_MAX_SIZE),
            random(0 + BALL_MAX_SIZE, height - BALL_MAX_SIZE),  //限制小球的生成位置，避免出现小球沿边缘鬼畜的问题。
            random(-BALL_MAX_VEL, BALL_MAX_VEL),
            random(-BALL_MAX_VEL, BALL_MAX_VEL),
            random(BALL_MIN_SIZE, BALL_MAX_SIZE),
            randomColor()
        );
        balls.push(ball);
    }
    //
    for (let i = 0; i < balls.length; i += 1) {
        balls[i].update();
        balls[i].draw();    //我认为，没有坑。
        balls[i].collisionDetect();
    }
    requestAnimationFrame(loop);
}