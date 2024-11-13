"use client";
import { motion } from "framer-motion";
import { FaTwitter, FaDiscord, FaTelegram, FaTrophy } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaDiscord, href: "#", label: "Discord" },
    { icon: FaTelegram, href: "#", label: "Telegram" },
  ];

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { label: "How it Works", href: "/how-it-works" },
        { label: "Draft Groups", href: "/groups" },
        { label: "Live Matches", href: "/matches" },
        { label: "Leaderboard", href: "/leaderboard" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Rules", href: "/rules" },
        { label: "Scoring System", href: "/scoring" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="bg-[#000610]/90 border-t border-[#fca311]/10">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2"
              >
                <div className="w-10 h-10 bg-[#fca311]/10 rounded-lg flex items-center justify-center">
                  <FaTrophy className="w-5 h-5 text-[#fca311]" />
                </div>
                <span className="text-2xl font-bold text-white">
                  Dug<span className="text-[#fca311]">out</span>
                </span>
              </motion.div>
            </Link>
            <p className="text-[#e5e5e5]/70">
              Step into the technical area. Draft your dream squad and prove
              your managerial expertise.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 bg-[#14213d] rounded-lg flex items-center justify-center group transition-colors hover:bg-[#fca311]/10"
                >
                  <social.icon className="w-5 h-5 text-[#e5e5e5] group-hover:text-[#fca311] transition-colors" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-bold mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-[#e5e5e5]/70 hover:text-[#fca311] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section */}
          <div>
            <h3 className="text-white font-bold mb-6">Join the Team</h3>
            <p className="text-[#e5e5e5]/70 mb-4">
              Stay updated with the latest features and releases.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-[#14213d] rounded-lg border border-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#fca311]/50 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 w-full px-4 py-3 bg-[#fca311] hover:bg-[#fca311]/90 rounded-lg font-bold text-black transition-colors"
                >
                  Subscribe
                </motion.button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-[#fca311]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#e5e5e5]/50 text-sm">
              © {currentYear} Dugout. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/terms"
                className="text-[#e5e5e5]/50 hover:text-[#fca311] transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-[#e5e5e5]/50 hover:text-[#fca311] transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/contact"
                className="text-[#e5e5e5]/50 hover:text-[#fca311] transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
