// components/ActiveGroups.tsx
"use client";
import { motion } from "framer-motion";
import { FaUsers, FaClock, FaTrophy, FaBolt } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

const ActiveGroups = () => {
  const groups = [
    {
      id: 1,
      entryFee: 0.0,
      players: 0,
      maxPlayers: 8,
      draftTime: "0h 00m",
      prizePool: 0,
      isPopular: true,
    },
    {
      id: 2,
      entryFee: 0.0,
      players: 0,
      maxPlayers: 8,
      draftTime: "0h 00m",
      prizePool: 0,
      isPopular: false,
    },
    {
      id: 3,
      entryFee: 0.0,
      players: 0,
      maxPlayers: 8,
      draftTime: "00m",
      prizePool: 0,
      isPopular: true,
    },
  ];

  return (
    <div className="py-20  bg-[#000610]/50 border-b border-b-[#fca311]/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12 space-y-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Live Draft Groups
        </h2>
        <p className="text-[#e5e5e5] text-lg max-w-2xl mx-auto">
          Join a group, draft your team, and compete for to be top of
          leaderboard and earn rewards
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  max-w-6xl mx-auto px-4">
        {groups.map((group, index) => (
          // Inside the map function for each card
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            {/* Card Container with Glass Effect */}
            <div className="relative bg-[#14213d]/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 hover:border-[#fca311]/20 transition-all duration-500">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Popular Tag */}
              {/* {group.isPopular && (
                <div className="absolute top-20 right-4 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-gradient-to-r from-[#fca311] to-[#fca311]/80 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg"
                  >
                    <FaBolt className="text-xs" />
                    <span>Popular</span>
                  </motion.div>
                </div>
              )} */}

              {/* Header */}
              <div className="relative p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="text-4xl font-bold text-[#fca311]">
                      ${group.entryFee}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-[#e5e5e5]/60">
                      Entry Fee
                    </div>
                  </div>
                  {/* Group Icon with Glow Effect */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#fca311]/20 blur-xl rounded-full" />
                    <div className="relative w-12 h-12 bg-[#14213d] rounded-xl border border-[#fca311]/20 flex items-center justify-center">
                      <FaPeopleGroup className="text-[#fca311] text-xl" />
                    </div>
                  </div>
                </div>

                {/* Animated Gradient Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#fca311]/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-3 pt-8 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="group/stat p-3 bg-black/20 rounded-xl hover:bg-black/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#fca311]/10 flex items-center justify-center group-hover/stat:bg-[#fca311]/20 transition-colors">
                        <FaUsers className="text-[#fca311] text-sm" />
                      </div>
                      <div>
                        <div className="text-white font-bold">
                          {group.players}/{group.maxPlayers}
                        </div>
                        <div className="text-xs text-[#e5e5e5]/50">Players</div>
                      </div>
                    </div>
                  </div>

                  <div className="group/stat p-3 bg-black/20 rounded-xl hover:bg-black/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#fca311]/10 flex items-center justify-center group-hover/stat:bg-[#fca311]/20 transition-colors">
                        <FaClock className="text-[#fca311] text-sm" />
                      </div>
                      <div>
                        <div className="text-white font-bold">
                          {group.draftTime}
                        </div>
                        <div className="text-xs text-[#e5e5e5]/50">
                          Until Draft
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prize Pool */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#fca311]/5 to-transparent" />
                  <div className="relative p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#fca311]/10 flex items-center justify-center">
                      <FaTrophy className="text-[#fca311] text-xl" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#e5e5e5]/50">
                        Prize Pool
                      </div>
                      <div className="text-2xl font-bold text-white">
                        ${group.prizePool}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Join Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-[#fca311] to-[#fca311]/80 rounded-xl font-bold text-black shadow-lg shadow-[#fca311]/20 hover:shadow-[#fca311]/30 transition-all duration-300"
                >
                  Join Draft
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActiveGroups;
