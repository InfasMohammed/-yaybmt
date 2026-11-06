# Homepage motion

The former 140px falling/bouncing reveal has been replaced following team feedback. Homepage sections/cards now fade in with 12px movement over 500ms using a smooth deceleration and short stagger. Industry images crossfade; testimonials fade without blur; words do not fly individually. Motion plays once and leaves content visible. Reduced-motion, keyboard focus and no-JavaScript fallbacks remain.

Run npm run test:home-drop to verify actual 12px keyframes, stable layout, once-only entry and fallbacks. The command name is retained for compatibility.
