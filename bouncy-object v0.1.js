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
      this.vitX *= -1;
    }
    
    if(this.posY + this.size > height || this.posY < 0){
      this.vitY *= -1;
    }
    
   
    fill (25, 25, 28)
    stroke(255, 153, 28);
    strokeWeight(2);
    square(this.posX, this.posY, this.size);
    
    
    noStroke();
    fill(255, 153, 28);
    
    text(this.name, this.posX, this.posY - 4);
  }
  
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(25, 25, 28);
  bouncy.update();
}