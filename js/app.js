const Hydra = require("hydra-synth");

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

//all event listeners
let speedSlider = document.getElementById("speed")
let frequencySlider = document.getElementById("frequency")
let rotateButton = document.getElementById("rotate")
let patternButton = document.getElementById("pattern")
let complexityButton = document.getElementById("complexity")
let colorButton = document.getElementById("color")

const sources = [
  gradient,
  //gradient( speed )
  // speed :: float(default x)
  noise,
  //noise( scale, offset )
  // scale :: int (default 10.0)
  // offset :: float (default 0.1)
  osc,
  // osc( frequency, sync, offset )
  // frequency :: float (default 60.0)
  // sync :: float (default 0.1)
  // offset :: float (default 0.0)
  shape,
  // shape( sides, radius, smoothing)
  // sides :: int (default 3.0)
  // radius :: float (default 0.3)
  // smoothing :: float (default 0.01)
  solid,
  // solid( r, g, b, a )
  // r :: float (default 0.0)
  // g :: float (default 0.0)
  // b :: float (default 0.0)
  // a :: float (default 1.0)
  voronoi,
  // voronoi( scale, speed, blending )
  // scale :: float (default 5)
  // speed :: float (default 0.3)
  // blending :: float (default 0.3)
]

const mixers = [
  add,
  //Add textures
  //.add( texture, amount )
  // amount :: float (default 0.5)
  blend,
  //Blend textures
  //.blend( texture, amount )
  // amount :: float (default 0.5)
  diff,
  // Return difference of textures.
  //.diff( texture )
  layer,
  // Overlay texture based on alpha value. Maybe less interesting
  // .layer( texture )
  mask,
  // .mask( texture, reps, offset )
  // reps :: float (default 3.0)
  // offset :: float (default 0.5)
  modulate,
  // modulate( texture, amount )
  // amount :: float (default 0.1)
  modulateHue,
  // .modulateHue( color, amount )
  // amount :: float (default 1.0)
  modulateKaleid,
  //.modulateKaleid( nSides )
  //nSides :: float (default 4.0)
  modulatePixelate,
  //.modulatePixelate( multiple, offset )
  // multiple :: float (default 10.0)
  // offset :: float (default 3.0)
  modulateRepeat,
  //.modulateRepeat( texture, repeatX, repeatY, offsetX, offsetY )
  //repeatX :: float (default 3.0)
  // repeatY :: float (default 3.0)
  // offsetX :: float (default 0.5)
  // offsetY :: float (default 0.5)
  modulateRepeatX,
  //modulateRepeatX( texture, reps, offset )
  // reps :: float (default 3.0)
  // offset :: float (default 0.5)
  modulateRepeatY,
  //modulateRepeatY( texture, reps, offset )
  // reps :: float (default 3.0)
  // offset :: float (default 0.5)
  modulateRotate,
  //.modulateRotate( texture, multiple, offset )
  //multiple :: float (default 1.0)
  //offset :: float (default 0.0)
  modulateScale,
  // modulateScale( multiple, offset )
  //multiple :: float (default 1.0)
  //offset :: float (default 1.0)
  modulateScrollX,
  //.modulateScrollX( multiple, scrollX, speed )
  // scrollX :: float (default 0.5)
  // speed :: float (default 0.0)
  modulateScrollY,
  //.modulateScrollY( multiple, scrollX, speed )
  // scrollY :: float (default 0.5)
  // speed :: float (default 0.0)
  mult,
  // mult( texture, amount )
  // amount :: float (default 1.0)
  // Multiply images and blend with the texture by amount.
];

//other cool stuff
//add Math.sin or Math.radom to argumetns
// ({time}) => Math.sin(time) * 10


