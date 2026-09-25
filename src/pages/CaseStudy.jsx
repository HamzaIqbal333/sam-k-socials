import { Link, useParams } from "react-router-dom";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Placeholder from "../components/Placeholder.jsx";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { clients } from "../data/site.js";
import { useContent } from "../hooks/useContent";

const tiles = [
  { label: "Reel", ratio: "9 / 16", tone: "pink" },
  { label: "Static post", ratio: "1 / 1", tone: "sky" },
  { label: "Story", ratio: "9 / 16", tone: "zest" },
  { label: "Static post", ratio: "4 / 5", tone: "sky" },
  { label: "Reel", ratio: "9 / 16", tone: "sky" },
  { label: "Launch graphic", ratio: "1 / 1", tone: "pink" },
];

// Matches the diagonal-stripe language Placeholder.jsx already uses for its
// own (sky) fallback, just recolored per tile so the filmstrip isn't one flat
// repeated card.
const tonePattern = {
  sky: "",
  pink: "bg-[repeating-linear-gradient(135deg,var(--color-primary)_0px,var(--color-primary)_14px,color-mix(in_srgb,var(--color-primary)_70%,black)_14px,color-mix(in_srgb,var(--color-primary)_70%,black)_28px)]",
  zest: "bg-[repeating-linear-gradient(135deg,var(--color-secondary)_0px,var(--color-secondary)_14px,color-mix(in_srgb,var(--color-secondary)_70%,black)_14px,color-mix(in_srgb,var(--color-secondary)_70%,black)_28px)]",
};

const badgeVariant = (i) => (i % 3 === 1 ? "sky" : i % 3 === 2 ? "pink" : "default");

