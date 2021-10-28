let canvas, canvasDiv, widthOfCanvas, heightOfCanvas, widthOfCanvasInitial, heightOfCanvasInitial; //canvas related
let imgLeftPanelBackground, imgSpringBase, imgSpring, imgSpringWeight;                             //images
let density, volume;                                                                               //interactive inputs
let logoButton;                                                                                    //buttons
let stringAtSpringBase, gravityAnomalyPrint, gravityAnomalyString, charWidth;                      //text
// colors array
var colors = [];
// terrain density array
var densityArray = [];
// anomaliesArray
var anomaliesArray = [];
// volume per cell
volume = 16;
var j;
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
  buttonSub = createImg('/images/decrease-button.png');
  buttonSub.position(Wpercent(3.2), Hpercent(61.5));
  buttonSub.style('width', Wpercent(1.7) + 'px');
  buttonSub.style('height', Hpercent(3.9) + 'px');
  buttonSub.mousePressed(subtract);
  
  // Increment button
  buttonAdd = createImg('/images/increase-button.png');
  buttonAdd.position(Wpercent(10.5), Hpercent(61.5));
  buttonAdd.style('width', Wpercent(1.7) + 'px');
  buttonAdd.style('height', Hpercent(3.9) + 'px');
  buttonAdd.mousePressed(add); 
  
  // Graph button
  buttonGraph = createImg('/images/graph-button.png');
  buttonGraph.position(Wpercent(5), Hpercent(61.5));
  buttonGraph.style('width', Wpercent(5.4) + 'px');
  buttonGraph.style('height', Hpercent(3.9) + 'px');
  buttonGraph.mousePressed(addContinuous);

  buttonClearGraph = createImg('/images/clear-button.png');
  buttonClearGraph.position(Wpercent(37.44), Hpercent(61.5));
  buttonClearGraph.style('width', Wpercent(5.4) + 'px');
  buttonClearGraph.style('height', Hpercent(3.9) + 'px');
  buttonClearGraph.mousePressed(clearGraph);
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
function addContinuous(){
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
function clearGraph(){
noLoop();
lim = -20;
}
function drawGraph() {
strokeWeight(0);
fill(255,255,255);
rect(Wpercent(1.0), Hpercent(16.5), Wpercent(43.35), Hpercent(50));
//lines
fill(0, 0, 0);
stroke(0);
strokeWeight(1);
textSize(widthOfCanvas/91.81);
line(Wpercent(4.20), Hpercent(58.05), Wpercent(4.20),Hpercent(19.35));
line(Wpercent(43), Hpercent(58.05), Wpercent(43), Hpercent(19.35));
// y-axis 70 
line(Wpercent(4.20), Hpercent(58.05), Wpercent(43), Hpercent(58.05));
text('70.0', Wpercent(1.70), Hpercent(58.69));
// y-axis 60
line(Wpercent(4.20), Hpercent(45.15), Wpercent(43), Hpercent(45.15));
text('60.0', Wpercent(1.70), Hpercent(45.79));
// y-axis 50
line(Wpercent(4.20), Hpercent(32.25), Wpercent(43), Hpercent(32.25));
text('50.0', Wpercent(1.70), Hpercent(32.89));
// y-axis 40
line(Wpercent(4.20), Hpercent(19.35),Wpercent(43), Hpercent(19.35));
text('40.0', Wpercent(1.70), Hpercent(19.99));
// y-axis label
textSize(widthOfCanvas/104.93);
text('(mGal)', Wpercent(1.15), Hpercent(41.28));
textSize(widthOfCanvas/73.45);
text('Δg', Wpercent(1.72), Hpercent(37.41));
// x-axis label
xvar = 'index (j)';
charWidth = textWidth(xvar);          
text(xvar, Wpercent(23.6)-charWidth/2, Hpercent(60.63));
// graph title
graphTitle = 'Mineral Deposit Gravity Profile';
charWidth = textWidth(graphTitle);
text(graphTitle, Wpercent(23.6)-charWidth/2, Hpercent(65.14));
}
function windowResized() {
  //canvas adjust
  widthOfCanvas = canvasDiv.offsetWidth;
  heightOfCanvas = windowHeight*0.80;
  resizeCanvas(widthOfCanvas, heightOfCanvas);
  //button adjust
  logoButton.remove();
  buttonSub.remove(), buttonAdd.remove(), buttonGraph.remove(), buttonClearGraph.remove();
  addLogoButton();
  addButtonsDraw();
}
function setup() {
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
function dummyScale(widthOfCanvas, widthOfCanvasInitial, heightOfCanvas, heightOfCanvasInitial){
  var tempWidthScale = 0;
  var tempHeightScale = 0;
  if (widthOfCanvas <= widthOfCanvasInitial){
    tempWidthScale = widthOfCanvas/widthOfCanvasInitial;
  } else if (widthOfCanvas > widthOfCanvasInitial){
    tempWidthScale = widthOfCanvasInitial/widthOfCanvas;
  }
  if (heightOfCanvas <= heightOfCanvasInitial){
    tempHeightScale = heightOfCanvas/heightOfCanvasInitial;
  } else if (heightOfCanvas > heightOfCanvasInitial){
    tempHeightScale = heightOfCanvasInitial/heightOfCanvas;
  }
  let result = [tempWidthScale,tempHeightScale];
  return result;
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
stringAtSpringBase = 'Spring length: ' + measuredSpringLength.toPrecision(4) + ' mm';
charWidth = textWidth(stringAtSpringBase);          
text(stringAtSpringBase, Wpercent(66.667)-charWidth/2, Hpercent(4));

drawGraph();

let count = 62*widthOfCanvasInitial/1469;
let px = count;
let py = anomaliesArray[0] * Math.pow(10, 5) + 660*heightOfCanvasInitial/969;
 
stroke(0);
strokeWeight(1);

let scaleFactor = dummyScale(widthOfCanvas, widthOfCanvasInitial, heightOfCanvas, heightOfCanvasInitial);
scale(scaleFactor[0], scaleFactor[1]);

for (var i = 0; i < lim; i += 10){
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
  line(px, py-(250*heightOfCanvasInitial/969/0.8), x, y-(250*heightOfCanvasInitial/969/0.8));
  px = x;
  py = y;
  count += 2.925;
}
}