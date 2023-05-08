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

function setup() {
  const canvas = createCanvas(400, 400, WEBGL);
  canvas.parent(document.getElementById("canvasDiv"));

  getSlidersFromDoc();
  pixelDensity(1);

  noStroke();
  resetSketch();
  darkMode = false;
}

function getSlidersFromDoc() {
  grainDensityRange = document.getElementById("grainDensityRange");
  grainMovementRange = document.getElementById("grainMovementRange");
  transparencyRange = document.getElementById("transparencyRange");
  zoomRange = document.getElementById("zoomRange");
  xRange = document.getElementById("xRange");
  yRange = document.getElementById("yRange");
  zRange = document.getElementById("zRange");
  angleMultiplierRange = document.getElementById("angleMultiplierRange");
}

function resetSketch() {
  //usual setup stuff
  simpNoise = new OpenSimplexNoise(Date.now());
  graphics = createGraphics(400, 400);
  angle = 0;
  zoff = 0;
  //then reset sliders
  document.getElementById("leftForm").reset();
  document.getElementById("rightForm").reset();
}

function draw() {
  if (darkMode == false) {
    background(255);
    document.getElementById("darkMode").innerText = "DARK";
  } else {
    background(0);
    document.getElementById("darkMode").innerText = "LIGHT";
  }

  let inc = map(grainDensityRange.value, 0, 1000, 0.001, 0.5);

  let zinc = map(grainMovementRange.value, 0, 1000, 0, 1);

  noiseOnGraphics(graphics, zinc, inc);

  ambientLight(255);

  rotateX(angle * map(xRange.value, 0, 1000, 0, 5));
  rotateY(angle * map(yRange.value, 0, 1000, 0, 5));
  rotateZ(angle * map(zRange.value, 0, 1000, 0, 5));

  box(document.getElementById("zoomRange").value);

  texture(graphics);

  angle += map(angleMultiplierRange.value, 0, 1000, 0, 0.1);
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
        transparencyRange.value,
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
