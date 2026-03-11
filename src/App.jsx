import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import SeniorDashboard from "./pages/SeniorDashboard";

import BuilderDashboard from "./pages/BuilderDashboard";
import BrowseHomes from "./pages/BrowseHomes";
import PropertyDetails from "./pages/PropertyDetails";
import AddProperty from "./pages/AddProperty";
import MyProperties from "./pages/MyProperties";
import AboutUs from "./pages/static/AboutUs";
import HowItWorks from "./pages/static/HowItWorks";
import ContactUs from "./pages/static/ContactUs";
import Profile from "./pages/Profile";
import SavedHomes from "./pages/SavedHomes";
import EnquiryHistory from "./pages/EnquiryHistory";
import BuilderEnquiries from "./pages/BuilderEnquiries";

// Protected route wrapper — redirects to /auth if not logged in
function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading, role } = useAuth();
  if (loading) return null; // still checking auth
  if (!user) return <Navigate to="/auth" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

// Redirect /dashboard to the correct role-specific dashboard
function DashboardRedirect() {
  const { role, user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/auth" replace />;
  if (role === "senior") return <Navigate to="/senior-dashboard" replace />;
  if (role === "builder") return <Navigate to="/builder-dashboard" replace />;
  return <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/auth" element={<Auth />} />

      {/* Generic dashboard redirect */}
      <Route path="/dashboard" element={<DashboardRedirect />} />

      {/* Static Public Pages */}
      <Route path="/about" element={<AboutUs />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/contact" element={<ContactUs />} />

      {/* Dashboards (protected) */}
      <Route path="/senior-dashboard" element={<ProtectedRoute allowedRoles={["senior"]}><SeniorDashboard /></ProtectedRoute>} />

      <Route path="/builder-dashboard" element={<ProtectedRoute allowedRoles={["builder"]}><BuilderDashboard /></ProtectedRoute>} />

      {/* Feature Pages (browse is public, rest protected) */}
      <Route path="/browse" element={<BrowseHomes />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      {/* Senior Features */}
      <Route path="/saved" element={<ProtectedRoute><SavedHomes /></ProtectedRoute>} />
      <Route path="/senior/saved" element={<ProtectedRoute><SavedHomes /></ProtectedRoute>} />
      <Route path="/enquiries" element={<ProtectedRoute allowedRoles={["senior"]}><EnquiryHistory /></ProtectedRoute>} />

      {/* Builder Pages */}
      <Route path="/builder/add-property" element={<ProtectedRoute allowedRoles={["builder"]}><AddProperty /></ProtectedRoute>} />
      <Route path="/builder/my-properties" element={<ProtectedRoute allowedRoles={["builder"]}><MyProperties /></ProtectedRoute>} />
      <Route path="/builder/enquiries" element={<ProtectedRoute allowedRoles={["builder"]}><BuilderEnquiries /></ProtectedRoute>} />

      {/* Catch-all: redirect unknown paths to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
