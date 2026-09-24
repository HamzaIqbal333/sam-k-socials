import { Link, useParams } from "react-router-dom";
import Placeholder from "../components/Placeholder.jsx";
import { clients } from "../data/site.js";
import "./CaseStudy.css";

const tiles = [
  { label: "Reel", ratio: "9 / 16", tone: "pink", span: "tall" },
  { label: "Static post", ratio: "1 / 1", tone: "sky" },
  { label: "Story", ratio: "9 / 16", tone: "zest", span: "tall" },
  { label: "Static post", ratio: "4 / 5", tone: "sky" },
  { label: "Reel", ratio: "9 / 16", tone: "sky", span: "tall" },
  { label: "Launch graphic", ratio: "1 / 1", tone: "pink" },
];

function Part({ id, title, children }) {
  return (
    <section className="part" aria-labelledby={id}>
      <h2 id={id} className="part__title">{title}</h2>
      <div className="part__body">{children}</div>
    </section>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const idx = clients.findIndex((c) => c.slug === slug);

  if (idx === -1) {
    return (
      <div className="container section cs-missing">
        <h1>I can't find that case study</h1>
        <p className="lede">The link may be old, or the project isn't part of the portfolio yet.</p>
        <Link to="/portfolio" className="btn btn--primary">Back to portfolio</Link>
      </div>
    );
  }

  const c = clients[idx];
  const next = clients[(idx + 1) % clients.length];

  return (
    <>
      <div className="container cs-top">
        <Link to="/portfolio" className="cs-back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to portfolio
        </Link>
      </div>

      <header className="container cs-head">
        <h1 className="cs-head__name">{c.name}</h1>
        <dl className="cs-head__meta">
          <dt>Industry</dt>
          <dd>{c.industry}</dd>
        </dl>
      </header>

      <div className="container cs-parts">
        <Part id="cs-did" title="What did I do?">
          <ul className="cs-tags">
            {c.did.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </Part>

        <Part id="cs-need" title="What did they need?">
          <p className="cs-copy">{c.need}</p>
        </Part>

        <Part id="cs-approach" title="What did I do about it?">
          <p className="cs-copy">{c.approach}</p>
        </Part>
      </div>

      <section className="section cs-show" aria-labelledby="cs-show">
        <div className="container">
          <h2 id="cs-show" className="cs-show__title">What can I show?</h2>
          <p className="lede">{c.show}</p>

          <ul className="cs-tiles">
            {tiles.map((t, i) => (
              <li key={i} className={`cs-tile cs-tile--${t.tone}`}>
                <Placeholder label={`${c.name} ${t.label.toLowerCase()}`} ratio={t.ratio} />
              </li>
            ))}
          </ul>

          <div className="cs-feed">
            <figure className="cs-feed__item">
              <Placeholder label={`${c.name} feed before`} ratio="3 / 4" />
              <figcaption>Feed before</figcaption>
            </figure>
            <figure className="cs-feed__item cs-feed__item--after">
              <Placeholder label={`${c.name} feed after`} ratio="3 / 4" />
              <figcaption>Feed after</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section section--ink cs-results" aria-labelledby="cs-results">
        <div className="container">
          <h2 id="cs-results" className="cs-results__title">What results and proof do I have?</h2>
          <ul className="cs-results__list">
            {c.results.map((r, i) => (
              <li key={i} className="cs-results__item">
                <p>{r}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section cs-end">
        <div className="container cs-end__grid">
          <div>
            <h2>Want results like these?</h2>
            <div className="btn-row">
              <Link to="/contact" className="btn btn--primary">Let's work together</Link>
            </div>
          </div>
          <Link to={`/portfolio/${next.slug}`} className="cs-next">
            <span className="cs-next__label">Next case study</span>
            <span className="cs-next__name">{next.name}</span>
            <span className="cs-next__ind">{next.industry}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
