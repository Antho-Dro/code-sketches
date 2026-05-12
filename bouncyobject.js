//bouncy object

let bouncy = {
  
  size: 16,
  posX: 10,
  posY: 15,
  vitX: 1.2,
  vitY: 0.9,
  name: "bouncy thing",
  
  update: function(){
    this.posX = this.posX + this.vitX;
    this.posY += this.vitY;
    
    if(this.posX + this.size > width || this.posX < 0){
      this.vitX = this.vitX *= -1;
    }
    if(this.posY + this.size > height || this.posY < 0){
      this.vitY *= -1;
  }
    
    stroke(255,0,255);
    strokeWeight(2);
    square(this.posX, this.posY, this.size);
    noStroke(),
    text(this.name, this.posX, this.posY -4);
  } // fin update
  
} //fin bouncy object


let chaton = Object.create (bouncy);
chaton.name = "fuzzy kitten";
chaton.vitX = 1.5;
chaton.vitY = 1.5;


let machin = Object.create (bouncy);
machin.name = "bouncy McBouncerFace";
machin.vitX = 2;
machin.vitY = 2;



function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  bouncy.update();
  chaton.update();
  machin.update();
}