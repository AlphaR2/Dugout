"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { generateGroupId } from "../../../utils/test/generate";
import { FaTimes, FaCopy } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useGroupProgram } from "@/hooks/test/useGroup";

const ENTRY_FEE = 0.05 * web3.LAMPORTS_PER_SOL;

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateGroupModal = ({
  isOpen,
  onClose,
}: CreateGroupModalProps) => {
  const { publicKey } = useWallet();
  const { program, createGroup } = useGroupProgram();
  const [isLoading, setIsLoading] = useState(false);
  const [groupId, setGroupId] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    matchWeek: 1,
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey || !formData.name.trim() || !program) return;

    try {
      setIsLoading(true);
      const newGroupId = generateGroupId(formData.name);
      setGroupId(newGroupId);

      const tx = await createGroup(newGroupId, ENTRY_FEE, formData.matchWeek);

      toast.success(
        "Group created successfully! Transaction: " + tx.substring(0, 8) + "..."
      );
      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create group");
    } finally {
      setIsLoading(false);
    }
  };

  const copyGroupId = () => {
    if (groupId) {
      navigator.clipboard.writeText(groupId);
      toast.success("Group ID copied to clipboard!");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-[#14213d] rounded-2xl w-full max-w-lg max-h-[28rem] overflow-y-auto"
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Create New Group
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <FaTimes className="text-gray-400" />
                </button>
              </div>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Group Name
                </label>
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter group name"
                  className="w-full px-4 py-3 bg-[#000a16] border border-white/10 rounded-xl 
                    text-white focus:border-[#fca311] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Entry Fee
                </label>
                <div className="px-4 py-3 bg-[#000a16] border border-white/10 rounded-xl text-white">
                  {ENTRY_FEE / web3.LAMPORTS_PER_SOL} SOL
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Match Week
                </label>
                <input
                  type="number"
                  min="1"
                  max="38"
                  value={formData.matchWeek}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      matchWeek: parseInt(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-3 bg-[#000a16] border border-white/10 rounded-xl 
                    text-white focus:border-[#fca311] outline-none transition-colors"
                />
              </div>

              {groupId && (
                <div className="mt-4 p-4 bg-[#fca311]/10 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Group ID</h4>
                      <p className="text-sm text-gray-400">Click to copy</p>
                    </div>
                    <button
                      type="button"
                      onClick={copyGroupId}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <FaCopy className="text-[#fca311]" />
                    </button>
                  </div>
                  <div
                    onClick={copyGroupId}
                    className="mt-2 font-mono text-sm bg-[#000a16] p-2 rounded-lg text-white cursor-pointer hover:bg-[#000a16]/80"
                  >
                    {groupId}
                  </div>
                </div>
              )}

              {!publicKey && (
                <div className="bg-yellow-500/10 text-yellow-500 p-4 rounded-xl text-sm">
                  ⚠️ Please connect your wallet to create a group
                </div>
              )}
            </form>

            <div className="p-6 border-t border-white/10">
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-white hover:bg-white/5 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!publicKey || isLoading || !formData.name.trim()}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center
                    ${
                      publicKey && !isLoading && formData.name.trim()
                        ? "bg-[#fca311] hover:bg-[#fca311]/90 text-black"
                        : "bg-gray-600 text-gray-300 cursor-not-allowed"
                    }`}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2">Creating...</span>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    </>
                  ) : (
                    "Create Group"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const JoinGroupModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { publicKey } = useWallet();
  const { program, joinGroup } = useGroupProgram();
  const [isLoading, setIsLoading] = useState(false);
  const [groupId, setGroupId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleJoin = async () => {
    if (!publicKey || !groupId.trim() || !program) return;

    try {
      setIsLoading(true);
      setError(null);

      const tx = await joinGroup(groupId, ENTRY_FEE);
      toast.success(
        "Successfully joined group! Transaction: " + tx.substring(0, 8) + "..."
      );
      onClose();
    } catch (error) {
      console.error("Error joining group:", error);
      setError("Failed to join group");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-[#14213d] rounded-2xl w-full max-w-lg max-h-[32rem] overflow-y-auto"
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Join Group</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <FaTimes className="text-gray-400" />
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Entry Fee: {ENTRY_FEE / web3.LAMPORTS_PER_SOL} SOL
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Group ID
                </label>
                <input
                  value={groupId}
                  onChange={(e) => {
                    setGroupId(e.target.value);
                    setError(null);
                  }}
                  placeholder="Enter group ID"
                  className={`w-full px-4 py-3 bg-[#000a16] border rounded-xl 
                    text-white focus:border-[#fca311] outline-none transition-colors
                    ${error ? "border-red-500" : "border-white/10"}`}
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>

              {!publicKey && (
                <div className="bg-yellow-500/10 text-yellow-500 p-4 rounded-xl text-sm">
                  ⚠️ Please connect your wallet to join a group
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/10">
              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-white hover:bg-white/5 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleJoin}
                  disabled={!publicKey || !groupId.trim() || isLoading}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center
                    ${
                      publicKey && groupId.trim() && !isLoading
                        ? "bg-[#fca311] hover:bg-[#fca311]/90 text-black"
                        : "bg-gray-600 text-gray-300 cursor-not-allowed"
                    }`}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2">Joining...</span>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    </>
                  ) : (
                    "Join Group"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
