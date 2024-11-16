"use client";

import { useState, useEffect } from "react";
import { FaTrophy, FaUsers, FaSpinner } from "react-icons/fa";
import { GiSoccerBall } from "react-icons/gi";
import {
  ClubData,
  ValidationErrors,
  OnboardResponse,
} from "../../../types/football";

// Types
interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Constants
const POPULAR_CLUBS = [
  "Manchester United",
  "Real Madrid",
  "Barcelona",
  "Liverpool",
  "Bayern Munich",
  "PSG",
  "Manchester City",
  "Chelsea",
];

const STEPS = [
  {
    title: "Welcome to Dugout",
    description:
      "Create and manage your own fantasy club, compete in leagues, and become the ultimate manager!",
    icon: <GiSoccerBall className="text-4xl text-[#fca311]" />,
  },
  {
    title: "Create Your Club",
    description:
      "Choose a name that will be remembered throughout history.",
    icon: <FaUsers className="text-4xl text-[#fca311]" />,
  },
  {
    title: "You're All Set!",
    description:
      "Start by exploring the dashboard or joining a competition.",
    icon: <FaTrophy className="text-4xl text-[#fca311]" />,
  },
];

// Animation variants
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 20, stiffness: 300 },
  },
  exit: { opacity: 0, scale: 0.95 },
};

const contentVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { x: -20, opacity: 0 },
};

// Utility functions
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const useWindowHeight = () => {
  const [maxHeight, setMaxHeight] = useState("85vh");

  useEffect(() => {
    const updateMaxHeight = () => {
      const vh = window.innerHeight * 0.85;
      setMaxHeight(`${vh}px`);
    };

    updateMaxHeight();
    window.addEventListener("resize", updateMaxHeight);
    return () => window.removeEventListener("resize", updateMaxHeight);
  }, []);

  return maxHeight;
};

// Custom button component
const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  isLoading = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  isLoading?: boolean;
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center justify-center";
  const variants = {
    primary: "bg-[#fca311] hover:bg-[#fca311]/90 text-black",
    secondary: "border border-white/10 text-white hover:bg-white/5",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${(disabled || isLoading) && "opacity-50 cursor-not-allowed"}
      `}
    >
      {isLoading && <FaSpinner className="animate-spin mr-2" />}
      {children}
    </button>
  );
};

// Form input component
const FormInput = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  type?: string;
  maxLength?: number;
}) => (
  <div>
    <label className="text-sm text-gray-400 block mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className="w-full px-3 py-2 bg-[#000a16] border border-white/10 rounded-lg text-white focus:border-[#fca311] outline-none transition-colors"
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export {
  type OnboardingModalProps,
  type ClubData,
  type ValidationErrors,
  type OnboardResponse,
  POPULAR_CLUBS,
  STEPS,
  modalVariants,
  contentVariants,
  generateSlug,
  useWindowHeight,
  Button,
  FormInput,
};
