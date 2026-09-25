import { Link } from "react-router-dom";
import Placeholder from "../components/Placeholder";
import { site as siteDefaults } from "../data/site";
import { useContent } from "../hooks/useContent";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const traits = [
  "You'll always know what's going out, and why",
  "Consistent posting, not bursts and silence",
  "Honest reporting on what's working, and what isn't",
  "You work with me directly, not an account team",
];

export default function About() {
  const { data: site } = useContent("site", siteDefaults);
  return (
    <section
      aria-labelledby="about-title"
      className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-16">
        <div>
          <h1 id="about-title" className="max-w-[16ch]">
            Hi, I'm Sam. I make social feel less like a chore.
          </h1>
          <p className="-mt-1 mb-5 max-w-[42ch] text-[1.05rem] font-bold text-muted-foreground">
            Social media manager and content creator for food, wellness and local-service businesses.
          </p>
          <p className="max-w-[62ch] text-[1.2rem] text-muted-foreground">
            I run social media for small businesses that are great at what they do and too busy to post about it.
          </p>
          <p>
            I started out posting for a friend's café and watched a few honest, well-timed Reels
            fill her tables. Since then I've spent years managing accounts, shooting content on my
            phone and running paid campaigns across food, wellness and local services.
          </p>
          <p>
            With clients, I listen first and talk in plain English, and my ethos is simple: be
            consistent, be honest about what's working, and never post just to fill a gap.
          </p>
          <ul aria-label="What working with Sam is like" className="mt-7 flex max-w-[48ch] flex-wrap gap-2.5">
            {traits.map((t) => (
              <li key={t}>
                <Badge
                  variant="outline"
                  className="rounded-full border-foreground bg-card px-4.5 py-2 text-sm font-semibold text-foreground"
                >
                  {t}
                </Badge>
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <Button asChild variant="brand">
              <Link to="/contact">Start a conversation</Link>
            </Button>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[460px] md:mx-0 md:justify-self-end">
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 translate-x-3.5 translate-y-3.5 rotate-2 rounded-xl bg-secondary"
          />
          <Placeholder
            label="Self-portrait"
            src={site.aboutImage}
            alt="Portrait of Sam"
            ratio="4 / 5"
            className="relative z-10 rounded-xl border-2 border-foreground"
          />
        </div>
      </div>
    </section>
  );
}
