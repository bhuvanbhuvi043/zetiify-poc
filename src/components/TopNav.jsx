// src/components/TopNav.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Rocket, MessageSquare, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function TopNav() {
  const { user, login, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-xl text-sm font-medium transition ${
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
            <div className="h-9 w-9 rounded-2xl bg-violet-600 grid place-items-center text-white shadow-md">
              <Rocket size={18} />
            </div>
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
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="profile" className="h-8 w-8 rounded-full" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-violet-100 grid place-items-center text-xs font-bold text-violet-700">
                      {user.displayName ? user.displayName[0] : "U"}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {user.displayName || "User"}
                  </span>
                </div>
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
        </div>
      </div>
    </header>
  );
}
