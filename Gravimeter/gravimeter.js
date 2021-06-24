// SKETCH FOR THE FIRST PAGE

// -------------------------------variables used-------------------------------

// weight
let bob;

// bob reference point
let anchor;

// --- Motion Variables ---

// bob velocity
let velocity;

// force vector
let force;

// displacement
let displacement;

// --- Spring Related Constants ---

// distance between the anchor and the bob
let restLength = 200.965;

// spring constant in kgs^{-2}
let k = 0.2;

// --- Gravity Related Constants ---

// gravity vector
let gravity;

// gravitational constant in m^3/kgs^{-2}
let G = 6.67384 * Math.pow(10, -11);

// gravitational anomaly
let anomaly;

// total vector
let gravity_total_vector;

// gravity total
let gravity_total = 0;

// scaled values
let anomaly_scaled;
let gravity_total_scaled;

// ---------------------------------

// densities in kgm^{-3}
let density_basalt = 3000;
let density_coal = 1300;
let density_slider;

// input for volume
let input;

// volume in m^3
let volume = 0;

// button for input confirmation
let button;

// image variables
let img_spring, img_sphereWeight, img_springBase, img_leftPanel, img_logo;
// ----------------------------------------------------------------------------

// function for changing the volume
function changeVolume(){
  volume = Number(input.value());
  input.value('');
  density_slider.value(0);
}

// function for drawing the max stretch of the spring
function drawLine(x1, x2, y){
  while(x1 < x2){
    point(x1, y);
    x1 += 10;
  }
}

// change page to subduction zone
function changePageSZ() {
  location.replace("subduction.html");
}

// change page to soil deposit 1
function changePageSD1(){
  location.replace("deposit1.html");
}

// change page to gravimeter
function changePageGM(){
  location.replace("gravimeter.html");
}

// change page to welcome
function changePageW(){
  location.replace("index.html");
}

// function for reading the images
function readImages(){
  img_spring = loadImage('vector_items/spring.png');
  img_sphereWeight = loadImage('vector_items/sphere_weight.png');
  img_springBase = loadImage('vector_items/spring_base.png');
  img_leftPanel = loadImage('vector_items/left_panel.png');
  img_volInput = loadImage('vector_items/volume_input.png')
}

// function for creating the vectors
function makeVectors(){
  bob = createVector(windowWidth/2, 0);
  anchor = createVector(windowWidth/2, 0);
  velocity = createVector(0, 0);
  gravity = createVector(0, 9.80665);
  gravity_total_vector = createVector(0, gravity_total);
}

// function for adding the sliders
function addSliders(){
  density_slider = createSlider(density_coal, density_basalt, 0, 5); //assume this is in mGal
  density_slider.position(20, 240);
  density_slider.style('width', '250px');
}

// function for adding the input box
function addInput(){
  input = createInput();
  input.position(20, 340);
  input.style('width', '204px');
  input.style('height', '45px');
}

// function for adding the buttons
function addButtons(){

  // input button
  button = createButton('Input');
  button.position(input.x + input.width + 11, 338);
  button.style('width', '55px');
  button.style('height', '55px');
  button.mousePressed(changeVolume);

  // subduction zone button
  button_link1 = createImg('vector_items/activity_2.png');
  button_link1.position(15*windowWidth/16, 3*windowHeight/8);
  button_link1.style('width', '100px');
  button_link1.style('height', '100px');
  button_link1.mousePressed(changePageSZ);

  // gravimeter button
  button_link2 = createImg('vector_items/activity_1.png');
  button_link2.position(15*windowWidth/16, 1*windowHeight/4);
  button_link2.style('width', '100px');
  button_link2.style('height', '100px');
  button_link2.mousePressed(changePageGM);

  // soil deposit 1 button
  button_link3 = createImg('vector_items/activity_3.png');
  button_link3.position(15*windowWidth/16, 5*windowHeight/10);
  button_link3.style('width', '100px');
  button_link3.style('height', '100px');
  button_link3.mousePressed(changePageSD1);

  button_link4 = createImg('vector_items/logo.png');
  button_link4.position(5, -1);
  button_link4.style('width', '400px');
  button_link4.style('height', '120px');
  button_link4.mousePressed(changePageW);
}

// setup function
function setup() {
  createCanvas(windowWidth, windowHeight);
  readImages();
  makeVectors();
  addSliders();
  addInput();
  addButtons();
}

// draw function
function draw() {
  
  background(237, 248, 250);
  textSize(30);

  // length in pixels
  spring_length = bob.y - anchor.y;

  // length in mm
  actual_length = spring_length/50;

  // images
  image(img_leftPanel, 0, 130, 400, 290);
  image(img_spring, windowWidth/2 - 27, 50, 54, spring_length-85);
  image(img_sphereWeight, windowWidth/2 - 39, bob.y-35, 78, 70);
  image(img_springBase, windowWidth/2 - 195, 0, 390, 52);
  image(img_volInput, 15, 336, 278, 60)

  // texts
  text('Δg:\t' + (anomaly*pow(10,5)).toFixed(0) + ' mGal', 20, 170);
  text('Density:', density_slider.x * -11.5 + density_slider.width, 220);
  text(String(density_slider.value()) + ' kgm⁻³', density_slider.x * -5 + density_slider.width, 220);
  text('Volume: ', density_slider.x * -11.5 + density_slider.width, 320);
  text(String(volume) + " m³", density_slider.x * -5 + density_slider.width, 320);
  text('Spring length: ' + actual_length.toFixed(3) + ' mm', 790, 35);
  
  // max stretch
  strokeWeight(2);
  drawLine(windowWidth / 3, 2*windowWidth / 3, 750);

  // vector from A to B
  force = p5.Vector.sub(bob, anchor);
  
  // displacement - change in length
  displacement = force.mag() - restLength;
  
  // normalize the force vector
  force.normalize();
  
  // spring force (F = -k(s - s0))
  force.mult(-1 * k * displacement);

  // computes the g anomaly
  anomaly = (density_slider.value() * volume) * G;

  // scaled values (actual length and pixels)
  anomaly_scaled = 100000 * anomaly;
  gravity_total_scaled = gravity.y + anomaly_scaled;

  // moves the bob -> assumption: F = m*a (if m == 1kg)
  velocity.add(force);
  velocity.add(gravity_total_vector);

  if (anomaly_scaled <= 100 && actual_length <= 15){
    bob.add(velocity);
  }

  // damping
  velocity.mult(0.38);

  // adjust gravity total
  gravity_total_vector.y = gravity_total_scaled;
} 