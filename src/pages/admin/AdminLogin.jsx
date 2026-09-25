import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { firebaseEnabled } from "../../lib/firebase";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
    <div className="grid min-h-screen place-items-center bg-background px-6 py-12">
      <Card className="w-full max-w-sm py-8">
        <CardHeader className="px-8">
          <CardTitle className="text-2xl">Admin sign in</CardTitle>
          <CardDescription>Sam K. Socials content admin</CardDescription>
        </CardHeader>
        <CardContent className="px-8">
          <form onSubmit={onSubmit} className="grid gap-5" noValidate={false}>
            {!firebaseEnabled && (
              <p role="alert" className="text-sm font-medium text-destructive">
                Firebase isn't configured yet — set the VITE_FIREBASE_* variables in .env.local.
              </p>
            )}
            <div className="grid gap-1.5">
              <Label htmlFor="admin-email">Email</Label>
              <Input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            {error && (
              <p role="alert" className="text-sm font-medium text-destructive">
                {error}
              </p>
            )}
            <Button type="submit" disabled={busy || !firebaseEnabled} className="mt-1 w-full">
              {busy ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
