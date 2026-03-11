import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import SeniorDashboard from "./pages/SeniorDashboard";
import FamilyDashboard from "./pages/FamilyDashboard";
import BuilderDashboard from "./pages/BuilderDashboard";
import BrowseHomes from "./pages/BrowseHomes";
import PropertyDetails from "./pages/PropertyDetails";
import AddProperty from "./pages/AddProperty";
import MyProperties from "./pages/MyProperties";
import AboutUs from "./pages/static/AboutUs";
import HowItWorks from "./pages/static/HowItWorks";
import ContactUs from "./pages/static/ContactUs";
import Profile from "./pages/Profile";
import RichState from "./components/common/RichState";
import MainLayout from "./components/layout/MainLayout";

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

// RichState pages wrapped with MainLayout and dynamic role
const RichPage = ({ type }) => {
  const { role } = useAuth();
  return (
    <MainLayout role={role}>
      <RichState type={type} />
    </MainLayout>
  );
};

// Redirect /dashboard to the correct role-specific dashboard
function DashboardRedirect() {
  const { role, user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/auth" replace />;
  if (role === "senior") return <Navigate to="/senior-dashboard" replace />;
  if (role === "family") return <Navigate to="/family-dashboard" replace />;
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
      <Route path="/family-dashboard" element={<ProtectedRoute allowedRoles={["family"]}><FamilyDashboard /></ProtectedRoute>} />
      <Route path="/builder-dashboard" element={<ProtectedRoute allowedRoles={["builder"]}><BuilderDashboard /></ProtectedRoute>} />

      {/* Feature Pages (browse is public, rest protected) */}
      <Route path="/browse" element={<BrowseHomes />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      {/* Senior Features */}
      <Route path="/saved" element={<ProtectedRoute><RichPage type="saved" /></ProtectedRoute>} />
      <Route path="/senior/saved" element={<ProtectedRoute><RichPage type="saved" /></ProtectedRoute>} />
      <Route path="/requests" element={<ProtectedRoute><RichPage type="requests" /></ProtectedRoute>} />
      <Route path="/senior/requests" element={<ProtectedRoute><RichPage type="requests" /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><RichPage type="messages" /></ProtectedRoute>} />
      <Route path="/senior/messages" element={<ProtectedRoute><RichPage type="messages" /></ProtectedRoute>} />

      {/* Family Features */}
      <Route path="/seniors" element={<ProtectedRoute><RichPage type="leads" /></ProtectedRoute>} />
      <Route path="/family/seniors" element={<ProtectedRoute><RichPage type="leads" /></ProtectedRoute>} />
      <Route path="/shortlisted" element={<ProtectedRoute><RichPage type="saved" /></ProtectedRoute>} />
      <Route path="/family/shortlisted" element={<ProtectedRoute><RichPage type="saved" /></ProtectedRoute>} />
      <Route path="/visits" element={<ProtectedRoute><RichPage type="requests" /></ProtectedRoute>} />
      <Route path="/family/visits" element={<ProtectedRoute><RichPage type="requests" /></ProtectedRoute>} />
      <Route path="/communication" element={<ProtectedRoute><RichPage type="messages" /></ProtectedRoute>} />
      <Route path="/family/communication" element={<ProtectedRoute><RichPage type="messages" /></ProtectedRoute>} />

      {/* Builder Pages */}
      <Route path="/builder/add-property" element={<ProtectedRoute allowedRoles={["builder"]}><AddProperty /></ProtectedRoute>} />
      <Route path="/builder/my-properties" element={<ProtectedRoute allowedRoles={["builder"]}><MyProperties /></ProtectedRoute>} />
      <Route path="/leads" element={<ProtectedRoute allowedRoles={["builder"]}><RichPage type="leads" /></ProtectedRoute>} />
      <Route path="/builder/leads" element={<ProtectedRoute allowedRoles={["builder"]}><RichPage type="leads" /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute allowedRoles={["builder"]}><RichPage type="analytics" /></ProtectedRoute>} />
      <Route path="/builder/analytics" element={<ProtectedRoute allowedRoles={["builder"]}><RichPage type="analytics" /></ProtectedRoute>} />

    </Routes>
  );
}
