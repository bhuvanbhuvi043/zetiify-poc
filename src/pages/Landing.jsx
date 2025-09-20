// src/pages/Landing.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Coins,
  Lightbulb,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Landing() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (i) => {
    setOpenFAQ(openFAQ === i ? null : i);
  };

  const faqs = [
    {
      q: "What is Zetiify?",
      a: "Zetiify is India’s first all-in-one investment app where founders and investors connect — from idea stage to pre-IPO funding.",
    },
    {
      q: "Who can use Zetiify?",
      a: "Founders, startups, and entrepreneurs looking for funding, as well as angel investors, VCs, PE funds, hedge funds, and talent seeking opportunities.",
    },
    {
      q: "Is Zetiify only for tech startups?",
      a: "No. Zetiify is sector-agnostic. Any founder with a bold idea or growing business can connect with relevant investors.",
    },
    {
      q: "How is Zetiify different from LinkedIn or other networking platforms?",
      a: "Unlike general networking apps, Zetiify is purpose-built for fundraising and deal-making. We match investors with startups directly based on funding needs and theses.",
    },
    {
      q: "Do I have to pay to join Zetiify?",
      a: "No. Signing up and creating your account is free. Premium features may be introduced later.",
    },
    {
      q: "Can Zetiify help me learn about fundraising?",
      a: "Yes. The platform provides guidance, connections, and insights on fundraising best practices for founders.",
    },
    {
      q: "How do investors benefit from Zetiify?",
      a: "Investors discover curated startups that fit their thesis, saving time and giving them access to a wider pool of opportunities.",
    },
    {
      q: "Is Zetiify available all over India?",
      a: "Yes. While we focus on empowering Tier 2 and Tier 3 cities, Zetiify is open to founders and investors across India and globally.",
    },
    {
      q: "When will Zetiify launch?",
      a: "The platform is currently in beta. Full public launch will roll out soon — sign up now to be part of the early ecosystem.",
    },
    {
      q: "How do I get started?",
      a: "Simply create your free account on Zetiify, complete your profile, and explore opportunities or start chatting with founders and investors.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-violet-50 to-white text-gray-900">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">
          From Idea Stage to Pre IPO – Fund Your Startup in One Click.
        </h1>
        <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
          India’s First App Where Angel Investors, Venture Capital, Private
          Equity & Hedge Funds Live Together — All in Just One App.
        </p>
        <Link
          to="/dashboard"
          className="px-6 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 inline-flex items-center gap-2"
        >
          Get Started <ArrowRight size={18} />
        </Link>

        {/* Partner Logos */}
        <div className="mt-10 flex justify-center gap-8 opacity-70">
          <span>Google</span>
          <span>Facebook</span>
          <span>YouTube</span>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Turning Vision Into Impact
          </h2>
          <p className="text-gray-600">
            Connecting Founders & Investors — a trusted space where bold ideas
            find the right backers, and investors discover opportunities worth
            supporting.
          </p>
          <p className="text-gray-600">
            Shaping the Future — startups get faster access to capital,
            mentorship, and networks — accelerating innovation globally.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 text-center bg-violet-600 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Create your account today
        </h2>
        <p className="mb-4">…and get started for free!</p>
        <Link
          to="/dashboard"
          className="px-6 py-3 rounded-xl bg-white text-violet-700 font-semibold hover:bg-violet-100 inline-flex items-center gap-2"
        >
          Get Started <ArrowRight size={18} />
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Our Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">Mobile App</h3>
            <p className="text-sm text-gray-600">
              Founders can pitch anytime, and investors can discover instantly.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">Desktop App</h3>
            <p className="text-sm text-gray-600">
              Manage profiles, review opportunities, and track investments.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">Multiple Users</h3>
            <p className="text-sm text-gray-600">
              Teams, co-founders, and investors collaborate seamlessly.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl bg-white shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex justify-between items-center px-4 py-3 font-medium text-left"
              >
                {item.q}
                {openFAQ === i ? (
                  <ChevronUp size={18} className="text-violet-600" />
                ) : (
                  <ChevronDown size={18} className="text-violet-600" />
                )}
              </button>
              {openFAQ === i && (
                <div className="px-4 pb-4 text-sm text-gray-600">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
          <div>
            <h4 className="text-white font-semibold mb-3">Product</h4>
            <ul className="space-y-1">
              <li>
                <Link to="/dashboard">Features</Link>
              </li>
              <li>
                <Link to="#">Pricing</Link>
              </li>
              <li>
                <Link to="#">Case Studies</Link>
              </li>
              <li>
                <Link to="#">Reviews</Link>
              </li>
              <li>
                <Link to="#">Updates</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-1">
              <li>
                <Link to="#">About</Link>
              </li>
              <li>
                <Link to="#">Contact</Link>
              </li>
              <li>
                <Link to="#">Careers</Link>
              </li>
              <li>
                <Link to="#">Culture</Link>
              </li>
              <li>
                <Link to="#">Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Support</h4>
            <ul className="space-y-1">
              <li>
                <Link to="#">Getting Started</Link>
              </li>
              <li>
                <Link to="#">Help Center</Link>
              </li>
              <li>
                <Link to="#">Report a Bug</Link>
              </li>
              <li>
                <Link to="#">Chat Support</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Downloads</h4>
            <ul className="space-y-1">
              <li>
                <Link to="#">iOS</Link>
              </li>
              <li>
                <Link to="#">Android</Link>
              </li>
              <li>
                <Link to="#">Mac</Link>
              </li>
              <li>
                <Link to="#">Windows</Link>
              </li>
              <li>
                <Link to="#">Chrome</Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center text-xs mt-6">
          © {new Date().getFullYear()} Zetiify. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
