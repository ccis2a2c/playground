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

var balls = [];

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
    //碰撞检测
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

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);
    //
    while (balls.length < 20) {
        let ball = new Ball(
            random(0, width),
            random(0, height),
            random(-10, 10),
            random(-10, 10),
            random(10, 20),
            randomColor()
        );
        balls.push(ball);
    }
    //
    for (let i = 0; i < balls.length; i += 1) {
        balls[i].draw();
        balls[i].update();  //两个函数执行的顺序不知道有没有什么坑。
    }
    requestAnimationFrame(loop);
}