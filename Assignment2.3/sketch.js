let img;
let showText = true;
let basicSynth, filt, LFOfilt, panner, fmSynth, noise1, noisEnv, filt1;
let showImage = false;

function preload() {
  img = loadImage("media/Sprite Squished Bug.png");
}

function setup() {
  createCanvas(400, 400);
  
  // Stereo panning for spatial effect
  panner = new Tone.AutoPanner({
    frequency: 0.2,
    depth: 0.8
  }).toDestination().start();

  // Bandpass filter for tone shaping
  filt = new Tone.Filter(500, "bandpass", -12).connect(panner);

  // Basic synth for tonal depth
  basicSynth = new Tone.Synth().connect(filt);

  // LFO to modulate filter frequency
  LFOfilt = new Tone.LFO(5, 100, 1500).start();
  LFOfilt.connect(filt.frequency);

  // FM Synth for the main splash impact
  fmSynth = new Tone.FMSynth({
    harmonicity: 1.2,
    modulationIndex: 8,
    oscillator: { type: "sine" },
    envelope: { attack: 0.05, decay: 0.2, sustain: 0.1, release: 0.3 }
  }).connect(filt);

  // Additional filter for splash noise shaping
  filt1 = new Tone.AutoFilter({
    frequency: 0.3,
    depth: 0.5,
    baseFrequency: 400,
    octaves: 3
  }).toDestination().start();

  noisEnv = new Tone.AmplitudeEnvelope({
    attack: 0.05,
    decay: 0.2,
    sustain: 0.2,
    release: 0.5
  }).toDestination();  

  // White noise for the splash effect
  noise1 = new Tone.Noise("white").connect(noisEnv);
  noise1.start(); 
}

function draw() {

  background(220);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Click to splash!", width / 2, height / 3);

  //Attempting to make text disappear whenever mouse is clicked
  if (showText) {
  text("Click to splash!", width / 2, height / 3);
  } else if (!showText) {
    showText = false;
  }

  if (showImage) {
    image(img, width / 2 - img.width / 2, height / 2 - img.height / 2);
  }
}

function mouseClicked() {
  // Trigger FM Synth for the deep splash impact
  if (fmSynth) {
    fmSynth.triggerAttackRelease(random(200, 400), 0.2);
  }

  // Modulate LFO for variation
  LFOfilt.frequency.rampTo(random(2, 8), 1);

  // Trigger noise burst for the splash effect
  noisEnv.triggerAttackRelease(0.3);
  
  showImage = true;
}

function keyPressed() {
  if (key === "s") {
    noisEnv.triggerAttackRelease(0.5); 
    console.log("Splash activated!");
  }
}
