import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { firebaseEnabled } from "../../lib/firebase";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (!firebaseEnabled) {
    return (
      <div className="container section">
        <h1>Admin isn't connected yet</h1>
        <p>Firebase environment variables aren't set. Add them to <code>.env.local</code> (see <code>.env.example</code>) and reload.</p>
      </div>
    );
  }
  if (loading) return <div className="container section"><p>Loading…</p></div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
}
