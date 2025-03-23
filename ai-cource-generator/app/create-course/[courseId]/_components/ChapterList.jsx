"use client";

import React from "react";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import EditChapters from "./EditChapters";

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
        className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-[#7c3aed] to-[#c026d3] bg-clip-text text-transparent mb-3 sm:mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Course Chapters
      </motion.h2>
      <motion.div
        className="grid gap-3 sm:gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {course?.courseOutput?.Chapters?.map((chapter, index) => (
          <motion.div
            key={index}
            variants={item}
            className="group relative overflow-hidden bg-background dark:bg-[#0B1120] rounded-lg sm:rounded-xl border dark:border-[#334155] hover:border-[#7c3aed]/50 transition-all"
          >
            {/* Gradient background that shows on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/5 to-[#c026d3]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative p-3 sm:p-6">
              <div className="flex gap-3 sm:gap-4">
                {/* Chapter Number */}
                <motion.div
                  className="flex-shrink-0 w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#7c3aed] to-[#c026d3] text-white text-xs sm:text-base font-medium mt-0.5"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {index + 1}
                </motion.div>

                {/* Chapter Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                    <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
                      <div className="pr-2 flex items-center justify-between gap-2">
                        <h3 className="text-sm sm:text-lg font-semibold text-foreground break-words hyphens-auto">
                          {chapter.ChapterName}
                        </h3>
                        <div className="flex-shrink-0 ml-2">
                          <EditChapters index={index} course={course} />
                        </div>
                      </div>
                      <p className="text-xs sm:text-base text-muted-foreground line-clamp-2">
                        {chapter.About}
                      </p>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#7c3aed] flex-shrink-0" />
                        <span className="text-[10px] sm:text-sm font-medium bg-gradient-to-r from-[#7c3aed] to-[#c026d3] bg-clip-text text-transparent">
                          {chapter.Duration || "30 minutes"}
                        </span>
                      </div>
                    </div>
                  </div>
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
