const { modifiers } = require("./hydraOptions");
const { createParamsButtons } = require("./source");
const {
  buttonContainer,
  resetButtons,
  createControlButton,
  loadSketch
} = require("./utils.js");

//loop through all of the sources and create button
const createModifierButtons = () => {
  //remove any existing buttons
  resetButtons();
  //create back button that links back to source buttons
  createControlButton("back", createParamsButtons);
  // createControlButton("next", createModifierButtons);
  modifiers.forEach(modifier => {
    const name = modifier.name;
    const btn = document.createElement("div");
    btn.setAttribute("class", `button my-1`);
    btn.setAttribute("id", `${name}`);
    btn.innerHTML = `${name}`;
    //add an eventHandler that adds the modifier to the sketch
    btn.onclick = () => addModifiertoSketch(modifier);
    buttonContainer.appendChild(btn);
  });
};

//add the sources to the sketchState
addModifiertoSketch = modifier => {
  sketchState.modifiers = [modifier];
  loadSketch();
  createParamsButtons();
};

module.exports = {
  createModifierButtons: createModifierButtons
};
