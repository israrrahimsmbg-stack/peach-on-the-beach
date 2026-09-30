/**
 * Site-wide configuration.
 *
 * WHATSAPP_NUMBER — the estate's dedicated Concierge Desk line.
 * Replace the placeholder with the real number in international format,
 * digits only, no "+" prefix, no spaces (e.g. "33612345678").
 */
export const WHATSAPP_NUMBER = "971544647936";

export const whatsappLink = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const CONCIERGE_GREETING =
  "Good day. I am writing regarding Peach on the Beach, Pampelonne. I would appreciate a confidential conversation about a stay.";

export const ESTATE = {
  name: "Peach on the Beach",
  location: "Pampelonne Beach · Ramatuelle · Saint-Tropez",
  interiorM2: 550,
  groundsM2: 1595,
  suites: 9,
  tariffFrom: "From €8,000 / week",
  minNights: 7,
} as const;
