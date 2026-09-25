import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, firebaseEnabled } from "../lib/firebase";
import { services } from "../data/site";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function EnquiryForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    if (d.get("website")) return; // honeypot: bots fill this hidden field
    setStatus("sending");
    try {
      await addDoc(collection(db, "enquiries"), {
        name: d.get("name").trim(),
        email: d.get("email").trim(),
        business: d.get("business").trim() || null,
        service: d.get("service") || null,
        social: d.get("social").trim() || null,
        message: d.get("message").trim(),
        createdAt: serverTimestamp(),
      });
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (!firebaseEnabled) return null; // Contact.jsx only renders this once Firebase is configured

  if (status === "sent") {
    return (
      <div role="status" className="rounded-lg border-2 border-foreground bg-secondary p-6 md:p-8">
        <h2 className="text-[1.35rem]">Enquiry sent</h2>
        <p className="mb-0 text-foreground">Thanks for getting in touch. I'll reply within 2 working days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="enq-name">Your name</Label>
        <Input id="enq-name" name="name" required maxLength={120} autoComplete="name" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="enq-email">Email</Label>
        <Input id="enq-email" name="email" type="email" required maxLength={254} autoComplete="email" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="enq-business">Business name</Label>
        <Input id="enq-business" name="business" maxLength={160} autoComplete="organization" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="enq-social">Instagram or website</Label>
        <Input id="enq-social" name="social" maxLength={200} placeholder="@yourbusiness or yoursite.com" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="enq-service">What do you need help with?</Label>
        <Select name="service">
          <SelectTrigger id="enq-service">
            <SelectValue placeholder="Not sure yet" />
          </SelectTrigger>
          <SelectContent>
            {services.map((s) => (
              <SelectItem key={s.id} value={s.title}>{s.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="enq-message">Tell me about your goals</Label>
        <Textarea id="enq-message" name="message" required rows={5} maxLength={4000} />
      </div>

      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px]"
      />

      <Button type="submit" variant="brand" disabled={status === "sending"} className="justify-self-start">
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </Button>

      {status === "error" && (
        <p role="alert" className="mb-0 text-destructive">
          The enquiry didn't send. Check your connection and try again, or email me directly.
        </p>
      )}
    </form>
  );
}
