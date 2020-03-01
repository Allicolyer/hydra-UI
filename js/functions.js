const sources = [
  {
    name: "gradient",
    params: {
      speed: { name: "speed", value: 0, type: "float", min: 0, max: 100 }
    }
    //gradient( speed )
    // speed :: float(default x)
  },
  {
    name: "noise",
    params: {
      scale: { name: "scale", value: 10.0, min: 0, max: 20 },
      offset: { name: "offset", value: 0.1, min: 0, max: 1 }
    }
    //noise( scale, offset )
    // scale :: int (default 10.0)
    // offset :: float (default 0.1)
  },
  {
    name: "osc",
    params: {
      frequency: {
        name: "frequency",
        value: 60.0,
        type: "float",
        min: 0,
        max: 100
      },
      sync: { name: "sync", value: 0.1, type: "float", min: 0, max: 1 },
      offset: { name: "offset", value: 0.0, type: "float", min: 0, max: 1 }
    }
    // osc( frequency, sync, offset )
    // frequency :: float (default 60.0)
    // sync :: float (default 0.1)
    // offset :: float (default 0.0)
  },
  {
    name: "shape",
    params: {
      sides: { name: "sides", value: 3.0, type: "int", min: 0, max: 10 },
      radius: { name: "radius", value: 0.2, type: "float", min: 0, max: 1 },
      smooething: {
        name: "smoothing",
        value: 0.01,
        type: "float",
        min: 0,
        max: 0.5
      }
    }
    // shape( sides, radius, smoothing)
    // sides :: int (default 3.0)
    // radius :: float (default 0.3)
    // smoothing :: float (default 0.01)
  },
  {
    name: "solid",
    params: {
      r: { name: "r", value: 0.0, type: "float", min: 0, max: 1 },
      g: { name: "g", value: 0.0, type: "float", min: 0, max: 1 },
      b: { name: "b", value: 0.0, type: "float", min: 0, max: 1 },
      a: { name: "a", value: 1.0, type: "float", min: 0, max: 1 }
    }
    // solid( r, g, b, a )
    // r :: float (default 0.0)
    // g :: float (default 0.0)
    // b :: float (default 0.0)
    // a :: float (default 1.0)
  },
  {
    name: "voronoi",
    params: {
      scale: { name: "scale", value: 5, type: "float", min: 0, max: 15 },
      speed: { name: "speed", value: 0.3, type: "float", min: 0, max: 1 },
      blending: { name: "blending", value: 0.3, type: "float", min: 0, max: 1 }
    }
    // voronoi( scale, speed, blending )
    // scale :: float (default 5)
    // speed :: float (default 0.3)
    // blending :: float (default 0.3)
  }
];

const mixers = [
  "add",
  //Add textures
  //.add( texture, amount )
  // amount :: float (default 0.5)
  "blend",
  //Blend textures
  //.blend( texture, amount )
  // amount :: float (default 0.5)
  "diff",
  // Return difference of textures.
  //.diff( texture )
  "layer",
  // Overlay texture based on alpha valueue. Maybe less interesting
  // .layer( texture )
  "mask",
  // .mask( texture, reps, offset )
  // reps :: float (default 3.0)
  // offset :: float (default 0.5)
  "modulate",
  // modulate( texture, amount )
  // amount :: float (default 0.1)
  "modulateHue",
  // .modulateHue( color, amount )
  // amount :: float (default 1.0)
  "modulateKaleid",
  //.modulateKaleid( nSides )
  //nSides :: float (default 4.0)
  "modulatePixelate",
  //.modulatePixelate( multiple, offset )
  // multiple :: float (default 10.0)
  // offset :: float (default 3.0)
  "modulateRepeat",
  //.modulateRepeat( texture, repeatX, repeatY, offsetX, offsetY )
  //repeatX :: float (default 3.0)
  // repeatY :: float (default 3.0)
  // offsetX :: float (default 0.5)
  // offsetY :: float (default 0.5)
  "modulateRepeatX",
  //modulateRepeatX( texture, reps, offset )
  // reps :: float (default 3.0)
  // offset :: float (default 0.5)
  "modulateRepeatY",
  //modulateRepeatY( texture, reps, offset )
  // reps :: float (default 3.0)
  // offset :: float (default 0.5)
  "modulateRotate",
  //.modulateRotate( texture, multiple, offset )
  //multiple :: float (default 1.0)
  //offset :: float (default 0.0)
  "modulateScale",
  // modulateScale( multiple, offset )
  //multiple :: float (default 1.0)
  //offset :: float (default 1.0)
  "modulateScrollX",
  //.modulateScrollX( multiple, scrollX, speed )
  // scrollX :: float (default 0.5)
  // speed :: float (default 0.0)
  "modulateScrollY",
  //.modulateScrollY( multiple, scrollX, speed )
  // scrollY :: float (default 0.5)
  // speed :: float (default 0.0)
  "mult"
  // mult( texture, amount )
  // amount :: float (default 1.0)
  // Multiply images and blend with the texture by amount.
];

