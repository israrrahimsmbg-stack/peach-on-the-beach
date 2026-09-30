import { useMemo, useState, type FormEvent } from "react";
import { ArrowRight, Check, Phone } from "lucide-react";
import { CONCIERGE_GREETING, ESTATE, whatsappLink } from "../config";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Mode = "guest" | "advisor";

interface Draft {
  fullName: string;
  email: string;
  phone: string;
  arrival: string;
  departure: string;
  party: string;
  notes: string;
  agency: string;
  accreditation: string;
}

const EMPTY: Draft = {
  fullName: "",
  email: "",
  phone: "",
  arrival: "",
  departure: "",
  party: "",
  notes: "",
  agency: "",
  accreditation: "",
};

const STORAGE_KEY = "peach-inquiry";

function nightsBetween(arrival: string, departure: string): number | null {
  if (!arrival || !departure) return null;
  const a = new Date(`${arrival}T12:00:00`);
  const b = new Date(`${departure}T12:00:00`);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function reference(): string {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `POB-${stamp}-${rand}`;
}

const inputCls =
  "w-full border border-sand bg-limestone px-4 py-3 text-sm font-light text-navy placeholder:text-stone-light focus:border-navy focus:outline-none";
const labelCls =
  "mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-stone";

export default function Inquiry() {
  const [mode, setMode] = useState<Mode>("guest");
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [touched, setTouched] = useState(false);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const nights = useMemo(
    () => nightsBetween(draft.arrival, draft.departure),
    [draft.arrival, draft.departure],
  );

  const set = (k: keyof Draft) => (value: string) =>
    setDraft((d) => ({ ...d, [k]: value }));

  const emailOk = /.+@.+\..+/.test(draft.email.trim());
  const datesOk = nights !== null && nights >= ESTATE.minNights;
  const valid =
    draft.fullName.trim().length > 1 &&
    emailOk &&
    draft.phone.trim().length > 3 &&
    datesOk &&
    Number(draft.party) >= 1;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    const ref = reference();
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ref, mode, ...draft, submittedAt: new Date().toISOString() }),
      );
    } catch {
      /* private mode or quota — confirmation still stands */
    }
    setConfirmed(ref);
    window.scrollTo({ top: document.getElementById("inquiry")?.offsetTop ?? 0, behavior: "smooth" });
  };

  const handoffMessage = (ref: string) =>
    `Good day — Concierge Desk. I have requested the private dossier (${ref}) for Peach on the Beach, Pampelonne.\n\nName: ${draft.fullName}\nDates: ${draft.arrival} to ${draft.departure} (${nights} nights)\nParty: ${draft.party}${mode === "advisor" ? `\nAgency / Family Office: ${draft.agency}` : ""}\n\nI would appreciate a confidential conversation.`;

  if (confirmed) {
    return (
      <section id="inquiry" className="scroll-mt-20 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="animate-fade-in border border-sand bg-limestone-deep p-10 text-center md:p-14">
            <span className="mx-auto inline-flex h-12 w-12 items-center justify-center border border-bronze">
              <Check strokeWidth={1.5} className="h-5 w-5 text-bronze" />
            </span>
            <h2 className="mt-6 font-serif text-3xl font-light text-navy md:text-4xl">
              Request received.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-stone">
              Your reference is <span className="font-mono text-xs text-navy">{confirmed}</span>.
              The Concierge Desk will respond with the private dossier and a
              viewing of the calendar — answered directly, nothing automated,
              nothing shared.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={whatsappLink(handoffMessage(confirmed))}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-navy px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-limestone transition-colors hover:bg-bronze"
              >
                <Phone strokeWidth={1.5} className="h-3.5 w-3.5" />
                Continue on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => {
                  setConfirmed(null);
                  setDraft(EMPTY);
                  setTouched(false);
                }}
                className="inline-flex items-center justify-center border border-sand-dark px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-navy transition-colors hover:border-navy"
              >
                New inquiry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="inquiry" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            kicker="Private Dossier & Verification"
            title="Request the private dossier."
            lede="Availability is held privately and released by season. Share your details and the Concierge Desk will respond with the dossier and a private viewing of the calendar — answered by the principal's office, never a queue."
          />
        </Reveal>

        <div className="mt-12 grid gap-px border border-sand bg-sand lg:grid-cols-[1fr_360px]">
          <Reveal className="bg-limestone p-6 md:p-10">
            <div className="flex border border-sand" role="tablist" aria-label="Inquiry type">
              {(
                [
                  ["guest", "Guest Principal"],
                  ["advisor", "Travel Advisor / Family Office"],
                ] as Array<[Mode, string]>
              ).map(([m, label]) => (
                <button
                  key={m}
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => setMode(m)}
                  className={`flex-1 px-4 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                    mode === m ? "bg-navy text-limestone" : "text-stone hover:text-navy"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} className="mt-8" noValidate>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="inq-name" className={labelCls}>Full Name</label>
                  <input
                    id="inq-name"
                    className={inputCls}
                    value={draft.fullName}
                    onChange={(e) => set("fullName")(e.target.value)}
                    placeholder="As on passport"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="inq-email" className={labelCls}>Email</label>
                  <input
                    id="inq-email"
                    type="email"
                    className={inputCls}
                    value={draft.email}
                    onChange={(e) => set("email")(e.target.value)}
                    placeholder="name@example.com"
                    autoComplete="email"
                  />
                  {touched && !emailOk && (
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bronze">
                      A valid email is required.
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="inq-phone" className={labelCls}>WhatsApp / Mobile</label>
                  <input
                    id="inq-phone"
                    type="tel"
                    className={inputCls}
                    value={draft.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                    placeholder="+33 …"
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label htmlFor="inq-party" className={labelCls}>Party Count</label>
                  <input
                    id="inq-party"
                    type="number"
                    min={1}
                    max={18}
                    className={inputCls}
                    value={draft.party}
                    onChange={(e) => set("party")(e.target.value)}
                    placeholder="Adults & children"
                  />
                </div>
                <div>
                  <label htmlFor="inq-arrival" className={labelCls}>Arrival</label>
                  <input
                    id="inq-arrival"
                    type="date"
                    className={inputCls}
                    value={draft.arrival}
                    onChange={(e) => set("arrival")(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="inq-departure" className={labelCls}>Departure</label>
                  <input
                    id="inq-departure"
                    type="date"
                    className={inputCls}
                    value={draft.departure}
                    min={draft.arrival || undefined}
                    onChange={(e) => set("departure")(e.target.value)}
                  />
                </div>
              </div>

              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-light">
                Minimum stay — 7 nights.
                {nights !== null && (
                  <span className={nights >= ESTATE.minNights ? " text-navy" : " text-bronze"}>
                    {" "}Selected: {nights} night{nights === 1 ? "" : "s"}
                    {nights < ESTATE.minNights ? " — below minimum" : ""}
                  </span>
                )}
              </p>
              {touched && !datesOk && (
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bronze">
                  Please select dates of at least 7 nights.
                </p>
              )}

              {mode === "advisor" && (
                <div className="mt-6 grid animate-fade-in gap-6 border-t border-sand pt-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="inq-agency" className={labelCls}>Agency / Family Office</label>
                    <input
                      id="inq-agency"
                      className={inputCls}
                      value={draft.agency}
                      onChange={(e) => set("agency")(e.target.value)}
                      placeholder="Company or office name"
                    />
                  </div>
                  <div>
                    <label htmlFor="inq-accred" className={labelCls}>IATA / CLIA or Accreditation Ref</label>
                    <input
                      id="inq-accred"
                      className={inputCls}
                      value={draft.accreditation}
                      onChange={(e) => set("accreditation")(e.target.value)}
                      placeholder="Reference number"
                    />
                  </div>
                </div>
              )}

              <div className="mt-6">
                <label htmlFor="inq-notes" className={labelCls}>Confidential Notes</label>
                <textarea
                  id="inq-notes"
                  rows={4}
                  className={`${inputCls} resize-none`}
                  value={draft.notes}
                  onChange={(e) => set("notes")(e.target.value)}
                  placeholder="Anything the desk should know — occasions, access needs, discretion requirements."
                />
              </div>

              <button
                type="submit"
                className="mt-8 inline-flex items-center gap-3 bg-navy px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-limestone transition-colors hover:bg-bronze"
              >
                Request the Dossier
                <ArrowRight strokeWidth={1.5} className="h-4 w-4" />
              </button>
              <p className="mt-5 max-w-md text-xs font-light leading-relaxed text-fog">
                Particulars shared here are held in strict confidence and used
                only to arrange your stay. Nothing is shared, sold, or retained
                beyond the inquiry.
              </p>
            </form>
          </Reveal>

          <div className="flex flex-col bg-limestone-deep">
            <div className="border-b border-sand p-6 md:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bronze">
                Concierge Desk
              </p>
              <p className="mt-4 text-sm font-light leading-relaxed text-stone">
                Prefer to write directly? One tap opens a WhatsApp conversation
                with the desk — answered in person, in confidence.
              </p>
              <a
                href={whatsappLink(CONCIERGE_GREETING)}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 border border-navy px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-navy transition-colors hover:bg-navy hover:text-limestone"
              >
                <Phone strokeWidth={1.5} className="h-3.5 w-3.5" />
                WhatsApp the Desk
              </a>
            </div>
            <div className="flex flex-1 flex-col justify-end p-6 md:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-light">
                Verification
              </p>
              <p className="mt-3 text-xs font-light leading-relaxed text-stone">
                Exact coordinates and gate codes provided following verification
                and booking confirmation. Non-disclosure available on request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
