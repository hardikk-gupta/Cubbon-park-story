#version 300 es
  precision highp float;
  
  layout(location = 0) in vec3 aP;
  layout(location = 1) in vec3 aN;
  layout(location = 2) in vec2 aT;
  uniform mat3 M, MN;
  uniform vec3 pos;
  uniform vec2 cam;
  uniform float zoom, spin;
  uniform vec2 view;
  uniform vec4 wrect;
  out vec3 vP; out vec3 vN; out vec2 vUV;
  
  float hash(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
  float hash1(float n){ return fract(sin(n * 91.345) * 47453.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p); f = f*f*(3. - 2.*f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
  }
  float fbm(vec2 p){
    float s = 0., a = .5;
    for (int i = 0; i < 5; i++) { s += a*noise(p); p = mat2(1.6, 1.2, -1.2, 1.6)*p + 7.3; a *= .5; }
    return s;
  }
  const vec3 L = normalize(vec3(-.36, -.46, .81));
  const vec3 AMB = vec3(.56, .56, .62);
  const vec3 SUN = vec3(1., .99, .965);
  const float D = 1800.;
  void main(){
    vP = pos + M*aP; vN = normalize(MN*aN); vUV = aT;
  #ifdef OCC
    vec2 g = vP.xy - L.xy/L.z*vP.z;
    gl_Position = vec4((g - (wrect.xy + wrect.zw)*.5)/((wrect.zw - wrect.xy)*.5), 0., 1.);
  #else
    vec2 q = vP.xy - cam;
    float cr = cos(spin), sr = sin(spin);
    q = vec2(cr*q.x - sr*q.y, sr*q.x + cr*q.y);
    float w = (D/zoom - vP.z)/D;
    gl_Position = vec4(q.x/(view.x*.5), -q.y/(view.y*.5), -vP.z/5000.*w, w);
  #endif
  }
