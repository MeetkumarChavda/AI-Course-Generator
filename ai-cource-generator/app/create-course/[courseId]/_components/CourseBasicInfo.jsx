"use client";

import React from "react";
import { motion } from "framer-motion";
import { Book, Clock, Video } from "lucide-react";
import Image from "next/image";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import book_placeholder from "@/public/book-placeholder.png";

const CourseBasicInfo = ({ course }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col-reverse sm:flex-row gap-6 items-start">
        {/* Course Title and Description */}
        <div className="flex-1 space-y-2">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-[#7c3aed] to-[#c026d3] bg-clip-text text-transparent">
            {course.courseOutput?.CourseName}
          </h3>
          <p className="text-sm text-muted-foreground">
            {course.courseOutput?.Description}
          </p>

          {/* Course Stats */}
          <div className="grid gap-4 pt-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="text-[#7c3aed]">
                <Book className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Level</p>
                <p className="text-sm">{course.level}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="text-[#7c3aed]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Duration</p>
                <p className="text-sm">
                  {course.courseOutput?.Duration || "Not specified"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="text-[#7c3aed]">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Video Included
                </p>
                <p className="text-sm">
                  {course.includeVideo === "yes" ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Image */}
        <div className="w-full sm:w-1/2 aspect-[4/3] relative rounded-lg overflow-hidden bg-blue-50 dark:bg-blue-950/20 flex-shrink-0">
          <Image
            src="/book-placeholder.png"
            alt="Course thumbnail"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Start Learning Button */}
      <motion.button
        className="w-full px-4 py-2.5 rounded-lg font-medium text-sm bg-gradient-to-r from-[#7c3aed] to-[#c026d3] text-white hover:opacity-90 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Start Learning
      </motion.button>
    </div>
  );
};

export default CourseBasicInfo;
