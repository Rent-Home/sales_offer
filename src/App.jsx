import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import BusinessLogin from "./pages/BusinessLogin";
import BusinessRegister from "./pages/BusinessRegister";
import Dashboard from "./pages/Dashboard";
import CreateOffer from "./pages/CreateOffer";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Visitor */}
      <Route path="/" element={<Home />} />

      {/* Business */}
      <Route path="/business/login" element={<BusinessLogin />} />
      <Route path="/business/register" element={<BusinessRegister />} />
      {/* <Route path="/business/dashboard" element={<Dashboard />} />
      <Route path="/business/create-offer" element={<CreateOffer />} /> */}
      <Route
  path="/business/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/business/create-offer"
  element={
    <ProtectedRoute>
      <CreateOffer />
    </ProtectedRoute>
  }
/>

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* Invalid URL */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;