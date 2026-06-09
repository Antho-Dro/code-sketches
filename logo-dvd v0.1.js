let posX = 200;
let posY = 200;
let size = 20;
let vitX = 3.34;
let vitY = 1.276;



function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate (999);

}

function draw() {
  background(25, 25, 28);
  
  posX += vitX;
  posY += vitY;
  
    
  if ( posX >= width-size || posX <= 0 ) {
    vitX = vitX * -1;
  }
  if ( posY >= height-size || posY <= 0 ) {
    vitY = vitY * -1;
  }
  square(posX, posY, size);
  
}