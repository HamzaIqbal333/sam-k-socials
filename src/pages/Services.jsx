import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { services, process } from "../data/site";
import { useContent } from "../hooks/useContent";
import Testimonials from "../components/Testimonials";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Cycling background tones for the card deck. Every tone keeps ink-colored text except
// "ink" itself, which flips to the milk background color so it stays readable.
const tones = ["pink", "zest", "sky", "milk", "ink"];
const toneStyles = {
  pink: "bg-primary text-foreground",
  zest: "bg-secondary text-foreground",
  sky: "bg-accent text-foreground",
  milk: "bg-card text-foreground",
  ink: "bg-foreground text-background",
};

export default function Services() {
  const { hash } = useLocation();
  const { data: servicesData } = useContent("services", { items: services });
  const { data: processData } = useContent("process", { items: process });
  const serviceItems = servicesData.items;
  const processItems = processData.items;
  const [open, setOpen] = useState(serviceItems[0]?.id ?? null);

  // Deep link: /services#content-sessions opens that card.
  useEffect(() => {
    const id = hash.replace("#", "");
    if (serviceItems.some((s) => s.id === id)) {
      setOpen(id);
      requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView({ block: "start" })
      );
    }
  }, [hash, serviceItems]);

  const toggle = (id) => {
    setOpen((cur) => (cur === id ? null : id));
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      <section className="px-5 pb-14 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pt-24">
        <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          <h1 className="max-w-[16ch]">
            Social media help for businesses that would rather be running the business
          </h1>
          <div>
            <p className="max-w-[62ch] text-[1.2rem] text-muted-foreground">
              Whether you need someone to run your socials week in, week out, a plan you can follow yourself,
              a day of content shot on location, or ads that bring in enquiries, there is a way to work together.
            </p>
            <p>Pick a card below to see what is included. Not sure which fits? Start with a chat.</p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:px-12" aria-labelledby="deck-title">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="deck-title" className="mb-6">What I can do for you</h2>
          <div>
            {serviceItems.map((s, i) => {
              const isOpen = open === s.id;
              const tone = tones[i % tones.length];
              return (
                <article
                  id={s.id}
                  key={s.id}
                  style={{ zIndex: i + 1 }}
                  className={cn(
                    "relative -mt-6 scroll-mt-20 rounded-t-xl border-2 border-foreground pb-6 first:mt-0 last:rounded-b-xl last:pb-0",
                    toneStyles[tone]
                  )}
                >
                  <h3 className="m-0">
                    <button
                      type="button"
                      id={`${s.id}-btn`}
                      aria-expanded={isOpen}
                      aria-controls={`${s.id}-panel`}
                      onClick={() => toggle(s.id)}
                      className="group grid w-full cursor-pointer appearance-none grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 rounded-t-xl border-0 bg-transparent px-5 py-6 text-left outline-none sm:px-8 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-current focus-visible:outline-offset-[-8px]"
                    >
                      <span className="font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                        {s.title}
                      </span>
                      <Badge
                        variant="outline"
                        className="col-start-1 justify-self-start border-current bg-current/10 text-current"
                      >
                        {s.kind}
                      </Badge>
                      <span
                        aria-hidden="true"
                        className="relative col-start-2 row-span-2 row-start-1 h-10 w-10 shrink-0 justify-self-end rounded-full border-2 border-current transition-transform duration-200 group-hover:scale-105 group-hover:bg-current/10 group-active:scale-95"
                      >
                        <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                        <span
                          className={cn(
                            "absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-300",
                            isOpen ? "rotate-0" : "rotate-90"
                          )}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`${s.id}-panel`}
                    role="region"
                    aria-labelledby={`${s.id}-btn`}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-[400ms] ease-in-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div
                        className="grid max-w-3xl gap-x-12 gap-y-5 px-5 pb-7 pt-2 sm:grid-cols-[1.2fr_1fr] sm:items-start sm:px-8"
                        style={isOpen ? undefined : { visibility: "hidden" }}
                      >
                        <p className="max-w-[42ch] text-[1.15rem]">{s.body}</p>
                        <ul className="grid gap-2.5">
                          {s.points.map((p) => (
                            <li key={p} className="relative pl-6">
                              <span
                                aria-hidden="true"
                                className="absolute left-0.5 top-1.5 h-3.5 w-2 rotate-45 border-b-2 border-r-2 border-current opacity-60"
                              />
                              {p}
                            </li>
                          ))}
                        </ul>
                        <Button
                          asChild
                          variant="brand"
                          className={cn(
                            "justify-self-start sm:col-span-2",
                            tone === "ink" && "border-background hover:bg-background hover:text-foreground"
                          )}
                        >
                          <Link to="/contact">Let's work together</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28" aria-labelledby="process-title">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="process-title">How working together goes</h2>
          <ol className="mt-8 grid list-none gap-6 p-0 sm:grid-cols-3">
            {processItems.map((p, i) => (
              <li key={p.title} className="border-t-[3px] border-foreground pt-4">
                <span
                  aria-hidden="true"
                  className="mb-2.5 inline-grid h-9 w-9 place-items-center rounded-full bg-secondary font-display text-base font-extrabold"
                >
                  {i + 1}
                </span>
                <h3 className="mb-1.5">{p.title}</h3>
                <p className="m-0 text-muted-foreground">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="bg-card"><Testimonials /></div>
    </>
  );
}
