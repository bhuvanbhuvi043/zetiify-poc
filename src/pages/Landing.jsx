import React from "react";
import { Link } from "react-router-dom";
import { Users, Coins, Lightbulb, ArrowRight, Shield, MessageSquare } from "lucide-react";

export default function Landing() {
  const pill = "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold";

  return (
    <div className="bg-gradient-to-b from-violet-50 to-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={pill}><Coins size={14}/> Investors</span>
              <span className={pill}><Lightbulb size={14}/> Founders</span>
              <span className={pill}><Users size={14}/> Talent</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              Connect Money, Ideas & People — in one place.
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
              Zetiify is a new-age network where investors discover vetted projects,
              founders find capital & co-founders, and talented people join great missions.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/dashboard" className="px-4 py-2 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 inline-flex items-center gap-2">
                Explore Opportunities <ArrowRight size={16}/>
              </Link>
              <Link to="/chat" className="px-4 py-2 rounded-xl bg-white border border-violet-200 text-violet-700 font-semibold hover:bg-violet-50 inline-flex items-center gap-2">
                <MessageSquare size={16}/> Open Messages
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-violet-200/30 blur-3xl rounded-full"></div>
            <div className="relative grid gap-4">
              <div className="p-4 rounded-2xl bg-white shadow-soft">
                <h3 className="font-semibold text-gray-900">Matchmaking Engine</h3>
                <p className="text-gray-600 text-sm">We map investor theses to founder needs, fast.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white shadow-soft">
                <h3 className="font-semibold text-gray-900">Signal-Rich Profiles</h3>
                <p className="text-gray-600 text-sm">Traction, markets, funding stage, team, and more.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white shadow-soft">
                <h3 className="font-semibold text-gray-900">Advanced Messaging</h3>
                <p className="text-gray-600 text-sm">Real-time chat, purpose-built for dealmaking.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-violet-600 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">How Zetiify Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-violet-700 rounded-xl shadow">
              <Coins size={32} className="mx-auto mb-3"/>
              <h3 className="font-semibold">For Investors</h3>
              <p className="text-sm mt-2">Discover curated startups & connect directly with founders.</p>
            </div>
            <div className="p-6 bg-violet-700 rounded-xl shadow">
              <Lightbulb size={32} className="mx-auto mb-3"/>
              <h3 className="font-semibold">For Founders</h3>
              <p className="text-sm mt-2">Pitch, fundraise, and find co-founders in one place.</p>
            </div>
            <div className="p-6 bg-violet-700 rounded-xl shadow">
              <Users size={32} className="mx-auto mb-3"/>
              <h3 className="font-semibold">For Talent</h3>
              <p className="text-sm mt-2">Join innovative projects that match your skills & passion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Ready to start your journey?</h2>
        <p className="text-gray-600 mb-6">Sign in, explore profiles, and start building connections today.</p>
        <Link to="/chat" className="px-6 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 inline-flex items-center gap-2">
          Get Started <ArrowRight size={18}/>
        </Link>
      </section>
    </div>
  );
}
