import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Placeholder from "../components/Placeholder";
import Testimonials from "../components/Testimonials";
import { services } from "../data/site";
import "./Home.css";

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__text">
          <h1 id="hero-title">Your socials look busy. Why aren't they bringing you enquiries?</h1>
          <p className="lede">
            I'm Sam. I help small business owners turn scattered posting into social media that people
            respond to, by finding what your audience actually wants and showing up consistently with it.
          </p>
          <div className="btn-row">
            <Link className="btn btn--ghost" to="/services">Explore Services</Link>
            <Link className="btn btn--primary" to="/contact">Let's work together</Link>
          </div>
        </div>

        <div className="hero__stage">
          <div className="phone" aria-hidden="false">
            <span className="phone__island" aria-hidden="true" />
            <Placeholder label="Hero image: Sam's client feed on iPhone" ratio="9 / 19" className="phone__screen" />
          </div>
          <p className="ping ping--one" role="img" aria-label="Notification: new enquiry">
            <span className="ping__dot" aria-hidden="true" />
            <span><strong>New enquiry</strong><br />“Saw your reel, are you taking bookings?”</span>
          </p>
          <p className="ping ping--two" role="img" aria-label="Notification: new message">
            <span className="ping__dot" aria-hidden="true" />
            <span><strong>New message</strong><br />“Can I get a quote?”</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function ServicesCarousel() {
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scrollByCard = (dir) => {
    const el = track.current;
    const card = el.querySelector(".svc");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="section section--tint" aria-labelledby="svc-title">
      <div className="container">
        <div className="svc-head">
          <h2 id="svc-title">Ways I can support your business</h2>
          <div className="svc-nav">
            <button type="button" className="svc-nav__btn" onClick={() => scrollByCard(-1)} disabled={edge.start} aria-label="Previous services">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button type="button" className="svc-nav__btn" onClick={() => scrollByCard(1)} disabled={edge.end} aria-label="Next services">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
      <ul className="svc-track" ref={track} onScroll={update} role="list" aria-label="Services">
        {services.map((s, i) => (
          <li className={`svc svc--${i % 4}`} key={s.id}>
            <h3>{s.title}</h3>
            <p>{s.short}</p>
            <Link className="svc__link" to="/services" aria-label={`${s.title}: see details`}>See details</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Peek() {
  return (
    <section className="section" aria-labelledby="peek-title">
      <div className="container peek">
        <div className="peek__copy">
          <h2 id="peek-title">A peek at my work</h2>
          <p className="lede">Reels, stories and feeds I've built for real businesses, and what changed after.</p>
          <Link className="btn btn--ghost" to="/portfolio">See the portfolio</Link>
        </div>
        <div className="peek__tiles">
          <Placeholder label="Work sample 1" ratio="3 / 4" className="peek__tile" />
          <Placeholder label="Work sample 2" ratio="3 / 4" className="peek__tile" />
          <Placeholder label="Work sample 3" ratio="3 / 4" className="peek__tile" />
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="section section--tint" aria-labelledby="why-title">
      <div className="container why">
        <h2 id="why-title">Why work with me</h2>
        <div>
          <p className="lede">
            I don't post for the sake of posting. Every caption, reel and campaign starts with one question:
            what would make someone stop scrolling and get in touch?
          </p>
          <p>
            You'll work with me directly, not an account team. I keep things simple, explain what I'm doing
            in plain language, and tell you honestly when something isn't working.
          </p>
          <Link className="btn btn--ghost" to="/about">Get to know Sam</Link>
        </div>
      </div>
    </section>
  );
}

function Closer() {
  return (
    <section className="section section--ink" aria-labelledby="cta-title">
      <div className="container closer">
        <h2 id="cta-title">Ready to go big on your socials?</h2>
        <p className="lede">Tell me about your business and where you'd like it to go. I'll reply within two working days.</p>
        <Link className="btn btn--primary" to="/contact">Start the conversation</Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesCarousel />
      <Peek />
      <Why />
      <Testimonials />
      <Closer />
    </>
  );
}
