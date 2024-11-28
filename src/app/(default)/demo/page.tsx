"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CreateGroupModal } from "@/components/modals/CreateGroupModal";
import { JoinGroupModal } from "@/components/modals/CreateGroupModal";

const GroupTestPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  return (
    <div className="min-h-screen pt-28 bg-gradient-to-b from-[#000610] to-[#001225] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-[#14213d] rounded-2xl p-8">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-4">
              SOON Hackathon Product Testing Arena
            </h1>
            <p className="text-gray-400 max-w-xl mb-8">
              Welcome to the testing area! Create or join groups to test out the
              functionality.
            </p>

            <p className="text-gray-500 max-w-xl mb-8 text-xs">
              This is a test feature for the program. Remember to use Backpack
              wallet for SOON and set to soon testnet. Also to confirm data and
              action please use the SOON explorer. For more info, please check
              our readME on github
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreateModalOpen(true)}
                className="px-6 py-3 bg-[#fca311] text-black rounded-xl font-medium"
              >
                Create Test Group
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsJoinModalOpen(true)}
                className="px-6 py-3 border border-[#fca311] text-[#fca311] rounded-xl font-medium"
              >
                Join Test Group
              </motion.button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#fca311]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#fca311]/5 rounded-full blur-2xl" />
        </div>
      </div>

      {/* Modals */}
      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <JoinGroupModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
};

export default GroupTestPage;
