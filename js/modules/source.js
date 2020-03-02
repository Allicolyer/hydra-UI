const { sources } = require("./hydraOptions");
const { createModifierButtons } = require("./modifiers");
const {
  buttonContainer,
  resetButtons,
  loadSketch,
  createControlButton
} = require("./utils.js");

//loop through all of the sources and create button
const createSourceButtons = () => {
  //remove any existing buttons
  resetButtons();
  sources.forEach(source => {
    const name = source.name;
    const btn = document.createElement("div");
    btn.setAttribute("class", `button my-1`);
    btn.setAttribute("id", `${name}`);
    btn.innerHTML = `${name}`;
    //add an eventHandler that adds the source to the sketch
    btn.onclick = () => addSourcetoSketch(source);
    buttonContainer.appendChild(btn);
  });
};

// loop through all params for any given source
const createParamsButtons = () => {
  //reset al buttons in the container
  resetButtons();
  //create back button that links back to source buttons
  createControlButton("back", createSourceButtons);
  createControlButton("next", createModifierButtons);

  //create buttons to adjust each paramter for this source
  let paramsKey = Object.keys(sketchState.params);
  paramsKey.forEach(key => {
    param = sketchState.params[key];
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

//update a parameter in a source
const updateParam = (key, eventValue, scale) => {
  eventValue = eventValue * scale;
  sketchState.params[key].value = eventValue;
  loadSketch(sketchState);
};

//add the sources to the sketchState
addSourcetoSketch = source => {
  //set sketchState equal to the source
  sketchState = source;
  loadSketch();
  createParamsButtons();
};

module.exports = {
  createParamsButtons: createParamsButtons,
  createSourceButtons: createSourceButtons
};
