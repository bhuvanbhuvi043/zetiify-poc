// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { uid } = useParams(); // ✅ get uid from URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let targetUid = uid;
        if (!targetUid) {
          // Fallback to self if no uid in URL
          const user = auth.currentUser;
          if (!user) {
            navigate("/");
            return;
          }
          targetUid = user.uid;
        }

        const ref = doc(db, "users", targetUid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();

          // ✅ Normalize arrays
          data.publicLinks = Array.isArray(data.publicLinks)
            ? data.publicLinks
            : data.publicLinks
            ? [data.publicLinks]
            : [];

          data.pastInvestments = Array.isArray(data.pastInvestments)
            ? data.pastInvestments
            : [];

          setUserData(data);
        } else {
          navigate("/onboarding");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [uid, navigate]);

  if (loading)
    return <div className="flex items-center justify-center h-screen">Loading...</div>;

  if (!userData)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        No profile found. Please complete onboarding.
      </div>
    );

  const handleEdit = () => {
    if (userData.category === "Investor") navigate("/investor");
    if (userData.category === "Founder") navigate("/founder");
    if (userData.category === "Talent") navigate("/talent");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-soft">
      {/* Header */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={userData.photoURL}
          alt="profile"
          className="w-20 h-20 rounded-full border object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{userData.displayName || userData.name}</h2>
          <p className="text-gray-600">{userData.email}</p>
          <p className="text-purple-600 font-medium">{userData.category}</p>
        </div>
      </div>

      {/* --- Basic Info --- */}
      {userData.basicInfo && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Basic Info</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {Object.entries(userData.basicInfo).map(([key, value]) =>
              value ? (
                <li key={key}>
                  <strong>{key.replace(/([A-Z])/g, " $1")}:</strong>{" "}
                  {typeof value === "string" ? value : JSON.stringify(value)}
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}

      {/* --- Category Sections --- */}
      {userData.category === "Investor" && (
        <>
          <h3 className="text-lg font-semibold mb-2">Investment Preferences</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {userData.investmentPreferences?.sectors?.length > 0 && (
              <li>
                <strong>Sectors:</strong> {userData.investmentPreferences.sectors.join(", ")}
              </li>
            )}
            {userData.investmentPreferences?.stages?.length > 0 && (
              <li>
                <strong>Stages:</strong> {userData.investmentPreferences.stages.join(", ")}
              </li>
            )}
            {userData.investmentPreferences?.geographies?.length > 0 && (
              <li>
                <strong>Geographies:</strong>{" "}
                {userData.investmentPreferences.geographies.join(", ")}
              </li>
            )}
          </ul>

          {userData.pastInvestments.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-4 mb-2">Past Investments</h3>
              <ul className="space-y-2">
                {userData.pastInvestments.map((inv, i) => (
                  <li
                    key={i}
                    className="p-2 border rounded-lg bg-gray-50 text-sm text-gray-700"
                  >
                    <strong>{inv.companyName}</strong> — {inv.stage} ({inv.year})
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}

      {userData.category === "Founder" && (
        <>
          <h3 className="text-lg font-semibold mb-2">Startup Details</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {userData.startupName && <li><strong>Startup:</strong> {userData.startupName}</li>}
            {userData.sector && <li><strong>Sector:</strong> {userData.sector}</li>}
            {userData.stage && <li><strong>Stage:</strong> {userData.stage}</li>}
            {userData.website && (
              <li>
                <a href={userData.website} target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
                  Visit Website
                </a>
              </li>
            )}
          </ul>
        </>
      )}

      {userData.category === "Talent" && (
        <>
          <h3 className="text-lg font-semibold mb-2">Talent Details</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {userData.skills && <li><strong>Skills:</strong> {userData.skills}</li>}
            {userData.experience && <li><strong>Experience:</strong> {userData.experience}</li>}
            {userData.linkedin && (
              <li>
                <a href={userData.linkedin} target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
                  LinkedIn Profile
                </a>
              </li>
            )}
            {userData.portfolioUrl && (
              <li>
                <a href={userData.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
                  Portfolio
                </a>
              </li>
            )}
          </ul>
        </>
      )}

      {/* --- Public Links --- */}
      {userData.publicLinks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Public Links</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {userData.publicLinks.map((link, i) => (
              <li key={i}>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* --- Edit Button --- */}
      <div className="mt-6">
        <button
          onClick={handleEdit}
          className="px-5 py-2 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
