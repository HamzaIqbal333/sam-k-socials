import { Link } from "react-router-dom";
import { nav, site as siteDefaults } from "../data/site";
import { useContent } from "../hooks/useContent";
import "./Footer.css";

export default function Footer() {
  const { data: site } = useContent("site", siteDefaults);
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__brand">{site.name}</p>
          <p className="footer__tag">Social media, content and ads that bring in the right enquiries.</p>
        </div>
        <nav aria-label="Footer">
          {nav.map((n) => <Link key={n.to} to={n.to}>{n.label}</Link>)}
        </nav>
        <div className="footer__contact">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {site.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}
        </div>
      </div>
      <div className="container footer__legal">© {new Date().getFullYear()} {site.name}</div>
    </footer>
  );
}
