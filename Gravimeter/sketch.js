// ARMAN'S PROJECT : GRAVIMETER

// -------------------------variables used-------------------------
let bob;
let anchor;
let velocity;
// spring constant
let k = 0.2; //kgs^{-2}
// Gravity related constants
let gravity;
let mass_max = 1.498387735 * Math.pow(10, 8) //in kg
let G = 6.67384 * Math.pow(10, -11) //gravitational constant in m^3/kgs^{-2}
let density_basalt = 3000 //in kgm^{-3}
let density_coal = 1300 //in kgm^{-3}
let volume_max;
let mass
let delta_g
let input
let volume = 0
let button
let button_link
let gravity_total_vector
let gravity_total = 0
//Define a volume_max = density / mass_max
  //Take this for slider, let mass = density*volume
  //This could be simplified as gravity_total = gravity + G*mass
// rest length is the distance between the anchor and the bob
let restLength = 200.965
// ----------------------------------------------------------------
let img_spring, img_sphereWeight, img_springBase, img_leftPanel, img_logo;

function change_volume(){
  volume = Number(input.value())
  input.value('')
}

function drawLine(x1, x2, y){
  while(x1 < x2){
    point(x1, y);
    x1 += 10;
  }
}

function change_page() {
  location.replace("2DSim.html");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  img_spring = loadImage('vector_items/spring.png');
  img_sphereWeight = loadImage('vector_items/sphere_weight.png');
  img_springBase = loadImage('vector_items/spring_base.png');
  img_leftPanel = loadImage('vector_items/left_panel.png');
  img_volInput = loadImage('vector_items/Volume_Input.png')
  img_logo = loadImage('vector_items/logo.png')
  
  bob = createVector(windowWidth/2, 0);
  anchor = createVector(windowWidth/2, 0);
  velocity = createVector(0, 0);
  gravity = createVector(0, 9.80665); //in ms^{-2}
  gravity_total_vector = createVector(0, gravity_total);

  // slider - refer to this: createSlider(min, max, [value], [step])
  density_slider = createSlider(density_coal, density_basalt, 0, 10); //assume this is in mGal
  density_slider.position(20, 240);
  density_slider.style('width', '250px');

  input = createInput();
  input.position(20, 340);
  input.style('width', '204px');
  input.style('height', '45px');

  textFont('Bahnschrift');
  button = createButton('Input');
  button.position(input.x + input.width + 11, 338);
  button.style('width', '55px');
  button.style('height', '55px');
  button.mousePressed(change_volume);

  button_link1 = createImg('vector_items/activity_2.png');
  button_link1.position(15*windowWidth/16, 3*windowHeight/8);
  button_link1.style('width', '100px');
  button_link1.style('height', '100px');
  button_link1.mousePressed(change_page);

  button_link2 = createImg('vector_items/activity_1.png');
  button_link2.position(15*windowWidth/16, 1*windowHeight/4);
  button_link2.style('width', '100px');
  button_link2.style('height', '100px');
  //button_link2.mousePressed(change_page);

  button_link3 = createImg('vector_items/activity_3.png');
  button_link3.position(15*windowWidth/16, 5*windowHeight/10);
  button_link3.style('width', '100px');
  button_link3.style('height', '100px');
  button_link3.mousePressed();
}


function draw() {
  background(237, 248, 250);
  textSize(30);
  //Logo
  image(img_logo, 5, -1, 400, 120)
  //Left_Panel
  image(img_leftPanel, 0, 130, 400, 290);
  
  //text('Gravity total:\t' + gravity_total.toFixed(6), 20, 50);
  text('Δg:\t' + (delta_g*pow(10,5)).toFixed(0) + ' mGal', 20, 170);

  text('Density:', density_slider.x * -11.5 + density_slider.width, 220);
  text(String(density_slider.value()) + ' kgm⁻³', density_slider.x * -5 + density_slider.width, 220);
  text('Volume: ', density_slider.x * -11.5 + density_slider.width, 320);
  text(String(volume) + " m³", density_slider.x * -5 + density_slider.width, 320);
 // text('Recommended maximum volume: \n' + String(volume_max) + ' units', density_slider.x * -11.5 + density_slider.width, 370);
  
 // Equilibrium & Max Stretch
  strokeWeight(2);
  drawLine(windowWidth / 3, 2*windowWidth / 3, 250);
  drawLine(windowWidth / 3, 2*windowWidth / 3, 750);

  spring_length = bob.y - anchor.y;
  actual_length = spring_length/50;

  // Images
  image(img_spring, windowWidth/2 - 27, 50, 54, spring_length-85);
  image(img_sphereWeight, windowWidth/2 - 39, bob.y-35, 78, 70);
  image(img_springBase, windowWidth/2 - 185, 0, 370, 52);
  text('Spring length: ' + actual_length.toFixed(3) + ' mm', 800, 35);
  image(img_volInput, 15, 336, 278, 60)

  // // vector that points from A to B
  let force = p5.Vector.sub(bob, anchor); // s0 - 0
  
  console.log(force);
  // displacement
  let y = force.mag() - restLength; //change in length
  // normalize the force vector
  force.normalize();
  // spring force
  force.mult(-1 * k * y); //F = -k(s - s0)

  mass = density_slider.value() * volume;
  delta_g = mass * G;
  gravity_total = gravity.y + delta_g;
  volume_max = mass_max / density_slider.value();

  // fakes
  delta_g_fake = 100000 * delta_g; //to scale actual length and pixels
  gravity_total_fake = gravity.y + delta_g_fake;

  // F = M*A (if M == 1)
  velocity.add(force);
  velocity.add(gravity_total_vector);
  bob.add(velocity);

  // damping
  velocity.mult(0.38);  //according to one paper

  // console.log("volume max: " + volume_max)
  // console.log("mass: " + mass)
  // console.log("delta_g: " + delta_g)
  // console.log("g_total: " + gravity_total)
  // console.log("spring length: " + spring_length)

  // adjust gravity total
  gravity_total_vector.y = gravity_total_fake;
} 