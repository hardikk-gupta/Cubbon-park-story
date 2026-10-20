#version 300 es
  precision highp float;
  out vec4 o;
  uniform vec2 fres;
  uniform vec4 rect;
  uniform float time, gust, soft;
  uniform vec4 B[12];
  uniform vec4 C[12];
  uniform int nB;
  uniform vec4 K[4];
  uniform int nK;
  
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
  vec2 edge(float bl, float d){ return vec2(smoothstep(-bl, bl, d), smoothstep(-bl*.45, bl*.45, d)); }
  float leafSd(vec2 p, vec2 c, float a, float len, float W){
    p -= c;
    float ca = cos(a), sa = sin(a);
    p = vec2(ca*p.x + sa*p.y, -sa*p.x + ca*p.y);
    p.x -= len*.5;
    float t = clamp(p.x/(len*.5), -1., 1.);
    float w = W*sqrt(max(0., 1. - t*t))*(1.1 - .3*t);
    return max(abs(p.x) - len*.5, abs(p.y) - w);
  }
  vec2 branch(vec2 p, vec4 b, vec4 c, float t){
    vec2 base = b.xy;
    float ang = b.z, len = b.w, blur = c.x*soft, seed = c.y, bend = c.z;
    vec2 d0 = vec2(cos(ang), sin(ang));
    if (length(p - (base + d0*len*.5)) > len*.62 + 150. + blur*3.) return vec2(1.);
    float g = gust;
    float sway = (sin(t*.7 + seed)*.035 + sin(t*1.63 + seed*2.)*.016)*g;
    float a = ang + sway;
    vec2 dir = vec2(cos(a), sin(a)), nrm = vec2(-dir.y, dir.x);
    vec2 pa = p - base;
    vec2 s = vec2(1.);
    float al = clamp(dot(pa, dir), 0., len);
    s = min(s, edge(blur, length(pa - dir*al - nrm*bend*al*al/len) - mix(5., 1.4, al/len)));
    for (int i = 0; i < 9; i++) {
      float fi = float(i);
      float u = .18 + fi*.095;
      float side = mod(fi, 2.) < 1. ? 1. : -1.;
      vec2 tb = dir*(u*len) + nrm*bend*u*u*len;
      float tl = len*(.32 - fi*.022);
      float ta = a + side*(.75 + .25*sin(fi*2.7 + seed)) + sway*1.8 + sin(t*1.3 + fi*1.9 + seed)*.05*g;
      vec2 td = vec2(cos(ta), sin(ta)), tn = vec2(-td.y, td.x);
      vec2 pt = pa - tb;
      float tAlong = dot(pt, td);
      float bl = blur*(.55 + 1.*hash1(fi + seed*7.));
      if (abs(dot(pt, tn)) > 80. + bl*2. || tAlong < -70. || tAlong > tl + 80.) continue;
      s = min(s, edge(bl, length(pt - td*clamp(tAlong, 0., tl)) - 1.3));
      for (int j = 0; j < 8; j++) {
        float fj = float(j);
        bool tip = j == 7;
        float v = tip ? 1. : .1 + fj*.13;
        float ls = tip ? 0. : (mod(fj, 2.) < 1. ? 1. : -1.);
        float fl = sin(t*(2.4 + hash1(fi*7. + fj)*2.2) + fi*3. + fj*1.7 + seed)*.22*g;
        float la = ta + ls*(.85 + .2*hash1(fi + fj*3. + seed)) + fl;
        float ll = 40. + 26.*hash1(fi*3.1 + fj + seed);
        float W = ll*(.26 + .08*hash1(fj*5. + fi + seed));
        W *= .6 + .4*abs(cos(fl*2.2));
        // each leaf hangs at its own height, so its edge is its own softness
        float lb = bl*(.75 + .5*hash1(fi*13. + fj*7. + seed));
        s = min(s, edge(lb, leafSd(pt, td*(v*tl), la, ll, W)));
      }
    }
    return s;
  }
  // the far crown: soft masses, with round sun flecks where light gets through
  vec2 canopy(vec2 p, vec4 k, float t){
    float d = length(p - k.xy)/k.z;
    if (d > 1.25) return vec2(1.);
    vec2 drift = vec2(sin(t*.5), cos(t*.37))*6.*gust;
    float n = fbm((p + drift)/80.)*.62 + fbm((p - drift*1.6)/34. + 7.)*.38;
    float dens = n + (1. - d)*.32;
    float fall = smoothstep(1.2, .55, d);
    float m1 = smoothstep(.38, .6, dens), m2 = smoothstep(.43, .53, dens);
    vec2 cell = floor((p + drift*.6)/52.);
    float fleck = 0., fleck2 = 0.;
    for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
      vec2 c = cell + vec2(x, y);
      float h = hash(c*1.7);
      if (h < .55) continue;
      vec2 q = (c + vec2(hash(c + 3.1), hash(c + 7.7)))*52.;
      float r = 4. + 7.*hash(c + 9.3);
      float dd = length((p + drift*.6) - q);
      fleck = max(fleck, smoothstep(r + 6.*soft, r - 3., dd));
      fleck2 = max(fleck2, smoothstep(r + 2., r - 1., dd));
    }
    return vec2(1.) - vec2(m1*(1. - fleck*.8), m2*(1. - fleck2*.85))*fall;
  }
  void main(){
    vec2 p = mix(rect.xy, rect.zw, gl_FragCoord.xy/fres);
    vec2 s = vec2(1.);
    for (int i = 0; i < 12; i++) { if (i >= nB) break; s = min(s, branch(p, B[i], C[i], time)); }
    for (int i = 0; i < 4; i++) { if (i >= nK) break; s = min(s, canopy(p, K[i], time)); }
    o = vec4(s, 0., 1.);
  }
