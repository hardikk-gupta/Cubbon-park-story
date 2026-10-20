# A guided tour of the picnic website

This explains the recovered aarya.wtf frontend in ordinary language. The interactive edition is at `/guide/` in the deployed site, or `http://localhost:8000/guide/` when running `python serve.py`. The small experiments in that guide are teaching models, separate from the original renderer. Exact deployed algorithms remain in `readable/` and `shaders/`.

## First: what are we actually looking at?

It is a mixture of **real-time 3D, generated 2D artwork, normal HTML, image files and video**. Those layers cooperate, which is why it is difficult to identify the technique just by looking.

| Visible thing | What it actually is |
| --- | --- |
| Turning postcard | A triangle mesh deformed in 3D by a vertex shader |
| Printing on the postcard | Canvas-generated artwork uploaded as a texture |
| Moving forest/person/handwriting inside the postcard | MP4 frames composited into that texture; poster images provide a fallback |
| Project-stamp illustrations | WebP images combined with generated postmarks, paper and back-side print |
| Long case-study letter | HTML/CSS inside an iframe, animated into view |
| Stamp moving onto that letter | Temporary DOM canvases with matching artwork, animated with the Web Animations API |
| Red woven cloth | Procedural fragment-shader drawing and shading |
| Coffee, camera, radio, cap | Procedurally constructed 3D meshes with materials |
| Falling leaves and flowers | Canvas-painted transparent textures on curved 3D surfaces |
| Butterfly | Generated wing/body textures; separate wing surfaces rotate in 3D |
| Moving tree shade | A procedural canopy mask sampled by the scene's shaders |
| Menu, buttons and toolbars | DOM elements with CSS transitions, images and a few SVG details |

So the answer to “SVG, PNG or 3D?” depends on the layer. **The turning paper is real-time 3D geometry. Its printing is a texture. The full-screen letter is HTML.** There is no prerecorded video of the whole interaction, and the main scene does not use Three.js, GSAP or a physics engine.

## 1. The picture is made in two different workshops

Imagine making a physical postcard. First a printer puts ink onto flat paper. Then you pick up that paper, bend it and hold it under a lamp.

The code does the same thing:

1. `print.js` draws the flat printed design into an offscreen Canvas 2D surface.
2. `Scene.texture()` copies those pixels to the GPU as a **texture**.
3. A **mesh**, made of triangles, supplies the shape of the paper.
4. A **vertex shader** moves the mesh points to bend, peel, turn or crumple it.
5. A **fragment shader** colors the pixels, combining the print with illumination, shadow and sheen.

An offscreen canvas is a work surface, not another visible page. A texture is an image the GPU can sample. A vertex is a corner of a triangle. A shader is a small program run by the GPU. A surface normal is an arrow pointing out of the surface; it tells the lighting code which way that patch faces.

The same flat texture can appear perfectly still, curled, upside down or crumpled because the texture and the shape are separate.

## 2. How the paper actually bends

The ordinary paper mesh is divided into **48 × 8 cells**, giving **768 triangles**. The mesh is denser across the bending direction. A flat rectangle made of only two triangles would not bend smoothly.

Each vertex has a local position along the sheet. The shader maps that flat position onto a circular arc. In descriptive names, its bend calculation is:

```js
angle = startingAngle + curvature * distanceAlongPaper;
x = (sin(angle) - sin(startingAngle)) / curvature;
z = (cos(startingAngle) - cos(angle)) / curvature;
```

This is the shader's mathematical shape, expressed as JavaScript-like pseudocode. When curvature is nearly zero, a separate straight-sheet calculation avoids dividing by zero. Adjacent vertices use the same continuous function, so there are no disconnected pieces.

The normal changes along the arc as well. Consequently the bright area, dark area and sheen move with the bend. Merely distorting a flat image would not automatically produce that relationship.

<div class="lab-slot" data-lab="paper"></div>

### Peeling is a different deformation

