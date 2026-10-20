#version 300 es
  precision highp float;
  out vec4 o;
  uniform sampler2D src;
  uniform vec2 res, dir;
  void main(){
    vec2 uv = gl_FragCoord.xy/res;
    vec4 acc = vec4(0.); float ws = 0.;
    for (int i = -6; i <= 6; i++) { float f = float(i), w = exp(-f*f/18.); acc += texture(src, uv + dir*f)*w; ws += w; }
    o = acc/ws;
  }