const variants = [
  brightness,
  //.brightness( amount )
  //amount :: float (default 0.4)
  contrast,
  //  .contrast( amount )
  // amount :: float (default 1.6)
  // Larger amount value makes higher contr
  color,
  // .color( r, g, b )
  // r :: float
  // g :: float
  // b :: float
  colorama,
  //.colorama( amount )
  //amount :: float (default 0.005)
  invert,
  // .invert( amount )
  // amount :: float (default 1.0)
  kaleid,
  // .kaleid( nSides )
  // nSides :: float (default 4.0)
  luma,
  // .luma( threshold, tolerance )
  // threshold :: float (default 0.5)
  // tolerance :: float (default 0.1)
  pixelate,
  //.pixelate( x, y )
  //pixelX :: float (default 20.0)
  //pixelY :: float (default 20.0)
  posterize,
  // .posterize( bins, gamma )
  // bins :: float (default 3.0)
  // gamma :: float (default 0.6)
  repeat,
  // .repeat( repeatX, repeatY, offsetX, offsetY )
  // repeatX :: float (default 3.0)
  // repeatY :: float (default 3.0)
  // offsetX :: float (default 0.0)
  // offsetY :: float (default 0.0)
  repeatY,
  //.repeatY( reps, offset )
  // reps :: float (default 3.0)
  // offset :: float (default 0.0)
  rotate,
  // .rotate( angle, speed )
  // angle :: float (default 10.0)
  // speed :: float (default 0.0)
  saturate,
  // .saturate( amount )
  // amount :: float (default 2.0)
  scale,
  // .scale( size, xMult, yMult )
  // size :: float (default 1.5)
  // xMult :: float (default 1.0)
  // yMult :: float (default 1.0)
  scrollX,
  // .scrollX( scrollX, speed )
  // scrollX :: float (default 0.5)
  // speed :: float (default 0.0)
  scrollY,
  // .scrollY( scrollX, speed )
  // scrollY :: float (default 0.5)
  // speed :: float (default 0.0)
  shift,
  //   .shift( r, g, b, a )
  // r :: float (default 0.5)
  // g :: float (default 0.5)
  // b :: float (default 0.5)
  // a :: float (default 0.5)
  thresh,
  // .thresh( threshold, tolerance )
  // threshold :: float (default 0.5)
  // tolerance :: float (default 0.04)
];

//scale?

// var color = [Math.random(), Math.random(), Math.random()];
// var patternIndex = getRandomInt(3)
// var pattern = patterns[patternIndex]


//sets the state for the current sketch
var sketchState = [
  {
    pattern: patterns[getRandomInt(patterns.length)],
    frequency: 40,
    speed: 0.5,
    color: Math.random(),
    rotate: 0,
  },
]

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

speedSlider.oninput = function () {
  sketchState[0].speed = this.value / 100
  console.log(`Speed: ${speed}`)
  loadSketch()
}

frequencySlider.oninput = function () {
  //inputs must be numbers
  sketchState[0].frequency = this.value * 1
  console.log(`Frequency: ${frequency}`)
  loadSketch()
}

rotateButton.addEventListener("click", function () {
  //rotation is in radians. 2pi = 360 degrees.
  sketchState[0].rotate += 1.57
  console.log(`Rotation: ${rotate}`)
  loadSketch()
})

patternButton.addEventListener("click", function () {
  // patternIndex += 1
  // patternIndex %= patterns.length
  // pattern = patterns[patternIndex]
  // loadSketch(frequency, speed, rotate)
})

complexityButton.addEventListener("click", function () {
  if (sketchState.length === 4) {
    sketchState.shift()
  }
  sketchState.push(
    {
      pattern: patterns[getRandomInt(patterns.length)],
      frequency: getRandomInt(30),
      speed: Math.random() * 2,
      color: Math.random(),
      rotate: Math.random() * 6.28,
    }
  )
  loadSketch()

})

colorButton.addEventListener("click", function () {
  color = [Math.random(), Math.random(), Math.random()]
  loadSketch()
})

function loadSketch() {



  s0.init(noise(10, 0, 1)) // initialize  s0
  src(s0).out(o0) // set the source of o0 to render the buffer containing the webcam
  osc(10, 0.2, 0.8).diff(o0).out(o1) // initialize a gradient in output buffer o1, composite with the contents of o0
  render(o1) // render o1 to the screen

  // const first = sketchState[0]
  // let state =
  //   first.pattern(first.frequency, first.speed, first.color)
  //     .rotate(first.rotate)
  //     .kaleid()

  // for (let i = 1; i < sketchState.length; i++) {
  //   const item = sketchState[i]
  //   state.modulate(
  //     item.pattern(
  //       item.frequency, item.speed, item.color
  //     )
  //   )
  //     .rotate(item.rotate)
  // }
  // return state.out()
}

loadSketch()

//TO DO
//add parameters to state
//add things other than modulate to complexity


//examples of outputs I would want to happen randomly in this program
//osc(10,0,1).rotate(1,2).saturate(({time}) => Math.sin(time) * 10).kaleid(8).modulateScrollX(noise(2,2)).out()