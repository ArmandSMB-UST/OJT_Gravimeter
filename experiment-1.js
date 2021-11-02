let canvas, canvasDiv, widthOfCanvas, heightOfCanvas;                                       //canvas related
let imgLeftPanelBackground, imgSpringBase, imgSpring, imgSpringWeight, imgVolumeInput;      //images
let densitySlider, density, volumeInput, volume;                                            //interactive inputs
volume = 0;
let logoButton, volumeInputButton;                                                          //buttons
let stringAtSpringBase, gravityAnomalyPrint, gravityAnomalyString;                          //text
let charWidth;

/*-------------------------------variables used-------------------------------*/

/* --- Spring Related Variables --- */
/* weight */
let bob;
/* bob reference point */
let anchor;
/* distance between the anchor and the bob */
let restLength;
/* spring constant in kgs^{-2} */
const k = 0.2;
let springLength, measuredSpringLength;
springLength = 0; //in pixels
measuredSpringLength = 0;

/* --- Motion Variables --- */
/* bob velocity */
let velocity;
/* force vector */
let force;
/* displacement */
let displacement;

/* --- Gravity Related Variables --- */
/* gravity vector */
let gravity;
//gravitational constant in m^3/kgs^{-2}
const G = 6.67384 * Math.pow(10, -11);
//earth's equatorial radius constant in m
const Re = 6378137;
/* gravitational anomaly */
let gravityAnomaly;
/* total vector */
let gravityTotalVector;
/* gravity total */
let gravityTotal = 0;
/* scaled values */ //to relate pixels and real life values
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
function addVolumeInput(){
    volumeInput = createInput();
    volumeInput.position(22, Hpercent(30));
    volumeInput.style('width', Wpercent(15)+'px');
    volumeInput.style('height', Hpercent(5)+'px');
    volumeInputButton = createImg('images/volume-input.png');
    volumeInputButton.position(volumeInput.x + Wpercent(15), Hpercent(30));
    volumeInputButton.style('width', Wpercent(6)+'px');
    volumeInputButton.style('height', Hpercent(5)+'px');
    function changeVolume(){
        volume = Number(volumeInput.value());
        volumeInput.value('');
        densitySlider.value(0);
        density = 0;
    }
    volumeInputButton.mousePressed(changeVolume);
}
function addDensitySlider(){
    densitySlider = createSlider(1000, 5000, 0, 5);
    densitySlider.position(22, Hpercent(45));
    densitySlider.style('width', Wpercent(30)+'px');
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
    heightOfCanvas = windowHeight*0.96;
    resizeCanvas(widthOfCanvas, heightOfCanvas);

    //logo button adjust
    logoButton.remove();
    addLogoButton();

    //density slider adjust
    densitySlider.remove();
    addDensitySlider();

    //volume input adjust
    volumeInput.remove();
    volumeInputButton.remove();
    addVolumeInput();
}
function Wpercent(desiredPercentage) {
    var convertedValue = (desiredPercentage/100)*widthOfCanvas;
    return convertedValue;
}
function Hpercent(desiredPercentage) {
    var convertedValue = (desiredPercentage/100)*heightOfCanvas;
    return convertedValue;
}

function setup() {
    //canvas setup
    canvasDiv = document.getElementById('left-part-java');
    widthOfCanvas = canvasDiv.offsetWidth;
    heightOfCanvas = windowHeight*0.96;
    canvas = createCanvas(widthOfCanvas, heightOfCanvas);
    canvas.parent('left-part-java');
    readImages();
    addLogoButton();
    addDensitySlider();
    addVolumeInput();
    makeVectors();
}

function draw() {
    background(235, 248, 250);
    textSize(Wpercent(100)/47.967);
    
    //images
    image(imgLeftPanelBackground, 0, Hpercent(15), Wpercent(33.333), Hpercent(40));
    image(imgSpringBase, Wpercent(66.667)-Wpercent(28)/2, 0, Wpercent(28), Hpercent(6));
    image(imgSpring, Wpercent(66.67)-Wpercent(5)/2, Hpercent(6), Wpercent(5), springLength);
    image(imgSpringWeight, Wpercent(66.67)-Wpercent(6.5)/2, springLength+Hpercent(5.5), Wpercent(6.5), Hpercent(10));

    //texts
    text(gravityAnomalyString, 10, Hpercent(20));
    text('Volume (10¹⁴): ' + String(volume) + ' m³', 10, Hpercent(25));
    text('Density: '+ String(density)+ ' kgm⁻³', 10, Hpercent(40));
    stringAtSpringBase = 'Spring length: ' + measuredSpringLength.toPrecision(4) + ' mm';
    charWidth = textWidth(stringAtSpringBase);          
    text(stringAtSpringBase, Wpercent(66.667)-charWidth/2, Hpercent(4));

    //defined variables
    var restLength = Hpercent(20);
    density = densitySlider.value();
    measuredSpringLength = (0.005 + (gravityAnomaly/k))*pow(10,3);
    gravityAnomaly = density * volume * G / Re**2 * Math.pow(10, 14);

    //Motion equations
    // vector to sphere weight from spring base
    force = p5.Vector.sub(bob, anchor);
    displacement = force.mag() - restLength;
    springLength = (restLength + displacement)*0.80;
    force.normalize();
    // spring force -> F = -kΔs
    force.mult(-1 * k * displacement);
    
    // scaled values (actual length and pixels)
    gravityAnomalyScaled = gravityAnomaly*pow(10,5);
    console.log(gravityAnomaly);
    console.log(gravityAnomalyScaled);
    gravityTotalScaled = gravity.y + gravityAnomalyScaled;

    // moves the bob -> assumption: F = m*a (if m == 1kg)
    velocity.add(force);
    velocity.add(gravityTotalVector);

    if (gravityAnomalyScaled <= 100 && measuredSpringLength <= 10){
        bob.add(velocity);
        gravityAnomalyPrint = (gravityAnomaly*pow(10,5)).toPrecision(4);
        gravityAnomalyString = 'Δg: ' + gravityAnomalyPrint + ' mGal';
    } else {
        gravityAnomalyString = 'Δg: Out of Range';
        measuredSpringLength = 10;
    }

    // damping
    velocity.mult(0.38);

    // adjust gravity total
    gravityTotalVector.y = gravityTotalScaled;
}