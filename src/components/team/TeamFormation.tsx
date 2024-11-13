// components/team/TeamFormation.tsx
"use client";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

interface Player {
  id: number;
  name: string;
  position: string;
  rating: number;
  number: number;
}

interface TeamFormationProps {
  players: Player[];
}

const TeamFormation = ({ players }: TeamFormationProps) => {
  const getPlayersByPosition = (position: string) =>
    players.filter((p) => p.position === position);

  // Formation rows position mapping
  const formationRows = {
    forwards: getPlayersByPosition("ST"),
    midfielders: getPlayersByPosition("RM")
      .concat(getPlayersByPosition("CM"))
      .concat(getPlayersByPosition("LM")),
    defenders: getPlayersByPosition("RB")
      .concat(getPlayersByPosition("CB"))
      .concat(getPlayersByPosition("LB")),
    goalkeeper: getPlayersByPosition("GK"),
  };

  const playerVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="relative h-[600px] bg-[#001a0e] rounded-xl overflow-hidden">
      {/* Field Markings */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20" />
        <div className="absolute top-[20%] left-0 right-0 h-px bg-white/20" />
        <div className="absolute bottom-[20%] left-0 right-0 h-px bg-white/20" />
        <div className="absolute top-[20%] bottom-[20%] left-1/2 w-px bg-white/20" />
        <div className="absolute top-[45%] bottom-[45%] left-[10%] right-[90%] border border-white/20 rounded-full" />
        <div className="absolute top-[45%] bottom-[45%] left-[90%] right-[10%] border border-white/20 rounded-full" />
        <div className="absolute top-[30%] bottom-[30%] left-[15%] right-[15%] border border-white/20" />
      </div>

      {/* Players */}
      <div className="relative h-full">
        {/* Forwards */}
        <div className="absolute top-[15%] left-0 right-0 flex justify-center gap-32">
          {formationRows.forwards.map((player, index) => (
            <motion.div
              key={player.id}
              variants={playerVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">
                {player.name}
              </div>
              <div className="w-12 h-12 rounded-full bg-[#fca311] flex items-center justify-center text-black font-bold relative">
                {player.number}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-full">
                  <FaStar className="text-[#fca311] w-3 h-3" />
                  <span className="text-white text-xs">{player.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Midfielders */}
        <div className="absolute top-[40%] left-0 right-0 flex justify-around">
          {formationRows.midfielders.map((player, index) => (
            <motion.div
              key={player.id}
              variants={playerVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: index * 0.1 + 0.2 }}
              className="relative group"
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">
                {player.name}
              </div>
              <div className="w-12 h-12 rounded-full bg-[#fca311] flex items-center justify-center text-black font-bold relative">
                {player.number}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-full">
                  <FaStar className="text-[#fca311] w-3 h-3" />
                  <span className="text-white text-xs">{player.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Defenders */}
        <div className="absolute top-[65%] left-0 right-0 flex justify-around">
          {formationRows.defenders.map((player, index) => (
            <motion.div
              key={player.id}
              variants={playerVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: index * 0.1 + 0.4 }}
              className="relative group"
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">
                {player.name}
              </div>
              <div className="w-12 h-12 rounded-full bg-[#fca311] flex items-center justify-center text-black font-bold relative">
                {player.number}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-full">
                  <FaStar className="text-[#fca311] w-3 h-3" />
                  <span className="text-white text-xs">{player.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Goalkeeper */}
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2">
          {formationRows.goalkeeper.map((player) => (
            <motion.div
              key={player.id}
              variants={playerVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: 0.6 }}
              className="relative group"
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">
                {player.name}
              </div>
              <div className="w-12 h-12 rounded-full bg-[#fca311] flex items-center justify-center text-black font-bold relative">
                {player.number}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-full">
                  <FaStar className="text-[#fca311] w-3 h-3" />
                  <span className="text-white text-xs">{player.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Formation Label */}
      <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
        4-4-2
      </div>
    </div>
  );
};

export default TeamFormation;
