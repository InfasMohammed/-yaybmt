# Expandable location card

Adapts the user-supplied LocationMap design in components/ui/location-map.tsx for the contact-page map. Uses a copper map icon/pin, subtle decorative grid, expandable map area, address and directions link. The grid is decorative, not a street map. The expanded area uses the existing genuine Google Maps embed and confirmed location/link. No sample coordinates, live-status claim, invented buildings or roads are displayed.

Native details/summary supports touch, keyboard and no-JavaScript expansion. Width is fluid; the existing desktop map/form row remains. Restrained underline/chevron and content-size transitions respect reduced motion. No tilt, bounce or extra dependencies. The project already supports TypeScript, Tailwind and components/ui; dedicated CSS avoids conflicting with prefixed Tailwind utilities.

Checks: static build, SEO audit and four-width contact browser checks including keyboard/no-JavaScript map expansion and unsent WhatsApp draft. Google map tiles depend on external connectivity; the confirmed embed URL is preserved.
