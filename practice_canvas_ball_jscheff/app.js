const app = { //создаем объект app
canvas: document.querySelector('Canvas'), //кладем метод <canvas>
width:document.documentElement.clientWidth, 
height: document.documentElement.clientHeight, //поместили длину и ширину HTML-документа

draw() { //создаем метод draw
    //стираем холст
    this.ctx.clearRect(0, 0, this.width, this.height)
    //рисуем новое положение каждого шара
    Circle.contains.forEach((item) => {
        item.draw()
    });
    //опять запускаем draw()
    window.requestAnimationFrame(this.draw.bind(this)); 
    //метод сообщает браузеру то, что мы хотим выполнить анимацию
},

init() {
    //получаем контекст 2d
    this.ctx = this.canvas.getContext('2d');
    // чтобы canvas занимал всю ширину и высоту viewport
    [this.canvas.width, this.canvas.height] = [this.width, this.height]
    // запускаем анимацию
    window.requestAnimationFrame(this.draw.bind(this))
}
};


class Circle {
    static contains = [];
    constructor(x, y, dx, dy, r, color) {
        this.x = x;
        this.y = y;
        //x и y – это координаты центра окружности;
        this.dx = dx;
        this.dy = dy;
        //dx и dy – определяют направление движения шара и его скорость, другими 
        // словами, на сколько сместится шар по x и y при следующей отрисовке кадра;
        this.r = r; //r – это радиус окружности;
        this.color = color; //color – задаёт цвет заливки окружности.
        this.constructor.contains.push(this);
    }

    static create() {
        const r = 15
        const x = Math.random() * (app.width - r * 2) + r
        const y = Math.random() * (app.height - r * 2) + r
        const dx = (Math.random() - 0.5) * 5
        const dy = (Math.random() - 0.5) * 5
        const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`
        new this(x, y, dx, dy, r, color)
    }

    processBorderCollision() {
        if (this.x + this.r >= app.width || this.x - this.r <= 0) {
            this.dx = -this.dx
        }
        if (this.y + this.r >= app.height || this.y - this.r <= 0) {
            this.dy = -this.dy
        }
}
static processCollision (circle1, circle2) {
    const d1x = circle1.x - circle2.x;
  const d1y = circle1.y - circle2.y;
  const dc = Math.sqrt(d1x * d1x + d1y * d1y);
  const v1c = Math.sqrt(circle1.dx * circle1.dx + circle1.dy * circle1.dy);
  const v2c = Math.sqrt(circle2.dx * circle2.dx + circle2.dy * circle2.dy);
  const vcmax = Math.max(v1c, v2c);
  const v1x = circle1.dx / vcmax;
  const v1y = circle1.dy / vcmax;
  const v2x = circle2.dx / vcmax;
  const v2y = circle2.dy / vcmax;
  const min = circle1.r + circle2.r;
  if (dc <= min) {
    const v1xNew = d1x / dc + v1x;
    const v1yNew = d1y / dc + v1y;
    const v2xNew = -d1x / dc + v2x;
    const v2yNew = -d1y / dc + v2y;
    const v1cNew = Math.sqrt(v1xNew * v1xNew + v1yNew * v1yNew);
    const v2cNew = Math.sqrt(v2xNew * v2xNew + v2yNew * v2yNew);
    const ratio = (v1c + v2c) / (v1cNew + v2cNew);
    circle1.dx = v1xNew * ratio;
    circle1.dy = v1yNew * ratio;
    circle2.dx = v2xNew * ratio;
    circle2.dy = v2yNew * ratio;
        }
    }
    update () {
        for (let i = 0; Circle.contains.length - 1; i++) {
            for (let j = i + 1; j < Circle.contains.length; j++) {
                Circle.processCollision(Circle.contains[i], Circle.contains[j]);
            }
        }
        this.processBorderCollision();
        this.x += this.dx;
        this.y += this.dy;
    }

    draw() {
        app.ctx.beginPath();
        app.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        app.ctx.fillStyle = this.color;
        app.ctx.fill();
        this.update();
      }
}

for (let i = 0;i < 30; i++) {
    Circle.create();
}

app.init();



