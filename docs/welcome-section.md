# Homepage welcome section

The short placeholder introduction is replaced with the public WordPress homepage's welcome heading, company introduction and Vision/Mission/History text. Content is typed in `data/welcome.ts`. Native expandable panels preserve keyboard and no-JavaScript access, with Vision initially open. A single Get in Touch link uses the confirmed WhatsApp contact.

The original 30-second, 1920 × 1080 video is retained unchanged at `public/videos/company-welcome.mp4` (4,713,813 bytes). `welcome-media-manifest.json` records its source and SHA-256 hash. A lightweight poster is extracted from the same video at two seconds. Playback is user-controlled, muted initially, inline on mobile and loop-enabled. `preload=none` avoids downloading the video until playback is requested. No autoplay is used, including under reduced motion. No WordPress connection is needed to build or view the site.

Desktop uses two columns with the video alongside the content; mobile stacks them. No video crop or invented replacement imagery is used. The hero and the single existing brands section remain.

Validation: static build and 406-route SEO/internal-link audit passed. Browser checks at 1440, 390 and 320 pixels verify original text, expandable content, confirmed WhatsApp destination, responsive layout and no overflow. The 320-pixel check disables JavaScript. Initial video requests are absent; browser playback succeeds with a 30-second duration. Source and local SHA-256 hashes match. Screenshots: `artifacts/nextjs/welcome-desktop.png`, `welcome-mobile.png` and updated homepage screenshots.

The original company's marketing statements are reproduced from its source page and remain subject to the client's editorial review. No source WordPress content/settings or production hosting were modified.