//other cool stuff
//add Math.sin or Math.radom to argumetns
// ({time}) => Math.sin(time) * 10

const variants = [
  "brightness",
  //.brightness( amount )
  //amount :: float (default 0.4)
  "contrast",
  //  .contrast( amount )
  // amount :: float (default 1.6)
  // Larger amount valueue makes higher contr
  "color",
  // .color( r, g, b )
  // r :: float
  // g :: float
  // b :: float
  "colorama",
  //.colorama( amount )
  //amount :: float (default 0.005)
  "invert",
  // .invert( amount )
  // amount :: float (default 1.0)
  "kaleid",
  // .kaleid( nSides )
  // nSides :: float (default 4.0)
  "luma",
  // .luma( threshold, tolerance )
  // threshold :: float (default 0.5)
  // tolerance :: float (default 0.1)
  "pixelate",
  //.pixelate( x, y )
  //pixelX :: float (default 20.0)
  //pixelY :: float (default 20.0)
  "posterize",
  // .posterize( bins, gamma )
  // bins :: float (default 3.0)
  // gamma :: float (default 0.6)
  "repeat",
  // .repeat( repeatX, repeatY, offsetX, offsetY )
  // repeatX :: float (default 3.0)
  // repeatY :: float (default 3.0)
  // offsetX :: float (default 0.0)
  // offsetY :: float (default 0.0)
  "repeatY",
  //.repeatY( reps, offset )
  // reps :: float (default 3.0)
  // offset :: float (default 0.0)
  "rotate",
  // .rotate( angle, speed )
  // angle :: float (default 10.0)
  // speed :: float (default 0.0)
  "saturate",
  // .saturate( amount )
  // amount :: float (default 2.0)
  "scale",
  // .scale( size, xMult, yMult )
  // size :: float (default 1.5)
  // xMult :: float (default 1.0)
  // yMult :: float (default 1.0)
  "scrollX",
  // .scrollX( scrollX, speed )
  // scrollX :: float (default 0.5)
  // speed :: float (default 0.0)
  "scrollY",
  // .scrollY( scrollX, speed )
  // scrollY :: float (default 0.5)
  // speed :: float (default 0.0)
  "shift",
  //   .shift( r, g, b, a )
  // r :: float (default 0.5)
  // g :: float (default 0.5)
  // b :: float (default 0.5)
  // a :: float (default 0.5)
  "thresh"
  // .thresh( threshold, tolerance )
  // threshold :: float (default 0.5)
  // tolerance :: float (default 0.04)
];

//scale?

// var color = [Math.random(), Math.random(), Math.random()];
// var patternIndex = getRandomInt(3)
// var pattern = patterns[patternIndex]

module.exports = { sources: sources, mixers: mixers, variants: variants };
