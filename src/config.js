/* ════════════════════════════════════════════════════════════════════════
   API base URL.

   The backend origin is injected at build time from the VITE_API_URL
   environment variable (see .env.example). It lives in .env.local — which is
   git-ignored — so the URL is never hardcoded in committed source.

   If VITE_API_URL is unset, requests fall back to relative "/api" paths, which
   are handled by the Vite dev proxy locally, or by a same-origin rewrite if the
   frontend is hosted behind one.
   ════════════════════════════════════════════════════════════════════════ */

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')

export const apiUrl = (path) => `${API_BASE}${path}`
