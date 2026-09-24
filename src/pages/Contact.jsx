import { useEffect } from "react";
import Placeholder from "../components/Placeholder";
import EnquiryForm from "../components/EnquiryForm";
import { firebaseEnabled } from "../lib/firebase";
import { site as siteDefaults } from "../data/site";
import { useContent } from "../hooks/useContent";
import "./Contact.css";

const EMBED_SRC = "https://tally.so/widgets/embed.js";

function useTally(enabled) {
  useEffect(() => {
    if (!enabled) return;
    const load = () => window.Tally?.loadEmbeds();
    if (window.Tally) { load(); return; }
    let script = document.querySelector(`script[src="${EMBED_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = EMBED_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", load);
    return () => script.removeEventListener("load", load);
  }, [enabled]);
}

export default function Contact() {
  const { data: site } = useContent("site", siteDefaults);
  const connected = site.tallyFormId && site.tallyFormId !== "REPLACE_WITH_TALLY_FORM_ID";
  const useNative = firebaseEnabled;
  useTally(connected && !useNative);

  return (
    <section className="contact section" aria-labelledby="contact-title">
      <div className="container">
        <h1 id="contact-title">Tell me about your business</h1>
        <p className="lede contact__next">
          Send the form and I'll personally reply within 2 working days to book a short call,
          then follow up with a plan for your socials.
        </p>

        <div className="contact__grid">
          <div className="contact__form">
            {useNative ? (
              <EnquiryForm />
            ) : connected ? (
              <iframe
                data-tally-src={`https://tally.so/embed/${site.tallyFormId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
                src={`https://tally.so/embed/${site.tallyFormId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
                title="Enquiry form"
                loading="lazy"
                width="100%"
                height="560"
                frameBorder="0"
              />
            ) : (
              <div className="contact__fallback" role="status">
                <h2>The form is being connected</h2>
                <p>In the meantime, email me your goals and a link to your socials and I'll reply within 2 working days.</p>
                <a className="btn btn--primary" href={`mailto:${site.email}`}>Email Sam</a>
              </div>
            )}
          </div>
          <div className="contact__photo">
            <Placeholder label="Photo of Sam" src={site.contactImage} alt="Portrait of Sam" ratio="4 / 5" />
            <p className="contact__photo-caption">Sam, usually found on a client shoot</p>
          </div>
        </div>

        <div className="contact__direct">
          <p>
            Prefer to write directly? <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <ul className="contact__socials">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
