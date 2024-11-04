// components/LiveMatches.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaBolt, FaCalendar, FaClock } from "react-icons/fa";

// Simplified TypeScript Interfaces
interface Team {
  name: string;
  logo: string;
  score?: number;
}

interface BaseMatch {
  id: string;
  league: string;
  homeTeam: Team;
  awayTeam: Team;
}

interface LiveMatch extends BaseMatch {
  minute: number;
  isLive: boolean;
}

interface UpcomingMatch extends BaseMatch {
  kickoff: string;
}

const LiveMatches: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"live" | "upcoming">("live");

  const liveMatches: LiveMatch[] = [
    {
      id: "1",
      league: "Premier League",
      homeTeam: {
        name: "Arsenal",
        score: 2,
        logo: "/teams/arsenal.png",
      },
      awayTeam: {
        name: "Chelsea",
        score: 1,
        logo: "/teams/chelsea.png",
      },
      minute: 67,
      isLive: true,
    },
    {
      id: "2",
      league: "La Liga",
      homeTeam: {
        name: "Barcelona",
        score: 3,
        logo: "/teams/barcelona.png",
      },
      awayTeam: {
        name: "Real Madrid",
        score: 2,
        logo: "/teams/madrid.png",
      },
      minute: 75,
      isLive: true,
    },
    {
      id: "3",
      league: "Bundesliga",
      homeTeam: {
        name: "Bayern",
        score: 1,
        logo: "/teams/bayern.png",
      },
      awayTeam: {
        name: "Dortmund",
        score: 1,
        logo: "/teams/dortmund.png",
      },
      minute: 34,
      isLive: true,
    },
  ];

  const upcomingMatches: UpcomingMatch[] = [
    {
      id: "4",
      league: "Premier League",
      homeTeam: {
        name: "Liverpool",
        logo: "/teams/liverpool.png",
      },
      awayTeam: {
        name: "Man United",
        logo: "/teams/united.png",
      },
      kickoff: "Today, 20:45",
    },
    {
      id: "5",
      league: "Serie A",
      homeTeam: {
        name: "Milan",
        logo: "/teams/milan.png",
      },
      awayTeam: {
        name: "Inter",
        logo: "/teams/inter.png",
      },
      kickoff: "Today, 21:00",
    },
  ];

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
          Track live scores and upcoming fixtures
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="inline-flex bg-[#14213d]/50 backdrop-blur-sm p-1 rounded-xl">
          {[
            { id: "live" as const, label: "Live Matches", icon: FaBolt },
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
      </div>

      {/* Matches List */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="space-y-4">
          {(activeTab === "live" ? liveMatches : upcomingMatches).map(
            (match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-[#14213d]/40 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-[#fca311]/20 transition-all duration-500"
              >
                {/* League Name */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-white bg-white/5 px-3 py-1 rounded-full">
                    {match.league}
                  </span>
                  {"minute" in match ? (
                    <div className="flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-full">
                      <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 bg-red-500 rounded-full"
                      />
                      <span className="text-sm text-red-500 font-medium">
                        {match.minute}'
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[#e5e5e5]">
                      <FaClock className="text-xs" />
                      <span className="text-sm">{match.kickoff}</span>
                    </div>
                  )}
                </div>

                {/* Teams */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/5 rounded-lg p-2 group-hover:bg-white/10 transition-colors">
                        <img
                          src={match.homeTeam.logo}
                          alt={match.homeTeam.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-white font-medium">
                        {match.homeTeam.name}
                      </span>
                    </div>
                    {"score" in match.homeTeam && (
                      <span className="text-2xl font-bold text-[#fca311]">
                        {match.homeTeam.score}
                      </span>
                    )}
                  </div>

                  <div className="px-4 text-white/30">vs</div>

                  <div className="flex items-center gap-4 flex-1 justify-end">
                    {"score" in match.awayTeam && (
                      <span className="text-2xl font-bold text-[#fca311]">
                        {match.awayTeam.score}
                      </span>
                    )}
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium">
                        {match.awayTeam.name}
                      </span>
                      <div className="w-10 h-10 bg-white/5 rounded-lg p-2 group-hover:bg-white/10 transition-colors">
                        <img
                          src={match.awayTeam.logo}
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
        </div>
      </div>
    </div>
  );
};

export default LiveMatches;
