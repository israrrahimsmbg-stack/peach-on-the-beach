export interface Film {
  id: string;
  title: string;
  note: string;
  /** "youtube" renders an embed; "file" renders a <video> from public/videos/. */
  kind: "youtube" | "file";
  src: string;
}

/**
 * Films of the house. Empty until clean, unbranded cuts are supplied —
 * the Films section then shows a quiet "available on request" line.
 *
 * To publish a film, add an entry, e.g.:
 *   { id: "drone-2026", title: "The house from above", note: "Drone, summer 2026",
 *     kind: "youtube", src: "https://www.youtube.com/embed/<id>" },
 * or place an mp4 in public/videos/ and use kind: "file", src: "/videos/<name>.mp4".
 *
 * Do not embed agency-branded marketing films without usage rights and
 * owner approval.
 */
export const FILMS: Film[] = [];
