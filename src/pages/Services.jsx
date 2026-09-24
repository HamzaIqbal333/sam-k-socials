import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { services, process } from "../data/site";
import Testimonials from "../components/Testimonials";
import "./Services.css";

const tones = ["pink", "zest", "sky", "milk", "ink"];

export default function Services() {
  const { hash } = useLocation();
  const [open, setOpen] = useState(services[0].id);

  // Deep link: /services#content-sessions opens that card.
  useEffect(() => {
    const id = hash.replace("#", "");
    if (services.some((s) => s.id === id)) {
      setOpen(id);
      requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView({ block: "start" })
      );
    }
  }, [hash]);

  const toggle = (id) => {
    setOpen((cur) => (cur === id ? null : id));
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      <section className="section svc-intro">
        <div className="container svc-intro__grid">
          <h1>Social media help for businesses that would rather be running the business</h1>
          <div>
            <p className="lede">
              Whether you need someone to run your socials week in, week out, a plan you can follow yourself,
              a day of content shot on location, or ads that bring in enquiries, there is a way to work together.
            </p>
            <p>Pick a card below to see what is included. Not sure which fits? Start with a chat.</p>
          </div>
        </div>
      </section>

      <section className="svc-deck-wrap" aria-labelledby="deck-title">
        <div className="container">
          <h2 id="deck-title" className="svc-deck__title">What I can do for you</h2>
          <div className="svc-deck">
            {services.map((s, i) => {
              const isOpen = open === s.id;
              return (
                <article
                  className="svc-card"
                  data-tone={tones[i % tones.length]}
                  data-open={isOpen}
                  id={s.id}
                  key={s.id}
                  style={{ zIndex: i + 1 }}
                >
                  <h3 className="svc-card__head">
                    <button
                      type="button"
                      className="svc-card__btn"
                      id={`${s.id}-btn`}
                      aria-expanded={isOpen}
                      aria-controls={`${s.id}-panel`}
                      onClick={() => toggle(s.id)}
                    >
                      <span className="svc-card__title">{s.title}</span>
                      <span className="svc-card__short">{s.short}</span>
                      <span className="svc-card__icon" aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    className="svc-card__panel"
                    id={`${s.id}-panel`}
                    role="region"
                    aria-labelledby={`${s.id}-btn`}
                  >
                    <div className="svc-card__inner">
                      <div className="svc-card__content" style={isOpen ? undefined : { visibility: "hidden" }}>
                        <p>{s.body}</p>
                        <ul>
                          {s.points.map((p) => <li key={p}>{p}</li>)}
                        </ul>
                        <Link className="btn btn--primary" to="/contact">Let's work together</Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <h2 id="process-title">How working together goes</h2>
          <ol className="svc-process">
            {process.map((p, i) => (
              <li className="svc-process__step" key={p.title}>
                <span className="svc-process__num" aria-hidden="true">{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="section--tint"><Testimonials /></div>
    </>
  );
}
