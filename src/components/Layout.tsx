"use client";

import { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "next-themes";  // Import next-themes
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";  // Icon untuk switch tema

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();  // Ambil tema saat ini

  // Hindari perbedaan antara SSR & Client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -250 }}
          animate={{ x: isOpen ? 0 : -250 }}
          transition={{ duration: 0.3 }}
          className="fixed lg:relative w-64 bg-gray-900 text-white p-5 h-full"
        >
          <button className="lg:hidden text-white" onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <nav>
            <ul className="space-y-3">
              <li><a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">Home</a></li>
              <li><a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">Tracking</a></li>
              <li><a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">Settings</a></li>
            </ul>
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-800">
          {/* Navbar */}
          <header className="flex justify-between items-center bg-white dark:bg-gray-900 shadow p-4 rounded-lg mb-4">
            <button className="lg:hidden" onClick={() => setIsOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Tracking Dashboard</h1>

            {/* Tombol Ganti Tema */}
            {mounted && (
              <Button variant="outline" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            )}
          </header>

          {/* Children (Halaman dalam dashboard) */}
          <div>{children}</div>
        </main>
      </div>
    </ThemeProvider>
  );
}
