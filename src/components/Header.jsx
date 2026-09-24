import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { nav, site } from "../data/site";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo" onClick={() => setOpen(false)}>{site.name}</Link>
        <button className="header__toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
        <nav id="main-nav" className={`header__nav ${open ? "is-open" : ""}`} aria-label="Main">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === "/"} onClick={() => setOpen(false)}>{n.label}</NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
