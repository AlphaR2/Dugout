// components/modals/OnboardingModal.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ClubData {
  name: string;
  abbreviation: string;
  slogan: string;
  primaryColor: string;
}

const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [step, setStep] = useState(1);
  const [clubData, setClubData] = useState<ClubData>({
    name: "",
    abbreviation: "",
    slogan: "",
    primaryColor: "#fca311",
  });

  const steps = [
    {
      title: "Welcome to Dugout",
      description:
        "Create and manage your own football club, compete in leagues, and become the ultimate manager!",
    },
    {
      title: "Create Your Club",
      description:
        "Your club identity starts here. Choose a name that will be remembered throughout history.",
    },
    {
      title: "You're All Set!",
      description:
        "Your club is ready to make history. Start by exploring the dashboard or joining a competition.",
    },
  ];

  const handleNext = () => {
    if (step === 2 && (!clubData.name || !clubData.abbreviation)) {
      return;
    }
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    // Save club data to your storage/backend
    localStorage.setItem("clubData", JSON.stringify(clubData));
    localStorage.setItem("onboardingComplete", "true");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#14213d] rounded-2xl w-full max-w-lg"
          >
            {/* Header */}
            <div className="relative p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">
                {steps[step - 1].title}
              </h2>
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {step === 1 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-6"
                >
                  <p className="text-gray-300">{steps[0].description}</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#000a16] p-4 rounded-xl text-center">
                      <h3 className="font-bold text-white">Create</h3>
                      <p className="text-sm text-gray-400">Build your club</p>
                    </div>
                    <div className="bg-[#000a16] p-4 rounded-xl text-center">
                      <h3 className="font-bold text-white">Compete</h3>
                      <p className="text-sm text-gray-400">Join leagues</p>
                    </div>
                    <div className="bg-[#000a16] p-4 rounded-xl text-center">
                      <h3 className="font-bold text-white">Win</h3>
                      <p className="text-sm text-gray-400">Earn trophies</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-sm text-gray-400">Club Name</label>
                    <input
                      value={clubData.name}
                      onChange={(e) =>
                        setClubData({ ...clubData, name: e.target.value })
                      }
                      placeholder="Enter club name"
                      className="bg-[#000a16] border-white/10"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400">
                      Abbreviation (3 letters)
                    </label>
                    <input
                      value={clubData.abbreviation}
                      onChange={(e) =>
                        setClubData({
                          ...clubData,
                          abbreviation: e.target.value
                            .toUpperCase()
                            .slice(0, 3),
                        })
                      }
                      placeholder="e.g., MUN"
                      maxLength={3}
                      className="bg-[#000a16] border-white/10"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400">Club Slogan</label>
                    <textarea
                      value={clubData.slogan}
                      onChange={(e) =>
                        setClubData({ ...clubData, slogan: e.target.value })
                      }
                      placeholder="Enter club slogan"
                      className="bg-[#000a16] border-white/10"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400">
                      Primary Color
                    </label>
                    <input
                      type="color"
                      value={clubData.primaryColor}
                      onChange={(e) =>
                        setClubData({
                          ...clubData,
                          primaryColor: e.target.value,
                        })
                      }
                      className="w-full h-10 rounded"
                    />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-center space-y-4"
                >
                  <div
                    className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
                    style={{ backgroundColor: clubData.primaryColor }}
                  >
                    <span className="text-2xl font-bold text-white">
                      {clubData.abbreviation}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {clubData.name}
                  </h3>
                  {clubData.slogan && (
                    <p className="text-gray-400 italic">{clubData.slogan}</p>
                  )}
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        step === i + 1 ? "bg-[#fca311]" : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex space-x-3">
                  {step > 1 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="border-white/10 text-white hover:bg-white/5"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    className="bg-[#fca311] hover:bg-[#fca311]/90 text-black"
                  >
                    {step === steps.length ? "Get Started" : "Next"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingModal;
