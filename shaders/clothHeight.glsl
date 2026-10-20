#version 300 es
  precision highp float;
  out vec4 o;
  uniform vec2 fres;
  uniform vec4 rect;
  const float ANG = -.04;
  
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
  float crease(float d, float s){ return s*(1.4*exp(-d*d/50.) + 1.1*exp(-d*d/2600.)); }
  float height(vec2 m){
    float wx = (noise(vec2(m.y/170., 3.)) - .5)*26.;
    float wy = (noise(vec2(m.x/210., 9.)) - .5)*22.;
    float sx = mod(floor((m.x + wx)/660.), 2.)*2. - 1.;
    float sy = mod(floor((m.y + wy)/560.), 2.)*2. - 1.;
    float dx = mod(m.x + wx, 660.) - 330.;
    float dy = mod(m.y + wy, 560.) - 280.;
    float h = crease(dx, sx)*1.3 + crease(dy, sy)*1.0;
    h += (fbm(m/380.) - .5)*16.;
    float wr = fbm(m/240. + 4.);
    h += sin(dot(m, vec2(.55, .83))/21. + wr*7.)*smoothstep(.5, .72, fbm(m/520. + 11.))*1.5;
    return h;
  }
  void main(){
    vec2 w = mix(rect.xy, rect.zw, gl_FragCoord.xy/fres);
    float c = cos(ANG), s = sin(ANG);
    vec2 m = mat2(c, -s, s, c)*w;
    float e = 2.;
    float hx = (height(m + vec2(e, 0)) - height(m - vec2(e, 0)))/(2.*e);
    float hy = (height(m + vec2(0, e)) - height(m - vec2(0, e)))/(2.*e);
    vec3 n = normalize(vec3(-hx, -hy, 1.));
    float shade = 1. + (dot(n, L) - L.z)*1.7;
    shade *= 1. + clamp(height(m)*.01, -.07, .04);
    vec2 slack = vec2(fbm(m/300. + 1.), fbm(m/300. + 5.)) - .5;
    o = vec4(clamp(shade*.5, 0., 1.), slack*.9 + .5, fbm(m/90. + 20.));
  }
