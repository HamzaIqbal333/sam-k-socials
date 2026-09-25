import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Placeholder from "../components/Placeholder";
import SocialIcon from "../components/SocialIcon";
import { site as siteDefaults } from "../data/site";
import { useContent } from "../hooks/useContent";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Same "glass card" language the brief asked for, adapted to this site's own bright palette
// (milk/plum/pink/zest/sky) instead of a dark theme — translucent cards + soft colour blur,
// so this page still feels like part of Sam K. Socials, not a bolted-on separate site.
export default function Links() {
  const { data: site } = useContent("site", siteDefaults);

  return (
    <section className="relative overflow-hidden py-[clamp(3rem,8vw,6rem)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-secondary/50 blur-[100px]" />
        <div className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-primary/30 blur-[110px]" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/40 blur-[100px]" />
      </div>

      <div className="mx-auto flex w-full max-w-md flex-col items-center px-6">
        <div className="w-full rounded-3xl border-2 border-foreground bg-card/70 p-8 shadow-xl backdrop-blur-md sm:p-10">
          <div className="mb-5 flex justify-center">
            <Placeholder
              label="Sam"
              src={site.aboutImage}
              alt={site.name}
              ratio="1 / 1"
              className="h-24 w-24 rounded-full border-2 border-foreground"
            />
          </div>

          <div className="text-center">
            <h1 className="text-xl font-bold">{site.name}</h1>
            <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
              Social media management, content and ads. Pick a link below.
            </p>
          </div>

          <nav aria-label="Links" className="mt-8 flex flex-col gap-3.5">
            <Button asChild size="lg" className="h-auto justify-between px-5 py-3.5 text-base">
              <Link to="/contact">
                Let's work together
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  "group flex items-center gap-4 rounded-2xl border-2 border-foreground bg-card/80 px-5 py-3.5 backdrop-blur-md",
                  "transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-secondary hover:shadow-lg"
                )}
              >
                <span className="flex size-9 flex-none items-center justify-center rounded-full bg-muted text-foreground transition-colors group-hover:bg-background">
                  <SocialIcon label={s.label} className="size-[18px]" />
                </span>
                <span className="flex-1 text-sm font-semibold">{s.label}</span>
                <ArrowRight className="size-4 flex-none text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" aria-hidden="true" />
              </a>
            ))}

            <a
              href={`mailto:${site.email}`}
              className={cn(
                "group flex items-center gap-4 rounded-2xl border-2 border-foreground bg-card/80 px-5 py-3.5 backdrop-blur-md",
                "transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-secondary hover:shadow-lg"
              )}
            >
              <span className="flex size-9 flex-none items-center justify-center rounded-full bg-muted text-foreground transition-colors group-hover:bg-background">
                <Mail className="size-[18px]" aria-hidden="true" />
              </span>
              <span className="flex-1 text-sm font-semibold">Email</span>
              <ArrowRight className="size-4 flex-none text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
