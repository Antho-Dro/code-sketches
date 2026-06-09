//bouncy object

let bouncy = {
  
  size: 16,
  posX: 10,
  posY: 15,
  vitX: 1.2,
  vitY: 0.9,
  name: "bouncy thing",

  r: 255,
  g: 155,
  b: 28,
  
  update: function(){
    
    this.posX = this.posX + this.vitX;
    this.posY += this.vitY;
    
    if(this.posX + this.size > width || this.posX < 0){
      this.vitX *= -1;
    }
    
    if(this.posY + this.size > height || this.posY < 0){
      this.vitY *= -1;
    }
    
    // carré
    stroke(this.r, this.g, this.b);
    fill(25, 25, 28);
    strokeWeight(2);
    
    square(this.posX, this.posY, this.size);
    
    // texte
    noStroke();
    fill(this.r, this.g, this.b);
    
    text(this.name, this.posX, this.posY -4);
  }
  
}



let chaton = Object.create(bouncy);
chaton.name = "fuzzy kitten";
chaton.vitX = 1.5;
chaton.vitY = 1.5;

chaton.r = 0;
chaton.g = 255;
chaton.b = 255;


let machin = Object.create(bouncy);
machin.name = "bouncy McBouncerFace";
machin.vitX = 2;
machin.vitY = 2;

machin.r = 255;
machin.g = 255;
machin.b = 0;



function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(25, 25, 28);
  
  bouncy.update();
  chaton.update();
  machin.update();
}