For a peel, the code defines a fold direction, fold line and cylinder radius. Vertices before the line stay on the original side. Vertices after it wrap around the cylinder. Past a half-turn, the paper lies back over itself. The back print appears on the exposed reverse face.

This explains why a stamp can roll over itself rather than simply rotate like a solid board. See `paperVertex.glsl` and `picnic.js`'s `Ms()`.

### Crumpling needs more geometry

The crumpling mesh uses **160 × 160 cells: 51,200 triangles**. It maps a square toward a disc and then around a sphere. Different angular regions open at different rates; noise-based facets and crease shading keep it from resembling a perfectly smooth ball. This is a deliberately designed deformation, rather than a general paper-collision simulation.

Leaves and petals use another grid, **14 × 14 cells**, with a quadratic surface for lengthwise curl, crosswise cupping and twist.

## 3. What makes the turning feel soft

Position alone is not enough. The controller coordinates rotation, elevation, bend, highlights and shadows throughout the turn.

At the middle of a flip, the postcard rises in an arc; its height includes `230 * sin(π * progress)`. Its bend reacts to turning speed and hover. Near the end, those changes settle instead of stopping abruptly.

The curvature is driven by a damped spring. With readable names, the recovered update is:

```js
velocity += ((target - curvature) * 130 - velocity * 13) * dt;
curvature += velocity * dt;
```

The first term pulls toward the desired bend. The second removes motion over time. When the target changes quickly, the surface keeps a little momentum and then relaxes. That lag is part of the impression of flexible material.

This is an artistic spring for the sheet's curvature. It is not a full physical model of paper fibers.

## 4. How scrolling becomes a camera movement

The browser still scrolls normally, but the visible scene is a fixed canvas. A tall `#track` supplies the scroll distance. The controller reads `scrollY / innerHeight` and interprets it as progress through a storyboard.

At the start, progress turns the postcard. Later it peels a stamp and moves the camera horizontally past the work row. Later still the camera travels down the testimonials and contact sheet. Your wheel moves vertically; the virtual camera is free to move in another direction.

Raw input is smoothed:

```js
const dt = Math.min((now - previous) / 1000, 0.05);
current += (target - current) * (1 - Math.exp(-7 * dt));
```

`target` is what the input requests. `current` is what the camera has reached. The closer it gets, the smaller each correction becomes. The `dt` term accounts for elapsed time, so it is less dependent on refresh rate than “move 10% every frame.”

<div class="lab-slot" data-lab="motion"></div>

`requestAnimationFrame` schedules the main scene update near the browser's next paint. It does not guarantee 60 or 120 fps: expensive shaders can still exceed a device's budget. The site's smoothness comes from the motion design plus rendering choices, not from the scheduler alone.

The project row also has **dwell time**. Within each project interval, the camera rests initially, moves through the middle portion, then rests again. It gives you time to see and click the stamps.

## 5. The page-opening transition is a carefully timed handoff

There are two distinct paper-like effects: the 3D postcard turning in the picnic and the HTML case-study letter arriving over it.

When a project opens, `case.js` does this:

1. Obtain the selected stamp's print and screen rectangle from `Picnic.art()` and `Picnic.rect()`.
2. Create `#fly`, a temporary DOM object containing canvases of the front and back artwork.
3. Hide the original scene stamp. The copy starts at the same place, size and angle, so the substitution is hard to see.
4. Lift that copy about 26 CSS pixels and partly straighten it over 420 ms.
5. Load the case-study HTML in an iframe. Wait for it to be ready.
6. Slide the letter upward from `105vh`, removing its initial 2.5-degree rotation, over 1000 ms.
7. Ask `Letter.slot()` where the letter's stamp belongs. Send the flying copy along an elevated path to that position over 760 ms.
8. Compress its scale slightly to `.97` and settle over 180 ms. Reveal the letter's own stamp and remove the flying copy.

The durations overlap; they should not be added as one strictly sequential timeline. Different Bézier curves control the lift, letter entrance, travel and landing.

