let graphics;
let simpNoise;
let resetButton;

let angle;
let zoff;

let grainDensityRange;
let grainMovementRange;
let transparencyRange;
let zoomRange;
let xRange;
let yRange;
let zRange;
let angleMultiplierRange;
let darkMode;
let sliders;
let defaultSliderValues;

//audio
let audioCtx;
let out;
let osc;
let gain;
let isPlaying;
const initialFreq = 60;
const initialDetune = 0;

window.onload = function () {
  initAllSliders();
  audioCtx = new AudioContext();
  out = audioCtx.destination;
  isPlaying = false;
};

function initAllSliders() {
  sliders = getSlidersFromDoc();
  defaultSliderValues = getDefaultSliderValues();
  for (let sliderName in sliders) {
    sliders[sliderName].value = defaultSliderValues[sliderName];
  }
}

function getSlidersFromDoc() {
  return {
    grainDensityRange: document.getElementById("grainDensityRange"),
    grainMovementRange: document.getElementById("grainMovementRange"),
    transparencyRange: document.getElementById("transparencyRange"),
    zoomRange: document.getElementById("zoomRange"),
    xRange: document.getElementById("xRange"),
    yRange: document.getElementById("yRange"),
    zRange: document.getElementById("zRange"),
    angleMultiplierRange: document.getElementById("angleMultiplierRange"),
  };
}

function getDefaultSliderValues() {
  return {
    grainDensityRange: 20,
    grainMovementRange: 100,
    transparencyRange: 0,
    zoomRange: 180,
    xRange: 0,
    yRange: 100,
    zRange: 0,
    angleMultiplierRange: 500,
  };
}

function setup() {
  const canvas = createCanvas(400, 400, WEBGL);
  canvas.parent(document.getElementById("canvasDiv"));

  pixelDensity(1);

  noStroke();
  resetSketch();
  darkMode = false;
}

function resetSketch() {
  simpNoise = new OpenSimplexNoise(Date.now());
  graphics = createGraphics(400, 400);
  angle = 0;
  zoff = 0;
  initAllSliders();
}

function draw() {
  if (darkMode == false) {
    background(255);
    document.getElementById("darkMode").innerText = "DARK";
  } else {
    background(0);
    document.getElementById("darkMode").innerText = "LIGHT";
  }

  let inc = map(sliders.grainDensityRange.value, 0, 1000, 0.001, 0.5);

  let zinc = map(sliders.grainMovementRange.value, 0, 1000, 0, 1);

  noiseOnGraphics(graphics, zinc, inc);

  ambientLight(100);
  directionalLight(255, 255, 255, 0, 0, -1);

  rotateX(angle * map(sliders.xRange.value, 0, 1000, 0, 5));
  rotateY(angle * map(sliders.yRange.value, 0, 1000, 0, 5));
  rotateZ(angle * map(sliders.zRange.value, 0, 1000, 0, 5));

  box(sliders.zoomRange.value);

  texture(graphics);

  angle += map(sliders.angleMultiplierRange.value, 0, 1000, 0, 0.1);

  if (osc) {
    osc.frequency.linearRampToValueAtTime(
      map(sliders.angleMultiplierRange.value, 0, 1000, 40, 400),
      audioCtx.currentTime + 0.1
    );
  }
}

function noiseOnGraphics(graphics, zinc, inc) {
  graphics.loadPixels();
  let yoff = 0;

  for (let y = 0; y < graphics.height; y++) {
    let xoff = 0;

    for (let x = 0; x < graphics.width; x++) {
      n2 = simpNoise.noise3D(xoff, yoff, zoff);

      let index = (x + y * graphics.width) * 4;
      graphics.pixels[index] = map(n2, -1, 1, 50, 255);
      graphics.pixels[index + 1] = map(n2, -1, 1, 160, 255);
      graphics.pixels[index + 2] = 255;
      graphics.pixels[index + 3] = map(
        sliders.transparencyRange.value,
        0,
        1000,
        255,
        0
      );
      xoff += inc;
    }
    yoff += inc;
  }
  graphics.updatePixels();
  zoff += zinc;
}

function changeDarkMode() {
  if (darkMode == false) {
    document.documentElement.setAttribute("data-theme", "dark");
    darkMode = true;
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    darkMode = false;
  }
}

function resetSingleSlider(sliderName) {
  sliders[sliderName].value = defaultSliderValues[sliderName];
}

function toggleOsc() {
  if (isPlaying) {
    osc.stop();
    isPlaying = false;
  } else {
    osc = new OscillatorNode(audioCtx);
    osc.wave = "sine";
    osc.frequency.value = map(
      sliders.angleMultiplierRange.value,
      0,
      1000,
      40,
      400
    );
    osc.connect(out);
    gain = audioCtx.createGain();
    gain.connect(out);
    osc.connect(gain);
    osc.start();
    isPlaying = true;
  }
}
