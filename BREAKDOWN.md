# aarya.wtf: how the website actually works

## 1. Architecture and page inventory

The apparent picnic table is a fixed `<canvas id="scene">`, drawn using **raw WebGL 2**. A nearly invisible `#track` creates a long native vertical scroll range. JavaScript reads the scroll position, smooths it, moves a virtual camera across and down a world, and deforms objects. This is why vertical scrolling can seem to travel horizontally across stamps.

Canvas 2D builds the print artwork and procedural textures. WebGL renders those textures on paper and solid meshes. DOM overlays provide navigation, sound, the paint toolbar, the email form and the full-screen case-study iframe. CSS transitions and the Web Animations API handle those DOM elements.

Load order matters: `paint → print → colour → scene → nature → butterflies → sound → props → picnic → case`. The files publish globals rather than ES modules. No package installation is needed to serve the captured website.

| View | Implementation |
| --- | --- |
| Picnic home | `index.html`, ten scripts, custom WebGL renderer |
| Minimal home | `minimal/index.html`; HTML/CSS, project cards and videos |
| Goalkeeper | `work/goalkeeper.html`; animated app notifications, lazy board iframes (`work/gk/board.html`) |
| PRD Loop | `work/prd-loop.html`; `claude-demo.js`, skill/workflow demonstrations |
| PhonePe | `work/phonepe.html`; comparison UI and local Expo web prototype under `work/pp/` |
| Ride through the Valley | `work/ride-through-the-valley.html`; project introduction and external game link |
| Dayro | `work/dayro.html`; interactive smart-home design examples |
| LAMAD | `work/lamad.html`; ERP case study and before/after UI |
| Transporter | `work/transporter.html`; five-platform logistics case study |
| QuickMart | `work/quickmart.html`; retail backend case study |
| Shared next project | `work/more.js`; stamp carousel, seen-project tracking, hover slowdown |

## 2. Why the shadows look convincing

The main effect is not one elaborate CSS `box-shadow`. Several lighting systems agree on the same scene geometry.

### One common light direction

The shaders share:

```glsl
const vec3 L = normalize(vec3(-.36, -.46, .81));
const vec3 AMB = vec3(.56, .56, .62);
const vec3 SUN = vec3(1., .99, .965);
const float D = 1800.;
```

Normals on the cloth, curved paper, leaves and props all receive this light. A surface turning away becomes darker; warm sunlight and slightly cooler ambient light remain consistent. Specular highlights follow the surface orientation. This agreement creates depth even before a cast shadow is added.

### Objects project real silhouettes along the sun vector

The shadow variants of the vertex shaders use the **same deformed geometry** as the visible object. They project it onto the light plane:

```glsl
vec2 g = vP.xy - L.xy / L.z * vP.z;
```

Lifting a stamp changes both its shadow position and separation. Curling the paper also curls the shadow silhouette. Alpha tests keep the outlines of leaves and stickers. Solid props have a separate mesh shadow pass with material-specific strengths. The blend equation `MAX` combines mask/height contributions.

The shadow buffer encodes coverage in red and height-weighted coverage in green. The renderer approximates the height of a caster by dividing the blurred green by red and multiplying by 600. This is an efficient custom shadow model, not a complete physical light-transport simulation.

### Two blur scales: contact and airborne

In `Scene.render`, the shadow mask is blurred horizontally and vertically twice: a tight version and a wide version. The relevant constants are `I = .5`, `V = 4 * I` and `k = 26 * I`. These are shadow-buffer blur controls, not CSS pixel blur declarations. The GLSL blur uses 13 samples per axis, with weights `exp(-f*f/18.)`.

On the cloth:

```glsl
float hgt = tW.r > .002 ? tW.g / tW.r * 600. : 0.;
float occ = mix(tT.r, tW.r, clamp(hgt / 150., 0., 1.));
```

