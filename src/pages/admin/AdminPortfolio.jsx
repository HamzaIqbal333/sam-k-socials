import { useEffect, useState } from "react";
import { useContent, saveContent } from "../../hooks/useContent";
import { clients } from "../../data/site";

const MAX_CLIENTS = 4;
const MAX_DID = 6;
const MAX_RESULTS = 8;

function emptyClient() {
  return { slug: "", name: "", industry: "", did: [""], need: "", approach: "", show: "", results: [""] };
}

export default function AdminPortfolio() {
  const { data } = useContent("clients", { items: clients });
  const [items, setItems] = useState(data.items);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // { ok, message }

  // Stay in sync with live/fallback data until the admin starts editing,
  // so an initial slow load (or a change from elsewhere) isn't missed.
  useEffect(() => {
    if (!dirty) setItems(data.items);
  }, [data, dirty]);

  function updateClient(i, patch) {
    setDirty(true);
    setItems((prev) => prev.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));
  }

  function updateListEntry(i, field, j, value) {
    setDirty(true);
    setItems((prev) =>
      prev.map((c, idx) => {
        if (idx !== i) return c;
        const list = [...c[field]];
        list[j] = value;
        return { ...c, [field]: list };
      })
    );
  }

  function addListEntry(i, field, max) {
    setDirty(true);
    setItems((prev) =>
      prev.map((c, idx) => {
        if (idx !== i || c[field].length >= max) return c;
        return { ...c, [field]: [...c[field], ""] };
      })
    );
  }

  function removeListEntry(i, field, j) {
    setDirty(true);
    setItems((prev) =>
      prev.map((c, idx) => {
        if (idx !== i) return c;
        const list = c[field].filter((_, k) => k !== j);
        return { ...c, [field]: list.length ? list : [""] };
      })
    );
  }

  function addClient() {
    if (items.length >= MAX_CLIENTS) return;
    setDirty(true);
    setItems((prev) => [...prev, emptyClient()]);
  }

  function removeClient(i) {
    setDirty(true);
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const cleaned = items.map((c) => ({
        slug: c.slug.trim(),
        name: c.name.trim(),
        industry: c.industry.trim(),
        did: c.did.map((d) => d.trim()).filter(Boolean),
        need: c.need.trim(),
        approach: c.approach.trim(),
        show: c.show.trim(),
        results: c.results.map((r) => r.trim()).filter(Boolean),
      }));
      await saveContent("clients", { items: cleaned });
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
      <h1>Portfolio</h1>
      <p className="lede">
        Edit the case studies shown on the public portfolio page and their individual pages.
        Capped at {MAX_CLIENTS} clients.
      </p>

      <form className="admin-form" onSubmit={handleSave}>
        {items.map((c, i) => (
          <div className="admin-list-item" key={i}>
            <label>
              Slug
              <input
                type="text"
                value={c.slug}
                maxLength={40}
                required
                onChange={(e) => updateClient(i, { slug: e.target.value })}
              />
            </label>
            <p className="admin-status">
              This is used in the case study URL (/portfolio/{c.slug || "…"}). Changing it changes
              the URL — anyone with the old link will land on a "not found" page.
            </p>

            <label>
              Name
              <input
                type="text"
                value={c.name}
                maxLength={80}
                required
                onChange={(e) => updateClient(i, { name: e.target.value })}
              />
            </label>

            <label>
              Industry
              <input
                type="text"
                value={c.industry}
                maxLength={80}
                onChange={(e) => updateClient(i, { industry: e.target.value })}
              />
            </label>

            <label>
              What did I do? (services performed, shown as tags)
              {c.did.map((d, j) => (
                <div className="btn-row" key={j}>
                  <input
                    type="text"
                    value={d}
                    maxLength={80}
                    onChange={(e) => updateListEntry(i, "did", j, e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => removeListEntry(i, "did", j)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </label>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => addListEntry(i, "did", MAX_DID)}
              disabled={c.did.length >= MAX_DID}
            >
              + Add "did" item {c.did.length >= MAX_DID ? `(max ${MAX_DID})` : ""}
            </button>

            <label>
              What did they need?
              <textarea
                rows={3}
                maxLength={600}
                value={c.need}
                onChange={(e) => updateClient(i, { need: e.target.value })}
              />
            </label>

            <label>
              What did I do about it? (approach)
              <textarea
                rows={3}
                maxLength={600}
                value={c.approach}
                onChange={(e) => updateClient(i, { approach: e.target.value })}
              />
            </label>

            <label>
              What can I show? (intro to the work samples gallery)
              <textarea
                rows={3}
                maxLength={600}
                value={c.show}
                onChange={(e) => updateClient(i, { show: e.target.value })}
              />
            </label>

            <label>
              Results and proof
              {c.results.map((r, j) => (
                <div className="btn-row" key={j}>
                  <input
                    type="text"
                    value={r}
                    maxLength={200}
                    onChange={(e) => updateListEntry(i, "results", j, e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => removeListEntry(i, "results", j)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </label>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => addListEntry(i, "results", MAX_RESULTS)}
              disabled={c.results.length >= MAX_RESULTS}
            >
              + Add result {c.results.length >= MAX_RESULTS ? `(max ${MAX_RESULTS})` : ""}
            </button>

            <div className="admin-item-actions">
              <button type="button" className="btn btn--ghost" onClick={() => removeClient(i)}>
                Remove this client
              </button>
            </div>
          </div>
        ))}

        <div className="admin-item-actions">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={addClient}
            disabled={items.length >= MAX_CLIENTS}
          >
            + Add client
          </button>
          {items.length >= MAX_CLIENTS && (
            <span className="admin-status">Portfolio is capped at {MAX_CLIENTS} clients — remove one to add another.</span>
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
