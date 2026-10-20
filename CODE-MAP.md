# Source navigation

Line numbers refer to the formatted files under `readable/`; a few landmarks point to the surrounding block rather than the exact declaration. Names such as `hn`, `Re`, and `Ne` are the deployed identifiers; descriptive names below explain their roles without pretending to restore the author's original names.

## Files and ownership

| File / global | Responsibility | Primary entry points |
| --- | --- | --- |
| `index.html` | DOM controls, accessibility text, CSS shadow/transition rules, inline loader | `#load`, `#scene`, `#minimal`, `#nav`, `#sound`, `#case`, `#fly` |
| `paint.js` / `Paint` | Procedural painted landscape, sticker and postmark art | `paint`, `sticker`, `postmark` |
| `print.js` / `Print` | Canvas print factory for all paper surfaces | `frontLive`, `front`, `back`, `coverStamp`, `stamp`, `stampBack`, `testimonial`, `letter`, `paper`, `dieCut`, `stickerSheet`, `navStamp`, `postmark` |
| `colour.js` / `Colour` | Coloring illustration and mutable brush canvas | `lineArt`, `painter`; painter methods `down/move/up`, `set`, `setSize`, `erase`, `clear`, `tick`, `save` |
| `scene.js` / `Scene` | GLSL, meshes, textures, framebuffers, projection and rendering | `create`, `D`, `L`; renderer methods `resize`, `branches`, `texture`, `upload`, `render`, `point`, `toScreen`, `mesh` |
| `nature.js` / `Nature` | Leaves/petals, procedural textures, motion, landing and pointer impulses | `create`, `leaf`, `flower`; instance `step`, `drop` |
| `butterflies.js` / `Butterflies` | Wing drawing, flight state and scene objects | `create`; instance `step`, `flock` |
| `sound.js` / `Garden` | Web Audio graph, looping ambience, sound effects and volume ramps | `set`, `play`, `on` |
| `props.js` / `Props` | Procedural coffee/camera/radio/cap, photo development and interactions | `create`; instance `layout`, `frame`, `pick`, `click`, `setRadio`, `holding`, `release` |
| `picnic.js` / `Picnic` and `picnic` | Main layout and frame controller, scroll stages, hover, gestures, forms, navigation | uppercase API coordinates letters; lowercase API exposes scene/debug helpers |
| `case.js` / `Case` | Letter iframe, shared stamp handoff, browser history and close/next | `open`, `close`, `go`, `has` |
| `work/more.js` | Next-project stamp carousel | inline controller; uses `sessionStorage['picnic-seen']` |
| `work/claude-demo.js` | PRD Loop demonstrations | see formatted source |
| `work/*.html` / `Letter` | Standalone case-study UI, inline demos, postmark and host bridge | `slot`, `hideStamp`, `land`, `toTop` |

## Navigation landmarks

