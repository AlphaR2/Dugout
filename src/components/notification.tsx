// components/ui/Notification.tsx
"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaTimes, FaInfoCircle } from "react-icons/fa";

interface NotificationProps {
  message: string;
  status: "error" | "success" | "info";
  switchShowOff: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  status,
  switchShowOff,
}) => {
  const router = useRouter();

  // Configure status-based styles
  const statusConfig = {
    error: {
      bgColor: "bg-[#14213d]",
      borderColor: "border-red-500",
      icon: FaTimesCircle,
      iconColor: "text-red-500",
      progressColor: "bg-red-500/20",
    },
    success: {
      bgColor: "bg-[#14213d]",
      borderColor: "border-[#fca311]",
      icon: FaCheckCircle,
      iconColor: "text-[#fca311]",
      progressColor: "bg-[#fca311]/20",
    },
    info: {
      bgColor: "bg-[#14213d]",
      borderColor: "border-blue-500",
      icon: FaInfoCircle,
      iconColor: "text-blue-500",
      progressColor: "bg-blue-500/20",
    },
  };

  const currentStatus = statusConfig[status];

  useEffect(() => {
    const timer = setTimeout(switchShowOff, 5000);
    return () => clearTimeout(timer);
  }, [switchShowOff]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        className="fixed top-4 right-4 z-50 min-w-[320px] max-w-md"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`
            ${currentStatus.bgColor}
            border ${currentStatus.borderColor}
            flex items-center gap-3 p-4 rounded-xl shadow-lg backdrop-blur-sm
            transform transition-all duration-300 ease-in-out
            cursor-pointer relative overflow-hidden
          `}
          onClick={switchShowOff}
          role="alert"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent" />

          {/* Content Container */}
          <div className="relative flex items-center w-full gap-3">
            {/* Icon */}
            <div className="flex-shrink-0">
              <currentStatus.icon 
                className={`${currentStatus.iconColor} text-xl`} 
              />
            </div>

            {/* Message */}
            <p className="text-white font-medium flex-grow">{message}</p>

            {/* Close Button */}
            <motion.button
              whileHover={{ rotate: 90 }}
              onClick={(e) => {
                e.stopPropagation();
                switchShowOff();
              }}
              className="flex-shrink-0 ml-2 text-white/80 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              <FaTimes className="text-xl" />
            </motion.button>
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 5, ease: "linear" }}
            className={`absolute bottom-0 left-0 right-0 h-1 ${currentStatus.progressColor} origin-left`}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification;

// Usage example:
import { useState } from 'react';

export const ShowNotification = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button 
        onClick={() => setShow(true)}
        className="bg-[#fca311] text-black px-4 py-2 rounded-xl"
      >
        Show Notification
      </button>

      {show && (
        <Notification
          message="Operation completed successfully!"
          status="success"
          switchShowOff={() => setShow(false)}
        />
      )}
    </div>
  );
};