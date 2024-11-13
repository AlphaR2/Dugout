// components/modals/CreateGroupModal.tsx
"use client";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { GROUP_TYPES } from "../../../utils/constants";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const CreateGroupModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateGroupModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "league" as keyof typeof GROUP_TYPES,
    description: "",
    maxParticipants: 20,
    startDate: "",
    endDate: "",
    entryFee: 0,
    rules: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
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
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#14213d] rounded-2xl w-full max-w-lg overflow-hidden"
          >
            <div className="relative p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">
                Create New Group
              </h2>
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Group Name
                </label>
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter group name"
                  className="bg-[#000a16] border-white/10"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as keyof typeof GROUP_TYPES,
                    })
                  }
                  className="w-full bg-[#000a16] border border-white/10 rounded-lg p-2 text-white"
                  required
                >
                  {Object.entries(GROUP_TYPES).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter group description"
                  className="bg-[#000a16] border-white/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="bg-[#000a16] border-white/10"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="bg-[#000a16] border-white/10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Maximum Participants
                </label>
                <input
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxParticipants: parseInt(e.target.value),
                    })
                  }
                  min={2}
                  max={50}
                  className="bg-[#000a16] border-white/10"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Rules & Guidelines
                </label>
                <textarea
                  value={formData.rules}
                  onChange={(e) =>
                    setFormData({ ...formData, rules: e.target.value })
                  }
                  placeholder="Enter group rules and guidelines"
                  className="bg-[#000a16] border-white/10"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="border-white/10 text-white hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#fca311] hover:bg-[#fca311]/90 text-black"
                >
                  Create Group
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// components/modals/JoinGroupModal.tsx
export const JoinGroupModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - Replace with actual API call
  const availableGroups = [
    {
      id: "1",
      name: "Premier League 2024",
      type: "league",
      participants: 18,
      maxParticipants: 20,
      startDate: "2024-08-01",
    },
    {
      id: "2",
      name: "Champions Cup",
      type: "cup",
      participants: 12,
      maxParticipants: 16,
      startDate: "2024-07-15",
    },
  ];

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
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#14213d] rounded-2xl w-full max-w-lg"
          >
            <div className="relative p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">Join a Group</h2>
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search groups..."
                className="bg-[#000a16] border-white/10 mb-6"
              />

              <div className="space-y-4">
                {availableGroups.map((group) => (
                  <div
                    key={group.id}
                    className="bg-[#000a16] rounded-xl p-4 hover:bg-[#000a16]/70 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-white font-bold">{group.name}</h3>
                        <p className="text-sm text-gray-400 capitalize">
                          {GROUP_TYPES[group.type as keyof typeof GROUP_TYPES]}
                        </p>
                      </div>
                      <button
                       
                        className="bg-[#fca311] hover:bg-[#fca311]/90 text-black"
                      >
                        Join
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>
                        {group.participants}/{group.maxParticipants} Teams
                      </span>
                      <span>
                        Starts {new Date(group.startDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
