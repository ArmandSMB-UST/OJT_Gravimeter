// function for reading the images
function readImages(){
    img_welcome = loadImage('vector_items/welcome_screen.png');
}

// change page to gravimeter
function changePageGM(){
    location.replace("gravimeter.html");
}

function addButtons(){
    button_link1 = createImg('vector_items/start.png');
    button_link1.position(windowWidth/2-80, 4.5*windowHeight/7);
    button_link1.style('width', '170px');
    button_link1.style('height', '76px');
    button_link1.mousePressed(changePageGM);
}

// setup function
function setup(){
    createCanvas(windowWidth, windowHeight);
    readImages();
    addButtons();
}

// draw function
function draw(){
    background(img_welcome);
}