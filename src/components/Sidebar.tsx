"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Map, Menu, X } from "lucide-react"; // ✅ Ikon dari Lucide

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Mobile Toggle */}
      <button className="lg:hidden p-2 fixed top-4 left-4 bg-gray-800 text-white rounded-md" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } lg:translate-x-0 lg:w-72`}
      >
        <h2 className="text-xl font-bold mb-5">📍 Tracking SOG</h2>
        <nav className="space-y-4">
          <Link href="/" className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-700">
            <Home size={20} />
            Dashboard
          </Link>
          <Link href="/tracking" className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-700">
            <Map size={20} />
            Tracking
          </Link>
        </nav>
      </aside>

      {/* Overlay untuk Mobile */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 lg:hidden" onClick={() => setIsOpen(false)} />}
    </div>
  );
}