| File | Line | What to read |
| --- | ---: | --- |
| `scene.js` | 1 | Shared light vector, ambient and sun colors, noise |
| `scene.js` | 25 | Cloth-height shader definition |
| `scene.js` | 57 | Procedural canopy-shadow shader |
| `scene.js` | 214 | Paper vertex deformation branches |
| `scene.js` | 283 | Light-space shadow projection |
| `scene.js` | 294 | Paper shadow fragment / alpha silhouette / airborne leaf attenuation |
| `scene.js` | 342 | Mesh material lighting, sky/grass reflection and Fresnel |
| `scene.js` | 390 | Separable blur shader |
| `scene.js` | 403 | Cloth weave, pointer deformation and receiving shadows |
| `scene.js` | 552 | Paper canopy, object occlusion, transmission, gloss and sheen |
| `scene.js` | 583 | WebGL 2 context and program creation |
| `scene.js` | 706 | Grid mesh creation; nearby grid resolutions select deformation fidelity |
| `scene.js` | 776 | Texture uploads, mipmaps and anisotropy |
| `scene.js` | 819 | Framebuffer sizes and precomputed cloth field |
| `scene.js` | 907 | Complete multipass render order |
| `picnic.js` | 1 | Scheduler, easing helpers, content lists, typography and timeline constants |
| `picnic.js` | 368 | Responsive layout, branch positions and native scroll-track height |
| `picnic.js` | 731 | Print textures, live postcard, stamps and sticker-sheet rebuilding |
| `picnic.js` | 955 | Wide/tall video intro and loop sources |
| `picnic.js` | 1004 | Image/print/font loading |
| `picnic.js` | 1168 | Hover lift/tilt/bow damping |
| `picnic.js` | 1178 | Stamp rolling curl setup |
| `picnic.js` | 1249 | Main frame loop; delta clamp, smoothed scroll and timed-stage state |
| `picnic.js` | 1300 | Crumple-stage timing, camera movement and world travel |
| `picnic.js` | 1390 | Spring integration and hero paper surface |
| `picnic.js` | 2040 | Cursor impulses, cloth relaxation, gusts and renderer invocation |
| `picnic.js` | 2240 | Logo-form placement and submission |
| `picnic.js` | 2400 | Navigation stamp construction and section controls |
| `picnic.js` | end | Debug API, audio persistence and event setup |
| `print.js` | 92 | Paper texture generation |
| `print.js` | 236 | Stamp artwork and postmark composite |
| `print.js` | 722 | Postcard reverse layout |
| `print.js` | 1275 | Alpha-based die-cut expansion and rim |
| `print.js` | 1415 | Sticker-sheet artwork and recesses |
| `print.js` | 1522 | Contact icon/sticker construction |
| `props.js` | 1003 | Procedural prop models/textures |
| `props.js` | 1687 | Five photo JPEGs and developing texture pairs |
| `props.js` | 1694 | Prop interaction-state factory |
| `props.js` | 1801 | Per-frame prop state and object/mesh submission |
| `props.js` | 2073 | Camera/radio/coffee/cap click actions |
| `nature.js` | 621 | Spawn setup |
| `nature.js` | 697 | Per-frame air/rest/drop/slide simulation |
| `colour.js` | 684 | Painter state, compositing, input, dirty flag and PNG export |
| `case.js` | 20 | Flying stamp transform + elevation-dependent drop-shadow |
| `case.js` | 87 | Open letter sequence |
| `case.js` | 160 | Close letter sequence |

## Shader files

The extraction script resolves shared GLSL template strings and writes the actual source supplied to WebGL:

- `shared.glsl`: light constants and noise helpers; include fragment, not a standalone shader.
- `fullscreen.glsl`: fullscreen triangle vertex shader.
- `clothHeight.glsl`: precomputed shading/slack/noise field.
- `canopy.glsl`: animated plant/branch occlusion texture.
- `blur.glsl`: weighted horizontal/vertical shadow filter.
- `clothFragment.glsl`: red gingham with thread shading, pointer impulses and shadows.
- `paperVertex.glsl`: bend, curl, crumple, normals and camera projection.
- `paperShadowVertex.glsl`: same deformation, light-plane projection.
- `paperShadowFragment.glsl`: coverage and caster height.
- `paperFragment.glsl`: print, dual-sided normals, canopy, occlusion and sheen.
- `meshVertex.glsl`: solid mesh transforms and camera projection.
- `meshShadowVertex.glsl`: solid mesh light-plane projection.
- `meshShadowFragment.glsl`: material-controlled shadow coverage and height.
- `meshFragment.glsl`: diffuse/specular, reflection, opacity and Fresnel.

## Data flow

```text
native scroll + pointer + time + viewport
                 |
                 v
       picnic.js layout/state/easing
           |                 |
    Print / Colour       Props / Nature / Butterflies
      2D canvases          world geometry + state
           |                 |
           v                 v
          Scene.texture / Scene.upload
                      |
                      v
  canopy pass -> caster masks -> tight + broad blur
                      |
                      v
  cloth -> opaque meshes -> paper -> transparent meshes
                      |
                      v
               fixed WebGL canvas

  click project -> Case -> iframe Letter
                      |
             temporary DOM flying stamp
```

## Useful original console helpers

Available on the picnic after it finishes loading:

```js
picnic.T                         // actual responsive timeline
picnic.jump(.7)                  // jump to flip progress
picnic.jump(picnic.T.trav1 + 1)   // next project position
picnic.jump(picnic.T.sheet)      // near contact sticker sheet
picnic.drop()                    // ask nature system to spawn
picnic.painter()                 // coloring painter state/API
Case.open('phonepe')             // open with original stamp handoff
Case.close()                    // history-aware close
```

`picnic.jump()` expects viewport-height units, not pixels. Some timed stages intentionally hold scrolling; allow animations to settle before taking a screenshot. `Case.open` returns a promise; `Case.close` initiates history/animation work and does not return its completion promise.
