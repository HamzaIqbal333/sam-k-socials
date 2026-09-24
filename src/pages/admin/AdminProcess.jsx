import { useEffect, useRef, useState } from "react";
import { useContent, saveContent } from "../../hooks/useContent";
import { process } from "../../data/site";

const MAX_STEPS = 6;

function emptyStep() {
  return { title: "", text: "" };
}

export default function AdminProcess() {
  const { data, loading } = useContent("process", { items: process });
  const [items, setItems] = useState(null);
  const [status, setStatus] = useState({ state: "idle" });
  const initialized = useRef(false);

  useEffect(() => {
    if (!loading && !initialized.current) {
      setItems(data.items);
      initialized.current = true;
    }
  }, [loading, data]);

  if (items === null) {
    return (
      <div>
        <h1>Process</h1>
        <p className="lede">Loading…</p>
      </div>
    );
  }

  const updateItem = (index, patch) => {
    setStatus({ state: "idle" });
    setItems((cur) => cur.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  };

  const addStep = () => {
    if (items.length >= MAX_STEPS) return;
    setItems((cur) => [...cur, emptyStep()]);
  };

  const removeStep = (index) => {
    setItems((cur) => cur.filter((_, i) => i !== index));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus({ state: "saving" });
    const payload = {
      items: items.map((it) => ({
        title: it.title.trim(),
        text: it.text.trim(),
      })),
    };
    try {
      await saveContent("process", payload);
      setStatus({ state: "ok" });
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    }
  };

  return (
    <div>
      <h1>Process</h1>
      <p className="lede">
        Edit the "How working together goes" steps shown on the Services page. Up to {MAX_STEPS} steps.
      </p>
      <form className="admin-form" onSubmit={handleSave}>
        {items.map((step, index) => (
          <div className="admin-list-item" key={index}>
            <label>
              Title
              <input
                type="text"
                value={step.title}
                maxLength={60}
                required
                onChange={(e) => updateItem(index, { title: e.target.value })}
              />
            </label>
            <label>
              Text
              <textarea
                rows={3}
                value={step.text}
                maxLength={300}
                required
                onChange={(e) => updateItem(index, { text: e.target.value })}
              />
            </label>
            <div className="admin-item-actions">
              <button type="button" className="btn btn--ghost" onClick={() => removeStep(index)}>
                Remove step
              </button>
            </div>
          </div>
        ))}

        <div className="admin-item-actions">
          <button type="button" className="btn btn--ghost" onClick={addStep} disabled={items.length >= MAX_STEPS}>
            Add step
          </button>
          <button type="submit" className="btn btn--primary" disabled={status.state === "saving"}>
            {status.state === "saving" ? "Saving…" : "Save"}
          </button>
        </div>

        {status.state === "ok" && <p className="admin-status admin-status--ok">Saved</p>}
        {status.state === "error" && (
          <p className="admin-status admin-status--error">
            Couldn't save{status.message ? `: ${status.message}` : "."}
          </p>
        )}
      </form>
    </div>
  );
}
