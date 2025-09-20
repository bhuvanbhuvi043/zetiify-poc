// src/pages/Notifications.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { collection, query as qf, where, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function Notifications() {
  const { user, login } = useAuth();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!user) return;
    const q = qf(collection(db, "notifications"), where("recipient", "==", user.uid), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setNotes(snap.docs.map(d => ({ id: d.id, ...d.data() })));

    }, (err) => console.error("notifications err", err));
    return () => unsub();
  }, [user]);

  const markRead = async (n) => {
    try {
      await updateDoc(doc(db, "notifications", n.id), { read: true });
    } catch (err) {
      console.error("mark read", err);
    }
  };

  if (!user) return (
    <div className="p-6">
      <p>Sign in to see notifications.</p>
      <button onClick={login} className="px-4 py-2 rounded-xl bg-violet-600 text-white mt-3">Sign in</button>
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <div className="space-y-2">
        {notes.length === 0 && <div className="p-4 rounded-xl bg-white shadow-soft border">No notifications</div>}
        {notes.map(n => (
          <div key={n.id} className={`p-4 rounded-xl bg-white shadow-sm border ${n.read ? "opacity-80" : "bg-violet-50"}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm">{n.type}</p>
                <p className="text-xs text-gray-600">{n.from || ""} • {n.opportunityId ? `Opportunity ${n.opportunityId}` : ""}</p>
              </div>
              <div className="flex items-center gap-2">
                {!n.read && <button onClick={() => markRead(n)} className="text-xs px-2 py-1 rounded bg-white border">Mark read</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
