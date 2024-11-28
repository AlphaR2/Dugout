"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaBolt, FaCalendar } from "react-icons/fa";
import { useMatches } from "../../utils/plData";
import { useLiveMatches } from "../../utils/matches";
import Image from "next/image";

type LeagueCode = "PL" | "PD"; // Premier League or Primera División
type TabType = "live" | "upcoming";

const LiveMatches = () => {
  const [activeTab, setActiveTab] = useState<TabType>("live");
  const [activeLeague, setActiveLeague] = useState<LeagueCode>("PL");
  const { matches } = useLiveMatches(activeLeague);

  const { matchesData, nextMatchday, error, isLoading } =
    useMatches(activeLeague);

  const { upcoming } = matchesData;

  return (
    <div className="py-16 bg-[#000610]/50">
      {/* Header */}
      <motion.div
        className="text-center mb-12 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Match Center
        </h2>
        <p className="text-[#e5e5e5] text-lg">
          Track live scores and upcoming fixtures of enabled leagues
        </p>
      </motion.div>

      {isLoading && (
        <div className="py-16 bg-[#000610]/50 min-h-[500px] flex items-center justify-center">
          <div className="text-white">Loading matches...</div>
        </div>
      )}

      {error && (
        <div className="py-16 bg-[#000610]/50 min-h-[500px] flex items-center justify-center">
          <div className="text-red-500">Error: {error}</div>
        </div>
      )}

      {/* Tabs and League Selector */}
      <div className="max-w-6xl mx-auto px-4 mb-8 flex justify-between items-center">
        {/* Match Type Tabs */}
        <div className="inline-flex bg-[#14213d]/50 backdrop-blur-sm p-1 rounded-xl">
          {[
            { id: "live" as const, label: "Matches Today", icon: FaBolt },
            { id: "upcoming" as const, label: "Upcoming", icon: FaCalendar },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                ${
                  activeTab === tab.id
                    ? "bg-[#fca311] text-black"
                    : "text-white hover:bg-white/5"
                }
              `}
            >
              <tab.icon className="text-sm" />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* League Selector */}
        <div className="inline-flex bg-[#14213d]/50 backdrop-blur-sm p-1 rounded-xl">
          {[
            { id: "PL" as const, label: "Premier League" },
            { id: "PD" as const, label: "La Liga" },
          ].map((league) => (
            <motion.button
              key={league.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveLeague(league.id)}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all
                ${
                  activeLeague === league.id
                    ? "bg-[#fca311] text-black"
                    : "text-white hover:bg-white/5"
                }
              `}
            >
              {league.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Matches List */}
      <div className="max-w-3xl mx-auto px-4">
        {activeTab === "upcoming" && (
          <div className="text-center mb-6">
            <span className="text-white/70">
              Matchday {nextMatchday}{" "}
              {/* Show next matchday for upcoming matches */}
            </span>
          </div>
        )}

        <div className="space-y-4">
          {(activeTab === "live" ? matches : upcoming).map(
            (match, index: number) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-[#14213d]/40 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-[#fca311]/20 transition-all duration-500"
              >
                {/* Match Status */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-white bg-white/5 px-3 py-1 rounded-full">
                    {match.formattedDate}
                  </span>
                  {match.status === "LIVE" || match.status === "IN_PLAY" ? (
                    <div className="flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-full">
                      <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 bg-red-500 rounded-full"
                      />
                      <span className="text-sm text-red-500 font-medium">
                        LIVE
                      </span>
                    </div>
                  ) : (
                    <div className="text-sm text-[#e5e5e5]">
                      {match.formattedTime}
                    </div>
                  )}
                </div>

                {/* Teams */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/5 rounded-lg p-2 group-hover:bg-white/10 transition-colors">
                        <Image
                          width={50}
                          height={50}
                          src={match.homeTeam.crest}
                          alt={match.homeTeam.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-white font-medium">
                        {match.homeTeam.shortName}
                      </span>
                    </div>
                    {match.homeTeam.score !== null && (
                      <span className="text-2xl font-bold text-[#fca311]">
                        {match.homeTeam.score}
                      </span>
                    )}
                  </div>

                  <div className="px-4 text-white/30">vs</div>

                  <div className="flex items-center gap-4 flex-1 justify-end">
                    {match.awayTeam.score !== null && (
                      <span className="text-2xl font-bold text-[#fca311]">
                        {match.awayTeam.score}
                      </span>
                    )}
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium">
                        {match.awayTeam.shortName}
                      </span>
                      <div className="w-10 h-10 bg-white/5 rounded-lg p-2 group-hover:bg-white/10 transition-colors">
                        <Image
                          width={50}
                          height={50}
                          src={match.awayTeam.crest}
                          alt={match.awayTeam.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          )}

          {(activeTab === "live" ? matches : upcoming).length === 0 && (
            <div className="text-center py-32 text-white/50">
              No {activeTab} matches at the moment
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveMatches;
