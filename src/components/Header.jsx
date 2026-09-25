import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { nav, site as siteDefaults } from "../data/site";
import { useContent } from "../hooks/useContent";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const CONTAINER = "mx-auto w-full max-w-[1200px] px-[clamp(1.25rem,4vw,3rem)]";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data: site } = useContent("site", siteDefaults);

  return (
    <header id="top" className="sticky top-0 z-50 border-b border-muted bg-background/90 backdrop-blur-md">
      <div className={cn(CONTAINER, "relative flex min-h-[72px] items-center justify-between")}>
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 font-display text-2xl font-extrabold tracking-tight no-underline"
          onClick={() => setOpen(false)}
        >
          <Logo size={32} className="flex-none" />
          {site.name}
        </Link>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="min-[760px]:hidden"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
          {open ? "Close" : "Menu"}
        </Button>

        <nav
          id="main-nav"
          aria-label="Main"
          className={cn(
            "flex-col gap-0 border-b border-muted bg-background px-[clamp(1.25rem,4vw,3rem)] pb-5 pt-2",
            "absolute inset-x-0 top-full",
            "min-[760px]:static min-[760px]:flex min-[760px]:flex-row min-[760px]:gap-8 min-[760px]:border-none min-[760px]:bg-transparent min-[760px]:p-0",
            open ? "flex" : "hidden"
          )}
        >
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "border-b-2 border-transparent py-3.5 text-lg font-medium no-underline hover:border-primary min-[760px]:py-1 min-[760px]:text-sm",
                  isActive && "border-foreground"
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
