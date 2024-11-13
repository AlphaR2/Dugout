"use client";
import { useState, useEffect } from "react";

export const useOnboarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(true);

  useEffect(() => {
    const onboardingComplete = localStorage.getItem("onboardingComplete");
    if (!onboardingComplete) {
      setShowOnboarding(true);
      setHasSeenOnboarding(false);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("onboardingComplete", "true");
    setShowOnboarding(false);
    setHasSeenOnboarding(true);
  };

  const handleOnboardingOpen = () => {
    setShowOnboarding(true);
  };

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
  };

  return {
    showOnboarding,
    hasSeenOnboarding,
    handleOnboardingComplete,
    handleOnboardingOpen,
    handleOnboardingClose,
  };
};