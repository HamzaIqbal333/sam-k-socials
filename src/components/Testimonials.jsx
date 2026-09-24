import { testimonials } from "../data/site";
import { useContent } from "../hooks/useContent";
import "./Testimonials.css";

// Plain name + business (no logos): works with any client and is easier to keep honest. Reused on Home and Services.
export default function Testimonials({ title = "Kind words from clients" }) {
  const { data } = useContent("testimonials", { items: testimonials });

  return (
    <section className="section" aria-labelledby="testi-title">
      <div className="container">
        <h2 id="testi-title">{title}</h2>
        <div className="testi__grid">
          {data.items.map((t, i) => (
            <figure className="testi__card" key={i}>
              <blockquote>“{t.quote}”</blockquote>
              <figcaption><strong>{t.name}</strong>, {t.business}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
