# Wingspan Travels website

A mobile-first one-page website based on the supplied 23 November 2026 plan. Open `index.html` in a browser, or serve this folder with any static web server.

## Current build

- Phase 4 page structure and responsive styling are in place.
- The enquiry form prepares a WhatsApp message; it does not save enquiries. The Google Sheets workflow belongs to Phase 5.
- The Botpress webchat embed supplied by the owner is included in `index.html`; it loads the widget from Botpress at runtime. This replaces the Chatbase choice named in the PDF plan.
- The four photos extracted from `Travel Photography Portfolio.pdf` are stored as optimized WebP files under `assets/` and used for the hero and service rows.
- The optional business email, landmark, and verified map pin remain unprovided. Google Maps opens an address search instead of asserting an unverified pin.

## Project files

- `index.html` — page content and metadata
- `styles.css` — design tokens, responsive layout, and components
- `app.js` — service preselection and WhatsApp form handoff
- `assets/favicon.svg` — simple ink and gold favicon
- `assets/hero.webp`, `assets/service-flights.webp`, `assets/service-visa.webp`, and `assets/service-tours.webp` — supplied illustrations
- `plan.md` — text extracted from the supplied PDF

The static enquiry form does not store or submit details; the visitor reviews and sends the prepared WhatsApp message themselves. Chat messages are handled by the connected Botpress service.
