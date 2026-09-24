import { useEffect, useState } from "react";
import { useContent, saveContent } from "../../hooks/useContent";
import { testimonials } from "../../data/site";

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

      <form className="admin-form" onSubmit={handleSave}>
        {items.map((t, i) => (
          <div className="admin-list-item" key={i}>
            <label>
              Quote
              <textarea
                rows={3}
                maxLength={600}
                value={t.quote}
                required
                onChange={(e) => updateTestimonial(i, { quote: e.target.value })}
              />
            </label>

            <label>
              Name
              <input
                type="text"
                value={t.name}
                maxLength={80}
                required
                onChange={(e) => updateTestimonial(i, { name: e.target.value })}
              />
            </label>

            <label>
              Business
              <input
                type="text"
                value={t.business}
                maxLength={100}
                onChange={(e) => updateTestimonial(i, { business: e.target.value })}
              />
            </label>

            <div className="admin-item-actions">
              <button type="button" className="btn btn--ghost" onClick={() => removeTestimonial(i)}>
                Remove this testimonial
              </button>
            </div>
          </div>
        ))}

        <div className="admin-item-actions">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={addTestimonial}
            disabled={items.length >= MAX_TESTIMONIALS}
          >
            + Add testimonial
          </button>
          {items.length >= MAX_TESTIMONIALS && (
            <span className="admin-status">
              Testimonials are capped at {MAX_TESTIMONIALS} — remove one to add another.
            </span>
          )}
        </div>

        <div>
          <button type="submit" className="btn btn--primary" disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </button>
          {status && (
            <p className={`admin-status ${status.ok ? "admin-status--ok" : "admin-status--error"}`}>
              {status.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
