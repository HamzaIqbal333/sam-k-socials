import { Link } from "react-router-dom";
import { nav, site as siteDefaults } from "../data/site";
import { useContent } from "../hooks/useContent";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

const CONTAINER = "mx-auto w-full max-w-[1200px] px-[clamp(1.25rem,4vw,3rem)]";
const LINK = "w-fit text-inherit no-underline hover:text-secondary";

export default function Footer() {
  const { data: site } = useContent("site", siteDefaults);

  return (
    <footer className="bg-foreground pb-8 pt-16 text-background">
      <div className={cn(CONTAINER, "grid grid-cols-1 gap-10 min-[760px]:grid-cols-[1.4fr_1fr_1fr]")}>
        <div>
          <p className="mb-1.5 flex items-center gap-2.5 font-display text-2xl font-extrabold">
            <Logo size={30} className="flex-none" />
            {site.name}
          </p>
          <p className="max-w-[32ch] text-[#d9cdf0]">
            Social media, content and ads that bring in the right enquiries.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className={LINK}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <a href={`mailto:${site.email}`} className={LINK}>
            {site.email}
          </a>
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className={LINK}>
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className={cn(CONTAINER, "mt-12 border-t border-white/15 pt-6 text-sm text-[#b9a9d6]")}>
        © {new Date().getFullYear()} {site.name}
      </div>
    </footer>
  );
}
