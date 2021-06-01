// ARMAN'S PROJECT : GRAVIMETER

// -------------------------variables used-------------------------
let bob;
let anchor;
let velocity;
// spring constant
let k = 0.2; //kgs^{-2}
// Gravity related constants
let gravity;
let mass_max = 1.498387735*10^8 //in kg
let G = 6.67384 * 10 **(-11) //gravitational constant in m^3/kgs^{-2}
let density_basalt = 3000 //in kgm^{-3}
let density_coal = 1300 //in kgm^{-3}
//Define a volume_max = density / mass_max
  //Take this for slider, let mass = density*volume
  //This could be simplified as gravity_total = gravity + G*mass
// rest length is the distance between the anchor and the bob
let restLength = 200; 
// ----------------------------------------------------------------

function setup() {
  createCanvas(windowWidth, windowHeight);
  bob = createVector(windowWidth/2, 0);
  anchor = createVector(windowWidth/2, 0);
  velocity = createVector(0, 0);
  gravity = createVector(0, 9.80665); //in ms^{-2}

  // slider - refer to this: createSlider(min, max, [value], [step])
  slider = createSlider(0, 100, 0, 0.5); //assume this is in mGal
  slider.position(10, 50);
  slider.style('width', '150px');
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

  // F = M*A (if M == 1)
  velocity.add(force);
  velocity.add(gravity);
  bob.add(velocity);

  // damping
  velocity.mult(0.38);  //according to one paper

  // adjust gravity
  gravity.y = slider.value();
} 