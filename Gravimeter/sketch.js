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
let gravity_total_vector
let gravity_total = 0
//Define a volume_max = density / mass_max
  //Take this for slider, let mass = density*volume
  //This could be simplified as gravity_total = gravity + G*mass
// rest length is the distance between the anchor and the bob
let restLength = 200
// ----------------------------------------------------------------

function setup() {
  createCanvas(windowWidth, windowHeight);
  bob = createVector(windowWidth/2, 0);
  anchor = createVector(windowWidth/2, 0);
  velocity = createVector(0, 0);
  gravity = createVector(0, 9.80665); //in ms^{-2}
  gravity_total_vector = createVector(0, gravity_total)

  // slider - refer to this: createSlider(min, max, [value], [step])
  density_slider = createSlider(density_coal, density_basalt, 0, 0.5); //assume this is in mGal
  density_slider.position(20, 165);
  density_slider.style('width', '250px');

  // slider - refer to this: createSlider(min, max, [value], [step])
  // volume_slider = createSlider(0, volume_max, 0, 0.5); //assume this is in mGal
  // volume_slider.position(10, 100);
  // volume_slider.style('width', '150px');

  input = createInput()
  input.position(20, 265)
  input.style('width', '210px');
  input.style('height', '45px');

  button = createButton('Input')
  button.position(input.x + input.width, 265);
  button.style('width', '60px');
  button.style('height', '50px');
  button.mousePressed(change_volume)
}

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

function draw() {
  // color : light blue
  background(68, 85, 90);
  strokeWeight(4);
  stroke(255);
  line(anchor.x, anchor.y, bob.x, bob.y);
  // color : firebrick
  fill(178, 34, 34);
  circle(anchor.x, anchor.y, 32);
  circle(bob.x, bob.y, 64);

  fill(0);
  textSize(24);

  text('Gravity total:\t' + gravity_total, 20, 50);
  text('Delta g:\t' + delta_g, 20, 100);

  text('Density:', density_slider.x * -11.5 + density_slider.width, 150);
  text(String(density_slider.value()) + ' units', density_slider.x * -5 + density_slider.width, 150);
  text('Volume: ', density_slider.x * -11.5 + density_slider.width, 250);
  text(String(volume) + " units", density_slider.x * -5 + density_slider.width, 250);
  text('Recommended maximum volume: \n' + String(volume_max) + ' units', density_slider.x * -11.5 + density_slider.width, 370);
  
  strokeWeight(2);
  drawLine(650, 1110, 250);
  drawLine(650, 1110, 750)

  spring_length = bob.y - anchor.y / 5;
  text('Spring length: ' + spring_length, 20, 450);
  
  // if (mouseIsPressed){
  //   bob.x = mouseX;
  //   bob.y = mouseY;
  //   velocity.set(0, 0);
  // }

  // vector that points from A to B
  let force = p5.Vector.sub(bob, anchor); // s0 - 0
  console.log(force);
  // displacement
  let y = force.mag() - restLength; //change in length
  // normalize the force vector
  force.normalize();
  // spring force
  force.mult(-1 * k * y); //F = -k(s - s0)

  mass = density_slider.value() * volume
  delta_g = mass * G
  gravity_total = gravity.y + delta_g
  volume_max = mass_max / density_slider.value()

  // fakes
  delta_g_fake = 10000 * delta_g;
  gravity_total_fake = gravity.y + delta_g_fake

  // F = M*A (if M == 1)
  velocity.add(force);
  velocity.add(gravity_total_vector);
  bob.add(velocity);

  // damping
  velocity.mult(0.38);  //according to one paper

  console.log("volume max: " + volume_max)
  console.log("mass: " + mass)
  console.log("delta_g: " + delta_g)
  console.log("g_total: " + gravity_total)
  console.log("spring length: " + spring_length)

  // adjust gravity total
  gravity_total_vector.y = gravity_total_fake;
} 