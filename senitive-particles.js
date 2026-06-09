let particles = [];
let cols = 28;
let rows = 28;
let spacing = 12;

function setup() {
  createCanvas(400, 400);

  for (let x = 40; x < width - 40; x += spacing) {
    for (let y = 40; y < height - 40; y += spacing) {
      particles.push(new Particle(x, y));
    }
  }
}

function draw() {
  background(25, 25, 28);

  for (let p of particles) {
    p.applyMouseForce();
    p.returnHome();
    p.update();
    p.show();
  }
}

class Particle {
  constructor(x, y) {
    this.home = createVector(x, y);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  applyMouseForce() {
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(this.pos, mouse);
    let d = dir.mag();

    if (d < 80) {
      dir.normalize();
      let force = map(d, 0, 80, 3, 0);
      dir.mult(force);
      this.applyForce(dir);
    }
  }

  returnHome() {
    let dir = p5.Vector.sub(this.home, this.pos);
    dir.mult(0.04);
    this.applyForce(dir);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.mult(0.85);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    noStroke();
    fill(255);
    circle(this.pos.x, this.pos.y, 3);
  }
}