#version 300 es
  precision highp float;
  
  in vec2 a;
  uniform vec3 pos;
  uniform vec2 size;
  uniform vec3 rot;
  uniform vec2 bend;
  uniform vec3 curlA;
  uniform vec2 curlB;
  uniform vec4 crumple;
  uniform vec3 quad;
  uniform float shape;
  uniform vec2 cam;
  uniform float zoom, spin;
  uniform vec2 view;
  uniform vec4 wrect;
  out vec3 vP; out vec3 vN; out vec2 vUV; out vec3 vQ; out vec3 vT; out vec3 vO; out float vC;
  
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
  float ch(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7)))*43758.5453); }
  const float FSZ = 2.1;
  vec3 h3(vec3 p){ p = vec3(dot(p, vec3(127.1, 311.7, 74.7)), dot(p, vec3(269.5, 183.3, 246.1)), dot(p, vec3(113.5, 271.9, 124.6))); return fract(sin(p)*43758.5453); }
  // the facets of a crumpled ball: each patch of paper is a flat plane, tipped a little and set a little in or
  // out; where a lower plane meets a higher one there is a lip, and a shadow tucked under it. p is where this
  // bit of paper sits on the finished ball (a unit sphere), scaled to the facet size.
  // returns (height off the sphere, as a share of its radius; how deep in shadow; distance to the edge), and the plane's tilt
  vec3 warp(vec3 p){ return p + (vec3(sin(p.y*1.7 + 1.3), sin(p.z*1.9 + 4.1), sin(p.x*1.5 + 2.7)) + .5*vec3(sin(p.z*3.1), sin(p.x*2.9 + 1.), sin(p.y*3.3 + 2.)))*.32; }
  vec3 facets(vec3 p, float TL, float OF, float W, out vec3 tilt){
    vec3 P = normalize(p), i = floor(p);
    float d1 = 9., d2 = 9.; vec3 a1, a2;
    for (int z = -1; z <= 1; z++) for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
      vec3 g = i + vec3(x, y, z), fp = g + h3(g);
      // weighted, so some facets grow big and others stay small, and every edge stays straight
      vec3 df = fp - p; float d = dot(df, df) - h3(g + 2.9).y*.55;
      if (d < d1) { d2 = d1; a2 = a1; d1 = d; a1 = g; } else if (d < d2) { d2 = d; a2 = g; }
    }
    vec3 c1 = normalize(a1 + h3(a1)), c2 = normalize(a2 + h3(a2));
    vec3 n1 = normalize(c1 + (h3(a1 + 31.7) - .5)*TL), n2 = normalize(c2 + (h3(a2 + 31.7) - .5)*TL);
    float o1 = (h3(a1 + 7.3).x - .5)*OF, o2 = (h3(a2 + 7.3).x - .5)*OF;
    float k1 = dot(c1*(1. + o1), n1)/max(dot(P, n1), .3) - 1., k2 = dot(c2*(1. + o2), n2)/max(dot(P, n2), .3) - 1.;
    // the step between two planes is eased over a short width, so it reads as a lip, not a stair
    float e = d2 - d1, w = smoothstep(0., W, e);
    tilt = n1 - P*dot(n1, P);
    return vec3(mix((k1 + k2)*.5, k1, w), smoothstep(.02, .07, k2 - k1)*exp(-e*16.), e);
  }
  // the same planes, blended smoothly, for the shape itself: the mesh can't hold a sharp step, the shading can
  float lumps(vec3 p, float TL, float OF){
    vec3 P = normalize(p), i = floor(p);
    float sw = 0., sh = 0.;
    for (int z = -1; z <= 1; z++) for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
      vec3 g = i + vec3(x, y, z), fp = g + h3(g), c1 = normalize(fp);
      vec3 df = fp - p; float w = exp(-(dot(df, df) - h3(g + 2.9).y*.55)*10.);
      vec3 n1 = normalize(c1 + (h3(g + 31.7) - .5)*TL);
      float o1 = (h3(g + 7.3).x - .5)*OF;
      sh += w*(dot(c1*(1. + o1), n1)/max(dot(P, n1), .3) - 1.); sw += w;
    }
    return sh/max(sw, 1e-5);
  }
  void main(){
    float s = a.x*size.x, t = a.y*size.y;
    vec3 lp, ln;
    vQ = vec3(0., 0., 1.); vT = vec3(1., 0., 0.); vO = vec3(1., 0., 0.); vC = 0.;
    if (shape > .5) {
      // a leaf or a flower: curled along its length, cupped across it, and twisted
      lp = vec3(s, t, quad.x*s*s + quad.y*t*t + quad.z*s*t);
      ln = normalize(vec3(-(2.*quad.x*s + quad.z*t), -(2.*quad.y*t + quad.z*s), 1.));
    } else if (crumple.y > 0.) {
      // a sheet crumpled into a ball (crumple: how crumpled, ball radius, roll, half its diagonal). The sheet is
      // drawn round a sphere from its middle, square mapped to a disc so every edge closes at the same point,
      // drawing side in. On it, flat facets between straight creases, lumps where they sit in or out
      float c = crumple.x, R = crumple.y;
      vec2 q = a*2., dk = vec2(q.x*sqrt(1. - q.y*q.y*.5), q.y*sqrt(1. - q.x*q.x*.5));
      float rd = min(length(dk), 1.), th1 = 2.*asin(rd*.999), pd = atan(dk.y*size.y, dk.x*size.x);
      // it doesn't open evenly: some flaps let go before others, the outside before the middle
      float wv = .5 + .22*sin(2.*pd + 1.3) + .18*sin(3.*pd + 4.1) + .1*sin(5.*pd + 2.2);
      float o = clamp(((1. - c) - .25*wv*(1. - .5*rd))/.75, 0., 1.), cl = 1. - smoothstep(0., 1., o);
      float m = smoothstep(0., 1., cl), D = crumple.w;
      float L = length(vec2(s, t)), ph = atan(mix(t, dk.y*size.y, m), mix(s, dk.x*size.x, m));
      float r = R/max(pow(cl, 1.6), 1e-4), th = mix(L, th1*R, m)/r;
      lp = vec3(sin(th)*cos(ph), sin(th)*sin(ph), 1. - cos(th))*r;
      ln = vec3(-sin(th)*cos(ph), -sin(th)*sin(ph), cos(th));
      // where this bit of paper sits on the finished ball: the facets belong to it, so they keep their place as it opens
      vec3 P = vec3(sin(th1)*cos(pd), sin(th1)*sin(pd), -cos(th1));
      float h = clamp(lumps(P*FSZ, .55, .1), -.3, .3) + lumps(P*FSZ*2.4 + 11.3, .5, .05)*.25;
      // half open it is still rumpled: the creases stand big against the sheet
      lp -= ln*h*(R*cl + D*.3*cl*(1. - cl));
      lp.z *= mix(1., .86, m);
      vQ = P; vC = cl;
      // the frame the facets tilt in: on the ball, and here, as it opens (along the sheet from its middle; outward)
      vT = vec3(cos(th)*cos(ph), cos(th)*sin(ph), sin(th));
      vO = vec3(cos(th1)*cos(pd), cos(th1)*sin(pd), sin(th1));
      // rolling, about the ball's own centre
      float ca = cos(crumple.z), sa = sin(crumple.z);
      lp.z -= R; lp = vec3(lp.x*ca + lp.z*sa, lp.y, -lp.x*sa + lp.z*ca); lp.z += R;
      ln = vec3(ln.x*ca + ln.z*sa, ln.y, -ln.x*sa + ln.z*ca);
      vT = vec3(vT.x*ca + vT.z*sa, vT.y, -vT.x*sa + vT.z*ca);
    } else if (curlB.x > 0.) {
      // peeling up: past the fold line (across direction u, at d) the paper rolls round a cylinder of
      // radius R and lies back over itself, face down; the whole of it slid along u to stay in place
      vec2 u = curlA.xy, v = vec2(-u.y, u.x);
      float al = dot(vec2(s, t), u), x = al - curlA.z, R = curlB.x, an = al, z = 0.;
      vec2 nn = vec2(0., 1.);
      if (x > 0.) {
        float ag = min(x/R, 3.14159265);
        an = curlA.z + R*sin(ag) - max(x - 3.14159265*R, 0.);
        z = R*(1. - cos(ag));
        nn = vec2(-sin(ag), cos(ag));
      }
      lp = vec3(u*(an + curlB.y) + v*dot(vec2(s, t), v), z);
      ln = vec3(u*nn.x, nn.y);
    } else {
      float th0 = bend.x, k = bend.y, th = th0 + k*s;
      lp = abs(k) < 1e-6 ? vec3(s*cos(th0), t, s*sin(th0)) : vec3((sin(th) - sin(th0))/k, t, (cos(th0) - cos(th))/k);
      ln = vec3(-sin(th), 0., cos(th));
    }
    float c = cos(rot.y), sn = sin(rot.y);
    lp = vec3(lp.x, lp.y*c - lp.z*sn, lp.y*sn + lp.z*c);
    ln = vec3(ln.x, ln.y*c - ln.z*sn, ln.y*sn + ln.z*c);
    vT = vec3(vT.x, vT.y*c - vT.z*sn, vT.y*sn + vT.z*c);
    c = cos(rot.z); sn = sin(rot.z);
    lp = vec3(lp.x*c + lp.z*sn, lp.y, -lp.x*sn + lp.z*c);
    ln = vec3(ln.x*c + ln.z*sn, ln.y, -ln.x*sn + ln.z*c);
    vT = vec3(vT.x*c + vT.z*sn, vT.y, -vT.x*sn + vT.z*c);
    c = cos(rot.x); sn = sin(rot.x);
    lp = vec3(lp.x*c - lp.y*sn, lp.x*sn + lp.y*c, lp.z);
    ln = vec3(ln.x*c - ln.y*sn, ln.x*sn + ln.y*c, ln.z);
    vT = vec3(vT.x*c - vT.y*sn, vT.x*sn + vT.y*c, vT.z);
    vP = pos + lp; vN = ln; vUV = a + .5;
  #ifdef OCC
    vec2 g = vP.xy - L.xy/L.z*vP.z;
    gl_Position = vec4((g - (wrect.xy + wrect.zw)*.5)/((wrect.zw - wrect.xy)*.5), 0., 1.);
  #else
    // the camera can be higher than usual (zoom < 1) and turned a little, for the welcome
    vec2 q = vP.xy - cam;
    float cr = cos(spin), sr = sin(spin);
    q = vec2(cr*q.x - sr*q.y, sr*q.x + cr*q.y);
    float w = (D/zoom - vP.z)/D;
    gl_Position = vec4(q.x/(view.x*.5), -q.y/(view.y*.5), -vP.z/5000.*w, w);
  #endif
  }