On a raised object the code subtracts that receiving surface's height before choosing softness. A `smoothstep(vP.z + 3., vP.z + 28., hgt)` suppresses shading from objects that are not clearly above it. This lets a leaf land on a postcard and cast onto the postcard rather than only onto the cloth.

**Perceptual result:** near-contact edges anchor objects; raised areas have broader, more displaced shadows; paper looks connected to its surroundings during motion.

### Animated canopy shadows

`canopy.glsl` constructs branches and leaves procedurally using distance functions, nested twig/leaf loops, noise, and time-varying angles. Example branch sway:

```glsl
float sway = (sin(t*.7 + seed)*.035
            + sin(t*1.63 + seed*2.)*.016)*gust;
```

It writes two edge-softness variants into a texture. Surfaces sample these in light space. Higher objects receive a sharper variant (`clamp(vP.z/300.,0.,1.)`) and a shifted shadow position. The ground, the postcard and the props are visibly in the same moving shade.

The `dapple` control weakens canopy shadows for something held up to read. This is an intentional readability adjustment. Gust strength also responds to pointer speed and transitions, then eases toward its target rather than jumping.

### DOM shadows use two layers and warm colors

The controls outside WebGL still follow the same visual language:

```css
/* navigation stamp */
filter: drop-shadow(0 1px 1px rgba(70,20,25,.28))
        drop-shadow(0 6px 12px rgba(70,20,25,.22));
/* hovering */
filter: drop-shadow(0 2px 2px rgba(70,20,25,.24))
        drop-shadow(0 12px 18px rgba(70,20,25,.24));
/* pill controls */
box-shadow: 0 1px 2px rgba(70,20,25,.2),
            0 8px 20px rgba(70,20,25,.16);
```

`drop-shadow` follows the stamp image's alpha silhouette. `box-shadow` fits the solid rounded controls. The narrow layer supplies contact; the wide layer supplies lift. Hover simultaneously moves, rotates and scales the stamp, so its shadow change feels caused by elevation.

## 3. Cloth, print and material realism

### The gingham is generated, not a tiled photo

`clothFragment.glsl` computes alternating warp/weft threads. Thread spacing is `T = 2.3`, with `N = 20` threads per checker band. Thread crossings alternate by parity. Sine-based thread profiles, per-thread noise, tiny fragment grain and antialiasing make the red/cream mat appear woven.

`clothHeight.glsl` precomputes broader folds and slack: periodic creases at roughly 660 and 560 world-unit intervals, several scales of fractal noise and directional wrinkles. Finite differences of the height produce normals for light response. The cloth is rotated slightly (`ANG = -.04`) so it feels casually placed.

### The cloth reacts to the pointer

Up to 12 recent motion impulses are passed to the cloth shader. Each has a position, displacement and growing influence radius. A Gaussian field displaces thread coordinates. The gradient changes local normals, simulating the light catching small rucks ahead of the hand. The visual does not simply paint a dark cursor blob onto the surface.

In the frame controller an impulse uses an envelope approximately:

```js
Math.min(1, age/.05) * Math.exp(-age/.42) * Math.cos(age*5.5)
```

This gives rapid pickup, damping and a small reversal as the cloth relaxes. Displacement magnitude is capped and old samples expire after 1600 ms.

### Paper is a curved mesh with generated print

`print.js` builds postcard fronts/backs, postmarks, textured paper, stamps, die-cut lettering, testimonial cards, contact stickers and the sticker sheet as Canvas 2D artwork. The hero artwork contains an **MP4 playing inside the postcard**; the forest and handwritten entrance are video content, not all procedural WebGL. Wide and portrait intro/loop files and still posters are archived.

The paper vertex shader supports:

- Flat or cylindrical bend with normals derived from curvature.
- A moving curl line: paper wraps around a cylinder and lies back over itself.
- Quadratic curvature for natural leaves/petals.
- Crumpling into a sphere with uneven flap opening, procedural facets and crease shading.

