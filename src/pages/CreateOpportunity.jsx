// src/pages/CreateOpportunity.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CreateOpportunity() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    short: "",
    description: "",
    sector: "",
    stage: "",
    fundingNeeded: "",
    tags: "",
  });
  const [saving, setSaving] = useState(false);

  const onChange = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return login();
    if (!form.title || !form.description) return alert("Please add title and description");

    setSaving(true);
    try {
      await addDoc(collection(db, "opportunities"), {
  ...form,
  tags: form.tags ? form.tags.split(",").map(t=>t.trim()).filter(Boolean) : [],
  createdBy: user.uid,
  createdAt: serverTimestamp()
});

      // Redirect to detail page
      navigate(`/opportunities/${docRef.id}`);
    } catch (err) {
      console.error("create opportunity", err);
      alert("Failed to create opportunity. See console.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Create Opportunity</h2>
      <form className="space-y-4 bg-white p-6 rounded-2xl shadow-soft border border-violet-50" onSubmit={handleSubmit}>
        <input value={form.title} onChange={onChange("title")} placeholder="Opportunity title" className="w-full px-3 py-2 rounded-xl border" />
        <input value={form.short} onChange={onChange("short")} placeholder="Short summary" className="w-full px-3 py-2 rounded-xl border" />
        <textarea value={form.description} onChange={onChange("description")} rows={6} placeholder="Full description" className="w-full px-3 py-2 rounded-xl border"></textarea>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input value={form.sector} onChange={onChange("sector")} placeholder="Sector" className="px-3 py-2 rounded-xl border" />
          <input value={form.stage} onChange={onChange("stage")} placeholder="Stage (idea / seed / series A)" className="px-3 py-2 rounded-xl border" />
          <input value={form.fundingNeeded} onChange={onChange("fundingNeeded")} placeholder="Funding needed (optional)" className="px-3 py-2 rounded-xl border" />
        </div>

        <input value={form.tags} onChange={onChange("tags")} placeholder="Tags (comma separated)" className="w-full px-3 py-2 rounded-xl border" />

        <div className="flex items-center gap-3">
          <button type="submit" className="px-4 py-2 rounded-xl bg-violet-600 text-white" disabled={saving}>
            {saving ? "Creating…" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
