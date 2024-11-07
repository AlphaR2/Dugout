// components/HowItWorks.tsx
"use client";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaFutbol,
  FaTrophy,
  FaCrown,
  FaChartLine,
} from "react-icons/fa";
import { GiWhistle } from "react-icons/gi";

const steps = [
  {
    icon: FaUsers,
    title: "Join the Dugout",
    description:
      "Create or enter your preferred group with entry fee of your choice",
  },
  {
    icon: GiWhistle,
    title: "Make the Calls",
    description: "Draft your winning squad from Europe elite leagues",
  },
  {
    icon: FaCrown,
    title: "Claim Victory",
    description: "Top the leaderboard and earn weekly rewards",
  },
];

const HowItWorks = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            How It Works
          </h2>
          <p className="text-[#e5e5e5] text-lg max-w-2xl mx-auto">
            Your journey from the dugout to glory
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/4 left-full w-full h-[1px] bg-gradient-to-r from-[#fca311]/50 to-transparent z-0" />
              )}

              {/* Step Content */}
              <div className="relative h-64 bg-[#14213d]/40 backdrop-blur-sm rounded-xl p-8 border border-white/5 hover:border-[#fca311]/20 transition-all duration-500">
                <div className="text-center">
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="relative mb-6 mx-auto"
                  >
                    {/* Glowing background */}
                    <div className="absolute inset-0 bg-[#fca311]/20 rounded-full blur-xl" />

                    {/* Icon circle */}
                    <div className="relative w-16 h-16 rounded-xl bg-[#14213d] border border-[#fca311]/20 flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-[#fca311]" />
                    </div>
                  </motion.div>

                  {/* Step Number */}
                  <div className="absolute top-4 right-4 text-sm font-medium text-[#fca311]/60">
                    Step {index + 1}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>

                  <p className="text-[#e5e5e5]/70 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
