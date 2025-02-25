let startContext, samples, button1, button2, button3, button4;
let wolfReverb, tigerReverb, catReverb, seagullsReverb;
let wolfSlider, tigerSlider, catSlider; seagullsSlider;

function preload() {
  samples = new Tone.Player({
    wolf: "media/wolf.mp3",
    tiger: "media/tiger.mp3",
    cat: "media/cat.mp3",
    seagulls: "media/seagulls.mp3"
  }).toDestination();

  console.log("Samples loaded successfully.", samples);

  wolfReverb = new Tone.Reverb(2).toDestination();
  tigerReverb = new Tone.Reverb(2).toDestination();
  catReverb = new Tone.Reverb(2).toDestination();
  seagullsReverb = new Tone.Reverb(2).toDestination();
}

function setup() {
  createCanvas(400, 400);

  // Button to start audio context
  startContext = createButton("Start Audio Context");
  startContext.position(10, 10);
  startContext.mousePressed(startAudioContext);

  // Buttons for playing samples
  button1 = createButton("Play Wolf Sound");
  button1.position(10, 50);
  button1.mousePressed(() => samples.player("wolf").start());

  button2 = createButton("Play Tiger Sound");
  button2.position(10, 80);
  button2.mousePressed(() => samples.player("tiger").start());

  button3 = createButton("Play Cat Sound");
  button3.position(10, 110);
  button3.mousePressed(() => samples.player("cat").start());

  button4 = createButton("Play Seagulls Sound");
  button4.position(10, 140);
  button4.mousePressed(() => samples.player("seagulls").start());

  //ReverbSliders
  wolfSlider = createSlider(0, 5, 2, 0.1); // Min: 0s, Max: 5s, Default: 2s
  wolfSlider.position(200, 50);
  wolfSlider.input(() => updateReverb(wolfReverb, wolfSlider.value()));

  tigerSlider = createSlider(0, 5, 2, 0.1);
  tigerSlider.position(200, 80);
  tigerSlider.input(() => updateReverb(tigerReverb, tigerSlider.value()));

  catSlider = createSlider(0, 5, 2, 0.1);
  catSlider.position(200, 110);
  catSlider.input(() => updateReverb(catReverb, catSlider.value()));

  seagullsSlider = createSlider(0, 5, 2, 0.1);
  seagullsSlider.position(200, 140);
  seagullsSlider.input(() => updateReverb(seagullsReverb, seagullsSlider.value()));
}

function draw() {
  background(220);
  text("Wolf Reverb: " + wolfSlider.value() + "s", 200, 50);
  text("Tiger Reverb: " + tigerSlider.value() + "s", 200, 80);
  text("Cat Reverb: " + catSlider.value() + "s", 200, 110);
  text("Seagulls Reverb: " + seagullsSlider.value() + "s", 200, 140);
}

function playSound(sampleName, reverbEffect) {  //Each sound effect has its own reverb
  let player = samples.player(sampleName);
  player.connect(reverbEffect); 
  player.start();
}


function startAudioContext() {
  if (Tone.context.state !== 'running') {
    Tone.start().then(() => {
      console.log("Audio Context Started");
    }).catch((err) => {
      console.error("Failed to Start Audio Context:", err);
    });
  }
}

function updateReverb(reverbEffect, value) {
  reverbEffect.decay = value; 
  console.log("Updated Reverb to:", value);
}
