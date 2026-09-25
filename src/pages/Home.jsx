import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import Placeholder from "../components/Placeholder";
import Testimonials from "../components/Testimonials";
import Marquee from "../components/Marquee";
import { services, clients, site as siteDefaults } from "../data/site";
import { useContent } from "../hooks/useContent";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CONTAINER = "mx-auto w-full max-w-[1200px] px-[clamp(1.25rem,4vw,3rem)]";
const GUTTER_X = "px-[clamp(1.25rem,4vw,3rem)]";
const SECTION_Y = "py-[clamp(4rem,9vw,7.5rem)]";

// Cycles the same four brand fills the original hand-rolled carousel used.
const SVC_FILL = ["bg-secondary", "bg-accent", "bg-background", "bg-primary"];

function Hero() {
  const { data: site } = useContent("site", siteDefaults);
  return (
    <section
      className="overflow-hidden pt-[clamp(2.5rem,6vw,5rem)] pb-[clamp(4rem,9vw,7.5rem)]"
      aria-labelledby="hero-title"
    >
      <div className={cn(CONTAINER, "grid items-center gap-12 min-[860px]:grid-cols-[1.15fr_0.85fr]")}>
        <div>
          <h1
            id="hero-title"
            className="mb-4 max-w-[14ch] text-[clamp(2.6rem,6.5vw,5.6rem)]"
          >
            Your socials look busy. Why aren't they bringing you enquiries?
          </h1>
          <p className="mb-8 max-w-[46ch] text-xl text-muted-foreground">
            I'm Sam. I help small business owners turn scattered posting into social media that people
            respond to, by finding what your audience actually wants and showing up consistently with it.
          </p>
          <div className="flex flex-wrap gap-3.5 max-[480px]:flex-col">
            <Button asChild variant="outline" size="lg" className="max-[480px]:w-full">
              <Link to="/services">Explore Services</Link>
            </Button>
            <Button asChild size="lg" className="max-[480px]:w-full">
              <Link to="/contact">Let's work together</Link>
            </Button>
          </div>
          <p className="mt-6 inline-flex items-center gap-2.5 text-sm text-muted-foreground">
            <span
              aria-hidden="true"
              className="size-2 flex-none rounded-full bg-[#3ecf6a] shadow-[0_0_0_4px_rgba(62,207,106,0.18)]"
            />
            {site.availability}
          </p>
        </div>

        <div className="relative grid place-items-center py-6 max-[860px]:mx-auto max-[860px]:w-full max-[860px]:max-w-[420px]">
          <div
            aria-hidden="true"
            className="absolute inset-[6%_4%] bg-secondary"
            style={{ borderRadius: "46% 54% 50% 50% / 55% 45% 55% 45%", transform: "rotate(-8deg)" }}
          />
          <div className="relative w-[min(100%,290px)] rotate-3 rounded-[46px] bg-foreground p-[11px] shadow-[10px_12px_0_var(--color-primary)]">
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-5 z-2 h-6 w-[84px] -translate-x-1/2 rounded-full bg-foreground"
            />
            <Placeholder
              label="Hero image: Sam's client feed on iPhone"
              src={site.heroImage}
              alt="Content creator holding a phone with a ring light, filming for social media"
              ratio="9 / 19"
              className="rounded-[36px]"
            />
          </div>

          <p
            role="img"
            aria-label="Notification: new enquiry"
            className={cn(
              "absolute left-[-6%] top-[22%] z-3 flex max-w-[230px] gap-2.5 rounded-md border-2 border-foreground bg-card p-3.5 text-sm leading-snug",
              "animate-[ping-in_0.5s_cubic-bezier(0.2,1.4,0.4,1)_both] motion-reduce:animate-none",
              "max-[860px]:left-0"
            )}
            style={{ animationDelay: "0.7s" }}
          >
            <span aria-hidden="true" className="mt-1 size-3 flex-none rounded-full bg-primary" />
            <span>
              <strong>New enquiry</strong>
              <br />
              &ldquo;Saw your reel, are you taking bookings?&rdquo;
            </span>
          </p>
          <p
            role="img"
            aria-label="Notification: new message"
            className={cn(
              "absolute bottom-[16%] right-[-4%] z-3 flex max-w-[230px] gap-2.5 rounded-md border-2 border-foreground bg-card p-3.5 text-sm leading-snug",
              "animate-[ping-in_0.5s_cubic-bezier(0.2,1.4,0.4,1)_both] motion-reduce:animate-none",
              "max-[860px]:right-0"
            )}
            style={{ animationDelay: "1.5s" }}
          >
            <span aria-hidden="true" className="mt-1 size-3 flex-none rounded-full bg-primary" />
            <span>
              <strong>New message</strong>
              <br />
              &ldquo;Can I get a quote?&rdquo;
            </span>
          </p>
        </div>
      </div>

      <style>{`@keyframes ping-in { from { opacity: 0; transform: translateY(14px) scale(0.85); } to { opacity: 1; transform: none; } }`}</style>
    </section>
  );
}

const DIAGNOSTIC = [
  "Get a clear social media strategy instead of guessing what to post",
  "Capture content that actually looks and sounds like your business",
  "Run ads that bring in real enquiries, not just likes",
  "Stop the daily grind of posting, scheduling and replying to DMs",
  "Build a feed people trust before they've even messaged you",
];

