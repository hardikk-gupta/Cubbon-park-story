#version 300 es
  precision highp float;
  out vec4 o;
  uniform sampler2D field, leafTex, occT, occW;
  uniform vec2 res, view;
  uniform vec2 cam;
  uniform float dpr, zoom, spin;
  uniform vec4 rect, wrect;
  uniform vec3 base, dye;
  uniform vec4 drags[12];
  uniform float dragR[12];
  uniform int ss;
  const float ANG = -.04, T = 2.3, N = 20.;
  
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
  vec3 weave(vec2 q){
    vec2 id = floor(q/T), f = fract(q/T);
    vec3 cw = mix(base, dye, mod(floor(id.x/N), 2.));
    vec3 cf = mix(base, dye, mod(floor(id.y/N), 2.));
    cw *= .93 + .12*noise(vec2(id.x*1.7, q.y/26.));
    cf *= .93 + .12*noise(vec2(q.x/26., id.y*1.7));
    float pw = sin(3.1416*f.x), pf = sin(3.1416*f.y);
    return mod(id.x + id.y, 2.) < 1.
      ? cw*(.7 + .32*sqrt(pw))*(.92 + .08*pf)
      : cf*(.7 + .32*sqrt(pf))*(.92 + .08*pw);
  }
  void main(){
    vec2 css0 = vec2(gl_FragCoord.x, res.y - gl_FragCoord.y)/dpr;
    vec2 sc = (css0 - view*.5)/zoom;
    float cr = cos(spin), sr = sin(spin);
    vec2 w0 = vec2(cr*sc.x + sr*sc.y, -sr*sc.x + cr*sc.y) + cam;
    // a passing hand carries the cloth along: it bunches up ahead of the hand and stretches behind it,
    // then springs back. disp is how far the weave moved, g the slope of the little rucks it makes.
    vec2 disp = vec2(0.), g = vec2(0.);
    for (int i = 0; i < 12; i++) {
      vec4 k = drags[i];
      if (k.z == 0. && k.w == 0.) continue;
      float r2 = dragR[i]*dragR[i];
      vec2 d = w0 - k.xy;
      float G = exp(-dot(d, d)/r2);
      if (G < .004) continue;
      float ad = dot(k.zw, d);
      disp += k.zw*G;
      // height = -div(disp) = 2 (A.d)/r2 G, and its gradient
      g += 2.*G/r2*(k.zw - 2.*ad*d/r2);
    }
    g *= 26.;
    vec4 F = texture(field, (w0 - rect.xy)/(rect.zw - rect.xy));
    vec2 slack = (F.gb - .5)*16.;
    float c = cos(ANG), s = sin(ANG);
    mat2 R = mat2(c, -s, s, c);
    vec3 col = vec3(0);
    if (ss == 4) {
      for (int i = 0; i < 4; i++) {
        vec2 off = vec2(float(i & 1), float(i >> 1)) - .5;
        col += weave(R*(w0 - disp + off*.5/dpr) + slack);
      }
      col *= .25;
    } else {
      col = (weave(R*(w0 - disp - .25/dpr) + slack) + weave(R*(w0 - disp + .25/dpr) + slack))*.5;
    }
    // only the light catching the rucks changes; nothing presses a dark hollow into the mat
    vec3 n = normalize(vec3(-g, 1.));
    float shade = F.r*2.*(1. + (dot(n, L) - L.z)/L.z*.9);
    col *= 1. - (F.a - .5)*.08;
    col *= .975 + .05*hash(gl_FragCoord.xy);
    vec2 lu = (w0 - wrect.xy)/(wrect.zw - wrect.xy);
    float S = texture(leafTex, lu).r;
    vec4 tT = texture(occT, lu), tW = texture(occW, lu);
    float hgt = tW.r > .002 ? tW.g/tW.r*600. : 0.;
    float occ = mix(tT.r, tW.r, clamp(hgt/150., 0., 1.));
    // a card overhead also blocks some of the open sky, most of all when it is close
    float ao = tW.r*(.22 + .3*exp(-hgt/90.));
    vec3 light = AMB*(1. - ao) + (SUN - AMB)*S*(1. - occ*.96);
    o = vec4(col*shade*light, 1.);
  }
