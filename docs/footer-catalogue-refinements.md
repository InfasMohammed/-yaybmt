# Footer and catalogue refinements

The confirmed LinkedIn company URL is stored in data/contacts.ts, linked through a named footer social icon and added to Organization.sameAs. A bottom credit links “Powered by Maneuver” and its white logo to https://maneuver.ae/.

The local Maneuver logo is recovered from the client-supplied Maneuver-SEO-Audit-yaybmt.pdf, first-page image object 155. The PDF RGB layer and soft mask reconstruct the original transparent white logo, resized from 2815×651 to 600×139 PNG. No logo was redrawn or invented. It is displayed at 112px width, with its original proportions, from public/images/maneuver-logo-white.png. This avoids a runtime dependency on Maneuver's website. The official site also exposes a white logo at https://maneuver.ae/images/logo-white.png; the environment's download policy blocked retrieving that file, so the supplied audit asset was used.

Products whose model is absent keep an empty model panel on cards to preserve alignment. The detail heading area and Model reference field are also blank; source data and URLs are unchanged, and no missing-model message or substitute value is inserted. Products with models retain them.

Desktop catalogue and brand archives render Categories as a static expanded filter section, so it cannot be collapsed. The mobile filter drawer retains its native collapsible Categories control. Search, selected chips, counts and the current category selection continue to use the same filter state.
