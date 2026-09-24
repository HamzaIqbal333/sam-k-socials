import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import ProtectedRoute from "../../components/admin/ProtectedRoute";
import AdminLogin from "./AdminLogin";
import AdminLayout from "./AdminLayout";
import AdminOverview from "./AdminOverview";
import AdminSite from "./AdminSite";
import AdminServices from "./AdminServices";
import AdminProcess from "./AdminProcess";
import AdminPortfolio from "./AdminPortfolio";
import AdminTestimonials from "./AdminTestimonials";
import AdminEnquiries from "./AdminEnquiries";

// Everything admin-related — including AuthProvider and therefore firebase/auth — lives behind
// this one lazy import (see the `/admin/*` route in App.jsx). A visitor who never opens /admin
// never downloads any of it. Routes here are relative to the "/admin" mount point.
export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="site" element={<AdminSite />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="process" element={<AdminProcess />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
