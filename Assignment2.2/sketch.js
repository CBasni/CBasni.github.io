let synth1, polySynth, filt, rev, noise1, noise2, filt1, ampEnv1;
let filterSlider, reverbSlider, filterLabel, reverbLabel;
let activeKeys = {};

let keyNotes = {
  "a": "A5",
  "s": "B4",
  "d": "C#5",
  "f": "D5"
};

let keyNotes1 = {
  "g": "D4",
  "h": "F4",
  "j": "A4"
};

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);

  filt = new Tone.Filter(1000, "lowpass").toDestination();
  rev = new Tone.Reverb(2).connect(filt);

  synth1 = new Tone.MetalSynth({
    frequency: 200,
    envelope: {
      attack: 0.01,
      decay: 1.4,
      release: 0.2
    },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5
  }).connect(rev);

  polySynth = new Tone.PolySynth(Tone.MetalSynth).connect(rev);
  polySynth.set({
    envelope: {
      attack: 0.1,
      decay: 0.5,
      sustain: 1,
      release: 0.5
    },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5
  });
  polySynth.volume.value = -6;

  ampEnv1 = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.5,
    sustain: 0,
    release: 0.1
  }).toDestination();

  filt1 = new Tone.Filter(1000, "highpass").connect(ampEnv1);
  noise1 = new Tone.Noise("pink").start().connect(filt1);

  //Controls & Labels
  filterLabel = createDiv("Filter Frequency");
  filterLabel.position(20, height - 270);
  filterSlider = createSlider(100, 5000, 1000);
  filterSlider.position(20, height - 250);
  filterSlider.input(() => filt.frequency.value = filterSlider.value());

  reverbLabel = createDiv("Adjust Reverb");
  reverbLabel.position(20, height - 170);
  reverbSlider = createSlider(0, 1, 0.5, 0.01);
  reverbSlider.position(20, height - 150);
  reverbSlider.input(() => rev.wet.value = reverbSlider.value());
}

function draw() {
  background(220);
  fill(0);
  text("Press A, S, D, F, G, H, J to play sounds", width / 2, 20);
  text("Adjust filter and reverb with sliders", width / 2, 40);
}

function keyPressed() {
  if (!activeKeys[key]) {
    let pitch = keyNotes[key];
    let pitch1 = keyNotes1[key];
    if (pitch) {
      activeKeys[key] = true;
      synth1.triggerAttack(pitch);
    } else if (pitch1) {
      activeKeys[key] = true;
      polySynth.triggerAttack(pitch1);
    }
  }
}

function keyReleased() {
  let pitch = keyNotes[key];
  let pitch1 = keyNotes1[key];
  if (activeKeys[key]) {
    if (pitch) {
      synth1.triggerRelease();
    } else if (pitch1) {
      polySynth.triggerRelease(pitch1);
    }
    delete activeKeys[key];
  }
}
