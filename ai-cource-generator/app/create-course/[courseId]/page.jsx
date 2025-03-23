"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import LoadingAnimation from "./_components/LoadingAnimation";

const CourseLayout = () => {
  const params = useParams();
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && params.courseId) {
      GetCourse();
    }
  }, [params.courseId, user]);

  const GetCourse = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, params.courseId),
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );

      if (result && result[0]) {
        setCourse(result[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching course:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-xl font-semibold">Course not found</h2>
        <Link
          href="/create-course"
          className="group px-6 py-3 rounded-lg font-medium text-sm bg-gradient-to-r from-[#7c3aed] to-[#c026d3] text-white hover:opacity-90 transition-all"
        >
          <span className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Course Creation
          </span>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-background dark:bg-[#0B1120] py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full sm:w-auto"
          >
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#c026d3] bg-clip-text text-transparent">
              {course.name}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
              Level: {course.level} • Category: {course.category}
            </p>
          </motion.div>

          <Link
            href="/create-course"
            className="w-full sm:w-auto group px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm bg-gradient-to-r from-[#7c3aed] to-[#c026d3] text-white hover:opacity-90 transition-all text-center"
          >
            <span className="flex items-center justify-center sm:justify-start gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </span>
          </Link>
        </div>

        {/* Basic Info Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative rounded-xl backdrop-blur-sm transition-all duration-200
            bg-background/50 dark:bg-gray-800/50 hover:bg-background/70 dark:hover:bg-gray-800/70 
            border border-border/5 dark:border-white/5 p-4 sm:p-6"
          >
            <CourseBasicInfo course={course} />
          </div>
        </motion.div>

        {/* Course Details Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative rounded-xl backdrop-blur-sm transition-all duration-200
            bg-background/50 dark:bg-gray-800/50 hover:bg-background/70 dark:hover:bg-gray-800/70 
            border border-border/5 dark:border-white/5 p-4 sm:p-6"
          >
            <CourseDetail course={course} />
          </div>
        </motion.div>

        {/* Chapters Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative rounded-xl backdrop-blur-sm transition-all duration-200
            bg-background/50 dark:bg-gray-800/50 hover:bg-background/70 dark:hover:bg-gray-800/70 
            border border-border/5 dark:border-white/5 p-4 sm:p-6"
          >
            <ChapterList course={course} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CourseLayout;
