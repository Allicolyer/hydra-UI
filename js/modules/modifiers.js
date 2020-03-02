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
  // createControlButton("back", createParamsButtons(sketchState));
  // createControlButton("next", createModifierButtons);
  console.log(sketchState);
  modifiers.forEach(modifier => {
    const name = modifier.name;
    const btn = document.createElement("div");
    btn.setAttribute("class", `button my-1`);
    btn.setAttribute("id", `${name}`);
    btn.innerHTML = `${name}`;
    //add an eventHandler that adds the modifier to the sketch
    // btn.onclick = () => addSourcetoSketchState(source);
    buttonContainer.appendChild(btn);
  });
};

module.exports = {
  createModifierButtons: createModifierButtons
};
