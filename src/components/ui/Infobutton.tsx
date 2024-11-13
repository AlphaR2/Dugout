"use client";
import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";

interface InfoButtonProps {
  onClick: () => void;
  pulse?: boolean;
}

const InfoButton = ({ onClick, pulse = true }: InfoButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 1 }}
      animate={
        pulse
          ? {
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 0 0 rgba(252, 163, 17, 0.4)",
                "0 0 0 10px rgba(252, 163, 17, 0)",
              ],
            }
          : {}
      }
      transition={{
        repeat: pulse ? Infinity : 0,
        duration: 2,
      }}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#fca311] rounded-full flex items-center justify-center shadow-lg hover:bg-[#fca311]/90 transition-colors"
    >
      <FaInfoCircle className="w-6 h-6 text-black" />
    </motion.button>
  );
};

export default InfoButton;
