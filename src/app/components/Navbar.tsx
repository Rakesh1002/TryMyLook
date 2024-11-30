"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-cool-100"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex h-20 items-center justify-between px-8">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center py-2 hover:opacity-90 transition-opacity"
          >
            <Logo className="h-10 w-auto" />
          </Link>

          {/* Navigation Links */}
          {/* <div className="hidden md:flex items-center space-x-10">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#benefits">Benefits</NavLink>
            <NavLink href="#about">About</NavLink>
          </div> */}

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              href="/demo"
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-sm hover:shadow"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
