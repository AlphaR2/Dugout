"use client";
import { FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="p-4 bg-[#14213d]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-gray-400 text-sm">© 2024 Fantasy Dugout</div>

        <div className="flex items-center gap-4">
          <a
            href="https://x.com/Dugout_Fantasy?t=68DPIlvInP2xcsoMGjhehw&s=09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#fca311] transition-colors"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://github.com/AlphaR2/Dugout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#fca311] transition-colors"
          >
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
