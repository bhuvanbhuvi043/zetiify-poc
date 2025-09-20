// src/pages/FounderForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const FounderForm = () => {
  const [formData, setFormData] = useState({
    startupName: "",
    sector: "",
    stage: "",
    pitchDeckUrl: "",
    website: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    await setDoc(
      doc(db, "users", user.uid),
      {
        ...formData,
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        category: "Founder",
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    alert("Founder profile saved!");
    navigate("/profile");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-soft">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">
        Founder Profile
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="startupName"
          placeholder="Startup Name"
          className="p-3 border rounded-lg"
          value={formData.startupName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="sector"
          placeholder="Sector (e.g., FinTech, HealthTech)"
          className="p-3 border rounded-lg"
          value={formData.sector}
          onChange={handleChange}
        />
        <select
          name="stage"
          className="p-3 border rounded-lg"
          value={formData.stage}
          onChange={handleChange}
        >
          <option value="">Select Stage</option>
          <option value="Idea">Idea</option>
          <option value="Early">Early</option>
          <option value="Growth">Growth</option>
        </select>
        <input
          type="url"
          name="pitchDeckUrl"
          placeholder="Pitch Deck URL"
          className="p-3 border rounded-lg"
          value={formData.pitchDeckUrl}
          onChange={handleChange}
        />
        <input
          type="url"
          name="website"
          placeholder="Website URL"
          className="p-3 border rounded-lg"
          value={formData.website}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="px-5 py-3 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700"
        >
          Save Founder Profile
        </button>
      </form>
    </div>
  );
};

export default FounderForm;
