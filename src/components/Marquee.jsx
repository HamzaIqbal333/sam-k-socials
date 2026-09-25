import { services } from "../data/site";
import { cn } from "@/lib/utils";

// Full-bleed scrolling strip of what Sam does, sitting right under the hero.
// One clean list for screen readers; the animated, duplicated track is decorative.
export default function Marquee() {
  const items = services.map((s) => s.title);

  const renderSet = (hideOnReducedMotion) => (
    <div className={cn("flex flex-none items-center", hideOnReducedMotion && "motion-reduce:hidden")}>
      {items.map((t, i) => (
        <span
          key={i}
          className="inline-flex flex-none items-center gap-5 whitespace-nowrap px-5 py-4 font-display text-lg font-semibold tracking-tight"
        >
          {t}
          <i className={cn("size-[9px] flex-none rotate-45", i % 4 === 3 ? "bg-secondary" : "bg-primary")} />
        </span>
      ))}
    </div>
  );

  return (
    <div className="group overflow-hidden border-y-2 border-foreground bg-foreground text-background">
      <ul className="sr-only" aria-label="Services">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <div
        aria-hidden="true"
        className={cn(
          "flex w-max animate-[marquee_34s_linear_infinite]",
          "group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]",
          "motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap"
        )}
      >
        {renderSet(false)}
        {renderSet(true)}
      </div>

      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
