"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaWallet,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";

// Settings Modal Component
export const SettingsModal = ({
  isOpen,
  onClose,
  onLogout,
  onConnectWallet,
}: {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onConnectWallet: () => void;
}) => (

  
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#14213d] z-50 shadow-xl"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Settings</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <FaTimes className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onConnectWallet}
                  className="w-full flex items-center justify-between p-4 bg-[#000a16] hover:bg-[#000a16]/80 rounded-xl text-white group transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#fca311]/10 rounded-lg">
                      <FaWallet className="w-5 h-5 text-[#fca311]" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Connect Wallet</div>
                      <div className="text-sm text-gray-400">
                        Manage your crypto assets
                      </div>
                    </div>
                  </div>
                  <FaChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#fca311] transition-colors" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onLogout}
                  className="w-full flex items-center justify-between p-4 bg-[#000a16] hover:bg-red-500/10 rounded-xl text-white group transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-red-500/10 rounded-lg">
                      <FaSignOutAlt className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Logout</div>
                      <div className="text-sm text-gray-400">
                        Sign out of your account
                      </div>
                    </div>
                  </div>
                  <FaChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
