let flag1;
let flag2;
let flag3;

function setup() {
  createCanvas(600, 300);

  flag1 = new Flag("blue", "yellow", "red", 40, 80);
  flag2 = new Flag("green", "white", "red", 220, 80, true);
  flag3 = new Flag("black", "yellow", "red", 400, 80);
}

function draw() {
  background(58, 95, 120);

  //flag1.drawFlag();
  flag2.drawFlag();
  //flag3.drawFlag();
}

class Flag {
  constructor(c1, c2, c3, x, y, hasCross = false) {
    this.c1 = c1;
    this.c2 = c2;
    this.c3 = c3;
    this.x = x;
    this.y = y;
    this.hasCross = hasCross;

    this.w = 160;
    this.h = 100;

    this.slices = 120;
    this.amp = 8;
    this.speed = 0.02;
    this.freq = 0.05;
  }

  drawFlag() {
    noStroke();

    const stripe = this.w / 3;
    const sliceH = this.h / this.slices;
    const t = frameCount * this.speed;
    const colors = [this.c1, this.c2, this.c3];

// bandes du drapeau
    for (let row = 0; row < this.slices; row++) {
      const y = this.y + row * sliceH;
      const offset = sin(row * this.freq + t) * this.amp;

      for (let i = 0; i < 3; i++) {
        fill(colors[i]);
        rect(this.x + i * stripe + offset, y, stripe, sliceH + 1);
      }
    }

// croix blanche dans la bande rouge
    if (this.hasCross) {
      this.drawWavyCross(t, stripe, sliceH);
    }
  }

  drawWavyCross(t, stripe, sliceH) {
    fill(255);

// zone rouge = 3e bande
    const redX = this.x + stripe * 2;
    const redW = stripe;

// centre de la croix dans la bande rouge
    const crossCenterX = redX + redW * 0.5;
    const crossCenterY = this.y + this.h * 0.3;

// dimensions de la croix
    const verticalW = 8;
    const verticalH = 30;

    const horizontalW = 30;
    const horizontalH = 8;

    for (let row = 0; row < this.slices; row++) {
      const localY = row * sliceH;
      const y = this.y + localY;

      const offset = sin(row * this.freq + t) * this.amp;

// --- barre verticale ---
      const vertTop = crossCenterY - verticalH / 2;
      const vertBottom = crossCenterY + verticalH / 2;

      if (y + sliceH >= vertTop && y <= vertBottom) {
        rect(
          crossCenterX - verticalW / 2 + offset,
          y,
          verticalW,
          sliceH + 1
        );
      }

// --- barre horizontale ---
      const horiTop = crossCenterY - horizontalH / 2;
      const horiBottom = crossCenterY + horizontalH / 2;

      if (y + sliceH >= horiTop && y <= horiBottom) {
        rect(
          crossCenterX - horizontalW / 2 + offset,
          y,
          horizontalW,
          sliceH + 1
        );
      }
    }
  }
}