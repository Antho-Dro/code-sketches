function setup() {
  createCanvas(400, 400);
   background(0);
    noStroke();
  
  for (let y = 0; y < 8; y++){
    for(let x = 0; x < 8; x++){
      
      print (x, y);
       
      if ((x + y) % 2 == 0) {
        fill(0); 
      } 
      
      else {
        fill(255); 
        square( x * 50, y * 50, 50);
     }
      
    }
    
  }
  
}

function draw() {
 
}