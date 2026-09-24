import { Link } from "react-router-dom";
import Placeholder from "../components/Placeholder.jsx";
import { clients } from "../data/site.js";
import "./Portfolio.css";

export default function Portfolio() {
  return (
    <>
      <section className="section portfolio-intro">
        <div className="container">
          <h1 className="portfolio-intro__title">
            A curated look at some of the brands I've worked with across social media, content, ads and strategy.
          </h1>
        </div>
      </section>

      <section className="portfolio-gallery" aria-label="Client case studies">
        <div className="container">
          <ul className="gallery">
            {clients.map((c, i) => (
              <li key={c.slug} className={`gallery__item gallery__item--${i % 4}`}>
                <Link to={`/portfolio/${c.slug}`} className="gcard">
                  <Placeholder
                    label={`${c.name} cover image`}
                    ratio={i % 2 ? "1 / 1" : "4 / 5"}
                    className="gcard__img"
                  />
                  <div className="gcard__body">
                    <div>
                      <h2 className="gcard__name">{c.name}</h2>
                      <p className="gcard__industry">{c.industry}</p>
                      <p className="gcard__did">{c.did.join(", ")}</p>
                    </div>
                    <span className="gcard__cta">
                      View case study
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
