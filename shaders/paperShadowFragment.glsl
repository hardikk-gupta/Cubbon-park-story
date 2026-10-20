#version 300 es
  precision highp float;
  in vec3 vP; in vec3 vN; in vec2 vUV;
  out vec4 o;
  uniform sampler2D texA;
  uniform int mode;
  uniform float alphaMul;
  void main(){
    if (mode == 3) discard;
    float a = mode == 1 ? 1. : texture(texA, vUV).a*alphaMul;
    if (a < .5) discard;
    // a leaf high in the air throws a fainter, broader shadow than one about to land
    float f = mode == 2 ? 1. - .6*smoothstep(40., 450., vP.z) : 1.;
    o = vec4(f, f*clamp(vP.z/600., 0., 1.), 0., 1.);
  }
