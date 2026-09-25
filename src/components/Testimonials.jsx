import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../data/site";
import { useContent } from "../hooks/useContent";
import { cn } from "@/lib/utils";

// Plain name + business (no logos): works with any client and is easier to keep honest. Reused on Home and Services.
// A horizontal scroll-snap carousel — same accessible pattern as the Home services carousel
// and the case-study filmstrip: real prev/next buttons, disabled at the scroll edges.
export default function Testimonials({ title = "Kind words from clients" }) {
  const { data } = useContent("testimonials", { items: testimonials });
  const track = useRef(null);
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
  }, [update, data]);

  const scrollByCard = (dir) => {
    const el = track.current;
    const card = el.querySelector("[data-testi-card]");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const navBtn =
    "grid size-11 flex-none place-items-center rounded-full border-2 border-foreground text-foreground transition-colors hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-30";

  return (
    <section className="py-[clamp(4rem,9vw,7.5rem)]" aria-labelledby="testi-title">
      <div className="mx-auto w-full max-w-[1200px] px-[clamp(1.25rem,4vw,3rem)]">
        <div className="mb-8 flex items-end justify-between gap-4 max-[480px]:flex-col max-[480px]:items-start">
          <h2 id="testi-title" className="m-0">{title}</h2>
          {data.items.length > 1 && (
            <div className="flex flex-none gap-2.5">
              <button type="button" className={navBtn} onClick={() => scrollByCard(-1)} disabled={edge.start} aria-label="Previous testimonial">
                <ChevronLeft className="size-5" strokeWidth={2.4} />
              </button>
              <button type="button" className={navBtn} onClick={() => scrollByCard(1)} disabled={edge.end} aria-label="Next testimonial">
                <ChevronRight className="size-5" strokeWidth={2.4} />
              </button>
            </div>
          )}
        </div>
      </div>

      <ul
        ref={track}
        onScroll={update}
        role="list"
        aria-label="Client testimonials"
        className={cn(
          "flex gap-6 overflow-x-auto px-[clamp(1.25rem,4vw,3rem)] pb-2 pt-1",
          "[scroll-snap-type:x_mandatory] [scroll-padding-inline:clamp(1.25rem,4vw,3rem)]",
          "[scrollbar-width:thin] [scrollbar-color:var(--color-foreground)_var(--color-muted)]",
          "min-[1300px]:px-[calc((100vw-1200px)/2)] min-[1300px]:[scroll-padding-inline:calc((100vw-1200px)/2)]"
        )}
      >
        {data.items.map((t, i) => (
          <li key={i} data-testi-card className="w-[min(85vw,420px)] flex-none snap-start">
            <figure
              className={cn(
                "m-0 h-full rounded-xl border-2 border-foreground p-8",
                i === 1 ? "bg-secondary" : "bg-card"
              )}
            >
              <blockquote className="m-0 mb-5 font-display text-xl font-medium leading-snug">
                “{t.quote}”
              </blockquote>
              <figcaption className="text-sm">
                <strong>{t.name}</strong>, {t.business}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
