"use client";

import { useState } from "react";
import { Plus, FileText, Users, Megaphone, Tv } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingFab() {
  const [open, setOpen] = useState(false);

  const actions = [
    { label: "Post", icon: <FileText size={18} />, onClick: () => alert("Compose Post") },
    { label: "Event", icon: <Tv size={18} />, onClick: () => alert("Create an Event") },
    { label: "Channel", icon: <Users size={18} />, onClick: () => alert("Create Group Channel") },
    { label: "Ad", icon: <Megaphone size={18} />, onClick: () => alert("Create an Ad") },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Actions */}
      <AnimatePresence>
        {open &&
          actions.map((action, i) => (
            <motion.button
              key={action.label}
              onClick={action.onClick}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.1, delay: i * 0.05 }}
              className="mb-3 flex items-center gap-2 rounded-xl bg-white dark:bg-gray-800 px-3 py-2 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {action.icon}
              <span className="text-sm font-medium">{action.label}</span>
            </motion.button>
          ))}
      </AnimatePresence>

      {/* FAB Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white shadow-lg transition"
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus size={28} />
        </motion.div>
      </button>
    </div>
  );
}