The fragment shader chooses front/back print, flips UVs appropriately, adds specular reflection (`power 220`) and a broader paper sheen (`power 26`). Example hero settings: front gloss `.55`, back gloss `.18`, sheen `.14`. Materials differ instead of all receiving the same plastic shine.

### Solid props

`props.js` constructs camera, coffee, radio and cap geometry and textures in code. Its mesh materials include gloss, sheen, opacity, reflection and metal controls. The mesh fragment shader approximates sky/grass reflections and uses Schlick-style Fresnel `pow(1-dot(N,V),5)` for glass and clear coats. Transparent meshes draw after the opaque scene with depth writes disabled. The glass also has a deliberately added caustic light texture underneath it.

Canvas texture upload uses mipmaps, trilinear minification and anisotropic filtering capped at 8 when supported. These preserve readable print and suppress shimmer on tilted surfaces.

## 4. Why movement is smooth

### Frame-based rendering with time-based updates

The controller schedules one `requestAnimationFrame` loop. Delta time is seconds and is capped at `.05`. Different systems share the scene time and transforms, so shadows and visible geometry do not run as unrelated animations.

Scroll is smoothed with a frame-rate-aware exponential filter:

```js
const dt = Math.min((now - previous) / 1000, .05);
scrollState += (scrollY / viewportHeight - scrollState)
             * (1 - Math.exp(-dt * 7));
```

Hover lift/tilt uses the same pattern with rate 8. Props use rates 10; gust changes use rate 1.5. This behaves consistently across refresh rates and smoothly reverses when targets change. Some additional systems use their own clamped interpolation or springs; the implementation is not universally exponential.

### A real damped spring for postcard bend

The frame controller integrates curvature velocity and position:

```js
velocity += ((targetCurvature - curvature) * 130 - velocity * 13) * dt;
curvature += velocity * dt;
```

The target includes scroll angular velocity, flip progress and hover. Consequently the card bends in response to motion, overshoots and settles instead of looking like a rigid CSS rectangle rotating on a hinge.

### Multiple easing functions serve different purposes

- Cubic ease-in-out for broad transitions: `t < .5 ? 4*t^3 : 1-(-2*t+2)^3/2`.
- Smoothstep `t*t*(3-2*t)` for interpolation and section travel.
- Cubic ease-out `1-(1-t)^3` for settling.
- Back/overshoot curves for stamps and menus.
- Sines, several frequencies and damping for idle movement, gusts, wobble and release.

The browser-native CSS/WAAPI layer uses overshooting Béziers such as `cubic-bezier(.2,1.5,.4,1)`, with stagger delays. Several properties deliberately have different durations, making an object turn, rise and settle at slightly different rates.

## 5. Scroll choreography

Progress is `scrollY / innerHeight`, not an arbitrary percentage of document height. At a fixed viewport the original controller exposes the actual stage values as `window.picnic.T`.

| Stage | Progress values in controller |
| --- | --- |
| Postcard flip | `.12 → 1.3` |
| Cover stamp peel | `1.85 → 2.25` |
| Travel to work | `2.25 → 3.35` |
| Seven subsequent project stamps | `3.35 → 10.35` |
| Transition to testimonials | `10.7 → 11.8` |
| Testimonials/contact length | Computed from responsive layout and viewport |
| Crumple/return sequence | Computed `s0/s1/u0/u1`; timed stages briefly lock scrolling |

Each project interval dwells, then travels: `floor(p) + smoothstep(clamp((fract(p)-.3)/.5))`. The first 30% stays still; travel happens in the middle; it rests again at the end. This gives users time to see/click a stamp instead of making the row glide at an unchanging rate.

On the initial scene reveal the camera zoom eases from `.34` to `1` over 2.8 seconds, while a `-.16` radian rotation settles to zero. The postcard comes down from a height contribution up to 900 world units. The scene gradually fades in underneath the loader.

At the end, the sequence returns to the start and resets native scrolling, section state and project-entry times. This is deliberate looping choreography.

