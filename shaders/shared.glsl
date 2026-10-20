
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
