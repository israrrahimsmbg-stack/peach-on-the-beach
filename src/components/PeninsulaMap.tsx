import { Clock, Lock } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const DRIVE_TIMES: Array<[string, string]> = [
  ["Pampelonne Beach", "3 min"],
  ["Ramatuelle Village", "7 min"],
  ["Saint-Tropez Port", "10 min"],
];

function Marker({ x, y, label, dx = 10, dy = -8 }: { x: number; y: number; label: string; dx?: number; dy?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={4} fill="#B86B43" />
      <circle cx={x} cy={y} r={8.5} fill="none" stroke="#B86B43" strokeWidth={1} opacity={0.45} />
      <text
        x={x + dx}
        y={y + dy}
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize={10}
        letterSpacing={2}
        fill="#1A2C3D"
      >
        {label}
      </text>
    </g>
  );
}

export default function PeninsulaMap() {
  return (
    <section id="peninsula" className="scroll-mt-20 bg-limestone-deep py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            kicker="Peninsula"
            title="Where the house sits."
            lede="Above Pampelonne bay on the Saint-Tropez peninsula — close to the water, set back in the pines of Ramatuelle."
          />
        </Reveal>

        <div className="mt-14 grid gap-px border border-sand bg-sand lg:grid-cols-[1fr_340px]">
          <Reveal className="bg-limestone p-4 md:p-8">
            <svg
              viewBox="0 0 640 460"
              role="img"
              aria-label="Stylized map of the Saint-Tropez peninsula showing Pampelonne bay, Ramatuelle, Cap Camarat, Saint-Tropez, and the approximate estate location"
              className="h-auto w-full"
            >
              <rect x={0} y={0} width={640} height={460} fill="#F1ECE1" />
              {/* faint depth lines in the sea */}
              <g stroke="#D5CBB9" strokeWidth={1} opacity={0.6} fill="none">
                <path d="M 60 400 C 160 390, 260 410, 360 400" />
                <path d="M 520 120 C 560 160, 580 220, 570 280" />
                <path d="M 80 60 C 160 50, 260 55, 340 48" />
              </g>
              {/* landmass */}
              <path
                d="M 40 60 L 420 60
                   C 500 60, 560 100, 570 170
                   C 575 208, 562 232, 532 248
                   C 502 264, 482 298, 486 340
                   C 489 374, 462 400, 426 394
                   C 392 389, 376 360, 362 330
                   C 342 290, 300 280, 260 300
                   C 220 320, 180 310, 140 320
                   C 100 330, 58 322, 40 300 Z"
                fill="#EFE9DD"
                stroke="#1A2C3D"
                strokeWidth={1.25}
              />
              {/* Pampelonne bay water inset */}
              <path
                d="M 532 248 C 562 232, 575 208, 570 170 L 600 170 L 600 260 L 545 260 Z"
                fill="#E4DCCB"
                opacity={0.7}
              />
              <text x={556} y={300} fontFamily="ui-monospace, Menlo, monospace" fontSize={9} letterSpacing={2} fill="#7D7467" transform="rotate(90 556 300)">
                PAMPELONNE BAY
              </text>

              <Marker x={300} y={150} label="RAMATUELLE" />
              <Marker x={548} y={215} label="PAMPELONNE" dx={-108} dy={-10} />
              <Marker x={452} y={388} label="CAP CAMARAT" dx={-40} dy={22} />
              <Marker x={368} y={342} label="SAINT-TROPEZ" dx={-118} dy={6} />

              {/* approximate estate marker — deliberately non-exact */}
              <g>
                <circle cx={495} cy={150} r={30} fill="none" stroke="#B86B43" strokeWidth={1.25} strokeDasharray="5 4" />
                <circle cx={495} cy={150} r={3.5} fill="#B86B43" />
                <text x={495} y={118} textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize={9} letterSpacing={2} fill="#1A2C3D">
                  ESTATE — LOCATION APPROXIMATE
                </text>
              </g>

              <text x={24} y={440} fontFamily="ui-monospace, Menlo, monospace" fontSize={9} letterSpacing={2} fill="#8C8275">
                STYLIZED GEOGRAPHY — NOT TO SCALE
              </text>
            </svg>
          </Reveal>

          <div className="flex flex-col bg-limestone">
            <div className="border-b border-sand px-6 py-6 md:px-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bronze">
                Drive Times
              </p>
              <ul className="mt-5 space-y-4">
                {DRIVE_TIMES.map(([place, time]) => (
                  <li key={place} className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-3 text-sm font-light text-stone">
                      <Clock strokeWidth={1.25} className="h-4 w-4 text-bronze" />
                      {place}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-navy">
                      {time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-1 flex-col justify-end px-6 py-6 md:px-8">
              <div className="flex items-start gap-3 border border-sand bg-limestone-deep p-4">
                <Lock strokeWidth={1.25} className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
                <p className="text-xs font-light leading-relaxed text-stone">
                  Exact coordinates and gate codes provided following verification
                  and booking confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
