

let bg;
let countPerFrame = 6;   
let maxTries = 30;       
let circles = [];        

function setup() {
  createCanvas(400, 400);
  pixelDensity(2);
  bg = color(25, 25, 28); 
  background(bg);
  noFill();
}

function draw() {
  
  for (let i = 0; i < countPerFrame; i++) {
    trySpawnCrater();
  }

  
  if (circles.length > 5) noLoop();
}

function trySpawnCrater() {
  for (let t = 0; t < maxTries; t++) {
    let r = random(4, 42);
    let x = random(r, width - r);
    let y = random(r, height - r);

    
    if (!tooClose(x, y, r)) {
      circles.push({ x, y, r });
      drawCrater(x, y, r);
      break;
    }
  }
}

function tooClose(x, y, r) {
  
  let start = max(0, circles.length - 80);
  for (let i = start; i < circles.length; i++) {
    let c = circles[i];
    let d = dist(x, y, c.x, c.y);
    if (d < (r + c.r) * 0.75) return true;
  }
  return false;
}

function drawCrater(x, y, r) {
  
  let dx = -0.18 * r;
  let dy = -0.18 * r;

  
  let ctx = drawingContext;
  let g = ctx.createRadialGradient(
    x + dx, y + dy, r * 0.05,
    x, y, r
  );
  
  g.addColorStop(0.0, "rgba(210,210,210,0.85)");
  g.addColorStop(0.55, "rgba(160,160,160,0.85)");
  g.addColorStop(1.0, "rgba(120,120,120,0.90)");

  ctx.fillStyle = g;
  ctx.strokeStyle = "rgba(0,0,0,0)";
  ctx.beginPath();
  ctx.ellipse(x, y, r, r, 0, 0, Math.PI * 2);
  ctx.fill();

  
  strokeWeight(max(1, r * 0.10));
  noFill();

  
  stroke(230, 230, 230, 170);
  arc(x, y, 2 * r, 2 * r, radians(215), radians(35));

  
  stroke(70, 70, 70, 140);
  arc(x, y, 2 * r, 2 * r, radians(35), radians(215));

  
  strokeWeight(max(1, r * 0.05));
  stroke(255, 255, 255, 80);
  arc(x + dx * 0.6, y + dy * 0.6, 2 * r * 0.92, 2 * r * 0.92, radians(230), radians(30));

  stroke(30, 30, 30, 60);
  arc(x - dx * 0.6, y - dy * 0.6, 2 * r * 0.92, 2 * r * 0.92, radians(30), radians(230));

  
  if (r > 10 && random() < 0.35) {
    let rr = r * random(0.12, 0.32);
    let ox = random(-r * 0.25, r * 0.25);
    let oy = random(-r * 0.25, r * 0.25);

    
    fill(110, 110, 110, 180);
    noStroke();
    ellipse(x + ox, y + oy, rr * 2);

    noFill();
    strokeWeight(max(1, rr * 0.25));
    stroke(235, 235, 235, 120);
    arc(x + ox, y + oy, rr * 2, rr * 2, radians(220), radians(40));
    stroke(60, 60, 60, 120);
    arc(x + ox, y + oy, rr * 2, rr * 2, radians(40), radians(220));
  }
}

function mousePressed() {
 
  for (let i = 0; i < 10; i++) trySpawnCrater();
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    circles = [];
    background(bg);
    loop();
  }
}
