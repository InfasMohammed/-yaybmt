
## Scroll-reveal redesign

The client-supplied ScrollRevealContentA now presents the existing three industries as numbered points beside a changing image on desktop. Marine, Engineering & Fabrication and Construction retain their existing copy, local 960×640 illustrations and industry anchor IDs. Motion's existing useScroll/useMotionValueEvent APIs select the image at three scroll thresholds, without rerendering for every pixel. No new packages, fake claims or demo images are included. The supplied next/image server optimisation dependency is avoided with plain static img elements.

The sticky 300svh sequence only activates with JavaScript, a viewport wider than 900px and no reduced-motion preference. Mobile/tablet, reduced-motion and no-JavaScript users get ordinary cards with every image and description visible. A live preference/viewport change restores this fallback immediately. Text remains readable in every step; the source demo's low-opacity inactive text is not used. Images preserve their 3:2 proportions and desktop image display stays within original resolution. No continuous floating animation or scroll trapping is introduced.

The homepage browser check verifies all three scroll states, live reduced-motion fallback and normal responsive/no-JavaScript behavior. Screenshots of the scroll layout are recorded in artifacts/industry-scroll/.

Follow-up: removed the original 700px minimum viewport height after client feedback that the scroll sequence was absent on laptop screens. Compact typography allows the pinned layout to fit shorter desktop windows. Copper progress bars now fill through each industry as supplied in the reference; no per-pixel React state updates are required.
