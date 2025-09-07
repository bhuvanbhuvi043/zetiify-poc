// src/pages/Chat.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Circle,
  Send,
  Phone,
  Video,
  MoreHorizontal,
  ArrowLeft,
} from "lucide-react";
import {
  collection,
  addDoc,
  query as qf,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import data from "../shared/mockData";
import { useAuth } from "../context/AuthContext";

function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

export default function Chat() {
  const { user, login } = useAuth();
  const [profiles, setProfiles] = useState(
    data.profiles.map((p) => ({
      uid: `mock-${p.id}`,
      displayName: p.name,
      role: p.role,
      sector: p.sector,
      photoURL: null,
      location: p.location || "",
    }))
  );

  const [activeUid, setActiveUid] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true); // mobile toggle
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([]);
  const [queryText, setQueryText] = useState("");
  const endRef = useRef(null);

  // Load users
  useEffect(() => {
    const q = qf(collection(db, "users"), orderBy("displayName", "asc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const arr = snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
        if (arr.length > 0) {
          setProfiles(arr);
          // auto-select first other user
          if (!activeUid) {
            const firstOther = arr.find((u) => u.uid !== user?.uid);
            setActiveUid(firstOther?.uid || null);
          }
        }
      },
      (err) => console.error("users snapshot error:", err)
    );
    return () => unsub();
  }, [user, activeUid]);

  // Active profile (the person I'm chatting with)
  const activeProfile = useMemo(
    () => profiles.find((p) => p.uid === activeUid) || null,
    [profiles, activeUid]
  );

  // Unique conversation id (always between 2 users)
  const conversationId = useMemo(() => {
    if (!user?.uid || !activeProfile?.uid) return null;
    if (user.uid === activeProfile.uid) return null; // ❌ block self chat
    return [user.uid, activeProfile.uid].sort().join("_");
  }, [user, activeProfile]);

  // Messages listener
  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      return;
    }
    const messagesColl = collection(
      db,
      "conversations",
      conversationId,
      "messages"
    );
    const q = qf(messagesColl, orderBy("createdAt", "asc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const msgs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setMessages(msgs);
      },
      (err) => {
        console.error("messages snapshot error:", err);
        setMessages([]);
      }
    );
    return () => unsub();
  }, [conversationId]);

  // Auto-scroll
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Filtered list (excluding me)
  const filtered = useMemo(() => {
    const q = queryText.trim().toLowerCase();
    return profiles.filter(
      (p) =>
        p.uid !== user?.uid && // ✅ exclude myself
        ((p.displayName || "").toLowerCase().includes(q) ||
          (p.role || "").toLowerCase().includes(q) ||
          (p.sector || "").toLowerCase().includes(q) ||
          (p.location || "").toLowerCase().includes(q))
    );
  }, [profiles, queryText, user]);

  const handleSelectProfile = (uid) => {
    if (uid === user?.uid) return; // block selecting myself
    setActiveUid(uid);
    setShowSidebar(false);
  };

  const handleSend = async () => {
    const msg = draft.trim();
    if (!msg || !conversationId) return;
    if (!user) return login();

    try {
      await addDoc(
        collection(db, "conversations", conversationId, "messages"),
        {
          text: msg,
          senderId: user.uid,
          senderName: user.displayName || "User",
          senderPhoto: user.photoURL || null,
          createdAt: serverTimestamp(),
        }
      );
      setDraft("");
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

return (
  <div className="h-[calc(100vh-64px)]">
    <div className="mx-auto max-w-7xl h-full">
      <div className="grid grid-cols-12 h-full border border-violet-100 rounded-2xl overflow-hidden shadow-soft bg-white">

        {/* Sidebar (scrolls independently) */}
        <aside
          className={classNames(
            "border-r border-violet-100 bg-white flex flex-col min-h-0", // ✅ min-h-0 ensures scrolling works
            "sm:col-span-4 lg:col-span-3",
            showSidebar ? "col-span-12 sm:col-span-4" : "hidden sm:flex"
          )}
        >
          <div className="p-3 border-b border-violet-100 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={18} />
              <input
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                placeholder="Search people, sectors..."
                className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </div>
          </div>

          {/* ✅ Sidebar scrollable */}
          <div className="flex-1 overflow-y-auto">
            {filtered.map((p) => (
              <button
                key={p.uid}
                onClick={() => handleSelectProfile(p.uid)}
                className={classNames(
                  "w-full text-left px-3 py-3 border-b border-gray-50 hover:bg-violet-50/60 transition",
                  activeUid === p.uid ? "bg-violet-50" : ""
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {p.photoURL ? (
                      <img
                        src={p.photoURL}
                        alt={p.displayName}
                        className="h-9 w-9 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-xl bg-violet-600 text-white grid place-items-center text-sm font-bold">
                        {(p.displayName || "U")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                    )}
                    <span className="absolute -right-0 -bottom-0">
                      <Circle
                        size={12}
                        className="text-emerald-500 fill-emerald-500 rounded-full"
                      />
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {p.displayName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {p.role} • {p.sector}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Chat area (scrolls independently) */}
        <section
          className={classNames(
            "flex flex-col h-full min-h-0", // ✅ min-h-0 fixes overflow
            "sm:col-span-8 lg:col-span-9",
            showSidebar ? "hidden sm:flex" : "col-span-12 sm:col-span-8"
          )}
        >
          {/* Header */}
          <div className="h-14 px-3 sm:px-4 border-b border-violet-100 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                className="sm:hidden p-2 rounded-md hover:bg-violet-50"
                onClick={() => setShowSidebar(true)}
              >
                <ArrowLeft size={18} />
              </button>

              {activeProfile && (
                <div className="h-9 w-9 rounded-xl bg-violet-600 text-white grid place-items-center text-sm font-bold overflow-hidden">
                  {activeProfile.photoURL ? (
                    <img
                      src={activeProfile.photoURL}
                      alt={activeProfile.displayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    (activeProfile.displayName || "U")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                  )}
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900">
                  {activeProfile?.displayName || "Select a person"}
                </p>
                <p className="text-xs text-gray-500">
                  {activeProfile?.role} • {activeProfile?.sector}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl hover:bg-violet-50"><Phone size={18} /></button>
              <button className="p-2 rounded-xl hover:bg-violet-50"><Video size={18} /></button>
              <button className="p-2 rounded-xl hover:bg-violet-50"><MoreHorizontal size={18} /></button>
            </div>
          </div>

          {/* ✅ Messages scrollable */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-white to-violet-50 min-h-0">
            {messages.map((m) => {
              const isSelf = m.senderId === user?.uid;
              return (
                <div
                  key={m.id}
                  className={classNames("flex", isSelf ? "justify-end" : "justify-start")}
                >
                  <div
                    className={classNames(
                      "max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow break-words",
                      isSelf
                        ? "bg-violet-600 text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                    )}
                  >
                    <p>{m.text}</p>
                    {m.createdAt?.seconds && (
                      <span className="block text-[10px] mt-1 opacity-70 text-right">
                        {new Date(m.createdAt.seconds * 1000).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={endRef} />
          </div>

          {/* Composer (fixed, not affected by scroll) */}
          {activeProfile && (
            <div className="border-t border-violet-100 p-3 bg-white flex-shrink-0">
              <div className="flex items-end gap-2">
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={1}
                  placeholder="Write a message..."
                  className="flex-1 resize-none rounded-2xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <button
                  onClick={handleSend}
                  className="h-10 px-4 rounded-2xl bg-violet-600 text-white font-semibold hover:bg-violet-700 inline-flex items-center gap-2"
                >
                  <Send size={16} /> Send
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  </div>
);
}
