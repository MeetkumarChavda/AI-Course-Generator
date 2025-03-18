"use client";
import React, { useState, useEffect } from "react";
import { DashboardHeader } from "../dashboard/_components/DashboardHeader";
import { UserInputContext } from "../_context/UserInputContext";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const CreateCourseLayout = ({ children }) => {
  const [userCourseInput, setUserCourseInput] = useState([]);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen w-full relative isolate ${
        theme === "dark" ? "bg-[#0A0F1E]" : "bg-[#fafafa]"
      }`}
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            theme === "dark"
              ? "from-[#0A0F1E] via-[#141832] to-[#0A0F1E]"
              : "from-[#fafafa] via-[#f8f8f8] to-[#f5f5f5]"
          } transition-colors duration-300`}
        />
      </div>

      {/* Simple background elements */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        {/* Subtle gradient shapes */}
        <div
          className={`absolute top-0 right-0 w-[70vw] h-[50vh] 
          ${
            theme === "dark"
              ? "bg-gradient-to-bl from-purple-500/[0.08] to-transparent"
              : "bg-gradient-to-bl from-purple-200/[0.15] to-transparent"
          } blur-3xl`}
        />

        <div
          className={`absolute bottom-0 left-0 w-[70vw] h-[50vh]
          ${
            theme === "dark"
              ? "bg-gradient-to-tr from-blue-500/[0.08] to-transparent"
              : "bg-gradient-to-tr from-blue-200/[0.15] to-transparent"
          } blur-3xl`}
        />

        {/* Subtle grid pattern */}
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)]"
              : "bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)]"
          } bg-[size:50px_50px] opacity-30`}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-end items-center pt-4 sm:pt-6 px-4 sm:px-6 md:px-8">
            <DashboardHeader />
          </div>

          <div className="py-4 sm:py-6">
            <UserInputContext.Provider
              value={{ userCourseInput, setUserCourseInput }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="px-4 sm:px-6 md:px-8"
              >
                {children}
              </motion.div>
            </UserInputContext.Provider>
          </div>
        </div>

        <footer className="mt-8 sm:mt-16 py-4 sm:py-6 text-center">
          <div className="text-sm font-medium px-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              AI Course Gen
            </span>
            <p className="mt-2 text-muted-foreground/60">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </motion.div>
  );
};

export default CreateCourseLayout;
