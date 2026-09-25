import { useEffect, useState } from "react";
import { useContent, saveContent } from "../../hooks/useContent";
import { site as siteDefaults } from "../../data/site";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MAX_SOCIALS = 8;

export default function AdminSite() {
  const { data } = useContent("site", siteDefaults);
  const [form, setForm] = useState(data);
  const [status, setStatus] = useState("idle"); // idle | saving | ok | error
  const [error, setError] = useState("");

  // Sync local form state whenever the live doc (or fallback) changes underneath us.
  useEffect(() => {
    setForm(data);
  }, [data]);

  function update(field, value) {
    setStatus("idle");
    setForm((f) => ({ ...f, [field]: value }));
  }

  function updateSocial(index, field, value) {
    setStatus("idle");
    setForm((f) => {
      const socials = [...(f.socials || [])];
      socials[index] = { ...socials[index], [field]: value };
      return { ...f, socials };
    });
  }

  function addSocial() {
    setForm((f) => ({ ...f, socials: [...(f.socials || []), { label: "", href: "" }] }));
  }

  function removeSocial(index) {
    setForm((f) => ({ ...f, socials: (f.socials || []).filter((_, i) => i !== index) }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("saving");
    setError("");
    try {
      await saveContent("site", {
        name: form.name || "",
        email: form.email || "",
        tallyFormId: form.tallyFormId || "",
        availability: form.availability || "",
        heroImage: form.heroImage?.trim() || null,
        aboutImage: form.aboutImage?.trim() || null,
        contactImage: form.contactImage?.trim() || null,
        socials: (form.socials || []).filter((s) => s.label?.trim() || s.href?.trim()),
      });
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err?.message || "Couldn't save. Try again.");
    }
  }

  const socials = form?.socials || [];

  return (
    <div>
      <h1 className="text-3xl font-display font-bold">Site settings</h1>
      <p className="mt-1 text-muted-foreground">Business details shown across the public site.</p>

      <form className="mt-6 grid max-w-2xl gap-6" onSubmit={onSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="site-name">Business name</Label>
          <Input
            id="site-name"
            value={form?.name || ""}
            onChange={(e) => update("name", e.target.value)}
            maxLength={80}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="site-email">Email</Label>
          <Input
            id="site-email"
            type="email"
            value={form?.email || ""}
            onChange={(e) => update("email", e.target.value)}
            maxLength={254}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="site-availability">Availability</Label>
          <Input
            id="site-availability"
            value={form?.availability || ""}
            onChange={(e) => update("availability", e.target.value)}
            maxLength={160}
            placeholder="e.g. Booking new partnerships for next month"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="site-tally">Tally form ID</Label>
          <Input
            id="site-tally"
            value={form?.tallyFormId || ""}
            onChange={(e) => update("tallyFormId", e.target.value)}
            maxLength={120}
            placeholder="tally.so/r/<id>"
          />
          <p className="text-sm text-muted-foreground">
            Optional and now legacy — the Contact page uses its own Firestore-backed enquiry form.
            This is only used as a fallback embed if that isn't available.
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="site-hero-image">Hero image URL (Home page, phone screen)</Label>
          <Input
            id="site-hero-image"
            type="url"
            value={form?.heroImage || ""}
            onChange={(e) => update("heroImage", e.target.value)}
            maxLength={500}
            placeholder="https://..."
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="site-about-image">About page photo URL</Label>
          <Input
            id="site-about-image"
            type="url"
            value={form?.aboutImage || ""}
            onChange={(e) => update("aboutImage", e.target.value)}
            maxLength={500}
            placeholder="https://..."
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="site-contact-image">Contact page photo URL</Label>
          <Input
            id="site-contact-image"
            type="url"
            value={form?.contactImage || ""}
            onChange={(e) => update("contactImage", e.target.value)}
            maxLength={500}
            placeholder="https://..."
          />
          <p className="text-sm text-muted-foreground">
            Paste a direct image link (ending in .jpg/.png, or an Unsplash/CDN URL). Leave blank to
            show a plain placeholder block instead.
          </p>
        </div>

        <div className="grid gap-3">
          <Label>Social links</Label>
          {socials.map((s, i) => (
            <Card key={i}>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor={`social-label-${i}`}>Label</Label>
                  <Input
                    id={`social-label-${i}`}
                    value={s.label || ""}
                    onChange={(e) => updateSocial(i, "label", e.target.value)}
                    maxLength={40}
                    placeholder="Instagram"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`social-href-${i}`}>URL</Label>
                  <Input
                    id={`social-href-${i}`}
                    value={s.href || ""}
                    onChange={(e) => updateSocial(i, "href", e.target.value)}
                    maxLength={300}
                    placeholder="https://instagram.com/yourhandle"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => removeSocial(i)}>
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSocial}
              disabled={socials.length >= MAX_SOCIALS}
            >
              Add social link
            </Button>
          </div>
        </div>

        <div>
          <Button type="submit" disabled={status === "saving"}>
            {status === "saving" ? "Saving…" : "Save changes"}
          </Button>

          {status === "ok" && <p className="mt-2 text-sm text-emerald-700">Saved.</p>}
          {status === "error" && <p className="mt-2 text-sm text-destructive">{error}</p>}
        </div>
      </form>
    </div>
  );
}
