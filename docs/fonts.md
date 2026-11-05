# Local typography

Headings and navigation use Manrope Variable (normal, weights 200–800). Paragraphs, body text and form fields use Inter Variable (normal, weights 100–900). The original logo assets are images and are unchanged. Colours, source text, URLs and enquiry behavior are preserved.

Latin WOFF2 assets are copied unmodified from @fontsource-variable/manrope@5.3.0 and @fontsource-variable/inter@5.3.0 npm distributions. Both SIL Open Font License texts are included beside the files in public/fonts/. Source archives were retrieved with npm pack outside the project; no font npm dependency is added. The package lockfile still records only the existing site dependencies plus Motion from the paragraph component.

Two same-origin preload links and font-display: swap provide early font loading with immediate system-font fallback. There are no Google Fonts/CDN requests or font-optimisation server requirements. Static export copies the files to out/fonts/. The existing Tailwind font token is updated to the same Inter family, so homepage and inner pages remain consistent. If the font binaries change in future, version their filenames and update both CSS/preload references.

Browser checks confirm both font faces load, headings use Manrope, body paragraphs use Inter, and text remains readable at desktop/mobile widths with no horizontal overflow. Existing paragraph animation and reduced-motion/no-JavaScript fallbacks are also verified with the new fonts.
