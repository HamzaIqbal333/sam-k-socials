import { useState } from "react";
import { supabase } from "../lib/supabase";
import { services } from "../data/site";
import "./EnquiryForm.css";

export default function EnquiryForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    if (d.get("website")) return; // honeypot: bots fill this hidden field
    setStatus("sending");
    const { error } = await supabase.from("enquiries").insert({
      name: d.get("name").trim(),
      email: d.get("email").trim(),
      business: d.get("business").trim() || null,
      service: d.get("service") || null,
      message: d.get("message").trim(),
    });
    if (error) { setStatus("error"); return; }
    form.reset();
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="enq__done" role="status">
        <h2>Enquiry sent</h2>
        <p>Thanks for getting in touch. I'll reply within 2 working days.</p>
      </div>
    );
  }

  return (
    <form className="enq" onSubmit={onSubmit}>
      <label>Your name<input name="name" required maxLength={120} autoComplete="name" /></label>
      <label>Email<input name="email" type="email" required maxLength={254} autoComplete="email" /></label>
      <label>Business name<input name="business" maxLength={160} autoComplete="organization" /></label>
      <label>What do you need help with?
        <select name="service" defaultValue="">
          <option value="">Not sure yet</option>
          {services.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
        </select>
      </label>
      <label>Tell me about your goals<textarea name="message" required rows={5} maxLength={4000} /></label>
      <input className="enq__trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn btn--primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
      {status === "error" && (
        <p className="enq__error" role="alert">
          The enquiry didn't send. Check your connection and try again, or email me directly.
        </p>
      )}
    </form>
  );
}
