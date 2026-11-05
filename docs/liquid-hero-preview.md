# Liquid-particle hero trial

Separate preview branch: feat/liquid-hero-preview. This trial adapts the liquid-particle engine from the React Sculpture Hero component supplied by the client (author attribution retained: guglielmogiannattasio.it). It enhances only the existing local marine hero photograph. It does not add the supplied Forma studio demo, remote sculpture images, fonts, navigation, credit links or sample business claims.

## Integration

- Next.js already uses React, TypeScript and Tailwind. No shadcn installation, dependency or lockfile change is necessary: the supplied effect uses React and native WebGL2, not shadcn components. components/ui is the organisation chosen for this UI effect; it is not a runtime requirement.
- components/ui/liquid-sculpture-hero.tsx renders the original static photograph in the server export and progressively enhances it. The engine lives in a separate dynamically imported module, so ineligible devices do not download the GPU engine.
- The supplied demo's multiline strings were malformed; the demo layout is not imported. The engine's flat-background colour keying is replaced with full-image sampling to preserve this photograph's original colours and pixels.
- Existing white logo, hero text, H1, buttons, navigation, layout and gradients are retained. All catalogue content, URLs, canonicals, structured data, noindex staging and static-export configuration remain unchanged.

## Motion and performance

The effect is enabled only on desktops at least 900px wide with a fine pointer/hover, no reduced-motion preference, more than four reported CPU threads, more than 4GB device memory when reported and no Save-Data preference. All other visitors use the original static image. These are conservative capability guards, not device performance measurements.

The particle density is reduced to the engine's minimum setting, approximately 75,000 particles for the current photograph. There is no ambient animation or automatic intro. Drawing stops after the cursor disturbance settles. An observer pauses the effect offscreen, and document visibility pauses it in hidden tabs. Preference/viewport changes destroy the engine and restore the static image when ineligible. Resources, listeners and observers are cleaned up on teardown. A WebGL/shader/context failure keeps the original static image visible. GPU use can still vary between devices; this is an isolated visual experiment, not an approved production change.

## Validation

Run normal project checks/build, start the static preview, then:

```sh
YAYBMT_TEST_URL=http://127.0.0.1:8080 node scripts/check-liquid-hero.mjs
```

This dedicated check uses Chromium's software WebGL backend and emulates eight reported CPU threads to exercise the desktop effect on the constrained test machine. It verifies WebGL initialisation, pointer-driven pixel changes, reduced-motion teardown, mobile/touch/no-JavaScript fallbacks, no-WebGL fallback and native catalogue links. It does not measure real-device frame rates or battery usage. Screenshots are written to artifacts/liquid-hero by default; YAYBMT_LIQUID_SCREENSHOTS overrides that location.

Static build, content/TypeScript/media/catalogue/import checks and the 406-route exported SEO audit passed. The dedicated software-WebGL browser checks passed. Fresh desktop/static/interactive and mobile/no-JavaScript screenshots captured. Existing site browser checks are also run for regressions.
