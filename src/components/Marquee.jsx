import { services } from "../data/site";
import "./Marquee.css";

// Full-bleed scrolling strip of what Sam does, sitting right under the hero.
// One clean list for screen readers; the animated, duplicated track is decorative.
export default function Marquee() {
  const items = services.map((s) => s.title);
  return (
    <div className="marquee">
      <ul className="marquee__sr" aria-label="Services">
        {items.map((t) => <li key={t}>{t}</li>)}
      </ul>
      <div className="marquee__track" aria-hidden="true">
        <div className="marquee__set">
          {items.map((t, i) => (
            <span className="marquee__item" key={i}>
              {t}
              <i className="marquee__mark" />
            </span>
          ))}
        </div>
        <div className="marquee__set">
          {items.map((t, i) => (
            <span className="marquee__item" key={i}>
              {t}
              <i className="marquee__mark" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
