var gl;
var cmTID;
var vbo;
var ebo;

var vertexSource = `

void main()
{
  
}
`;

var fragmentSource = ``;

class Shader { //shader class
  var programID;
  var vertexID;
  var fragID;
  var geometryID = null;
  
  function makeShader(var type, var source) {
    var shader;
    if (type == "vertex") { //set shader type
      shader = gl.createShader(gl.VERTEX_SHADER);  
    } else if (type == "fragment") {
      shader = gl.createShader(gl.FRAGMENT_SHADER);  
    } else if (type == "geometry") {
      shader = gl.createShader(gl.GEOMETRY_SHADER);  
    }
  
    gl.shaderSource(shader, source); //set it's source
    gl.compileShader(shader); //and compile it
    
    //get any compile errors
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
      console.log("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));  
      gl.deleteShader(shader);
      return null;  
    }
    return shader; //and return the shader
  }

  function compileShaderProgram(var vertex, var fragment, var geometry = null) {
      programID = gl.createProgram(); //create a shader program
      vertexID = makeShader("vertex", vertex); //make the shaders
      fragID = makeShader("fragment", fragment);
      if (geometry) {
        geometryID = makeShader("geometry", geometry);
      }
      gl.attachShader(programID, vertex);
      gl.attachShader(programID, fragment); //attatch them
      if (geometry) {
        gl.attachShader(programID, geometry);  
      }
      //TODO - Link shader attribs
  }
  
  function use() {
    gl.useProgram(programID);
  }
}

class Cube() {
    var position;
    var scale;
    var rotation;
    var color;
    constructor() {
        position = glm.vec3(0.0, 0.0, 0.0);
        scale = glm.vec3(1.0, 1.0, 1.0);
        rotation = glm.vec3(1.0, 1.0, 1.0);
        color = glm.vec3(1.0, 1.0, 1.0);
    }
    function move(x, y) {
        position
    }
}

class CubeRenderer() {
  var shader;
  var vao;
  var vbo;
  var ebo;
  constructor(Shader) {
    shader = Shader;
    vbo = gl.createBuffer();
    ebo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
    
    var vertices[] = {
      0.0, 0.0, 0.5,
      1.0, 0.0, 0.5,
      1.0, -1.0, 0.5,
      0.0, -1.0, 0.5,
      0.0, 0.0, -0.5,
      1.0, 0.0, -0.5,
      1.0, -1.0, -0.5,
      0.0, -1.0, -0.5
    };
    
    //TODO add elements array
  }
}

class Rectangle() {
  var position = glm.vec2(0.0, 0.0);
  var scale;
  var rotation = 0;
  constructor() {
    position = glm.vec2(0.0, 0.0);
    scale = glm.vec2(1.0, 1.0);
    rotation = 0.0;
  }
}

class RectangleRenderer() {
  var shader;
  var vao;
  var vbo;
  var ebo;
  constructor(Shader) {
    shader = Shader;
    vbo = gl.createBuffer();
    ebo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  }
}

function initWebGL(var canvas) {
  gl = null;
  
  gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl"); //get the context
  
  if (!gl) { //if it didn't initialize
    alert("The WebGL context failed to initialize. You may need to update your browser.");  
  }
  
  return gl;
}

function start() {
  var canvas = document.getElementById("paint"); //get the canvas element
  
  gl = initWebGL(canvas);
  
  if (!gl) {
    document.write("The WebGL context failed to initialize.");
    return;
  }
  
  gl.clearColor(0.0, 0.0, 0.0, 1.0); //clear colors
  
  
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  vbo = gl.createBuffer();
  ebo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
  
  var shader = new Shader();
  
  shader.compileShaderProgram(vertexSource, fragmentSource);
  
  main();
}

function update() {
  
}

function draw() {
  
}

function main() {
  
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 
  
  clearTimeout(cmTID);
  setTimeout(main, 100);
}
