// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const [checked, setChecked] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (!snap.exists() || !snap.data().category) {
          setNeedsOnboarding(true);
        }
      }
      setChecked(true);
    };
    check();
  }, [user]);

  if (!user) return <Navigate to="/" />;
  if (!checked) return <div>Loading…</div>;
  if (needsOnboarding) return <Navigate to="/onboarding" />;

  return children;
}
