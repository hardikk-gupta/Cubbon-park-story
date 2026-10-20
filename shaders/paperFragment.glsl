#version 300 es
  precision highp float;
  in vec3 vP; in vec3 vN; in vec2 vUV; in vec3 vQ; in vec3 vT; in vec3 vO; in float vC;
  out vec4 o;
  uniform sampler2D texA, texB, texS, leafTex, occT, occW;
  uniform int mode;
  uniform float mixB, alphaMul, sigReveal, gloss, glossBack, zoom, sheen, dapple;
  uniform vec2 cam;
  uniform vec4 wrect;
  
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
  uniform vec4 crumple;
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
    vec3 V = normalize(vec3(cam, D/zoom) - vP);
    bool front = dot(vN, V) >= 0.;
    vec3 N = front ? vN : -vN;
    // a crumpled sheet: each facet's tilt is worked out here for every pixel so its creases are straight and
    // sharp, carried from the ball's frame into the sheet's as it opens
    float fold = 0.;
    if (crumple.y > 0.) {
      vec3 Q = normalize(vQ), t1, t2, t3;
      vec3 f = facets(Q*FSZ, .55, .1, .02, t1), g = facets(Q*FSZ*2.4 + 11.3, .5, .05, .02, t2), k = facets(Q*FSZ*6. + 5.1, .5, .02, .02, t3);
      vec3 dn = t1 + t2*.6 + t3*.35, E1 = normalize(vO - Q*dot(vO, Q)), E2 = cross(Q, E1);
      vec3 no = -normalize(vN), T = normalize(vT - no*dot(vT, no)), B = cross(no, T);
      vec3 Nout = normalize(no + (T*dot(dn, E1) + B*dot(dn, E2))*pow(vC, .35)*2.6);
      N = front ? -Nout : Nout;
      fold = .75*smoothstep(0., .5, (f.y + g.y*.7 + k.y*.4)*vC*vC);
    }
    vec4 c;
    if (mode == 1) {
      if (front) {
        c = texture(texA, vUV);
        vec4 sg = texture(texS, vUV);
        float m = smoothstep(sigReveal, sigReveal - .05, vUV.x - vUV.y*.18);
        c = c*(1. - sg.a*m) + sg*m;
      } else {
        c = texture(texB, vec2(1. - vUV.x, vUV.y));
      }
    } else if (mode == 2) {
      c = front ? texture(texA, vUV) : texture(texB, vUV);
    } else {
      c = mix(texture(texA, vUV), texture(texB, vUV), mixB);
    }
    c *= alphaMul;
    if (c.a < .01 && mode != 3) discard;
    // sunlight reaching this point: leaves are crisper and shifted on anything lifted toward them
    vec2 q = vP.xy - L.xy/L.z*vP.z;
    vec2 lu = (q - wrect.xy)/(wrect.zw - wrect.xy);
    vec2 lr = texture(leafTex, lu).rg;
    float S = mix(lr.r, lr.g, clamp(vP.z/300., 0., 1.));
    // something held up to read: its leaf shadow is kept faint so the words stay clear
    S = mix(S, 1., dapple);
    // a caustic: sunlight gathered by a glass, added on top of whatever is under it
    if (mode == 3) { o = vec4(c.rgb*S, 0.); return; }
    vec4 tT = texture(occT, lu), tW = texture(occW, lu);
    float hgt = tW.r > .002 ? tW.g/tW.r*600. : 0.;
    // only what stands clearly above this point shades it, fading in rather than switching on
    float occ = mix(tT.r, tW.r, clamp((hgt - vP.z)/150., 0., 1.))*smoothstep(vP.z + 3., vP.z + 28., hgt);
    float nl = dot(N, L);
    float d = max(nl, 0.)/L.z;
    vec3 light = (AMB + (SUN - AMB)*S*d*(1. - occ*.96))*(1. - fold);
    // leaves and petals are thin: sun on the far side still glows through, warmer and greener
    if (mode == 2) light += vec3(.5, .56, .3)*S*max(-nl, 0.)/L.z*(1. - occ)*.75;
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.), 220.)*(front ? gloss : glossBack)*S*(1. - occ)*step(0., dot(N, L));
    // paper's broad sheen: it slides across a stamp as it tilts
    spec += pow(max(dot(N, H), 0.), 26.)*sheen*S*(1. - occ)*step(0., dot(N, L));
    o = vec4(c.rgb*light + spec*c.a, c.a);
  }
