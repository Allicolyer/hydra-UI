//utility function
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//loads the sketch from the state
const loadSketch = () => {
  //evaluate the sketchState name as a function
  let func = eval(sketchState.name);
  //initalize an empty array for the parameter values
  let values = [];
  //loop through each parameter value and push it onto the array
  let paramsKey = Object.keys(sketchState.params);
  paramsKey.forEach(key => {
    values.push(sketchState.params[key].value);
  });
  //spread the values into the function
  let state = func(...values);
  //if there are any modifiers, add those to the state
  if (sketchState.modifiers) {
    //modifiers is an array
    let modifiers = sketchState.modifiers;
    modifiers.forEach(modifier => {
      //evaluate the modifier name as a function
      let mod_func = eval(modifier.name);
      console.log(modifier.name);
      //initalize an empty array for the parameter values
      let values = [];
      //loop through each parameter value and push it onto the array
      let paramsKey = Object.keys(modifier.params);
      paramsKey.forEach(key => {
        values.push(modifier.params[key].value);
      });
      let next_state = mod_func(...values);
    });
    return state.next_state.out();
  } else {
    //load the sketch into the Hydra Canvas
    return state.out();
  }
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
