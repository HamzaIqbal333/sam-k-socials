import { useEffect, useRef, useState } from "react";
import { useContent, saveContent } from "../../hooks/useContent";
import { process } from "../../data/site";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
        <h1 className="text-3xl font-display font-bold">Process</h1>
        <p className="mt-1 text-muted-foreground">Loading…</p>
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
      <h1 className="text-3xl font-display font-bold">Process</h1>
      <p className="mt-1 text-muted-foreground">
        Edit the "How working together goes" steps shown on the Services page. Up to {MAX_STEPS} steps.
      </p>
      <form className="mt-6 grid max-w-2xl gap-6" onSubmit={handleSave}>
        {items.map((step, index) => (
          <Card key={index}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor={`step-title-${index}`}>Title</Label>
                <Input
                  id={`step-title-${index}`}
                  type="text"
                  value={step.title}
                  maxLength={60}
                  required
                  onChange={(e) => updateItem(index, { title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`step-text-${index}`}>Text</Label>
                <Textarea
                  id={`step-text-${index}`}
                  rows={3}
                  value={step.text}
                  maxLength={300}
                  required
                  onChange={(e) => updateItem(index, { text: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => removeStep(index)}>
                  Remove step
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" onClick={addStep} disabled={items.length >= MAX_STEPS}>
            Add step
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
