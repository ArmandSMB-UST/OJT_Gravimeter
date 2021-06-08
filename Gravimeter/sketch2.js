// ARMAN'S PROJECT : GRAVIMETER

var cols = window.innerWidth / 4;
var rows = 100;
var colors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (var i = 0; i < cols; i++){
    colors[i] = [];
    for(var j = 0; j < rows; j++){
      colors[i][j] = random(255);
    }
  }
}


function draw() {
background(51);

  for (var i = 0; i < cols; i++){
    for(var j = 40; j < rows; j++){
      var x = i * 20;
      var y = j * 20;
      fill(colors[i][j]);
      stroke(0);
      rect(x, y, 20, 20);
    }
  }
} 

console.log("Window width:\n", cols);