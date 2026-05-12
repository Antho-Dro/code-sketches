var size = 10;
var ancienX;
var ancienY;


function setup() {
  frameRate (999)
  createCanvas(windowWidth,windowHeight);
  //background(255,204,0);
  ancienX = windowWidth / 2;
  ancienY = windowHeight / 2;
}

function draw() {
  ancienX = ancienX + ( ( mouseX - ancienX ) /100);
  ancienY = ancienY + ( ( mouseY - ancienY ) /100);
  //background(220);
  // Use 6 vertices.
  ellipse(
    ancienX + size, ancienY + size,
    ancienX - size, ancienY - size,
  );
}

function keyPressed (){
  if( key === "s" ){
     save ("dessin.png");
     }
  if( key === "x"){
    background (255)
  }
}

function randomcolor (){
  var R = random(255);
  var G = random(255);
  var B = random(255);
  fill (R,G,B);
  background (R,G,B);
  size = random (25,255);
  
  }

 function mouseClicked (){
   randomcolor();
    
  }