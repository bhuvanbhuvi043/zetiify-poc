// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import TopNav from "./components/TopNav";
import LoadingScreen from "./components/LoadingScreen";

// Core pages
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import { AuthProvider } from "./context/AuthContext";

// App pages
import CreateOpportunity from "./pages/CreateOpportunity";
import OpportunityDetail from "./pages/OpportunityDetail";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

// Investor pages
import Investor from "./pages/Investor";
import AngelInvestor from "./pages/AngelInvestor";
import VentureCapital from "./pages/VentureCapital";
import PrivateEquity from "./pages/PrivateEquity";
import HedgeFund from "./pages/HedgeFund";
import InvestorForm from "./components/investor/InvestorForm";

// New user flow pages
import Onboarding from "./pages/Onboarding";
import FounderForm from "./pages/FounderForm";
import TalentForm from "./pages/TalentForm";
import Profile from "./pages/Profile";

// 🔒 ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-violet-50 flex flex-col">
      <TopNav />
      <div className="flex-1">
        <Routes>
          {/* Core routes */}
          <Route path="/" element={<Landing />} />

          {/* ✅ Dashboard protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

          {/* Opportunities */}
          <Route
            path="/opportunities/new"
            element={
              <ProtectedRoute>
                <CreateOpportunity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/opportunities/:id"
            element={
              <ProtectedRoute>
                <OpportunityDetail />
              </ProtectedRoute>
            }
          />

          {/* Notifications + Settings */}
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* Investor routes */}
          <Route
            path="/investor"
            element={
              <ProtectedRoute>
                <Investor />
              </ProtectedRoute>
            }
          >
            <Route index element={<InvestorForm />} />
            <Route path="angel-investor" element={<AngelInvestor />} />
            <Route path="venture-capital" element={<VentureCapital />} />
            <Route path="private-equity" element={<PrivateEquity />} />
            <Route path="hedge-fund" element={<HedgeFund />} />
          </Route>

          {/* Onboarding (public) */}
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/founder" element={<FounderForm />} />
          <Route path="/talent" element={<TalentForm />} />

          {/* ✅ Profile (self + other users) */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:uid" element={<Profile />} />
        </Routes>
      </div>

      {location.pathname !== "/chat" && (
        <footer className="py-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Zetiify — Prototype built with React + Tailwind.
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