function Diagnostic() {
  return (
    <section className={SECTION_Y} aria-labelledby="diagnostic-title">
      <div className={cn(CONTAINER, "grid gap-10 min-[860px]:grid-cols-[0.9fr_1.1fr] min-[860px]:items-start")}>
        <div>
          <h2 id="diagnostic-title" className="max-w-[16ch]">Do you need to:</h2>
          <p className="max-w-[42ch] text-xl text-muted-foreground">
            A quick check for business owners ready to swap sporadic posting for something that
            actually brings in work.
          </p>
        </div>
        <ul role="list" className="grid gap-4">
          {DIAGNOSTIC.map((item) => (
            <li key={item} className="flex items-start gap-3.5 rounded-xl border-2 border-foreground bg-card p-4">
              <span className="mt-0.5 grid size-6 flex-none place-items-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServicesCarousel() {
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const { data } = useContent("services", { items: services });

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

  const scrollByCard = (dir) => {
    const el = track.current;
    const card = el.querySelector("[data-svc-card]");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const navBtn = "grid size-12 flex-none place-items-center rounded-full border-2 border-foreground text-foreground transition-colors hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-30";

  return (
    <section className={cn("bg-card", SECTION_Y)} aria-labelledby="svc-title">
      <div className={cn(CONTAINER, "mb-8 flex items-end justify-between gap-4 max-[480px]:flex-col max-[480px]:items-start")}>
        <h2 id="svc-title" className="m-0 max-w-[18ch]">
          Ways I can support your business
        </h2>
        <div className="flex flex-none gap-2.5">
          <button type="button" className={navBtn} onClick={() => scrollByCard(-1)} disabled={edge.start} aria-label="Previous services">
            <ChevronLeft className="size-5" strokeWidth={2.4} />
          </button>
          <button type="button" className={navBtn} onClick={() => scrollByCard(1)} disabled={edge.end} aria-label="Next services">
            <ChevronRight className="size-5" strokeWidth={2.4} />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        onScroll={update}
        role="list"
        aria-label="Services"
        className={cn(
          GUTTER_X,
          "flex gap-5 overflow-x-auto pb-6 pt-2",
          "[scroll-snap-type:x_mandatory] [scroll-padding-inline:clamp(1.25rem,4vw,3rem)]",
          "[scrollbar-width:thin] [scrollbar-color:var(--color-foreground)_var(--color-muted)]",
          "min-[1300px]:px-[calc((100vw-1200px)/2)] min-[1300px]:[scroll-padding-inline:calc((100vw-1200px)/2)]"
        )}
      >
        {data.items.map((s, i) => (
          <li
            data-svc-card
            key={s.id}
            className={cn(
              "flex min-h-[300px] w-[min(78vw,320px)] flex-none flex-col rounded-2xl border-2 border-foreground p-7 [scroll-snap-align:start]",
              SVC_FILL[i % 4]
            )}
          >
            <h3 className="text-[1.6rem]">{s.title}</h3>
            <p className="flex-1">{s.short}</p>
            <Link className="w-fit font-bold underline decoration-2 underline-offset-4 hover:decoration-[3px]" to="/services" aria-label={`${s.title}: see details`}>
              See details
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Peek() {
  const { data } = useContent("clients", { items: clients });
  const samples = data.items.slice(0, 3);
  return (
    <section className={SECTION_Y} aria-labelledby="peek-title">
      <div className={cn(CONTAINER, "grid items-center gap-12 min-[860px]:grid-cols-[0.9fr_1.1fr]")}>
        <div>
          <h2 id="peek-title">A peek at my work</h2>
          <p className="mb-8 max-w-[46ch] text-xl text-muted-foreground">
            Reels, stories and feeds I've built for real businesses, and what changed after.
          </p>
          <Button asChild variant="outline">
            <Link to="/portfolio">See the portfolio</Link>
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {samples.map((c, i) => (
            <Placeholder
              key={c.slug}
              label={`Work sample: ${c.name}`}
              src={c.coverImage}
              alt={`${c.name} — ${c.industry}`}
              ratio="3 / 4"
              className={cn("border-2 border-foreground", i === 1 && "translate-y-6")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className={cn("bg-card", SECTION_Y)} aria-labelledby="why-title">
      <div className={cn(CONTAINER, "grid items-start gap-12 min-[860px]:grid-cols-[0.8fr_1.2fr]")}>
        <h2 id="why-title" className="m-0">
          Why work with me
        </h2>
        <div>
          <p className="mb-4 max-w-[46ch] text-xl text-muted-foreground">
            I don't post for the sake of posting. Every caption, reel and campaign starts with one question:
            what would make someone stop scrolling and get in touch?
          </p>
          <p className="mb-6 max-w-[62ch]">
            You'll work with me directly, not an account team. I keep things simple, explain what I'm doing
            in plain language, and tell you honestly when something isn't working.
          </p>
          <Button asChild variant="outline">
            <Link to="/about">Get to know Sam</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Closer() {
  return (
    <section className={cn("bg-foreground text-background", SECTION_Y)} aria-labelledby="cta-title">
      <div className={CONTAINER}>
        <h2 id="cta-title" className="max-w-[16ch] text-[clamp(2.2rem,4.5vw,3.8rem)]">
          Ready to go big on your socials?
        </h2>
        <p className="mb-7 max-w-[44ch] text-xl text-[#d9cdf0]">
          Tell me about your business and where you'd like it to go. I'll reply within two working days.
        </p>
        <Button asChild size="lg">
          <Link to="/contact">Start the conversation</Link>
        </Button>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Diagnostic />
      <ServicesCarousel />
      <Peek />
      <Why />
      <Testimonials />
      <Closer />
    </>
  );
}
