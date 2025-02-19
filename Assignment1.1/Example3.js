// Copy & Paste code to 'sketch.js' and then click on 'Go Live' on the bottom-right corner of VS Code

function setup() {

  createCanvas(200, 100);
  colorMode(HSB);

  background(200);

}

function draw() {

  background(0, 0, 0);

  noStroke();

  // Update start and stop angles.
  let biteSize = PI / 16;
  let startAngle = biteSize * sin(frameCount * 0.1) + biteSize;
  let endAngle = TWO_PI - startAngle;

  // Draw the arc.
  fill(60, 100, 100);
  arc(50, 50, 80, 80, startAngle, endAngle, PIE);

  fill(12, 88, 82);
  square(110, 10, 80);

  fill(0, 0, 0);
  rect(110, -40, 80);

  fill(12, 88, 82);
  circle(150, 50, 81.3);

  fill(0, 0, 100);
  circle(130, 50, 23);

  fill(0, 0, 100);
  circle(170, 50, 23);

  fill(240, 100, 100);
  circle(130, 50, 14);

  fill(240, 100, 100);
  circle(170, 50, 14);
  
}



