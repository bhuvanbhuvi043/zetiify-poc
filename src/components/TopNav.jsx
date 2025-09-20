// src/components/TopNav.jsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  MessageSquare,
  LayoutDashboard,
  Menu,
  X,
  Users,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png"; // ✅ Import your logo


export default function TopNav() {
  const { user, login, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-xl text-sm font-medium transition ${
      isActive
        ? "bg-violet-100 text-violet-700"
        : "text-gray-700 hover:bg-violet-50 hover:text-violet-700"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur shadow-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Zetiify Logo"
              className="h-9 w-9 object-contain shadow-md" // ✅ box logo (no rounded)
            />
            <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">
              Zetiify
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-1">
            <NavLink to="/dashboard" className={navLinkClass}>
              <span className="inline-flex items-center gap-2">
                <LayoutDashboard size={16} /> Dashboard
              </span>
            </NavLink>
            <NavLink to="/chat" className={navLinkClass}>
              <span className="inline-flex items-center gap-2">
                <MessageSquare size={16} /> Messages
              </span>
            </NavLink>
            {user && (
              <>
                <NavLink to="/opportunities/new" className={navLinkClass}>
                  + Create
                </NavLink>
                <NavLink to="/notifications" className={navLinkClass}>
                  Notifications
                </NavLink>
                <NavLink to="/settings" className={navLinkClass}>
                  Settings
                </NavLink>
                <NavLink to="/investor" className={navLinkClass}>
                  <span className="inline-flex items-center gap-2">
                    <Users size={16} /> Investors
                  </span>
                </NavLink>
              </>
            )}
          </nav>

          {/* Auth buttons (Desktop) */}
          {/* Auth buttons (Desktop) */}
<div className="hidden sm:flex items-center gap-3">
  {user ? (
    <>
      <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="profile"
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-violet-100 grid place-items-center text-xs font-bold text-violet-700">
            {user.displayName ? user.displayName[0] : "U"}
          </div>
        )}
        <span className="text-sm font-medium text-gray-700">
          {user.displayName || "User"}
        </span>
      </Link>
      <button
        onClick={logout}
        className="px-3 py-1.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <button
        onClick={login}
        className="px-3 py-1.5 rounded-xl text-sm font-semibold bg-white border border-violet-200 text-violet-700 hover:bg-violet-50"
      >
        Login
      </button>
      <button className="px-3 py-1.5 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700">
        Register
      </button>
    </>
  )}
</div>


          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-violet-50"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="p-4 space-y-2">
            <NavLink
              to="/dashboard"
              className={navLinkClass}
              onClick={() => setMobileOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/chat"
              className={navLinkClass}
              onClick={() => setMobileOpen(false)}
            >
              Messages
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/opportunities/new"
                  className={navLinkClass}
                  onClick={() => setMobileOpen(false)}
                >
                  + Create
                </NavLink>
                <NavLink
                  to="/notifications"
                  className={navLinkClass}
                  onClick={() => setMobileOpen(false)}
                >
                  Notifications
                </NavLink>
                <NavLink
                  to="/settings"
                  className={navLinkClass}
                  onClick={() => setMobileOpen(false)}
                >
                  Settings
                </NavLink>
                <NavLink
                  to="/investor"
                  className={navLinkClass}
                  onClick={() => setMobileOpen(false)}
                >
                  Investors
                </NavLink>
              </>
            )}

            {/* Auth buttons (Mobile) */}
            <div className="pt-3 border-t border-gray-100">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full px-3 py-2 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      login();
                      setMobileOpen(false);
                    }}
                    className="w-full px-3 py-2 rounded-xl text-sm font-semibold bg-white border border-violet-200 text-violet-700 hover:bg-violet-50"
                  >
                    Login
                  </button>
                  <button className="w-full px-3 py-2 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700">
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
