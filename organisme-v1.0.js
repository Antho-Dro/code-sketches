let particles = [];
let numParticles = 220;

let center;
let breath = 0;
let mood = "calm";

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  center = createVector(width / 2, height / 2);

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(i));
  }
}

function draw() {
  background(5, 6, 12, 35);

  center.set(width / 2, height / 2);
  breath = sin(frameCount * 0.025) * 35;

  updateMood();

  drawGlow();

  for (let p of particles) {
    p.update();
  }

  drawConnections();

  for (let p of particles) {
    p.display();
  }

  drawCore();
}

function updateMood() {
  let mouseSpeed = dist(mouseX, mouseY, pmouseX, pmouseY);

  if (mouseIsPressed) {
    mood = "stress";
  } else if (mouseSpeed > 20) {
    mood = "curious";
  } else {
    mood = "calm";
  }
}

function drawGlow() {
  noStroke();

  for (let i = 8; i > 0; i--) {
    let alpha = map(i, 8, 0, 2, 22);
    let size = 280 + breath + i * 60;

    if (mood === "stress") {
      fill(120, 20, 35, alpha);
    } else if (mood === "curious") {
      fill(70, 40, 160, alpha);
    } else {
      fill(20, 90, 140, alpha);
    }

    ellipse(center.x, center.y, size);
  }
}

function drawCore() {
  noStroke();

  let pulse = 18 + sin(frameCount * 0.08) * 5;

  if (mood === "stress") {
    fill(180, 30, 45, 170);
  } else if (mood === "curious") {
    fill(120, 90, 255, 150);
  } else {
    fill(40, 180, 220, 140);
  }

  ellipse(center.x, center.y, pulse);
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let a = particles[i];
      let b = particles[j];
      let d = dist(a.pos.x, a.pos.y, b.pos.x, b.pos.y);

      if (d < 75) {
        let alpha = map(d, 0, 75, 55, 0);

        if (mood === "stress") {
          stroke(180, 40, 60, alpha);
        } else if (mood === "curious") {
          stroke(150, 110, 255, alpha);
        } else {
          stroke(60, 200, 240, alpha);
        }

        strokeWeight(0.7);
        line(a.pos.x, a.pos.y, b.pos.x, b.pos.y);
      }
    }
  }
}

class Particle {
  constructor(id) {
    this.id = id;
    this.angle = random(TWO_PI);
    this.radius = random(40, 220);
    this.pos = createVector(
      center.x + cos(this.angle) * this.radius,
      center.y + sin(this.angle) * this.radius
    );
    this.vel = p5.Vector.random2D().mult(random(0.2, 1));
    this.acc = createVector(0, 0);
    this.size = random(2, 5);
    this.noiseOffset = random(1000);
  }

  update() {
    this.acc.mult(0);

    let targetRadius = this.radius + breath;
    let targetAngle = this.angle + frameCount * 0.002;

    let target = createVector(
      center.x + cos(targetAngle) * targetRadius,
      center.y + sin(targetAngle) * targetRadius
    );

    let returnForce = p5.Vector.sub(target, this.pos);
    returnForce.mult(0.008);
    this.acc.add(returnForce);

    let n = noise(this.noiseOffset, frameCount * 0.008);
    let organicAngle = map(n, 0, 1, -PI, PI);
    let organicForce = p5.Vector.fromAngle(organicAngle);
    organicForce.mult(0.08);
    this.acc.add(organicForce);

    let mouse = createVector(mouseX, mouseY);
    let mouseDist = dist(mouseX, mouseY, this.pos.x, this.pos.y);

    if (mouseDist < 180) {
      let mouseForce = p5.Vector.sub(this.pos, mouse);

      if (mood === "curious") {
        mouseForce.mult(-1);
      }

      mouseForce.setMag(map(mouseDist, 0, 180, 0.9, 0));
      this.acc.add(mouseForce);
    }

    if (mood === "stress") {
      let chaos = p5.Vector.random2D().mult(0.35);
      this.acc.add(chaos);
    }

    this.vel.add(this.acc);
    this.vel.limit(mood === "stress" ? 4 : 2);
    this.vel.mult(mood === "calm" ? 0.94 : 0.97);
    this.pos.add(this.vel);
  }

  display() {
    noStroke();

    let flicker = sin(frameCount * 0.05 + this.id) * 1.5;
    let s = this.size + flicker;

    if (mood === "stress") {
      fill(220, 45, 65, 190);
    } else if (mood === "curious") {
      fill(160, 120, 255, 190);
    } else {
      fill(90, 220, 255, 180);
    }

    ellipse(this.pos.x, this.pos.y, s);
  }
}

function mousePressed() {
  for (let p of particles) {
    let explosion = p5.Vector.sub(p.pos, center);
    explosion.setMag(random(2, 6));
    p.vel.add(explosion);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  center.set(width / 2, height / 2);
}