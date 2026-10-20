#version 300 es
  precision highp float;
  in vec3 vP; in vec3 vN; in vec2 vUV;
  out vec4 o;
  uniform float shadow;
  void main(){ o = vec4(shadow, shadow*clamp(vP.z/600., 0., 1.), 0., 1.); }
