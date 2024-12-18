"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaHome,
  FaUsers,
  FaFutbol,
  FaTrophy,
  FaInbox,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { SettingsModal } from "../modals/SettingsModal";
import { useRouter } from "next/navigation";

import { logOut } from "../../../store/slices/isAuthSlice";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";

import { googleLogout } from "@react-oauth/google";

const navItems = [
  { icon: FaHome, label: "Overview", href: "/dashboard" },
  { icon: FaUsers, label: "Squad", href: "/dashboard/squad" },
  { icon: FaFutbol, label: "Matches", href: "/dashboard/matches" },
  { icon: FaTrophy, label: "Competitions", href: "/dashboard/competitions" },
  { icon: FaInbox, label: "Inbox", href: "/dashboard/inbox" },
  { icon: FaCog, label: "Settings", href: "/dashboard/settings" },
];

const Navigation = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const handleLogout = async () => {
    // Add logout logic here
    try {
      googleLogout();
      // Clear auth state in Redux
      dispatch(logOut());

      console.log("Logging out...");
      setIsSettingsOpen(false);

      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleConnectWallet = () => {
    // Add wallet connection logic here
    console.log("Connecting wallet...");
    setIsSettingsOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 self-center -translate-x-1/2 z-40 w-full max-w-4xl px-4"
      >
        <nav
          className={`
            relative rounded-bl-2xl rounded-br-2xl p-2 transition-all duration-300
            ${
              isScrolled
                ? "bg-[#00050c]/80 backdrop-blur-xl border-[#fca311]/10"
                : "bg-[#000a16] backdrop-blur-sm"
            }
          `}
        >
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between h-16 px-6">
            {/* Logo - Left */}
            <Link href="/dashboard">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-[#fca311]/10 rounded-lg flex items-center justify-center">
                  <FaTrophy className="text-white w-4 h-4" />
                </div>
                <span className="text-xl font-semibold text-white">Dugout</span>
              </motion.div>
            </Link>

            {/* Center Navigation */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-1 rounded-xl p-1">
                {navItems.slice(1, 5).map((item, index) => (
                  <Link key={index} href={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="group px-4 py-2 rounded-lg hover:bg-[#fca311] transition-all duration-300"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <item.icon className="w-4 h-4 text-[#e5e5e5] group-hover:text-black" />
                        <span className="text-xs font-medium text-[#e5e5e5] group-hover:text-black">
                          {item.label}
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Settings Button - Right */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#fca311] rounded-xl font-medium text-black text-sm"
            >
              <FaCog className="w-4 h-4" />
              <span>Settings</span>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-between h-14 px-4">
            <Link href="/dashboard">
              <span className="text-xl font-bold text-[#fca311]">Dugout</span>
            </Link>

            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSettingsOpen(true)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#fca311]"
              >
                <FaCog className="w-4 h-4 text-black" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#14213d]"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-4 h-4 text-white" />
                ) : (
                  <FaBars className="w-4 h-4 text-white" />
                )}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { x: 0 } : { x: "100%" }}
        className="fixed inset-y-0 right-0 z-40 w-full md:hidden bg-black/95 backdrop-blur-xl"
      >
        <div className="flex flex-col h-full pt-20 p-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-4 p-4 text-[#e5e5e5] hover:text-white hover:bg-[#14213d] rounded-xl transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-lg">{item.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onLogout={handleLogout}
        onConnectWallet={handleConnectWallet}
      />
    </>
  );
};

export default Navigation;