function Part({ id, title, children, last = false }) {
  return (
    <section
      className={`grid grid-cols-1 gap-4 py-7 md:grid-cols-[5fr_7fr] md:gap-12 md:py-10 ${
        last ? "" : "border-b border-border"
      }`}
      aria-labelledby={id}
    >
      <h2 id={id} className="m-0 font-display text-xl font-extrabold leading-tight sm:text-2xl">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

/* Horizontal drag-to-scroll filmstrip: mouse drag, touch swipe (native),
   arrow keys when focused, and prev/next buttons that work without a mouse. */
function ShowFilmstrip({ items, clientName }) {
  const track = useRef(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0 });
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scrollByTile = (dir) => {
    const el = track.current;
    const tile = el.querySelector("[data-cs-tile]");
    const step = tile ? tile.getBoundingClientRect().width + 18 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onPointerDown = (e) => {
    if (e.pointerType === "touch") return; // native touch scrolling already handles swipe
    const el = track.current;
    drag.current = { active: true, moved: false, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
    el.classList.remove("cursor-grab", "snap-x");
    el.classList.add("cursor-grabbing");
  };
  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const el = track.current;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
    const el = track.current;
    el?.classList.add("cursor-grab", "snap-x");
    el?.classList.remove("cursor-grabbing");
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); scrollByTile(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); scrollByTile(-1); }
  };

  return (
    <div className="mb-12 md:mb-20">
      <div className="mb-4 flex justify-end gap-2.5 px-5 sm:px-8 lg:px-12">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => scrollByTile(-1)}
          disabled={edge.start}
          aria-label="Previous samples"
        >
          <ChevronLeft aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => scrollByTile(1)}
          disabled={edge.end}
          aria-label="Next samples"
        >
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
      <ul
        className="m-0 flex cursor-grab list-none gap-4 overflow-x-auto px-5 pt-6 pb-4 snap-x snap-mandatory scroll-pl-5 [scrollbar-color:var(--color-foreground)_var(--color-muted)] [scrollbar-width:thin] touch-pan-x focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-foreground sm:px-8 lg:px-12 sm:scroll-pl-8 lg:scroll-pl-12"
        ref={track}
        role="list"
        aria-label={`${clientName} work samples, scroll horizontally or use arrow keys`}
        tabIndex={0}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onKeyDown={onKeyDown}
      >
        {items.map((t, i) => (
          <li
            key={i}
            data-cs-tile
            className={`flex-none snap-start ${i % 2 === 1 ? "mt-7" : ""}`}
          >
            <Placeholder
              label={`${clientName} ${t.label.toLowerCase()}`}
              ratio={t.ratio}
              className={`h-[clamp(260px,38vw,440px)] w-auto rounded-xl border-2 border-foreground pointer-events-none ${tonePattern[t.tone]}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const { data } = useContent("clients", { items: clients });
  const items = data.items;
  const idx = items.findIndex((c) => c.slug === slug);

  if (idx === -1) {
    return (
      <div className="mx-auto w-[min(100%-2*clamp(1.25rem,4vw,3rem),1200px)] py-20 md:py-28">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">I can't find that case study</h1>
        <p className="mb-6 max-w-[62ch] text-lg text-muted-foreground">
          The link may be old, or the project isn't part of the portfolio yet.
        </p>
        <Button asChild variant="brand">
          <Link to="/portfolio">Back to portfolio</Link>
        </Button>
      </div>
    );
  }

  const c = items[idx];
  const next = items[(idx + 1) % items.length];
  const gutter = "mx-auto w-[min(100%-2*clamp(1.25rem,4vw,3rem),1200px)]";

  return (
    <>
      <div className={`${gutter} pt-6`}>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 border-b-2 border-transparent font-semibold no-underline hover:border-current"
        >
          <ArrowLeft size={18} strokeWidth={2.5} aria-hidden="true" />
          Back to portfolio
        </Link>
      </div>

      <header className={`${gutter} flex flex-wrap items-end justify-between gap-x-12 gap-y-4 py-8 md:py-14`}>
        <h1 className="m-0 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
          {c.name}
        </h1>
        <dl className="m-0 mb-1.5">
          <dt className="text-sm text-muted-foreground">Industry</dt>
          <dd className="m-0 font-display text-2xl font-bold">{c.industry}</dd>
        </dl>
      </header>

      <div className={`${gutter} mb-6 md:mb-10`}>
        <Placeholder
          label={`${c.name} cover image`}
          src={c.coverImage}
          alt={`${c.name} — ${c.industry}`}
          ratio="21 / 9"
          className="w-full rounded-2xl border-2 border-foreground"
        />
      </div>

      <div className={`${gutter} border-t-2 border-foreground`}>
        <Part id="cs-did" title="What did I do?">
          <ul className="m-0 flex flex-wrap gap-2.5 p-0" role="list">
            {c.did.map((d, i) => (
              <li key={d}>
                <Badge variant={badgeVariant(i)} className="text-sm">{d}</Badge>
              </li>
            ))}
          </ul>
        </Part>

        <Part id="cs-need" title="What did they need?">
          <p className="m-0 max-w-[46ch] text-xl">{c.need}</p>
        </Part>

        <Part id="cs-approach" title="What did I do about it?" last>
          <p className="m-0 max-w-[46ch] text-xl">{c.approach}</p>
        </Part>
      </div>

      <section className="bg-card py-16 md:py-24" aria-labelledby="cs-show">
        <div className={`${gutter} mb-10`}>
          <h2 id="cs-show" className="font-display text-3xl font-extrabold sm:text-4xl">
            What can I show?
          </h2>
          <p className="max-w-[58ch] text-lg text-muted-foreground">{c.show}</p>
        </div>

        <ShowFilmstrip items={tiles} clientName={c.name} />

        <div className={gutter}>
          <div className="grid max-w-[760px] grid-cols-2 gap-4 sm:gap-8 md:gap-12">
            <figure className="m-0">
              <Placeholder
                label={`${c.name} feed before`}
                ratio="3 / 4"
                className="border-2 border-foreground grayscale-[85%]"
              />
              <figcaption className="mt-2.5 font-bold">Feed before</figcaption>
            </figure>
            <figure className="m-0">
              <Placeholder
                label={`${c.name} feed after`}
                ratio="3 / 4"
                className="border-2 border-foreground bg-[repeating-linear-gradient(135deg,var(--color-primary)_0px,var(--color-primary)_14px,color-mix(in_srgb,var(--color-primary)_70%,black)_14px,color-mix(in_srgb,var(--color-primary)_70%,black)_28px)]"
              />
              <figcaption className="mt-2.5 font-bold">Feed after</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-foreground py-16 text-background md:py-24" aria-labelledby="cs-results">
        <div className={gutter}>
          <h2 id="cs-results" className="mb-9 max-w-[20ch] font-display text-3xl font-extrabold sm:text-4xl">
            What results and proof do I have?
          </h2>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-12 gap-y-7 p-0" role="list">
            {c.results.map((r, i) => (
              <li
                key={i}
                className={`border-t-[3px] pt-4 ${
                  i === 0 ? "col-span-full border-accent" : i % 2 === 1 ? "border-primary" : "border-secondary"
                }`}
              >
                <p
                  className={`m-0 max-w-[32ch] font-display font-bold leading-[1.18] ${
                    i === 0 ? "max-w-[22ch] text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"
                  }`}
                >
                  {r}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className={`${gutter} grid grid-cols-1 items-center gap-10 md:grid-cols-[7fr_5fr]`}>
          <div>
            <h2 className="max-w-[14ch] font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
              Want results like these?
            </h2>
            <div className="mt-6 flex flex-wrap gap-3.5">
              <Button asChild variant="brand">
                <Link to="/contact">Let's work together</Link>
              </Button>
            </div>
          </div>
          <Link
            to={`/portfolio/${next.slug}`}
            className="flex flex-col gap-0.5 border-2 border-foreground bg-accent px-7 py-6 text-foreground no-underline transition-transform duration-200 ease-out hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_8px_0_var(--color-foreground)] focus-visible:-translate-x-1 focus-visible:-translate-y-1 focus-visible:shadow-[6px_8px_0_var(--color-foreground)] focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-foreground motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none rounded-2xl"
          >
            <span className="text-sm font-semibold">Next case study</span>
            <span className="font-display text-3xl font-extrabold leading-[1.1]">{next.name}</span>
            <span className="font-medium">{next.industry}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
