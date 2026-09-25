import { useEffect, useRef, useState } from "react";
import { useContent, saveContent } from "../../hooks/useContent";
import { services } from "../../data/site";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const MAX_SERVICES = 8;
const MAX_POINTS = 8;

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function emptyService() {
  return { id: "", title: "", kind: "", short: "", body: "", points: [""] };
}

export default function AdminServices() {
  const { data, loading } = useContent("services", { items: services });
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
        <h1 className="text-3xl font-display font-bold">Services</h1>
        <p className="mt-1 text-muted-foreground">Loading…</p>
      </div>
    );
  }

  const updateItem = (index, patch) => {
    setStatus({ state: "idle" });
    setItems((cur) => cur.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  };

  const handleTitleChange = (index, value) => {
    setStatus({ state: "idle" });
    setItems((cur) =>
      cur.map((it, i) => {
        if (i !== index) return it;
        // Only auto-fill the id from the title while the user hasn't set their own.
        const nextId = it.id ? it.id : slugify(value);
        return { ...it, title: value, id: nextId };
      })
    );
  };

  const updatePoint = (index, pointIndex, value) => {
    setStatus({ state: "idle" });
    setItems((cur) =>
      cur.map((it, i) => {
        if (i !== index) return it;
        return { ...it, points: it.points.map((p, pi) => (pi === pointIndex ? value : p)) };
      })
    );
  };

  const addPoint = (index) => {
    setItems((cur) =>
      cur.map((it, i) =>
        i === index && it.points.length < MAX_POINTS ? { ...it, points: [...it.points, ""] } : it
      )
    );
  };

  const removePoint = (index, pointIndex) => {
    setItems((cur) =>
      cur.map((it, i) => (i === index ? { ...it, points: it.points.filter((_, pi) => pi !== pointIndex) } : it))
    );
  };

  const addService = () => {
    if (items.length >= MAX_SERVICES) return;
    setItems((cur) => [...cur, emptyService()]);
  };

  const removeService = (index) => {
    setItems((cur) => cur.filter((_, i) => i !== index));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus({ state: "saving" });
    const payload = {
      items: items.map((it) => ({
        id: (it.id.trim() || slugify(it.title) || "service").slice(0, 60),
        title: it.title.trim(),
        kind: it.kind.trim(),
        short: it.short.trim(),
        body: it.body.trim(),
        points: it.points.map((p) => p.trim()).filter(Boolean),
      })),
    };
    try {
      await saveContent("services", payload);
      setStatus({ state: "ok" });
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-display font-bold">Services</h1>
      <p className="mt-1 text-muted-foreground">
        Edit the services shown in the Home carousel and the Services page cards. Up to {MAX_SERVICES} services.
      </p>
      <form className="mt-6 grid max-w-2xl gap-6" onSubmit={handleSave}>
        {items.map((service, index) => (
          <Card key={index}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor={`service-title-${index}`}>Title</Label>
                <Input
                  id={`service-title-${index}`}
                  type="text"
                  value={service.title}
                  maxLength={80}
                  required
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`service-id-${index}`}>Id (slug used for links)</Label>
                <Input
                  id={`service-id-${index}`}
                  type="text"
                  value={service.id}
                  maxLength={60}
                  placeholder="auto-generated from title"
                  onChange={(e) => updateItem(index, { id: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`service-kind-${index}`}>Kind</Label>
                <Input
                  id={`service-kind-${index}`}
                  type="text"
                  value={service.kind}
                  maxLength={60}
                  placeholder="e.g. Ongoing, done-for-you"
                  onChange={(e) => updateItem(index, { kind: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`service-short-${index}`}>Short summary</Label>
                <Input
                  id={`service-short-${index}`}
                  type="text"
                  value={service.short}
                  maxLength={160}
                  onChange={(e) => updateItem(index, { short: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`service-body-${index}`}>Body</Label>
                <Textarea
                  id={`service-body-${index}`}
                  rows={4}
                  value={service.body}
                  maxLength={800}
                  required
                  onChange={(e) => updateItem(index, { body: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Points</Label>
                {service.points.map((point, pointIndex) => (
                  <div className="flex gap-2" key={pointIndex}>
                    <Input
                      type="text"
                      value={point}
                      maxLength={160}
                      placeholder={`Point ${pointIndex + 1}`}
                      onChange={(e) => updatePoint(index, pointIndex, e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removePoint(index, pointIndex)}
                    >
                      Remove point
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addPoint(index)}
                  disabled={service.points.length >= MAX_POINTS}
                >
                  Add point
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => removeService(index)}>
                  Remove service
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" onClick={addService} disabled={items.length >= MAX_SERVICES}>
            Add service
          </Button>
          <Button type="submit" disabled={status.state === "saving"}>
            {status.state === "saving" ? "Saving…" : "Save"}
          </Button>
        </div>

        {status.state === "ok" && <p className="text-sm text-emerald-700">Saved</p>}
        {status.state === "error" && (
          <p className="text-sm text-destructive">
            Couldn't save{status.message ? `: ${status.message}` : "."}
          </p>
        )}
      </form>
    </div>
  );
}
