import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, firebaseEnabled } from "../../lib/firebase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

function formatDate(ts) {
  if (!ts || typeof ts.toDate !== "function") return "Just now";
  return ts.toDate().toLocaleString();
}

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [state, setState] = useState("loading"); // loading | ok | error
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!firebaseEnabled) return;
    const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setEnquiries(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setState("ok");
      },
      () => {
        setState("error");
      }
    );
    return unsub;
  }, []);

  async function onDelete(id) {
    if (!window.confirm("Delete this enquiry? This can't be undone.")) return;
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, "enquiries", id));
    } catch {
      // Leave the list as-is; the live onSnapshot will resync if the delete actually went through.
    } finally {
      setDeletingId(null);
    }
  }

  if (!firebaseEnabled) {
    return (
      <div>
        <h1>Enquiries</h1>
        <p className="lede">Firebase isn't configured yet, so enquiries can't be loaded here.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Enquiries</h1>
      <p className="lede">Messages sent through the Contact form, newest first.</p>

      {state === "loading" && <p className="text-sm text-muted-foreground mt-4">Loading…</p>}

      {state === "error" && (
        <p className="text-sm text-destructive mt-4">
          Couldn't load enquiries. Try signing out and back in, or check Firestore permissions.
        </p>
      )}

      {state === "ok" && enquiries.length === 0 && (
        <p className="text-sm text-muted-foreground mt-4">No enquiries yet.</p>
      )}

      {state === "ok" && enquiries.length > 0 && (
        <div className="mt-6 rounded-xl border-2 border-foreground bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Social</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enquiries.map((en) => (
                <TableRow key={en.id}>
                  <TableCell className="whitespace-nowrap text-muted-foreground">{formatDate(en.createdAt)}</TableCell>
                  <TableCell className="font-semibold">{en.name}</TableCell>
                  <TableCell>
                    <a href={`mailto:${en.email}`} className="underline underline-offset-2 hover:text-primary">
                      {en.email}
                    </a>
                  </TableCell>
                  <TableCell>{en.business || "—"}</TableCell>
                  <TableCell>{en.social || "—"}</TableCell>
                  <TableCell>
                    {en.service ? <Badge variant="sky">{en.service}</Badge> : "—"}
                  </TableCell>
                  <TableCell className="max-w-xs whitespace-pre-wrap">{en.message}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(en.id)}
                      disabled={deletingId === en.id}
                    >
                      {deletingId === en.id ? "Deleting…" : "Delete"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
