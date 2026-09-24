import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./admin.css";

const links = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/site", label: "Site settings" },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/process", label: "Process" },
  { to: "/admin/portfolio", label: "Portfolio" },
  { to: "/admin/testimonials", label: "Testimonials" },
  { to: "/admin/enquiries", label: "Enquiries" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  return (
    <div className="admin">
      <header className="admin__bar">
        <Link to="/admin" className="admin__brand">Sam K. Socials — Admin</Link>
        <div className="admin__who">
          <span>{user?.email}</span>
          <button className="btn btn--ghost admin__logout" onClick={logout} type="button">Sign out</button>
        </div>
      </header>
      <div className="admin__body">
        <nav className="admin__nav" aria-label="Admin">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}>{l.label}</NavLink>
          ))}
          <Link to="/" className="admin__view-site">View live site ↗</Link>
        </nav>
        <main className="admin__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