## 6. Interaction inventory

| Interaction | Actual implementation |
| --- | --- |
| Loading stamp toss | WAAPI, 1050 ms toss plus 300 ms pause; front/back images change at half-turn; synchronized ellipse shadow |
| Loader exit | Finishes current toss at 2.2× playback speed, then 1300 ms glide; reduced-motion fade is 500 ms |
| Postcard/stamp hover | Height target 14, tilt proportional to hit coordinates, rate-8 damping, paper bow/curl |
| Stamp peel/flip | Cylinder deformation, back print, raised arc and changed shadow |
| Navigation | 5 stamp destinations; sheet unfolds from the trigger, staggered stamp deal, hover wobble and current-section postmark |
| Navigation hover | Lift 8 CSS px, scale 1.08, rotate toward zero; active scale .96 |
| Camera | Click emits developing photos from five archived JPEGs, shutter effect, limited live prints; click photo to hold/read |
| Coffee | Click lowers liquid through sip stages; eventual refill; optional slurp audio |
| Radio | Click toggles the same audio state as the sound pill |
| Cap | Click changes its over/under state; custom timed motion |
| Leaves/petals | Procedural textures, airborne/drop/slide/rest states, support-surface collision, pointer-speed pushes |
| Butterflies | Procedural wings, wing phase, wandering steering, cursor avoidance and height changes |
| Testimonials | Printed cards and client stickers in the scene, hover lift/tilt and readable zoom state |
| Contact stickers | Email copy, social links, resume download; animated copied/saved postmarks |
| Blank logo sticker | Opens positioned DOM email form; public client calls Supabase lead-table REST endpoint |
| Colouring page | Procedural line art, 6 colors, 3 brush sizes, eraser, clear and PNG export; dirty-only texture updates |
| Sound | Web Audio; looping garden audio, optional click effects; gain ramps avoid abrupt cuts |
| Idle hint | Scroll/click/tap hint selected by section and pointer capability; hides on activity |

The archive includes the client-side form implementation. It does **not** include Supabase schema, access rules, mail automation or other backend internals. The preview blocks that external connection. No live form was submitted during inspection.

## 7. Opening a case study: shared-object illusion

`case.js` bridges the WebGL stamp to a DOM letter using a temporary `#fly` element containing front/back canvases. The original stamp hides while this copy travels; the letter iframe exposes `Letter.slot()`, `hideStamp()` and `land()` to coordinate its final placement.

Opening sequence:

1. Preserve native scroll position and push `/work/<id>` into history.
2. Lift the temporary stamp 26 px and partly straighten it: **420 ms**, `cubic-bezier(.3,1.3,.5,1)`.
3. Wait for the letter iframe to load.
4. Slide the letter from `translateY(105vh) rotate(2.5deg)` to rest: **1000 ms**, `cubic-bezier(.16,1,.3,1)`.
5. After 360 ms, send the stamp through a raised intermediate position toward the letter slot: **760 ms**, `cubic-bezier(.45,0,.25,1)`.
6. Land with a small scale compression to `.97`, then release: **180 ms**, ease-out.

In flight the stamp's drop-shadow interpolates offset `2 → 24px`, blur `3 → 29px` and opacity `.28 → .22`; scale gains up to 6%. Motion and shadow describe the same lift. Closing reverses the object handoff with 900/300 ms stamp phases and an 820 ms departing letter.

`popstate` supports browser Back. Direct `/work/<id>` loads the picnic then opens the case. Standalone `.html` pages work independently. The local preview server preserves this route distinction.

## 8. Case-study typography and animation

The standalone letters use shared visual tokens repeated inside their HTML: paper `#fbf7ec`, cream `#f6f0e0`, ink `#141210`, lines `#e4d9c2`, blue `#1d3fa6`, typical content width 960 px, and `cubic-bezier(.4,0,.2,1)`. Product mockups have separate colors for PhonePe, Dayro, LAMAD, Transporter and QuickMart.

