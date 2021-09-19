let canvas, canvasDiv, widthOfCanvas, heightOfCanvas;                                       //canvas related
let widthOfCanvasInitial, heightOfCanvasInitial;
let imgLeftPanelBackground, imgSpringBase, imgSpring, imgSpringWeight;                      //images
let density, volume;                                                                        //interactive inputs
let logoButton;                                                                             //buttons
let stringAtSpringBase, gravityAnomalyPrint, gravityAnomalyString;                          //text
let charWidth;

// colors array
var colors = [];
// terrain density array
var densityArray = [];
// anomaliesArray
var anomaliesArray = [];
// volume per cell
volume = 16;

let lim = 0;

/*-------------------------------variables used-------------------------------*/

/* --- Spring Related Variables --- */
let bob;
let anchor;
let restLength;
const k = 0.2;
let springLength, measuredSpringLength;
springLength = 0; 
measuredSpringLength = 0;

/* --- Motion Variables --- */
let velocity;
let force;
let displacement;

/* --- Gravity Related Variables --- */
let gravity;
const G = 6.67384 * Math.pow(10, -11);
let gravityAnomaly;
let gravityTotalVector;
let gravityTotal = 0;
let gravityAnomalyScaled;
let gravityTotalScaled;

function readImages(){
    imgLeftPanelBackground = loadImage('/images/left-panel-background.png');
    imgSpringBase = loadImage('/images/spring-base.png');
    imgSpring = loadImage('/images/spring.png');
    imgSpringWeight = loadImage('/images/spring-weight.png');
}
function addLogoButton(){
    logoButton = createImg('/images/logo.png');
    logoButton.position(0, 0);
    logoButton.style('width', Wpercent(33.333)+'px');
    logoButton.style('height', Hpercent(15)+'px');
    function changePageToWelcomeScreen() {
        location.replace("index.html");
    }
    logoButton.mousePressed(changePageToWelcomeScreen);
}
function makeVectors(){
    bob = createVector(Wpercent(66.667), 0);
    anchor = createVector(Wpercent(66.667), 0);
    velocity = createVector(0, 0);
    gravity = createVector(0, 9.80665);
    gravityTotalVector = createVector(0, gravityTotal);
}
function windowResized() {
    //canvas adjust
    widthOfCanvas = canvasDiv.offsetWidth;
    heightOfCanvas = windowHeight*0.80;
    resizeCanvas(widthOfCanvas, heightOfCanvas);
    //button adjust
    logoButton.remove();
    button_subtract.remove(), button_add.remove(), button_graph.remove(), button_clearGraph.remove();
    addLogoButton();
    addButtonsDraw();
}
function Wpercent(desiredPercentage) {
    var convertedValue = (desiredPercentage/100)*widthOfCanvas;
    return convertedValue;
}
function Hpercent(desiredPercentage) {
    var convertedValue = (desiredPercentage/100)*heightOfCanvas;
    return convertedValue;
}
//Matrix Functions
function terrainObject(density, x, y, dimension){
    this.density = density;
    this.x = x;
    this.y = y;
    this.dimension = dimension;
}
// color object
function colorObject(r, g, b){
    this.r = r;
    this.g = g;
    this.b = b;
}
// function for getting a randomm number from min to max
function gaussianRand() {
  var rand = 0;

  for (var i = 0; i < 6; i += 1) {
    rand += Math.random();
  }

  return rand / 6;
}
function gaussianRandom(start, end) {
  return Math.floor(start + gaussianRand() * (end - start + 1));
}

