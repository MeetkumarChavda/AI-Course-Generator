import React from "react";
import { IoBarChartOutline } from "react-icons/io5";
import { BsClockHistory } from "react-icons/bs";
import { LuBookCopy } from "react-icons/lu";
import { MdOutlineOndemandVideo } from "react-icons/md";

const CourseDetail = ({ course }) => {
  return (
    <div>
      <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-[#7c3aed] to-[#c026d3] bg-clip-text text-transparent mb-4 sm:mb-6">
        Course Details
      </h3>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-background/60 dark:bg-gray-800/60 border border-border/10 dark:border-white/10 hover:border-[#7c3aed]/30 transition-colors">
          <IoBarChartOutline className="text-2xl sm:text-3xl text-[#7c3aed]" />
          <div>
            <h2 className="text-xs sm:text-sm font-medium text-muted-foreground">Skill Level</h2>
            <h2 className="text-sm sm:text-lg font-medium mt-0.5 sm:mt-1">{course?.level}</h2>
          </div>
        </div>
        
        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-background/60 dark:bg-gray-800/60 border border-border/10 dark:border-white/10 hover:border-[#7c3aed]/30 transition-colors">
          <BsClockHistory className="text-2xl sm:text-3xl text-[#7c3aed]" />
          <div>
            <h2 className="text-xs sm:text-sm font-medium text-muted-foreground">Duration</h2>
            <h2 className="text-sm sm:text-lg font-medium mt-0.5 sm:mt-1">
              {course?.courseOutput?.Duration}
            </h2>
          </div>
        </div>
        
        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-background/60 dark:bg-gray-800/60 border border-border/10 dark:border-white/10 hover:border-[#7c3aed]/30 transition-colors">
          <LuBookCopy className="text-2xl sm:text-3xl text-[#7c3aed]" />
          <div>
            <h2 className="text-xs sm:text-sm font-medium text-muted-foreground">
              No Of Chapters
            </h2>
            <h2 className="text-sm sm:text-lg font-medium mt-0.5 sm:mt-1">
              {course?.courseOutput?.NoOfChapters}
            </h2>
          </div>
        </div>
        
        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-background/60 dark:bg-gray-800/60 border border-border/10 dark:border-white/10 hover:border-[#7c3aed]/30 transition-colors">
          <MdOutlineOndemandVideo className="text-2xl sm:text-3xl text-[#7c3aed]" />
          <div>
            <h2 className="text-xs sm:text-sm font-medium text-muted-foreground">
              Video Included
            </h2>
            <h2 className="text-sm sm:text-lg font-medium mt-0.5 sm:mt-1">{course?.includeVideo}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
