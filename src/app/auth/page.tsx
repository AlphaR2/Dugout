"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { setIsAuth } from "../../../store/slices/isAuthSlice";
import Notification from "@/components/notification";
import { baseURL } from "../../../utils/config/baseUrl";
import {
  saveDataToLocalStorage,
  getDataFromLocalStorage,
} from "../../../utils/localStorage";
import { NotificationState } from "../../../types/football";
import { AnimatePresence } from "framer-motion";

// Types
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  businesses: any[];
  createdAt: string;
  phoneNumber: string | null;
  updatedAt: string;
}

interface LoginResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
    user: User;
  };
}

// Animation variants
const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
};

const featureAnimation = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, staggerChildren: 0.1 },
  },
};

const features = [
  "Create your club and join competitive leagues",
  "Draft and develop players",
  "Compete with managers worldwide",
] as const;

export default function AuthPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.isAuth.isAuth
  );

  const [notification, setNotification] = useState<NotificationState>({
    message: "",
    status: "error",
    show: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [authStep, setAuthStep] = useState<
    "idle" | "google-auth" | "server-auth"
  >("idle");

  // Notification helper
  const showNotification = useCallback(
    (message: string, status: "success" | "error") => {
      setNotification({ message, status, show: true });
    },
    []
  );

  // Authentication check effect
  useEffect(() => {
    if (isAuthenticated) {
      const role = getDataFromLocalStorage("role");
      const redirectPath = role === "admin" ? "/admin" : "/dashboard";
      router.push(redirectPath);
    }
  }, [isAuthenticated, router]);

  // Google login handler
  const handleGoogleLogin = async (credential: any) => {
    if (!credential?.credential) {
      showNotification("Invalid credentials provided", "error");
      return;
    }

    try {
      setIsLoading(true);
      setAuthStep("google-auth");

      // Short delay to show the Google authentication step
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAuthStep("server-auth");
      const response = await fetch(`${baseURL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: credential.credential }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      showNotification("Successfully signed in!", "success");

      dispatch(
        setIsAuth({
          isAuth: true,
          accessToken: data.data.accessToken,
          user: {
            id: data.data.user.id,
            email: data.data.user.email,
            name: data.data.user.name,
          },
        })
      );

      saveDataToLocalStorage("onboard", "false");

      // Delayed redirect
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (error) {
      console.error("Authentication error:", error);
      showNotification(
        error instanceof Error ? error.message : "An unexpected error occurred",
        "error"
      );
    } finally {
      setIsLoading(false);
      setAuthStep("idle");
    }
  };

  // const getLoadingMessage = () => {
  //   switch (authStep) {
  //     case "google-auth":
  //       return "Authenticating with Google...";
  //     case "server-auth":
  //       return "Finalizing sign in...";
  //     default:
  //       return "Please wait...";
  //   }
  // };

  return (
    <motion.div className="min-h-screen bg-[#000610] flex" {...pageTransition}>
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex flex-1 bg-[#14213d] relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-[#fca311]/30 to-transparent"
        />

        <div className="relative z-10 flex flex-col justify-center px-16 py-12">
          <motion.div
            variants={featureAnimation}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            <h1 className="text-5xl font-bold text-white mb-8">
              Welcome to Dugout
            </h1>

            <div className="space-y-6">
              {features.map((feature) => (
                <motion.div
                  key={feature}
                  variants={featureAnimation}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-2 h-2 rounded-full bg-[#fca311] group-hover:scale-150 transition-transform" />
                  <span className="text-gray-300 text-lg group-hover:text-white transition-colors">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </div>

      {/* Right Side - Sign In */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#14213d] rounded-2xl p-8 shadow-xl"
          >
            <div className="text-center mb-8">
              <p className="text-lg font-black text-white mb-3">
                Start your managerial journey
              </p>
            </div>

            <div className="flex flex-col items-center space-y-6">
              <GoogleLoginButton
                isLoading={isLoading}
                onSuccess={handleGoogleLogin}
              />

              <p className="text-sm text-gray-400 text-center max-w-sm">
                By continuing, you agree to Dugout's{" "}
                <Link
                  href="/terms"
                  className="text-[#fca311] hover:text-[#fca311]/80 transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#fca311] hover:text-[#fca311]/80 transition-colors"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="bg-[#14213d] p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4"
            >
              <div className="w-12 h-12 border-4 border-[#fca311] border-t-transparent rounded-full animate-spin" />
              <p className="text-white font-medium text-lg">
                {authStep === "google-auth"
                  ? "Authenticating with Google..."
                  : "Finalizing sign in..."}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification */}
      {notification.show && (
        <Notification
          message={notification.message}
          status={notification.status}
          switchShowOff={() =>
            setNotification((prev) => ({ ...prev, show: false }))
          }
        />
      )}
    </motion.div>
  );
}

export const GoogleLoginButton = ({
  isLoading,
  onSuccess,
}: {
  isLoading: boolean;
  onSuccess: (response: any) => void;
}) => {
  return (
    <motion.div
      whileHover={{ scale: isLoading ? 1 : 1.02 }}
      whileTap={{ scale: isLoading ? 1 : 0.98 }}
      className="relative w-full"
    >
      {/* Semi-transparent overlay during loading */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/30 rounded-full z-10 flex items-center justify-center backdrop-blur-sm"
        >
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}

      <div className={isLoading ? "pointer-events-none" : ""}>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={() => {
            console.error("Login Failed");
          }}
          type="standard"
          theme="outline"
          text="continue_with"
          shape="pill"
          logo_alignment="center"
          size="large"
          width="600"
        />
      </div>
    </motion.div>
  );
};
