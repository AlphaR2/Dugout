// app/dashboard/page.tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaPlus, FaStar, FaChevronRight } from "react-icons/fa";
import OnboardingModal from "@/components/modals/Onboarding";
import InfoButton from "@/components/ui/Infobutton";
import TeamFormation from "@/components/team/TeamFormation";

import { Club } from "../../../types/club";
import { useOnboarding } from "../../../hooks/useOnboarding";

// Mock selected team data
const selectedTeam = {
  avgRating: 84.5,
  formation: "4-4-2",
  players: [
    { id: 1, name: "John Smith", position: "GK", rating: 85, number: 1 },
    { id: 2, name: "David James", position: "RB", rating: 83, number: 2 },
    { id: 3, name: "Mike Johnson", position: "CB", rating: 86, number: 4 },
    { id: 4, name: "Chris Wilson", position: "CB", rating: 85, number: 5 },
    { id: 5, name: "Tom Brown", position: "LB", rating: 82, number: 3 },
    { id: 6, name: "Jack Davis", position: "RM", rating: 84, number: 7 },
    { id: 7, name: "Sam White", position: "CM", rating: 86, number: 8 },
    { id: 8, name: "Alex Turner", position: "CM", rating: 85, number: 6 },
    { id: 9, name: "Ryan Moore", position: "LM", rating: 83, number: 11 },
    { id: 10, name: "Mark Taylor", position: "ST", rating: 87, number: 9 },
    { id: 11, name: "Paul Anderson", position: "ST", rating: 84, number: 10 },
  ],
};

// Mock groups data
const userGroups = [
  {
    id: 1,
    name: "Premier League 2024",
    type: "league",
    position: 4,
    logo: "/leagues/pl.png",
  },
  {
    id: 2,
    name: "FA Cup",
    type: "cup",
    stage: "Quarter Finals",
    logo: "/leagues/fa.png",
  },
];

export default function DashboardPage() {
  const { showOnboarding, handleOnboardingComplete, handleOnboardingOpen } =
    useOnboarding();
  const [showTeamView, setShowTeamView] = useState(false);
  const [clubData, setClubData] = useState<Club | null>(null);

  useEffect(() => {
    const savedClubData = localStorage.getItem("clubData");
    if (savedClubData) {
      setClubData(JSON.parse(savedClubData));
    }
  }, []);

  return (
    <div className="min-h-screen w-full mx-6 bg-[#000610]">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Club Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#14213d]/60 backdrop-blur-sm rounded-xl p-8 shadow-lg mb-24 mt-6 relative overflow-hidden"
        >
          {/* Background Decorations */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
        radial-gradient(circle at 10% 10%, ${
          clubData?.primaryColor || "#fca311"
        }11, transparent 20%),
        radial-gradient(circle at 90% 90%, ${
          clubData?.primaryColor || "#fca311"
        }11, transparent 20%)
      `,
            }}
          />

          <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* Enhanced Club Emblem */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0"
            >
              {/* Outer Ring */}
              <motion.div
                initial={{ rotate: -180 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-4"
                style={{ borderColor: clubData?.primaryColor || "#fca311" }}
              />

              {/* Inner Circle with Gradient */}
              <div
                className="absolute inset-2 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${
                    clubData?.primaryColor || "#fca311"
                  }dd, ${clubData?.primaryColor || "#fca311"}44)`,
                  boxShadow: `0 0 20px ${
                    clubData?.primaryColor || "#fca311"
                  }44`,
                }}
              >
                {/* Club Abbreviation */}
                <span className="text-2xl sm:text-3xl font-black text-white drop-shadow-lg">
                  {clubData?.abbreviation || "CLB"}
                </span>
              </div>

              {/* Decorative Elements */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${
                    clubData?.primaryColor || "#fca311"
                  }22, transparent)`,
                }}
              />

              {/* Established Date */}
              <div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#14213d] px-3 py-1 rounded-full border-2"
                style={{ borderColor: clubData?.primaryColor || "#fca311" }}
              >
                <span className="text-xs font-medium text-white">
                  EST. 2024
                </span>
              </div>
            </motion.div>

            {/* Club Info with Enhanced Typography */}
            <div className="flex-1 text-center sm:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
                  {clubData?.name || "Your Club"}
                </h1>

                {clubData?.slogan ? (
                  <div className="relative mt-3">
                    <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                    <p className="text-gray-400 italic text-sm sm:text-base bg-[#14213d]/60 pr-4 inline-block relative">
                      "{clubData.slogan}"
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400 italic text-sm sm:text-base mt-2">
                    Create your legacy
                  </p>
                )}</motion.div>
            </div>

            {/* Optional: Add a quick stats or actions section */}
            <div className="hidden lg:flex flex-col items-end gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white text-sm flex items-center gap-2"
              >
                <span>View Details</span>
              </motion.button>
            </div>
          </div>

          {/* Bottom Gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(to right, transparent, ${
                clubData?.primaryColor || "#fca311"
              }44, transparent)`,
            }}
          />
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Groups */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#14213d] rounded-xl p-6 shadow-lg h-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Your Groups</h2>
                <span className="text-sm text-gray-400">
                  {userGroups.length} Active
                </span>
              </div>

              <div className="space-y-4 mb-6">
                {userGroups.map((group) => (
                  <motion.div
                    key={group.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#000a16] rounded-lg p-4 cursor-pointer hover:bg-[#000a16]/80 transition-all shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center">
                        <FaTrophy className="text-[#fca311] text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white">{group.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-[#fca311]/10 text-[#fca311] rounded-full">
                            {group.type.toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-400">
                            {group.position
                              ? `${group.position}th`
                              : group.stage}
                          </span>
                        </div>
                      </div>
                      <FaChevronRight className="text-gray-400" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Group Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button className="px-4 py-2 bg-[#fca311] hover:bg-[#fca311]/90 text-black rounded-lg font-medium flex items-center justify-center transition-colors">
                  <FaPlus className="mr-2" /> Create
                </button>
                <button className="px-4 py-2 border border-[#fca311] text-[#fca311] hover:bg-[#fca311]/10 rounded-lg font-medium flex items-center justify-center transition-colors">
                  <FaTrophy className="mr-2" /> Join
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Selected Team */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#14213d] rounded-xl p-6 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Selected Team
                  </h2>
                  <div className="flex items-center gap-2 text-gray-400 mt-1">
                    <FaStar className="text-[#fca311]" />
                    <span>Average Rating: {selectedTeam.avgRating}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowTeamView(!showTeamView)}
                  className="px-4 py-2 bg-[#fca311] hover:bg-[#fca311]/90 text-black rounded-lg font-medium transition-colors w-full sm:w-auto"
                >
                  {showTeamView ? "Hide Formation" : "Show Formation"}
                </button>
              </div>

              {showTeamView ? (
                <TeamFormation players={selectedTeam.players} />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedTeam.players.map((player) => (
                    <motion.div
                      key={player.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-[#000a16] rounded-lg p-4 hover:bg-[#000a16]/80 transition-all shadow-md"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs px-2 py-1 bg-[#fca311]/10 text-[#fca311] rounded-full">
                          {player.position}
                        </span>
                        <span className="text-sm text-white font-bold">
                          #{player.number}
                        </span>
                      </div>
                      <div className="font-bold text-white mb-2">
                        {player.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaStar className="text-[#fca311] text-xs" />
                        <span className="text-sm text-gray-400">
                          {player.rating}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={handleOnboardingComplete}
      />

      {/* Info Button */}
      <InfoButton onClick={handleOnboardingOpen} />
    </div>
  );
}
