import { useEffect } from "react";
import Placeholder from "../components/Placeholder";
import EnquiryForm from "../components/EnquiryForm";
import { firebaseEnabled } from "../lib/firebase";
import { site as siteDefaults } from "../data/site";
import { useContent } from "../hooks/useContent";
import { Button } from "../components/ui/button";

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
    <section aria-labelledby="contact-title" className="px-6 py-16 md:px-10 md:py-24 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <h1 id="contact-title" className="max-w-[18ch]">Tell me about your business</h1>
        <p className="mb-10 max-w-[56ch] text-[1.2rem] text-muted-foreground md:mb-14">
          Send the form and I'll personally reply within 2 working days to book a short call,
          then follow up with a plan for your socials.
        </p>

        <div className="grid items-start gap-12 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
          <div className="min-w-0">
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
                className="block min-h-[420px] w-full border-0"
              />
            ) : (
              <div role="status" className="rounded-lg border-2 border-dashed border-foreground bg-card p-6 md:p-10">
                <h2 className="text-[1.35rem]">The form is being connected</h2>
                <p>In the meantime, email me your goals and a link to your socials and I'll reply within 2 working days.</p>
                <Button asChild variant="brand">
                  <a href={`mailto:${site.email}`}>Email Sam</a>
                </Button>
              </div>
            )}
          </div>

          <div className="relative mx-auto w-full max-w-[400px] md:sticky md:top-8 md:mx-0 md:justify-self-end">
            <div aria-hidden="true" className="absolute inset-0 -z-10 -translate-x-3.5 translate-y-3.5 -rotate-2 rounded-xl bg-sky" />
            <Placeholder
              label="Photo of Sam"
              src={site.contactImage}
              alt="Portrait of Sam"
              ratio="4 / 5"
              className="relative z-10 rounded-xl border-2 border-foreground"
            />
            <p className="relative z-10 mb-0 mt-3.5 text-center text-sm text-muted-foreground">
              Sam, usually found on a client shoot
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-baseline gap-x-10 gap-y-3 border-t border-muted pt-6 md:mt-20">
          <p className="mb-0">
            Prefer to write directly?{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold underline decoration-primary decoration-2 underline-offset-4 hover:decoration-foreground"
            >
              {site.email}
            </a>
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline decoration-primary decoration-2 underline-offset-4 hover:decoration-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
