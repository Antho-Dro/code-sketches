let angle = 0;

let trail1 = [];
let trail2 = [];
let trail3 = [];

let maxBlueTrail = 50;

let nucleusParticles = [];

function setup() {

  createCanvas(500, 500);

  for (let i = 0; i < 45; i++) {

    let a = random(TWO_PI);
    let r = random(35);

    nucleusParticles.push({

      x: cos(a) * r,
      y: sin(a) * r,

      size: random(16, 26),

      col:
        i % 2 === 0
          ? color(180, 40, 50)
          : color(100, 210, 230)

    });

  }

}

function draw() {

  background(15, 18, 25);

  translate(width / 2, height / 2);

  drawRedGlow();

  let p1 = getElectronPosition(0, 0);
  let p2 = getElectronPosition(60, TWO_PI / 3);
  let p3 = getElectronPosition(-60, TWO_PI * 2 / 3);

  trail1.push(p1);
  trail2.push(p2);
  trail3.push(p3);

  drawOldTrail(trail1);
  drawOldTrail(trail2);
  drawOldTrail(trail3);

  drawBlueTrail(trail1);
  drawBlueTrail(trail2);
  drawBlueTrail(trail3);

  drawCenter();

  drawElectron(p1);
  drawElectron(p2);
  drawElectron(p3);

  angle += 0.05;

}

function drawRedGlow() {

  noStroke();

  for (let i = 220; i > 0; i -= 8) {

    let alpha = map(i, 220, 0, 0, 18);

    fill(255, 40, 60, alpha);

    circle(0, 0, i * 2);

  }

  for (let i = 120; i > 0; i -= 6) {

    let alpha = map(i, 120, 0, 0, 30);

    fill(255, 70, 90, alpha);

    circle(0, 0, i * 2);

  }

}

function getElectronPosition(rotationAngle, offset) {

  let orbitW = 360 / 2;
  let orbitH = 145 / 2;

  let x = cos(angle + offset) * orbitW;
  let y = sin(angle + offset) * orbitH;

  let r = radians(rotationAngle);

  return createVector(

    x * cos(r) - y * sin(r),
    x * sin(r) + y * cos(r)

  );

}

function drawCenter() {

  noStroke();

  for (let p of nucleusParticles) {

    fill(0, 0, 0, 80);

    circle(
      p.x + 3,
      p.y + 3,
      p.size
    );

    fill(p.col);

    circle(
      p.x,
      p.y,
      p.size
    );

  }

}

function drawElectron(pos) {

  noStroke();

  fill(130, 240, 255, 60);
  circle(pos.x, pos.y, 55);

  fill(190, 255, 255);
  circle(pos.x, pos.y, 28);

}

function drawBlueTrail(trail) {

  noFill();

  stroke(160, 240, 255);
  strokeWeight(4);

  beginShape();

  let start = max(
    0,
    trail.length - maxBlueTrail
  );

  for (let i = start; i < trail.length; i++) {

    vertex(
      trail[i].x,
      trail[i].y
    );

  }

  endShape();

}

function drawOldTrail(trail) {

  noFill();

  stroke(80, 120, 130, 130);
  strokeWeight(2);

  beginShape();

  let end = max(
    0,
    trail.length - maxBlueTrail
  );

  for (let i = 0; i < end; i++) {

    vertex(
      trail[i].x,
      trail[i].y
    );

  }

  endShape();

}