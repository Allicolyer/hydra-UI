const Hydra = require("hydra-synth");
const { createSourceButtons } = require("./modules/source.js");

const sketch = new Hydra({
  // selects our canvas element in our DOM
  canvas: document.getElementById("hydra-canvas"),

  width: window.innerWidth,

  height: window.innerHeight,

  pb: null,

  autoLoop: true,

  makeGlobal: true,
  // while this pollutes the global namespace
  // it makes it easier to copy and paste existing
  // hydra code

  numSources: 4,

  numOutputs: 4,

  detectAudio: false
  // prevents microphone prompt
  // if your code doesn't use audio
});

//Global variables
//define global sketchState Variable
var sketchState = {};

//when everything loads up
createSourceButtons();
