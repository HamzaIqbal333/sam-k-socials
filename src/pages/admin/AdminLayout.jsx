import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const links = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/site", label: "Site settings" },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/process", label: "Process" },
  { to: "/admin/portfolio", label: "Portfolio" },
  { to: "/admin/testimonials", label: "Testimonials" },
  { to: "/admin/enquiries", label: "Enquiries" },
];

function navLinkClass({ isActive }) {
  return cn(
    "rounded-md px-3.5 py-2.5 text-sm font-semibold no-underline transition-colors",
    isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
  );
}

function navPillClass({ isActive }) {
  return cn(
    "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold no-underline transition-colors",
    isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
  );
}

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const initial = user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="min-h-screen bg-background md:flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:shrink-0 md:flex-col md:border-r-2 md:border-foreground md:bg-card">
        <Link
          to="/admin"
          className="border-b-2 border-foreground px-6 py-5 font-display text-lg font-bold leading-tight text-foreground no-underline"
        >
          Sam K. Socials
          <span className="mt-0.5 block font-sans text-xs font-normal text-muted-foreground">Admin</span>
        </Link>
        <nav aria-label="Admin" className="flex flex-1 flex-col gap-1 p-4">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={navLinkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t-2 border-foreground p-4">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground no-underline hover:text-foreground"
          >
            View live site ↗
          </Link>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between gap-4 border-b-2 border-foreground bg-card px-4 py-3 md:px-8">
          <Link
            to="/admin"
            className="font-display text-base font-bold text-foreground no-underline md:hidden"
          >
            Sam K. Socials — Admin
          </Link>
          <span className="hidden font-display text-lg font-bold text-foreground md:block">
            Dashboard
          </span>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <Avatar className="size-8">
                <AvatarFallback className="text-xs">{initial}</AvatarFallback>
              </Avatar>
              <span className="max-w-[16ch] truncate text-sm text-muted-foreground">{user?.email}</span>
            </div>
            <Button variant="outline" size="sm" onClick={logout} type="button">
              Sign out
            </Button>
          </div>
        </header>

        {/* Mobile nav */}
        <nav
          aria-label="Admin"
          className="flex gap-1 overflow-x-auto border-b-2 border-foreground bg-card px-4 py-2 md:hidden"
        >
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={navPillClass}>
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/"
            className="shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground no-underline"
          >
            View live site ↗
          </Link>
        </nav>

        <main className="flex-1 px-4 py-8 md:px-8 md:py-10">
          <div className="mx-auto w-full max-w-4xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
