let canvas;
let img_spring, img_springBase;

function setup() {
    canvas = createCanvas(400, 400)
    canvas.parent('sketch-holder');
    img_spring = loadImage('images/spring.png');
    img_springBase = loadImage('images/spring-base.png');
}

function draw() {
    background('gray');
    textSize(80);
    image(img_spring, 155, 45, 70, 300);
    image(img_springBase, 50, 0, 300, 45);
}
