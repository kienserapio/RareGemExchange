# Case Study Screenshots

Captured from the live build (Vite dev server) at 2× retina via Playwright. Reveal/scroll animations forced visible so full pages render complete. Use these as the visual assets for the external case‑study page.

| File | Shows | Best used for |
|---|---|---|
| `01-home-hero.png` | Home hero — logo, wordmark, CTAs, concierge launcher | Header image / cover |
| `02-home-full.png` | Full home page — hero → certifications → about → standards → endorsements → featured gems → FAQ → coming soon → footer | Full‑page scroll shot |
| `03-collection.png` | `/gems` catalog — search, category & carat filters, card grid | "Collection & filtering" section |
| `04-gem-detail-dark.png` | Gem detail (dark) — hero, spec table, includes, compare, similar, CTA | "Gem detail" feature deep‑dive |
| `05-gem-detail-light.png` | Same page in light reading mode | Light/dark theming showcase (pair with 04) |
| `06-team.png` | `/team` — monogram portrait plates + signatures | People / brand section |
| `07-admin-login.png` | Admin console password gate | Back‑office / operations section |
| `08-concierge-intake.png` | Concierge intake modal — note currency auto‑detected to **PHP (₱)** live via ipapi.co | Chatbot / lead‑capture deep‑dive |
| `09-mobile-home.png` | Full home page at 390px — responsive stack | Responsive design proof |

**Notes**
- The admin *dashboard* itself (stat cards, lead tables, transcript modal) needs the backend running with `ADMIN_PASSWORD` set and seeded data — not captured here. Re‑run with the API live to add it.
- Currency in shot 08 reflects the capture machine's IP (Philippines → PHP). It will show the viewer's local currency in production, or AUD as fallback.
- To re‑capture: start `npm run dev`, then run a Playwright script pointed at `http://localhost:5173` (browser binary already installed as a dev dependency).
