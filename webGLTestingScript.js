var gl;

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
  
  gl.clearColor(1.0, 1.0, 1.0, 1.0); //clear colors
  
  /* FOR 3D
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  */
  gl.clear(gl.COLOR_BUFFER_BIT /* | gl.DEPTH_BUFFER_BIT*/);
}
