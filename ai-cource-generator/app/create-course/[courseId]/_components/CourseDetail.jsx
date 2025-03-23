import React from "react";
import { IoBarChartOutline } from "react-icons/io5";
import { BsClockHistory } from "react-icons/bs";
import { LuBookCopy } from "react-icons/lu";
import { MdOutlineOndemandVideo } from "react-icons/md";

const CourseDetail = ({ course }) => {
  return (
    <div className="border p-6 rouded-xl shadow-sm mt-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="flex gap-2">
          <IoBarChartOutline className="text-4xl text-primary" />
          <div>
            <h2 className="text-sm font-medium text-gray-500">Skill Level</h2>
            <h2 className="font-medium text-lg">{course?.level}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <BsClockHistory className="text-4xl text-primary" />
          <div>
            <h2 className="text-sm font-medium text-gray-500">Duration</h2>
            <h2 className="font-medium text-lg">
              {course?.courseOutput?.Duration}
            </h2>
          </div>
        </div>
        <div className="flex gap-2">
          <LuBookCopy className="text-4xl text-primary" />
          <div>
            <h2 className="text-sm font-medium text-gray-500">
              No Of Chapters
            </h2>
            <h2 className="font-medium text-lg">
              {course?.courseOutput?.NoOfChapters}
            </h2>
          </div>
        </div>
        <div className="flex gap-2">
          <MdOutlineOndemandVideo className="text-4xl text-primary" />
          <div>
            <h2 className="text-sm font-medium text-gray-500">
              Video Included
            </h2>
            <h2 className="font-medium text-lg">{course?.includeVideo}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
