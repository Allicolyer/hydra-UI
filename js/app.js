const Hydra = require("hydra-synth");
const { sources, mixers, variants } = require("./functions");

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

//utility function
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//sets the state object
var sketchState = {};

//container for all buttons
let buttonContainer = document.getElementById("button-container");

//loop through all of the sources and create button
const createSourceButtons = () => {
  sources.forEach(source => {
    const name = source.name;
    const btn = document.createElement("div");
    btn.setAttribute("class", `button my-1`);
    btn.setAttribute("id", `${name}`);
    btn.innerHTML = `${name}`;
    //add an eventHandler that adds the source to the sketch
    btn.onclick = () => addSourcetoSketchState(source);
    buttonContainer.appendChild(btn);
  });
};

// loop through all params for any given source
const createParamsButtons = source => {
  buttonContainer.innerHTML = "";
  let paramsKey = Object.keys(source.params);
  paramsKey.forEach(key => {
    param = source.params[key];
    //add a span with each parameter name
    const nameSpan = document.createElement("span");
    nameSpan.innerHTML = `${param.name}`;
    buttonContainer.appendChild(nameSpan);

    //create range inputs for float or ints
    if (param.type === "float" || "int") {
      const input = document.createElement("input");
      input.setAttribute("type", "range");
      input.setAttribute("min", 0);
      input.setAttribute("max", 100);
      const scale = (param.max - param.min) / 100;
      input.setAttribute("value", param.value / scale);
      input.setAttribute("class", "slider");
      input.oninput = () => updateParam(key, event.target.value, scale);
      buttonContainer.appendChild(input);
    }
  });
};

//update a parameter
const updateParam = (key, eventValue, scale) => {
  eventValue = eventValue * scale;
  sketchState.params[key].value = eventValue;
  loadSketch();
};
//add the sources to the sketchState
addSourcetoSketchState = source => {
  sketchState = source;
  loadSketch();
  createParamsButtons(source);
};

function loadSketch() {
  let func = eval(sketchState.name);
  let values = [];
  let paramsKey = Object.keys(sketchState.params);
  paramsKey.forEach(key => {
    values.push(sketchState.params[key].value);
  });
  let state = func(...values);
  return state.out();
}

//when everything loads up
createSourceButtons();
