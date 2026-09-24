import { Link } from "react-router-dom";
import Placeholder from "../components/Placeholder";
import { site as siteDefaults } from "../data/site";
import { useContent } from "../hooks/useContent";
import "./About.css";

export default function About() {
  const { data: site } = useContent("site", siteDefaults);
  return (
    <section className="about section" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__text">
          <h1 id="about-title">Hi, I'm Sam. I make social feel less like a chore.</h1>
          <p className="about__role">
            Social media manager and content creator for food, wellness and local-service businesses.
          </p>
          <p className="lede">
            I run social media for small businesses that are great at what they do and too busy to post about it.
          </p>
          <p>
            I started out posting for a friend's café and watched a few honest, well-timed Reels
            fill her tables. Since then I've spent years managing accounts, shooting content on my
            phone and running paid campaigns across food, wellness and local services.
          </p>
          <p>
            With clients, I listen first and talk in plain English, and my ethos is simple: be
            consistent, be honest about what's working, and never post just to fill a gap.
          </p>
          <ul className="about__traits" aria-label="What working with Sam is like">
            <li>You'll always know what's going out, and why</li>
            <li>Consistent posting, not bursts and silence</li>
            <li>Honest reporting on what's working, and what isn't</li>
            <li>You work with me directly, not an account team</li>
          </ul>
          <div className="btn-row about__cta">
            <Link className="btn btn--primary" to="/contact">Start a conversation</Link>
          </div>
        </div>
        <div className="about__photo">
          <Placeholder label="Self-portrait" src={site.aboutImage} alt="Portrait of Sam" ratio="4 / 5" />
        </div>
      </div>
    </section>
  );
}
