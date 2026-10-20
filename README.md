# Cubbon Park Story — aarya.wtf frontend research

Captured from **https://aarya.wtf/** on **2026-10-20 UTC**.

This folder contains the actual publicly served HTML, JavaScript, GLSL, images, video, audio, fonts and linked portfolio demos. `original/` preserves fetched bytes; `readable/` reformats code; `local/` contains the preview copy with Google Fonts localized. The project is a static custom WebGL/canvas application. Its main scene does not load Three.js, GSAP, React, Lenis or an animation framework.

## Open it locally

```bash
cd Cubbon-park-story
python serve.py --port 8000
```

Open **http://localhost:8000/**. Other entry points:

- `/minimal/` — conventional portfolio.
- `/work/phonepe` — the picnic with the PhonePe letter open, using the original clean-route behavior.
- `/work/phonepe.html` — standalone case study.
- `/work/goalkeeper.html`, `/work/prd-loop.html`, `/work/ride-through-the-valley.html`, `/work/dayro.html`, `/work/lamad.html`, `/work/transporter.html`, `/work/quickmart.html`.

Requires WebGL 2 for the picnic; the original HTML includes a text fallback. The local preview server blocks external fetch/form submissions, so the email lead form cannot send to the author's Supabase backend. Public external links remain links. Linked external products are outside the local archive.

## Vercel deployment

Import this repository with **Root Directory** set to the repository root (leave it empty in Vercel). The checked-in `vercel.json` sets the static output directory to `local/` and disables installation/build steps. The repository root contains research material rather than the site's entry point, so deploying it without this configuration can return `404 NOT_FOUND` at `/`.

The configuration also routes `/work/<project>` to the picnic entry point, while preserving `/work/<project>.html` as a standalone letter and `/minimal/` as a separate page. External fetch/form submissions remain blocked, matching the local preview. No Python server is needed on Vercel.

After changing deployment configuration, use the newly created deployment URL or the project's updated production alias. A previous deployment's unique URL continues to refer to that earlier deployment.

## Where to begin

| Path | Contents |
| --- | --- |
| [BREAKDOWN.md](BREAKDOWN.md) | Lighting, shadows, motion, interactions, routes, responsive behavior and reuse notes |
| [CODE-MAP.md](CODE-MAP.md) | Exact module responsibilities and code entry points |
| `original/` | Unmodified downloaded responses; deployed code, not a recovered Git history |
| `readable/` | Formatted JavaScript and HTML, preserving identifiers and behavior |
| `shaders/` | 14 extracted shader sources, including resolved shared GLSL |
| `local/` | Runnable mirror with local font styles and binaries |
| `evidence/` | Screenshots, URL/hash manifest, network log, browser checks, repository-search results |
| `scripts/` | Collection, localization, shader extraction and browser-inspection scripts |

## What source was recovered

The main page serves ten JavaScript files directly. All ten were downloaded, along with all eight case-study HTML files and their discoverable local dependencies. The source includes original explanatory comments in the shaders and HTML; much of its JavaScript has compacted identifiers. Formatting makes it navigable but cannot restore original variable names, build configuration, unpublished files or history.

Public GitHub repository searches for `"aarya.wtf"`, `aaryashahh`, and `"picnic" "aarya"` returned zero matches. No source-map URLs are advertised in the main ten scripts. **A matching original repository has not been found.** The captured frontend is sufficient to inspect the actual rendering and interaction implementations. Backend implementation, database policies and externally hosted apps were not recovered.

Provenance is in `evidence/manifest.json` (original URL, local path, response size and SHA-256). A successful download does not establish a license to republish the author's code, photos or branding; no repository license was recovered.

## Reproduce collection

```bash
python scripts/collect.py
python scripts/localize.py
node scripts/extract-shaders.cjs
```

The browser scripts use the environment's installed Playwright and `/usr/bin/chromium`. `inspect.cjs` captures the live site; `verify.cjs` checks the local copy. The live inspector trusts the configured proxy CA's specific public-key fingerprint. It does not turn off certificate validation globally. Headless rendering uses SwiftShader and is substantially slower than a hardware GPU.

Local verification passed: desktop scene rendering, all local font loads, menu opening, PhonePe letter opening and closing, selected-work rendering, the minimal page, and mobile rendering at 390 × 844 with no horizontal overflow. The checked flow recorded no JavaScript errors, failed HTTP responses or external requests. This verifies these flows, not every interaction inside every embedded project demo.

See `evidence/local-verification.json` for the results, `evidence/gallery.html` for screenshots, and `techniques.json` for machine-readable lighting/motion/design constants. Live desktop network and JavaScript error observations are in `evidence/network.json` and `evidence/browser-errors.json`.