Most long letters use IntersectionObserver for section reveals, media playback or lazy loading. The shared `more.js` next-project carousel lays stamps out as absolute objects and applies nonlinear spacing, scale and z-index near the center. Hover eases carousel speed toward zero; seen-project history influences the next-project options. The letters' original inline styles and scripts are fully preserved in `readable/work/*.html`.

Goalkeeper board previews load local HTML views; PhonePe includes a compiled Expo/React demo. Those embedded demos have their own technology stacks. The main picnic's dependency-free renderer should not be confused with the technologies inside a showcased prototype.

## 9. Mobile and accessibility

- Scene portrait mode is based on `width < height * .85`, rather than a single phone-width breakpoint.
- Portrait postcard ratio is roughly `1:1.42`; landscape ratio is `1.5:1`. Sizing has viewport-dependent clamps.
- Mobile uses tall intro/loop MP4s, different postcard layouts, closer section spacing and a stacked testimonial/contact layout.
- DOM navigation at width ≤600 px changes from five columns to three and shrinks the stamps.
- Device pixel ratio is capped at 2; shadow/canopy buffers use lower resolution; texture quality is independently controlled.
- Small mobile viewport-height changes are filtered to avoid relayout churn from browser chrome or the keyboard.
- Semantic text and contact links sit in a visually hidden `.copy`; focusing a link reveals this content in an accessible card.
- Keyboard focus styles, button labels, pressed states and the letter iframe title are present.
- Reduced-motion branches disable multiple CSS animations and transitions, simplify loader behavior, and alter selected effects. They do not necessarily disable every WebGL movement; this is a limitation to review before reuse.
- No-WebGL fallback exposes the text content, while hiding canvas-dependent controls.

## 10. Implementation order for future reuse

1. Start from the captured runnable version and keep the script order intact.
2. Identify the subsystem needed: DOM stamp interaction, paper deformation, cloth, prop shading or full scene.
3. Preserve the common light direction, coordinate transforms and shadow passes when moving a scene effect. Copying only the fragment shader will lose much of the result.
4. Replace content and media through the project lists in `picnic.js` and generated artwork in `print.js`.
5. Adjust choreography and responsive layouts together; scroll distances depend on viewport height and object sizes.
6. Replace or remove the original lead endpoint before enabling form submission in another application.
7. Profile on real mobile GPUs. Headless software rendering verifies rendering paths but does not establish production frame rate or battery cost.

## 11. Evidence and limits

`evidence/manifest.json` records downloaded URL/status/path/size/hash. It includes heuristic crawler misses: some regex matches are strings from the compiled Expo bundle, not actual site requests; their 404s do not imply the live website is broken. The live desktop run recorded 63 successful responses, no HTTP errors and no JavaScript errors during its capture.

Desktop screenshots cover the hero, menu and several scroll positions. Their filenames describe intended sampling positions; consult the image itself because smoothed scroll and timed stages can mean a snapshot catches a transition. The live mobile screenshot initially exceeded a 30-second headless screenshot timeout; local mobile verification is recorded separately. The environment uses software WebGL, so do not infer the site's normal performance from capture delays.

Local verification passed for desktop scene initialization, local fonts, navigation, PhonePe letter opening/closing, selected-work rendering, the minimal page, and mobile scene/menu rendering at 390 × 844. The mobile document width matches the viewport. The tested flow produced no JavaScript errors, failed HTTP responses or external requests. See `evidence/local-verification.json`. The initial close check used a fixed delay; the completed check waits for iframe removal and scene readiness.

The archive has 194 original files (about 66 MB), from 201 successful URL fetches; multiple query variants can correspond to one saved file. It is bounded to observed/linked public content. It is not a guarantee that every unlinked URL, late-loaded prototype asset or external product has been discovered. The original authoring repository and backend source remain unavailable in this capture.
