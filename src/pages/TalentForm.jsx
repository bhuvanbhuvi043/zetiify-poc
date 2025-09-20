// src/pages/TalentForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const TalentForm = () => {
  const [formData, setFormData] = useState({
    skills: "",
    experience: "",
    linkedin: "",
    portfolioUrl: "",
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
        category: "Talent",
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    alert("Talent profile saved!");
    navigate("/profile");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-soft">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">
        Talent Profile
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="skills"
          placeholder="Your Skills (e.g., React, Marketing)"
          className="p-3 border rounded-lg"
          value={formData.skills}
          onChange={handleChange}
        />
        <input
          type="text"
          name="experience"
          placeholder="Experience (e.g., 3 years)"
          className="p-3 border rounded-lg"
          value={formData.experience}
          onChange={handleChange}
        />
        <input
          type="url"
          name="linkedin"
          placeholder="LinkedIn Profile URL"
          className="p-3 border rounded-lg"
          value={formData.linkedin}
          onChange={handleChange}
        />
        <input
          type="url"
          name="portfolioUrl"
          placeholder="Portfolio / GitHub / Behance"
          className="p-3 border rounded-lg"
          value={formData.portfolioUrl}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="px-5 py-3 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700"
        >
          Save Talent Profile
        </button>
      </form>
    </div>
  );
};

export default TalentForm;
