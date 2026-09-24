import { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db, firebaseEnabled } from "../lib/firebase";

/**
 * Live-reads a single document from the `content` collection (e.g. content/services,
 * content/site), falling back to `fallback` (from src/data/site.js) whenever Firebase
 * isn't configured yet, the doc doesn't exist yet, or a read fails. Public pages should
 * always be able to render something sensible even before Sam has logged into /admin once.
 */
export function useContent(docId, fallback) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(firebaseEnabled);
  const [source, setSource] = useState(firebaseEnabled ? "loading" : "fallback");

  useEffect(() => {
    if (!firebaseEnabled) return;
    const ref = doc(db, "content", docId);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          setData(snap.data());
          setSource("live");
        } else {
          setData(fallback);
          setSource("fallback");
        }
        setLoading(false);
      },
      () => {
        setData(fallback);
        setSource("fallback");
        setLoading(false);
      }
    );
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docId]);

  return { data, loading, source };
}

/** Admin-only: overwrite content/<docId> with a full new value. */
export function saveContent(docId, value) {
  if (!firebaseEnabled) return Promise.reject(new Error("Firebase isn't configured."));
  return setDoc(doc(db, "content", docId), value);
}
