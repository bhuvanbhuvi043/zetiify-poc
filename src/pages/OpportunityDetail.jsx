// src/pages/OpportunityDetail.jsx  (only the top + handleMessageFounder shown if you prefer partial update)

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { doc, getDoc, onSnapshot, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function OpportunityDetail() {
  const { id } = useParams();
  const [opp, setOpp] = useState(null);
  const [creator, setCreator] = useState(null);
  const { user, login } = useAuth();
  const navigate = useNavigate(); // <--- add this
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (!id) return;
    const ref = doc(db, "opportunities", id);
    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) return setOpp(null);
      const data = { id: snap.id, ...snap.data() };

      setOpp(data);
      if (data.createdBy) {
        getDoc(doc(db, "users", data.createdBy))
          .then(s => s.exists() && setCreator(s.data()))
          .catch(e => console.error("creator fetch", e));
      }
    }, (err) => console.error("opportunity snap err", err));
    return () => unsub();
  }, [id]);

  const handleMessageFounder = () => {
    if (!user) return login();
    if (!opp?.createdBy) return alert("No founder information");
    // Use client-side navigation (no full page reload):
    navigate(`/chat?u=${opp.createdBy}`);
  };

  const handleApply = async () => {
    if (!user) return login();
    setApplying(true);
    try {
      await addDoc(collection(db, "opportunities", id, "applications"), {
        userId: user.uid,
        appliedAt: serverTimestamp(),
      });
      // optional: create a notification for creator
      await addDoc(collection(db, "notifications"), {
        recipient: opp.createdBy,
        type: "application",
        opportunityId: id,
        from: user.uid,
        createdAt: serverTimestamp(),
        read: false,
      });
      alert("Application noted. Founder notified.");
    } catch (err) {
      console.error("apply", err);
      alert("Failed to apply.");
    } finally {
      setApplying(false);
    }
  };

  if (!opp) return <div className="p-6">Loading opportunity…</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="bg-white p-6 rounded-2xl shadow-soft border">
        <h1 className="text-2xl font-bold mb-2">{opp.title}</h1>
        <p className="text-sm text-gray-500 mb-4">{opp.sector} • {opp.stage}</p>
        <p className="text-gray-700 mb-4 whitespace-pre-line">{opp.description}</p>

        <div className="flex items-center justify-between gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-500">Posted by</p>
            <p className="font-semibold">{creator?.displayName || "Founder"}</p>
            <p className="text-xs text-gray-500">{creator?.role} • {creator?.location}</p>
          </div>

          <div className="flex gap-2">
            <button onClick={handleMessageFounder} className="px-4 py-2 rounded-xl bg-violet-600 text-white">Message Founder</button>
            <button onClick={handleApply} className="px-4 py-2 rounded-xl bg-white border"> {applying ? "Applying…" : "Express Interest"} </button>
          </div>
        </div>

        {Array.isArray(opp.tags) && opp.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {opp.tags.map((t) => <span key={t} className="px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs">{t}</span>)}
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link to="/dashboard" className="text-sm text-violet-700 hover:underline">← Back to opportunities</Link>
      </div>
    </div>
  );
}
