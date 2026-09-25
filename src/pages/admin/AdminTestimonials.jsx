import { useEffect, useState } from "react";
import { useContent, saveContent } from "../../hooks/useContent";
import { testimonials } from "../../data/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const MAX_TESTIMONIALS = 8;

function emptyTestimonial() {
  return { quote: "", name: "", business: "" };
}

export default function AdminTestimonials() {
  const { data } = useContent("testimonials", { items: testimonials });
  const [items, setItems] = useState(data.items);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // { ok, message }

  useEffect(() => {
    if (!dirty) setItems(data.items);
  }, [data, dirty]);

  function updateTestimonial(i, patch) {
    setDirty(true);
    setItems((prev) => prev.map((t, idx) => (idx === i ? { ...t, ...patch } : t)));
  }

  function addTestimonial() {
    if (items.length >= MAX_TESTIMONIALS) return;
    setDirty(true);
    setItems((prev) => [...prev, emptyTestimonial()]);
  }

  function removeTestimonial(i) {
    setDirty(true);
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const cleaned = items.map((t) => ({
        quote: t.quote.trim(),
        name: t.name.trim(),
        business: t.business.trim(),
      }));
      await saveContent("testimonials", { items: cleaned });
      setDirty(false);
      setStatus({ ok: true, message: "Saved." });
    } catch (err) {
      setStatus({ ok: false, message: err.message || "Couldn't save. Try again." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1>Testimonials</h1>
      <p className="lede">
        Edit the quotes shown on the home and services pages. Capped at {MAX_TESTIMONIALS} testimonials.
      </p>

      <form className="grid gap-6 max-w-2xl" onSubmit={handleSave}>
        {items.map((t, i) => (
          <Card key={i}>
            <CardHeader>
              <h2 className="font-display text-lg font-bold">{t.name || `Testimonial ${i + 1}`}</h2>
            </CardHeader>
            <CardContent className="grid gap-5">
              <div className="grid gap-1.5">
                <Label htmlFor={`quote-${i}`}>Quote</Label>
                <Textarea
                  id={`quote-${i}`}
                  rows={3}
                  maxLength={600}
                  value={t.quote}
                  required
                  onChange={(e) => updateTestimonial(i, { quote: e.target.value })}
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor={`name-${i}`}>Name</Label>
                <Input
                  id={`name-${i}`}
                  type="text"
                  value={t.name}
                  maxLength={80}
                  required
                  onChange={(e) => updateTestimonial(i, { name: e.target.value })}
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor={`business-${i}`}>Business</Label>
                <Input
                  id={`business-${i}`}
                  type="text"
                  value={t.business}
                  maxLength={100}
                  onChange={(e) => updateTestimonial(i, { business: e.target.value })}
                />
              </div>

              <div className="flex gap-2 pt-1">
                <Button type="button" variant="destructive" size="sm" onClick={() => removeTestimonial(i)}>
                  Remove this testimonial
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={addTestimonial}
            disabled={items.length >= MAX_TESTIMONIALS}
          >
            + Add testimonial
          </Button>
          {items.length >= MAX_TESTIMONIALS && (
            <span className="text-sm text-muted-foreground">
              Testimonials are capped at {MAX_TESTIMONIALS} — remove one to add another.
            </span>
          )}
        </div>

        <div>
          <Button type="submit" variant="brand" disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </Button>
          {status && (
            <p className={`text-sm mt-3 ${status.ok ? "text-[#1a7f37]" : "text-destructive"}`}>
              {status.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
