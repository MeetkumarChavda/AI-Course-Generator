"use client";

import React from "react";
import { motion } from "framer-motion";
import { Book, Clock, Video } from "lucide-react";
import Image from "next/image";
import book_placeholder from "@/public/book-placeholder.png";
import EditCourseBasicInfo from "./EditCourseBasicInfo";

const CourseBasicInfo = ({ course }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Course Title and Description */}
        <div className="flex-1 space-y-3 sm:space-y-4">
          <div className="flex items-start gap-2">
            <h3 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-[#7c3aed] to-[#c026d3] bg-clip-text text-transparent flex-1">
              {course.courseOutput?.CourseName}
            </h3>
            <EditCourseBasicInfo course={course} />
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
            {course.courseOutput?.Description}
          </p>

          {/* Course Stats */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="text-[#7c3aed]">
                <Book className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-foreground">Level</p>
                <p className="text-xs sm:text-sm">{course.level}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="text-[#7c3aed]">
                <Clock className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-foreground">Duration</p>
                <p className="text-xs sm:text-sm">
                  {course.courseOutput?.Duration || "Not specified"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="text-[#7c3aed]">
                <Video className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-foreground">Video Included</p>
                <p className="text-xs sm:text-sm">{course.includeVideo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Image */}
        <div className="w-full lg:w-1/3">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={book_placeholder}
              alt="Course Image"
              className="object-cover"
              fill
              priority
            />
          </div>
        </div>
      </div>

      {/* Start Learning Button */}
      <motion.button
        className="w-full px-4 py-2.5 sm:py-3 rounded-lg font-medium text-xs sm:text-sm bg-gradient-to-r from-[#7c3aed] to-[#c026d3] text-white hover:opacity-90 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Start Learning
      </motion.button>
    </div>
  );
};

export default CourseBasicInfo;
