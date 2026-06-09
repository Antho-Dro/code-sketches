function setup() {
  createCanvas(400, 400);
  background(25, 25, 28);

  let colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'orange',
    'pink'
  ];

  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    stroke(220);
    circle(50 + i * 50, height / 2, 20);
  }
}

function draw() {

}