This is a **shared-object transition**: the artwork stays visually continuous while its renderer changes from WebGL to DOM. Closing coordinates the reverse handoff. Browser history updates to `/work/<project>` without discarding the picnic; the standalone content lives at `/work/<project>.html`.

## 6. The shadows work because they agree with the objects

The most important property is consistency. If a sheet lifts, its shadow separates. If it curls, the shadow silhouette changes. If a leaf lands on the sheet, the sheet receives its shadow. All of this refers to the same geometry and light direction.

### A shared sun

The direction is `normalize(vec3(-.36, -.46, .81))`. Every material uses it. There is slightly cool ambient illumination and warm sunlight. Shading never becomes an unrelated black overlay on one object while its neighbor is lit from another direction.

### Projecting the silhouette

The shadow vertex shader calculates where a point would project along that light:

```glsl
vec2 shadowPosition = worldPosition.xy
                    - light.xy / light.z * worldPosition.z;
```

The visible and shadow passes use the same deformed vertices. Greater height increases displacement. Transparent parts of a leaf texture do not cast a solid rectangular shadow.

<div class="lab-slot" data-lab="shadow"></div>

### Sharp near contact, soft when lifted

The renderer builds two blurred shadow masks: a narrow one and a broad one. Each blur is split into horizontal and vertical passes, with 13 weighted samples per pass.

It approximates the caster's height and blends between those masks according to the separation from the receiving surface. This is why touching edges feel anchored but a raised sheet appears to float. The receiver height matters: the cloth and a postcard lying above it do not receive identical projections.

This custom screen/world-space approximation is convincing and economical. It is not ray tracing or a guarantee of physically exact shadows for all geometry.

### Tree shadows are another system

`canopy.glsl` constructs branch/leaf silhouettes mathematically. Several slow sine waves bend them by different amounts. The shadow field is sampled by the cloth, paper and solid props using consistent light-space positions.

Two edge variants let higher surfaces receive a crisper pattern. The `dapple` parameter can weaken tree shade on something lifted for reading. These are deliberate art-direction choices.

### Ordinary controls still use CSS

The menu stamps and pills use warm tinted `drop-shadow` or `box-shadow`. Typically there is a tight layer plus a wider, fainter layer. Hover increases both lift and shadow extent. Those controls do not require the WebGL shadow pipeline.

## 7. Why the cloth looks woven and reacts to your hand

The cloth is not a giant background JPEG. Its fragment shader draws alternating warp/weft crossings, thread profiles and red/cream bands. Noise breaks the uniformity. A precomputed field supplies larger creases, folds and slack; changes in the implied surface normal affect brightness.

Pointer movement contributes up to 12 recent displacement impulses. Each affects a soft region around the pointer. The weave moves, and the calculated wrinkle slope changes the light response. The impulse grows quickly, fades and slightly reverses as it settles. This is a localized visual deformation field, not a full cloth simulator.

This matters because a dark circle following the cursor would suggest an indentation. Here the moving thread coordinates and changing highlights suggest fabric being lightly disturbed.

## 8. Every falling leaf has a small life story

`nature.js` paints leaves into Canvas 2D textures. It includes fig, mango, young and dry variants, plus flower types. Shape, veins, stalks, front/back color and seeded irregularities are drawn in code. These textures are uploaded once and reused on curved surfaces.

An individual leaf stores position, size, height, drift speed, oscillation phase, rotation, curl/cup/twist, age and state.

Its initial fall is designed analytically: downward drift plus sideways sine-wave oscillation, tilt and occasional roll. Different phases and parameters stop the motion from looking synchronized. Later detach/drop states integrate a gravity-like acceleration; the initial descent should not be mistaken for a full aerodynamic simulation.

The states are:

```text
air -> rest on cloth, paper or prop
rest -> slide when pushed
rest -> drop when its supporting surface becomes unstable
slide -> rest, or drop when it moves off an edge
```

