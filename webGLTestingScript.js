var gl;

function initWebGL(var canvas) {
  gl = null;
  
  gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  
  if (!gl) {
    alert("The WebGL context failed to initialize. You may need to update your browser.");  
  }
  
  return gl;
}

function start() {
  var canvas = document.getElementById("paint");
  
  gl = initWebGL(canvas);
  
  if (!gl) {
    document.write("The WebGL context failed to initialize.");
    return;
  }
  
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  
  /* FOR 3D
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  */
  gl.clear(gl.COLOR_BUFFER_BIT /* | gl.DEPTH_BUFFER_BIT*/);
}
