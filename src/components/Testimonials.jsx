import { testimonials } from "../data/site";
import { useContent } from "../hooks/useContent";
import { cn } from "@/lib/utils";

// Plain name + business (no logos): works with any client and is easier to keep honest. Reused on Home and Services.
export default function Testimonials({ title = "Kind words from clients" }) {
  const { data } = useContent("testimonials", { items: testimonials });

  return (
    <section className="py-[clamp(4rem,9vw,7.5rem)]" aria-labelledby="testi-title">
      <div className="mx-auto w-full max-w-[1200px] px-[clamp(1.25rem,4vw,3rem)]">
        <h2 id="testi-title">{title}</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 min-[560px]:grid-cols-2 lg:grid-cols-3">
          {data.items.map((t, i) => (
            <figure
              key={i}
              className={cn(
                "m-0 rounded-xl border-2 border-foreground p-8",
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
          ))}
        </div>
      </div>
    </section>
  );
}
