"use client";

import { useState, useCallback } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaTrophy, FaUsers } from "react-icons/fa";
import { NotificationState } from "../../../types/football";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../store/store";
import Notification from "@/components/notification";
import { useSendDataMutation } from "../../../store/api/api";
import { GiSoccerBall } from "react-icons/gi";
import {
  OnboardingModalProps,
  ClubData,
  ValidationErrors,
  // OnboardResponse,
  POPULAR_CLUBS,
  STEPS,
  modalVariants,
  contentVariants,
  generateSlug,
  useWindowHeight,
  Button,
  FormInput,
} from "../ui/Onboarding";

const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  // const dispatch = useDispatch<AppDispatch>();
  const [onboard] = useSendDataMutation();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const maxHeight = useWindowHeight();
  const [notification, setNotification] = useState<NotificationState>({
    message: "",
    status: "error",
    show: false,
  });

  const [clubData, setClubData] = useState<ClubData>({
    clubName: "",
    coachName: "",
    clubSlugName: "",
    abbreviation: "",
    slogan: "",
    primaryColor: "#fca311",
    favClub: [],
  });

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!clubData.coachName.trim()) {
      newErrors.coachName = "Coach name is required";
    }

    if (!clubData.clubName.trim()) {
      newErrors.clubName = "Club name is required";
    }

    if (!clubData.abbreviation.trim()) {
      newErrors.abbreviation = "Abbreviation is required";
    } else if (clubData.abbreviation.length !== 3) {
      newErrors.abbreviation = "Abbreviation must be exactly 3 letters";
    }

    if (clubData.favClub.length === 0) {
      newErrors.favClub = "Please select at least one favorite club";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Notification helper
  const showNotification = useCallback(
    (message: string, status: "success" | "error") => {
      setNotification({ message, status, show: true });
    },
    []
  );

  const handleOnboard = async () => {
    try {
      setIsSubmitting(true);

      const onboardData = {
        username: clubData.coachName,
        clubName: clubData.clubName,
        clubSlugName: clubData.clubSlugName,
        clubColor: clubData.primaryColor,
        clubAbbrev: clubData.abbreviation,
        preferences: clubData.favClub,
      };

      const response = await onboard({
        url: "user/onboard",
        data: onboardData,
        type: "POST",
      });

      if (response?.data) {
        console.log(response.data);

        const ddd = response.data;

        const edf = ddd.data;
        console.log("EDF:", edf);
        // handleData(response.data);
      } else {
        throw new Error(response?.error?.data?.error || "Login failed");
      }

      showNotification("Club created successfully!", "success");
      onClose();
    } catch (error) {
      console.error("Onboarding error:", error);
      showNotification("Failed to create club. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleData = (onboardData: OnboardResponse) => {
  //   const { clubName, clubAbbrev, clubColor } = onboardData.data.user;

  //   console.log("CLUB NAME:", clubName);
  //   console.log("CLUB ABBV:", clubAbbrev);
  //   console.log("CLUB COL:", clubColor);
  // };
  const handleNext = async () => {
    if (step === 2 && !validateForm()) {
      return;
    }
    if (step < STEPS.length) {
      setStep(step + 1);
    } else {
      await handleOnboard();
    }
  };

  const renderFeatureCard = (
    icon: React.ReactNode,
    title: string,
    description: string
  ) => (
    <div className="bg-[#000a16] p-4 rounded-xl text-center hover:scale-105 transition-transform cursor-pointer">
      <div className="text-[#fca311] text-2xl mx-auto mb-2">{icon}</div>
      <h3 className="font-bold text-white text-base mb-1">{title}</h3>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  );

  const renderStep1 = () => (
    <motion.div
      key="step1"
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <div className="grid grid-cols-3 gap-4">
        {renderFeatureCard(<GiSoccerBall />, "Create", "Build your dream club")}
        {renderFeatureCard(<FaUsers />, "Compete", "Join leagues")}
        {renderFeatureCard(<FaTrophy />, "Win", "Earn glory")}
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      key="step2"
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-4"
    >
      <FormInput
        label="Coach Name"
        value={clubData.coachName}
        onChange={(value) => setClubData({ ...clubData, coachName: value })}
        placeholder="Enter your name"
        error={errors.coachName}
      />

      <FormInput
        label="Club Name"
        value={clubData.clubName}
        onChange={(value) =>
          setClubData({
            ...clubData,
            clubName: value,
            clubSlugName: generateSlug(value),
          })
        }
        placeholder="Enter club name"
        error={errors.clubName}
      />

      <FormInput
        label="Abbreviation (3 letters)"
        value={clubData.abbreviation}
        onChange={(value) =>
          setClubData({
            ...clubData,
            abbreviation: value.toUpperCase().slice(0, 3),
          })
        }
        placeholder="e.g., MUN"
        maxLength={3}
        error={errors.abbreviation}
      />

      <div>
        <label className="text-xs text-gray-400 block mb-1">
          Favorite Clubs
        </label>
        <div className="grid grid-cols-2 gap-2">
          {POPULAR_CLUBS.map((club) => (
            <button
              key={club}
              onClick={() => {
                const newFavClubs = clubData.favClub.includes(club)
                  ? clubData.favClub.filter((c) => c !== club)
                  : [...clubData.favClub, club];
                setClubData({ ...clubData, favClub: newFavClubs });
              }}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                clubData.favClub.includes(club)
                  ? "bg-[#fca311] text-black"
                  : "bg-[#000a16] text-white hover:bg-[#000a16]/80"
              }`}
            >
              {club}
            </button>
          ))}
        </div>
        {errors.favClub && (
          <p className="text-red-500 text-xs mt-1">{errors.favClub}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-gray-400 block mb-1">Club Color</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={clubData.primaryColor}
            onChange={(e) =>
              setClubData({
                ...clubData,
                primaryColor: e.target.value,
              })
            }
            className="w-12 h-12 rounded cursor-pointer"
          />
          <div className="flex-1 px-3 py-2 bg-[#000a16] border border-white/10 rounded-lg text-white text-sm">
            {clubData.primaryColor}
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-400 block mb-1">
          Slogan (Optional)
        </label>
        <textarea
          value={clubData.slogan}
          onChange={(e) => setClubData({ ...clubData, slogan: e.target.value })}
          placeholder="Enter club slogan"
          className="w-full px-3 py-2 bg-[#000a16] border border-white/10 rounded-lg text-white focus:border-[#fca311] outline-none transition-colors resize-none h-20"
        />
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      key="step3"
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-center space-y-8"
    >
      {/* Club Emblem */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="relative w-40 h-40 mx-auto"
      >
        {/* Outer Ring */}
        <motion.div
          initial={{ rotate: -180 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border-4 border-[#fca311]"
          style={{ borderColor: clubData.primaryColor }}
        />

        {/* Inner Circle with Gradient */}
        <div
          className="absolute inset-2 rounded-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${clubData.primaryColor}dd, ${clubData.primaryColor}44)`,
            boxShadow: `0 0 20px ${clubData.primaryColor}44`,
          }}
        >
          {/* Club Abbreviation */}
          <span className="text-4xl font-black text-white drop-shadow-lg">
            {clubData.abbreviation}
          </span>
        </div>

        {/* Decorative Elements */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${clubData.primaryColor}22, transparent)`,
          }}
        />

        {/* Established Date */}
        <div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#14213d] px-3 py-1 rounded-full border-2"
          style={{ borderColor: clubData.primaryColor }}
        >
          <span className="text-xs font-medium text-white">EST. 2024</span>
        </div>
      </motion.div>

      {/* Club Information */}
      <div className="space-y-6">
        {/* Club Name and Manager */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-white mb-3"
          >
            {clubData.clubName}
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-2 text-gray-400"
          >
            <span>Managed by</span>
            <span className="text-[#fca311] font-semibold">
              {clubData.coachName}
            </span>
          </motion.div>
        </div>

        {/* Slogan */}
        {clubData.slogan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="relative"
          >
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            <p className="text-gray-400 italic text-sm bg-[#14213d] px-4 inline-block relative">
              {clubData.slogan}
            </p>
          </motion.div>
        )}

        {/* Favorite Clubs */}
        {clubData.favClub.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="text-center"
          >
            <p className="text-sm text-gray-500 mb-2">Inspired by</p>
            <div className="flex flex-wrap justify-center gap-2">
            {clubData.favClub.map((club) => (
                <span
                  key={club}
                  className="text-xs px-3 py-1 rounded-full bg-[#000a16]"
                  style={{
                    color: clubData.primaryColor,
                    border: `1px solid ${clubData.primaryColor}44`,
                  }}
                >
                  {club}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 10% 10%, ${clubData.primaryColor}11, transparent 20%),
            radial-gradient(circle at 90% 90%, ${clubData.primaryColor}11, transparent 20%)
          `,
        }}
      />
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-[#14213d] rounded-2xl w-full max-w-lg shadow-2xl"
            style={{ maxHeight }}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-white/10 text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-10 transform -translate-x-1/2 w-20 h-20 bg-[#14213d] rounded-full flex items-center justify-center border-4 border-[#fca311]"
              >
                {STEPS[step - 1].icon}
              </motion.div>
              <h2 className="text-2xl font-bold text-white mt-6">
                {STEPS[step - 1].title}
              </h2>
              <p className="text-gray-400 mt-2 text-sm">
                {STEPS[step - 1].description}
              </p>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Content */}
            <div
              className="p-6 overflow-y-auto"
              style={{ maxHeight: "calc(85vh - 200px)" }}
            >
              <AnimatePresence mode="wait">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {STEPS.map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        step === i + 1 ? "bg-[#fca311]" : "bg-white/20"
                      }`}
                      animate={{
                        scale: step === i + 1 ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: step === i + 1 ? Infinity : 0,
                      }}
                    />
                  ))}
                </div>
                <div className="flex space-x-3">
                  {step > 1 && (
                    <Button
                      variant="secondary"
                      onClick={() => setStep(step - 1)}
                      disabled={isSubmitting}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    isLoading={isSubmitting && step === STEPS.length}
                  >
                    {step === STEPS.length ? "Get Started" : "Next"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

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
    </AnimatePresence>
  );
};

export default OnboardingModal;
