import { Link } from "react-router-dom";
import Placeholder from "../components/Placeholder.jsx";
import { clients } from "../data/site.js";
import { useContent } from "../hooks/useContent";

// Four alternating card treatments — background, corner shape, and (for the
// two tinted cards) a matching stripe pattern on the image — so the grid
// reads like a hung gallery wall, not a repeated card template.
const treatments = [
  {
    card: "bg-secondary rounded-[1.75rem] rounded-tr-[0.625rem] rounded-bl-[0.625rem]",
    img: "bg-[repeating-linear-gradient(135deg,var(--color-secondary)_0px,var(--color-secondary)_14px,color-mix(in_srgb,var(--color-secondary)_70%,black)_14px,color-mix(in_srgb,var(--color-secondary)_70%,black)_28px)]",
  },
  {
    card: "bg-card rounded-[1.75rem] rounded-tl-[0.625rem] rounded-br-[0.625rem]",
    img: "",
  },
  {
    card: "bg-accent rounded-[1.75rem]",
    img: "",
  },
  {
    card: "bg-primary rounded-[1.75rem] rounded-bl-[0.625rem]",
    img: "bg-[repeating-linear-gradient(135deg,var(--color-primary)_0px,var(--color-primary)_14px,color-mix(in_srgb,var(--color-primary)_70%,black)_14px,color-mix(in_srgb,var(--color-primary)_70%,black)_28px)]",
  },
];

export default function Portfolio() {
  const { data } = useContent("clients", { items: clients });

  return (
    <>
      <section className="pt-12 pb-8 md:pt-16 md:pb-12">
        <div className="mx-auto w-[min(100%-2*clamp(1.25rem,4vw,3rem),1200px)]">
          <h1 className="max-w-[24ch] font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-balance sm:text-5xl lg:text-6xl">
            A curated look at some of the brands I've worked with across social media, content, ads and strategy.
          </h1>
        </div>
      </section>

      <section className="pb-24 md:pb-32" aria-label="Client case studies">
        <div className="mx-auto w-[min(100%-2*clamp(1.25rem,4vw,3rem),1200px)]">
          <ul className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:gap-10" role="list">
            {data.items.map((c, i) => {
              const t = treatments[i % 4];
              return (
                <li
                  key={c.slug}
                  className={i % 2 === 1 ? "md:mt-16 lg:mt-20" : ""}
                >
                  <Link
                    to={`/portfolio/${c.slug}`}
                    className={`group block border-2 border-foreground p-3.5 text-foreground no-underline transition-transform duration-200 ease-out hover:-translate-x-1 hover:-translate-y-1.5 hover:shadow-[8px_10px_0_var(--color-foreground)] focus-visible:-translate-x-1 focus-visible:-translate-y-1.5 focus-visible:shadow-[8px_10px_0_var(--color-foreground)] focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-foreground motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none ${t.card}`}
                  >
                    <Placeholder
                      label={`${c.name} cover image`}
                      src={c.coverImage}
                      alt={`${c.name} — ${c.industry}`}
                      ratio={i % 2 ? "1 / 1" : "4 / 5"}
                      className={`w-full rounded-[1.25rem] border-2 border-foreground ${t.img}`}
                    />
                    <div className="flex flex-col items-start gap-4 px-2 pt-4 pb-1 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <h2 className="mb-1 font-display text-2xl font-extrabold leading-tight sm:text-[2.1rem]">
                          {c.name}
                        </h2>
                        <p className="mb-1.5 font-semibold">{c.industry}</p>
                        <p className="max-w-[32ch] text-sm text-muted-foreground">{c.did.join(", ")}</p>
                      </div>
                      <span className="flex-none border-b-2 border-current pb-0.5 text-sm font-bold">
                        View case study
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
