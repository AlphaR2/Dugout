"use client";
import { useState, useEffect } from "react";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from "../utils/localStorage";

export const useOnboarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(true);

  useEffect(() => {
    const onboardModal = getDataFromLocalStorage("onboard");
    if (onboardModal === "false") {
      setShowOnboarding(true);
      setHasSeenOnboarding(false);
    }
  }, []);

  const handleOnboardingComplete = () => {
       saveDataToLocalStorage("onboard", "true");
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
