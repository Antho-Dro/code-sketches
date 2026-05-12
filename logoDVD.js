//bouncy object

let dvdLogo;

let bouncy = {
  
  size: 64,
  posX: 10,
  posY: 15,
  vitX: 1.2,
  vitY: 0.9,
  name: "bouncy thing",
  r:0,
  v:255,
  b:0,
  
  bouger: function(){
    this.posX = this.posX + this.vitX;
    this.posY += this.vitY;
  },
  
  rebondir: function(){
     if(this.posX + this.size > width || this.posX < 0){
      this.vitX = this.vitX *= -1;
    }
    if(this.posY + this.size*0.67 > height || this.posY < 0){
      this.vitY *= -1;
    }
  },
    
  dessiner: function(){
    tint(this.r, this.v, this.b);
    
    image(dvdLogo, this.posX, this.posY, this.size, this.size*0.67);
    //noTint();
    //fill(this.r-100,this.v-100,this.b-100);
    //text(this.name, this.posX, this.posY -4);
  },
  
  update: function(){
    this.bouger();
    this.rebondir();
    this.dessiner();
  }
  
} //fin bouncy object


let chaton = Object.create (bouncy);
chaton.name = "fuzzy kitten";
chaton.vitX = 1.5;
chaton.vitY = 1.5;
chaton.r = 255;
chaton.v = 0;




let machin = Object.create (bouncy);
machin.name = "bouncy McBouncerFace";
machin.vitX = 2;
machin.vitY = 2;
machin.b = 255;
machin.v = 0;

function preload(){
  dvdLogo = loadImage("dvd-white.png");
}


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(30,30,30);
  bouncy.update();
  chaton.update();
  machin.update();
}