// src/pages/Onboarding.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function Onboarding() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/");
    const ref = doc(db, "users", user.uid);
    getDoc(ref).then((snap) => {
      if (snap.exists() && snap.data().category) {
        navigate("/dashboard"); // already onboarded
      } else {
        setLoading(false);
      }
    });
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Calculate profile completeness
  const calcCompleteness = () => {
    let required = ["category"];
    if (category === "Founder") required.push("startupName", "sector", "stage");
    if (category === "Talent") required.push("skills", "experience");
    if (category === "Investor") required.push("thesis", "ticketMin", "ticketMax");

    const filled = required.filter((f) => formData[f] && formData[f].trim() !== "").length;
    return Math.round((filled / required.length) * 100);
  };

  const handleSave = async () => {
    if (!user) return;
    const completeness = calcCompleteness();

    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        category,
        ...formData,
        completeness,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    navigate("/dashboard");
  };

  const handleSkip = async () => {
    // ✅ Check minimum fields before allowing skip
    let required = [];
    if (category === "Founder") required = ["startupName", "sector"];
    if (category === "Talent") required = ["skills", "experience"];
    if (category === "Investor") required = ["thesis", "ticketMin"];

    const missing = required.filter((f) => !formData[f] || formData[f].trim() === "");
    if (missing.length > 0) {
      alert(`Please fill at least: ${missing.join(", ")}`);
      return;
    }

    await handleSave(); // will mark profile incomplete but with required fields
  };

  if (loading) return <div className="flex h-screen items-center justify-center">Loading…</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-violet-50 p-6">
      {step === 1 && (
        <>
          <h1 className="text-2xl font-bold mb-4">Welcome to Zetiify 🚀</h1>
          <p className="text-gray-600 mb-6">Choose your role to continue</p>
          <div className="flex gap-4 mb-6">
            {["Investor", "Founder", "Talent"].map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  setCategory(opt);
                  setStep(2);
                }}
                className={`px-6 py-3 rounded-xl border-2 ${
                  category === opt ? "bg-purple-600 text-white" : "bg-white"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <div className="bg-white p-6 rounded-xl shadow max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">{category} Profile</h2>

          {category === "Founder" && (
            <>
              <input name="startupName" placeholder="Startup Name" onChange={handleChange} className="w-full border p-2 mb-3" />
              <input name="sector" placeholder="Sector" onChange={handleChange} className="w-full border p-2 mb-3" />
              <select name="stage" onChange={handleChange} className="w-full border p-2 mb-3">
                <option value="">Stage</option>
                <option value="Idea">Idea</option>
                <option value="Early">Early</option>
                <option value="Growth">Growth</option>
              </select>
            </>
          )}

          {category === "Talent" && (
            <>
              <input name="skills" placeholder="Skills" onChange={handleChange} className="w-full border p-2 mb-3" />
              <input name="experience" placeholder="Experience" onChange={handleChange} className="w-full border p-2 mb-3" />
            </>
          )}

          {category === "Investor" && (
            <>
              <input name="thesis" placeholder="Investment Thesis" onChange={handleChange} className="w-full border p-2 mb-3" />
              <input name="ticketMin" placeholder="Min Ticket Size" onChange={handleChange} className="w-full border p-2 mb-3" />
              <input name="ticketMax" placeholder="Max Ticket Size" onChange={handleChange} className="w-full border p-2 mb-3" />
            </>
          )}

          <div className="flex justify-between mt-4">
            <button onClick={handleSave} className="px-4 py-2 bg-purple-600 text-white rounded-lg">
              Save & Continue
            </button>
            <button onClick={handleSkip} className="px-4 py-2 bg-gray-200 rounded-lg">
              Skip for now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
