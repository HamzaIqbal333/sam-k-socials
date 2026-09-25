import { useEffect, useState } from "react";
import { useContent, saveContent } from "../../hooks/useContent";
import { clients } from "../../data/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const MAX_CLIENTS = 4;
const MAX_DID = 6;
const MAX_RESULTS = 8;

function emptyClient() {
  return { slug: "", name: "", industry: "", did: [""], need: "", approach: "", show: "", results: [""], coverImage: "" };
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
        coverImage: c.coverImage?.trim() || null,
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

      <form className="grid gap-6 max-w-2xl" onSubmit={handleSave}>
        {items.map((c, i) => (
          <Card key={i}>
            <CardHeader>
              <h2 className="font-display text-lg font-bold">{c.name || `Client ${i + 1}`}</h2>
            </CardHeader>
            <CardContent className="grid gap-5">
              <div className="grid gap-1.5">
                <Label htmlFor={`slug-${i}`}>Slug</Label>
                <Input
                  id={`slug-${i}`}
                  type="text"
                  value={c.slug}
                  maxLength={40}
                  required
                  onChange={(e) => updateClient(i, { slug: e.target.value })}
                />
                <p className="text-sm text-muted-foreground">
                  This is used in the case study URL (/portfolio/{c.slug || "…"}). Changing it changes
                  the URL — anyone with the old link will land on a "not found" page.
                </p>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor={`name-${i}`}>Name</Label>
                <Input
                  id={`name-${i}`}
                  type="text"
                  value={c.name}
                  maxLength={80}
                  required
                  onChange={(e) => updateClient(i, { name: e.target.value })}
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor={`industry-${i}`}>Industry</Label>
                <Input
                  id={`industry-${i}`}
                  type="text"
                  value={c.industry}
                  maxLength={80}
                  onChange={(e) => updateClient(i, { industry: e.target.value })}
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor={`cover-${i}`}>Cover image URL (portfolio card + case study banner)</Label>
                <Input
                  id={`cover-${i}`}
                  type="url"
                  value={c.coverImage || ""}
                  maxLength={500}
                  placeholder="https://..."
                  onChange={(e) => updateClient(i, { coverImage: e.target.value })}
                />
              </div>

              <div className="grid gap-1.5">
                <Label>What did I do? (services performed, shown as tags)</Label>
                <div className="grid gap-2">
                  {c.did.map((d, j) => (
                    <div className="flex gap-2" key={j}>
                      <Input
                        type="text"
                        value={d}
                        maxLength={80}
                        onChange={(e) => updateListEntry(i, "did", j, e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeListEntry(i, "did", j)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="justify-self-start"
                  onClick={() => addListEntry(i, "did", MAX_DID)}
                  disabled={c.did.length >= MAX_DID}
                >
                  + Add "did" item {c.did.length >= MAX_DID ? `(max ${MAX_DID})` : ""}
                </Button>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor={`need-${i}`}>What did they need?</Label>
                <Textarea
                  id={`need-${i}`}
                  rows={3}
                  maxLength={600}
                  value={c.need}
                  onChange={(e) => updateClient(i, { need: e.target.value })}
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor={`approach-${i}`}>What did I do about it? (approach)</Label>
                <Textarea
                  id={`approach-${i}`}
                  rows={3}
                  maxLength={600}
                  value={c.approach}
                  onChange={(e) => updateClient(i, { approach: e.target.value })}
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor={`show-${i}`}>What can I show? (intro to the work samples gallery)</Label>
                <Textarea
                  id={`show-${i}`}
                  rows={3}
                  maxLength={600}
                  value={c.show}
                  onChange={(e) => updateClient(i, { show: e.target.value })}
                />
              </div>

              <div className="grid gap-1.5">
                <Label>Results and proof</Label>
                <div className="grid gap-2">
                  {c.results.map((r, j) => (
                    <div className="flex gap-2" key={j}>
                      <Input
                        type="text"
                        value={r}
                        maxLength={200}
                        onChange={(e) => updateListEntry(i, "results", j, e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeListEntry(i, "results", j)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="justify-self-start"
                  onClick={() => addListEntry(i, "results", MAX_RESULTS)}
                  disabled={c.results.length >= MAX_RESULTS}
                >
                  + Add result {c.results.length >= MAX_RESULTS ? `(max ${MAX_RESULTS})` : ""}
                </Button>
              </div>

              <div className="flex gap-2 pt-1">
                <Button type="button" variant="destructive" size="sm" onClick={() => removeClient(i)}>
                  Remove this client
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={addClient}
            disabled={items.length >= MAX_CLIENTS}
          >
            + Add client
          </Button>
          {items.length >= MAX_CLIENTS && (
            <span className="text-sm text-muted-foreground">
              Portfolio is capped at {MAX_CLIENTS} clients — remove one to add another.
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
