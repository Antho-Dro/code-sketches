let posX = 200;
let posY = 200;
let posR = 200;
let posV = 200;
let posB = 200;

let size = 20;

let vitX = 1.32;
let vitY = 3.23;
let vitR = 20.3;
let vitV = 25.7;
let vitB = 36.9;


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate (999);

}

function draw() {
  //background(220);
  
  stroke (posR, posV, posB)
  fill (posR, posV, posB )
  
  posR += vitR;
  if ( posR >= 255 || posR <= 0 ) {
    vitR = vitR * -1;
  }
    posV += vitV;
  if ( posV >= 255 || posV <= 0 ) {
    vitV = vitV * -1;
  }
  
      posB += vitB;
  if ( posB >= 255 || posB <= 0 ) {
    vitB = vitB * -1;
  }
  
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


function keyPressed(){
  if( key === "s"){
    save("dessin.png");
  }
}