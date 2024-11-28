"use client";
import { motion } from "framer-motion";
// import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaTrophy,
  FaFutbol,
  FaChartLine,
  FaBars,
  FaTimes,
  // FaWallet,
} from "react-icons/fa";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Navigation = () => {
  // const router = useRouter;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 self-center  -translate-x-1/2 z-50 w-full max-w-4xl px-4"
      >
        <nav
          className={`
            relative rounded-bl-2xl rounded-br-2xl p-2 transition-all duration-300
            ${
              isScrolled
                ? "bg-[#00050c]/80 backdrop-blur-xl  border-[#fca311]/10"
                : "bg-[#000a16] backdrop-blur-sm"
            }
          `}
        >
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between h-16 px-6">
            {/* Logo - Left */}
            <Link href="/">
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
                {[
                  {
                    label: "Matches",
                    icon: FaFutbol,
                    href: "/",
                  },
                  {
                    label: "Leaders",
                    icon: FaChartLine,
                    href: "/",
                  },
                ].map((item, index) => (
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

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium  text-sm"
            >
              <WalletMultiButton
                className="flex rounded-3xl"
                style={{
                  backgroundColor: "#fca311",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-between h-14 px-4">
            <Link href="/">
              <span className="text-xl font-bold text-[#fca311]">Dugout</span>
            </Link>

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
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { x: 0 } : { x: "100%" }}
        className="fixed inset-y-0 right-0 z-40 w-full md:hidden bg-black/95 backdrop-blur-xl"
      >
        <div className="flex flex-col h-full pt-20 p-6">
          {[
            { label: "Active Groups", icon: FaTrophy, href: "/groups" },
            { label: "Live Matches", icon: FaFutbol, href: "/matches" },
            { label: "Leaderboard", icon: FaChartLine, href: "/leaderboard" },
          ].map((item, index) => (
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

          <div className="mt-auto border-t border-[#fca311]/10 pt-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center gap-2 p-4 bg-[#fca311] rounded-xl font-medium text-black"
            >
              <span>Get Started</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navigation;
