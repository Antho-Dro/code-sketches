let planets = [];
let stars = [];
let center;
let zoom = 1;
let targetZoom = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  center = createVector(width / 2, height / 2);

  for (let i = 0; i < 250; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(0.5, 2),
      alpha: random(70, 190)
    });
  }

  planets.push(new Planet("Mercure", 70, 4, 0.045, color(150, 145, 135)));
  planets.push(new Planet("Vénus", 110, 8, 0.032, color(218, 165, 95)));
  planets.push(new Planet("Terre", 155, 9, 0.025, color(55, 125, 210)));
  planets.push(new Planet("Mars", 205, 7, 0.019, color(185, 75, 50)));
  planets.push(new Planet("Jupiter", 285, 18, 0.011, color(200, 155, 115)));
  planets.push(new Planet("Saturne", 370, 16, 0.008, color(210, 185, 120), true));
  planets.push(new Planet("Uranus", 455, 13, 0.006, color(130, 210, 220)));
  planets.push(new Planet("Neptune", 530, 13, 0.0045, color(45, 90, 190)));
}

function draw() {
  background(3, 4, 10);

  center.set(width / 2, height / 2);
  zoom = lerp(zoom, targetZoom, 0.08);

  drawStars();

  push();
  translate(center.x, center.y);
  scale(zoom);

  drawOrbits();

  for (let planet of planets) {
    planet.update();
    planet.displayTrail();
  }

  for (let planet of planets) {
    planet.display();
  }

  drawSun();

  pop();

  for (let planet of planets) {
    planet.displayName();
  }

  drawInterface();
}

function drawStars() {
  noStroke();

  for (let s of stars) {
    let twinkle = sin(frameCount * 0.03 + s.x) * 30;
    fill(255, s.alpha + twinkle);
    ellipse(s.x, s.y, s.size);
  }
}

function drawSun() {
  noStroke();

  fill(255, 185, 65);
  ellipse(0, 0, 55);

  fill(255, 230, 130, 160);
  ellipse(-8, -10, 18);
}

function drawOrbits() {
  noFill();

  for (let planet of planets) {
    stroke(255, 255, 255, 28);
    strokeWeight(1 / zoom);
    ellipse(0, 0, planet.distance * 2);
  }
}

function drawInterface() {
  noStroke();
  fill(255, 220);
  textSize(13);
  textAlign(LEFT, TOP);

  text("Système solaire interactif", 24, 24);
  text("Scroll : zoom   |   Clic : impulsion gravitationnelle", 24, 46);
}

function mousePressed() {
  for (let planet of planets) {
    planet.speed *= random(1.15, 1.45);
  }
}

function mouseWheel(event) {
  targetZoom -= event.delta * 0.001;
  targetZoom = constrain(targetZoom, 0.45, 2.2);
  return false;
}

class Planet {
  constructor(name, distance, size, speed, col, ring = false) {
    this.name = name;
    this.distance = distance;
    this.size = size;
    this.speed = speed;
    this.baseSpeed = speed;
    this.col = col;
    this.ring = ring;
    this.angle = random(TWO_PI);
    this.trail = [];
  }

  update() {
    this.speed = lerp(this.speed, this.baseSpeed, 0.01);
    this.angle += this.speed;

    this.x = cos(this.angle) * this.distance;
    this.y = sin(this.angle) * this.distance;

    this.trail.push(createVector(this.x, this.y));

    if (this.trail.length > 90) {
      this.trail.shift();
    }
  }

  displayTrail() {
    noFill();

    for (let i = 1; i < this.trail.length; i++) {
      let p1 = this.trail[i - 1];
      let p2 = this.trail[i];

      let alpha = map(i, 0, this.trail.length, 0, 85);

      stroke(red(this.col), green(this.col), blue(this.col), alpha);
      strokeWeight(map(i, 0, this.trail.length, 0.4, 1.5) / zoom);

      line(p1.x, p1.y, p2.x, p2.y);
    }
  }

  display() {
    push();
    translate(this.x, this.y);

    noStroke();

    fill(this.col);
    ellipse(0, 0, this.size * 2);

    fill(255, 150);
    ellipse(-this.size * 0.35, -this.size * 0.4, this.size * 0.45);

    if (this.ring) {
      noFill();
      stroke(210, 185, 120, 140);
      strokeWeight(2 / zoom);
      rotate(-0.4);
      ellipse(0, 0, this.size * 3.2, this.size * 1.2);
    }

    pop();
  }

  displayName() {
    let screenX = center.x + this.x * zoom;
    let screenY = center.y + this.y * zoom;

    noStroke();
    fill(255);
    textAlign(CENTER, BOTTOM);
    textSize(11);

    text(this.name, screenX, screenY - this.size * zoom - 10);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  center.set(width / 2, height / 2);
}