import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";

import BusinessLogin from "./pages/BusinessLogin";
import BusinessRegister from "./pages/BusinessRegister";
import Dashboard from "./pages/Dashboard";
import CreateOffer from "./pages/CreateOffer";
import MyOffers from "./pages/MyOffers";
import EditOffer from "./pages/EditOffer";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import PendingOffers from "./pages/PendingOffers";
import Campaigns from "./pages/Campaigns";
import CreateCampaign from "./pages/CreateCampaign";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";


function App() {
  return (
    <Routes>

      {/* =========================================
          VISITOR
      ========================================= */}

      <Route
        path="/"
        element={<Home />}
      />


      {/* =========================================
          BUSINESS
      ========================================= */}

      <Route
        path="/business/login"
        element={<BusinessLogin />}
      />

      <Route
        path="/business/register"
        element={<BusinessRegister />}
      />

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

      <Route
        path="/business/my-offers"
        element={
          <ProtectedRoute>
            <MyOffers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/business/edit-offer/:id"
        element={
          <ProtectedRoute>
            <EditOffer />
          </ProtectedRoute>
        }
      />


      {/* =========================================
          ADMIN LOGIN
      ========================================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* =========================================
          ADMIN
      ========================================= */}

      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/pending-offers"
        element={
          <AdminProtectedRoute>
            <PendingOffers />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/campaigns"
        element={
          <AdminProtectedRoute>
            <Campaigns />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/create-campaign"
        element={
          <AdminProtectedRoute>
            <CreateCampaign />
          </AdminProtectedRoute>
        }
      />


      {/* =========================================
          INVALID URL
      ========================================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;