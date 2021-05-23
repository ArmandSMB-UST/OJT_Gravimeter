// ARMAN'S PROJECT : GRAVIMETER

// -------------------------variables used-------------------------
let bob;
let anchor;
let velocity;
// spring constant
let k = 0.01;
let gravity;
// rest length is the distance between the anchor and the bob
let restLength = 200;
// ----------------------------------------------------------------

function setup() {
  createCanvas(windowWidth, windowHeight);
  bob = createVector(windowWidth/2, 0);
  anchor = createVector(windowWidth/2, 0);
  velocity = createVector(0, 0);
  gravity = createVector(0, 0.5);
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
  let force = p5.Vector.sub(bob, anchor);
  console.log(force);
  // displacement
  let x = force.mag() - restLength;
  // normalize the force vector
  force.normalize();
  // spring force
  force.mult(-1 * k * x);
  
  // F = M*A (if M == 1)
  velocity.add(force);
  velocity.add(gravity);
  bob.add(velocity);

  // damping
  velocity.mult(0.99);
}