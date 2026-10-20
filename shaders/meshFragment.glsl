#version 300 es
  precision highp float;
  in vec3 vP; in vec3 vN; in vec2 vUV;
  out vec4 o;
  uniform sampler2D tex, leafTex, occT, occW;
  uniform vec4 color;
  uniform float useTex, gloss, specPow, sheen, opacity, refl, metal, zoom;
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
  vec3 sky(vec3 R){
    // what a shiny surface on a lawn reflects: bright sky above, the tree and grass toward the horizon
    vec3 up = mix(vec3(.74, .82, .9), vec3(.98, .99, 1.), smoothstep(.3, .95, R.z));
    vec3 low = mix(vec3(.2, .24, .14), vec3(.42, .46, .34), smoothstep(-.6, .15, R.z));
    return mix(low, up, smoothstep(.05, .35, R.z));
  }
  void main(){
    vec3 V = normalize(vec3(cam, D/zoom) - vP);
    vec3 N = normalize(vN);
    if (dot(N, V) < 0.) N = -N;
    vec4 t = useTex > .5 ? texture(tex, vUV) : vec4(1.);
    vec3 alb = (t.a > .001 ? t.rgb/t.a : vec3(0.))*color.rgb;
    float a = t.a*color.a*opacity;
    if (a < .004) discard;
    vec2 q = vP.xy - L.xy/L.z*vP.z;
    vec2 lu = (q - wrect.xy)/(wrect.zw - wrect.xy);
    vec2 lr = texture(leafTex, lu).rg;
    float S = mix(lr.r, lr.g, clamp(vP.z/300., 0., 1.));
    vec4 tT = texture(occT, lu), tW = texture(occW, lu);
    float hgt = tW.r > .002 ? tW.g/tW.r*600. : 0.;
    float occ = mix(tT.r, tW.r, clamp((hgt - vP.z)/150., 0., 1.))*smoothstep(vP.z + 3., vP.z + 28., hgt);
    float nl = dot(N, L);
    float sunVis = S*(1. - occ*.96);
    vec3 light = AMB*(.82 + .18*N.z) + (SUN - AMB)*sunVis*max(nl, 0.)/L.z;
    vec3 H = normalize(L + V);
    float nh = max(dot(N, H), 0.), lit = sunVis*step(0., nl);
    float spec = (pow(nh, specPow)*gloss + pow(nh, 26.)*sheen)*lit;
    vec3 R = reflect(-V, N);
    float fres = pow(1. - max(dot(N, V), 0.), 5.);
    vec3 env = sky(R)*(.55 + .45*S);
    vec3 col = alb*light;
    // metal: mostly what it reflects, coloured by the metal
    col = mix(col, env*alb*1.15, metal);
    // a clear coat or glass reflects the sky, most at grazing angles
    vec3 shine = env*refl*(.04 + .96*fres) + vec3(spec)*SUN;
    float ao = a + (1. - a)*min(1., refl*fres*.9 + spec);
    o = vec4(col*a + shine, ao);
  }
