"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRemainingDemos } from "../actions/useRemainingDemo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const { remainingDemos } = useRemainingDemos();

  const isOnDemoPage = pathname === "/demo";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById("mobile-menu");
      if (menu && !menu.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-cool-100"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center py-2 hover:opacity-90 transition-opacity"
          >
            <Logo className="h-10 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {session?.user && (
              <>
                <div className="flex items-center gap-3 text-cool-600">
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-8 h-8 rounded-full border-2 border-primary-100"
                      width={32}
                      height={32}
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium">{session.user.name}</span>
                    <span className="text-sm text-cool-500">
                      {remainingDemos} demos remaining
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-cool-600 hover:text-white hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-500 rounded-lg px-4 py-2 font-medium transition-all duration-200 border border-cool-300"
                >
                  Sign Out
                </button>
              </>
            )}
            {!isOnDemoPage && (
              <Link
                href="/demo"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2.5 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Try Demo
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-cool-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-cool-600" />
            ) : (
              <Menu className="w-6 h-6 text-cool-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              className="md:hidden absolute top-20 inset-x-0 bg-white/95 backdrop-blur-sm border-b border-cool-100 shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 py-6 space-y-4">
                {session?.user && (
                  <>
                    <div className="flex items-center gap-3 text-cool-600 pb-4 border-b border-cool-100">
                      {session.user.image && (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || "User"}
                          className="w-10 h-10 rounded-full border-2 border-primary-100"
                          width={40}
                          height={40}
                        />
                      )}
                      <span className="font-medium">{session.user.name}</span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-cool-600 hover:text-white hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-500 rounded-lg font-medium transition-all duration-200"
                    >
                      Sign Out
                    </button>
                  </>
                )}
                {!isOnDemoPage && (
                  <Link
                    href="/demo"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Try Demo
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
