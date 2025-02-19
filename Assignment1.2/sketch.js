let colors = [
  { name: "red", value: [255, 0, 0] },
  { name: "orange", value: [255, 165, 0] },
  { name: "yellow", value: [255, 255, 0] },
  { name: "green", value: [0, 255, 0] },
  { name: "cyan", value: [0, 255, 255] },
  { name: "blue", value: [0, 0, 255] },
  { name: "magenta", value: [255, 0, 255] },
  { name: "brown", value: [139, 69, 19] },
  { name: "white", value: [255, 255, 255] },
  { name: "black", value: [0, 0, 0] }
];

let selectedColor = [255, 255, 255]; 
let canvasX = 60; 

function setup() {
  createCanvas(1895, 1000);
  background(200);
  drawPalette();
}

function drawPalette() {
  for (let i = 0; i < colors.length; i++) {
    stroke(255); 
    strokeWeight(2);
    fill(colors[i].value);
    rect(10, i * 40 + 10, 40, 40);
  }
}

function mousePressed() {
  for (let i = 0; i < colors.length; i++) {
    if (mouseX > 10 && mouseX < 50 && mouseY > i * 40 + 10 && mouseY < i * 40 + 50) {
      selectedColor = colors[i].value; // Change brush color
      return;
    }
  }
}

function mouseDragged() {
  if (mouseX > canvasX) {
    stroke(selectedColor);
    strokeWeight(2);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function draw() {
  drawPalette();
}


//Function that adds a button to clear the canvas
function keyPressed() {
  if (key === 'c' || key === 'C') { 
    background(200);
    drawPalette(); 
  }
}
