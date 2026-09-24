import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, firebaseEnabled } from "../../lib/firebase";

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

      {state === "loading" && <p className="lede">Loading…</p>}

      {state === "error" && (
        <p className="admin-status admin-status--error">
          Couldn't load enquiries. Try signing out and back in, or check Firestore permissions.
        </p>
      )}

      {state === "ok" && enquiries.length === 0 && <p className="lede">No enquiries yet.</p>}

      {state === "ok" && enquiries.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Business</th>
              <th>Service</th>
              <th>Message</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((en) => (
              <tr key={en.id}>
                <td>{formatDate(en.createdAt)}</td>
                <td>{en.name}</td>
                <td><a href={`mailto:${en.email}`}>{en.email}</a></td>
                <td>{en.business || "—"}</td>
                <td>{en.service || "—"}</td>
                <td>{en.message}</td>
                <td>
                  <div className="admin-item-actions">
                    <button
                      type="button"
                      className="btn btn--ghost"
                      onClick={() => onDelete(en.id)}
                      disabled={deletingId === en.id}
                    >
                      {deletingId === en.id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
