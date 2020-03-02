//utility function
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//loads the sketch from the state
const loadSketch = () => {
  let func = eval(sketchState.name);
  let values = [];
  let paramsKey = Object.keys(sketchState.params);
  paramsKey.forEach(key => {
    values.push(sketchState.params[key].value);
  });
  let state = func(...values);
  return state.out();
};

//global button container available to every function
var buttonContainer = document.getElementById("button-container");

//clears out any existing buttons in the button container
const resetButtons = () => {
  buttonContainer.innerHTML = "";
};

//create back or next button button to go back to all sources
//type = "next" or "back"
//onClick is an onClick function
const createControlButton = (type, onClick) => {
  const button = document.createElement("div");
  button.setAttribute("class", `control button my-1`);
  button.setAttribute("id", `${type}`);
  button.innerHTML = `${type}`;
  button.onclick = () => onClick();
  buttonContainer.appendChild(button);
};

module.exports = {
  getRandomInt: getRandomInt,
  loadSketch: loadSketch,
  buttonContainer: buttonContainer,
  resetButtons: resetButtons,
  createControlButton: createControlButton
};
