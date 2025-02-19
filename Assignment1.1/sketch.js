function setup() {

  createCanvas(200, 200);
  colorMode(HSB);

  background(200);

}

function draw() {

  background(240, 100, 55);

  stroke(0, 0, 100);
  strokeWeight(3);

  fill(120, 76, 55);
  ellipse(100, 100, 100);
  
  fill("red"); 
  beginShape(); //tells p5 we are starting a custom shape with the following points. I recommend labeling them as you code for easy adjustments.
  let cx = 100, cy = 100; // Center of the canvas
  let r1 = 20, r2 = 50; // Change these values to adjust the star's size
  let angleOffset = -PI / 2; 

  for (let i = 0; i < 10; i++) {
    let angle = angleOffset + (TWO_PI * i) / 10;
    let radius = i % 2 == 0 ? r2 : r1;
    let x = cx + cos(angle) * radius;
    let y = cy + sin(angle) * radius;
    vertex(x, y);
  }
  endShape(); 

}




