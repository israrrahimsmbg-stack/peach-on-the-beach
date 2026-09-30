export interface Select {
  id: string;
  src: string;
  caption: string;
}

/**
 * The curated set — owner-supplied professional photography (Sep 30, 2026),
 * selected by specialist curation. 17 of 20 uploads kept; 3 cut
 * (duplicate façade-day, duplicate indoor dining, third pergola angle) plus
 * 2 earlier keeps retired (quiet salon corner, weakest terrace) to hold the
 * sequence at 15. public/images/villa/boss/.
 * The 82-photo archive remains available via /api/photos for owner use;
 * only these appear on the public site.
 */
const dir = "/images/villa/boss";

export const SELECTS: Select[] = [
  { id: "facade-dusk", src: `${dir}/boss-facade-dusk.jpg`, caption: "The villa at dusk." },
  { id: "facade-day", src: `${dir}/boss-facade-day.jpg`, caption: "The villa, pool and gardens." },
  { id: "sunset-terrace", src: `${dir}/boss-sunset-terrace.jpg`, caption: "Sunset over the bay." },
  { id: "terrace-sailboats", src: `${dir}/boss-terrace-sailboats.jpg`, caption: "Terrace, Pampelonne beyond." },
  { id: "terrace-golden", src: `${dir}/boss-terrace-golden.jpg`, caption: "Terrace at golden hour." },
  { id: "pergola-set", src: `${dir}/boss-pergola-set.jpg`, caption: "Pergola dining, set for twelve." },
  { id: "pergola-side", src: `${dir}/boss-pergola-side.jpg`, caption: "Pergola dining, garden side." },
  { id: "salon-wide", src: `${dir}/boss-salon-wide.jpg`, caption: "The salon." },
  { id: "salon-piano", src: `${dir}/boss-salon-piano.jpg`, caption: "Salon, piano corner." },
  { id: "dining", src: `${dir}/boss-dining.jpg`, caption: "Dining room, terrace beyond." },
  { id: "hallway", src: `${dir}/boss-hallway.jpg`, caption: "The gallery hall." },
  { id: "bedroom-master", src: `${dir}/boss-bedroom-master.jpg`, caption: "Master suite." },
  { id: "bedroom-art", src: `${dir}/boss-bedroom-art.jpg`, caption: "Guest suite." },
  { id: "bedroom-dubai", src: `${dir}/boss-bedroom-dubai.jpg`, caption: "Guest suite." },
  { id: "bedroom-purple", src: `${dir}/boss-bedroom-purple.jpg`, caption: "Guest suite." },
];

export const HERO_SELECT = SELECTS[0];
export const GALLERY_SELECTS = SELECTS.slice(1);
