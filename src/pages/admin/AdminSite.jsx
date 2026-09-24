import { useEffect, useState } from "react";
import { useContent, saveContent } from "../../hooks/useContent";
import { site as siteDefaults } from "../../data/site";

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
      <h1>Site settings</h1>
      <p className="lede">Business details shown across the public site.</p>

      <form className="admin-form" onSubmit={onSubmit}>
        <label>
          Business name
          <input
            value={form?.name || ""}
            onChange={(e) => update("name", e.target.value)}
            maxLength={80}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={form?.email || ""}
            onChange={(e) => update("email", e.target.value)}
            maxLength={254}
            required
          />
        </label>

        <label>
          Availability
          <input
            value={form?.availability || ""}
            onChange={(e) => update("availability", e.target.value)}
            maxLength={160}
            placeholder="e.g. Booking new partnerships for next month"
          />
        </label>

        <label>
          Tally form ID
          <input
            value={form?.tallyFormId || ""}
            onChange={(e) => update("tallyFormId", e.target.value)}
            maxLength={120}
            placeholder="tally.so/r/<id>"
          />
        </label>
        <p className="admin-status">
          Optional and now legacy — the Contact page uses its own Firestore-backed enquiry form.
          This is only used as a fallback embed if that isn't available.
        </p>

        <label>
          Hero image URL (Home page, phone screen)
          <input
            type="url"
            value={form?.heroImage || ""}
            onChange={(e) => update("heroImage", e.target.value)}
            maxLength={500}
            placeholder="https://..."
          />
        </label>
        <label>
          About page photo URL
          <input
            type="url"
            value={form?.aboutImage || ""}
            onChange={(e) => update("aboutImage", e.target.value)}
            maxLength={500}
            placeholder="https://..."
          />
        </label>
        <label>
          Contact page photo URL
          <input
            type="url"
            value={form?.contactImage || ""}
            onChange={(e) => update("contactImage", e.target.value)}
            maxLength={500}
            placeholder="https://..."
          />
        </label>
        <p className="admin-status">
          Paste a direct image link (ending in .jpg/.png, or an Unsplash/CDN URL). Leave blank to
          show a plain placeholder block instead.
        </p>

        <div>
          <label>Social links</label>
          {socials.map((s, i) => (
            <div className="admin-list-item" key={i}>
              <label>
                Label
                <input
                  value={s.label || ""}
                  onChange={(e) => updateSocial(i, "label", e.target.value)}
                  maxLength={40}
                  placeholder="Instagram"
                />
              </label>
              <label>
                URL
                <input
                  value={s.href || ""}
                  onChange={(e) => updateSocial(i, "href", e.target.value)}
                  maxLength={300}
                  placeholder="https://instagram.com/yourhandle"
                />
              </label>
              <div className="admin-item-actions">
                <button type="button" className="btn btn--ghost" onClick={() => removeSocial(i)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="admin-item-actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={addSocial}
              disabled={socials.length >= MAX_SOCIALS}
            >
              Add social link
            </button>
          </div>
        </div>

        <button className="btn btn--primary" type="submit" disabled={status === "saving"}>
          {status === "saving" ? "Saving…" : "Save changes"}
        </button>

        {status === "ok" && <p className="admin-status admin-status--ok">Saved.</p>}
        {status === "error" && <p className="admin-status admin-status--error">{error}</p>}
      </form>
    </div>
  );
}
