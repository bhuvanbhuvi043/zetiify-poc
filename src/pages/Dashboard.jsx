// src/pages/Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Shield,
  LineChart,
  Building2,
  MapPin,
  Users,
  Coins,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import { collection, query as qf, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // 🔑 Listen to Firestore users collection
  useEffect(() => {
    const q = qf(collection(db, "users"), orderBy("displayName", "asc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const arr = snap.docs.map((d) => {
          const data = { uid: d.id, ...d.data() };

          // ✅ Normalize fields
          data.publicLinks = Array.isArray(data.publicLinks)
            ? data.publicLinks
            : data.publicLinks
            ? [data.publicLinks]
            : [];

          // ✅ Calculate completeness
          let fields = 0;
          let filled = 0;
          ["displayName", "email", "category"].forEach((f) => {
            fields++;
            if (data[f]) filled++;
          });
          const completeness = Math.round((filled / fields) * 100) || 0;

          return { ...data, completeness };
        });
        setUsers(arr);
      },
      (err) => console.error("users snapshot error:", err)
    );
    return () => unsub();
  }, []);

  // 🔍 Search filter
  const items = useMemo(() => {
    const qq = query.toLowerCase();
    return users.filter(
      (p) =>
        (p.displayName || "").toLowerCase().includes(qq) ||
        (p.category || "").toLowerCase().includes(qq) ||
        (p.sector || "").toLowerCase().includes(qq) ||
        (p.location || "").toLowerCase().includes(qq)
    );
  }, [users, query]);

  // 🔑 Handle click → go to profile
  const handleProfileClick = (uid) => {
    navigate(`/profile/${uid}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero / Stats */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl shadow-md border border-violet-100">
          <Users size={28} className="text-violet-600 mb-2" />
          <h3 className="text-lg font-semibold">Active Users</h3>
          <p className="text-2xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md border border-violet-100">
          <Coins size={28} className="text-violet-600 mb-2" />
          <h3 className="text-lg font-semibold">Investments Tracked</h3>
          <p className="text-2xl font-bold text-gray-900">124</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md border border-violet-100">
          <Lightbulb size={28} className="text-violet-600 mb-2" />
          <h3 className="text-lg font-semibold">Projects Listed</h3>
          <p className="text-2xl font-bold text-gray-900">56</p>
        </div>
      </section>

      {/* Members */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Community Members</h2>
          <div className="relative w-full sm:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, role, sector, location..."
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <article
              key={item.uid}
              className="p-5 rounded-2xl bg-white shadow-md border border-violet-100 hover:shadow-lg transition cursor-pointer"
              onClick={() => handleProfileClick(item.uid)}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 bg-violet-600 text-white grid place-items-center font-bold rounded-md overflow-hidden">
                  {item.photoURL ? (
                    <img
                      src={item.photoURL}
                      alt={item.displayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    (item.displayName || "U")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {item.displayName || "Unnamed"}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">
                    {item.category || "Member"}
                  </p>
                </div>
                {item.completeness === 100 && (
                  <CheckCircle2 className="text-emerald-500 ml-auto" size={18} />
                )}
              </div>

              {/* Key Info by Category */}
              <div className="space-y-2 text-sm text-gray-700 mb-2">
                {item.category === "Investor" && (
                  <>
                    {item.sector && (
                      <p className="inline-flex items-center gap-2">
                        <Building2 size={16} /> Sector: {item.sector}
                      </p>
                    )}
                    {item.investmentPreferences?.stages?.length > 0 && (
                      <p className="inline-flex items-center gap-2">
                        <LineChart size={16} /> Stages:{" "}
                        {item.investmentPreferences.stages.join(", ")}
                      </p>
                    )}
                  </>
                )}

                {item.category === "Founder" && (
                  <>
                    {item.startupName && (
                      <p className="inline-flex items-center gap-2">
                        <Building2 size={16} /> Startup: {item.startupName}
                      </p>
                    )}
                    {item.sector && (
                      <p className="inline-flex items-center gap-2">
                        <LineChart size={16} /> Sector: {item.sector}
                      </p>
                    )}
                  </>
                )}

                {item.category === "Talent" && (
                  <>
                    {item.skills && (
                      <p className="inline-flex items-center gap-2">
                        <LineChart size={16} /> Skills: {item.skills}
                      </p>
                    )}
                    {item.experience && (
                      <p className="inline-flex items-center gap-2">
                        <Building2 size={16} /> Exp: {item.experience} yrs
                      </p>
                    )}
                  </>
                )}

                {item.location && (
                  <p className="inline-flex items-center gap-2">
                    <MapPin size={16} /> {item.location}
                  </p>
                )}
              </div>

              {/* Profile completeness */}
              <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                <div
                  className="bg-violet-600 h-2 rounded-full"
                  style={{ width: `${item.completeness}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">
                Profile {item.completeness}% complete
              </p>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between">
                {item.completeness === 100 ? (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
                    <Shield size={14} /> Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                    Incomplete
                  </span>
                )}
                <span className="text-violet-700 text-sm font-semibold">
                  View Profile →
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
