let cols = 10;
let rows = 10;
let colors = [];


function setup() {
  createCanvas(300, 300);
  
  colors = make2Darray(cols, rows);
  
  //console.log( colors);
  
  for ( i=0; i<cols; i++){
    for ( j=0; j<rows; j++){
      colors[i][j] = random(255); 
      
     }
  }
  
  for ( let a=0; a<cols; a++){
    for (let b=0; b< rows; b++){
      let x = a * 30 + 15;
      let y = b * 30 + 15;
      
      fill (colors [a][b]);
      stroke (0);
      circle(x, y, 30);
    }
  }
  
}


function make2Darray (cols, rows){
  var arr = new Array(cols);
  for (var i = 0; i<arr.length; i++){
    arr[i] = new Array(rows);
  }
  return arr;
}


function draw() {}

