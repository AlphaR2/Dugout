"use client";
import { motion } from "framer-motion";
import { FaPlayCircle } from "react-icons/fa";
import { GiSoccerBall, GiWhistle } from "react-icons/gi";
import { BsPersonFill } from "react-icons/bs";
import LiveMatches from "@/components/live";
import ActiveGroups from "@/components/active";
import HowItWorks from "@/components/working";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#b0720c] overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen pt-24 pb-12 mb-44">
        {/* Animated Background Layers */}
        <div className="absolute inset-0">
          {/* Diagonal Sections */}
          <motion.div
            initial={{ opacity: 1, skewY: -8 }}
            animate={{ opacity: 1, skewY: -8 }}
            className="absolute top-0 left-0 w-full h-[120%] bg-[#000610] origin-top-left"
          />
        </div>

        {/* Content Section */}
        <div className="relative z-10  container mx-auto px-4 h-screen">
          <div className="flex flex-col justify-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              {/* Technical Area / Dugout Inspired Layout */}
              <div className="relative grid md:grid-cols-2 gap-12 items-center">
                {/* Left Side - Main Content */}
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-4 h-[2px] bg-[#fca311]" />
                    <span className="text-[#fca311] text-sm font-bold">
                      Think You Can Make Better Tactical Decisions Than The
                      Coach?
                    </span>
                  </motion.div>
                  {/* Main Title with Dynamic Text */}
                  <div className="space-y-4">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-6xl font-semibold"
                    >
                      Take Your Place in
                      <span className="px-2 text-[#fca311]">
                        The Technical Arena
                      </span>
                    </motion.h1>
                    <motion.p
                      className="text-[#e5e5e5] text-lg font-extralight py-4  max-w-xl leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Draft your perfect XI, make the crucial calls, and prove
                      your tactical genius in Europe most elite competitions.
                    </motion.p>
                  </div>

                  {/* CTA Section */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="flex gap-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-[#fca311] text-black rounded-xl font-bold flex items-center gap-2"
                    >
                      <GiWhistle className="text-xl" />
                      Start Managing
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-[#14213d] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#14213d]/80"
                    >
                      <FaPlayCircle className="text-xl" />
                      Watch Demo
                    </motion.button>
                  </motion.div>
                </div>

                {/* Right Side - Interactive Elements */}
                <div className="relative mb-12 hidden md:block">
                  <div className="grid gap-6">
                    {/* Tactical Board */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-[#14213d] rounded-xl p-3 border border-[#fca311]/20 max-w-2xl " // Made container smaller
                    >
                      <div className="flex mb-2">
                        {" "}
                        {/* Reduced margin */}
                        <span className="px-2 py-0.5 bg-[#fca311]/10 rounded-full text-[#fca311] text-xs">
                          {" "}
                          {/* Smaller text and padding */}
                          Starting XI
                        </span>
                      </div>

                      {/* Pitch Display */}
                      <div className="aspect-[4/3] relative bg-[#0a3d62] rounded-lg p-2 overflow-hidden">
                        {" "}
                        {/* Adjusted aspect ratio and padding */}
                        {/* Pitch Lines */}
                        <div className="absolute inset-0">
                          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/20" />
                          <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-white/20" />
                          <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-white/20" />
                          <div className="absolute inset-y-0 left-1/2 w-[1px] bg-white/20" />
                          {/* Center Circle */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-white/20 rounded-full" />{" "}
                          {/* Smaller circle */}
                        </div>
                        {/* Player Positions - 4-3-3 Formation */}
                        <div className="relative h-full">
                          {/* Striker Line */}
                          <div className="absolute top-[15%] left-0 right-0 flex justify-around">
                            {[9, 11, 7].map((number) => (
                              <motion.div
                                key={number}
                                whileHover={{ scale: 1.1 }}
                                className="flex flex-col items-center gap-0.5" // Reduced gap
                              >
                                <div className="w-7 h-7 bg-[#fca311]/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                  {" "}
                                  {/* Smaller player circles */}
                                  <BsPersonFill className="text-[#fca311] text-sm" />{" "}
                                  {/* Smaller icon */}
                                </div>
                                <span className="text-white/60 text-[10px]">
                                  {number}
                                </span>{" "}
                                {/* Smaller text */}
                              </motion.div>
                            ))}
                          </div>

                          {/* Midfield Line */}
                          <div className="absolute top-[40%] left-0 right-0 flex justify-around">
                            {[8, 6, 10].map((number) => (
                              <motion.div
                                key={number}
                                whileHover={{ scale: 1.1 }}
                                className="flex flex-col items-center gap-0.5" // Reduced gap
                              >
                                <div className="w-7 h-7 bg-[#fca311]/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                  {" "}
                                  {/* Smaller player circles */}
                                  <BsPersonFill className="text-[#fca311] text-sm" />{" "}
                                  {/* Smaller icon */}
                                </div>
                                <span className="text-white/60 text-[10px]">
                                  {number}
                                </span>{" "}
                                {/* Smaller text */}
                              </motion.div>
                            ))}
                          </div>

                          {/* Defense Line */}
                          <div className="absolute top-[65%] left-0 right-0 flex justify-around">
                            {[3, 4, 5, 2].map((number) => (
                              <motion.div
                                key={number}
                                whileHover={{ scale: 1.1 }}
                                className="flex flex-col items-center gap-0.5" // Reduced gap
                              >
                                <div className="w-7 h-7 bg-[#fca311]/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                  {" "}
                                  {/* Smaller player circles */}
                                  <BsPersonFill className="text-[#fca311] text-sm" />{" "}
                                  {/* Smaller icon */}
                                </div>
                                <span className="text-white/60 text-[10px]">
                                  {number}
                                </span>{" "}
                                {/* Smaller text */}
                              </motion.div>
                            ))}
                          </div>

                          {/* Goalkeeper */}
                          <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="flex flex-col items-center gap-0.5" // Reduced gap
                            >
                              <div className="w-7 h-7 bg-[#fca311]/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                {" "}
                                {/* Smaller player circles */}
                                <BsPersonFill className="text-[#fca311] text-sm" />{" "}
                                {/* Smaller icon */}
                              </div>
                              <span className="text-white/60 text-[10px]">
                                1
                              </span>{" "}
                              {/* Smaller text */}
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Floating Ball Animation */}
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-6 right-10 bg-[#fca311]/10 p-3 rounded-lg backdrop-blur-sm" // Smaller padding
                    >
                      <GiSoccerBall className="text-[#fca311] text-3xl" />{" "}
                      {/* Smaller ball */}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-[#fca311] rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-2 h-2 bg-[#fca311] rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Other sections with updated styling */}
      <section className="py-20 bg-[#000610] backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <ActiveGroups />
        </div>
      </section>

      <section className="py-16 bg-[#000610]">
        <div className="container mx-auto px-4">
          <LiveMatches />
        </div>
      </section>

      <section className="py-20 bg-[#000610]/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <HowItWorks />
        </div>
      </section>
    </main>
  );
}
