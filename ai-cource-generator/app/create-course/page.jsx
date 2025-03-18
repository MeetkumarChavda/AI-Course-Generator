"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useContext, useEffect, useState } from "react";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiMiniSquares2X2,
} from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import { TopicDescription } from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const CreateCourse = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  /*
   * Used to check Next Button Enable or Disable Status
   */
  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true;
    }
    if (
      activeIndex == 0 &&
      (userCourseInput?.category == null ||
        userCourseInput?.category?.length == 0)
    ) {
      return true;
    }
    if (
      activeIndex == 1 &&
      (userCourseInput?.topic == undefined ||
        userCourseInput?.topic?.length == 0)
    ) {
      return true;
    } else if (
      activeIndex == 2 &&
      (userCourseInput?.level == undefined ||
        userCourseInput?.duration == undefined ||
        userCourseInput?.displayVideo == undefined ||
        userCourseInput?.noOfChapters == undefined)
    ) {
      return true;
    }
    return false;
  };

  const StepperOptions = [
    { id: 1, name: "Category", icon: <HiMiniSquares2X2 size={20} /> },
    { id: 2, name: "Topic", icon: <HiLightBulb size={20} /> },
    { id: 3, name: "Options", icon: <HiClipboardDocumentCheck size={20} /> },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-4 sm:py-8">
      <div className="flex flex-col items-center space-y-6 mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Create Your AI Course
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground/80">
            Design a comprehensive learning experience in just three steps
          </p>
        </motion.div>

        {/* Enhanced Stepper */}
        <div className="flex mt-6 sm:mt-10 w-full justify-center px-4">
          {StepperOptions.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center w-[40px] sm:w-[50px] md:w-[120px] transition-all duration-300">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => index < activeIndex && setActiveIndex(index)}
                  className={`p-2 sm:p-4 rounded-full transition-colors duration-300 flex items-center justify-center cursor-pointer ${
                    activeIndex >= index
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/10"
                      : "bg-background dark:bg-gray-800/80 text-muted-foreground hover:bg-background/80 dark:hover:bg-gray-800/60"
                  }`}
                >
                  {React.cloneElement(item.icon, {
                    size: window.innerWidth < 640 ? 16 : 20,
                  })}
                </motion.div>
                <h2 className="hidden md:block text-xs sm:text-sm mt-2 sm:mt-3 font-medium text-muted-foreground/80">
                  {item.name}
                </h2>
              </div>
              {index != StepperOptions?.length - 1 && (
                <div
                  className={`h-[2px] w-[30px] sm:w-[50px] md:w-[120px] rounded-full lg:w-[180px] transition-colors duration-500 ${
                    activeIndex > index
                      ? "bg-gradient-to-r from-purple-500 to-blue-500"
                      : "bg-border dark:bg-gray-800"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-4"
      >
        <Card className="relative border-0 shadow-xl overflow-hidden backdrop-blur-sm rounded-xl sm:rounded-2xl bg-background/40 dark:bg-gray-900/40">
          {/* Subtle border gradient */}
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10" />

          {/* Progress bar */}
          <div
            className="h-1 relative z-10 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
            style={{ width: `${((activeIndex + 1) / 3) * 100}%` }}
          />

          <CardContent className="relative z-10 p-4 sm:p-6 md:p-8 bg-background/30 dark:bg-gray-900/30 backdrop-blur-md">
            <div className="px-2 sm:px-4 md:px-12 lg:px-20 mt-2 sm:mt-4 mb-4 sm:mb-8">
              {/* Main Content */}
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="min-h-[300px] sm:min-h-[350px]"
              >
                {activeIndex == 0 ? (
                  <SelectCategory />
                ) : activeIndex == 1 ? (
                  <TopicDescription />
                ) : activeIndex == 2 ? (
                  <SelectOption />
                ) : null}
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 sm:mt-8 space-x-3 sm:space-x-4 px-2 sm:px-4 md:px-12 lg:px-20">
              <motion.button
                disabled={activeIndex == 0}
                onClick={() => setActiveIndex(activeIndex - 1)}
                whileHover={activeIndex !== 0 ? { scale: 1.02 } : {}}
                whileTap={activeIndex !== 0 ? { scale: 0.98 } : {}}
                className={`
                  relative px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg font-medium text-sm sm:text-base
                  ${
                    activeIndex == 0
                      ? "opacity-50 cursor-not-allowed bg-background/50 dark:bg-gray-800/50 text-muted-foreground"
                      : "bg-background dark:bg-gray-800/80 hover:bg-background/90 dark:hover:bg-gray-800/60 text-foreground"
                  }
                `}
              >
                Previous
              </motion.button>

              {activeIndex < 2 ? (
                <motion.button
                  disabled={checkStatus()}
                  onClick={() => setActiveIndex(activeIndex + 1)}
                  whileHover={!checkStatus() ? { scale: 1.02 } : {}}
                  whileTap={!checkStatus() ? { scale: 0.98 } : {}}
                  className={`
                    relative px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg font-medium text-sm sm:text-base text-white
                    ${
                      checkStatus()
                        ? "opacity-50 cursor-not-allowed bg-gray-500/50"
                        : "bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 shadow-lg shadow-purple-500/10"
                    }
                  `}
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  disabled={checkStatus()}
                  onClick={() => setActiveIndex(activeIndex + 1)}
                  whileHover={!checkStatus() ? { scale: 1.02 } : {}}
                  whileTap={!checkStatus() ? { scale: 0.98 } : {}}
                  className={`
                    relative px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg font-medium text-sm sm:text-base text-white whitespace-nowrap
                    ${
                      checkStatus()
                        ? "opacity-50 cursor-not-allowed bg-gray-500/50"
                        : "bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 shadow-lg shadow-purple-500/10"
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    Generate Course
                  </span>
                </motion.button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Progress indicator */}
      <div className="flex justify-center mt-4 sm:mt-6">
        <div className="flex space-x-3 sm:space-x-4">
          {[0, 1, 2].map((step) => (
            <motion.div
              key={step}
              whileHover={{ scale: 1.2 }}
              onClick={() => step < activeIndex && setActiveIndex(step)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full cursor-pointer transition-all duration-300 ${
                step <= activeIndex
                  ? "bg-gradient-to-r from-purple-500 to-blue-500"
                  : "bg-border dark:bg-gray-800"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
