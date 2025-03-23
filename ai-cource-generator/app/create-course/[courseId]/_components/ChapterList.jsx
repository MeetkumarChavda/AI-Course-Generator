"use client";

import React from "react";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const ChapterList = ({ course }) => {
  return (
    <div>
      <motion.h2
        className="text-xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#c026d3] bg-clip-text text-transparent mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Course Chapters
      </motion.h2>
      <motion.div
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {course?.courseOutput?.Chapters?.map((chapter, index) => (
          <motion.div
            key={index}
            variants={item}
            className="group relative overflow-hidden bg-background dark:bg-[#0B1120] rounded-xl border dark:border-[#334155] hover:border-[#7c3aed]/50 transition-all"
          >
            {/* Gradient background that shows on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/5 to-[#c026d3]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative p-4 flex items-start gap-4">
              <motion.div
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-[#7c3aed] to-[#c026d3] text-white font-medium"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {index + 1}
              </motion.div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {chapter.ChapterName}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {chapter.About}
                    </p>
                  </div>
                  <motion.button
                    className="opacity-0 group-hover:opacity-100 h-8 w-8 rounded-full flex items-center justify-center bg-gradient-to-r from-[#7c3aed] to-[#c026d3] text-white transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </motion.button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="w-4 h-4 text-[#7c3aed]" />
                  <span className="text-xs font-medium bg-gradient-to-r from-[#7c3aed] to-[#c026d3] bg-clip-text text-transparent">
                    {chapter.Duration}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ChapterList;
