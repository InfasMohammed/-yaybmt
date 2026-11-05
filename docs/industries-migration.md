
## Scroll-reveal redesign

The client-supplied ScrollRevealContentA now presents the existing three industries as numbered points beside a changing image on desktop. Marine, Engineering & Fabrication and Construction retain their existing copy, local 960×640 illustrations and industry anchor IDs. Motion's existing useScroll/useMotionValueEvent APIs select the image at three scroll thresholds, without rerendering for every pixel. No new packages, fake claims or demo images are included. The supplied next/image server optimisation dependency is avoided with plain static img elements.

The sticky 240svh sequence only activates with JavaScript, a viewport at least 1000×700px and no reduced-motion preference. Mobile/tablet, short landscape screens, reduced-motion and no-JavaScript users get ordinary cards with every image and description visible. A live preference/viewport change restores this fallback immediately. Text remains readable in every step; the source demo's low-opacity inactive text is not used. Images preserve their 3:2 proportions and desktop image display stays within original resolution. No continuous floating animation or scroll trapping is introduced.

The homepage browser check verifies all three scroll states, live reduced-motion fallback and normal responsive/no-JavaScript behavior. Screenshots of the scroll layout are recorded in artifacts/industry-scroll/.
