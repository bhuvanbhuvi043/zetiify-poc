// src/pages/Settings.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({ visible: true });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, "users", user.uid)).then(snap => {
      if (snap.exists()) setSettings(prev => ({ ...prev, ...snap.data() }));
    }).catch(console.error);
  }, [user]);

  const toggleVisibility = async () => {
    if (!user) return;
    try {
      await updateDoc(doc(db, "users", user.uid), { visible: !settings.visible });
      setSettings(s => ({ ...s, visible: !s.visible }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <div className="p-6">Sign in to access settings</div>;

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <div className="bg-white p-6 rounded-2xl shadow-soft border space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Profile visibility</p>
            <p className="text-xs text-gray-500">Control whether others can see your profile in search results</p>
          </div>
          <button className="px-4 py-2 rounded-xl border" onClick={toggleVisibility}>
            {settings.visible ? "Visible" : "Hidden"}
          </button>
        </div>

        <div className="pt-4 border-t">
          <button className="px-4 py-2 rounded-xl bg-red-500 text-white" onClick={handleLogout}>Sign out</button>
        </div>
      </div>
    </div>
  );
}