To land, the code checks stable support surfaces near the leaf and chooses the highest suitable surface. `Scene.point()` evaluates the same deformation used for rendering. Neighboring surface points yield a normal, so a resting leaf can align to the surface rather than remain horizontal.

The leaf stores its landing coordinates relative to its support. Settling adds a short damped wobble, lasting about .55 seconds. If that support starts turning, the leaf can detach and fall instead of sticking impossibly to it.

Move the pointer quickly near a resting leaf and it receives a push. Sliding velocity and spin decay. Leaves are capped at four on smaller viewports or six on larger ones; scheduled spawn opportunities are about 7–13 seconds apart after the initial opportunity. This creates occasional environmental activity rather than a continuous particle shower.

Their shadows come from the shared renderer. There is no separate animation trying to keep a shadow PNG under each leaf.

## 9. The butterfly really lands and takes off

`butterflies.js` draws wing patterns with Canvas paths, gradients, veins and spots. The recovered configuration maintains **one active butterfly when enabled**. It combines a body surface with separate left and right wing surfaces.

The wings rotate in opposite directions around the body. Their positions also change with the flap angle, keeping the hinges together. This is a small articulated 3D object built from textured surfaces, not a GIF.

Its behavior has two main states:

- **Fly:** steer toward a target while adding sideways oscillation, wing flaps and height bobbing. Smoothly rotate toward the direction of travel. Occasionally choose a stable object as a landing target.
- **Sit:** attach to that surface, move with it and slowly open/close the wings. Leave after a short rest, when the support moves, or when a moving pointer comes close.

Targets typically last 3–7 seconds; resting intervals are 4–10 seconds. Cursor avoidance operates within roughly 110 screen pixels, scaled on small viewports. Approach speed and height fall as it nears a landing point. These conditional behaviors are why it appears responsive rather than following a fixed loop.

## 10. The objects around the postcard are interactive too

**Camera.** Clicking plays the optional shutter sound and emits a photo. The photo moves out of the camera, drops toward the cloth and blends from an undeveloped texture to the developed JPEG. Five archived photos supply the images. Clicking a print brings it forward for inspection; scrolling away or releasing lets it return. The controller limits the number of live prints.

**Coffee.** Clicking lifts/tilts the cup through a sip animation and changes the liquid level through stored stages. The liquid surface and side geometry are transformed; ice follows the remaining level. After the last stage, the next action refills it. This is stateful geometry animation, not fluid simulation. The glass uses opacity, reflection and Fresnel; a caustic artwork adds a patch of gathered light under it.

**Radio.** Clicking toggles ambience. A wheel and needle ease toward the playing/resting state. The sound pill controls the same state, so the two interfaces stay synchronized.

**Cap.** Clicking tips/flips it over a custom pivot. The code computes clearance so it does not simply rotate through the ground. A small exponentially decaying sine gives the final wobble.

**Postcard and project stamps.** Hover lifts and tilts them according to pointer position, and introduces bow/curl. Leaving the target eases those parameters back. Project entry can add a small bounce. Artwork, shadows and surface normals all follow the new pose.

**Testimonials and client stickers.** Generated print becomes scene textures. Hover and read states reuse lift, tilt, enlargement and reduced dapple for readability.

**Navigation stamps.** The sheet grows from an origin near its trigger. The five destination stamps enter with 60 ms-spaced delays, different small resting angles and overshooting curves. Hover straightens and lifts a stamp; active press compresses it. The current section receives a postmark. These are DOM/CSS interactions.

**Contact sheet.** Email copies an address, social stickers open their links, and the résumé sticker opens the PDF. Copied/saved feedback appears as ink stamps. The blank-logo sticker positions an email form near its anchor. The captured frontend calls an external Supabase REST endpoint; our preview/deployment blocks external submissions and does not include its backend internals.

**Colouring page.** Canvas 2D stores brush strokes separately from the line art. Six colors, three brush sizes, erasing, clear and PNG export change that artwork. A dirty flag means the GPU texture updates when painting changes, rather than rebuilding unchanged paint every frame. Pointer capture keeps an active stroke coherent; touch handling distinguishes painting from page scrolling.

