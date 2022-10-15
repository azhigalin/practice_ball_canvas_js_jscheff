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
    constructor(x, y, dx, r, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.r = r;
        this.color = color;
        this.constructor.contains.push(this);
    }
}