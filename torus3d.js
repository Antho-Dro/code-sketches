function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(0);

  let a = frameCount * 0.01;
  let b = frameCount * 0.01;
  let c = frameCount * 0.01;


  push();
  stroke(0, 166, 0);
  fill(35);

  rotateY(a);
  rotateX(-b);
  rotateZ(-c);
  torus(120, 60, 5, 3);
  pop();

  push();
  stroke(166, 166, 166);
  fill(48);
  

  rotateY(-a);
  rotateX(b);
  rotateZ(c);
  sphere(40, 18, 8);
  pop();
}