// setup terrain function
function setupTerrain(){
  for (var i = Math.floor(windowHeight/1.50); i < windowHeight; i+=10){
    colors[i] = [];

    for (var j = 0; j < windowWidth; j+=10){
            
      // granite
      if (j > ((windowWidth/2)+150)){
        colors[i][j] = new colorObject(120, 98, 97);
      }

      // basalt
      else if (i > (Math.floor(windowHeight/1.50))+60 && j < (windowWidth/2)-100){

        if (i == (Math.floor(windowHeight/1.50))+70){
          if ((j == (windowWidth/64)-30 || j == (windowWidth/64)-20 || j == (windowWidth/64)-10)){
            colors[i][j] = new colorObject(146,208,235);
          }
          else if (j >= (windowWidth/64)+50 && j <= (windowWidth/64)+90){
            colors[i][j] = new colorObject(146,208,235);
          }
          else if (j >= (windowWidth/64)+300 && j <= (windowWidth/64)+340){
            colors[i][j] = new colorObject(146,208,235);
          }
          else if (j >= (windowWidth/64)+600 && j <= (windowWidth/64)+680){
            colors[i][j] = new colorObject(146,208,235);
          }
          else if (j >= (windowWidth/64)+780 && j <= (windowWidth/64)+880){
            colors[i][j] = new colorObject(146,208,235);
          }
          else{
            colors[i][j] = new colorObject(128, 128, 128);
          }
        }

        else if (i == (Math.floor(windowHeight/1.50))+80){
          if (j == (windowWidth/64)-30){
            colors[i][j] = new colorObject(146,208,235);
          }
          else{
            colors[i][j] = new colorObject(128, 128, 128);
          }
        }

        else{
          colors[i][j] = new colorObject(128, 128, 128);
        }
      }

      // water
        else if (i <= (Math.floor(windowHeight/1.50))+60 && j < (windowWidth/2)-100){
          colors[i][j] = new colorObject(146,208,235);
        }

        else{

          if (i <= (Math.floor(windowHeight/1.50))+60 && j < (windowWidth/2)+150){
            if (j == (windowWidth/2)+140 && (i == (Math.floor(windowHeight/1.50))+60 || i == (Math.floor(windowHeight/1.50))+50)){
              colors[i][j] = new colorObject(120, 98, 97);
            }
            else{
              colors[i][j] = new colorObject(146,208,235);
            }
          }

          else if (i <= (Math.floor(windowHeight/1.50))+60 && j < (windowWidth/2)+160){
            if (i == (Math.floor(windowHeight/1.50))+10 || i == (Math.floor(windowHeight/1.50))+20){
              colors[i][j] = new colorObject(146,208,235);
            }
          else{
            colors[i][j] = new colorObject(120, 98, 97);
            }
          }

          // basalt
          else{
            if (i > (Math.floor(windowHeight/1.50))+60 && i <= (Math.floor(windowHeight/1.50))+140){
              // ------------------------ granite ---------------------------------------------------- //
              if (j == (windowWidth/2)+150 || j == (windowWidth/2)+140 || j == (windowWidth/2)+130){
                colors[i][j] = new colorObject(120, 98, 97);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+70 && j == (windowWidth/2)+120){
                colors[i][j] = new colorObject(120, 98, 97);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+80 && j == (windowWidth/2)+110){
                colors[i][j] = new colorObject(120, 98, 97);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+90 && j == (windowWidth/2)+100){
                colors[i][j] = new colorObject(120, 98, 97);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+100 && j == (windowWidth/2)+90){
                colors[i][j] = new colorObject(120, 98, 97);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+110 && j == (windowWidth/2)+80){
                colors[i][j] = new colorObject(120, 98, 97);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+120 && j == (windowWidth/2)+70){
                colors[i][j] = new colorObject(120, 98, 97);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+120 && j == (windowWidth/2)+60){
                colors[i][j] = new colorObject(120, 98, 97);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+130 && j == (windowWidth/2)+50){
                colors[i][j] = new colorObject(120, 98, 97);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+140 && j == (windowWidth/2)+40){
                colors[i][j] = new colorObject(120, 98, 97);
              }
              // ------------------------ basalt ---------------------------------------------------- //
              else if (i >= (Math.floor(windowHeight/1.50))+80 && j == (windowWidth/2)-100){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+90 && j == (windowWidth/2)-90){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+100 && j == (windowWidth/2)-80){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+110 && j == (windowWidth/2)-70){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+110 && j == (windowWidth/2)-60){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+120 && j == (windowWidth/2)-50){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+130 && j == (windowWidth/2)-40){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+140 && j == (windowWidth/2)-30){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+140 && j == (windowWidth/2)-20){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              // ------------------------ water ---------------------------------------------------- //
              else{
                colors[i][j] = new colorObject(146,208,235);
              }
            }

            else{
              // ------------------------ basalt ---------------------------------------------------- //
              if (j >= (windowWidth/2)-100 && j <= (windowWidth/2)-20){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (j == (windowWidth/2)-10 || j == (windowWidth/2)){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+150 && j == (windowWidth/2)+10){
                if (i == (Math.floor(windowHeight/1.50))+150){
                  colors[i][j] = new colorObject(146,208,235);
                }
                else{
                  colors[i][j] = new colorObject(128, 128, 128);
                }
              }
              // ------------------------ basalt ---------------------------------------------------- //
              else if (i >= (Math.floor(windowHeight/1.50))+160 && j == (windowWidth/2)+20){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+170 && j == (windowWidth/2)+30){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+170 && j == (windowWidth/2)+40){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+180 && j == (windowWidth/2)+50){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+190 && j == (windowWidth/2)+60){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+190 && j == (windowWidth/2)+70){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+200 && j == (windowWidth/2)+80){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+200 && j == (windowWidth/2)+90){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+200 && j == (windowWidth/2)+100){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+210 && j == (windowWidth/2)+110){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+220 && j == (windowWidth/2)+120){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+240 && j == (windowWidth/2)+130){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+250 && j == (windowWidth/2)+140){
                colors[i][j] = new colorObject(128, 128, 128);
              }
              else if (i >= (Math.floor(windowHeight/1.50))+270 && j == (windowWidth/2)+150){
                colors[i][j] = new colorObject(128, 128, 128);
              }
                // ------------------------ granite ---------------------------------------------------- //
              else{
                colors[i][j] = new colorObject(120, 98, 97);
              }
            }
          }
        }
      }
    }
} 
function computeAnomaly(){
  for (var i = Math.floor(windowHeight/1.50); i < windowHeight; i+=10){
    for (var j = 0; j < windowWidth; j+=10){
        var summation = 0;
        for (var k = 0; k < windowWidth; k+=10){
          summation = summation + (densityArray[i][j].density * volume);
        }
        anomaliesArray[j] = summation * G;
    }
  }
}
// generates the terrain
function generateTerrain(){
  // generates 2d matrix
  for (var i = Math.floor(windowHeight/1.50); i < windowHeight; i+=10){
      densityArray[i] = []
      for (var j = 0; j < windowWidth; j+=10){
        // water
        if (colors[i][j].r == 146){
          densityArray[i][j] = new terrainObject(1000, j, i, 10);
        }
        // basalt
        else if (colors[i][j].r == 128){
          densityArray[i][j] = new terrainObject(gaussianRandom(2700, 3200), j, i, 10);
        }
        // granite
        else{
          densityArray[i][j] = new terrainObject(gaussianRandom(2520, 2750), j, i, 10);
        }
      }
  }
  computeAnomaly();
}
// draw and color terrain
function drawTerrain(){
  strokeWeight(0.1);
  for (var i = Math.floor(windowHeight/1.50); i < windowHeight; i+=10){
    for (var j = 0; j < windowWidth; j+=10){
        fill(colors[i][j].r, colors[i][j].g, colors[i][j].b);
        rect(j, i, 10, 10);
    }
  }
}
// function for button for graph
function addButtonsDraw(){
    // Decrement button
    button_subtract = createImg('/images/decrease-button.png');
    button_subtract.position(Wpercent(3.2), Hpercent(62.5));
    button_subtract.style('width', Wpercent(1.7) + 'px');
    button_subtract.style('height', Hpercent(3.9) + 'px');
    button_subtract.mousePressed(subtract);

    // Increment button
    button_add = createImg('/images/increase-button.png');
    button_add.position(Wpercent(10.5), Hpercent(62.5));
    button_add.style('width', Wpercent(1.7) + 'px');
    button_add.style('height', Hpercent(3.9) + 'px');
    button_add.mousePressed(add); 
      
    // Graph button
    button_graph = createImg('/images/graph-button.png');
    button_graph.position(Wpercent(5), Hpercent(62.5));
    button_graph.style('width', Wpercent(5.4) + 'px');
    button_graph.style('height', Hpercent(3.9) + 'px');
    button_graph.mousePressed(add_continuous);
  
    button_clearGraph = createImg('/images/clear-button.png');
    button_clearGraph.position(Wpercent(37.44), Hpercent(62.5));
    button_clearGraph.style('width', Wpercent(5.4) + 'px');
    button_clearGraph.style('height', Hpercent(3.9) + 'px');
    button_clearGraph.mousePressed(clear_graph);
}
// add increment for graph
function add(){
  loop();
  if(lim < 0){
    lim += 10;
  }
  lim += 10;
}
// subtract increment for graph
function subtract(){
  loop();
  if(lim < 10){
    return;
  }
  lim -= 10;
}
// graph
function add_continuous(){
  loop();
  var i = 0;  
  lim = 0;
  var timer = setInterval(function(){
    lim += 10;
    i++;
    if(i >= anomaliesArray.length / 10){ 
      clearInterval(timer);
    } else if (lim < 0){
      clearInterval(timer);
    }
  }, 100);
}
// clear graph
function clear_graph(){
  noLoop();
  lim = -20;
}
function drawGraph() {
  scale(widthOfCanvas/widthOfCanvasInitial, heightOfCanvas/heightOfCanvasInitial);
  fill(0,0,0);
  strokeWeight(0);
  fill(255,255,255);
  rect(10,130,630,350);
  //lines
  fill(0, 0, 0);
  stroke(0);
  strokeWeight(1);
  textSize(16);

  // y-axis
  line(60, 450, 60, 150);
  line(620, 450, 620, 150);
  // x-axis 70 
  line(60, 450, 620, 450);
  text('70.0', 25, 455);
  // x-axis 60
  line(60, 350, 620, 350);
  text('60.0', 25, 355);
  // x-axis 50
  line(60, 250, 620, 250);
  text('50.0', 25, 255);
  // x-axis 40
  line(60, 150, 620, 150);
  text('40.0', 25, 155);

  // y-axis label
  textSize(20);
  text('Δg', 25, 290);
  textSize(14);
  text('(mGal)', 15, 320);

  // x-axis label
  textSize(20);
  text('index (j)', 290, 470);

  // graph title
  textSize(20);
  text('Subduction Zone Gravity Profile', 190, 505);
}
function setup() {
  //canvas setup
  canvasDiv = document.getElementById('left-part-java');
  widthOfCanvas = canvasDiv.offsetWidth;
  widthOfCanvasInitial = canvasDiv.offsetWidth;
  heightOfCanvas = windowHeight*0.80;
  heightOfCanvasInitial = windowHeight*0.80;
  canvas = createCanvas(widthOfCanvas, heightOfCanvas);
  canvas.parent('left-part-java');
  readImages();
  addLogoButton();
  makeVectors();
  setupTerrain();
  generateTerrain();
  addButtonsDraw();
}

function draw() {
  background(235, 248, 250);
  textSize(Wpercent(100)/47.967);
  
  var restLength = Hpercent(20);

  //images
  image(imgLeftPanelBackground, 0, Hpercent(15), Wpercent(45.5), Hpercent(53));
  image(imgSpringBase, Wpercent(66.667)-Wpercent(28)/2, 0, Wpercent(28), Hpercent(6));
  image(imgSpring, Wpercent(66.67)-Wpercent(5)/2, Hpercent(6), Wpercent(5), springLength + 1);
  image(imgSpringWeight, Wpercent(66.67)-Wpercent(6.5)/2, springLength + Hpercent(5.5), Wpercent(6.5), Hpercent(10));

  //texts
  stringAtSpringBase = 'Spring length: ' + measuredSpringLength.toPrecision(4) + ' μm';
  charWidth = textWidth(stringAtSpringBase);          
  text(stringAtSpringBase, Wpercent(66.667)-charWidth/2, Hpercent(4));

  drawGraph();

  //defined variables
  let count = 60;
  let px = count;
  let py = anomaliesArray[0] * Math.pow(10, 5)+500;

  stroke(0);
  strokeWeight(1);

  for (var i = 0; i < lim; i+=10){
    console.log(i);
    measuredSpringLength = (0.005 + (gravityAnomaly/k))*pow(10,3);

    //Motion equations
    force = p5.Vector.sub(bob, anchor);
    displacement = force.mag() - restLength;
    springLength = (restLength + displacement)*0.80;
    force.normalize();
    force.mult(-1 * k * displacement);
    
    gravityAnomaly = anomaliesArray[i];

    gravityAnomalyScaled = gravityAnomaly*pow(10,5);
    gravityTotalScaled = gravity.y + gravityAnomalyScaled;

    velocity.add(force);
    velocity.add(gravityTotalVector);

    if (gravityAnomalyScaled <= 100 && measuredSpringLength <= 10){
        bob.add(velocity);
    } else {
        measuredSpringLength = 10;
    }
    // damping
    velocity.mult(0.38);
    // adjust gravity total
    gravityTotalVector.y = gravityTotalScaled;
    let x = count;
    let y = anomaliesArray[i] * Math.pow(10, 5)*10;
    line(px, py-250, x, y-250);
    px = x;
    py = y;
    count += 2.925;
  }
}