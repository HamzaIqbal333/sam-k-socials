import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { firebaseEnabled } from "../../lib/firebase";
import "./admin.css";

// No sign-up here on purpose: Sam is the only admin, and her one account is created
// by hand in the Firebase console (Authentication > Users > Add user).
export default function AdminLogin() {
  const { user, login } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to={location.state?.from ?? "/admin"} replace />;

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email.trim(), password);
    } catch {
      setError("That email or password didn't work.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-auth">
      <form className="admin-auth__card" onSubmit={onSubmit}>
        <h1>Admin sign in</h1>
        <p className="admin-auth__hint">Sam K. Socials content admin</p>
        {!firebaseEnabled && (
          <p className="admin-auth__error" role="alert">Firebase isn't configured yet — set the VITE_FIREBASE_* variables in .env.local.</p>
        )}
        <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" /></label>
        <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" /></label>
        {error && <p className="admin-auth__error" role="alert">{error}</p>}
        <button className="btn btn--primary" disabled={busy || !firebaseEnabled}>{busy ? "Signing in…" : "Sign in"}</button>
      </form>
    </div>
  );
}
