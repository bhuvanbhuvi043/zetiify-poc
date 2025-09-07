import React, { useEffect, useMemo, useState } from "react";
import { Search, Shield, LineChart, Building2, MapPin, CheckCircle2 } from "lucide-react";
import data from "../shared/mockData";
import { collection, query as qf, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState(
    data.profiles.map(p => ({
      uid: `mock-${p.id}`,
      displayName: p.name,
      role: p.role,
      sector: p.sector,
      location: p.location || "Unknown",
      tags: p.tags || [],
      completeness: Math.floor(Math.random() * 40) + 60 // demo completeness %
    }))
  );

  useEffect(() => {
    const q = qf(collection(db, "users"), orderBy("displayName", "asc"));
    const unsub = onSnapshot(q, snap => {
      const arr = snap.docs.map(d => ({ uid: d.id, ...d.data() }));
      if (arr.length > 0) setUsers(arr);
    }, err => console.error("users snapshot error:", err));
    return () => unsub();
  }, []);

  const items = useMemo(() => {
    const qq = query.toLowerCase();
    return users.filter(p =>
      (p.displayName || "").toLowerCase().includes(qq) ||
      (p.role || "").toLowerCase().includes(qq) ||
      (p.sector || "").toLowerCase().includes(qq) ||
      (p.location || "").toLowerCase().includes(qq)
    );
  }, [users, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Opportunities</h2>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={18}/>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, role, sector, location..."
            className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <article key={item.uid} className="p-5 rounded-2xl bg-white shadow-md border border-violet-100 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-xl bg-violet-600 text-white grid place-items-center font-bold overflow-hidden">
                {item.photoURL ? <img src={item.photoURL} alt={item.displayName} className="h-full w-full object-cover" /> : (item.displayName || "U").split(" ").map(n => n[0]).join("").slice(0,2)}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{item.displayName}</h3>
                <p className="text-xs text-gray-500 truncate">{item.role}</p>
              </div>
              <CheckCircle2 className="text-emerald-500 ml-auto" size={18}/>
            </div>

            <div className="space-y-2 text-sm text-gray-700 mb-2">
              <p className="inline-flex items-center gap-2"><Building2 size={16}/> {item.sector}</p>
              <p className="inline-flex items-center gap-2"><MapPin size={16}/> {item.location}</p>
              <p className="inline-flex items-center gap-2"><LineChart size={16}/> {(item.tags || []).join(" • ")}</p>
            </div>

            {/* Profile completeness bar */}
            <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
              <div className="bg-violet-600 h-2 rounded-full" style={{ width: `${item.completeness || 70}%` }}></div>
            </div>
            <p className="text-xs text-gray-500">Profile {item.completeness || 70}% complete</p>

            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
                <Shield size={14}/> Verified
              </span>
              <a href="/chat" className="text-violet-700 hover:underline text-sm font-semibold">
                Message
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