**Loading and idle hints.** The loader tosses a two-sided stamp while assets/fonts prepare. Its ellipse shadow shrinks/fades as the stamp rises. Readiness finishes the toss and sends it offscreen while the background fades. Idle scroll/tap hints are shown according to scene position and input capability.

**Sound.** The Web Audio graph mixes looping garden audio and short effects. Volume ramps avoid abrupt cuts. It respects the browser's requirement for a user gesture before audio playback, and stores the sound preference locally.

## 11. What happens during a frame

The main controller follows this dependency order:

```text
time, scroll, pointer and viewport
        -> smoothed camera and interaction states
        -> paper transforms, props, leaves and butterfly
        -> animated tree-shadow field
        -> projected object-shadow mask
        -> narrow and broad shadow blurs
        -> cloth, solid props, textured paper, transparent materials
        -> final pixels on the fixed scene canvas
```

Texture generation mostly happens during loading/resizing or when content changes. Geometry can stay on the GPU while uniforms such as bend, position and time change. Video textures update when a new frame is available and relevant. The controller caps pixel ratio at two, uses lower-resolution shadow buffers, culls selected offscreen objects and caps nature counts.

Mipmaps and anisotropic filtering help tilted print stay readable and reduce shimmer. Transparent meshes draw late with depth writes disabled. These are practical rendering decisions, not just animation decisions.

There is still a cost: the shaders are custom and some are expensive; rebuilding print can be substantial. Software-rendered browser capture was slow. We verified behavior, not a guaranteed production frame rate on every phone.

## 12. Where everything lives

| File | Think of it as | Change this when you want to… |
| --- | --- | --- |
| `picnic.js` | Director | Change scene order, camera, layout, project data or interaction targets |
| `scene.js` | Renderer | Change projection, mesh deformation, shaders or render passes |
| `print.js` | Printing workshop | Change paper, typography, stamp print, postmarks or contact art |
| `paint.js` | Illustration helpers | Change procedural painted artwork and SVG helpers |
| `props.js` | Object workshop | Change coffee, cap, camera, radio and their actions |
| `nature.js` | Falling nature controller | Change leaf/flower art, spawning, landing or pushes |
| `butterflies.js` | Butterfly controller | Change wings, flight, resting and pointer response |
| `colour.js` | Drawing tool | Change line art, brush behavior and export |
| `sound.js` | Sound mixer | Change ambience/effects and gain ramps |
| `case.js` | Letter transition coordinator | Change stamp handoff, iframe animation and history |
| `index.html` | Scene shell and controls | Change loading/menu/toolbar CSS or accessible text |
| `work/*.html` | Actual project letters | Change project content and embedded demonstrations |
| `work/more.js` | Next-project carousel | Change cycling, center emphasis and hover slowdown |

`original/` preserves downloaded files. `readable/` formats the code without restoring the original long variable names. `shaders/` exposes 14 shader sources directly. `local/` is the deployed mirror with local fonts. `evidence/` holds screenshots and verification records. The research folders explain the implementation; they are not all executed by the website.

For exact source landmarks, use [CODE-MAP.md](CODE-MAP.md). For lighting constants, pass details and transition timings, use [BREAKDOWN.md](BREAKDOWN.md). Neither the author's original repository nor unpublished backend code was recovered.

## 13. What to learn from this implementation

The transferable lesson is coordination. Shape, print, light, shadow, timing and response all describe the same object. A convincing paper effect needs more than a curved silhouette; a convincing leaf needs more than a downward path; a convincing transition needs continuity across its old and new locations.

To build a similar experience, start with one printed plane, one light and a matching shadow. Add bend and its normals. Add input damping and a spring. Only then add camera choreography, the DOM handoff and environmental behavior. That sequence lets you see which subsystem creates each part of the illusion.
