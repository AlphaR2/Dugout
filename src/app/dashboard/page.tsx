// app/dashboard/page.tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaTrophy,
  FaFutbol,
  FaInbox,
  FaPlus,
  FaStar,
  FaChevronRight,
} from "react-icons/fa";
import OnboardingModal from "@/components/modals/Onboarding";
import InfoButton from "@/components/ui/Infobutton";
import TeamFormation from "@/components/team/TeamFormation";
// import TeamFormation from "@/components/team/TeamFormation";
// import { Badge } from "@/components/ui/badge";
import { Club, Player, Group } from "../../../types/club";
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
  const {
    showOnboarding,
    hasSeenOnboarding,
    handleOnboardingComplete,
    handleOnboardingOpen,
    handleOnboardingClose,
  } = useOnboarding();

  const [showTeamView, setShowTeamView] = useState(false);
  const [clubData, setClubData] = useState<Club | null>(null);

  useEffect(() => {
    const savedClubData = localStorage.getItem("clubData");
    if (savedClubData) {
      setClubData(JSON.parse(savedClubData));
    }
  }, []);

  return (
    <>
      <div className="p-8 space-y-8">
        {/* Club Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#14213d] rounded-2xl p-6"
        >
          <div className="flex items-center gap-6">
            <div
              className="w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold"
              style={{ backgroundColor: clubData?.primaryColor || "#fca311" }}
            >
              {clubData?.abbreviation || "CLB"}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {clubData?.name || "Your Club"}
              </h1>
              <p className="text-gray-400 italic">
                {clubData?.slogan || "Create your legacy"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Groups */}
          <div className="space-y-6">
            <div className="bg-[#14213d] rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Your Groups</h2>
              <div className="space-y-4">
                {userGroups.map((group) => (
                  <div
                    key={group.id}
                    className="bg-[#000a16] rounded-lg p-4 hover:bg-[#000a16]/80 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-bold text-white">{group.name}</h3>
                        <div className="flex items-center gap-2">
                          <FaFutbol className="text-[#fca311] border-[#fca311]">
                            {group.type.toUpperCase()}
                          </FaFutbol>
                          <span className="text-sm text-[#fca311]">
                            {group.position
                              ? `${group.position}th`
                              : group.stage}
                          </span>
                        </div>
                      </div>
                      <FaChevronRight className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Group Actions */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button
                  onClick={() => {
                    /* Handle create */
                  }}
                  className="bg-[#fca311] hover:bg-[#fca311]/90 text-black"
                >
                  <FaPlus className="mr-2" /> Create
                </button>
                <button
                  onClick={() => {
                    /* Handle join */
                  }}
                  className="border-[#fca311] text-[#fca311] hover:bg-[#fca311]/10"
                >
                  <FaTrophy className="mr-2" /> Join
                </button>
              </div>
            </div>
          </div>

          {/* Center Column - Selected Team */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#14213d] rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Selected Team
                  </h2>
                  <div className="flex items-center gap-2 text-gray-400">
                    <FaStar className="text-[#fca311]" />
                    <span>Average Rating: {selectedTeam.avgRating}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowTeamView(!showTeamView)}
                  className="bg-[#fca311] hover:bg-[#fca311]/90 text-black"
                >
                  {showTeamView ? "Hide Formation" : "Show Formation"}
                </button>
              </div>

              {showTeamView ? (
                <TeamFormation players={selectedTeam.players} />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {selectedTeam.players.map((player) => (
                    <div
                      key={player.id}
                      className="bg-[#000a16] rounded-lg p-4 hover:bg-[#000a16]/80 transition-colors"
                    >
                      <div className="text-xs text-gray-400 mb-1">
                        {player.position}
                      </div>
                      <div className="font-bold text-white">{player.name}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <FaStar className="text-[#fca311] text-xs" />
                        <span className="text-sm text-gray-400">
                          {player.rating}
                        </span>
                      </div>
                    </div>
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

      {/* Info Button - Positioned in bottom right */}
      {/* {!hasSeenOnboarding && <InfoButton onClick={handleOnboardingOpen} />} */}
      <InfoButton onClick={handleOnboardingOpen} />
    </>
  );
}
