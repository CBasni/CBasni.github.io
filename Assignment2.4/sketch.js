let colors = [
  { name: "red", value: [255, 0, 0], tone: "C4" },
  { name: "orange", value: [255, 165, 0], tone: "D4" },
  { name: "yellow", value: [255, 255, 0], tone: "E4" },
  { name: "green", value: [0, 255, 0], tone: "F4" },
  { name: "cyan", value: [0, 255, 255], tone: "G4" },
  { name: "blue", value: [0, 0, 255], tone: "A4" },
  { name: "magenta", value: [255, 0, 255], tone: "B4" },
  { name: "brown", value: [139, 69, 19], tone: "C5" },
  { name: "white", value: [255, 255, 255], tone: "D5" },
  { name: "black", value: [0, 0, 0], tone: "E5" }
];

let selectedColor = colors[8];
let canvasX = 60;
let brushSynth, bgMelody, colorChangeSound;
let isPainting = false;
let paintDuration = 0;

function setup() {
  createCanvas(1895, 1000);
  background(200);
  drawPalette();

  brushSynth = new Tone.Synth().toDestination();
  colorChangeSound = new Tone.Synth().toDestination();

  let melodySynth = new Tone.Synth().toDestination();
  bgMelody = new Tone.Sequence((time, note) => {
    melodySynth.triggerAttackRelease(note, "8n", time);
  }, ["C3", "E3", "G3", "B3", "A3", "G3", "E3", "C3"], "4n").start();

  bgMelody.loop = true;
  Tone.Transport.start();

  let button = createButton("Start Audio");
  button.position(10, 10);
  button.mousePressed(() => {
    if (Tone.context.state !== "running") {
      Tone.start().then(() => {
        Tone.Transport.start();
      });
    }
  });
  let stopButton = createButton("Stop Audio Context");
  stopButton.position(120, 10);
  stopButton.mousePressed(() => {
    Tone.Transport.stop();
    Tone.context.suspend();
  });
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
      selectedColor = colors[i];
      colorChangeSound.triggerAttackRelease("C6", "8n");
      return;
    }
  }
}

function mouseDragged() {
  if (mouseX > canvasX) {
    stroke(selectedColor.value);
    strokeWeight(2);
    line(mouseX, mouseY, pmouseX, pmouseY);
    
    if (!isPainting) {
      isPainting = true;
      paintDuration = 0;
      bgMelody.stop(); // Stop background melody when drawing starts
    }
    
    brushSynth.triggerAttackRelease(selectedColor.tone, "16n");
    paintDuration++;
    
    let newBPM = map(paintDuration, 0, 500, 80, 160, true);
    Tone.Transport.bpm.rampTo(newBPM, 2);
  }
}

function mouseReleased() {
  isPainting = false;
  paintDuration = 0;
  bgMelody.start(); // Resume background melody when drawing stops
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    background(200);
    drawPalette();
    paintDuration = 0;
    Tone.Transport.bpm.rampTo(80, 2);
  }
}
