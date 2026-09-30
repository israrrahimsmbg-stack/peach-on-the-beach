# Peach on the Beach — Private Residence, Pampelonne

An ultra-exclusive digital residence portal for an architectural 9-bedroom private estate
in Pampelonne (Ramatuelle / Saint-Tropez). Single-page React 18 + TypeScript + Vite +
Tailwind CSS 3 application.

## Run

```bash
npm install
npm run dev      # dev server with the photo API at /api/photos
npm run build    # type-check + production build
npm run preview  # serve the production build (no photo API in preview)
```

## WhatsApp Concierge Desk

The concierge number is a single configurable constant in `src/config.ts`:

```ts
export const WHATSAPP_NUMBER = "33600000000";
```

Replace the placeholder with the estate's dedicated line — international format,
digits only, no `+` prefix, no spaces (e.g. `"33612345678"`). Every "Concierge Desk"
button and the inquiry handoff link across the site read from this constant.

## Photography store

- Originals live in `public/images/villa/*.jpg`.
- The dev server (see `vite.config.ts`, `configureServer`) serves:
  - `GET /api/photos` — JSON index `{ id, zone, src, caption, updatedAt }[]`,
    backed by `data/photos.json`.
  - `POST /api/photos` — accepts `{ filename, zone, caption, dataUrl }`
    (base64 `image/jpeg` data URL), writes the file to `public/images/villa/`,
    upserts `data/photos.json`, returns the new entry.
  - `GET /images/villa/*.jpg` — binary JPEG with
    `Content-Type: image/jpeg` and `Cache-Control: public, max-age=3600`.
- Client (`src/lib/photoStore.ts`): cache-first fetch of the index; a hand-rolled
  IndexedDB wrapper keeps the last-known index plus cached image blobs for
  offline use; a bundled static fallback (`src/lib/fallbackPhotos.ts`) covers
  static production builds with no API.
- The gallery (in *The Residence*) groups photos by zone, lazy-loads with
  blur-up placeholders, and opens a fullscreen lightbox (Esc / arrow keys,
  zoom 1–3× via buttons or scroll).
- Each zone has a **“Curate photography”** upload for the estate manager —
  JPEGs posted to the API appear in the gallery immediately.

## Private trade document

`docs/ADVISOR_CHARTER.md` is a one-page private charter for travel advisors and
family offices. It is intentionally **not linked** from any public page or nav.

## Tone

Restrained, discreet, architectural. No hyperbole, no marketing clichés —
facts and photography carry the weight.
